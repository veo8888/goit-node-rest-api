import { ask } from "../prompt.js";
import { request } from "../request.js";

async function getAllContacts() {
  await request("GET", "/api/contacts", { useAuth: true });
}

async function getOneContact() {
  const id = await ask("  Contact ID: ");
  await request("GET", `/api/contacts/${id.trim()}`, { useAuth: true });
}

async function createContact() {
  const name = await ask("  Name: ");
  const email = await ask("  Email: ");
  const phone = await ask("  Phone: ");
  const favorite = await ask("  Favorite? (true/false) [Enter = false]: ");

  const body = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
  };
  if (favorite.trim() === "true") body.favorite = true;

  await request("POST", "/api/contacts", { useAuth: true, body });
}

async function updateContact() {
  const id = await ask("  Contact ID: ");
  console.log("  Fill fields to update (press Enter to skip a field):");

  const name = await ask("  Name: ");
  const email = await ask("  Email: ");
  const phone = await ask("  Phone: ");
  const favorite = await ask("  Favorite? (true/false) [Enter to skip]: ");

  const body = {};
  if (name.trim()) body.name = name.trim();
  if (email.trim()) body.email = email.trim();
  if (phone.trim()) body.phone = phone.trim();
  if (favorite.trim() === "true") body.favorite = true;
  else if (favorite.trim() === "false") body.favorite = false;

  if (Object.keys(body).length === 0) {
    console.log("  No fields entered. Request cancelled.");
    return;
  }

  await request("PUT", `/api/contacts/${id.trim()}`, { useAuth: true, body });
}

async function deleteContact() {
  const id = await ask("  Contact ID: ");
  await request("DELETE", `/api/contacts/${id.trim()}`, { useAuth: true });
}

async function updateFavorite() {
  const id = await ask("  Contact ID: ");
  const favorite = await ask("  Favorite? (true/false): ");
  const fav = favorite.trim() === "true";

  await request("PATCH", `/api/contacts/${id.trim()}/favorite`, {
    useAuth: true,
    body: { favorite: fav },
  });
}

export const ENDPOINTS = [
  {
    label: "GET    /api/contacts               [auth]",
    handler: getAllContacts,
  },
  {
    label: "GET    /api/contacts/:id           [auth]",
    handler: getOneContact,
  },
  {
    label: "POST   /api/contacts               [auth]",
    handler: createContact,
  },
  {
    label: "PUT    /api/contacts/:id           [auth]",
    handler: updateContact,
  },
  {
    label: "DELETE /api/contacts/:id           [auth]",
    handler: deleteContact,
  },
  {
    label: "PATCH  /api/contacts/:id/favorite  [auth]",
    handler: updateFavorite,
  },
];
