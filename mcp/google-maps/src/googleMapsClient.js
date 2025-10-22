const GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api';
const ACCEPTABLE_STATUSES = new Set(['OK', 'ZERO_RESULTS', 'NOT_FOUND']);

export class GoogleMapsApiError extends Error {
  constructor(message, status, detail) {
    super(message);
    this.name = 'GoogleMapsApiError';
    this.status = status;
    this.detail = detail ?? null;
  }
}

function getApiKey() {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) {
    throw new GoogleMapsApiError(
      'Missing GOOGLE_MAPS_API_KEY environment variable. Set it to a valid Google Maps API key before calling this tool.',
      'MISSING_API_KEY'
    );
  }
  return key.trim();
}

function normaliseLocation(location) {
  if (!location) {
    return undefined;
  }
  const { latitude, longitude } = location;
  return `${latitude},${longitude}`;
}

function buildSearchParams(params = {}) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        continue;
      }
      search.set(key, value.join('|'));
    } else if (typeof value === 'boolean') {
      search.set(key, value ? 'true' : 'false');
    } else {
      search.set(key, String(value));
    }
  }
  return search;
}

async function callGoogleMaps(endpointPath, params = {}) {
  const apiKey = getApiKey();
  const url = new URL(`${GOOGLE_MAPS_BASE_URL}/${endpointPath}`);
  const searchParams = buildSearchParams({ ...params, key: apiKey });
  url.search = searchParams.toString();

  let response;
  try {
    response = await fetch(url.toString(), {
      headers: { Accept: 'application/json' }
    });
  } catch (error) {
    throw new GoogleMapsApiError(
      `Network error calling Google Maps API: ${error instanceof Error ? error.message : String(error)}`,
      'NETWORK_ERROR'
    );
  }

  if (!response.ok) {
    throw new GoogleMapsApiError(
      `Google Maps API responded with HTTP ${response.status}`,
      'HTTP_ERROR'
    );
  }

  const payload = await response.json();

  if (payload.status && !ACCEPTABLE_STATUSES.has(payload.status)) {
    throw new GoogleMapsApiError(
      `Google Maps API error (${payload.status})${payload.error_message ? `: ${payload.error_message}` : ''}`,
      payload.status,
      payload.error_message
    );
  }

  return payload;
}

function mapAddressComponents(components = []) {
  return components.map((component) => ({
    longName: component.long_name ?? null,
    shortName: component.short_name ?? null,
    types: component.types ?? []
  }));
}

function mapPlaceSummary(place) {
  return {
    placeId: place.place_id ?? null,
    name: place.name ?? null,
    formattedAddress: place.formatted_address ?? place.vicinity ?? null,
    businessStatus: place.business_status ?? null,
    location: place.geometry?.location ?? null,
    rating: place.rating ?? null,
    userRatingsTotal: place.user_ratings_total ?? null,
    priceLevel: place.price_level ?? null,
    types: place.types ?? [],
    openingHours: place.opening_hours?.weekday_text ?? null
  };
}

function mapPlaceDetails(result) {
  if (!result) {
    return null;
  }
  return {
    placeId: result.place_id ?? null,
    name: result.name ?? null,
    formattedAddress: result.formatted_address ?? null,
    internationalPhoneNumber: result.international_phone_number ?? null,
    formattedPhoneNumber: result.formatted_phone_number ?? null,
    website: result.website ?? null,
    googleMapsUri: result.url ?? null,
    location: result.geometry?.location ?? null,
    rating: result.rating ?? null,
    userRatingsTotal: result.user_ratings_total ?? null,
    priceLevel: result.price_level ?? null,
    businessStatus: result.business_status ?? null,
    addressComponents: mapAddressComponents(result.address_components),
    openingHours: result.current_opening_hours?.weekday_text ?? result.opening_hours?.weekday_text ?? null,
    editorialSummary: result.editorial_summary?.overview ?? null,
    types: result.types ?? [],
    utcOffsetMinutes: result.utc_offset_minutes ?? null,
    servablePhotos: (result.photos ?? []).slice(0, 5).map((photo) => ({
      height: photo.height ?? null,
      width: photo.width ?? null,
      htmlAttributions: photo.html_attributions ?? []
    }))
  };
}

function mapGeocodeResult(result) {
  return {
    placeId: result.place_id ?? null,
    formattedAddress: result.formatted_address ?? null,
    types: result.types ?? [],
    partialMatch: result.partial_match ?? false,
    location: result.geometry?.location ?? null,
    locationType: result.geometry?.location_type ?? null,
    plusCode: result.plus_code
      ? {
          globalCode: result.plus_code.global_code ?? null,
          compoundCode: result.plus_code.compound_code ?? null
        }
      : null,
    addressComponents: mapAddressComponents(result.address_components)
  };
}

export async function searchPlaces({
  query,
  location,
  radius,
  region,
  language,
  openNow,
  type,
  pageToken
}) {
  const payload = await callGoogleMaps('place/textsearch/json', {
    query,
    location: normaliseLocation(location),
    radius,
    region,
    language,
    opennow: openNow ? 'true' : undefined,
    type,
    pagetoken: pageToken
  });

  return {
    status: payload.status ?? 'UNKNOWN',
    query,
    nextPageToken: payload.next_page_token ?? null,
    results: (payload.results ?? []).map(mapPlaceSummary)
  };
}

export async function getPlaceDetails({ placeId, fields, language, region }) {
  const payload = await callGoogleMaps('place/details/json', {
    place_id: placeId,
    fields: fields && fields.length > 0 ? fields.join(',') : undefined,
    language,
    region
  });

  return {
    status: payload.status ?? 'UNKNOWN',
    placeId,
    result: mapPlaceDetails(payload.result)
  };
}

export async function reverseGeocode({
  latitude,
  longitude,
  resultType,
  locationType,
  language,
  region
}) {
  const payload = await callGoogleMaps('geocode/json', {
    latlng: `${latitude},${longitude}`,
    result_type: resultType && resultType.length > 0 ? resultType.join('|') : undefined,
    location_type: locationType && locationType.length > 0 ? locationType.join('|') : undefined,
    language,
    region
  });

  return {
    status: payload.status ?? 'UNKNOWN',
    coordinate: { latitude, longitude },
    results: (payload.results ?? []).map(mapGeocodeResult)
  };
}
