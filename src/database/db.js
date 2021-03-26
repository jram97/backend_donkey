const { Pool } = require('pg');

const pool = new Pool({
    host: "127.0.0.1",
    user: "postgres",
    password: "jramirez",
    database: "postgres",
    port: 5432
});

pool.connect((err, cli, re) => {
    if (err) {
        console.log(err);
    } else {
        console.log('conectado');
    }
});

module.exports = pool;