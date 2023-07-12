//create an api to authenticate user
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { and, eq, exists } from "drizzle-orm";

type User = {
  email: string;
  password: string;
  nickname?: string;
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { email, password, nickname }: User = req.body;

  if (method === "POST") {
    console.log(email, password);
    const emailExists = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    console.log(emailExists);

    if (emailExists.length === 0) {
      return res.status(200).json({ message: "使用者不存在" });
    }

    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.password, password)));
    console.log(user);

    if (user.length === 0) {
      return res.status(200).json({ message: "密碼錯誤" });
    }

    return res.status(200).json({ message: "登入成功", user: user[0] });
  }
};

export default handler;
