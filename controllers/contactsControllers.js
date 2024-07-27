import {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contactsList = await listContacts();

  res.status(200).json(contactsList);
};

export const getContact = async (req, res) => {
  const foundedContact = await getContactById(req?.params?.id);

  if (!foundedContact) {
    const { status, message } = HttpError(404);
    res.status(status).json({ message });
  }

  return res.status(200).json(foundedContact);
};

export const removeContact = async (req, res) => {
  const { id } = req.params;

  const removedContact = await removeContactById(id);

  if (removedContact) {
    return res.status(200).json(removedContact);
  }
  const { status, message } = HttpError(404);
  res.status(status).json({ message });
};

export const createContact = async (req, res) => {
  try {
    const addedContact = await addContact(req.body);

    res.status(201).json(addedContact);
  } catch (error) {
    const { status, message } = HttpError(400, error.message);
    res.status(status).json({ message });
  }
};

export const updateContact = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }

    const updatedContact = await updateContactById(req.params.id, req.body);

    if (updatedContact) {
      return res.status(200).json(updatedContact);
    }

    const { status, message } = HttpError(404);

    res.status(status).json({ message });
  } catch (error) {
    const { status, message } = HttpError(400, error.message);
    res.status(status).json({ status, message });
  }
};
