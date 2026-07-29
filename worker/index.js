const ALLOWED_ORIGIN = 'https://trina0224.github.io';

export const PHOTO_QUERIES = {
  'sunrise-water': 'sunrise reflected on water landscape',
  'forest-rays': 'sunlight rays through forest',
  'light-through-clouds': 'sunlight through dramatic clouds',
  'morning-window': 'quiet morning window sunlight',
  'golden-mountain': 'golden hour mountain landscape',
  'misty-dawn': 'misty landscape at dawn',
  'quiet-lake': 'quiet lake reflection landscape',
  'foggy-meadow': 'peaceful foggy meadow',
  'calm-ocean': 'calm ocean minimal landscape',
  'minimal-hills': 'minimal peaceful rolling hills',
  'quiet-forest': 'quiet peaceful forest landscape',
  'soft-clouds': 'soft pastel clouds peaceful sky',
  'ocean-waves': 'ocean waves landscape',
  'forest-river': 'river flowing through forest',
  waterfall: 'beautiful waterfall landscape',
  'spring-water': 'clear natural spring water',
  'ocean-cliffs': 'ocean cliffs wide landscape',
  'rain-on-leaves': 'rain drops on green leaves nature',
  'mountain-path': 'path through mountains landscape',
  'road-horizon': 'open road toward horizon landscape',
  'footsteps-sand': 'footsteps in sand beach',
  'bridge-in-mist': 'bridge disappearing into mist',
  'forest-trail': 'sunlit trail through forest',
  'desert-road': 'desert road wide landscape',
  'eagle-mountains': 'eagle flying over mountains',
  'ancient-tree': 'strong ancient tree landscape',
  'dramatic-cliffs': 'dramatic cliffs landscape',
  'shelter-in-rain': 'small shelter in rain landscape',
  'mountain-storm': 'mountain under dramatic storm clouds',
  'stone-canyon': 'massive stone canyon landscape',
  'joined-hands': 'joined hands friendship natural light',
  'couple-silhouette': 'couple silhouette sunset landscape',
  'warm-home-window': 'warm light from home window evening',
  'two-trees': 'two trees together landscape',
  'family-walking': 'family walking in nature from behind',
  'wildflower-pair': 'two wildflowers close up',
  vineyard: 'vineyard landscape golden hour',
  'spring-buds': 'spring buds close up natural light',
  wildflowers: 'wildflower meadow landscape',
  'wheat-field': 'golden wheat field landscape',
  'fruit-tree': 'fruit tree garden natural light',
  'garden-morning': 'peaceful garden morning light',
  'milky-way': 'milky way landscape',
  'stars-over-mountains': 'stars over mountains night landscape',
  'night-sky-clouds': 'dramatic night sky clouds',
  'endless-horizon': 'endless horizon minimal landscape',
  'moonlit-ocean': 'moonlight over ocean',
  'aurora-sky': 'aurora night landscape',
  'olive-trees': 'ancient olive trees landscape',
  'desert-sunrise': 'desert sunrise landscape',
  'ancient-stone-path': 'ancient stone path landscape',
  'wooden-cross-landscape': 'wooden cross mountain landscape',
  'sea-of-galilee': 'Sea of Galilee landscape',
  'middle-east-hills': 'Middle East hills landscape',
  'autumn-forest': 'autumn forest landscape',
  'snowy-valley': 'snowy valley landscape',
  'spring-meadow': 'spring meadow landscape',
  'summer-coast': 'summer coast landscape',
  'sheep-hills': 'sheep on green hills landscape',
  'green-valley': 'lush green valley landscape',
  'wide-nature': 'beautiful wide nature landscape',
  'misty-mountains': 'misty mountains wide landscape',
  'quiet-coast': 'quiet coast landscape',
  'forest-landscape': 'beautiful forest landscape',
  'sunlit-meadow': 'sunlit meadow landscape',
  cloudscape: 'beautiful dramatic cloudscape',
  'lake-reflection': 'mountain lake reflection landscape',
};

const LEGACY_QUERIES = {
  nature: 'wide-nature',
  mountains: 'misty-mountains',
  forest: 'forest-landscape',
  ocean: 'quiet-coast',
  sunrise: 'sunrise-water',
  sunset: 'couple-silhouette',
  stars: 'stars-over-mountains',
  flowers: 'wildflowers',
  'peaceful landscape': 'quiet-lake',
};

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
      ...options.headers,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    const requestUrl = new URL(request.url);
    if (requestUrl.pathname !== '/photo') {
      return json(
        { message: 'WalkingWithGod photo service' },
        { headers: corsHeaders(origin) }
      );
    }

    const requested = requestUrl.searchParams.get('query') || 'wide-nature';
    const queryId = PHOTO_QUERIES[requested]
      ? requested
      : LEGACY_QUERIES[requested] || 'wide-nature';
    const searchPhrase = PHOTO_QUERIES[queryId];
    const rotation = Math.floor(Date.now() / 3_600_000);
    const cacheKey = new Request(
      `${requestUrl.origin}/photo?query=${encodeURIComponent(queryId)}&rotation=${rotation}`,
      request
    );
    const cache = caches.default;
    const cachedResponse = await cache.match(cacheKey);

    if (cachedResponse) return cachedResponse;

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

    if (!response.ok) {
      return json(
        { error: 'Unable to retrieve an Unsplash photo' },
        { status: response.status, headers: corsHeaders(origin) }
      );
    }

    const photo = await response.json();
    const workerResponse = json(
      {
        id: photo.id,
        queryId,
        image: photo.urls.regular,
        color: photo.color,
        description:
          photo.alt_description || photo.description || 'Unsplash background',
        photographer: photo.user.name,
        photographerUrl: `${photo.user.links.html}?utm_source=WalkingWithGod&utm_medium=referral`,
        unsplashUrl: `${photo.links.html}?utm_source=WalkingWithGod&utm_medium=referral`,
      },
      {
        headers: {
          ...corsHeaders(origin),
          'Cache-Control': 'public, max-age=1800',
        },
      }
    );

    await cache.put(cacheKey, workerResponse.clone());
    return workerResponse;
  },
};
