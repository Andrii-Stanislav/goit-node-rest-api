import Joi from "joi";

const phoneReg = /^\(\d{3}\) \d{3}-\d{4}$/;

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
