import {
  boolean,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const visibilityEnum = pgEnum("visibility", ["public", "private"]);
export const statusEnum = pgEnum("status_enum", ["live", "ended"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: varchar("full_name", { length: 40 }).notNull(),
  emailId: varchar("email_id", { length: 50 }).notNull().unique(),
  phone: varchar("phone_no", { length: 10 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const question = pgTable("question", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
