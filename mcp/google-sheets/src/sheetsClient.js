import fs from 'node:fs';
import path from 'node:path';
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

let cachedClient = null;
let serviceAccountCache;

function resolveServiceAccountJson() {
  if (serviceAccountCache !== undefined) {
    return serviceAccountCache;
  }

  const jsonInline = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON;
  if (jsonInline) {
    try {
      serviceAccountCache = JSON.parse(jsonInline);
    } catch (error) {
      throw new Error(
        'Failed to parse GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON. Ensure it is valid JSON.'
      );
    }
    return serviceAccountCache;
  }

  const filePath =
    process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_FILE ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (filePath) {
    const absolutePath = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);
    try {
      const raw = fs.readFileSync(absolutePath, 'utf8');
      serviceAccountCache = JSON.parse(raw);
    } catch (error) {
      throw new Error(
        `Failed to read service account credentials from ${absolutePath}: ${error.message}`
      );
    }
    return serviceAccountCache;
  }

  serviceAccountCache = null;
  return serviceAccountCache;
}

export async function getSheetsClient() {
  if (cachedClient) {
    return cachedClient;
  }

  const serviceAccount = resolveServiceAccountJson();
  if (serviceAccount) {
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: SCOPES
    });
    const client = google.sheets({ version: 'v4', auth });
    cachedClient = client;
    return client;
  }

  const apiKey =
    process.env.GOOGLE_SHEETS_API_KEY || process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error(
      'No Google Sheets credentials provided. Set GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON (preferred) or GOOGLE_SHEETS_API_KEY.'
    );
  }

  const client = google.sheets({
    version: 'v4',
    auth: apiKey
  });

  cachedClient = client;
  return client;
}

export function hasServiceAccount() {
  const account = resolveServiceAccountJson();
  return Boolean(account);
}
