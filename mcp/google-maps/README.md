# Google Maps MCP Server

This package exposes a Model Context Protocol (MCP) server that wraps the Google Maps Platform Places and Geocoding APIs. It lets Claude (or any MCP‑compatible client) search for places, fetch rich place details, and reverse geocode coordinates using your Google Maps API key.

## Prerequisites

- Node.js 18.18.0 or newer
- A Google Maps Platform project with the **Places API** and **Geocoding API** enabled
- A Maps API key with the above services allowed

## Setup

1. Install dependencies:
   ```bash
   cd mcp/google-maps
   npm install
   ```
2. Create a local `.env` file with your API key:
   ```bash
   cp .env.example .env
   # edit .env and paste your key
   ```
3. Run the server in your shell to verify it starts:
   ```bash
   npm start
   ```
   The process waits for MCP traffic on STDIO. Use `Ctrl+C` to stop it.

## Claude configuration example

Add the server to your Claude Desktop (or CLI) configuration so the assistant can call it. Adjust the paths as needed:

```jsonc
{
  "mcpServers": {
    "google-maps": {
      "command": "npm",
      "args": ["start"],
      "cwd": "/Users/nickbrooks/orbit/orbit/mcp/google-maps",
      "env": {
        "GOOGLE_MAPS_API_KEY": "your-api-key"
      }
    }
  }
}
```

If you prefer to keep environment variables out of the config, omit the `env` block and export `GOOGLE_MAPS_API_KEY` in the shell that launches Claude.

## Available tools

| Tool | Description | Key Inputs | Sample Use |
| --- | --- | --- | --- |
| `maps.searchPlaces` | Google Places Text Search for finding businesses or points of interest. Returns up to 10 summarised matches and an optional `nextPageToken`. | `query` (required), optional `location`, `radius`, `region`, `language`, `openNow`, `type`, `pageToken`. | “Find a good sushi restaurant near 37.78,-122.41.” |
| `maps.placeDetails` | Places Details for a specific place ID. Defaults to a balanced field set but you can request custom `fields`. | `placeId` (required), optional `fields`, `language`, `region`. | “Show me the website, phone, and rating for this place ID.” |
| `maps.reverseGeocode` | Geocoding lookup converting coordinates into addresses. | `latitude`, `longitude` (required), optional `resultType`, `locationType`, `language`, `region`. | “What address corresponds to 40.758,-73.985?” |

Each tool returns both human-readable text and structured JSON content that Claude can use for follow-up reasoning.

## Notes & limits

- The Google Maps API enforces quotas, billing, and per-service enablement. Monitor usage in the Google Cloud console.
- The server surfaces the first 10 search results to keep model context manageable. Use the `nextPageToken` with additional calls for more results (Google enforces a short delay before tokens become active).
- Errors from Google (quota exceeded, auth problems, etc.) are reported back to the client as tool errors with whatever detail the API provides.

## Development scripts

- `npm start` – Run the MCP server on STDIO.
- `npm run dev` – Same as `start` but with Node’s `--watch` flag for iterative development.

Feel free to extend the server with additional Google Maps endpoints (Directions, Distance Matrix, etc.) following the same pattern.
