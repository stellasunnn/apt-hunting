CREATE TABLE "apt_availability" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"apt_code" integer,
	"current_availability" json
);
