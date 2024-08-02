import {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contactsList = await listContacts();

    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const foundedContact = await getContactById(req?.params?.id);

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
    const addedContact = await addContact(req.body);

    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await updateContactById(req.params.id, req.body);

    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};
