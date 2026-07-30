CREATE TABLE "single_user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"question_id" uuid NOT NULL,
	"answer_id" uuid NOT NULL,
	"user_id" text,
	"fingerprint" text NOT NULL,
	"ip_hash" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "single_user" ADD CONSTRAINT "single_user_question_id_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "single_user" ADD CONSTRAINT "single_user_answer_id_answers_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "single_user" ADD CONSTRAINT "single_user_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;