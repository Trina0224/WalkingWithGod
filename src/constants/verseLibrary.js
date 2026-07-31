import originalVerses from './defaultVerses.js';

export const VERSE_CATEGORIES = [
  { value: 'all', label: 'All Verses' },
  { value: 'peace', label: 'Peace & Comfort' },
  { value: 'waiting', label: 'Faith & Waiting' },
  { value: 'struggle', label: 'Hardship & Sorrow' },
  { value: 'wisdom', label: 'Wisdom & Daily Life' },
  { value: 'love', label: 'Love & Relationships' },
  { value: 'renewal', label: 'Prayer & Renewal' },
  { value: 'calling', label: 'Calling & Courage' },
  { value: 'justice', label: 'Justice & Mercy' },
  { value: 'grace', label: 'Grace & Identity' },
  { value: 'hope', label: 'Hope & Eternity' },
  { value: 'creation', label: 'Creation & Praise' },
];

const KNOWN_CATEGORY_IDS = new Set(
  VERSE_CATEGORIES.map((category) => category.value).filter(
    (category) => category !== 'all'
  )
);

const BOOK_DEFAULT_CATEGORIES = {
  Exo: ['waiting'],
  Num: ['grace'],
  '1Ch': ['renewal'],
  '2Ch': ['creation'],
  Psm: ['peace'],
  Ecc: ['wisdom'],
  '1Co': ['love'],
  '2Co': ['struggle'],
  Act: ['calling'],
  Rom: ['grace'],
  Mat: ['wisdom'],
  Job: ['struggle'],
  Phl: ['waiting'],
  Neh: ['creation'],
  '2Ti': ['calling'],
  Isa: ['hope'],
  Luk: ['waiting'],
  Jos: ['calling'],
  Jer: ['hope'],
  Pro: ['wisdom'],
  Gal: ['grace'],
  Eph: ['grace'],
  '1Pe': ['waiting'],
  Son: ['love'],
  Jhn: ['waiting'],
  Heb: ['waiting'],
  '1Jn': ['love'],
};

