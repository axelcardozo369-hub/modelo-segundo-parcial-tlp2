// ! ARCHIVO BASE: no modificar
import { Router } from "express";
import {
  agregateTag,
  deleteTag,
  getAllTags,
  getIdTag,
  updateTag,
} from "../controllers/tag.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  agregateTagValidation,
  idTagValidation,
  updateTagValidation,
} from "../middlewares/validation/tag.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const tagRouter = Router();

tagRouter.post(
  "/tags",
  authMiddleware,
  adminMiddleware,
  agregateTagValidation,
  validate,
  agregateTag,
);
tagRouter.get("/tags", authMiddleware, getAllTags);
tagRouter.get(
  "/tags/:id",
  authMiddleware,
  idTagValidation,
  validate,
  getIdTag,
);
tagRouter.put(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  updateTagValidation,
  validate,
  updateTag,
);
tagRouter.delete(
  "/tags/:id",
  authMiddleware,
  adminMiddleware,
  idTagValidation,
  validate,
  deleteTag,
);
