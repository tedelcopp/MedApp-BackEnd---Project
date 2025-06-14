require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const routes = require("./routes");

const PORT = process.env.PORT || 3003;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors()); 
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("¡Servidor funcionando!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error inesperado" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
