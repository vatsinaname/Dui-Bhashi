// src/db/drizzle.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http"; // Updated import
import * as schema from "./schema";


const sql = neon("postgresql://neondb_owner:npg_QGA9yI8nfkoO@ep-round-dust-a19hgz0p-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&options=project%3Dep-round-dust-a19hgz0p");
export const db = drizzle(sql, { schema });