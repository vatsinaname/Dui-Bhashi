import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DATABASE_URL!;
const url = new URL(connectionString);

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: url.hostname,
    port: parseInt(url.port || "5432"),
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    ssl: true
  },
  dialect: "postgresql",
} satisfies Config;
