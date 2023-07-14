import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db/index";
import { users, stories } from "@/db/schema";
import { and, eq, isNull, or } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, title }: { userId: string; title: string } = req.body;
  const { method } = req;
  if (method === "POST") {
    console.log(userId);
    if (userId && !title) {
      const story = await db
        .select()
        .from(stories)
        .where(or(isNull(stories.authorId), eq(stories.authorId, userId)))
        .orderBy(stories.type);
      console.log(story);
      return res.status(200).json(story);
    }
    if (userId && title) {
      const story = await db.insert(stories).values({
        title,
        authorId: userId,
      });
      console.log(story);
      return res.status(200).json({ message: "新增成功" });
    }
  }
}
