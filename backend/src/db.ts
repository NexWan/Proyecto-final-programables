import {Pool} from 'pg'

const connection = new Pool({
    user: 'wan',
    host: 'localhost',
    database: 'basurero',
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export default connection;