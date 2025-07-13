import { GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
import { secretsClient } from "./awsClient.js";
import dotenv from "dotenv";

dotenv.config();

export async function getDbSecrets() {
  const secretName = process.env.SECRET_NAME;

  try {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const response = await secretsClient.send(command);
    if ("SecretString" in response) {
      return JSON.parse(response.SecretString);
    } else {
      throw new Error("Secret value is binary or empty");
    }
  } catch (err) {
    console.error("❌ Secrets Manager取得失敗:", err.name, err.message);
    throw err;
  }
}

