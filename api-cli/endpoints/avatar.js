import { readFileSync, existsSync } from "fs";
import { basename } from "path";
import { ask } from "../prompt.js";
import { request } from "../request.js";
import { BASE_URL, getToken } from "../config.js";

function sanitizePath(input) {
  // Remove PowerShell execution syntax:  & "path"  or  & 'path'
  let p = input.trim().replace(/^&\s*/, "");
  // Remove surrounding quotes (single or double)
  if (
    (p.startsWith('"') && p.endsWith('"')) ||
    (p.startsWith("'") && p.endsWith("'"))
  ) {
    p = p.slice(1, -1);
  }
  return p.trim();
}

async function uploadAvatar() {
  const filePath = await ask("  Path to image file: ");
  const trimmed = sanitizePath(filePath);

  if (!existsSync(trimmed)) {
    console.log(`  [!] File not found: ${trimmed}`);
    return;
  }

  const token = getToken();
  if (!token) {
    console.log("\n[!] No token saved. Login first or set token manually.");
    return;
  }

  const formData = new FormData();
  const blob = new Blob([readFileSync(trimmed)]);
  formData.append("avatar", blob, basename(trimmed));

  try {
    const res = await fetch(`${BASE_URL}/api/auth/avatars`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    let data;
    const ct = res.headers.get("content-type") ?? "";
    data = ct.includes("application/json")
      ? await res.json()
      : await res.text();

    const line = "-".repeat(44);
    console.log(
      `\n${res.ok ? "[OK]" : "[ERR]"} ${res.status} ${res.statusText}  PATCH /api/auth/avatars`,
    );
    console.log(line);
    console.log(
      typeof data === "string" ? data : JSON.stringify(data, null, 2),
    );
    console.log(line);
  } catch (err) {
    if (err?.cause?.code === "ECONNREFUSED") {
      console.log("\n[!] Server is not available. Run: npm run dev");
    } else {
      console.log("\n[!] Request error:", err.message);
    }
  }
}

async function deleteAvatar() {
  await request("DELETE", "/api/auth/avatars", { useAuth: true });
}

export const ENDPOINTS = [
  {
    label: "PATCH  /api/auth/avatars            [auth]  Upload avatar",
    handler: uploadAvatar,
  },
  {
    label: "DELETE /api/auth/avatars            [auth]  Delete avatar",
    handler: deleteAvatar,
  },
];
