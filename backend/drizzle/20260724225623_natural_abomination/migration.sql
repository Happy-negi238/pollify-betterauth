ALTER TABLE "question" ADD COLUMN "question" varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE "question" ALTER COLUMN "description" SET DATA TYPE varchar(50) USING "description"::varchar(50);