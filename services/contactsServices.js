import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { nanoid } from "nanoid";

// Path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

// File operations
async function readContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

// Contact management functions
export async function listContacts() {
  return readContacts();
}

export async function getContactById(contactId) {
  const contacts = await readContacts();
  return contacts.find((c) => c.id === contactId) ?? null; // Return null if not found
}

export async function removeContact(contactId) {
  const contacts = await readContacts();
  const index = contacts.findIndex((c) => c.id === contactId);

  if (index === -1) return null;

  const [removed] = contacts.splice(index, 1);
  await writeContacts(contacts);

  return removed;
}

export async function addContact(name, email, phone) {
  const contacts = await readContacts();

  const newContact = {
    id: nanoid(), // unique ID
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await writeContacts(contacts);

  return newContact;
}
