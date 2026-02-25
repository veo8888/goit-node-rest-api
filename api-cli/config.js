import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN_FILE = join(__dirname, "token.json");

export const BASE_URL = "http://localhost:3000";

export function getToken() {
  if (!existsSync(TOKEN_FILE)) return null;
  try {
    const data = JSON.parse(readFileSync(TOKEN_FILE, "utf8"));
    return data.token || null;
  } catch {
    return null;
  }
}

export function saveToken(token) {
  writeFileSync(TOKEN_FILE, JSON.stringify({ token }, null, 2));
}

export function clearToken() {
  writeFileSync(TOKEN_FILE, JSON.stringify({ token: null }, null, 2));
}
