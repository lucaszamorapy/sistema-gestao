const express = require("express");
const cors = require("cors");
const baseRoutes = require("./src/routes/baseRoutes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", baseRoutes);

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.listen(8082, () => {
  console.log("Servidor rodando na porta 8082");
});
