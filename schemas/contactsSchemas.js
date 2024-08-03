import Joi from "joi";

import { phoneReg } from "../constants/regexp.js";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(14).pattern(phoneReg).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().length(14).pattern(phoneReg),
});
