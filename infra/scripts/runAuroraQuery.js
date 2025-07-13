import { connectToAurora } from "./utils/connectAurora.js";

async function main() {
  try {
    const connection = await connectToAurora();

    const [rows] = await connection.execute("SELECT NOW()");
    console.log("⏰ 現在時刻:", rows);

    await connection.end();
  } catch (err) {
    console.error("❌ クエリ実行失敗:", err.name, err.message);
  }
}

main();
