import { GAPI_CLIENT_ID } from "./../../constants";
import nextConnect from "next-connect";

import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { OAuth2Client } from "google-auth-library";
import { generateToken } from "../../modules/AuthUtils";
import { generateUserId } from "./signup-with-email";
import { addNewUserEvent } from "./verify-user";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

const oAuth2Client = new OAuth2Client(
  GAPI_CLIENT_ID,
  process.env.GAPI_CLIENT_SECRET,
  "postmessage"
);

async function getGoogleAccountInfo(
  code: string
): Promise<{ email: string; googleId: string; picture: string; name: string }> {
  try {
    const { tokens } = await oAuth2Client.getToken(code);

    if (!tokens.id_token) throw Error;

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GAPI_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.picture || !payload.name)
      throw Error;

    return {
      email: payload.email,
      googleId: payload.sub,
      picture: payload.picture,
      name: payload.name,
    };
  } catch (error) {
    throw Error;
  }
}

handler.post(async (req: any, res: any) => {
  const User = req.mongoose.model("User");

  const { code } = req.body;

  try {
    const { email, googleId, name, picture } = await getGoogleAccountInfo(code);
    const user = await User.findOne({ email });
    let userId;
    if (user) {
      // if user exists, login
      userId = user._id;
    } else {
      // if it is a new user
      const id = await generateUserId(name, User);

      const createdUser = await User.create({
        id,
        email,
        name,
        picture,
        googleId,
        activated: true,
      });

      userId = createdUser._id;

      await addNewUserEvent(userId, req.mongoose);
    }
    const token = generateToken(userId);
    return res.status(200).send({ token });
  } catch (err) {
    return res.status(500).send("Something went wrong.");
  }
});

export default handler;
