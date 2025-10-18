# Google Sheets MCP Server

This MCP server lets Codex/Claude read from and append to Google Sheets using the Google Sheets API.

## Features

- `sheets.getValues` – Fetch a range using A1 notation.
- `sheets.appendRows` – Append rows (requires a service account shared with the sheet).

## Setup

1. Install dependencies:
   ```bash
   cd mcp/google-sheets
   npm install
   ```
2. Provide credentials:
   - **Preferred (read/write):** Google service-account JSON. Set one of:
     - `GOOGLE_SHEETS_SERVICE_ACCOUNT_FILE=/path/to/key.json`
     - `GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON='{"type":"service_account", ...}'`
     - (Alternatively) `GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json`
   - **Read-only:** Set `GOOGLE_SHEETS_API_KEY` (or `GOOGLE_API_KEY`) and ensure the target sheet is publicly readable.
3. Start the server:
   ```bash
   npm start
   ```

## MCP client configuration (example)

```jsonc
{
  "mcpServers": {
    "google-sheets": {
      "command": "npm",
      "args": ["start"],
      "cwd": "/Users/nickbrooks/orbit/orbit/mcp/google-sheets",
      "env": {
        "GOOGLE_SHEETS_SERVICE_ACCOUNT_FILE": "/Users/nickbrooks/.orbit/credentials/orbit-sheets.json"
      }
    }
  }
}
```

Share your target spreadsheet with the service-account email (Editor access) before invoking append operations.

## Tool reference

| Tool | Description | Key Inputs | Notes |
| ---- | ----------- | ---------- | ----- |
| `sheets.getValues` | Read an A1 range. | `spreadsheetId`, `range`, optional `majorDimension`, `valueRenderOption`, `dateTimeRenderOption`. | Works with API key (public sheet) or service-account credentials. |
| `sheets.appendRows` | Append rows to a sheet/tab. | `spreadsheetId`, `range`, `values`, optional `valueInputOption`, `insertDataOption`, `includeValuesInResponse`. | Requires service-account credentials with edit permission on the sheet. |

## Tips

- Use `valueInputOption: RAW` to store literals instead of letting Sheets parse.
- `range` for append is typically the sheet/tab name (e.g. `Quotes!A1`).
- Regenerate/delete service-account keys if they’re ever exposed.
