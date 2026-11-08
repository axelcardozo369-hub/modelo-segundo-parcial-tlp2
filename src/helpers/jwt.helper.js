// ! ARCHIVO BASE: no modificar
import jwt from "jsonwebtoken";

//? genero el token
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//? verifico el token (lanza error si es inválido o expiró)
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
