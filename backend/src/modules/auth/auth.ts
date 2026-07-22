import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../index";
import * as schema from "../../common/db/index";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),

  trustedOrigins: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
  baseURL: "http://localhost:3000/",
  emailAndPassword: { enabled: true },
});
