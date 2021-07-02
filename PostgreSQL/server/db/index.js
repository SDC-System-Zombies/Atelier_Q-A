const auth = require('../../config.js');
const { Pool } = require('pg');


const pool = new Pool({
  host: 'ec2-3-226-252-12.compute-1.amazonaws.com',
  port: '5432',
  hostname: 'ubuntu',
  user: 'postgres',
  database: 'sdc',
  password: `${auth.module.auth}`
})

module.exports = pool;