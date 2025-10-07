import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { sequelizeInstance } from "./models/index.js"; // 🚨 IMPORTAMOS LA INSTANCIA DE SEQUELIZE

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
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

// 🚨 FUNCIÓN PARA CONECTAR LA BASE DE DATOS E INICIAR EL SERVIDOR
const startServer = async () => {
  try {
    // 🚨 SINCRONIZACIÓN FORZADA (force: true)
    // Esto recreará las tablas que borraste con los tipos de datos corregidos (DNI como BIGINT).
    await sequelizeInstance.sync({ force: true });
    console.log("✅ Base de datos sincronizada y tablas creadas con éxito.");

    app.listen(PORT, () => {
      console.log(
        `🩺 MedApp Backend | Entorno: ${process.env.NODE_ENV || "DEV"}`
      );
      console.log(`🌐 Escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "❌ No se pudo iniciar el servidor debido a un error de DB:",
      error
    );
    // Agregamos un detalle del error de conexión
    throw new Error(`Error al conectar la DB: ${error.message}`);
  }
};

// 🚨 INICIAMOS EL SERVIDOR CON LA FUNCIÓN DE CONEXIÓN
startServer();
