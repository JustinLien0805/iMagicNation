import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/index";
import { messages } from "@/db/schema";
import { getAuth } from "@clerk/nextjs/server";
import { s } from "drizzle-orm/column.d-aa4e525d";

// TODO if count = 9, create ending message
// TODO connect to ChatGPT to generate replay: fetch all previous messages, concat them, and send to ChatGPT
// TODO connect to StableDiffusion to generate image
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { storyId, input, count } = req.body;
  const { userId } = getAuth(req);

  console.log(storyId, input, count, userId);

  if (!userId) {
    return res.status(401).json({ message: "請先登入" });
  }

  const createMessage = await db.insert(messages).values({
    storyId,
    authorId: userId,
    input,
    reply: "reply",
    imageSrc: "imageSrc",
  });
  console.log(createMessage);

  return res.status(200).json({ message: "成功" });
}
