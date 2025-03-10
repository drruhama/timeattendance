import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import db from ".";
import { sessionTable, userTable } from "./schema";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export default adapter
