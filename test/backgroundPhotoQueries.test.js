import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ALL_PHOTO_QUERY_IDS,
  chooseBackgroundQueries,
  getPhotoQueryMatch,
  shouldUsePhotoPreference,
} from '../src/backgroundPhotoQueries.js';
import { getPreferredPhotoWidth } from '../src/photoSizing.js';
import {
  PHOTO_QUERIES,
  buildHighQualityImageUrl,
  normaliseWidth,
} from '../worker/index.js';

test('concrete objects outrank abstract moods', () => {
  const match = getPhotoQueryMatch(
    'He leads me beside still waters and gives me peace.'
  );

  assert.equal(match.matchedRuleIds[0], 'river-water');
  assert.ok(match.primaryCandidates.includes('forest-river'));
  assert.ok(!match.primaryCandidates.includes('quiet-lake'));
  assert.ok(match.secondaryCandidates.includes('quiet-lake'));
});

test('abstract ideas are translated into curated visible scenes', () => {
  const match = getPhotoQueryMatch('Peace I leave with you. Do not be anxious.');

  assert.equal(match.matchedRuleIds[0], 'peace');
  assert.deepEqual(match.primaryCandidates, [
    'quiet-lake',
    'calm-ocean',
    'foggy-meadow',
    'still-morning',
  ]);
});

test('trusted concepts retain direct, curated imagery', () => {
  const match = getPhotoQueryMatch('Love one another as I have loved you.');

  assert.equal(match.matchedRuleIds[0], 'love');
  assert.ok(match.primaryCandidates.includes('love-silhouette'));
});

test('the first rotation stays inside the strongest concrete visual tier', () => {
  const chosen = chooseBackgroundQueries(
    'The path is bright with hope.',
    { count: 4, random: () => 0, storage: null }
  );

  assert.deepEqual(chosen.slice(0, 4), [
    'mountain-path',
    'road-horizon',
    'footsteps-sand',
    'forest-trail',
  ]);
});

test('location preferences are blocked for non-location objects', () => {
  assert.equal(shouldUsePhotoPreference('Take up your cross and follow Jesus.'), false);
  assert.equal(shouldUsePhotoPreference('Walk along the path before you.'), true);
});

test('every front-end query id is allow-listed by the Worker', () => {
  const missing = ALL_PHOTO_QUERY_IDS.filter((queryId) => !PHOTO_QUERIES[queryId]);
  assert.deepEqual(missing, []);
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
  const url = new URL(
    buildHighQualityImageUrl(
      { urls: { raw: 'https://images.unsplash.com/photo-test?ixid=abc' } },
      3200
    )
  );

  assert.equal(url.searchParams.get('w'), '3200');
  assert.equal(url.searchParams.get('q'), '92');
  assert.equal(url.searchParams.get('fit'), 'max');
  assert.equal(url.searchParams.get('auto'), 'format');
});
