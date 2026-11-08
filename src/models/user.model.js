// * ARCHIVO A COMPLETAR
import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    // Profile embebido: vive dentro del documento del user
    profile: {
      firstName: { type: String, minlength: 2, maxlength: 50, required: true },
      lastName: { type: String, minlength: 2, maxlength: 50, required: true },
      country: { type: String, maxlength: 50 },
      phone: { type: String },
    },
    // TODO: 1. Agregar el campo deletedAt (fecha, con null como valor por defecto) para la eliminación lógica.
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// TODO: 2. Definir el virtual "recipes": un user tiene muchas recipes (ref Recipe). Se enlaza el _id del user con el campo author de Recipe.
userSchema.virtual("recipes", {
  ref: "Recipe",
  localField: "_id",
  foreignField: "author",
});

// ? Los controladores base y de auth usan populate("recipes"): el alias debe coincidir.

export const UserModel = model("User", userSchema);
