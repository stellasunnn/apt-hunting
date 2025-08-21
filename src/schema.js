import { serial, text, pgSchema, integer, json } from "drizzle-orm/pg-core";

export const aptSchema = pgSchema("apt_schema");

export const aptAvailability = mySchema.table('apt_availability', {
  id: serial('id').primaryKey(),
  name: text('name'),
  apt_code:integer('apt_code'),
  availability: json('current_availability')
});


