import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js"; // ojo la extensión .js

const app = express();
const PORT = process.env.PORT || 3003;

<<<<<<< HEAD
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
=======
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors()); 
>>>>>>> 542862e2a415e58803ec6e149c5c7048aecf7b2e
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send(
    "MedApp Backend | Servidor en funcionamiento | Buenos Aires, Argentina."
  );
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error inesperado" });
});

app.listen(PORT, () => {
  console.log(`🩺 MedApp Backend | Entorno: ${process.env.NODE_ENV || "DEV"}`);
  console.log(`🌐 Escuchando en http://localhost:${PORT}`);
});
