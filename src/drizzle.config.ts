import dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({ path: `C:\\Users\\vatsr\\OneDrive\\Desktop\\E\\E books\\duo\\duolingo-nextjs-main\\.env.local` });

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  driver: "pglite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
