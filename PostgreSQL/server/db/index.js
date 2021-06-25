const auth = require('../../config.js');
const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'SDC',
  password: `${auth.module.auth}`,
  port: 5432,
})

module.exports = pool;