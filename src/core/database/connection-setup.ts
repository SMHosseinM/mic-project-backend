import exp from 'constants';
import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE_NAME
})

export default pool;