const REFERENCE_CATEGORIES = {
  'Exo-20-2-2': ['grace'],
  'Exo-13-22-22': ['calling'],
  'Exo-14-22-22': ['calling'],
  'Exo-14-20-20': ['peace'],
  'Psm-57-1-1': ['struggle', 'waiting'],
  'Psm-51-10-10': ['renewal'],
  'Psm-55-22-22': ['waiting'],
  'Psm-23-4-4': ['struggle', 'waiting'],
  'Psm-33-9-9': ['creation'],
  'Psm-46-1-1': ['struggle', 'waiting'],
  'Psm-42-5-5': ['struggle', 'hope'],
  'Psm-68-6-6': ['love', 'justice'],
  'Psm-27-1-1': ['calling', 'hope'],
  'Psm-90-12-12': ['wisdom'],
  'Psm-94-18-19': ['struggle'],
  'Psm-118-14-17': ['calling', 'creation'],
  'Psm-139-13-14': ['grace', 'creation'],
  'Psm-143-8-8': ['renewal', 'calling'],
  '1Co-13-4-8': ['waiting'],
  '2Co-1-4-5': ['peace', 'love'],
  '2Co-1-8-9': ['waiting', 'hope'],
  '2Co-4-16-17': ['waiting', 'hope'],
  '2Co-4-18-18': ['hope'],
  '2Co-4-7-9': ['calling', 'hope'],
  '2Co-12-9-9': ['grace'],
  'Act-20-35-35': ['love', 'justice'],
  'Rom-8-28-28': ['waiting', 'hope'],
  'Rom-8-28-30': ['waiting', 'hope'],
  'Rom-8-37-39': ['love', 'hope'],
  'Rom-5-1-2': ['peace', 'hope'],
  'Rom-5-3-5': ['struggle', 'waiting', 'hope'],
  'Mat-6-34-34': ['peace'],
  'Mat-6-31-34': ['peace', 'waiting'],
  'Mat-5-44-44': ['love', 'justice'],
  'Mat-11-28-30': ['peace', 'struggle'],
  'Mat-6-9-13': ['renewal'],
  'Mat-18-20-20': ['love'],
  'Mat-28-20-20': ['calling'],
  'Job-5-2-2': ['wisdom'],
  'Job-5-8-9': ['renewal'],
  'Job-5-17-20': ['wisdom'],
  'Job-5-19-20': ['waiting'],
  'Job-8-3-3': ['justice'],
  'Job-8-6-7': ['hope'],
  'Job-8-20-20': ['justice'],
  'Job-9-10-10': ['creation'],
  'Phl-4-13-13': ['calling'],
  'Phl-3-7-8': ['grace'],
  'Phl-3-14-14': ['calling'],
  'Phl-4-6-7': ['peace', 'renewal'],
  'Neh-8-10-10': ['peace'],
  'Isa-1-18-18': ['renewal', 'grace'],
  'Isa-41-10-10': ['peace', 'calling'],
  'Isa-9-6-6': ['peace', 'grace'],
  'Isa-40-31-31': ['waiting', 'calling'],
  'Isa-40-28-28': ['creation', 'wisdom'],
  'Isa-30-15-15': ['peace', 'waiting'],
  'Isa-40-29-31': ['struggle', 'waiting'],
  'Isa-42-3-3': ['peace', 'justice'],
  'Isa-43-1-1': ['grace', 'calling'],
  'Isa-53-5-5': ['struggle', 'grace'],
  'Isa-60-1-3': ['calling', 'creation'],
  'Luk-2-14-14': ['peace', 'creation'],
  'Luk-17-21-21': ['grace'],
  'Luk-18-27-27': ['calling'],
  'Luk-11-1-4': ['renewal'],
  'Jos-1-9-9': ['waiting'],
  'Jer-29-11-11': ['peace', 'waiting'],
  'Pro-3-5-6': ['waiting', 'calling'],
  'Gal-5-1-1': ['calling'],
  'Gal-5-22-23': ['peace', 'love', 'wisdom'],
  'Eph-6-10-18': ['calling', 'renewal'],
  'Eph-5-15-16': ['wisdom'],
  '1Pe-1-24-25': ['creation', 'hope'],
  '1Pe-1-8-8': ['love', 'hope'],
  '1Pe-5-10-10': ['struggle', 'hope'],
  '1Pe-5-7-7': ['peace'],
  'Jhn-3-16-16': ['love', 'grace', 'hope'],
  'Jhn-4-13-14': ['renewal', 'hope'],
  'Jhn-13-1-1': ['love'],
  'Jhn-14-16-18': ['peace', 'grace'],
  'Jhn-14-1-1': ['peace'],
  'Jhn-14-27-27': ['peace'],
  'Jhn-16-33-33': ['peace', 'struggle', 'hope'],
  'Heb-12-12-13': ['struggle', 'calling'],
  'Heb-12-28-28': ['creation', 'grace'],
  'Heb-13-5-5': ['wisdom', 'peace'],
  '1Jn-4-18-18': ['peace'],
};

function referenceKey(verse) {
  return [
    verse.value,
    verse.chapter,
    verse.verseStart,
    verse.verseEnd,
  ].join('-');
}

function unique(values) {
  return [...new Set(values)];
}

function categoriesForOriginalVerse(verse) {
  return unique([
    ...(BOOK_DEFAULT_CATEGORIES[verse.value] || ['waiting']),
    ...(REFERENCE_CATEGORIES[referenceKey(verse)] || []),
  ]);
}

function passage(value, label, chapter, verseStart, verseEnd, categories) {
  return {
    key: '',
    value,
    label,
    chapter: String(chapter),
    verseStart: String(verseStart),
    verseEnd: String(verseEnd),
    categories,
  };
}

