// * ARCHIVO A COMPLETAR
import { Router } from "express";
import {
  agregateRecipe,
  deleteRecipe,
  getAllRecipes,
  getIdRecipe,
  getMyRecipes,
  updateRecipe,
} from "../controllers/recipe.controller.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerOrAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
import {
  agregateRecipeValidation,
  idRecipeValidation,
  updateRecipeValidation,
} from "../middlewares/validation/recipe.validation.js";

export const recipeRouter = Router();

// TODO: 1. Decidir y aplicar los middlewares que correspondan a cada ruta.
// ? Orden esperado: authMiddleware, validaciones, validate, (ownerOrAdminMiddleware), controlador.

// ? Crear una receta: requiere sesión iniciada y datos válidos.
recipeRouter.post("/recipes", agregateRecipe);

// ? Listar las recetas publicadas: requiere sesión iniciada.
recipeRouter.get("/recipes", getAllRecipes);

// ? Listar mis recetas: requiere sesión iniciada.
// ? OJO: esta ruta tiene que declararse ANTES de "/recipes/:id". ¿Por qué?
recipeRouter.get("/recipes/my", getMyRecipes);

// ? Ver una receta: requiere sesión iniciada y un id válido.
recipeRouter.get("/recipes/:id", getIdRecipe);

// ? Editar una receta: solo su autor o un admin, con datos válidos.
recipeRouter.put("/recipes/:id", updateRecipe);

// ? Eliminar una receta: solo su autor o un admin.
recipeRouter.delete("/recipes/:id", deleteRecipe);
