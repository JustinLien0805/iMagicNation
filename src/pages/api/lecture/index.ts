import { NextApiResponse, NextApiRequest } from "next";

import { db } from "@/db/index";
import { content } from "@/db/schema";
import { or } from "drizzle-orm";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const contentData = await db
    .selectDistinct({ type: content.type })
    .from(content);
  function organizeData(data: any[]) {
    const organized: any = {};

    data.forEach((item) => {
      const [grade, publisher, lesson] = item.type
        .match(
          /(一上|一下|二上|二下|三上|三下|四上|四下|五上|五下|六上|六下)(康軒|翰林|南一)(第[一二三四五六七八九十]+課)/
        )
        .slice(1);

      if (!organized[publisher]) organized[publisher] = {};
      if (!organized[publisher][grade]) organized[publisher][grade] = [];

      if (!organized[publisher][grade].includes(lesson)) {
        organized[publisher][grade].push(lesson);
      }
    });

    return organized;
  }

  const organizedData = organizeData(contentData);

  res.status(200).json(organizedData);
}
