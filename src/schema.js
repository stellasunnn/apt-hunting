import { serial, text, pgTable, integer, json } from "drizzle-orm/pg-core";

export const aptAvailability = pgTable('apt_availability', {
  id: serial('id').primaryKey(),
  name: text('name'),
  apt_code:integer('apt_code'),
  availability: json('current_availability')
});


