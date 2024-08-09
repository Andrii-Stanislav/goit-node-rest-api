import { nanoid } from "nanoid";

import * as authServices from "../services/authServices.js";
import { HttpError } from "../helpers/HttpError.js";
import { compareHash } from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";
import { sendEmail, getVerifyEmailData } from "../helpers/sendEmail.js";

export const signUp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await authServices.findUserByEmail(email);

    if (user) {
      throw HttpError(409, `Email ${email} in use`);
    }

    const verificationToken = nanoid();

    const newUser = await authServices.saveUser({
      ...req.body,
      verificationToken,
    });

    const verifyEmail = getVerifyEmailData({ email, verificationToken });

    await sendEmail(verifyEmail);

    res.status(201).json({
      user: { email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await authServices.findUserByVerificationToken(
    verificationToken
  );

  if (!user) {
    throw HttpError(404);
  }

  await authServices.updateUserById(user.id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: "Verification successfull!" });
};

export const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await authServices.findUserByEmail(email);

  if (!user) {
    throw HttpError(404);
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = getVerifyEmailData({
    email,
    verificationToken: user.verificationToken,
  });

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verification email sent",
  });
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authServices.findUserByEmail(email);

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    if (!user.verify) {
      throw HttpError(401, "Email is not verified");
    }

    const comparePassword = await compareHash(password, user.password);

    if (!comparePassword) {
      throw HttpError(401, "Email or password is wrong");
    }

    const id = user?.id;

    const token = createToken({ id });

    await authServices.updateUserById(id, { token });

    res.status(200).json({
      token: token,
      user: {
        email: email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await authServices.findUserById(id);

    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    await authServices.updateUserById(id, { token: null });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { subscription } = req.body;

    const result = await authServices.updateUserById(id, { subscription });

    if (!result) {
      throw HttpError(400, "Missing field subscription");
    }

    return res.status(200).json({ email: result.email, subscription });
  } catch (error) {
    next(error.message);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    const { file, user } = req;

    if (!file) {
      return res.status(400).send({ message: "Avatar image is required!" });
    }

    const { avatarURL } = await authServices.uploadAvatar(file, user.id);

    return res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
