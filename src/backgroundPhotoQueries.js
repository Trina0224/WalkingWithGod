const RECENT_QUERY_STORAGE_KEY = 'walkingWithGod.recentPhotoQueries';
const RECENT_QUERY_LIMIT = 18;

export const PHOTO_QUERY_GROUPS = [
  {
    id: 'light-and-hope',
    triggers: [
      'light',
      'shine',
      'brightness',
      'morning',
      'dawn',
      'hope',
      'new every morning',
      'glory',
      'resurrection',
      'rise again',
      'rejoice',
      'joy',
      'salvation',
    ],
    queries: [
      'sunrise-water',
      'forest-rays',
      'light-through-clouds',
      'morning-window',
      'golden-mountain',
      'misty-dawn',
    ],
  },
  {
    id: 'peace-and-rest',
    triggers: [
      'peace',
      'rest',
      'comfort',
      'be still',
      'quiet',
      'gentle',
      'do not be anxious',
      'do not be troubled',
      'take care of you',
    ],
    queries: [
      'quiet-lake',
      'foggy-meadow',
      'calm-ocean',
      'minimal-hills',
      'quiet-forest',
      'soft-clouds',
    ],
  },
  {
    id: 'water-and-renewal',
    triggers: [
      'water',
      'sea',
      'ocean',
      'river',
      'fountain',
      'harbour',
      'beach',
      'baptism',
      'living water',
      'wash',
      'clean heart',
      'renew',
    ],
    queries: [
      'ocean-waves',
      'forest-river',
      'waterfall',
      'spring-water',
      'ocean-cliffs',
      'rain-on-leaves',
    ],
  },
  {
    id: 'journey-and-guidance',
    triggers: [
      'way',
      'path',
      'road',
      'footsteps',
      'straight roads',
      'follow',
      'walk',
      'wilderness',
      'guide',
      'lead me',
      'wherever you go',
      'send me',
    ],
    queries: [
      'mountain-path',
      'road-horizon',
      'footsteps-sand',
      'bridge-in-mist',
      'forest-trail',
      'desert-road',
    ],
  },
  {
    id: 'strength-and-protection',
    triggers: [
      'strength',
      'strong',
      'eagle',
      'wings',
      'help',
      'helper',
      'refuge',
      'shelter',
      'rock',
      'shield',
      'deliver',
      'do not fear',
      'take heart',
      'courage',
    ],
    queries: [
      'eagle-mountains',
      'ancient-tree',
      'dramatic-cliffs',
      'shelter-in-rain',
      'mountain-storm',
      'stone-canyon',
    ],
  },
  {
    id: 'love-and-togetherness',
    triggers: [
      'love',
      'heart',
      'friends',
      'families',
      'family',
      'bride',
      'husband',
      'wedding',
      'together',
      'i am ever with you',
      'forgive',
      'kind',
      'brother',
      'sister',
      'neighbour',
    ],
    queries: [
      'joined-hands',
      'couple-silhouette',
      'warm-home-window',
      'two-trees',
      'family-walking',
      'wildflower-pair',
    ],
  },
  {
    id: 'growth-and-abundance',
    triggers: [
      'branches',
      'vine',
      'seed',
      'fruit',
      'harvest',
      'flower',
      'rose',
      'lilies',
      'wealth',
      'wine',
      'grow',
      'abundance',
      'new heart',
    ],
    queries: [
      'vineyard',
      'spring-buds',
      'wildflowers',
      'wheat-field',
      'fruit-tree',
      'garden-morning',
    ],
  },
  {
    id: 'eternity-and-heaven',
    triggers: [
      'eternal',
      'forever',
      'heaven',
      'stars',
      'angel',
      'new heaven',
      'no more death',
      'raise the dead',
    ],
    queries: [
      'milky-way',
      'stars-over-mountains',
      'night-sky-clouds',
      'endless-horizon',
      'moonlit-ocean',
      'aurora-sky',
    ],
  },
  {
    id: 'biblical-landscape',
    triggers: [
      'jesus',
      'christ',
      'cross',
      'israel',
      'jerusalem',
      'biblical',
      'bible',
      'gospel',
      'messiah',
      'apostle',
      'sermon',
      'altar',
      'church',
      'faith',
      'kingdom of god',
      'son of god',
    ],
    queries: [
      'olive-trees',
      'desert-sunrise',
      'ancient-stone-path',
      'wooden-cross-landscape',
      'sea-of-galilee',
      'middle-east-hills',
    ],
  },
  {
    id: 'seasons-and-creation',
    triggers: [
      'forest',
      'autumn',
      'winter',
      'spring',
      'summer',
      'snow',
      'creation',
      'earth',
      'valley',
      'sheep',
      'birds',
      'grass',
      'lilies',
      'made',
    ],
    queries: [
      'autumn-forest',
      'snowy-valley',
      'spring-meadow',
      'summer-coast',
      'sheep-hills',
      'green-valley',
    ],
  },
  {
    id: 'lament-and-solitude',
    triggers: [
      'sorrow',
      'grief',
      'weep',
      'tears',
      'darkness',
      'forgotten',
      'broken heart',
      'crushed spirit',
      'why have you',
      'how long',
      'no hope',
      'trouble',
    ],
    queries: [
      'rainy-window',
      'solitary-tree',
      'stormy-sea',
      'foggy-mountain',
      'empty-shore',
      'dark-forest',
    ],
  },
  {
    id: 'justice-and-mercy',
    triggers: [
      'justice',
      'righteousness',
      'mercy',
      'poor',
      'hungry',
      'stranger',
      'prison',
      'oppressed',
      'widow',
      'orphan',
      'do what is right',
    ],
    queries: [
      'open-hands',
      'shared-bread',
      'welcoming-door',
      'people-helping',
      'city-dawn',
      'rainbow-after-storm',
    ],
  },
  {
    id: 'prayer-and-renewal',
    triggers: [
      'pray',
      'prayer',
      'seek',
      'return to me',
      'repent',
      'forgive us',
      'new spirit',
      'renew',
      'transform',
      'call on',
    ],
    queries: [
      'quiet-room-light',
      'kneeling-silhouette',
      'open-bible-window',
      'rain-clearing',
      'new-leaves',
      'still-morning',
    ],
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

export function getPhotoQueryCandidates(verse = '') {
  return getPhotoQueryMatch(verse).candidates;
}

export function getPhotoQueryMatch(verse = '') {
  const text = normaliseVerse(verse);
  const matchedGroups = PHOTO_QUERY_GROUPS.map((group) => {
    const matchedTriggers = group.triggers.filter((trigger) =>
      containsTrigger(text, trigger)
    );
    const score = matchedTriggers.reduce(
      (total, trigger) => total + (trigger.includes(' ') ? 3 : 1),
      0
    );
    return { ...group, matchedTriggers, score };
  })
    .filter((group) => group.score > 0)
    .sort((left, right) => right.score - left.score);

  if (!matchedGroups.length) {
    return {
      candidates: DEFAULT_QUERIES,
      matchedGroupIds: [],
      confidence: 0,
    };
  }

  const strongestScore = matchedGroups[0].score;
  const relevantGroups = matchedGroups.filter(
    (group) => group.score >= Math.max(1, strongestScore - 1)
  );

  return {
    candidates: unique(relevantGroups.flatMap((group) => group.queries)),
    matchedGroupIds: relevantGroups.map((group) => group.id),
    confidence: strongestScore,
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
    const next = [queryId, ...previous.filter((item) => item !== queryId)].slice(
      0,
      RECENT_QUERY_LIMIT
    );
    storage.setItem(RECENT_QUERY_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Background selection should still work when storage is disabled.
  }
}

export function chooseBackgroundQuery(verse = '', options = {}) {
  return chooseBackgroundQueries(verse, { ...options, count: 1 })[0];
}

export function chooseBackgroundQueries(verse = '', options = {}) {
  const candidates = getPhotoQueryCandidates(verse);
  const storage =
    options.storage ?? (typeof window !== 'undefined' ? window.localStorage : null);
  const random = options.random ?? Math.random;
  const count = Math.max(1, Math.min(options.count ?? 4, candidates.length));
  const recent = readRecentQueries(storage);
  const unseen = candidates.filter((queryId) => !recent.includes(queryId));
  const preferred = [...unseen, ...candidates.filter((queryId) => recent.includes(queryId))];
  const available = [...preferred];
  const chosen = [];

  while (chosen.length < count && available.length) {
    const index = Math.min(
      available.length - 1,
      Math.floor(random() * available.length)
    );
    chosen.push(available.splice(Math.max(0, index), 1)[0]);
  }

  chosen
    .slice()
    .reverse()
    .forEach((queryId) => writeRecentQuery(storage, queryId, readRecentQueries(storage)));

  return chosen;
}

export function shouldUsePhotoPreference(verse = '') {
  return getPhotoQueryMatch(verse).confidence > 0;
}

export const ALL_PHOTO_QUERY_IDS = unique([
  ...PHOTO_QUERY_GROUPS.flatMap((group) => group.queries),
  ...DEFAULT_QUERIES,
]);
