import mysql from "mysql2/promise";
// Ya NO se usa: import "dotenv/config";
// Ya NO se usa: import fs from "fs";
// Ya NO se usa: import path from "path";

// Las variables DATABASE_URL y TIDB_CA_CERT DEBEN estar en el panel de Render.
const TlsCert = process.env.TIDB_CA_CERT;

// console.log de diagnóstico (opcional, pero ayuda a asegurar que el servidor arranque para loguear)
console.log("🔍 Diagnóstico de Conexión:");
console.log(
  "   DB URL (existe):",
  process.env.DATABASE_URL ? "✅ OK" : "❌ FALLÓ"
);
console.log("   CA Cert (existe):", TlsCert ? "✅ OK" : "❌ FALLÓ");
console.log("------------------------------------");

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,

  // Configuración SSL
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
