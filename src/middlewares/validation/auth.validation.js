// * ARCHIVO A COMPLETAR
import { body } from "express-validator";

export const loginValidation = [
  // TODO: 1. Validar email: obligatorio y con formato válido.
  body("email")
    .notEmpty()
    .withMessage("el email debe ser obligatorio")
    .bail()
    .isEmail()
    .withMessage("el email deber ser valido "),
  // TODO: 2. Validar password: obligatoria.
  body("password").notEmpty().withMessage("el password debe ser obligatoria"),
];

export const updateProfileValidation = [
  // TODO: 3. Validar firstName y lastName: opcionales, entre 2 y 50 caracteres.
  body("firstName")
    .optional()
    .notEmpty()
    .withMessage("el firstName debe ser obligatoria")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("el firstName debe ser de 2 hasta 50 caracteres"),
  body("lastName")
    .optional()
    .notEmpty()
    .withMessage("el lastName debe ser obligatoria")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("el lastName debe ser de 2 hasta 50 caracteres"),
  // TODO: 4. Validar country: opcional, máximo 50 caracteres.
  body("country")
    .optional()
    .isLength({ max: 50 })
    .withMessage("debe ser hasta 50 caracteres"),
  // TODO: 5. Validar phone: opcional, solo números y entre 8 y 15 dígitos.
  body("phone")
    .optional()
    .isNumeric()
    .withMessage("solo debe ser en formato numerico")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("el phone debe ser entre 8 hasta 15 digitos"),
  // ? Todos opcionales porque se puede modificar solo algunos campos del profile.
  // ? Mirar tag.validation.js: tiene el estilo (bail, withMessage) que se espera.
];
