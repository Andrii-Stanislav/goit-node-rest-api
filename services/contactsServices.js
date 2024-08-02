import { Contact } from "../models/Contact.js";

export function listContacts(search = {}) {
  const { filter = {}, fields = "", settings = {} } = search;
  return Contact.find(filter, fields, settings).populate("owner", "_id email");
}

export function getContactById(filter) {
  return Contact.findOne(filter);
}

export function addContact(data) {
  return Contact.create(data);
}

export function updateContactById(filter, data) {
  return Contact.findOneAndUpdate(filter, data);
}

export function removeContactById(filter) {
  return Contact.findOneAndDelete(filter);
}

export const countContacts = (filter) => Contact.countDocuments(filter);
