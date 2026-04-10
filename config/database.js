import { Pool } from 'pg'

export const db = new Pool ({
    user: 'postgres',
    host: 'localhost',
    password: 'code321',
    port: 5432,
    database: 'personal-web-new',
    max: 5
})