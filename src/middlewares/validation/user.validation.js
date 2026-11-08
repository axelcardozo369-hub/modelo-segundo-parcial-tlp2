// ! ARCHIVO BASE: no modificar
import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";

// Se usa en POST /auth/register
export const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("el username es obligatorio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("el username debe tener entre 3 y 20 caracteres")
    .bail()
    .isAlphanumeric()
    .withMessage("el username solo puede tener letras y numeros")
    .bail()
    .custom(async (username) => {
      const existe = await UserModel.findOne({ username });
      if (existe) throw new Error("el username ya esta en uso");
    }),
  body("email")
    .notEmpty()
    .withMessage("el email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("el email debe ser valido")
    .bail()
    .custom(async (email) => {
      const existe = await UserModel.findOne({ email });
      if (existe) throw new Error("el email ya esta en uso");
    }),
  body("password")
    .notEmpty()
    .withMessage("la password es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("la password debe tener al menos 8 caracteres")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage("la password debe tener una mayuscula, una minuscula y un numero"),
  body("profile").notEmpty().withMessage("el profile es obligatorio"),
  body("profile.firstName")
    .notEmpty()
    .withMessage("el firstName es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("el firstName debe tener entre 2 y 50 caracteres"),
  body("profile.lastName")
    .notEmpty()
    .withMessage("el lastName es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("el lastName debe tener entre 2 y 50 caracteres"),
  body("profile.country")
    .optional()
    .isLength({ max: 50 })
    .withMessage("el country no puede superar los 50 caracteres"),
  body("profile.phone")
    .optional()
    .isNumeric()
    .withMessage("el phone solo puede tener numeros"),
];

// Se usa en PUT /users/:id (solo admin). El profile se edita en PUT /auth/profile
export const updateUserValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const existe = await UserModel.findOne({ _id: id, deletedAt: null });
      if (!existe) throw new Error("el usuario no existe");
    }),
  body("username")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("el username debe tener entre 3 y 20 caracteres")
    .bail()
    .isAlphanumeric()
    .withMessage("el username solo puede tener letras y numeros")
    .bail()
    .custom(async (username, { req }) => {
      const otro = await UserModel.findOne({
        username,
        _id: { $ne: req.params.id },
      });
      if (otro) throw new Error("el username ya lo usa otro usuario");
    }),
  body("email")
    .optional()
    .isEmail()
    .withMessage("el email debe ser valido")
    .bail()
    .custom(async (email, { req }) => {
      const otro = await UserModel.findOne({
        email,
        _id: { $ne: req.params.id },
      });
      if (otro) throw new Error("el email ya lo usa otro usuario");
    }),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("la password debe tener al menos 8 caracteres")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage("la password debe tener una mayuscula, una minuscula y un numero"),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("el role debe ser user o admin"),
];

// Se usa en GET /users/:id y DELETE /users/:id
export const idUserValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const existe = await UserModel.findOne({ _id: id, deletedAt: null });
      if (!existe) throw new Error("el usuario no existe");
    }),
];
