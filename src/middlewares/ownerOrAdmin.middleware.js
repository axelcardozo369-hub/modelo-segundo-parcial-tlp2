// * ARCHIVO A COMPLETAR
import { RecipeModel } from "../models/recipe.model.js";

// Permite continuar solo si el usuario logueado es el author de la recipe o es admin
export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    // TODO: 1. Buscar la recipe por req.params.id. Si no existe, responder 404 con "receta no encontrada".
    const recipe = await RecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "receta no encontrada" });
    }
    // TODO: 2. Calcular si el usuario logueado es el author (req.user.idUser) y si es admin (req.user.role).
    const esAuthor = recipe.author.toString() === req.user.idUser;
    const esAdmin = req.user.role === "admin";
    // TODO: 3. Si no es ninguno de los dos, responder 403 con un mensaje. Si cumple, llamar a next().
    if (!esAuthor && !esAdmin) {
      return res
        .status(403)
        .json({ message: "no tienes autorizacion para modificar cada receta" });
    }
    next();
    // ? recipe.author es un ObjectId: compararlo como string (toString()).
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
