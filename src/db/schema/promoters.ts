/* eslint-disable import/prefer-default-export */
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const promoters = sqliteTable("promoters", {
  id: integer('id').primaryKey(),
  agent: text('agent'),
  first_name: text('first_name'),
  last_name: text('last_name'),
  email: text('email'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  // bookings - table that links a booking together. 
});
