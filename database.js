const { Pool } = require('pg');

const pool = new Pool({
  user: 'default',
  host: 'ep-calm-mud-47680676.us-east-1.postgres.vercel-storage.com',
  database: "verceldb",
  password: 'pGSy1kb6vYUP',
  port: 5432,
  ssl: {rejectUnauthorized: false},
});

//"postgres://default:pGSy1kb6vYUP@ep-calm-mud-47680676.us-east-1.postgres.vercel-storage.com:5432/verceldb"

const createTableQuery = `
CREATE TABLE historiaclinica (
  id SERIAL PRIMARY KEY,
  Nombre VARCHAR(50),
  Fecha DATE,
  MotivoConsulta TEXT,
  Doctor VARCHAR(50),
  Notas TEXT,
  Imagen TEXT
);`


pool.query(createTableQuery, (err, res) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('tengo sueño');
  }
    pool.end();
});