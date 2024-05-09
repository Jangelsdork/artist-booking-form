/* eslint-disable import/prefer-default-export */
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const promoters = sqliteTable("promoters", {
  id: integer('id').primaryKey(),
  agent: text('agent'),
  first_name: text('first_name'),
  last_name: text('last_name'),
  email: text('email'),
  // bookings - table that links a booking together. 
});
