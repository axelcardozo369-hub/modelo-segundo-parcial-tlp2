// * ARCHIVO A COMPLETAR
import { model, Schema } from "mongoose";

const tagSchema = new Schema(
  {
    // TODO: 1. name: string, obligatorio, único, entre 2 y 30 caracteres.
    // TODO: 2. description: string, opcional, máximo 200 caracteres.
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// TODO: 3. Definir el virtual "recipes": una tag aparece en muchas recipes (ref Recipe). Se enlaza el _id de la tag con el arreglo tags de Recipe.
// ? Cuando el foreignField es un arreglo, Mongo hace match si el arreglo CONTIENE el _id.

export const TagModel = model("Tag", tagSchema);
