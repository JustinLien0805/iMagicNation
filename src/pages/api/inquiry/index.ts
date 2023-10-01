import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const word = req.query.word;

  try {
    const definition = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/story/inquiry`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_DICTIONARY_API_KEY,
        },
        inquiry: word,
      }
    );

    return res.status(200).json({ message: "成功", data: definition.data });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error });
  }
}
