import nextConnect from "next-connect";

import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { ERR_SOMETHING } from "../../modules/ErrorCode";
import { env } from "process";
import axios from "axios";

const KPN_AUTH_URL =
  "https://api-prd.kpn.com/oauth/client_credential/accesstoken?grant_type=client_credentials";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  try {
    const response = await axios({
      method: "post",
      url: KPN_AUTH_URL,
      data: {
        client_id: process.env.KPN_CLIENT_ID,
        client_secret: process.env.KPN_CLIENT_SECRET,
      },
    });

    return res.status(200).json();
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
