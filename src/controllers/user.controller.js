// * ARCHIVO A COMPLETAR
import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { RecipeModel } from "../models/recipe.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

export const getAllUsers = async (_req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null })
      .select("-password")
      .populate("recipes");
    return res
      .status(200)
      .json({ message: "estos son todos los usuarios", data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getIdUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.params.id,
      deletedAt: null,
    })
      .select("-password")
      .populate("recipes");
    return res.status(200).json({ message: "usuario encontrado", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    // si cambia la password hay que hashearla de nuevo
    if (data.password) data.password = await hashPassword(data.password);
    await UserModel.findByIdAndUpdate(req.params.id, data);
    // se vuelve a leer para devolver el user ya actualizado y sin la password
    const user = await UserModel.findById(req.params.id).select("-password");
    return res
      .status(200)
      .json({ message: "usuario actualizado con exito", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    // TODO: 1. Eliminación lógica: en lugar de borrar el user, ponerle la fecha actual en deletedAt.
    const { id } = req.params;
    await UserModel.findByIdAndUpdate(id, { deletedAt: new Date() });
    // TODO: 2. Eliminación en cascada: borrar todas las recipes cuyo author sea ese user.
    await RecipeModel.deleteMany({ author: id });
    // TODO: 3. Responder con código 200 y un mensaje de éxito.
    return res.status(200).json({ message: "user eliminado con exito" });
    // ? La validación de la ruta ya comprobó que el id es válido y que el user existe.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
