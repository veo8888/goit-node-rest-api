import { ask } from "../prompt.js";
import { request } from "../request.js";
import { saveToken, clearToken } from "../config.js";

async function register() {
  const email = await ask("  Email: ");
  const password = await ask("  Password: ");
  const subscription = await ask(
    "  Subscription (starter/pro/business) [Enter to skip]: ",
  );

  const body = { email: email.trim(), password: password.trim() };
  if (subscription.trim()) body.subscription = subscription.trim();

  await request("POST", "/api/auth/register", { body });
}

async function login() {
  const email = await ask("  Email: ");
  const password = await ask("  Password: ");

  await request("POST", "/api/auth/login", {
    body: { email: email.trim(), password: password.trim() },
    onSuccess: (data) => {
      if (data?.token) {
        saveToken(data.token);
        console.log("  Token saved automatically.");
      }
    },
  });
}

async function logout() {
  await request("POST", "/api/auth/logout", { useAuth: true });
  clearToken();
  console.log("  Local token cleared.");
}

async function getCurrentUser() {
  await request("GET", "/api/auth/current", { useAuth: true });
}

async function updateSubscription() {
  console.log("  Options: starter, pro, business");
  const subscription = await ask("  New subscription: ");

  await request("PATCH", "/api/auth/subscription", {
    useAuth: true,
    body: { subscription: subscription.trim() },
  });
}

export const ENDPOINTS = [
  { label: "POST   /api/auth/register", handler: register },
  {
    label: "POST   /api/auth/login              (auto-saves token)",
    handler: login,
  },
  { label: "POST   /api/auth/logout             [auth]", handler: logout },
  {
    label: "GET    /api/auth/current            [auth]",
    handler: getCurrentUser,
  },
  {
    label: "PATCH  /api/auth/subscription       [auth]",
    handler: updateSubscription,
  },
];
