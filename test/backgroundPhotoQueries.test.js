import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ALL_PHOTO_QUERY_IDS,
  GLOBAL_FALLBACK_QUERIES,
  chooseBackgroundQuery,
  getPhotoQueryMatch,
} from '../src/backgroundPhotoQueries.js';
import { getPreferredPhotoWidth } from '../src/photoSizing.js';
import {
  PHOTO_QUERY_IDS,
  buildHighQualityImageUrl,
  buildSearchPhrase,
  normaliseWidth,
} from '../worker/index.js';

test('a concrete object outranks an abstract concept', () => {
  const match = getPhotoQueryMatch('He leads me beside still waters and gives me peace.');
  assert.equal(match.priority, 90);
  assert.deepEqual(match.matchedRuleIds, ['water']);
  assert.ok(match.candidates.includes('water-clear'));
});

test('an exact object phrase receives the highest priority', () => {
  const match = getPhotoQueryMatch('The kingdom of heaven is like a mustard seed.');
  assert.equal(match.priority, 100);
  assert.ok(match.matchedRuleIds.includes('mustard-seed'));
  assert.ok(match.candidates.includes('seed-mustard'));
});

test('same-priority noun groups and their candidates are selected randomly', () => {
  const first = chooseBackgroundQuery('Bread and fish', { random: () => 0 });
  const last = chooseBackgroundQuery('Bread and fish', { random: () => 0.999 });
  assert.equal(first, 'bread-loaf');
  assert.equal(last, 'fish-bread');
});

test('dark subjects are absent from global fallback', () => {
  const match = getPhotoQueryMatch('A verse with no approved visual noun here.');
  assert.deepEqual(match.candidates, GLOBAL_FALLBACK_QUERIES);
  assert.ok(!match.candidates.some((query) => /sword|prison|snake|death/.test(query)));
  assert.equal(getPhotoQueryMatch('He carried a sword.').matchedRuleIds[0], 'conflict');
});

test('every front-end query id is exactly allow-listed by the Worker', () => {
  const missing = ALL_PHOTO_QUERY_IDS.filter((queryId) => !PHOTO_QUERY_IDS.has(queryId));
  const unused = [...PHOTO_QUERY_IDS].filter((queryId) => !ALL_PHOTO_QUERY_IDS.includes(queryId));
  assert.deepEqual(missing, []);
  assert.deepEqual(unused, []);
});

test('query order is noun, descriptor, then optional location', () => {
  assert.equal(buildSearchPhrase('lily-white', 'Kyoto'), 'lily white Kyoto');
  assert.equal(buildSearchPhrase('cross-wooden', ''), 'cross wooden');
  assert.equal(buildSearchPhrase('not-approved', 'Tokyo'), 'cross sunrise Tokyo');
});

test('Retina displays request an appropriate high-resolution bucket', () => {
  assert.equal(getPreferredPhotoWidth(390, 3), 1280);
  assert.equal(getPreferredPhotoWidth(1024, 2), 2560);
  assert.equal(getPreferredPhotoWidth(1366, 2), 3200);
  assert.equal(getPreferredPhotoWidth(1920, 2), 3840);
});

test('Worker normalises widths and builds a quality 92 image URL', () => {
  assert.equal(normaliseWidth('2048'), 2560);
  assert.equal(normaliseWidth('9000'), 3840);
  const url = new URL(buildHighQualityImageUrl(
    { urls: { raw: 'https://images.unsplash.com/photo-test?ixid=abc' } },
    3200
  ));
  assert.equal(url.searchParams.get('w'), '3200');
  assert.equal(url.searchParams.get('q'), '92');
  assert.equal(url.searchParams.get('fit'), 'max');
  assert.equal(url.searchParams.get('auto'), 'format');
});
