require('dotenv').config(); // Cargar variables de entorno

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://neondb_owner:npg_zhMygD27bnNP@ep-dark-mouse-a5xpuzqd-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => {
    console.log("Conectado a PostgreSQL")
    
  })
  .catch(err => console.error("Error de conexión", err));

module.exports = pool;