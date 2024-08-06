import bcrypt from "bcrypt";
import gravatar from "gravatar";
import fs from "fs";
import Jimp from "jimp";
import path from "path";

import { User } from "../models/User.js";

const avatarsPath = path.resolve("public", "avatars");

export async function saveUser(data) {
  const hashPassword = await bcrypt.hash(data.password, 10);
  const avatarURL = gravatar.url(data.email, {}, false);

  return User.create({ ...data, password: hashPassword, avatarURL });
}

export async function findUserByEmail(email) {
  return await User.findOne({ where: { email } });
}

export async function findUserById(id) {
  return await User.findByPk(id);
}

export async function updateUserById(id, data) {
  const [_, updatedUser] = await User.update(data, {
    where: { id },
    returning: true,
  });

  return updatedUser[0];
}

export const uploadAvatar = async (file, userId) => {
  const { path: oldPath, filename } = file;

  const editedAvatar = await Jimp.read(oldPath);
  editedAvatar.resize(250, 250);

  await editedAvatar.writeAsync(oldPath);

  const newPath = path.join(avatarsPath, filename);
  fs.renameSync(oldPath, newPath);

  const avatarURL = path.join("avatars", filename);

  return await updateUserById(userId, { avatarURL });
};
