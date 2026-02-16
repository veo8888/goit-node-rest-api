import Contact from "../db/Contact.js";

export async function listContacts() {
  return Contact.findAll();
}

export async function getContactById(contactId) {
  return Contact.findByPk(contactId);
}

export async function removeContact(contactId) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

export async function addContact(name, email, phone) {
  return Contact.create({ name, email, phone });
}

export async function updateContact(contactId, body) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  return contact.update(body);
}

export async function updateStatusContact(contactId, body) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  return contact.update(body);
}
