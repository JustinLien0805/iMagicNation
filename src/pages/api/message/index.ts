import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/index";
import { messages } from "@/db/schema";
import { getAuth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import axios from "axios";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { storyId, input }: { storyId: string; input: string } = req.body;
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "請先登入" });
  }
  const API_URl =
    process.env.NEXT_PUBLIC_API_BASE_URL + "/story/callchatgpt" || "";

  try {
    const postMessage = await axios.post(
      API_URl,
      {
        storyId,
        input,
        userId,
      },
      {
        headers: {
          Bearer: process.env.OPENAI_API_KEY,
        },
      }
    );
    console.log("postMessage", postMessage.data);
    return res.status(200).json({ message: "成功" });
  } catch (e) {
    console.log(e);
  }

  // const chats = await db
  //   .select({ input: messages.input, reply: messages.reply })
  //   .from(messages)
  //   .where(and(eq(messages.storyId, storyId), eq(messages.authorId, userId)));

  // console.log(chats);

  // TODO connect to ChatGPT to generate replay: fetch all previous messages, concat them, and send to ChatGPT
  // TODO if count = 9, create ending message
  // TODO connect to StableDiffusion to generate image

  // const createMessage = await db.insert(messages).values({
  //   storyId,
  //   authorId: userId,
  //   input,
  //   reply: "reply",
  //   imageSrc: "imageSrc",
  // });
  // console.log(createMessage);
}
