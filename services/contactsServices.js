import { Contact } from "../models/Contact.js";

export function listContacts(search = {}) {
  const { filter = {}, fields = "", settings = {} } = search;
  return Contact.find(filter, fields, settings).populate("owner", "_id email");
}

export function getContactById(id) {
  return Contact.findById(id);
}

export function addContact(data) {
  return Contact.create(data);
}

export function updateContactById(filter, data) {
  return Contact.findOneAndUpdate(filter, data);
}

export function removeContactById(id) {
  return Contact.findByIdAndDelete(id);
}

export const countContacts = (filter) => Contact.countDocuments(filter);
