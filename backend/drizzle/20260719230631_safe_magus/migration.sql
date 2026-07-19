CREATE TYPE "status_enum" AS ENUM('live', 'ended');--> statement-breakpoint
CREATE TYPE "visibility" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TABLE "answers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"questionId" uuid NOT NULL,
	"title" varchar(50) NOT NULL,
	"is_correct" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"title" varchar(20) NOT NULL,
	"description" varchar(30),
	"visibility" "visibility" DEFAULT 'public'::"visibility" NOT NULL,
	"expire_at" timestamp NOT NULL,
	"status" "status_enum" DEFAULT 'live'::"status_enum" NOT NULL,
	"dashboard_code" varchar(18) NOT NULL,
	"poll_code" varchar(18) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"full_name" varchar(40) NOT NULL,
	"email_id" varchar(50) NOT NULL UNIQUE,
	"phone_no" varchar(10),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_questionId_question_id_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "question" ADD CONSTRAINT "question_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;