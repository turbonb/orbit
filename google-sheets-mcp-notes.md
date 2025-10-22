# Google Sheets MCP: Setup and Usage Notes

These notes capture the exact steps we used to bring the custom Google Sheets MCP server (`mcp/google-sheets`) online, work around SDK quirks, and call it from a Node script to seed data in the `Quotes` worksheet.

## Repository Layout

- MCP server code: `mcp/google-sheets`
- Service-account credentials (local, not committed): `credentials/praxis-effort-475321-q8-cb145eca8329.json`
- Temporary SDK patch (to survive current zod issues): `node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js`

## Prerequisites

1. Install dependencies (root workspace already configured for npm workspaces):
   ```bash
   npm install
   ```
2. Supply Google Sheets credentials:
   - Share the target spreadsheet with the service-account email.
   - Point the MCP server at the JSON key via environment variables, e.g.:
     ```bash
     export GOOGLE_SHEETS_SERVICE_ACCOUNT_FILE=/Users/nickbrooks/orbit/orbit/credentials/praxis-effort-475321-q8-cb145eca8329.json
     ```

## Running the MCP Server

Start the server from the repo root (it proxies `npm start` in the workspace):
```bash
npm run mcp:sheets
```

The CLI harness launches `node ./src/index.js`, which exposes two tools:

- `sheets.getValues` – read ranges.
- `sheets.appendRows` – append or overwrite rows (requires the service account).

### SDK Patch

The current `@modelcontextprotocol/sdk` release throws when serialising or validating certain Zod schemas. To keep the server usable we added a defensive try/catch in `node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js` around output-schema validation (roughly lines 157–178). If the SDK is upgraded, re-check whether this workaround is still needed.

## Example Client Script

We used an inline script to connect over stdio, list tools, and make calls:

```bash
node --input-type=module <<'EOF'
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'npm',
  args: ['start'],
  cwd: '/Users/nickbrooks/orbit/orbit/mcp/google-sheets',
  env: {
    ...process.env,
    GOOGLE_SHEETS_SERVICE_ACCOUNT_FILE: '/Users/nickbrooks/orbit/orbit/credentials/praxis-effort-475321-q8-cb145eca8329.json'
  }
});

const client = new Client({ name: 'codex-agent', version: '1.0.0' });
await client.connect(transport);

// Example: append rows
await client.callTool({
  name: 'sheets.appendRows',
  arguments: {
    spreadsheetId: '122d9DJ3fRBzmHTp4Bii7AMcrGDx5fZ4qxX0FL-7mb8w',
    range: 'Quotes!A1:H1',
    values: [[
      'Date',
      'Client',
      'Base Rate (USD)',
      'Hours',
      'Tier Multiplier',
      'Strategy Premium (%)',
      'Discount (%)',
      'Grand Total (USD)'
    ]],
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'OVERWRITE'
  }
});

// Example: read back the seeded rows
const result = await client.callTool({
  name: 'sheets.getValues',
  arguments: {
    spreadsheetId: '122d9DJ3fRBzmHTp4Bii7AMcrGDx5fZ4qxX0FL-7mb8w',
    range: 'Quotes!A1:H2'
  }
});
console.log(result.structuredContent?.values);

await client.close();
await transport.close();
EOF
```

### Common Patterns

- **Ensuring the sheet exists:** we used the Google Sheets REST API directly (`google.sheets({version:'v4'})`) to list tabs and add `Quotes` when missing.
- **Clearing rows:** `sheets.spreadsheets.values.clear({ range: 'Quotes' })`.
- **Deleting specific rows:** `spreadsheets.batchUpdate` with a `deleteDimension` request referencing the `sheetId` returned in metadata (`1570677031` for `Quotes`).

Even when the MCP prints warnings like `Falling back to raw arguments` (because of the SDK schema bug), the tool still executes successfully.

## Usage Recap

1. Added the `Quotes` tab via `batchUpdate`.
2. Set headers with `sheets.appendRows` (`insertDataOption: 'OVERWRITE'` to drop them into row 1).
3. Appended the Silver Lining Cleaning Service quote and later updated the discount to 50%, overwriting row 2.
4. Verified changes with `sheets.getValues` on `Quotes!A1:H2`.

These steps now leave the spreadsheet with the expected header row and discounted quote line, visible under the `Quotes` tab.
