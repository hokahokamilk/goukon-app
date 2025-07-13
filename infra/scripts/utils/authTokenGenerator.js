import { RDSIAMAuthProvider } from "@aws-sdk/rds-signer";
import dotenv from "dotenv";

dotenv.config();

export async function generateAuthToken({ host, port, region, username }) {
  const signer = new RDSIAMAuthProvider({
    region,
    hostname: host,
    port: Number(port),
    username,
  });

  return signer.getAuthToken();
}
