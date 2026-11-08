// * ARCHIVO A COMPLETAR
import { RecipeModel } from "../models/recipe.model.js";

// Permite continuar solo si el usuario logueado es el author de la recipe o es admin
export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    // TODO: 1. Buscar la recipe por req.params.id. Si no existe, responder 404 con "receta no encontrada".
    // TODO: 2. Calcular si el usuario logueado es el author (req.user.idUser) y si es admin (req.user.role).
    // TODO: 3. Si no es ninguno de los dos, responder 403 con un mensaje. Si cumple, llamar a next().
    // ? recipe.author es un ObjectId: compararlo como string (toString()).
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
