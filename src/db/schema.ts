import { mysqlTable, serial, varchar, timestamp } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 191 }).notNull(),
  password: varchar("password", { length: 191 }).notNull(),
  nickname: varchar("nickname", { length: 191 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  stories: many(stories),
}));

export const stories = mysqlTable("stories", {
  id: serial("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 191 }).notNull(),
  type: varchar("type", { length: 191 }).default("default"),
  authorId: varchar("authorId", { length: 191 }),
});

export const storiesRelations = relations(stories, ({ one }) => ({
  author: one(users, {
    fields: [stories.authorId],
    references: [users.id],
  }),
}));
