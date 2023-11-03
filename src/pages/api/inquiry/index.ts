import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const words =
    typeof req.query.word === "string" ? req.query.word.split(" ") : [];

  try {
    if (words.length === 1) {
      // Send a single request if only one word is requested
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/story/inquiry`,
        {
          headers: {
            apikey: process.env.NEXT_PUBLIC_DICTIONARY_API_KEY,
          },
          inquiry: words[0],
        }
      );
      return res.status(200).json({ message: "成功", data: response.data });
    }
    const responses = await Promise.all(
      words.map(async (word) => {
        // Send each word in a separate request if necessary
        return axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/story/inquiry`,
          {
            headers: {
              apikey: process.env.NEXT_PUBLIC_DICTIONARY_API_KEY,
            },
            inquiry: word,
          }
        );
      })
    );

    // Combine the responses into one object
    const definitions = responses.map((response) => response.data);

    return res.status(200).json({ message: "成功", data: definitions });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error });
  }
}
