// * ARCHIVO A COMPLETAR
import { matchedData } from "express-validator";
import { TagModel } from "../models/tag.model.js";
import { RecipeModel } from "../models/recipe.model.js";

export const agregateTag = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const tag = await TagModel.create(data);
    return res.status(201).json({ message: "tag agregada", data: tag });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getAllTags = async (_req, res) => {
  try {
    const tags = await TagModel.find().populate({
      path: "recipes",
      select: "title status author",
      populate: { path: "author", select: "username" },
    });
    return res.status(200).json({ message: "estas son todas las tags", data: tags });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getIdTag = async (req, res) => {
  try {
    const tag = await TagModel.findById(req.params.id).populate({
      path: "recipes",
      select: "title status author",
      populate: { path: "author", select: "username" },
    });
    return res.status(200).json({ message: "tag encontrada", data: tag });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const updateTag = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const tag = await TagModel.findByIdAndUpdate(req.params.id, data, {
      returnDocument: "after",
    });
    return res.status(200).json({ message: "tag actualizada", data: tag });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const deleteTag = async (req, res) => {
  try {
    // TODO: 1. Borrar la tag.
    // TODO: 2. Eliminación en cascada: quitar el id de la tag del arreglo tags de todas las recipes que la tengan ($pull con updateMany).
    // TODO: 3. Responder con código 200 y un mensaje de éxito.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
