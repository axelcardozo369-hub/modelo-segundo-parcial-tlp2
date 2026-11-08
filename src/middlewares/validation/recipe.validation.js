// * ARCHIVO A COMPLETAR
import { body, param } from "express-validator";
import { RecipeModel } from "../../models/recipe.model.js";
import { TagModel } from "../../models/tag.model.js";

export const agregateRecipeValidation = [
  // TODO: 1. title: obligatorio, entre 3 y 100 caracteres y único (RecipeModel).
  // TODO: 2. description: obligatoria, mínimo 20 caracteres.
  // TODO: 3. prepTime: obligatorio, entero de al menos 1.
  // TODO: 4. servings: obligatorio, entero de al menos 1.
  // TODO: 5. difficulty: opcional y limitado a easy, medium o hard.
  // TODO: 6. status: opcional y limitado a draft, published o archived.
  // TODO: 7. ingredients: debe ser una lista con al menos 1 ingrediente.
  // TODO: 8. Validar cada ingrediente (ingredients.*): name obligatorio de 2 a 50 caracteres, quantity número mayor a 0 y unit limitada a g, kg, ml, l, unit, tbsp o tsp.
  // TODO: 9. nutrition.calories, nutrition.protein y nutrition.carbs: opcionales, números mayores o iguales a 0.
  // TODO: 10. tags: opcional, lista de ids de Mongo válidos y que existan todos (TagModel).
  // ? Para validar cada elemento de una lista se usa el comodín: body("ingredients.*.name"), body("tags.*").
  // ? Para comprobar que existen todas las tags: TagModel.find({ _id: { $in: tags } }) y comparar cantidades.
  // ? Buscar con un id mal formado lanza un error de casteo: validar el formato (isMongoId) antes de consultar.
];

export const updateRecipeValidation = [
  // TODO: 11. param id: id de Mongo válido y que exista la recipe.
  // TODO: 12. title: opcional, mismas reglas que al crear, y único EXCLUYENDO la propia recipe (_id: { $ne: req.params.id }).
  // TODO: 13. Resto de los campos (description, prepTime, servings, difficulty, status, ingredients, nutrition, tags): opcionales, con las mismas reglas que al crear.
];

// Se usa en GET /recipes/:id y DELETE /recipes/:id
export const idRecipeValidation = [
  // TODO: 14. param id: id de Mongo válido y que exista la recipe.
];
