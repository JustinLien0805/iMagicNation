// import { connect } from "@planetscale/database";
// import { drizzle } from "drizzle-orm/planetscale-serverless";



// const connection = connect({
//   url: process.env.PLANETSCALE_DATABASE_URL || "",
// });

// export const db = drizzle(connection, { schema });
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection(
  process.env.RAILWAY_DATABASE_URL || ""
);

export const db = drizzle(connection, { schema });
