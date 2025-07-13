import { AttachRolePolicyCommand } from "@aws-sdk/client-iam";
import { iamClient } from "./utils/awsClient.js";
import dotenv from "dotenv";

dotenv.config();

export async function attachPolicyToRole(roleName, policyArn) {
  try {
    await iamClient.send(new AttachRolePolicyCommand({
      RoleName: roleName,
      PolicyArn: policyArn,
    }));
    console.log(`✅ ポリシーアタッチ成功: ${policyArn} → ${roleName}`);
  } catch (err) {
    console.error(`❌ ポリシーアタッチ失敗:`, err.name, err.message);
    throw err;
  }
}


