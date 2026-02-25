import { BASE_URL, getToken } from "./config.js";

export async function request(
  method,
  path,
  { body = null, useAuth = false, onSuccess = null } = {},
) {
  const url = `${BASE_URL}${path}`;
  const headers = { "Content-Type": "application/json" };

  if (useAuth) {
    const token = getToken();
    if (!token) {
      console.log("\n[!] No token saved. Login first or set token manually.");
      return null;
    }
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  try {
    const res = await fetch(url, options);

    let data = null;
    const ct = res.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    const line = "-".repeat(44);
    const mark = res.ok ? "[OK]" : "[ERR]";
    console.log(`\n${mark} ${res.status} ${res.statusText}  ${method} ${path}`);
    console.log(line);
    console.log(
      typeof data === "string" ? data : JSON.stringify(data, null, 2),
    );
    console.log(line);

    if (res.ok && onSuccess) onSuccess(data);

    return { status: res.status, data, ok: res.ok };
  } catch (err) {
    if (err?.cause?.code === "ECONNREFUSED") {
      console.log("\n[!] Server is not available. Run: npm run dev");
    } else {
      console.log("\n[!] Request error:", err.message);
    }
    return null;
  }
}
