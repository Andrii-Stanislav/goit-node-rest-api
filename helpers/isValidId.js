import { HttpError } from "./HttpError.js";

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  const numId = Number(id);

  if (Number.isNaN(numId) || !Number.isInteger(numId)) {
    return next(HttpError(404, `${id} is not valid id`));
  }
  next();
};
