const { Pool } = require('pg');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

// const query = (text:string , params?:any[])=> pool.query(text,params);
module.exports = {pool};
