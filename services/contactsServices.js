import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

import HttpError from "../helpers/HttpError.js";

const contactsPath = path.resolve("db/contacts.json");

export async function listContacts() {
  try {
    const allContacts = await fs.readFile(contactsPath);

    return JSON.parse(allContacts);
  } catch (error) {
    throw error;
  }
}

export async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();

    const foundContact = allContacts.find(({ id }) => id === contactId);

    if (!foundContact) {
      throw HttpError(404);
    }

    return foundContact;
  } catch (error) {
    throw error;
  }
}

export async function removeContactById(contactId) {
  try {
    const allContacts = await listContacts();

    const contact = allContacts.find(({ id }) => id === contactId);

    if (!contact) {
      throw HttpError(404);
    }

    const filteredContacts = allContacts.filter(({ id }) => id !== contact.id);

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));

    return contact;
  } catch (error) {
    throw error;
  }
}

export async function addContact({ name, email, phone }) {
  try {
    const allContacts = await listContacts();

    const newContact = {
      id: crypto.randomBytes(16).toString("hex"),
      name,
      email,
      phone,
    };

    allContacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return newContact;
  } catch (error) {
    throw error;
  }
}

export async function updateContactById(id, data) {
  try {
    const allContacts = await listContacts();

    const index = allContacts.findIndex((contact) => contact.id === id);

    if (index === -1) {
      throw HttpError(404);
    }

    allContacts[index] = { ...allContacts[index], ...data };

    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

    return allContacts[index];
  } catch (error) {
    throw error;
  }
}
