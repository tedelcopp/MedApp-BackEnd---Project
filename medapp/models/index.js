import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { sequelizeInstance } from "./models/index.js";

const app = express();
const PORT = process.env.PORT || 3003;

const allowedOrigins = [
  "https://themedapp.vercel.app",
  "https://medapp-backend-project.onrender.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const startServer = async () => {
  try {
    await sequelizeInstance.sync({ force: true });
    console.log(
      "✅ Base de datos FORZADA y sincronizada. ¡Esquema correcto aplicado!"
    );

    app.listen(PORT, () => {
      console.log(
        `🩺 MedApp Backend | Entorno: ${process.env.NODE_ENV || "DEV"}`
      );
      console.log(`🌐 Escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "❌ Error al iniciar el servidor o conectar la DB:",
      error.message
    );
    process.exit(1);
  }
};

startServer();
