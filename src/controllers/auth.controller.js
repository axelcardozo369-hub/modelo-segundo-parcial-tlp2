// * ARCHIVO A COMPLETAR
import { matchedData } from "express-validator";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    // TODO: 1. Tomar username, email, password y profile con matchedData (solo lo que pasó la validación).
    // ? El role NO se toma del body: todo usuario que se registra es "user".
    // TODO: 2. Hashear la password (hashPassword) y crear el user.
    // TODO: 3. Responder con código 201 y un mensaje de éxito (sin devolver el usuario).
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: 1. Buscar el user por email (un usuario eliminado lógicamente no puede iniciar sesión) y comparar la password (comparePassword).
    // ? Usar el mismo mensaje (401) para email inexistente y password incorrecta.
    // TODO: 2. Generar un token con generateToken({ idUser, role }).
    // TODO: 3. Guardarlo en una cookie httpOnly llamada "token" (duración 10 horas), y responder con código 200 y un mensaje de éxito.
    // ? authMiddleware deja el payload del token en req.user: ahí van a encontrar idUser y role.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: 1. Buscar al usuario logueado (req.user.idUser) sin la password y con sus recipes (populate), y responder con código 200.
    // ? Acordarse del filtro de eliminación lógica.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    // TODO: 1. Tomar los datos validados (firstName, lastName, country, phone) con matchedData.
    // TODO: 2. Buscar al usuario logueado (sin password) y modificar solo los campos del profile que llegaron, sin pisar el resto del profile.
    // TODO: 3. Guardar y responder con código 200 y el usuario actualizado. Si no existe, 404.
    // ? Si se reemplaza el objeto profile entero se pierden los campos que no llegaron: conviene asignar campo por campo (user.profile.firstName = ...) y usar save().
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  try {
    // TODO: 1. Eliminar la cookie "token" y responder con código 200 y un mensaje de éxito.
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
