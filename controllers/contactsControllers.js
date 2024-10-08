import {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";
import { HttpError } from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { id } = req.user;

    const contactsList = await listContacts(id);

    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const foundedContact = await getContactById(req?.params?.id);

    if (!foundedContact) {
      throw HttpError(404);
    }

    return res.status(200).json(foundedContact);
  } catch (error) {
    next(error);
  }
};

export const removeContact = async (req, res, next) => {
  try {
    const removedContact = await removeContactById(req.params.id);

    return res.status(200).json(removedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { id } = req.user;

    const addedContact = await addContact({ ...req.body, owner: id });

    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await updateContactById(req.params.id, req.body);

    if (!updatedContact) {
      throw HttpError(404);
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
