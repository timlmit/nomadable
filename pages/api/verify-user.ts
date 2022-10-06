import { APP_URL } from "./../../constants";
import nextConnect from "next-connect";

import { ERR_VERIFICATION_EXPIRED } from "./../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { generateToken } from "../../modules/AuthUtils";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { verificationCode } = req.body;

  try {
    const User = req.mongoose.model("User");
    const OneTimeCode = req.mongoose.model("OneTimeCode");

    // get verification code object
    const code = await OneTimeCode.findOne({ value: verificationCode });

    if (!code || code.expireAt < new Date()) throw Error;

    // get user
    const user = await User.findOne({
      email: code.key,
    });
    if (!user) throw Error;

    // modify user
    user.verified = true;
    user.picture = `/icon/user-pink.png`;
    await user.save();

    const token = generateToken(user._id);

    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json(ERR_VERIFICATION_EXPIRED);
  }
});

export default handler;
