import 'dotenv/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import {
  GoogleMapsApiError,
  searchPlaces,
  getPlaceDetails,
  reverseGeocode
} from './googleMapsClient.js';

const server = new McpServer({
  name: 'google-maps-mcp',
  version: '0.1.0'
});

const coordinateSchema = z.object({
  latitude: z
    .number()
    .min(-90)
    .max(90)
    .describe('Latitude in decimal degrees'),
  longitude: z
    .number()
    .min(-180)
    .max(180)
    .describe('Longitude in decimal degrees')
});

function successResult(output) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(output, null, 2)
      }
    ],
    structuredContent: output
  };
}

function errorResult(error) {
  const message =
    error instanceof Error ? error.message : 'Unknown error calling Google Maps';
  const detail =
    error instanceof GoogleMapsApiError && error.detail
      ? `\nDetail: ${error.detail}`
      : '';

  return {
    content: [
      {
        type: 'text',
        text: `${message}${detail}`
      }
    ],
    isError: true
  };
}

server.registerTool(
  'maps.searchPlaces',
  {
    title: 'Search for places',
    description:
      'Search for places using the Google Places Text Search API. Ideal for finding businesses or points of interest by keyword.',
    inputSchema: z.object({
      query: z
        .string()
        .min(1, 'Search query is required')
        .describe('Free-text search query, e.g. "coffee in Seattle"'),
      location: coordinateSchema
        .optional()
        .describe('Optional coordinate bias for the search results'),
      radius: z
        .number()
        .int()
        .min(1)
        .max(50000)
        .optional()
        .describe('Search radius in meters (max 50,000)'),
      region: z
        .string()
        .length(2)
        .optional()
        .describe('Two-letter region code (ccTLD) to bias the search, e.g. "us"'),
      language: z
        .string()
        .min(2)
        .max(10)
        .optional()
        .describe('Language code to use for results, e.g. "en" or "es"'),
      openNow: z
        .boolean()
        .optional()
        .describe('Only include places that are open right now'),
      type: z
        .string()
        .optional()
        .describe(
          'Restrict results to a specific Google place type, e.g. "restaurant"'
        ),
      pageToken: z
        .string()
        .optional()
        .describe(
          'Next page token from a previous searchPlaces call (for pagination)'
        )
    }),
    outputSchema: z.object({
      status: z.string(),
      query: z.string(),
      nextPageToken: z.string().nullable(),
      results: z.array(
        z.object({
          placeId: z.string().nullable(),
          name: z.string().nullable(),
          formattedAddress: z.string().nullable(),
          businessStatus: z.string().nullable(),
          location: z
            .object({
              lat: z.number(),
              lng: z.number()
            })
            .nullable(),
          rating: z.number().nullable(),
          userRatingsTotal: z.number().nullable(),
          priceLevel: z.number().nullable(),
          types: z.array(z.string()),
          openingHours: z.array(z.string()).nullable()
        })
      )
    })
  },
  async (input) => {
    try {
      const result = await searchPlaces(input);
      // Limit to the first 10 results to keep responses concise for the model.
      result.results = result.results.slice(0, 10);
      return successResult(result);
    } catch (error) {
      return errorResult(error);
    }
  }
);

