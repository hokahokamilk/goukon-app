import mysql from "mysql2/promise";
import { getDbSecrets } from "./getDbSecrets.js";
import { generateAuthToken } from "./authTokenGenerator.js";
import dotenv from "dotenv";

dotenv.config();

export async function connectToAurora() {
  const secrets = await getDbSecrets();
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER } = secrets;

  const token = await generateAuthToken({
    host: DB_HOST,
    port: DB_PORT,
    region: process.env.AWS_REGION,
    username: DB_USER,
  });

  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: token,
      database: DB_NAME,
      ssl: "Amazon RDS", // オプション: certを明示してもよい
    });

    console.log("✅ Auroraへの接続成功");
    return connection;
  } catch (err) {
    console.error("❌ Aurora接続失敗:", err.name, err.message);
    throw err;
  }
}




