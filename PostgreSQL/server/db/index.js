const auth = require('../../config.js');
const { Pool } = require('pg');


const pool = new Pool({
  user: 'julianzthong',
  host: 'localhost',
  database: 'sdc',
  password: `${auth.module.auth}`,
  port: 5432,
})

module.exports = pool;