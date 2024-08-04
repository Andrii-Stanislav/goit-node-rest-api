import { Contact } from "../models/Contact.js";

export function listContacts(ownerId) {
  return Contact.findAll({ where: { owner: ownerId } });
}

export function getContactById(id) {
  return Contact.findByPk(id);
}

export function addContact(data) {
  return Contact.create(data);
}

export async function updateContactById(id, data) {
  const [_, updatedContacts] = await Contact.update(data, {
    where: { id },
    returning: true,
  });

  return updatedContacts[0];
}

export function removeContactById(id) {
  return Contact.destroy({ where: { id } });
}

export const countContacts = (ownerId) =>
  Contact.count({ where: { owner: ownerId } });
