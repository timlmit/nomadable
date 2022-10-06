import nextConnect from "next-connect";

import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { ERR_SOMETHING } from "../../modules/ErrorCode";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const body = req.body;
  console.log(
    "🚀 ~ file: speed-checker-upload.ts ~ line 17 ~ handler.post ~ body",
    body
  );

  try {
    return res.status(200).json();
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
