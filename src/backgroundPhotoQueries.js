const rule = (id, priority, triggers, queries, options = {}) => ({
  id,
  priority,
  triggers,
  queries,
  excludes: options.excludes || [],
  kind: options.kind || 'word',
  exclusive: Boolean(options.exclusive),
});

const phrase = (id, priority, triggers, queries, options = {}) =>
  rule(id, priority, triggers, queries, { ...options, kind: 'phrase' });

// Global phrase sea. These rules are based on wording, never on one hard-coded
// verse reference, so the same phrase works anywhere it appears. Only visually
// decisive phrases are exclusive; theological phrases join the wider draw.
export const PHOTO_PHRASE_RULES = [
  phrase('living-water', 130, ['living water'], ['water'], { exclusive: true }),
  phrase('still-waters', 130, ['still waters'], ['water'], { exclusive: true }),
  phrase('sea-of-galilee', 130, ['sea of galilee'], ['sea'], { exclusive: true }),
  phrase('mustard-seed', 130, ['mustard seed'], ['seed-mustard'], { exclusive: true }),
  phrase('pillar-fire', 130, ['pillar of fire'], ['fire'], { exclusive: true }),
  phrase('pillar-cloud', 130, ['pillar of cloud'], ['cloud'], { exclusive: true }),
  phrase('crown-thorns', 130, ['crown of thorns'], ['thorns-crown'], { exclusive: true }),
  phrase('good-shepherd', 130, ['good shepherd'], ['shepherd'], { exclusive: true }),
  phrase('bruised-reed', 130, ['bruised reed', 'crushed reed', 'crushed stem'], ['reed'], { exclusive: true }),
  phrase('armor-god', 130, ['armor of god', 'armour of god', 'arms of god', "god's instruments of war"], ['armor-ancient', 'shield', 'sword-ancient'], { exclusive: true }),
  phrase('where-you-go', 130, ['where you go i will go', 'wherever you go i will go'], ['friends-walking', 'family-walking', 'hands-friendship'], { exclusive: true }),
  phrase('friend-all-times', 130, ['friend is loving at all times', 'friend loves at all times'], ['friends-together', 'hands-friendship', 'friends-walking'], { exclusive: true }),
  phrase('fatherless-child', 130, ['child who has no father', 'fatherless child', 'the fatherless'], ['child-hand', 'hand-helping', 'child'], { exclusive: true }),
  phrase('least-of-these', 130, ['least of these', 'in need of food', 'i was hungry'], ['hands-serving', 'food-serving', 'service-humble', 'hand-helping'], { exclusive: true }),
  phrase('by-his-wounds', 130, ['by his wounds', 'with his wounds', 'by whose wounds'], ['cross-christian', 'cross-wooden'], { exclusive: true }),
  phrase('word-god', 120, ['word of god'], ['bible-open', 'bible-pages']),
  phrase('gave-word', 120, ['gave the word', 'his word'], ['bible-open', 'bible-pages']),
  phrase('father-god', 70, ['father in heaven', 'heavenly father', 'god our father', 'god the father', 'father for ever', 'everlasting father'], ['jesus', 'cross-christian', 'worship-christian', 'hands-raised-worship']),
  phrase('cast-cares', 70, ['cast all your cares', 'cast all your anxiety', 'put your cares on the lord', 'putting all your troubles on him'], ['hands-open', 'hands-prayer', 'hand-helping']),
  phrase('no-anxiety', 70, ['no care for tomorrow', 'do not worry', "don't worry", 'do not be anxious', 'do not be troubled', 'let not your heart be troubled'], ['child-sleeping', 'dove-white', 'hands-open']),
  phrase('ever-with-you', 70, ['i am ever with you', 'i am with you always', 'i will be with you at all times'], ['jesus', 'worship-christian', 'hands-open']),
  phrase('guard-heart', 70, ['keep watch over your heart', 'guard your heart'], ['hands-open', 'bible-open', 'family-embrace']),
  phrase('clean-heart', 70, ['clean heart', 'new heart'], ['hands-open', 'bible-prayer', 'light-beam']),
  phrase('broken-hearted', 70, ['broken-hearted', 'brokenhearted', 'heart is broken'], ['embrace-comforting', 'hand-helping', 'hands-prayer']),
  phrase('time-season', 100, ['fixed time', 'good use of the time', 'a time for', 'right in its time'], ['hourglass', 'clock', 'sundial']),
  phrase('numbered-days', 100, ['number of our days', 'number our days', 'days are numbered'], ['hourglass', 'clock', 'sundial']),
  phrase('help-weak', 70, ['give help to the feeble', 'help the weak', 'support the weak'], ['hands-serving', 'service-humble', 'hand-helping']),
  phrase('gathered-together', 70, ['two or three are come together', 'two or three are gathered together', 'two or three gather in my name'], ['worship-christian', 'friends-together', 'hands-prayer']),
  phrase('sacred-house', 120, ['house of god', 'house of the lord', 'house was full of the cloud'], ['temple-ancient', 'church-interior']),
];