server.registerTool(
  'maps.placeDetails',
  {
    title: 'Retrieve place details',
    description:
      'Fetch detailed information for a place ID using the Google Places Details API.',
    inputSchema: z.object({
      placeId: z
        .string()
        .min(1, 'placeId is required')
        .describe('Google Maps place ID'),
      fields: z
        .array(z.string())
        .max(20)
        .optional()
        .describe(
          'Optional list of fields to request from the Places Details API. If omitted, the server requests a balanced default set.'
        ),
      language: z
        .string()
        .min(2)
        .max(10)
        .optional()
        .describe('Language code to use for the response'),
      region: z
        .string()
        .length(2)
        .optional()
        .describe('Two-letter ccTLD region code to bias the response')
    }),
    outputSchema: z.object({
      status: z.string(),
      placeId: z.string(),
      result: z
        .object({
          placeId: z.string().nullable(),
          name: z.string().nullable(),
          formattedAddress: z.string().nullable(),
          internationalPhoneNumber: z.string().nullable(),
          formattedPhoneNumber: z.string().nullable(),
          website: z.string().nullable(),
          googleMapsUri: z.string().nullable(),
          location: z
            .object({
              lat: z.number(),
              lng: z.number()
            })
            .nullable(),
          rating: z.number().nullable(),
          userRatingsTotal: z.number().nullable(),
          priceLevel: z.number().nullable(),
          businessStatus: z.string().nullable(),
          addressComponents: z.array(
            z.object({
              longName: z.string().nullable(),
              shortName: z.string().nullable(),
              types: z.array(z.string())
            })
          ),
          openingHours: z.array(z.string()).nullable(),
          editorialSummary: z.string().nullable(),
          types: z.array(z.string()),
          utcOffsetMinutes: z.number().nullable(),
          servablePhotos: z.array(
            z.object({
              height: z.number().nullable(),
              width: z.number().nullable(),
              htmlAttributions: z.array(z.string())
            })
          )
        })
        .nullable()
    })
  },
  async (input) => {
    try {
      const result = await getPlaceDetails({
        ...input,
        fields:
          input.fields && input.fields.length > 0
            ? input.fields
            : [
                'place_id',
                'name',
                'formatted_address',
                'international_phone_number',
                'formatted_phone_number',
                'opening_hours',
                'current_opening_hours',
                'rating',
                'user_ratings_total',
                'geometry/location',
                'website',
                'url',
                'price_level',
                'business_status',
                'address_components',
                'editorial_summary',
                'utc_offset_minutes',
                'photos'
              ]
      });
      return successResult(result);
    } catch (error) {
      return errorResult(error);
    }
  }
);

server.registerTool(
  'maps.reverseGeocode',
  {
    title: 'Reverse geocode coordinates',
    description:
      'Convert latitude/longitude coordinates into human-readable addresses using the Geocoding API.',
    inputSchema: z.object({
      latitude: coordinateSchema.shape.latitude,
      longitude: coordinateSchema.shape.longitude,
      resultType: z
        .array(z.string())
        .optional()
        .describe(
          'Optional list of result types to include (e.g. "street_address", "locality")'
        ),
      locationType: z
        .array(z.string())
        .optional()
        .describe(
          'Optional list of location type filters (e.g. "ROOFTOP", "GEOMETRIC_CENTER")'
        ),
      language: z
        .string()
        .min(2)
        .max(10)
        .optional()
        .describe('Language code to use for the response'),
      region: z
        .string()
        .length(2)
        .optional()
        .describe('Two-letter ccTLD region code to bias the response')
    }),
    outputSchema: z.object({
      status: z.string(),
      coordinate: z.object({
        latitude: z.number(),
        longitude: z.number()
      }),
      results: z.array(
        z.object({
          placeId: z.string().nullable(),
          formattedAddress: z.string().nullable(),
          types: z.array(z.string()),
          partialMatch: z.boolean(),
          location: z
            .object({
              lat: z.number(),
              lng: z.number()
            })
            .nullable(),
          locationType: z.string().nullable(),
          plusCode: z
            .object({
              globalCode: z.string().nullable(),
              compoundCode: z.string().nullable()
            })
            .nullable(),
          addressComponents: z.array(
            z.object({
              longName: z.string().nullable(),
              shortName: z.string().nullable(),
              types: z.array(z.string())
            })
          )
        })
      )
    })
  },
  async (input) => {
    try {
      const result = await reverseGeocode(input);
      return successResult(result);
    } catch (error) {
      return errorResult(error);
    }
  }
);

async function start() {
  if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.warn(
      '[google-maps-mcp] Warning: GOOGLE_MAPS_API_KEY is not set. Tool calls will fail until it is provided.'
    );
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);

  process.on('SIGINT', () => {
    transport
      .close()
      .catch(() => {})
      .finally(() => process.exit(0));
  });

  process.on('SIGTERM', () => {
    transport
      .close()
      .catch(() => {})
      .finally(() => process.exit(0));
  });
}

await start();
