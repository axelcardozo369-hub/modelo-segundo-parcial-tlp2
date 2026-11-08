// ! ARCHIVO BASE: no modificar
import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatted = errors.formatWith((err) => `${err.path}: ${err.msg}`);
    return res.status(400).json(formatted.array());
  }
  next();
};
