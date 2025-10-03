import "dotenv/config";
import mysql from "mysql2/promise";

const TlsCert = process.env.TIDB_CA_CERT;

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,

  ssl: {
    ca: TlsCert,
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on("error", (err) => {
  console.error("❌ Error de conexión al pool de la base de datos:", err);
});

export default pool;
