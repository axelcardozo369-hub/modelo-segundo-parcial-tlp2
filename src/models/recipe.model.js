// * ARCHIVO A COMPLETAR
import { model, Schema, Types } from "mongoose";

// TODO: 1. Crear ingredientSchema, el subdocumento de cada ingrediente (sin _id propio):
//          name (string, obligatorio, 2 a 50 caracteres), quantity (número, obligatorio, mínimo 0)
//          y unit (string, obligatorio, limitado a: g, kg, ml, l, unit, tbsp, tsp).
// ? Para que un subdocumento no genere su propio _id se pasa { _id: false } como segundo argumento de new Schema().

const recipeSchema = new Schema(
  {
    // TODO: 2. title: string, obligatorio, único, entre 3 y 100 caracteres.
    // TODO: 3. description: string, obligatorio, mínimo 20 caracteres.
    // TODO: 4. prepTime: número (minutos), obligatorio, mínimo 1.
    // TODO: 5. servings: número, obligatorio, mínimo 1.
    // TODO: 6. difficulty: string limitado a easy, medium y hard; por defecto easy.
    // TODO: 7. status: string limitado a draft, published y archived; por defecto draft.
    // TODO: 8. author: ObjectId, obligatorio, con referencia (ref) a User.
    // TODO: 9. ingredients: arreglo de subdocumentos (usar ingredientSchema).
    // TODO: 10. nutrition: objeto embebido con calories, protein y carbs (todos números, opcionales, mínimo 0).
    // TODO: 11. tags: arreglo de ObjectId con referencia (ref) a Tag.
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ? author y tags ya llevan "ref": por eso populate("author") y populate("tags") funcionan directo, sin virtual.

export const RecipeModel = model("Recipe", recipeSchema);
