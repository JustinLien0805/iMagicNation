import { NextApiRequest, NextApiResponse } from "next";

import { db } from "@/db/index";
import { users, stories } from "@/db/schema";
import { and, eq, isNull, or } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId }: { userId: string } = req.body;
  console.log(userId);
  const story = await db
    .select()
    .from(stories)
    .where(or(isNull(stories.authorId), eq(stories.authorId, userId)))
    .orderBy(stories.type);
  console.log(story);
  return res.status(200).json(story);
}
