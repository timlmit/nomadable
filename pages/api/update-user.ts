import { saveSingleImage } from "./../../modules/ImageStorage";
import { EditableUser } from "./../../redux/slices/userSlice";
import nextConnect from "next-connect";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { ERR_SOMETHING } from "../../modules/ErrorCode";
import { generateUserId } from "./signup-with-email";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const editableUser: EditableUser = req.body.editableUser;
  const base64 = req.body.base64;

  const { picture, name, id, title, description, link } = editableUser;

  let imageUrl = "";

  if (base64.length > 0) {
    imageUrl = await saveSingleImage(`${userId}.jpg`, base64, 320);
  }

  try {
    const User = req.mongoose.model("User");

    const newId = await generateUserId(id, User, userId);

    const user: any = await User.findOneAndUpdate(
      { _id: userId },
      {
        picture: imageUrl || picture,
        name,
        id: newId,
        title,
        description,
        link,
      },
      { new: true }
    );

    const updatedEditableUser = {
      picture: user.picture,
      name: user.name,
      id: user.id,
      title: user.title,
      description: user.description,
      link: user.link,
    };

    return res.status(200).json({ editableUser: updatedEditableUser });
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
