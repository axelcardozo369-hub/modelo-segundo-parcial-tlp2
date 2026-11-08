// * ARCHIVO A COMPLETAR
import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { registerValidation } from "../middlewares/validation/user.validation.js";
import {
  loginValidation,
  updateProfileValidation,
} from "../middlewares/validation/auth.validation.js";

export const authRouter = Router();

// TODO: 1. Decidir y aplicar los middlewares que correspondan a cada ruta (orden: sesión, validaciones, validate, controlador).

// ? Registro: acceso público, con registerValidation.
authRouter.post("/auth/register", register);

// ? Inicio de sesión: acceso público, con loginValidation.
authRouter.post("/auth/login", login);

// ? Cierre de sesión: requiere sesión iniciada.
authRouter.post("/auth/logout", logout);

// ? Ver mi perfil: requiere sesión iniciada.
authRouter.get("/auth/profile", getProfile);

// ? Editar mi perfil: requiere sesión iniciada y datos válidos (updateProfileValidation).
authRouter.put("/auth/profile", updateProfile);
