// * ARCHIVO A COMPLETAR
import { model, Schema } from "mongoose";
import { RecipeModel } from "./recipe.model";

const tagSchema = new Schema(
  {
    // TODO: 1. name: string, obligatorio, único, entre 2 y 30 caracteres.
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 30,
    },
    // TODO: 2. description: string, opcional, máximo 200 caracteres.
    description: {
      type: string,
      maxlength: 200,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// TODO: 3. Definir el virtual "recipes": una tag aparece en muchas recipes (ref Recipe). Se enlaza el _id de la tag con el arreglo tags de Recipe.
tagSchema.virtual("recipes", {
  ref: "Recipe",
  localField: "_id",
  foreignField: "tags",
});
// ? Cuando el foreignField es un arreglo, Mongo hace match si el arreglo CONTIENE el _id.

export const TagModel = model("Tag", tagSchema);
