import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;


const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE} = process.env;

const config = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    allowExitOnIdle: true
}

const pool = new Pool(config);

const getDate  = async() => {
    const res = await pool.query('SELECT NOW()');
    console.log(res.rows[0].now);
}
getDate();

export default pool;