import {
  mysqlTable,
  serial,
  text,
  timestamp,
  varbinary,
  varchar,
  int,
  primaryKey,
} from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

export const content = mysqlTable("content", {
  id: serial("id").primaryKey().notNull(),
  title: text("title"),
  word: text("word"),
  phrase: text("phrase"),
  type: text("type"),
});

export const ethic = mysqlTable(
  "ethic",
  {
    storyId: int("storyId").notNull(),
    type: varchar("type", {
      length: 191,
    }).notNull(),
    partId: int("partId").notNull(),
    partDetail: text("part_detail"),
    ans1: text("ans_1"),
    ans2: text("ans_2"),
    ans3: text("ans_3"),
    ans4: text("ans_4"),
    nextPartId1: int("next_part_id_1"),
    nextPartId2: int("next_part_id_2"),
    nextPartId3: int("next_part_id_3"),
    nextPartId4: int("next_part_id_4"),
    imageSrc: text("imageSrc"),
  },
  (table) => {
    return {
      pk: primaryKey(table.storyId, table.type, table.partId),
    };
  }
);

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
  questions: text("questions"),
  suggestions: text("suggestions"),
});

export const stories = mysqlTable("stories", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 191 }).notNull(),
  type: varchar("type", { length: 191 }).default("我的故事"),
  authorId: varchar("authorId", { length: 191 }),
  initDialog: varchar("initDialog", { length: 191 }),
  initImage: text("initImage"),
});

export const storiesRelations = relations(stories, ({ many }) => ({
  messages: many(messages),
}));

export const messageRelations = relations(messages, ({ one }) => ({
  story: one(stories, {
    fields: [messages.storyId],
    references: [stories.id],
  }),
}));
