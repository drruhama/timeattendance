//import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { Pool } from "pg";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema"


const pool = new Pool({
    //connectionString: process.env.DB_URL!,
    //connectionString: "postgres://postgres:drruhama@localhost:5432/hris"
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'drruhama',
  database: 'hris',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
const db = drizzle(pool, {schema}) as NodePgDatabase<typeof schema>;

export default db
