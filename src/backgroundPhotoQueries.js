const RECENT_QUERY_STORAGE_KEY = 'walkingWithGod.recentPhotoQueries';
const RECENT_QUERY_LIMIT = 18;

const TIER = {
  symbolic: 1,
  trustedConcept: 2,
  concrete: 3,
};

// Unsplash is strongest when it is asked for something a camera can see.
// Concrete nouns therefore outrank theological moods. Abstract ideas are
// translated into a small, curated set of visible scenes instead of being
// sent to Unsplash verbatim.
export const PHOTO_QUERY_RULES = [
  {
    id: 'light', tier: 'concrete', preferenceSafe: true,
    triggers: ['light', 'lamp', 'candle', 'brightness', 'shine'],
    queries: ['forest-rays', 'light-through-clouds', 'candle-light', 'morning-window'],
  },
  {
    id: 'morning', tier: 'concrete', preferenceSafe: true,
    triggers: ['morning', 'dawn', 'sunrise', 'daybreak'],
    queries: ['sunrise-water', 'misty-dawn', 'golden-mountain'],
  },
  {
    id: 'cloud-fire', tier: 'concrete', preferenceSafe: true,
    triggers: ['pillar of cloud', 'pillar of fire', 'cloud', 'fire', 'flame'],
    queries: ['cloudscape', 'light-through-clouds', 'candle-light', 'desert-sunrise'],
  },
  {
    id: 'river-water', tier: 'concrete', preferenceSafe: true,
    triggers: ['living water', 'still waters', 'spring water', 'waters', 'water', 'river', 'stream', 'fountain', 'springs'],
    queries: ['forest-river', 'spring-water', 'waterfall', 'rain-on-leaves'],
  },
  {
    id: 'sea', tier: 'concrete', preferenceSafe: true,
    triggers: ['sea', 'ocean', 'waves', 'beach', 'shore', 'harbour'],
    queries: ['ocean-waves', 'ocean-cliffs', 'calm-ocean', 'empty-shore'],
  },
  {
    id: 'path', tier: 'concrete', preferenceSafe: true,
    triggers: ['straight roads', 'footsteps', 'path', 'road', 'way', 'walk'],
    queries: ['mountain-path', 'road-horizon', 'footsteps-sand', 'forest-trail'],
  },
  {
    id: 'wilderness', tier: 'concrete', preferenceSafe: true,
    triggers: ['wilderness', 'desert'],
    queries: ['desert-road', 'desert-sunrise', 'stone-canyon'],
  },
  {
    id: 'landscape', tier: 'concrete', preferenceSafe: true,
    triggers: ['green valley', 'valley', 'mountains', 'mountain', 'hills'],
    queries: ['green-valley', 'misty-mountains', 'golden-mountain', 'minimal-hills'],
  },
  {
    id: 'eagle-wings', tier: 'concrete', preferenceSafe: false,
    triggers: ['eagle', 'eagles', 'wings', 'feathers'],
    queries: ['eagle-mountains', 'bird-in-sky', 'sheltering-wings'],
  },
  {
    id: 'rock-shelter', tier: 'concrete', preferenceSafe: true,
    triggers: ['rock', 'stone', 'refuge', 'shelter', 'shield', 'fortress'],
    queries: ['dramatic-cliffs', 'shelter-in-rain', 'stone-canyon', 'mountain-storm'],
  },
  {
    id: 'vine', tier: 'concrete', preferenceSafe: true,
    triggers: ['vine', 'vineyard', 'grapes', 'wine', 'branches'],
    queries: ['vineyard', 'grape-vine', 'fruit-tree'],
  },
  {
    id: 'treasure', tier: 'concrete', preferenceSafe: false,
    triggers: ['treasure', 'wealth', 'riches', 'gold'],
    queries: ['treasure-chest', 'golden-wheat', 'sunlit-treasure'],
  },
  {
    id: 'seed-harvest', tier: 'concrete', preferenceSafe: true,
    triggers: ['mustard seed', 'seed', 'harvest', 'wheat'],
    queries: ['seed-in-hand', 'spring-buds', 'wheat-field'],
  },
  {
    id: 'garden', tier: 'concrete', preferenceSafe: true,
    triggers: ['fruit', 'tree', 'garden', 'flower', 'flowers', 'rose', 'lilies', 'grass'],
    queries: ['fruit-tree', 'garden-morning', 'wildflowers', 'spring-meadow'],
  },
  {
    id: 'shepherd', tier: 'concrete', preferenceSafe: true,
    triggers: ['good shepherd', 'shepherd', 'sheep', 'lamb', 'flock', 'rod', 'staff'],
    queries: ['sheep-hills', 'shepherd-flock', 'lamb-meadow'],
  },
  {
    id: 'sky', tier: 'concrete', preferenceSafe: true,
    triggers: ['stars', 'star', 'moon', 'sky', 'clouds'],
    queries: ['stars-over-mountains', 'milky-way', 'moonlit-ocean', 'cloudscape'],
  },
  {
    id: 'cross-jesus', tier: 'trustedConcept', preferenceSafe: false,
    triggers: ['son of god', 'jesus', 'christ', 'messiah', 'cross', 'gospel'],
    queries: ['wooden-cross-landscape', 'cross-sunrise', 'open-bible-window'],
  },
  {
    id: 'bible', tier: 'concrete', preferenceSafe: false,
    triggers: ['word of god', 'gave the word', 'scripture', 'bible', 'book', 'scroll'],
    queries: ['open-bible-window', 'bible-candle', 'ancient-scroll'],
  },
  {
    id: 'church', tier: 'concrete', preferenceSafe: true,
    triggers: ['church', 'altar', 'temple', 'sanctuary'],
    queries: ['church-interior-light', 'wooden-cross-landscape', 'ancient-stone-path'],
  },
  {
    id: 'holy-land', tier: 'concrete', preferenceSafe: false,
    triggers: ['sea of galilee', 'jerusalem', 'israel', 'galilee', 'olive tree', 'olive trees'],
    queries: ['sea-of-galilee', 'olive-trees', 'middle-east-hills', 'ancient-stone-path'],
  },
  {
    id: 'bread', tier: 'concrete', preferenceSafe: false,
    triggers: ['bread', 'loaf', 'hungry', 'meal', 'table'],
    queries: ['shared-bread', 'bread-on-table', 'welcoming-table'],
  },
  {
    id: 'door', tier: 'concrete', preferenceSafe: true,
    triggers: ['door', 'gate', 'knock'],
    queries: ['welcoming-door', 'open-door-light', 'ancient-gate'],
  },
  {
    id: 'weather', tier: 'concrete', preferenceSafe: true,
    triggers: ['rainbow', 'rain', 'storm', 'thunder', 'wind'],
    queries: ['rainbow-after-storm', 'rainy-window', 'stormy-sea', 'rain-clearing'],
  },
  {
    id: 'snow', tier: 'concrete', preferenceSafe: true,
    triggers: ['snow', 'winter', 'ice'],
    queries: ['snowy-valley', 'snowy-forest', 'winter-mountain'],
  },
  {
    id: 'family', tier: 'concrete', preferenceSafe: true,
    triggers: ['bridegroom', 'bride', 'wedding', 'husband', 'wife', 'family', 'families'],
    queries: ['family-walking', 'couple-silhouette', 'warm-home-window'],
  },
  {
    id: 'hands', tier: 'concrete', preferenceSafe: false,
    triggers: ['hand of god', 'hands', 'hand'],
    queries: ['open-hands', 'joined-hands', 'helping-hand'],
  },
  {
    id: 'sword', tier: 'concrete', preferenceSafe: false,
    triggers: ['sword'],
    queries: ['sword-ground', 'ancient-sword'],
  },
  {
    id: 'love', tier: 'trustedConcept', preferenceSafe: true,
    triggers: ['i am ever with you', 'ever with you', 'love', 'beloved', 'together'],
    queries: ['love-silhouette', 'joined-hands', 'wildflower-pair'],
  },
  {
    id: 'god-faith', tier: 'trustedConcept', preferenceSafe: false,
    triggers: ['kingdom of god', 'god', 'faith'],
    queries: ['god-faith-image', 'wooden-cross-landscape', 'light-through-clouds', 'open-bible-window'],
  },
  {
    id: 'peace', tier: 'symbolic', preferenceSafe: true,
    triggers: ['put your cares', 'cast all your care', 'do not be anxious', 'do not be troubled', 'be still', 'cares', 'care', 'peace', 'rest', 'quiet', 'gentle'],
    queries: ['quiet-lake', 'calm-ocean', 'foggy-meadow', 'still-morning'],
  },
  {
    id: 'hope', tier: 'symbolic', preferenceSafe: true,
    triggers: ['new every morning', 'rise again', 'resurrection', 'hope', 'rejoice', 'joy', 'salvation', 'glory'],
    queries: ['sunrise-water', 'light-through-clouds', 'misty-dawn', 'new-leaves'],
  },
  {
    id: 'strength', tier: 'symbolic', preferenceSafe: true,
    triggers: ['do not fear', 'take heart', 'courage', 'strength', 'strong', 'deliver', 'help', 'helper'],
    queries: ['ancient-tree', 'dramatic-cliffs', 'golden-mountain'],
  },
  {
    id: 'guidance', tier: 'symbolic', preferenceSafe: true,
    triggers: ['wherever you go', 'lead me', 'guide', 'follow', 'send me'],
    queries: ['lighthouse-coast', 'road-horizon', 'mountain-path'],
  },
  {
    id: 'lament', tier: 'symbolic', preferenceSafe: true,
    triggers: ['brokenhearted', 'broken hearts', 'broken heart', 'crushed spirit', 'why have you', 'how long', 'sorrow', 'grief', 'weep', 'tears', 'darkness', 'forgotten', 'trouble'],
    queries: ['rainy-window', 'solitary-tree', 'empty-shore', 'foggy-mountain'],
  },
  {
    id: 'mercy-justice', tier: 'symbolic', preferenceSafe: false,
    triggers: ['do what is right', 'justice', 'righteousness', 'mercy', 'poor', 'stranger', 'prison', 'oppressed', 'widow', 'orphan'],
    queries: ['open-hands', 'shared-bread', 'welcoming-door', 'helping-hand'],
  },
  {
    id: 'prayer', tier: 'symbolic', preferenceSafe: false,
    triggers: ['speak, lord', 'hear my voice', 'listen', 'return to me', 'forgive us', 'call on', 'pray', 'prayer', 'seek', 'repent'],
    queries: ['kneeling-silhouette', 'quiet-room-light', 'open-bible-window'],
  },
  {
    id: 'renewal', tier: 'symbolic', preferenceSafe: true,
    triggers: ['new heart', 'new spirit', 'clean heart', 'renew', 'transform', 'baptism'],
    queries: ['new-leaves', 'spring-water', 'rain-clearing', 'spring-buds'],
  },
  {
    id: 'eternity', tier: 'symbolic', preferenceSafe: true,
    triggers: ['new heaven', 'no more death', 'eternal', 'forever', 'heaven', 'angel'],
    queries: ['endless-horizon', 'stars-over-mountains', 'aurora-sky'],
  },
  {
    id: 'creation', tier: 'symbolic', preferenceSafe: true,
    triggers: ['works of your hands', 'maker of heaven', 'maker', 'created', 'creation', 'earth', 'made'],
    queries: ['wide-nature', 'green-valley', 'cloudscape', 'stars-over-mountains'],
  },
  {
    id: 'time', tier: 'symbolic', preferenceSafe: true,
    triggers: ['appointed time', 'number of our days', 'time', 'days'],
    queries: ['hourglass-window', 'misty-dawn', 'endless-horizon'],
  },
];

