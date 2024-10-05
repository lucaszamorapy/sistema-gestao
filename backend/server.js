import express from "express";
import cors from "cors";
import baseRoutes from "./src/routes/baseRoutes.js";
import path from "path";

const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const assets = "./src/assets";

app.use(cors());
app.use(express.json());

app.use("/api", baseRoutes);

app.use("/assets", express.static(path.join(__dirname, assets)));

app.listen(8082, () => {
  console.log("Servidor rodando na porta 82");
});
