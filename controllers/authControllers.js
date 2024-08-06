import * as authServises from "../services/authServices.js";
import { HttpError } from "../helpers/HttpError.js";
import { compareHash } from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";

export const signUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await authServises.findUserByEmail(email);

    if (user) {
      throw HttpError(409, `Email ${email} in use`);
    }

    const newUser = await authServises.saveUser(req.body);

    res.status(201).json({
      user: { email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authServises.findUserByEmail(email);

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const comparePassword = await compareHash(password, user.password);

    if (!comparePassword) {
      throw HttpError(401, "Email or password is wrong");
    }

    const id = user?.id;

    const token = createToken({ id });

    await authServises.updateUserById(id, { token });

    res.status(200).json({
      token: token,
      user: {
        email: email,
        subscription: user.subscription,
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
    const user = await authServises.findUserById(id);

    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    await authServises.updateUserById(id, { token: null });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { subscription } = req.body;

    const result = await authServises.updateUserById(id, { subscription });

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

    const { avatarURL } = await authServises.uploadAvatar(file, user.id);

    return res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
