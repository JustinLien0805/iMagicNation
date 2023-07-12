import { mysqlTable, serial, varchar, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 191 }).notNull(),
  email: varchar("email", { length: 191 }).notNull(),
  password: varchar("password", { length: 191 }).notNull(),
  nickname: varchar("nickname", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});
