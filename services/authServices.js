import bcrypt from "bcrypt";

import { User } from "../models/User.js";

export async function saveUser(data) {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashPassword });
}

export async function findUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

export async function findUserById(id) {
  return await User.findByPk(id);
}

export async function updateUserById(id, data) {
  return await User.update(data, { where: { id } });
}
