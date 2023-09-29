import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/db/index";
import { ethic } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  const nextPartId = req.query.nextPartId as string;
  const storyId = req.query.storyId as string;
  const { method } = req;

  if (!userId) {
    return res.status(401).json({ message: "請先登入" });
  }
  if (method === "GET") {
    if (storyId && !nextPartId) {
      const firstPart = await db
        .select()
        .from(ethic)
        .where(eq(ethic.storyId, parseInt(storyId)))
        .orderBy(asc(ethic.partId));

      console.log(firstPart[0]);
      return res.status(200).json(firstPart[0]);
    }
    if (storyId && nextPartId) {
      const part = await db
        .select()
        .from(ethic)
        .where(eq(ethic.partId, parseInt(nextPartId)));
      console.log(part);
      return res.status(200).json(part[0]);
    }
  }
}
