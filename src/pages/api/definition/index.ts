import { NextApiResponse, NextApiRequest } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("run");
  try {
    const definition = await axios.get(
      "https://pedia.cloud.edu.tw/api/v2/detail?term=%E6%A8%82%E4%B8%8D%E6%80%9D%E8%9C%80&api_key="
    );
    console.log(definition);

    return res.status(200).json({ message: "成功", data: "postMessage.data" });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error });
  }
}
