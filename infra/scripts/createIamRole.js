import { CreateRoleCommand } from "@aws-sdk/client-iam";
import { clientFor } from "./utils/awsClient.js";
import dotenv from "dotenv";

dotenv.config();

const iamClient = clientFor("iam");
const roleName = process.env.IAM_ROLE_NAME;

export async function createIamRole() {
  const assumeRolePolicy = {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: { Service: "ec2.amazonaws.com" },
      Action: "sts:AssumeRole"
    }]
  };

  try {
    const response = await iamClient.send(new CreateRoleCommand({
      RoleName: roleName,
      AssumeRolePolicyDocument: JSON.stringify(assumeRolePolicy),
      Description: "EC2 role to connect to Aurora with IAM",
    }));
    console.log(`✅ IAMロール作成成功: ${response.Role.Arn}`);
    return response.Role.Arn;
  } catch (err) {
    console.error(`❌ IAMロール作成失敗:`, err.name, err.message);
    throw err;
  }
}

//IAMロール・ポリシーの最小権限設計の厳密化
//　→ 必要なアクション・リソースを正確に絞り込む
//　→ 不必要な権限は一切与えない
//秘密情報・認証情報の安全管理
//　→ 環境変数の取り扱いは慎重に（Secrets Manager推奨）
//　→ .envは開発用に限定、本番はAWSの仕組みを利用
//監査ログの有効化
//　→ CloudTrailでIAMロールの変更やアクセスを記録・監視
//ロールの付与と運用の自動化
//　→ TerraformやCI/CDパイプラインで管理し人的ミスを減らす
//接続コードの堅牢性強化
//　→ リトライ・エラーハンドリングの充実
//　→ コネクションプールの適切な管理
//セキュリティグループ・ネットワーク設計の最適化
//　→ AuroraやEC2のアクセス制御の見直し
