import { clientFor } from "./utils/awsClient.js";
import { AssociateIamInstanceProfileCommand } from "@aws-sdk/client-ec2";
import dotenv from "dotenv";

dotenv.config();

const ec2Client = clientFor("ec2");

export async function attachRoleToEc2() {
  const instanceId = process.env.EC2_INSTANCE_ID;
  const roleName = process.env.IAM_ROLE_NAME;

  const params = {
    IamInstanceProfile: {
      Name: roleName // 一般に、インスタンスプロファイル = ロール名
    },
    InstanceId: instanceId
  };

  try {
    const command = new AssociateIamInstanceProfileCommand(params);
    const response = await ec2Client.send(command);
    console.log(`✅ EC2にIAMロールをアタッチしました:`, response.IamInstanceProfileAssociation);
  } catch (err) {
    if (err.name === "InvalidInstanceID") {
      console.error("❌ 指定された EC2 インスタンスが見つかりません。IDを確認してください。");
    } else {
      console.error(`❌ ロールのアタッチに失敗:`, err.name, err.message);
    }
    throw err;
  }
}

// 本番環境ではインスタンス起動時にロール指定する