const addedVerses = [
  passage('Psm', 'Psalms', 34, 18, 18, ['peace', 'struggle']),
  passage('Psm', 'Psalms', 62, 5, 8, ['peace', 'waiting']),
  passage('Psm', 'Psalms', 131, 1, 2, ['peace', 'waiting']),
  passage('Isa', 'Isaiah', 66, 13, 13, ['peace']),
  passage('Zep', 'Zephaniah', 3, 17, 17, ['peace', 'love', 'grace']),

  passage('Psm', 'Psalms', 13, 1, 6, ['waiting', 'struggle', 'renewal']),
  passage('Psm', 'Psalms', 37, 7, 7, ['waiting', 'peace']),
  passage('Psm', 'Psalms', 130, 5, 6, ['waiting', 'hope']),
  passage('Lam', 'Lamentations', 3, 25, 26, ['waiting', 'peace']),
  passage('Hab', 'Habakkuk', 2, 3, 3, ['waiting', 'hope']),

  passage('Psm', 'Psalms', 22, 1, 5, ['struggle', 'waiting']),
  passage('Psm', 'Psalms', 73, 26, 26, ['struggle', 'grace']),
  passage('Psm', 'Psalms', 88, 1, 3, ['struggle', 'renewal']),
  passage('Lam', 'Lamentations', 3, 19, 24, ['struggle', 'hope']),
  passage('Mak', 'Mark', 9, 24, 24, ['struggle', 'waiting']),

  passage('Pro', 'Proverbs', 4, 23, 23, ['wisdom']),
  passage('Pro', 'Proverbs', 16, 9, 9, ['wisdom', 'calling']),
  passage('Ecc', 'Ecclesiastes', 3, 1, 8, ['wisdom', 'creation']),
  passage('Jas', 'James', 1, 5, 5, ['wisdom', 'renewal']),
  passage('Col', 'Colossians', 3, 12, 15, ['wisdom', 'love', 'peace']),

  passage('Rut', 'Ruth', 1, 16, 17, ['love', 'waiting']),
  passage('Pro', 'Proverbs', 17, 17, 17, ['love']),
  passage('Eph', 'Ephesians', 4, 2, 3, ['love', 'peace']),
  passage('Eph', 'Ephesians', 4, 32, 32, ['love', 'grace']),
  passage('1Jn', '1 John', 3, 18, 18, ['love', 'justice']),

  passage('1Sa', '1 Samuel', 1, 10, 15, ['renewal', 'struggle']),
  passage('Psm', 'Psalms', 63, 1, 4, ['renewal', 'waiting']),
  passage('Joe', 'Joel', 2, 12, 13, ['renewal', 'grace']),
  passage('Eze', 'Ezekiel', 36, 26, 27, ['renewal', 'grace']),
  passage('Rom', 'Romans', 12, 2, 2, ['renewal', 'wisdom']),

  passage('1Sa', '1 Samuel', 3, 10, 10, ['calling', 'renewal']),
  passage('Est', 'Esther', 4, 14, 14, ['calling']),
  passage('Isa', 'Isaiah', 6, 8, 8, ['calling']),
  passage('Luk', 'Luke', 5, 4, 6, ['calling', 'waiting']),
  passage('Act', 'Acts', 4, 29, 31, ['calling', 'renewal']),

  passage('Isa', 'Isaiah', 1, 17, 17, ['justice', 'wisdom']),
  passage('Amo', 'Amos', 5, 24, 24, ['justice']),
  passage('Mic', 'Micah', 6, 8, 8, ['justice', 'wisdom']),
  passage('Mat', 'Matthew', 25, 35, 40, ['justice', 'love']),
  passage('Jas', 'James', 2, 13, 13, ['justice', 'grace']),

  passage('Isa', 'Isaiah', 49, 15, 16, ['grace', 'love']),
  passage('Luk', 'Luke', 12, 6, 7, ['grace', 'peace']),
  passage('Rom', 'Romans', 8, 1, 2, ['grace']),
  passage('Eph', 'Ephesians', 3, 17, 19, ['grace', 'love']),
  passage('Col', 'Colossians', 3, 3, 4, ['grace', 'hope']),

  passage('Job', 'Job', 19, 25, 27, ['hope', 'struggle']),
  passage('Isa', 'Isaiah', 25, 8, 9, ['hope', 'peace']),
  passage('Jhn', 'John', 11, 25, 26, ['hope', 'grace']),
  passage('1Co', '1 Corinthians', 15, 54, 58, ['hope', 'calling']),
  passage('Rev', 'Revelation', 21, 3, 5, ['hope', 'peace']),

  passage('Gen', 'Genesis', 1, 31, 31, ['creation']),
  passage('Psm', 'Psalms', 8, 3, 4, ['creation', 'grace']),
  passage('Psm', 'Psalms', 19, 1, 4, ['creation']),
  passage('Psm', 'Psalms', 104, 24, 24, ['creation', 'wisdom']),
  passage('Mat', 'Matthew', 6, 26, 29, ['creation', 'peace']),
];

const deduplicatedOriginalVerses = [
  ...new Map(
    originalVerses.map((verse) => [
      referenceKey(verse),
      { ...verse, categories: categoriesForOriginalVerse(verse) },
    ])
  ).values(),
];

export const verseLibrary = [...deduplicatedOriginalVerses, ...addedVerses];

export function versesForCategory(category = 'all') {
  if (category === 'all' || !KNOWN_CATEGORY_IDS.has(category)) {
    return verseLibrary;
  }

  return verseLibrary.filter((verse) => verse.categories.includes(category));
}

export function chooseRandomVerse(category = 'all', random = Math.random) {
  const verses = versesForCategory(category);
  const index = Math.min(verses.length - 1, Math.floor(random() * verses.length));
  return verses[Math.max(0, index)];
}

export default verseLibrary;