// Stable visual dictionary. Every candidate in one rule must show that same
// subject. Unrelated nouns must never share a candidate pool.
export const PHOTO_QUERY_RULES = [
  ...PHOTO_PHRASE_RULES,

  // Distinctive objects. These outrank generic scenery.
  rule('water', 120, ['waters', 'water'], ['water', 'water-clear', 'surface-water', 'water-flowing']),
  rule('river', 120, ['jordan river', 'river'], ['river', 'river-flowing', 'river-forest']),
  rule('stream', 120, ['stream', 'brook'], ['stream', 'stream-forest', 'brook-mountain']),
  rule('spring', 120, ['fountain', 'springs', 'spring of water', 'water spring'], ['spring-natural', 'water-fountain', 'water-spring']),
  rule('well', 120, ['wells', 'the well', 'a well', 'water well', 'well of water'], ['well-water', 'well-ancient', 'well-stone']),
  rule('sea', 120, ['ocean', 'waves', 'wave', 'sea'], ['sea', 'waves-ocean', 'sea-calm']),
  rule('shore', 120, ['harbour', 'harbor', 'shore', 'beach'], ['shore-empty', 'harbour-fishing', 'waves-ocean']),

  rule('eagle', 120, ['eagles', 'eagle'], ['eagle', 'eagle-flying', 'wings-eagle']),
  rule('wings', 120, ['wings', 'wing'], ['wings', 'wings-eagle', 'wings-bird', 'wings-sheltering']),
  rule('sheep', 120, ['sheep'], ['sheep', 'flock-sheep', 'sheep-hillside']),
  rule('lamb', 120, ['lamb'], ['lamb', 'lamb-field', 'lamb-young']),
  rule('dove', 120, ['dove'], ['dove', 'dove-white', 'dove-flying']),
  rule('sparrow', 120, ['sparrows', 'sparrow'], ['bird-sparrow']),
  rule('raven', 120, ['ravens', 'raven'], ['bird-raven']),
  rule('lion', 120, ['lion'], ['lion']),
  rule('donkey', 120, ['donkey'], ['donkey']),
  rule('horse', 120, ['horses', 'horse'], ['horse']),
  rule('serpent', 120, ['serpent', 'snake'], ['snake']),
  rule('bird', 110, ['birds', 'bird'], ['bird', 'birds-flying', 'bird-sky']),

  rule('cross', 120, ['the cross', 'his cross', 'my cross', 'your cross', 'a cross', 'cross of christ'], ['cross-christian', 'cross-wooden', 'cross-sunrise', 'cross-silhouette']),
  rule('bible', 120, ['scripture', 'bible'], ['bible-open', 'bible-window', 'bible-candle', 'bible-pages']),
  rule('scroll', 120, ['scroll'], ['scroll-ancient', 'scroll-parchment']),
  rule('church', 120, ['church'], ['church-interior', 'church-small', 'church-window', 'church-sunrise']),
  rule('temple', 120, ['temple', 'sanctuary'], ['temple-ancient', 'sanctuary-interior', 'architecture-sacred']),
  rule('altar', 120, ['altar'], ['altar-church', 'altar-candlelit', 'altar-stone']),
  rule('baptism', 120, ['baptism'], ['baptism-water', 'baptism-river', 'baptism-church']),

  rule('bread', 120, ['loaf', 'bread'], ['bread-loaf', 'bread-table', 'bread-breaking']),
  rule('wine', 120, ['wine'], ['wine-glass', 'cup-wine', 'wine-red'], { excludes: ['not taken wine', 'have not taken wine'] }),
  rule('cup', 120, ['cup'], ['cup', 'cup-wooden', 'cup-wine', 'cup-table']),
  rule('grape', 120, ['grapes', 'grape'], ['grapes', 'vine-grape', 'vineyard']),
  rule('vine', 120, ['vineyard', 'vines', 'vine'], ['vine-grape', 'vine-branches', 'vineyard']),
  rule('fig', 120, ['fig tree', 'figs', 'fig'], ['figs', 'tree-fig', 'leaves-fig']),
  rule('olive', 120, ['olive trees', 'olive tree', 'olives', 'olive'], ['olives', 'branch-olive', 'tree-olive-ancient', 'grove-olive']),
  rule('seed', 120, ['seeds', 'seed'], ['seed-hand', 'seed-soil', 'seedling']),
  rule('wheat', 120, ['wheat'], ['wheat', 'field-wheat', 'wheat-hand']),
  rule('grain', 120, ['grain'], ['grain-hand', 'field-wheat']),
  rule('lily', 120, ['lilies', 'lily'], ['lily-white', 'lily-flower', 'lilies-blooming']),
  rule('rose', 120, ['roses', 'rose'], ['rose', 'rose-red', 'rose-white', 'roses-blooming']),
  rule('flower', 110, ['flowers', 'flower'], ['flower-closeup', 'flowers-blooming', 'wildflowers']),
  rule('thorn', 120, ['thorns', 'thorn'], ['branch-thorn', 'thorns-closeup']),
  rule('reed', 120, ['crushed reed', 'crushed stem', 'reeds', 'reed'], ['reed', 'reeds-water', 'reed-single']),

  rule('fish', 120, ['fish'], ['fish', 'catch-fishing', 'fish-bread']),
  rule('honey', 120, ['honey'], ['honey', 'honeycomb', 'jar-honey']),
  rule('milk', 120, ['milk'], ['milk', 'cup-milk', 'milk-bread']),
  rule('oil', 120, ['olive oil', 'oil'], ['oil-olive', 'jar-oil', 'lamp-oil']),
  rule('salt', 120, ['salt'], ['salt', 'crystals-salt', 'salt-hand']),
  rule('jar', 120, ['water jar', 'jar'], ['jar-water-clay', 'jar-clay-ancient', 'jar-table']),
  rule('vessel', 120, ['vessels', 'vessel'], ['vessel-clay', 'vessel-ceramic']),
  rule('bowl', 120, ['bowl'], ['bowl-wooden', 'bowl-clay']),

  rule('lamp', 120, ['oil lamp', 'lamp'], ['lamp-oil', 'lamp-ancient']),
  rule('candle', 120, ['candle'], ['candle', 'candle-light']),
  rule('fire', 120, ['flame', 'fire'], ['fire', 'flame', 'fire-camp', 'flame-candle']),
  rule('cloud', 120, ['clouds', 'cloud'], ['cloud', 'clouds-dramatic', 'cloud-desert']),
  rule('sunrise', 120, ['sunrise', 'dawn'], ['sunrise', 'dawn', 'sun-clouds']),
  rule('sunset', 120, ['sunset'], ['sunset', 'sun-clouds']),
  rule('sun', 120, ['sun'], ['sunlight', 'sun-clouds']),
  rule('moon', 120, ['moon'], ['moon', 'moonlight', 'moon-water']),
  rule('star', 120, ['stars', 'star'], ['stars', 'sky-night', 'stars-mountains']),
  rule('rain', 120, ['rain'], ['rain-window', 'water-flowing']),
  rule('rainbow', 120, ['rainbow'], ['rainbow-rain']),
  rule('snow', 120, ['snow'], ['snow-field']),
  rule('lightning', 120, ['lightning'], ['lightning-storm']),
  rule('storm', 120, ['storm'], ['storm-clouds']),

  rule('boat', 120, ['boat', 'ship'], ['boat', 'boat-fishing', 'boat-lake']),
  rule('net', 120, ['fishing net', 'net'], ['net-fishing']),
  rule('door', 120, ['door'], ['door-open', 'door-light']),
  rule('window', 120, ['window'], ['window-light']),
  rule('gate', 120, ['gate'], ['gate-ancient', 'gate-open']),
  rule('sword', 120, ['sword'], ['sword-ancient']),
  rule('shield', 120, ['shield'], ['shield-ancient', 'shield']),
  rule('armor', 120, ['armour', 'armor', 'breastplate'], ['armor-ancient', 'shield-ancient']),
  rule('yoke', 120, ['yoke'], ['yoke-wooden']),
  rule('clothing', 120, ['clothing', 'garment'], ['clothing-linen', 'garment-white', 'wool-white']),
  rule('prison', 120, ['prison'], ['bars-prison']),
  rule('chains', 120, ['chains', 'chain'], ['chains-broken']),
  rule('crown', 120, ['crown'], ['crown', 'crown-golden']),
  rule('throne', 120, ['throne'], ['throne-empty']),
  rule('treasure', 120, ['treasure', 'riches', 'wealth'], ['chest-treasure', 'coins-gold', 'jewels']),
  rule('pearl', 120, ['pearls', 'pearl'], ['pearl-shell']),
  rule('key', 120, ['keys', 'key'], ['key-antique']),
  rule('harp', 120, ['harp'], ['harp']),
  rule('lyre', 120, ['lyre'], ['lyre-ancient']),
  rule('trumpet', 120, ['trumpet'], ['trumpet']),
  rule('choir', 120, ['choir'], ['choir-church']),
  rule('hand', 120, ['hands', 'hand'], ['hands-open', 'hand-helping']),
  rule('feet', 120, ['feet', 'foot'], ['feet-walking']),
  rule('eyes', 120, ['eyes', 'eye'], ['eyes-closeup']),
  rule('jerusalem', 120, ['jerusalem'], ['jerusalem-old-city']),
  rule('bethlehem', 120, ['bethlehem'], ['bethlehem-church']),
  rule('israel', 120, ['israel'], ['israel-desert', 'jerusalem-old-city']),
  rule('egypt', 120, ['egypt'], ['egypt-desert']),

  // People stay separate too.
  rule('father', 120, ['father'], ['father-child', 'father-baby', 'father-daughter', 'father-son'], { excludes: ['no father', 'fatherless', 'father in heaven', 'father for ever', 'everlasting father'] }),
  rule('mother', 120, ['mother'], ['mother-child', 'mother-baby', 'mother-daughter', 'mother-son']),
  rule('child', 120, ['children', 'child'], ['child', 'children-playing', 'child-hand', 'child-sunlight'], { excludes: ['children of israel', 'little children'] }),
  rule('baby', 120, ['infant', 'baby'], ['baby', 'baby-holding', 'baby-sleeping']),
  rule('family', 120, ['families', 'family', 'parents', 'parent'], ['family-embrace', 'family-walking', 'parent-child', 'family-hands']),
  rule('wedding', 120, ['bridegroom', 'marriage', 'wedding', 'bride', 'groom'], ['rings-wedding', 'bride-groom', 'hands-wedding', 'ceremony-wedding']),
  rule('friend', 120, ['friends', 'friend'], ['friends-together', 'hands-friendship', 'friends-walking']),
  rule('shepherd', 120, ['shepherd'], ['shepherd', 'shepherd-flock', 'staff-shepherd']),
  rule('fisherman', 120, ['fisherman'], ['fisherman', 'net-fishing', 'boat-fishing']),
  rule('farmer', 120, ['sower', 'farmer'], ['farmer', 'seed-sowing', 'seed-planting']),
  rule('carpenter', 120, ['carpenter'], ['carpenter', 'hands-woodworking', 'tools-wooden']),
  rule('potter', 120, ['potter'], ['potter', 'vessel-clay', 'clay-shaping']),

  // Concrete actions and life scenes. These keep long passages from being
  // reduced to one incidental object such as "stone".
  rule('birth', 110, ['newborn', 'born', 'birth'], ['baby', 'baby-holding', 'mother-baby']),
  rule('death', 110, ['death', 'dead', 'die'], ['tomb-empty', 'candle', 'flower-fading']),
  rule('planting', 110, ['planting', 'planted', 'plant', 'pluck', 'uproot'], ['seed-hand', 'seed-soil', 'seed-planting']),
  rule('healing', 110, ['healing', 'healed', 'heal'], ['hand-helping', 'embrace-comforting', 'hands-open']),
  rule('building', 110, ['building', 'build', 'built'], ['carpenter', 'hands-woodworking', 'tools-wooden']),

  // Generic scenery is valid when the passage actually names it. It shares the
  // draw with other matched subjects instead of replacing or being discarded.
  rule('mountain', 100, ['mountains', 'mountain'], ['mountain', 'peak-mountain', 'mountains-mist']),
  rule('hill', 100, ['hills', 'hill'], ['hills-green', 'hills-rolling', 'hill-sunrise']),
  rule('valley', 100, ['valley'], ['valley', 'valley-green', 'valley-mist']),
  rule('rock', 100, ['rock'], ['rock', 'rock-massive', 'rock-sea']),
  rule('stone', 100, ['stones', 'stone'], ['stone', 'stones-ancient', 'path-stone']),
  rule('cave', 100, ['cave'], ['cave', 'entrance-cave', 'light-cave']),
  rule('desert', 100, ['wilderness', 'desert'], ['wilderness', 'desert-wilderness', 'path-wilderness', 'desert-road']),
  rule('path', 100, ['footsteps', 'path', 'road'], ['path', 'path-forest', 'path-mountain', 'road-horizon', 'footsteps-sand']),
  rule('tree', 100, ['branches', 'branch', 'trees', 'tree'], ['tree-ancient', 'tree-field']),
  rule('field', 100, ['field'], ['tree-field', 'field-wheat']),
  rule('garden', 100, ['garden'], ['garden-path', 'flowers-blooming']),
  rule('grass', 100, ['grass'], ['grass-dew']),
  rule('house', 100, ['house', 'home'], ['house-countryside'], { excludes: ['prison-house', 'house of god', 'house of the lord', 'house was full of the cloud'] }),
  rule('room', 100, ['upper room', 'the room', 'a room'], ['room-sunlit']),
  rule('wall', 100, ['wall'], ['wall-stone-ancient']),
  rule('tower', 100, ['tower'], ['tower-stone']),
  rule('sky', 100, ['sky'], ['sky-open', 'sky-night']),
  rule('light', 100, ['light'], ['light-beam', 'light-clouds', 'morning-window']),
  rule('morning', 100, ['morning', 'daybreak'], ['dawn', 'morning-window', 'sunlight']),

  // Curated concepts may participate beside visible subjects.
  rule('god', 70, ['kingdom of god', 'son of god', 'jesus', 'christ', 'messiah', 'saviour', 'savior', 'lord', 'god'], ['jesus', 'cross-christian', 'worship-christian', 'hands-raised-worship']),
  rule('worship', 70, ['holy spirit', 'spirit of god', 'spirit of the lord', 'put my spirit', 'my spirit in you', 'worship', 'praise', 'faith', 'gospel', 'redemption', 'salvation', 'miracle', 'great things'], ['worship-christian', 'hands-raised-worship', 'church-worship', 'bible-open', 'cross']),
  rule('prayer', 70, ['praying', 'prayer', 'pray'], ['prayer-kneeling', 'hands-prayer', 'bible-prayer', 'person-praying']),
  rule('love', 70, ['embracing', 'embrace', 'beloved', 'love'], ['parent-child', 'mother-child', 'father-child', 'rings-wedding', 'family-embrace', 'baby-holding'], { excludes: ['love of money'] }),
  rule('comfort', 70, ['comforted', 'comfort'], ['embrace-comforting', 'hand-helping', 'parent-child']),

  // Abstract ideas become concrete, human-scale scenes. Generic landscapes
  // are reserved for verses that explicitly mention their visible subjects.
  rule('peace', 50, ['be still', 'peace', 'rest'], ['child-sleeping', 'dove-white', 'candle-light', 'room-sunlit']),
  rule('hope', 50, ['hope'], ['door-open', 'seedling', 'candle-light', 'hands-open']),
  rule('strength', 50, ['strength', 'power', 'courage'], ['shield', 'eagle-flying', 'hands-woodworking', 'fortress-stone']),
  rule('protection', 50, ['protection', 'safe', 'refuge', 'shelter'], ['shield', 'shelter', 'wings-sheltering', 'family-embrace']),
  rule('guidance', 50, ['guidance', 'guide', 'lead', 'follow'], ['lamp-oil', 'feet-walking', 'door-light', 'shepherd-flock']),
  rule('mercy', 50, ['compassion', 'forgiveness', 'forgive', 'mercy', 'grace'], ['hand-helping', 'parent-child', 'embrace-comforting', 'cross']),
  rule('sorrow', 50, ['mourning', 'mourn', 'sorrow', 'grief', 'troubles', 'trouble', 'tears', 'weeping', 'weep'], ['tears', 'chair-empty', 'embrace-comforting', 'hands-prayer'], { excludes: ['no care for tomorrow', 'do not be troubled', 'let not your heart be troubled', 'putting all your troubles on him'] }),
  rule('joy', 50, ['laughing', 'laugh', 'dancing', 'dance', 'rejoice', 'joy'], ['child-laughing', 'children-playing', 'celebration', 'family-embrace']),
  rule('eternal', 50, ['eternal', 'forever'], ['bible-open', 'cross-christian', 'candle-light', 'church-window']),
  rule('freedom', 50, ['freedom', 'free'], ['chains-broken', 'gate-open', 'bird-flying'], { excludes: ['not let wrongdoers go free'] }),
  rule('wisdom', 50, ['wisdom', 'knowledge'], ['book-old', 'bible', 'lamp', 'reading']),
];

