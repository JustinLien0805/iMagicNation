import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";

export const config = {
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 60,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { storyId, input }: { storyId: string; input: string } = req.body;
  const { userId } = getAuth(req);
  console.log(userId);
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

    return res.status(200).json({ message: "成功", data: postMessage.data });
  } catch (e) {
    console.log(e);
  }
}
