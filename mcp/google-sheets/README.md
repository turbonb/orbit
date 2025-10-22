# Google Sheets MCP Server

Expose Google Sheets read/write helpers to MCP-compatible assistants (Claude, Codex) so they can pull data or append new quote rows.

## Features

- `sheets.getValues` – fetch cell ranges using A1 notation.
- `sheets.appendRows` – append data to a sheet (requires service-account credentials).

## Setup

1. Install dependencies:
   ```bash
   cd mcp/google-sheets
   npm install
   ```
2. Provide credentials:
   - **Recommended (read/write):** create a Google Cloud service account with the “Google Sheets API” enabled and share your target spreadsheet with the service-account email. Supply credentials through one of:
     - `GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON` – inline JSON string.
     - `GOOGLE_SHEETS_SERVICE_ACCOUNT_FILE` – path to the downloaded JSON key.
     - `GOOGLE_APPLICATION_CREDENTIALS` – alternate path variable.
   - **Read-only option:** set `GOOGLE_SHEETS_API_KEY` (or `GOOGLE_API_KEY`). This only works with publicly readable sheets; append/update tools will be disabled.
3. Launch the server:
   ```bash
   npm start
   ```
   The process listens on STDIO for MCP traffic; stop with `Ctrl+C`.

## Claude / Codex configuration

Add the server to your MCP configuration (example for Claude Desktop):

```jsonc
{
  "mcpServers": {
    "google-sheets": {
      "command": "npm",
      "args": ["start"],
      "cwd": "/Users/nickbrooks/orbit/orbit/mcp/google-sheets",
      "env": {
        "GOOGLE_SHEETS_SERVICE_ACCOUNT_FILE": "/path/to/service-account.json"
      }
    }
  }
}
```

If you prefer inline credentials, set `GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON` instead, taking care to escape quotes.

## Tools

| Tool | Description | Key Inputs | Notes |
| ---- | ----------- | ---------- | ----- |
| `sheets.getValues` | Read an A1 range from a spreadsheet. | `spreadsheetId`, `range`, optional `majorDimension`, `valueRenderOption`, `dateTimeRenderOption`. | Works with API key (public sheets) or service account (shared sheets). |
| `sheets.appendRows` | Append one or more rows. | `spreadsheetId`, `range`, `values`, optional `valueInputOption`, `insertDataOption`, `includeValuesInResponse`. | Requires a service account with edit access. Rows are arrays of cell values. |

## Permissions & Tips

- Share the target sheet with the service-account email before appending data.
- `range` for append is typically the sheet/tab name, e.g., `Quotes!A1`.
- Default `valueInputOption` is `USER_ENTERED`; use `RAW` to store literal strings.
- Regenerate/delete service-account keys if they’re ever exposed.

## Development scripts

- `npm start` – run the MCP server.
- `npm run dev` – start with Node’s watch mode for iterative changes.
