// * ARCHIVO A COMPLETAR
import { matchedData } from "express-validator";
import { RecipeModel } from "../models/recipe.model.js";

export const agregateRecipe = async (req, res) => {
  try {
    // TODO: 1. Tomar los datos validados con matchedData.
    // TODO: 2. Crear la recipe. El author sale del usuario logueado (req.user.idUser), NUNCA del body.
    // TODO: 3. Responder con código 201, un mensaje de éxito y la recipe creada.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getAllRecipes = async (_req, res) => {
  try {
    // TODO: 1. Listar SOLO las recipes con status "published", incluyendo su author (sin la password) y sus tags, y responder con código 200.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getMyRecipes = async (req, res) => {
  try {
    // TODO: 1. Listar las recipes del usuario logueado (en cualquier estado), incluyendo sus tags, y responder con código 200.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getIdRecipe = async (req, res) => {
  try {
    // TODO: 1. Buscar la recipe por id incluyendo su author (sin la password) y sus tags.
    // TODO: 2. Si la recipe NO está publicada, solo puede verla su author o un admin: para cualquier otro usuario responder 404 con "receta no encontrada".
    // TODO: 3. Responder con código 200 y la recipe.
    // ? El author populado es un objeto: para compararlo con req.user.idUser (string) hay que convertir su _id con toString().
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const updateRecipe = async (req, res) => {
  try {
    // TODO: 1. Tomar los datos validados con matchedData y actualizar la recipe.
    // TODO: 2. Responder con código 200 y la recipe ya actualizada, incluyendo su author (sin la password) y sus tags.
    // ? Para que findByIdAndUpdate devuelva el documento actualizado: returnDocument: "after". Para que aplique las reglas del schema: runValidators: true.
    // ? Si vienen ingredients o tags en el body, se reemplazan completos.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    // TODO: 1. Eliminar la recipe y responder con código 200 y un mensaje de éxito.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
