// ! ARCHIVO BASE: no modificar
// (Sirve de ejemplo del estilo que hay que seguir en las validaciones a completar)
import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const agregateTagValidation = [
  body("name")
    .notEmpty()
    .withMessage("el name es obligatorio")
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage("el name debe tener entre 2 y 30 caracteres")
    .bail()
    .custom(async (name) => {
      const existe = await TagModel.findOne({ name });
      if (existe) throw new Error("ya existe una tag con ese name");
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("la description no puede superar los 200 caracteres"),
];

export const updateTagValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const existe = await TagModel.findOne({ _id: id });
      if (!existe) throw new Error("la tag no existe");
    }),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("el name no puede estar vacio")
    .bail()
    .isLength({ min: 2, max: 30 })
    .withMessage("el name debe tener entre 2 y 30 caracteres")
    .bail()
    .custom(async (name, { req }) => {
      // se excluye la propia tag que se esta editando
      const otra = await TagModel.findOne({ name, _id: { $ne: req.params.id } });
      if (otra) throw new Error("ya existe otra tag con ese name");
    }),
  body("description")
    .optional()
    .isLength({ max: 200 })
    .withMessage("la description no puede superar los 200 caracteres"),
];

// Se usa en GET /tags/:id y DELETE /tags/:id
export const idTagValidation = [
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const existe = await TagModel.findOne({ _id: id });
      if (!existe) throw new Error("la tag no existe");
    }),
];
