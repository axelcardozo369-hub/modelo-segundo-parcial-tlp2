// ! ARCHIVO BASE: no modificar
import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "no autenticado" });
    }
    // req.user queda con { idUser, role }
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: "token invalido o expirado" });
  }
};
