import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";
import OpenAI from "openai";

const configuration = {
  organization: "org-O0J27zQrydIuKDx8csuyhqgH",
  apiKey: process.env.OPENAI_API_KEY || "",
};
const openai = new OpenAI(configuration);

export const config = {
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 90,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const text = req.query.text as string;

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "請先登入" });
  }

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: text,
      speed: 1.25,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Set the appropriate headers for the audio file
    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Length": buffer.length,
    });

    // Send the buffer to the frontend
    res.end(buffer);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "錯誤" });
  }
}
