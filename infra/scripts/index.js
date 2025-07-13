import { createManagedPolicy } from "./createManagedPolicy.js";
import { attachPolicyToRole } from "./attachPolicyToRole.js";
import dotenv from "dotenv";

dotenv.config();

const roleName = process.env.IAM_ROLE_NAME;

async function main() {
  const policyArn = await createManagedPolicy();
  if (policyArn) {
    await attachPolicyToRole(roleName, policyArn);
  }
}

main().catch(console.error);

