// ! ARCHIVO BASE: no modificar
import bcrypt from "bcryptjs";

//? hasheo la password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

//? comparo la password con el hash guardado
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
