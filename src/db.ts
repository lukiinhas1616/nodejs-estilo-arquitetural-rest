import { Pool } from "pg";

const connectionString = 'postgres://kqqvfdqi:h3Dij38qEdUUkStHquj_OyMpesA4nJW7@motty.db.elephantsql.com/kqqvfdqi';
const db = new Pool({connectionString})

export default db;