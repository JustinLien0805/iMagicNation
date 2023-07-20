import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/db/index";
import { stories } from "@/db/schema";
import { eq, isNull, or, and } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  const { title }: { userId: string; title: string } = req.body;
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
        .where(or(isNull(stories.authorId), eq(stories.authorId, userId)))
        .orderBy(stories.type);

      return res.status(200).json(story);
    }

    // create a new story
    if (userId && title) {
      const createStory = await db.insert(stories).values({
        title,
        authorId: userId,
      });
      const getStory = await db
        .select()
        .from(stories)
        .where(and(eq(stories.title, title), eq(stories.authorId, userId)));
        
      if (!getStory) return res.status(200).json({ message: "新增失敗" });
      return res
        .status(200)
        .json({ message: "新增成功", storyId: getStory[0].id });
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
      console.log(storyId, userId);
      const story = await db.query.stories.findMany({
        where: (stories) => eq(stories.id, parseInt(storyId)),
        with: {
          messages: {
            where: (messages) => eq(messages.authorId, userId),
          },
        },
      });
      console.log(story);
      if (!story) return res.status(200).json({ message: "找不到故事" });
      return res.status(200).json(story);
    }
  }
}
