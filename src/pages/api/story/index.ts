import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/db/index";
import { stories, content, messages } from "@/db/schema";
import { eq, isNull, or, and, like } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  const { title, type }: { title: string; type: string } = req.body;
  const { method } = req;

  if (!userId) {
    return res.status(401).json({ message: "請先登入" });
  }
  if (method === "POST") {
    // get the user's stories
    if (userId && !title) {
      const story = await db
        .select()
        .from(stories)
        // TODO: only get the story that user created
        .where(
          or(
            eq(stories.authorId, userId),
            like(stories.type, `%小說%`),
            like(stories.type, `%一上%`)
          )
        )
        .orderBy(stories.type);

      return res.status(200).json(story);
    }

    // create a new story
    // TODO pass the userId and selected type to the AI backend

    if (userId && type) {
      const createStory = await db.insert(stories).values({
        title,
        type,
        authorId: userId,
      });

      const getStory = await db
        .select()
        .from(stories)
        .where(and(eq(stories.title, title), eq(stories.authorId, userId)));

      if (!getStory) return res.status(200).json({ message: "新增失敗" });
      return res
        .status(200)
        .json({ message: "新增成功", storyId: getStory[0].id, type });
    }
  }

  if (method === "GET") {
    // load story with messages
    const storyId = Array.isArray(req.query.storyId)
      ? req.query.storyId[0]
      : req.query.storyId;
    if (!storyId) {
      res.status(400).send("Bad Request: storyId is required");
      return;
    }

    if (storyId && userId) {
      const story = await db.query.stories.findMany({
        columns: {
          id: true,
          title: true,
          type: true,
          authorId: false,
          initDialog: true,
          initImage: true,
        },
        where: (stories) => eq(stories.id, parseInt(storyId)),
        with: {
          messages: {
            columns: {
              id: true,
              input: true,
              reply: true,
              imageSrc: true,
              createdAt: true,
              storyId: true,
              authorId: false,
              word: true,
              phrase: true,
              blobType: true,
            },
            where: (messages) => eq(messages.authorId, userId),
          },
        },
      });

      const wordsAndPhrases = await db
        .select({
          words: content.word,
          phrases: content.phrase,
        })
        .from(content)
        .where(eq(content.title, story[0].title));

      const completeStory = {
        ...story[0],
        words: wordsAndPhrases.map((item) => item.words),
        phrases: wordsAndPhrases.map((item) => item.phrases),
      };

      if (!story) return res.status(200).json({ message: "找不到故事" });
      return res.status(200).json(completeStory);
    }
  }
  if (method === "DELETE") {
    const storyId = req.query.storyId as string;

    const deleteMessages = await db
      .delete(messages)
      .where(and(eq(messages.storyId, storyId), eq(messages.authorId, userId)));

    return res.status(200).json({ message: "刪除成功" });
  }
}
