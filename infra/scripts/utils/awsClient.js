import { IAMClient } from "@aws-sdk/client-iam";
import { EC2Client } from "@aws-sdk/client-ec2";
import { RDSClient } from "@aws-sdk/client-rds";
import { S3Client } from "@aws-sdk/client-s3"
import dotenv from "dotenv";
import { fromIni } from "@aws-sdk/credential-provider-ini";

dotenv.config();

const REGION = process.env.AWS_REGION;
const AWS_PROFILE = process.env.AWS_PROFILE || "default";

const credentials = fromIni({ profile: AWS_PROFILE});

export function clientFor(service) {
    switch (service) {
        case 'iam':
            return new IAMClient({ region: REGION, credentials });
        case 'ec2':
            return new EC2Client({ region: REGION, credentials });
        case 'rds':
            return new RDSClient({ region: REGION, credentials });
        case 's3':
            return new S3Client({ region: REGION, credentials });
        default:
            throw new Error(`❌ 未対応のサービス: ${service}`);
    }
}
