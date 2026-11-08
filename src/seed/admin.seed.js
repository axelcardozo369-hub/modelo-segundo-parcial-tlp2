// ! ARCHIVO BASE: no modificar
// Crea un usuario administrador para poder probar. Uso: npm run seed
import "dotenv/config";
import mongoose from "mongoose";
import { UserModel } from "../models/user.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

await mongoose.connect(process.env.MONGODB_URL);
const existe = await UserModel.findOne({ email: "admin@recetario.com" });
if (existe) {
  console.log("el admin ya existe");
} else {
  await UserModel.create({
    username: "admin",
    email: "admin@recetario.com",
    password: await hashPassword("Admin1234"),
    role: "admin",
    profile: { firstName: "Admin", lastName: "Recetario" },
  });
  console.log("admin creado -> admin@recetario.com / Admin1234");
}
await mongoose.disconnect();
