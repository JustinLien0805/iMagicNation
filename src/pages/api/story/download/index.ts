import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";
import { getAuth } from "@clerk/nextjs/server";
export const config = {
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 90,
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = getAuth(req);
  const storyId = req.query.storyId;

  try {
    const downloadUrl = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/video/test`,
      {
        storyId: storyId,
        userId: userId,
      }
    );

    return res.status(200).send(downloadUrl.data[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error });
  }
}
