const rule = (id, priority, triggers, queries) => ({ id, priority, triggers, queries });

// The order inside each candidate list is not a ranking. One is chosen randomly.
// Query IDs deliberately use noun-first wording so the Worker can turn hyphens
// into the exact Unsplash phrase and append the optional location last.
export const PHOTO_QUERY_RULES = [
  rule('cross', 100, ['crown of thorns', 'cross'], ['cross-christian', 'cross-wooden', 'cross-sunrise', 'cross-silhouette']),
  rule('bible', 100, ['word of god', 'gave the word', 'scripture', 'bible'], ['bible-open', 'bible-window', 'bible-candle', 'bible-pages']),
  rule('scroll', 100, ['written word', 'scroll', 'book'], ['scroll-ancient', 'scroll-parchment', 'book-old']),
  rule('church', 100, ['church'], ['church-interior', 'church-small', 'church-window', 'church-sunrise']),
  rule('temple', 100, ['temple', 'sanctuary'], ['temple-ancient', 'sanctuary-interior', 'architecture-sacred']),
  rule('altar', 100, ['altar'], ['altar-church', 'altar-candlelit', 'altar-stone']),
  rule('baptism', 100, ['baptism'], ['baptism-water', 'baptism-river', 'baptism-church']),
  rule('father', 100, ['father'], ['father-child', 'father-baby', 'father-daughter', 'father-son']),
  rule('mother', 100, ['mother'], ['mother-child', 'mother-baby', 'mother-daughter', 'mother-son']),
  rule('child', 100, ['children', 'child'], ['child', 'children-playing', 'child-hand', 'child-sunlight']),
  rule('baby', 100, ['infant', 'baby'], ['baby', 'baby-holding', 'baby-sleeping']),
  rule('family', 100, ['families', 'family', 'parents', 'parent'], ['family-embrace', 'family-walking', 'parent-child', 'family-hands']),
  rule('wedding', 100, ['bridegroom', 'marriage', 'wedding', 'bride', 'groom', 'husband', 'wife'], ['rings-wedding', 'bride-groom', 'hands-wedding', 'ceremony-wedding']),
  rule('siblings', 100, ['brothers', 'brother', 'sisters', 'sister'], ['siblings', 'brothers', 'sisters', 'siblings-embrace']),
  rule('friend', 100, ['friends', 'friend'], ['friends-together', 'hands-friendship', 'friends-walking']),
  rule('shepherd', 100, ['good shepherd', 'shepherd'], ['shepherd', 'shepherd-flock', 'staff-shepherd']),
  rule('fisherman', 100, ['fisherman'], ['fisherman', 'net-fishing', 'boat-fishing']),
  rule('farmer', 100, ['sower', 'farmer'], ['farmer', 'seed-sowing', 'seed-planting']),
  rule('carpenter', 100, ['carpenter'], ['carpenter', 'hands-woodworking', 'tools-wooden']),
  rule('potter', 100, ['potter'], ['potter', 'vessel-clay', 'clay-shaping']),
  rule('lily', 100, ['lilies', 'lily'], ['lily-white', 'lily-flower', 'lilies-blooming']),
  rule('rose', 100, ['roses', 'rose'], ['rose', 'rose-red', 'rose-white', 'roses-blooming']),
  rule('vine', 100, ['vineyard', 'grapes', 'grape', 'vines', 'vine'], ['vine-grape', 'vine-branches', 'vineyard']),
  rule('fig', 100, ['fig tree', 'figs', 'fig'], ['figs', 'tree-fig', 'leaves-fig']),
  rule('olive', 100, ['olive trees', 'olive tree', 'olives', 'olive'], ['olives', 'branch-olive', 'tree-olive-ancient', 'grove-olive']),
  rule('mustard-seed', 100, ['mustard seed'], ['seed-mustard', 'seed-tiny-hand', 'plant-mustard']),
  rule('seed', 100, ['seeds', 'seed'], ['seed-hand', 'seed-soil', 'seedling']),
  rule('wheat', 100, ['wheat', 'grain'], ['wheat', 'field-wheat', 'wheat-hand', 'grain-hand']),
  rule('thorn', 100, ['crown of thorns', 'thorns', 'thorn'], ['thorns-crown', 'branch-thorn', 'thorns-closeup']),
  rule('reed', 100, ['crushed reed', 'crushed stem', 'reeds', 'reed'], ['reed', 'reeds-water', 'reed-single']),
  rule('bread', 100, ['loaf', 'bread'], ['bread-loaf', 'bread-table', 'bread-breaking']),
  rule('wine', 100, ['wine'], ['wine-glass', 'cup-wine', 'wine-red', 'grapes', 'vineyard']),
  rule('cup', 100, ['cup'], ['cup', 'cup-wooden', 'cup-wine', 'cup-table']),
  rule('jar', 100, ['water jar', 'jar'], ['jar-water-clay', 'jar-clay-ancient', 'jar-table']),
  rule('vessel', 100, ['vessels', 'vessel', 'bowl'], ['vessel-clay', 'vessel-ceramic', 'bowl-wooden', 'bowl-clay']),
  rule('fish', 100, ['fish'], ['fish', 'catch-fishing', 'fish-bread']),
  rule('honey', 100, ['honey'], ['honey', 'honeycomb', 'jar-honey']),
  rule('milk', 100, ['milk'], ['milk', 'cup-milk', 'milk-bread']),
  rule('oil', 100, ['olive oil', 'oil'], ['oil-olive', 'jar-oil', 'lamp-oil']),
  rule('salt', 100, ['salt'], ['salt', 'crystals-salt', 'salt-hand']),
  rule('living-water', 100, ['living water'], ['water-spring-clear', 'river-flowing', 'spring-water']),
  rule('river', 100, ['jordan river', 'river'], ['river', 'river-flowing', 'river-forest']),
  rule('stream', 100, ['stream', 'brook'], ['stream', 'stream-forest', 'brook-mountain']),
  rule('spring', 100, ['fountain', 'spring'], ['spring-natural', 'water-fountain', 'water-spring']),
  rule('well', 100, ['well'], ['well-water', 'well-ancient', 'well-stone']),
  rule('sea', 100, ['sea of galilee', 'ocean', 'waves', 'wave', 'harbour', 'shore', 'beach', 'sea'], ['sea', 'waves-ocean', 'sea-calm', 'shore-empty', 'harbour-fishing']),
  rule('mountain', 100, ['mountains', 'mountain'], ['mountain', 'peak-mountain', 'mountains-mist']),
  rule('hill', 100, ['hills', 'hill'], ['hills-green', 'hills-rolling', 'hill-sunrise']),
  rule('valley', 100, ['valley'], ['valley', 'valley-green', 'valley-mist']),
  rule('rock', 100, ['rock'], ['rock', 'rock-massive', 'rock-sea']),
  rule('stone', 100, ['stones', 'stone'], ['stone', 'stones-ancient', 'path-stone']),
  rule('cave', 100, ['cave'], ['cave', 'entrance-cave', 'light-cave']),
  rule('wilderness', 100, ['wilderness', 'desert'], ['wilderness', 'desert-wilderness', 'path-wilderness', 'desert-road']),
  rule('path', 100, ['footsteps', 'path', 'road', 'way'], ['path', 'path-forest', 'path-mountain', 'road-horizon', 'footsteps-sand']),
  rule('lamp', 100, ['feebly burning light', 'oil lamp', 'lamp', 'candle'], ['lamp-oil', 'lamp-ancient', 'candle', 'candle-light']),
  rule('fire', 100, ['pillar of fire', 'flame', 'fire'], ['fire', 'flame', 'fire-camp', 'flame-candle']),
  rule('cloud', 100, ['pillar of cloud', 'clouds', 'cloud'], ['cloud', 'clouds-dramatic', 'cloud-desert']),
  rule('sun', 100, ['sunrise', 'sunset', 'dawn', 'sun'], ['sunrise', 'sunset', 'sunlight', 'sun-clouds']),
  rule('moon', 100, ['moon'], ['moon', 'moonlight', 'moon-water']),
  rule('star', 100, ['stars', 'star'], ['stars', 'sky-night', 'stars-mountains']),
  rule('weather', 100, ['lightning', 'rainbow', 'storm', 'rain', 'snow', 'ice'], ['storm-clouds', 'rain-window', 'rainbow-rain', 'snow-field', 'lightning-storm']),
  rule('sheep', 100, ['sheep', 'flock'], ['sheep', 'flock-sheep', 'sheep-hillside']),
  rule('lamb', 100, ['lamb'], ['lamb', 'lamb-field', 'lamb-young']),
  rule('eagle', 100, ['eagles', 'eagle'], ['eagle', 'eagle-flying', 'wings-eagle']),
  rule('wing', 100, ['wings', 'wing'], ['wings-bird', 'wings-eagle', 'wings-sheltering']),
  rule('dove', 100, ['dove'], ['dove', 'dove-white', 'dove-flying']),
  rule('animals', 100, ['sparrows', 'sparrow', 'ravens', 'raven', 'lion', 'donkey', 'horses', 'horse', 'serpent', 'snake'], ['bird-sparrow', 'bird-raven', 'lion', 'donkey', 'horse', 'snake']),
  rule('door', 100, ['window', 'door', 'gate'], ['window-light', 'door-open', 'door-light', 'gate-ancient']),
  rule('building', 100, ['tower', 'wall', 'house', 'home', 'room'], ['house-countryside', 'room-sunlit', 'wall-stone-ancient', 'tower-stone']),
  rule('biblical-place', 100, ['sea of galilee', 'jerusalem', 'bethlehem', 'galilee', 'israel', 'egypt'], ['jerusalem-old-city', 'bethlehem-church', 'galilee-shore', 'israel-desert', 'egypt-desert']),
  rule('boat', 100, ['fishing net', 'boat', 'ship', 'net'], ['boat', 'boat-fishing', 'boat-lake', 'net-fishing']),
  rule('body', 100, ['hands', 'hand', 'feet', 'foot', 'eyes', 'eye'], ['hands-open', 'hand-helping', 'feet-walking', 'eyes-closeup']),
  rule('clothing', 100, ['sandals', 'sandal', 'garment', 'clothing', 'wool'], ['clothing-linen', 'garment-white', 'wool-white', 'sandals-ancient']),
  rule('conflict', 100, ['sword', 'shield', 'armour', 'armor', 'helmet', 'chains', 'chain', 'prison'], ['sword-ancient', 'shield-ancient', 'armor-ancient', 'chains-broken', 'bars-prison']),
  rule('fortress', 100, ['stronghold', 'fortress'], ['fortress', 'fortress-stone', 'wall-castle']),
  rule('royal', 100, ['throne', 'crown', 'king'], ['crown', 'crown-golden', 'throne-empty']),
  rule('treasure', 100, ['treasure', 'wealth', 'riches', 'gold', 'silver', 'pearls', 'pearl'], ['chest-treasure', 'coins-gold', 'pearl-shell', 'jewels']),
  rule('tools', 100, ['keys', 'key', 'staff', 'rod', 'yoke', 'clay'], ['key-antique', 'staff-shepherd', 'yoke-wooden', 'clay-shaping']),
  rule('music', 100, ['trumpet', 'harp', 'lyre', 'choir', 'horn'], ['harp', 'lyre-ancient', 'trumpet', 'choir-church', 'shofar']),

  rule('water', 90, ['waters', 'water'], ['water', 'water-clear', 'surface-water', 'water-flowing']),
  rule('flower', 90, ['flowers', 'flower'], ['flower-closeup', 'flowers-blooming', 'wildflowers']),
  rule('plant', 90, ['branches', 'branch', 'trees', 'tree', 'fruit', 'grass', 'garden', 'field', 'harvest'], ['tree-ancient', 'tree-field', 'fruit-tree', 'grass-dew', 'garden-path', 'harvest-wheat']),
  rule('sky', 90, ['sky', 'wind', 'morning', 'night', 'light'], ['sky-open', 'wind-grass', 'light-beam', 'light-clouds', 'morning-window']),
  rule('bird', 90, ['birds', 'bird'], ['bird', 'birds-flying', 'bird-sky']),
  rule('relationship', 90, ['son', 'daughter'], ['father-son', 'mother-son', 'father-daughter', 'mother-daughter']),

  rule('god', 70, ['kingdom of god', 'son of god', 'jesus', 'christ', 'messiah', 'saviour', 'lord', 'god'], ['jesus', 'cross-christian', 'worship', 'worship-christian', 'hands-raised-worship']),
  rule('worship', 70, ['worship', 'praise', 'faith', 'gospel', 'redemption', 'salvation'], ['worship-christian', 'hands-raised-worship', 'church-worship', 'bible-open', 'cross']),
  rule('prayer', 70, ['praying', 'prayer', 'pray'], ['prayer-kneeling', 'hands-prayer', 'bible-prayer', 'person-praying']),
  rule('love', 70, ['beloved', 'love'], ['parent-child', 'mother-child', 'father-child', 'rings-wedding', 'family-embrace', 'baby-holding']),
  rule('service', 70, ['servant', 'serve'], ['hands-serving', 'food-serving', 'service-humble']),
  rule('time', 70, ['appointed time', 'time'], ['hourglass', 'clock', 'sundial']),
  rule('song', 70, ['singing', 'song'], ['singing', 'choir', 'worship-singing']),

  rule('peace', 50, ['be still', 'peace', 'rest'], ['water-still', 'sea-calm', 'child-sleeping', 'dove-white']),
  rule('hope', 50, ['hope'], ['sunrise', 'door-open', 'seedling', 'dawn']),
  rule('strength', 50, ['strength', 'power', 'courage'], ['tree-ancient', 'mountain', 'shield', 'eagle']),
  rule('protection', 50, ['protection', 'safe', 'refuge', 'shelter'], ['shield', 'shelter', 'wings', 'fortress']),
  rule('guidance', 50, ['guidance', 'guide', 'lead', 'follow'], ['path', 'lighthouse', 'road', 'lamp']),
  rule('mercy', 50, ['compassion', 'forgiveness', 'forgive', 'mercy', 'grace'], ['hand-helping', 'parent-child', 'embrace-comforting', 'cross']),
  rule('sorrow', 50, ['sorrow', 'grief', 'trouble', 'tears', 'weeping'], ['tears', 'rain-window', 'chair-empty', 'tree-solitary']),
  rule('joy', 50, ['rejoice', 'joy'], ['child-laughing', 'celebration', 'sunrise', 'flowers']),
  rule('eternal', 50, ['eternal', 'forever', 'heaven'], ['stars', 'horizon', 'sky-night']),
  rule('life', 50, ['life'], ['seedling', 'child', 'tree', 'sunrise']),
  rule('death', 50, ['death', 'tomb'], ['candle', 'chair-empty', 'tomb-empty', 'flower-fading']),
  rule('freedom', 50, ['freedom', 'free'], ['chains-broken', 'gate-open', 'bird-flying']),
  rule('wisdom', 50, ['wisdom', 'knowledge'], ['book-old', 'bible', 'lamp', 'reading']),
];

