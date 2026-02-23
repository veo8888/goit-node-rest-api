import Contact from "../db/Contact.js";

export async function listContacts({ owner, page = 1, limit, favorite }) {
  const where = { owner };
  if (favorite !== undefined) {
    where.favorite = favorite;
  }

  const options = { where };

  if (limit) {
    options.limit = Number(limit);
    options.offset = (Number(page) - 1) * Number(limit);
  }

  return Contact.findAll(options);
}

export async function getContactById(contactId, owner) {
  return Contact.findOne({ where: { id: contactId, owner } });
}

export async function removeContact(contactId, owner) {
  const contact = await Contact.findOne({ where: { id: contactId, owner } });
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

export async function addContact(name, email, phone, owner) {
  return Contact.create({ name, email, phone, owner });
}

export async function updateContact(contactId, owner, body) {
  const contact = await Contact.findOne({ where: { id: contactId, owner } });
  if (!contact) return null;
  return contact.update(body);
}

export async function updateStatusContact(contactId, owner, body) {
  const contact = await Contact.findOne({ where: { id: contactId, owner } });
  if (!contact) return null;
  return contact.update(body);
}