import { connectToAurora } from "./utils/connectAurora.js";

async function createUserTable() {
  const connection = await connectToAurora();

  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id CHAR(36) PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      gender ENUM('male', 'female') NOT NULL,
      profile_image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await connection.execute(createTableSQL);
    console.log("✅ テーブル 'users' を作成しました");
  } catch (err) {
    console.error("❌ テーブル作成失敗:", err.name, err.message);
  } finally {
    await connection.end();
  }
}

createUserTable().catch(console.error);
