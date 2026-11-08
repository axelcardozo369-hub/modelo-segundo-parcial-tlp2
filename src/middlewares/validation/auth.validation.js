// * ARCHIVO A COMPLETAR
import { body } from "express-validator";

export const loginValidation = [
  // TODO: 1. Validar email: obligatorio y con formato válido.
  // TODO: 2. Validar password: obligatoria.
];

export const updateProfileValidation = [
  // TODO: 3. Validar firstName y lastName: opcionales, entre 2 y 50 caracteres.
  // TODO: 4. Validar country: opcional, máximo 50 caracteres.
  // TODO: 5. Validar phone: opcional, solo números y entre 8 y 15 dígitos.
  // ? Todos opcionales porque se puede modificar solo algunos campos del profile.
  // ? Mirar tag.validation.js: tiene el estilo (bail, withMessage) que se espera.
];
