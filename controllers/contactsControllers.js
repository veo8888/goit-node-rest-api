import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const { page, limit, favorite } = req.query;

    const filter = { owner, page, limit };
    if (favorite !== undefined) {
      filter.favorite = favorite === "true";
    }

    const contacts = await contactsService.listContacts(filter);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const contact = await contactsService.getContactById(req.params.id, owner);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const contact = await contactsService.removeContact(req.params.id, owner);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const { name, email, phone } = req.body;
    const contact = await contactsService.addContact(name, email, phone, owner);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const contact = await contactsService.updateContact(
      req.params.id,
      owner,
      req.body
    );
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const contact = await contactsService.updateStatusContact(
      req.params.contactId,
      owner,
      req.body
    );
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};