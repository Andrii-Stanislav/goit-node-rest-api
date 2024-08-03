import express from "express";

import * as contactsControllers from "../controllers/contactsControllers.js";

import { isEmptyBody } from "../helpers/isEmptyBody.js";
import { validateBody } from "../helpers/validateBody.js";
import { isValidId } from "../helpers/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getContact);

contactsRouter.delete("/:id", contactsControllers.removeContact);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(updateContactSchema),
  contactsControllers.updateContact
);

export default contactsRouter;
