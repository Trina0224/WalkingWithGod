const ALLOWED_ORIGIN = 'https://trina0224.github.io';

// Exact allow-list: the public site may choose among these phrases but cannot
// make the Worker send arbitrary user-supplied subjects to Unsplash.
export const PHOTO_QUERY_IDS = new Set([
  'cross-christian','cross-wooden','cross-sunrise','cross-silhouette','bible-open','bible-window','bible-candle','bible-pages',
  'scroll-ancient','scroll-parchment','book-old','church-interior','church-small','church-window','church-sunrise','temple-ancient',
  'sanctuary-interior','architecture-sacred','altar-church','altar-candlelit','altar-stone','baptism-water','baptism-river','baptism-church',
  'father-child','father-baby','father-daughter','father-son','mother-child','mother-baby','mother-daughter','mother-son','child',
  'children-playing','child-hand','child-sunlight','baby','baby-holding','baby-sleeping','family-embrace','family-walking','parent-child',
  'family-hands','rings-wedding','bride-groom','hands-wedding','ceremony-wedding','siblings','brothers','sisters','siblings-embrace',
  'friends-together','hands-friendship','friends-walking','shepherd','shepherd-flock','staff-shepherd','fisherman','net-fishing','boat-fishing',
  'farmer','seed-sowing','seed-planting','carpenter','hands-woodworking','tools-wooden','potter','vessel-clay','clay-shaping',
  'lily-white','lily-flower','lilies-blooming','rose','rose-red','rose-white','roses-blooming','vine-grape','vine-branches','vineyard',
  'figs','tree-fig','leaves-fig','olives','branch-olive','tree-olive-ancient','grove-olive','seed-mustard','seed-tiny-hand','plant-mustard',
  'seed-hand','seed-soil','seedling','wheat','field-wheat','wheat-hand','grain-hand','thorns-crown','branch-thorn','thorns-closeup',
  'reed','reeds-water','reed-single','bread-loaf','bread-table','bread-breaking','wine-glass','cup-wine','wine-red','grapes','cup','cup-wooden',
  'cup-table','jar-water-clay','jar-clay-ancient','jar-table','vessel-ceramic','bowl-wooden','bowl-clay','fish','catch-fishing',
  'fish-bread','honey','honeycomb','jar-honey','milk','cup-milk','milk-bread','oil-olive','jar-oil','lamp-oil','salt','crystals-salt',
  'salt-hand','water-spring-clear','river-flowing','spring-water','river','river-forest','stream','stream-forest','brook-mountain',
  'spring-natural','water-fountain','water-spring','well-water','well-ancient','well-stone','sea','waves-ocean','sea-calm','shore-empty',
  'harbour-fishing','mountain','peak-mountain','mountains-mist','hills-green','hills-rolling','hill-sunrise','valley','valley-green',
  'valley-mist','rock','rock-massive','rock-sea','stone','stones-ancient','path-stone','cave','entrance-cave','light-cave','wilderness',
  'desert-wilderness','path-wilderness','desert-road','path','path-forest','path-mountain','road-horizon','footsteps-sand','lamp-ancient',
  'candle','candle-light','fire','flame','fire-camp','flame-candle','cloud','clouds-dramatic','cloud-desert','sunrise','sunset','sunlight',
  'sun-clouds','moon','moonlight','moon-water','stars','sky-night','stars-mountains','storm-clouds','rain-window','rainbow-rain',
  'snow-field','lightning-storm','sheep','flock-sheep','sheep-hillside','lamb','lamb-field','lamb-young','eagle','eagle-flying',
  'wings-eagle','wings-bird','wings-sheltering','dove','dove-white','dove-flying','bird-sparrow','bird-raven','lion','donkey','horse','snake',
  'window-light','door-open','door-light','gate-ancient','house-countryside','room-sunlit','wall-stone-ancient','tower-stone',
  'jerusalem-old-city','bethlehem-church','galilee-shore','israel-desert','egypt-desert','boat','boat-lake','hands-open','hand-helping',
  'feet-walking','eyes-closeup','clothing-linen','garment-white','wool-white','sandals-ancient','sword-ancient','shield-ancient',
  'armor-ancient','chains-broken','bars-prison','fortress','fortress-stone','wall-castle','crown','crown-golden','throne-empty',
  'chest-treasure','coins-gold','pearl-shell','jewels','key-antique','yoke-wooden','harp','lyre-ancient','trumpet','choir-church',
  'shofar','water','water-clear','surface-water','water-flowing','flower-closeup','flowers-blooming','wildflowers','tree-ancient',
  'tree-field','fruit-tree','grass-dew','garden-path','harvest-wheat','sky-open','wind-grass','light-beam','light-clouds','morning-window',
  'bird','birds-flying','bird-sky','jesus','worship','worship-christian','hands-raised-worship','church-worship','cross',
  'prayer-kneeling','hands-prayer','bible-prayer','person-praying','hands-serving','food-serving','service-humble','hourglass','clock',
  'sundial','singing','choir','worship-singing','water-still','child-sleeping','dawn','shield','shelter','wings','lighthouse','road','lamp',
  'embrace-comforting','tears','chair-empty','tree-solitary','child-laughing','celebration','flowers','horizon','tree','tomb-empty',
  'flower-fading','gate-open','bird-flying','bible','reading',
]);

