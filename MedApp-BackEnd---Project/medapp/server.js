require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const routes = require("./routes");

const PORT = process.env.PORT || 3002;

app.use(express.json()); // Permite leer JSON en el body
app.use(express.urlencoded({ extended: true })); // Permite leer datos de formulariosnpm

app.use(cors()); // Permitir solicitudes desde cualquier origen
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error inesperado" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
