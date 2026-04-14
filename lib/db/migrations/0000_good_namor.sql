CREATE TABLE "flowers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"cost" numeric(10, 2) NOT NULL
);
