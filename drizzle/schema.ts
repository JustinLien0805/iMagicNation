import {
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const content = mysqlTable("content", {
  id: serial("id").primaryKey().notNull(),
  grade: text("grade"),
  version: text("version"),
  lesson: text("lesson"),
  title: text("title"),
  word: text("word"),
  phrase: text("phrase"),
  type: text("type"),
});

export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey().notNull(),
  input: text("input"),
  reply: text("reply"),
  imageSrc: text("imageSrc"),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
  storyId: varchar("storyId", { length: 191 }),
  authorId: varchar("authorId", { length: 191 }),
  word: text("word"),
  phrase: text("phrase"),
});

export const stories = mysqlTable("stories", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  type: varchar("type", { length: 191 }).default("我的故事"),
  authorId: varchar("authorId", { length: 191 }),
  initDialog: varchar("initDialog", { length: 191 }),
  initImage: text("initImage"),
});
