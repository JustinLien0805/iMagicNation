import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/index";
import { stories } from "@/db/schema";
import { like } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const category = req.query.category as string;

  if (method === "GET") {
    const getCategoriedStories = await db
      .select()
      .from(stories)
      .where(like(stories.type, `%${category}%`));

    res.status(200).json(getCategoriedStories);
  }
}
