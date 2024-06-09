import { defineConfig } from "drizzle-kit";

console.log(process.env.DATABASE_URL)

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN
  },
  out: "./drizzle",
});