import { serial, text, pgTable, integer, json, timestamp } from "drizzle-orm/pg-core";

export const aptAvailability = pgTable('apt_availability', {
  id: serial('id').primaryKey(),
  name: text('name'),
  apt_code:integer('apt_code'),
  current_availability: json('current_availability'),
  timestamp: timestamp().defaultNow(),
});

