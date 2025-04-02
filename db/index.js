require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function createTable() {
  try {
    await pool.query(`
            CREATE TABLE IF NOT EXISTS public.users (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL,
                age INT NOT NULL,
                address JSONB NULL,
                additional_info JSONB NULL
            );
        `);
    console.log("Table 'users' is ready.");
  } catch (err) {
    console.error("Error creating table:", err);
  }
}

module.exports = { pool, createTable };