// Used only if absolutely no approved trigger exists. Keep this pool concrete,
// varied and human-scale: no generic scenery and no violent/dark subjects.
export const GLOBAL_FALLBACK_QUERIES = [
  'bible-open', 'jesus', 'cross-christian',
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
  const matched = PHOTO_QUERY_RULES.filter((item) =>
    item.triggers.some((trigger) => containsTrigger(text, trigger)) &&
    !item.excludes.some((excluded) => containsTrigger(text, excluded))
  );

  if (!matched.length) {
    return {
      matchedRuleIds: [],
      suppressedRuleIds: [],
      priority: 10,
      candidates: GLOBAL_FALLBACK_QUERIES,
    };
  }

  // Exact phrases describe one unmistakable image and may take exclusive
  // control. Otherwise every meaningful match participates, just as in the
  // earliest version; a lone high-priority noun cannot hijack a whole passage.
  const exclusive = matched.filter((item) => item.exclusive);
  const participating = exclusive.length ? exclusive : matched;
  const priority = Math.max(...participating.map((item) => item.priority));
  return {
    matchedRuleIds: participating.map((item) => item.id),
    suppressedRuleIds: exclusive.length
      ? matched.filter((item) => !item.exclusive).map((item) => item.id)
      : [],
    priority,
    candidates: [...new Set(participating.flatMap((item) => item.queries))],
  };
}

export function chooseBackgroundQuery(verse = '', options = {}) {
  const random = options.random ?? Math.random;
  const match = getPhotoQueryMatch(verse);
  const matchingRules = PHOTO_QUERY_RULES.filter(
    (item) => match.matchedRuleIds.includes(item.id)
  );
  if (!matchingRules.length) return randomItem(match.candidates, random);
  return randomItem(randomItem(matchingRules, random).queries, random);
}

export const ALL_PHOTO_QUERY_IDS = [...new Set([
  ...PHOTO_QUERY_RULES.flatMap((item) => item.queries),
  ...GLOBAL_FALLBACK_QUERIES,
])];
