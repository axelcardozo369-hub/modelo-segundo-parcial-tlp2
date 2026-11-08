// * ARCHIVO A COMPLETAR
import { body, param } from "express-validator";
import { RecipeModel } from "../../models/recipe.model.js";
import { TagModel } from "../../models/tag.model.js";

export const agregateRecipeValidation = [
  // TODO: 1. title: obligatorio, entre 3 y 100 caracteres y único (RecipeModel).
  body("title")
    .notEmpty()
    .withMessage("el title debe ser obligatorio")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("el title debe ser de almenos 3 o 100 caracteres")
    .bail()
    .custom(async (title) => {
      const existeTitle = await RecipeModel.findOne({ title: title });
      if (existeTitle) {
        throw new Error("ya existe este title");
      }
    }),
  // TODO: 2. description: obligatoria, mínimo 20 caracteres.
  body("description")
    .notEmpty()
    .withMessage("la description debe ser obligatoria")
    .bail()
    .isLength({ min: 20 })
    .withMessage("debe ser al menos de 20 caracteres"),
  // TODO: 3. prepTime: obligatorio, entero de al menos 1.
  body("prepTime")
    .notEmpty()
    .withMessage("el prepTime debe ser obligatorio")
    .bail()
    .isInt({ min: 1 })
    .withMessage("debe ser al menos un numero"),
  // TODO: 4. servings: obligatorio, entero de al menos 1.
  body("servings")
    .notEmpty()
    .withMessage("servings debe ser obligatorio")
    .bail()
    .isInt({ min: 1 })
    .withMessage("debe ser al menos un 1"),
  // TODO: 5. difficulty: opcional y limitado a easy, medium o hard.
  body("difficulty")
    .optional()
    .isIn(["easy", "medium", "hard"])
    .withMessage("la difficulty deber ser  al menos easy, medium o hard  "),
  // TODO: 6. status: opcional y limitado a draft, published o archived.
  body("status")
    .optional()
    .isIn(["draft", "published", "archived"])
    .withMessage("debe ser al menos draft, published o archived"),
  // TODO: 7. ingredients: debe ser una lista con al menos 1 ingrediente.
  body("ingredients")
    .isArray({ min: 1 })
    .withMessage(
      "los ingredients deben ser una lista con al menos 1 ingrediente",
    ),
  // TODO: 8. Validar cada ingrediente (ingredients.*): name obligatorio de 2 a 50 caracteres, quantity número mayor a 0 y unit limitada a g, kg, ml, l, unit, tbsp o tsp.
  body("ingredients.*.name")
    .notEmpty()
    .withMessage("el name debe ser obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("el name del ingrediente debe tener entre 2 y 50 caracteres"),
  body("ingredients.*.quantity")
    .notEmpty()
    .withMessage("quantity debe ser obligatorio")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("la quantity debe ser un numero mayor a 0"),
  body("ingredients.*.unit")
    .isIn(["g", "kg", "ml", "l", "unit", "tbsp", "tsp"])
    .withMessage("unit debe ser al menos g, kg, ml, l, unit, tbsp, tsp"),
  // TODO: 9. nutrition.calories, nutrition.protein y nutrition.carbs: opcionales, números mayores o iguales a 0.
  body("nutrition.calories")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("las calories deben ser un numero mayor o igual a 0"),
  body("nutrition.protein")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("la protein debe ser un numero mayor o igual a 0"),
  body("nutrition.carbs")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("los carbs deben ser un numero mayor o igual a 0"),
  // TODO: 10. tags: opcional, lista de ids de Mongo válidos y que existan todos (TagModel).
  body("tags")
    .optional()
    .isArray()
    .withMessage("las tags deben ser una lista de ids"),
  body("tags.*")
    .isMongoId()
    .withMessage("cada tag debe ser un id valido")
    .bail()
    .custom(async (id) => {
      const existeTags = await TagModel.findOne({ _id: id });
      if (!existeTags) {
        throw new Error("No existe la tag");
      }
    }),
  // ? Para validar cada elemento de una lista se usa el comodín: body("ingredients.*.name"), body("tags.*").
  // ? Para comprobar que existen todas las tags: TagModel.find({ _id: { $in: tags } }) y comparar cantidades.
  // ? Buscar con un id mal formado lanza un error de casteo: validar el formato (isMongoId) antes de consultar.
];

export const updateRecipeValidation = [
  // TODO: 11. param id: id de Mongo válido y que exista la recipe.
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const existe = await RecipeModel.findOne({ _id: id });
      if (!existe) throw new Error("la receta no existe");
    }),
  // TODO: 12. title: opcional, mismas reglas que al crear, y único EXCLUYENDO la propia recipe (_id: { $ne: req.params.id }).
  body("title")
    .optional()
    .notEmpty()
    .withMessage("el title no puede estar vacio")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("el title debe tener entre 3 y 100 caracteres")
    .bail()
    .custom(async (title, { req }) => {
      const otraReceta = await RecipeModel.findOne({
        title,
        _id: { $ne: req.params.id },
      });
      if (otraReceta) {
        throw new Error("ya existe ese mismo title en otra receta");
      }
    }),
  // TODO: 13. Resto de los campos (description, prepTime, servings, difficulty, status, ingredients, nutrition, tags): opcionales, con las mismas reglas que al crear.
  body("description")
    .optional()
    .notEmpty()
    .withMessage("la description debe ser obligatoria")
    .bail()
    .isLength({ min: 20 })
    .withMessage("debe ser al menos de 20 caracteres"),
  body("prepTime")
    .optional()
    .notEmpty()
    .withMessage("el prepTime debe ser obligatorio")
    .bail()
    .isInt({ min: 1 })
    .withMessage("debe ser al menos un numero"),
  body("servings")
    .optional()
    .notEmpty()
    .withMessage("servings debe ser obligatorio")
    .bail()
    .isInt({ min: 1 })
    .withMessage("debe ser al menos un 1"),
  body("difficulty")
    .optional()
    .isIn(["easy", "medium", "hard"])
    .withMessage("la difficulty deber ser  al menos easy, medium o hard  "),
  body("status")
    .optional()
    .isIn(["draft", "published", "archived"])
    .withMessage("debe ser al menos draft, published o archived"),
  body("ingredients")
    .optional()
    .isArray({ min: 1 })
    .withMessage(
      "los ingredients deben ser una lista con al menos 1 ingrediente",
    ),
  body("ingredients.*.name")
    .optional()
    .notEmpty()
    .withMessage("el name debe ser obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("el name del ingrediente debe tener entre 2 y 50 caracteres"),
  body("ingredients.*.quantity")
    .optional()
    .notEmpty()
    .withMessage("quantity debe ser obligatorio")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("la quantity debe ser un numero mayor a 0"),
  body("ingredients.*.unit")
    .optional()
    .isIn(["g", "kg", "ml", "l", "unit", "tbsp", "tsp"])
    .withMessage("unit debe ser al menos g, kg, ml, l, unit, tbsp, tsp"),
  body("nutrition.calories")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("las calories deben ser un numero mayor o igual a 0"),
  body("nutrition.protein")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("la protein debe ser un numero mayor o igual a 0"),
  body("nutrition.carbs")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("los carbs deben ser un numero mayor o igual a 0"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("las tags deben ser una lista de ids"),
  body("tags.*")
    .isMongoId()
    .withMessage("cada tag debe ser un id valido")
    .bail()
    .custom(async (id) => {
      const existeTags = await TagModel.findOne({ _id: id });
      if (!existeTags) {
        throw new Error("No existe la tag");
      }
    }),
];

// Se usa en GET /recipes/:id y DELETE /recipes/:id
export const idRecipeValidation = [
  // TODO: 14. param id: id de Mongo válido y que exista la recipe.
  param("id")
    .isMongoId()
    .withMessage("el id debe ser valido")
    .bail()
    .custom(async (id) => {
      const idExiste = await RecipeModel.findOne({ _id: id });
      if (!idExiste) {
        throw new Error("el id que pusiste no esta en la base de datos ");
      }
    }),
];
