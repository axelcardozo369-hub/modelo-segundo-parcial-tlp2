// * ARCHIVO A COMPLETAR
import { model, Schema, Types } from "mongoose";

const recipeSchema = new Schema(
  {
    // TODO: 2. title: string, obligatorio, único, entre 3 y 100 caracteres.
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    // TODO: 3. description: string, obligatorio, mínimo 20 caracteres.
    description: {
      type: String,
      required: true,
      minlength: 20,
    },
    // TODO: 4. prepTime: número (minutos), obligatorio, mínimo 1.
    prepTime: {
      type: Number,
      required: true,
      min: 1,
    },
    // TODO: 5. servings: número, obligatorio, mínimo 1.
    servings: {
      type: Number,
      required: true,
      min: 1,
    },
    // TODO: 6. difficulty: string limitado a easy, medium y hard; por defecto easy.
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },

    // TODO: 7. status: string limitado a draft, published y archived; por defecto draft.
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    // TODO: 8. author: ObjectId, obligatorio, con referencia (ref) a User.
    author: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    // TODO: 9. ingredients: arreglo de subdocumentos .
    ingredients: [
      {
        _id: false,
        name: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 50,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
        unit: {
          type: String,
          required: true,
          enum: ["g", "kg", "ml", "l", "unit", "tbsp", "tsp"],
        },
      },
    ],
    // TODO: 10. nutrition: objeto embebido con calories, protein y carbs (todos números, opcionales, mínimo 0).
    nutrition: {
      calories: {
        type: Number,
        min: 0,
      },
      protein: {
        type: Number,
        min: 0,
      },
      carbs: {
        type: Number,
        min: 0,
      },
    },
    // TODO: 11. tags: arreglo de ObjectId con referencia (ref) a Tag.
    tags: [
      {
        type: Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// ? author y tags ya llevan "ref": por eso populate("author") y populate("tags") funcionan directo, sin virtual.

export const RecipeModel = model("Recipe", recipeSchema);
