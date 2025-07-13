import { createConnection } from "./utils/connectAurora.js";

(async () => {
  try {
    const conn = await createConnection();
    console.log("✅ Auroraへの接続に成功しました。");
    await conn.end();
  } catch (err) {
    console.error("❌ Aurora接続テストでエラー:", err);
  }
})();
