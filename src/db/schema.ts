import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// export const users = mysqlTable("users", {
//   id: serial("id").primaryKey().autoincrement(),
//   email: varchar("email", { length: 191 }).notNull(),
//   password: varchar("password", { length: 191 }).notNull(),
//   nickname: varchar("nickname", { length: 191 }).notNull(),
//   createdAt: timestamp("createdAt").defaultNow(),
// });

// export const userRelations = relations(users, ({ many }) => ({
//   stories: many(stories),
// }));

export const stories = mysqlTable("stories", {
  id: serial("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 191 }).notNull(),
  type: varchar("type", { length: 191 }).default("我的故事"),
  authorId: varchar("authorId", { length: 191 }),
  initDialog: varchar("initDialog", { length: 191 }),
  initImageSrc: text("initImage"),
});

export const storiesRelations = relations(stories, ({ many }) => ({
  messages: many(messages),
}));

export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey().autoincrement(),
  input: text("input"),
  reply: text("reply"),
  imageSrc: text("imageSrc"),
  createdAt: timestamp("createdAt").defaultNow(),
  storyId: varchar("storyId", { length: 191 }),
  authorId: varchar("authorId", { length: 191 }),
});

export const messageRelations = relations(messages, ({ one }) => ({
  story: one(stories, {
    fields: [messages.storyId],
    references: [stories.id],
  }),
}));
