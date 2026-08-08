import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const visibilityEnum = pgEnum("visibility", ["public", "private"]);
export const statusEnum = pgEnum("status_enum", ["live", "ended"]);

export const question = pgTable("question", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 100 }),
  visibility: visibilityEnum("visibility").default("public").notNull(),
  expireAt: timestamp("expire_at").notNull(),
  status: statusEnum("status").default("live").notNull(),
  question: varchar("question", { length: 100 }).notNull(),
  dashboardCode: varchar("dashboard_code", { length: 18 }).notNull(),
  pollCode: varchar("poll_code", { length: 18 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const answers = pgTable("answers", {
  id: uuid("id").primaryKey().defaultRandom(),
  questionId: uuid("questionId")
    .notNull()
    .references(() => question.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 50 }).notNull(),
  isCorrect: boolean("is_correct").default(false),
  votes: integer().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const singleUser = pgTable(
  "single_user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    questionId: uuid("question_id")
      .notNull()
      .references(() => question.id, { onDelete: "cascade" }),
    answerId: uuid("answer_id")
      .notNull()
      .references(() => answers.id, { onDelete: "cascade" }),

    // Nullable because public polls don't require authentication
    userId: text("user_id").references(() => user.id, {
      onDelete: "cascade",
    }),
    
    // FingerprintJS visitorId
    fingerprint: text("fingerprint").notNull(),

    // Store a hash of the IP instead of the raw IP
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    {
      // One fingerprint can vote only once per question
      fingerprintUnique: uniqueIndex("votes_question_fingerprint_idx").on(
        table.questionId,
        table.fingerprint,
      ),
    },

    {
      // One authenticated user can vote only once per question
      userUnique: uniqueIndex("votes_question_user_idx").on(
        table.questionId,
        table.userId,
      ),
    },
  ],
);
