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
    'How input data should be interpreted. RAW stores literal values; USER_ENTERED lets Sheets parse them.'
  );

const insertOptionSchema = z
  .enum(['INSERT_ROWS', 'OVERWRITE'])
  .default('INSERT_ROWS')
  .describe(
    'INSERT_ROWS adds new rows below the existing data. OVERWRITE writes into the first matching range.'
  );

function success(payload) {
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

function failure(error) {
  const message =
    error?.response?.data?.error?.message ??
    error?.message ??
    'Unexpected error calling Google Sheets API.';
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
    title: 'Read values from a range',
    description:
      'Fetch an A1-style range from a spreadsheet. Works with public sheets (API key) or private sheets shared with the service account.',
    inputSchema: z.object({
      spreadsheetId: z
        .string()
        .min(1, 'Spreadsheet ID is required.')
        .describe('The spreadsheet ID from the sheet URL.'),
      range: z
        .string()
        .min(1, 'Range is required.')
        .describe('A1 range, e.g., "Sheet1!A1:D10".'),
      majorDimension: z
        .enum(['ROWS', 'COLUMNS'])
        .optional()
        .describe('Return values row-wise (default) or column-wise.'),
      valueRenderOption: z
        .enum(['FORMATTED_VALUE', 'UNFORMATTED_VALUE', 'FORMULA'])
        .optional()
        .describe('How values should be rendered in the response.'),
      dateTimeRenderOption: z
        .enum(['SERIAL_NUMBER', 'FORMATTED_STRING'])
        .optional()
        .describe('How dates/times should be rendered.')
    }),
    outputSchema: z.object({
      spreadsheetId: z.string(),
      range: z.string(),
      majorDimension: z.string().nullable(),
      values: z.array(
        z.array(z.union([z.string(), z.number(), z.boolean(), z.null()]))
      )
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
      return success({
        spreadsheetId: input.spreadsheetId,
        range: data.range ?? input.range,
        majorDimension: data.majorDimension ?? null,
        values: data.values ?? []
      });
    } catch (error) {
      return failure(error);
    }
  }
);

server.registerTool(
  'sheets.appendRows',
  {
    title: 'Append rows to a sheet',
    description:
      'Append one or more rows to a sheet/tab. Requires a service account with edit access to the spreadsheet.',
    inputSchema: z.object({
      spreadsheetId: z
        .string()
        .min(1, 'Spreadsheet ID is required.')
        .describe('The spreadsheet ID from the sheet URL.'),
      range: z
        .string()
        .min(1, 'Range is required.')
        .describe(
          'Target range. Usually just the sheet name (e.g., "Quotes!A1") when appending.'
        ),
      values: z
        .array(
          z.array(z.union([z.string(), z.number(), z.boolean(), z.null()]))
        )
        .min(1, 'At least one row of values is required.')
        .describe('Rows to append. Outer array = rows; inner arrays = cells.'),
      valueInputOption: valueInputOptionSchema.optional(),
      insertDataOption: insertOptionSchema.optional(),
      includeValuesInResponse: z
        .boolean()
        .optional()
        .describe('Return the appended values in the response payload.')
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
        return failure(
          new Error(
            'Append requires a service account with edit access. Set GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON or GOOGLE_SHEETS_SERVICE_ACCOUNT_FILE.'
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
      return success({
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
      return failure(error);
    }
  }
);

async function start() {
  try {
    await getSheetsClient();
    if (!hasServiceAccount()) {
      console.warn(
        '[google-sheets-mcp] Warning: running in read-only mode (API key). Append/update requires a service account.'
      );
    }
  } catch (error) {
    console.warn(
      `[google-sheets-mcp] Failed to initialize Sheets client: ${
        error?.message ?? 'unknown error'
      }`
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
