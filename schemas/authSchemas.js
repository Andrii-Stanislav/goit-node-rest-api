import Joi from "joi";

import { emailRegexp, passwordRegexp } from "../constants/regexp.js";

export const authSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).pattern(passwordRegexp).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const authSignInSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const resendVerifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});
