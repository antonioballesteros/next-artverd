import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

/**
 * Postgres client for server use only.
 * Dev: global singleton + pool max 5 so HMR and overlapping RSC requests do not stall on max:1.
 * Prod: max 1 for serverless / Supabase pooler per instance.
 */
const globalForDb = globalThis as unknown as {
  __bouquetPostgres?: ReturnType<typeof postgres>;
};

const poolMax =
  process.env.NODE_ENV === "production"
    ? 1
    : Math.min(5, Number(process.env.POSTGRES_POOL_MAX ?? 5) || 5);

const client =
  globalForDb.__bouquetPostgres ?? postgres(connectionString, { max: poolMax });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__bouquetPostgres = client;
}

export const db = drizzle(client, { schema });