const DEFAULT_QUERY_ID = 'cross-sunrise';
const IMAGE_WIDTHS = [1280, 1920, 2560, 3200, 3840];

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : 'null',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

function json(data, options = {}) {
  return Response.json(data, {
    ...options,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...options.headers,
    },
  });
}

function normaliseLocation(value) {
  return (value || '')
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N}\s,'-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);
}

export function normaliseWidth(value) {
  const requested = Number.parseInt(value || '', 10);
  if (!Number.isFinite(requested) || requested <= 0) return 2560;
  return IMAGE_WIDTHS.find((width) => width >= requested) || IMAGE_WIDTHS.at(-1);
}

export function buildHighQualityImageUrl(photo, width) {
  const source = photo?.urls?.raw || photo?.urls?.full || photo?.urls?.regular;
  if (!source) return '';
  const imageUrl = new URL(source);
  imageUrl.searchParams.set('auto', 'format');
  imageUrl.searchParams.set('fit', 'max');
  imageUrl.searchParams.set('q', '92');
  imageUrl.searchParams.set('w', String(width));
  return imageUrl.toString();
}

export function buildSearchPhrase(queryId, location = '') {
  const subject = (PHOTO_QUERY_IDS.has(queryId) ? queryId : DEFAULT_QUERY_ID)
    .replaceAll('-', ' ');
  return location ? `${subject} ${location}` : subject;
}

async function fetchUnsplashPhoto(searchPhrase, env) {
  const unsplashUrl = new URL('https://api.unsplash.com/photos/random');
  unsplashUrl.searchParams.set('query', searchPhrase);
  unsplashUrl.searchParams.set('orientation', 'landscape');
  unsplashUrl.searchParams.set('content_filter', 'high');
  const response = await fetch(unsplashUrl, {
    headers: {
      Authorization: `Client-ID ${env.UNSPLASH_ACCESS_KEY}`,
      'Accept-Version': 'v1',
    },
  });
  return response.ok ? response.json() : null;
}

async function fetchDifferentPhoto(searchPhrase, excludedId, env) {
  let photo = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    photo = await fetchUnsplashPhoto(searchPhrase, env);
    if (!photo || !excludedId || photo.id !== excludedId) return photo;
  }
  return photo;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 });

    const requestUrl = new URL(request.url);
    if (requestUrl.pathname !== '/photo') {
      return json({ message: 'WalkingWithGod photo service' }, { headers: corsHeaders(origin) });
    }

    const requested = requestUrl.searchParams.get('query') || DEFAULT_QUERY_ID;
    const queryId = PHOTO_QUERY_IDS.has(requested) ? requested : DEFAULT_QUERY_ID;
    const location = normaliseLocation(requestUrl.searchParams.get('preference'));
    const excludedId = (requestUrl.searchParams.get('exclude') || '').slice(0, 32);
    const width = normaliseWidth(requestUrl.searchParams.get('width'));
    const searchPhrase = buildSearchPhrase(queryId, location);
    let photo = await fetchDifferentPhoto(searchPhrase, excludedId, env);

    // A location is a preference, not a requirement. If the combined query is
    // too narrow for Unsplash, keep the verse subject and retry without it.
    if (!photo && location) {
      photo = await fetchDifferentPhoto(buildSearchPhrase(queryId), excludedId, env);
    }

    if (!photo) {
      return json(
        { error: 'Unable to retrieve an Unsplash photo' },
        { status: 502, headers: corsHeaders(origin) }
      );
    }

    return json({
      id: photo.id,
      queryId,
      image: buildHighQualityImageUrl(photo, width),
      width,
      color: photo.color,
      description: photo.alt_description || photo.description || 'Unsplash background',
      photographer: photo.user.name,
      photographerUrl: `${photo.user.links.html}?utm_source=WalkingWithGod&utm_medium=referral`,
      unsplashUrl: `${photo.links.html}?utm_source=WalkingWithGod&utm_medium=referral`,
    }, { headers: corsHeaders(origin) });
  },
};
