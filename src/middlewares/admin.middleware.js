// ! ARCHIVO BASE: no modificar
export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "no tienes permiso de administrador" });
  }
  next();
};
