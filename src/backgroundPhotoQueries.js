const RECENT_QUERY_STORAGE_KEY = 'walkingWithGod.recentPhotoQueries';
const RECENT_QUERY_LIMIT = 18;

export const PHOTO_QUERY_GROUPS = [
  {
    id: 'light-and-hope',
    triggers: [
      'light',
      'morning',
      'dawn',
      'hope',
      'glory',
      'resurrection',
      'rejoice',
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
    triggers: ['peace', 'rest', 'comfort', 'grace', 'pray', 'prayer', 'quiet'],
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
    triggers: ['eternal', 'forever', 'heaven', 'stars', 'angel', 'holy', 'spirit'],
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
  const text = normaliseVerse(verse);
  const matchedGroups = PHOTO_QUERY_GROUPS.filter((group) =>
    group.triggers.some((trigger) => containsTrigger(text, trigger))
  );

  if (!matchedGroups.length) return DEFAULT_QUERIES;
  return unique(matchedGroups.flatMap((group) => group.queries));
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
  const candidates = getPhotoQueryCandidates(verse);
  const storage =
    options.storage ?? (typeof window !== 'undefined' ? window.localStorage : null);
  const random = options.random ?? Math.random;
  const recent = readRecentQueries(storage);
  const unseen = candidates.filter((queryId) => !recent.includes(queryId));
  const pool = unseen.length ? unseen : candidates;
  const index = Math.min(pool.length - 1, Math.floor(random() * pool.length));
  const queryId = pool[Math.max(0, index)];

  writeRecentQuery(storage, queryId, recent);
  return queryId;
}

export const ALL_PHOTO_QUERY_IDS = unique([
  ...PHOTO_QUERY_GROUPS.flatMap((group) => group.queries),
  ...DEFAULT_QUERIES,
]);
