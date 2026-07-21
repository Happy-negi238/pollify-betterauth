import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const visibilityEnum = pgEnum("visibility", ["public", "private"]);
export const statusEnum = pgEnum("status_enum", ["live", "ended"]);

export const question = pgTable("question", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 20 }).notNull(),
  description: varchar("description", { length: 30 }),
  visibility: visibilityEnum("visibility").default("public").notNull(),
  expireAt: timestamp("expire_at").notNull(),
  status: statusEnum("status").default("live").notNull(),
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
