import nextConnect from "next-connect";

import { getNextSequence } from "./../../modules/getNextSequence";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { ERR_SOMETHING, ERR_USER_EXISTS } from "../../modules/ErrorCode";
import { createPassword } from "../../modules/AuthUtils";
import { sendMailUserVerify } from "../../modules/Email";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { email, password, userName } = req.body;

  try {
    const User = req.mongoose.model("User");

    const user = await User.findOne({ email });

    if (user && user.verified) {
      return res.status(500).json(ERR_USER_EXISTS);
    }

    const { salt, hashedPassword } = createPassword(password);

    // if there is an un-verified user, update password
    if (user) {
      user.password = hashedPassword;
      user.salt = salt;
      if (userName.length > 0) {
        user.name = userName;
      }
      await user.save();
    } else {
      const sequence = await getNextSequence(req.mongoose, "USER_ID");
      const id = `user${sequence}`;

      await User.create({
        id,
        email,
        password: hashedPassword,
        name: userName.length > 0 ? userName : id,
        salt,
      });
    }

    await sendMailUserVerify(email, userName, req.mongoose);
    return res.status(200).json();
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
