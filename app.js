// ! ARCHIVO BASE: no modificar
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dataBaseMongoose } from "./src/config/database.js";
// Se importan los models para que queden registrados (necesario para populate)
import "./src/models/user.model.js";
import "./src/models/tag.model.js";
import "./src/models/recipe.model.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { userRouter } from "./src/routes/user.routes.js";
import { tagRouter } from "./src/routes/tag.routes.js";
import { recipeRouter } from "./src/routes/recipe.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", tagRouter);
app.use("/api", recipeRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
dataBaseMongoose();