const DEFAULT_QUERIES = [
  'wide-nature',
  'misty-mountains',
  'quiet-coast',
  'forest-landscape',
  'sunlit-meadow',
  'cloudscape',
  'green-valley',
  'lake-reflection',
];

function normaliseVerse(verse = '') {
  return verse.toLowerCase().replace(/\s+/g, ' ').trim();
}

function unique(values) {
  return [...new Set(values)];
}

function containsTrigger(text, trigger) {
  const escaped = trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|\\b)${escaped}(?:\\b|$)`, 'i').test(text);
}

function matchRules(verse = '') {
  const text = normaliseVerse(verse);
  return PHOTO_QUERY_RULES.map((rule) => {
    const matchedTriggers = rule.triggers.filter((trigger) => containsTrigger(text, trigger));
    const phraseBonus = Math.max(
      0,
      ...matchedTriggers.map((trigger) => (trigger.includes(' ') ? 2 : 0))
    );
    return {
      ...rule,
      matchedTriggers,
      score: TIER[rule.tier] * 100 + matchedTriggers.length * 5 + phraseBonus,
    };
  })
    .filter((rule) => rule.matchedTriggers.length > 0)
    .sort((left, right) => right.score - left.score);
}

export function getPhotoQueryCandidates(verse = '') {
  return getPhotoQueryMatch(verse).candidates;
}

export function getPhotoQueryMatch(verse = '') {
  const matchedRules = matchRules(verse);
  if (!matchedRules.length) {
    return {
      candidates: DEFAULT_QUERIES,
      primaryCandidates: DEFAULT_QUERIES,
      secondaryCandidates: [],
      matchedRuleIds: [],
      confidence: 0,
      preferenceSafe: true,
    };
  }

  const strongestTier = TIER[matchedRules[0].tier];
  const primaryRules = matchedRules.filter((rule) => TIER[rule.tier] === strongestTier);
  const secondaryRules = matchedRules.filter((rule) => TIER[rule.tier] < strongestTier);
  const primaryCandidates = unique(primaryRules.flatMap((rule) => rule.queries));
  const secondaryCandidates = unique(
    secondaryRules
      .flatMap((rule) => rule.queries)
      .filter((queryId) => !primaryCandidates.includes(queryId))
  );

  return {
    candidates: [...primaryCandidates, ...secondaryCandidates],
    primaryCandidates,
    secondaryCandidates,
    matchedRuleIds: matchedRules.map((rule) => rule.id),
    confidence: matchedRules[0].score,
    preferenceSafe: primaryRules.every((rule) => rule.preferenceSafe),
  };
}

function readRecentQueries(storage) {
  if (!storage) return [];
  try {
    const value = JSON.parse(storage.getItem(RECENT_QUERY_STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function writeRecentQuery(storage, queryId, previous) {
  if (!storage) return;
  try {
    const next = [queryId, ...previous.filter((item) => item !== queryId)].slice(0, RECENT_QUERY_LIMIT);
    storage.setItem(RECENT_QUERY_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Background selection should still work when storage is disabled.
  }
}

function drawFromPool(pool, recent, random) {
  if (!pool.length) return null;
  const unseen = pool.filter((queryId) => !recent.includes(queryId));
  const available = unseen.length ? unseen : pool;
  const index = Math.min(available.length - 1, Math.floor(random() * available.length));
  return available[Math.max(0, index)];
}

export function chooseBackgroundQuery(verse = '', options = {}) {
  return chooseBackgroundQueries(verse, { ...options, count: 1 })[0];
}

export function chooseBackgroundQueries(verse = '', options = {}) {
  const match = getPhotoQueryMatch(verse);
  const storage = options.storage ?? (typeof window !== 'undefined' ? window.localStorage : null);
  const random = options.random ?? Math.random;
  const count = Math.max(1, Math.min(options.count ?? 4, match.candidates.length));
  const recent = readRecentQueries(storage);
  const primary = [...match.primaryCandidates];
  const secondary = [...match.secondaryCandidates];
  const chosen = [];

  while (chosen.length < count && (primary.length || secondary.length)) {
    const pool = primary.length ? primary : secondary;
    const queryId = drawFromPool(pool, [...recent, ...chosen], random);
    if (!queryId) break;
    chosen.push(queryId);
    pool.splice(pool.indexOf(queryId), 1);
  }

  chosen
    .slice()
    .reverse()
    .forEach((queryId) => writeRecentQuery(storage, queryId, readRecentQueries(storage)));

  return chosen;
}

export function shouldUsePhotoPreference(verse = '') {
  return getPhotoQueryMatch(verse).preferenceSafe;
}

export const ALL_PHOTO_QUERY_IDS = unique([
  ...PHOTO_QUERY_RULES.flatMap((rule) => rule.queries),
  ...DEFAULT_QUERIES,
]);
