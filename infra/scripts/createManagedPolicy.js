import { CreatePolicyCommand } from "@aws-sdk/client-iam";
import { iamClient } from "./utils/awsClient.js";
import dotenv from "dotenv";

dotenv.config();

const policyName = `${process.env.RDS_POLICY_NAME}-v2`; // 名前を一意にする
const dbUserArn = process.env.DB_USER_ARN;
const secretArn = process.env.SECRET_ARN;

export async function createManagedPolicy() {
  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: "rds-db:connect",
        Resource: dbUserArn,
      },
      {
        Effect: "Allow",
        Action: "secretsmanager:GetSecretValue",
        Resource: secretArn,
      }
    ]
  };

  try {
    const command = new CreatePolicyCommand({
      PolicyName: policyName,
      PolicyDocument: JSON.stringify(policyDocument),
      Description: "Allows EC2 to connect to RDS and fetch DB secrets",
    });

    const response = await iamClient.send(command);
    console.log(`✅ ポリシー作成成功: ${response.Policy.Arn}`);
    return response.Policy.Arn;
  } catch (err) {
    if (err.name === "EntityAlreadyExists") {
      console.warn(`⚠️ ポリシー「${policyName}」は既に存在します。`);
    } else {
      console.error(`❌ ポリシー作成失敗:`, err.name, err.message);
    }
    throw err;
  }
}


