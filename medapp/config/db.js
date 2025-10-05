import mysql from "mysql2/promise";

const TlsCert = process.env.TIDB_CA_CERT;

console.log("🔍 Diagnóstico de Conexión:");
console.log(
  "   DB URL (existe):",
  process.env.DATABASE_URL ? "✅ OK" : "❌ FALLÓ"
);
console.log("   CA Cert (existe):", TlsCert ? "✅ OK" : "❌ FALLÓ");
console.log("------------------------------------");

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,

  ssl: {
    ca: TlsCert,
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on("error", (err) => {
  console.error("❌ Error de conexión al pool de la base de datos:", err);
});

export default pool;