// Used only when a verse contains none of the approved triggers. Dark or
// violent subjects never participate in this pool.
export const GLOBAL_FALLBACK_QUERIES = [
  'cross-sunrise', 'bible-window', 'worship-christian', 'parent-child',
  'family-embrace', 'lily-white', 'vineyard', 'bread-table', 'river-flowing',
  'sea-calm', 'mountain', 'valley-green', 'path-forest', 'sunrise',
  'stars-mountains', 'dove-white', 'church-window', 'tree-ancient',
];

function normaliseVerse(verse = '') {
  return verse.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
}

function containsTrigger(text, trigger) {
  const escaped = trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|\\b)${escaped}(?:\\b|$)`, 'i').test(text);
}

function randomItem(items, random = Math.random) {
  const index = Math.min(items.length - 1, Math.floor(random() * items.length));
  return items[Math.max(0, index)];
}

export function getPhotoQueryMatch(verse = '') {
  const text = normaliseVerse(verse);
  const matched = PHOTO_QUERY_RULES
    .filter((item) => item.triggers.some((trigger) => containsTrigger(text, trigger)));

  if (!matched.length) {
    return { matchedRuleIds: [], priority: 10, candidates: GLOBAL_FALLBACK_QUERIES };
  }

  const priority = Math.max(...matched.map((item) => item.priority));
  const strongest = matched.filter((item) => item.priority === priority);
  return {
    matchedRuleIds: strongest.map((item) => item.id),
    priority,
    candidates: [...new Set(strongest.flatMap((item) => item.queries))],
  };
}

export function chooseBackgroundQuery(verse = '', options = {}) {
  const random = options.random ?? Math.random;
  const match = getPhotoQueryMatch(verse);
  const matchingRules = PHOTO_QUERY_RULES.filter(
    (item) => item.priority === match.priority && match.matchedRuleIds.includes(item.id)
  );
  if (!matchingRules.length) return randomItem(match.candidates, random);
  const chosenRule = randomItem(matchingRules, random);
  return randomItem(chosenRule.queries, random);
}

export const ALL_PHOTO_QUERY_IDS = [...new Set([
  ...PHOTO_QUERY_RULES.flatMap((item) => item.queries),
  ...GLOBAL_FALLBACK_QUERIES,
])];
