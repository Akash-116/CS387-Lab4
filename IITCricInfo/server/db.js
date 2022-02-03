const Pool = require("pg").Pool;

const pool = new Pool({
  user: "someone",
  password: "something",
  host: "localhost",
  port: 5432,
  database: "lab3db"
});

module.exports = pool;
