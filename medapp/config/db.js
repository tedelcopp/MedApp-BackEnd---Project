// import mysql from "mysql2";
// import dotenv from "dotenv";

// dotenv.config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASSWORD || "123456",
//   database: process.env.DB_NAME || "medapp",
//   port: process.env.DB_PORT || 3306,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("❌ Error al conectar a la base de datos:", err);
//     return;
//   }
//   console.log("✅ Conexión exitosa a MySQL");
// });

// export default connection;

import "dotenv/config";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.on("error", (err) => {
  console.error("❌ Error de conexión al pool de la base de datos:", err);
});

export default pool;
