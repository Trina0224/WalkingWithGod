import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ALL_PHOTO_QUERY_IDS,
  GLOBAL_FALLBACK_QUERIES,
  PHOTO_QUERY_RULES,
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

test('an exact water phrase outranks abstract peace', () => {
  const match = getPhotoQueryMatch('He leads me beside still waters and gives me peace.');
  assert.equal(match.priority, 130);
  assert.deepEqual(match.matchedRuleIds, ['still-waters']);
  assert.ok(match.candidates.includes('water-clear'));
});

test('an exact object phrase receives the highest priority', () => {
  const match = getPhotoQueryMatch('The kingdom of heaven is like a mustard seed.');
  assert.equal(match.priority, 130);
  assert.ok(match.matchedRuleIds.includes('mustard-seed'));
  assert.ok(match.candidates.includes('seed-mustard'));
});

test('Isaiah 42:3 locks onto the bruised reed instead of its incidental light', () => {
  const match = getPhotoQueryMatch(
    'He will not let a crushed stem be quite broken, and he will not let a feebly burning light be put out.'
  );
  assert.equal(match.priority, 130);
  assert.deepEqual(match.matchedRuleIds, ['bruised-reed']);
  assert.deepEqual(match.candidates, ['reed', 'reed-single', 'reeds-water']);
});

test('same-priority noun groups and their candidates are selected randomly', () => {
  const first = chooseBackgroundQuery('Bread and fish', { random: () => 0 });
  const last = chooseBackgroundQuery('Bread and fish', { random: () => 0.999 });
  assert.equal(first, 'bread-loaf');
  assert.equal(last, 'fish-bread');
});

test('all meaningful nouns participate instead of one noun hijacking the verse', () => {
  const match = getPhotoQueryMatch('Water runs beside the mountain path.');
  assert.deepEqual(match.matchedRuleIds, ['water', 'mountain', 'path']);
  assert.ok(match.candidates.includes('water'));
  assert.ok(match.candidates.includes('mountain'));
  assert.ok(match.candidates.includes('path'));
});

test('eagle, wings, and mountain all remain available', () => {
  const match = getPhotoQueryMatch('They will mount up with wings like eagles above the mountains.');
  assert.equal(match.priority, 120);
  assert.deepEqual(match.matchedRuleIds, ['eagle', 'wings', 'mountain']);
  assert.ok(match.candidates.includes('eagle'));
  assert.ok(match.candidates.includes('wings'));
  assert.ok(match.candidates.includes('mountain'));
});

test('a long passage is not reduced to one incidental stone', () => {
  const match = getPhotoQueryMatch(
    'A time to be born, and a time to die; a time to plant, and a time to pluck up; ' +
    'a time to heal, and a time to build up; a time to weep, and a time to laugh; ' +
    'a time to mourn, and a time to dance; a time to cast away stones.'
  );
  assert.ok(match.matchedRuleIds.includes('birth'));
  assert.ok(match.matchedRuleIds.includes('death'));
  assert.ok(match.matchedRuleIds.includes('planting'));
  assert.ok(match.matchedRuleIds.includes('healing'));
  assert.ok(match.matchedRuleIds.includes('building'));
  assert.ok(match.matchedRuleIds.includes('stone'));
  assert.ok(match.matchedRuleIds.includes('sorrow'));
  assert.ok(match.matchedRuleIds.includes('joy'));
});

test('old BBE-style wording produces several evocative choices', () => {
  const match = getPhotoQueryMatch(
    'God is our harbour and our strength, a very present help in trouble.'
  );
  assert.deepEqual(match.matchedRuleIds, ['shore', 'god', 'strength', 'sorrow']);
  assert.ok(match.candidates.includes('harbour-fishing'));
  assert.ok(match.candidates.includes('jesus'));
  assert.ok(match.candidates.includes('shield'));
  assert.ok(match.candidates.includes('tears'));
});

test('different animal nouns never share one mixed candidate pool', () => {
  assert.deepEqual(getPhotoQueryMatch('The lion roared.').candidates, ['lion']);
  assert.deepEqual(getPhotoQueryMatch('He rode a donkey.').candidates, ['donkey']);
  assert.deepEqual(getPhotoQueryMatch('The serpent was subtle.').candidates, ['snake']);
});

test('weather nouns never leak into one another', () => {
  assert.deepEqual(getPhotoQueryMatch('The rain came down.').candidates, ['rain-window', 'water-flowing']);
  assert.deepEqual(getPhotoQueryMatch('White as snow.').candidates, ['snow-field']);
});

test('ambiguous verbs do not become unrelated objects', () => {
  assert.ok(!getPhotoQueryMatch('They cross over the river and all is well.').matchedRuleIds.includes('cross'));
  assert.ok(!getPhotoQueryMatch('They cross over the river and all is well.').matchedRuleIds.includes('well'));
  assert.deepEqual(getPhotoQueryMatch('Take up his cross and follow me.').matchedRuleIds, ['cross', 'guidance']);
});

test('Father in heaven uses faith imagery rather than a random family photo', () => {
  const match = getPhotoQueryMatch('Pray to your Father in heaven.');
  assert.deepEqual(match.matchedRuleIds, ['father-god']);
  assert.ok(match.candidates.includes('worship-christian'));
});

test('dark subjects are absent from global fallback', () => {
  const match = getPhotoQueryMatch('A verse with no approved visual noun here.');
  assert.deepEqual(match.candidates, GLOBAL_FALLBACK_QUERIES);
  assert.ok(!match.candidates.some((query) => /sword|prison|snake|death/.test(query)));
  assert.deepEqual(GLOBAL_FALLBACK_QUERIES, ['bible-open', 'jesus', 'cross-christian']);
  assert.equal(getPhotoQueryMatch('He carried a sword.').matchedRuleIds[0], 'sword');
});

test('abstract concepts and global fallback never use generic landscapes', () => {
  const landscapeQueries = new Set([
    'water-still', 'sea-calm', 'sunrise', 'dawn', 'tree-ancient',
    'mountain', 'path', 'road', 'rain-window', 'tree-solitary',
    'flowers', 'stars', 'horizon', 'sky-night', 'cross-sunrise',
    'vineyard', 'river-flowing', 'valley-green', 'path-forest',
    'stars-mountains',
  ]);
  const abstractQueries = PHOTO_QUERY_RULES
    .filter((item) => item.priority === 50)
    .flatMap((item) => item.queries);

  assert.ok(!abstractQueries.some((query) => landscapeQueries.has(query)));
  assert.ok(!GLOBAL_FALLBACK_QUERIES.some((query) => landscapeQueries.has(query)));
});

test('every front-end query id is allow-listed by the universal Worker', () => {
  const missing = ALL_PHOTO_QUERY_IDS.filter((queryId) => !PHOTO_QUERY_IDS.has(queryId));
  assert.deepEqual(missing, []);
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
