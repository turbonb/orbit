import 'dotenv/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { getSheetsClient, hasServiceAccount } from './sheetsClient.js';

const server = new McpServer({
  name: 'google-sheets-mcp',
  version: '0.1.0'
});

const valueInputOptionSchema = z
  .enum(['RAW', 'USER_ENTERED'])
  .default('USER_ENTERED')
  .describe(
    'How input data should be interpreted. RAW stores values exactly; USER_ENTERED lets Sheets apply parsing.'
  );

const insertDataOptionSchema = z
  .enum(['INSERT_ROWS', 'OVERWRITE'])
  .default('INSERT_ROWS')
  .describe(
    'Whether to insert new rows for the appended data or overwrite existing rows.'
  );

function successResult(payload) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(payload, null, 2)
      }
    ],
    structuredContent: payload
  };
}

function errorResult(error) {
  let message = 'Unexpected error calling Google Sheets API.';
  if (error?.response?.data?.error?.message) {
    message = error.response.data.error.message;
  } else if (error?.message) {
    message = error.message;
  }

  return {
    content: [
      {
        type: 'text',
        text: message
      }
    ],
    isError: true
  };
}

server.registerTool(
  'sheets.getValues',
  {
    title: 'Fetch cell values',
    description:
      'Read a range of values from a Google Sheet. Works with public sheets (API key) or private sheets via service account.',
    inputSchema: z.object({
      spreadsheetId: z
        .string()
        .min(1)
        .describe('The spreadsheet ID (from the sheet URL).'),
      range: z
        .string()
        .min(1)
        .describe('A1-style range, e.g. "Sheet1!A1:D10".'),
      majorDimension: z
        .enum(['ROWS', 'COLUMNS'])
        .optional()
        .describe(
          'Whether values should be returned row-wise (default) or column-wise.'
        ),
      valueRenderOption: z
        .enum(['FORMATTED_VALUE', 'UNFORMATTED_VALUE', 'FORMULA'])
        .optional()
        .describe('How values should be rendered in the response.'),
      dateTimeRenderOption: z
        .enum(['SERIAL_NUMBER', 'FORMATTED_STRING'])
        .optional()
        .describe('How date/time values are rendered.')
    }),
    outputSchema: z.object({
      spreadsheetId: z.string(),
      range: z.string(),
      majorDimension: z.string().nullable(),
      values: z
        .array(
          z.array(z.union([z.string(), z.number(), z.boolean(), z.null()]))
        )
        .describe('Two-dimensional array of cell values.')
    })
  },
  async (input) => {
    try {
      const sheets = await getSheetsClient();
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: input.spreadsheetId,
        range: input.range,
        majorDimension: input.majorDimension,
        valueRenderOption: input.valueRenderOption,
        dateTimeRenderOption: input.dateTimeRenderOption
      });

      const data = response.data;
      return successResult({
        spreadsheetId: input.spreadsheetId,
        range: data.range ?? input.range,
        majorDimension: data.majorDimension ?? null,
        values: data.values ?? []
      });
    } catch (error) {
      return errorResult(error);
    }
  }
);

server.registerTool(
  'sheets.appendRows',
  {
    title: 'Append rows to a sheet',
    description:
      'Append one or more rows to a Google Sheet range. Requires service-account credentials with edit access to the spreadsheet.',
    inputSchema: z.object({
      spreadsheetId: z
        .string()
        .min(1)
        .describe('The spreadsheet ID (from the sheet URL).'),
      range: z
        .string()
        .min(1)
        .describe(
          'A1-style range to append into, typically the sheet/tab name (e.g., "Quotes!A1").'
        ),
      values: z
        .array(
          z.array(z.union([z.string(), z.number(), z.boolean(), z.null()]))
        )
        .min(1)
        .describe(
          'Rows to append. Provide a two-dimensional array (outer array = rows, inner arrays = cell values).'
        ),
      valueInputOption: valueInputOptionSchema.optional(),
      insertDataOption: insertDataOptionSchema.optional(),
      includeValuesInResponse: z
        .boolean()
        .optional()
        .describe('Whether to return the appended values in the response.')
    }),
    outputSchema: z.object({
      spreadsheetId: z.string(),
      tableRange: z.string().nullable(),
      updates: z
        .object({
          updatedRange: z.string().nullable(),
          updatedRows: z.number().nullable(),
          updatedColumns: z.number().nullable(),
          updatedCells: z.number().nullable(),
          updatedData: z
            .object({
              range: z.string(),
              majorDimension: z.string(),
              values: z.array(
                z.array(z.union([z.string(), z.number(), z.boolean(), z.null()]))
              )
            })
            .optional()
        })
        .optional()
    })
  },
  async (input) => {
    try {
      if (!hasServiceAccount()) {
        return errorResult(
          new Error(
            'Append operations require a Google service account with edit access. Provide credentials via GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON or GOOGLE_SHEETS_SERVICE_ACCOUNT_FILE.'
          )
        );
      }

      const sheets = await getSheetsClient();
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: input.spreadsheetId,
        range: input.range,
        valueInputOption: input.valueInputOption ?? 'USER_ENTERED',
        insertDataOption: input.insertDataOption ?? 'INSERT_ROWS',
        includeValuesInResponse: input.includeValuesInResponse ?? false,
        requestBody: {
          values: input.values.map((row) =>
            row.map((value) => (value === null ? '' : value))
          )
        }
      });

      const data = response.data;
      return successResult({
        spreadsheetId: input.spreadsheetId,
        tableRange: data.tableRange ?? null,
        updates: data.updates
          ? {
              updatedRange: data.updates.updatedRange ?? null,
              updatedRows:
                data.updates.updatedRows !== undefined
                  ? Number(data.updates.updatedRows)
                  : null,
              updatedColumns:
                data.updates.updatedColumns !== undefined
                  ? Number(data.updates.updatedColumns)
                  : null,
              updatedCells:
                data.updates.updatedCells !== undefined
                  ? Number(data.updates.updatedCells)
                  : null,
              updatedData: data.updates.updatedData
                ? {
                    range: data.updates.updatedData.range ?? '',
                    majorDimension:
                      data.updates.updatedData.majorDimension ?? '',
                    values: data.updates.updatedData.values ?? []
                  }
                : undefined
            }
          : undefined
      });
    } catch (error) {
      return errorResult(error);
    }
  }
);

async function start() {
  try {
    const sheets = await getSheetsClient();
    if (!sheets) {
      throw new Error('Failed to initialize Google Sheets client.');
    }
    if (!hasServiceAccount()) {
      console.warn(
        '[google-sheets-mcp] Warning: no service account credentials detected. Append/update tools require a service account with edit permissions. Current configuration is read-only.'
      );
    }
  } catch (error) {
    if (error?.message) {
      console.warn(`[google-sheets-mcp] ${error.message}`);
    } else {
      console.warn('[google-sheets-mcp] Failed to initialize Sheets client.');
    }
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
