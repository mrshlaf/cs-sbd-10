const { Pool } = require('pg');

const dbConfig = process.env.DATABASE_URL 
  ? { 
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }
  : {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    };

// Diagnostic logging for Vercel
if (process.env.NODE_ENV === 'production') {
  if (process.env.DATABASE_URL) {
    console.log('DB_STATUS: Using DATABASE_URL (Masked: ' + process.env.DATABASE_URL.substring(0, 15) + '...)');
  } else {
    console.log('DB_STATUS: DATABASE_URL is missing. Using host: ' + (process.env.DB_HOST || 'localhost'));
  }
}

const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};