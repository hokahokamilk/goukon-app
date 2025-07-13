import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import dotenv from "dotenv";

dotenv.config();

export const secretsClient = new SecretsManagerClient({ region: process.env.AWS_REGION });
