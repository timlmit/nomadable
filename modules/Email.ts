import sgMail from "@sendgrid/mail";

import { APP_URL } from "./../constants";
import { makeOneTimeCode } from "./OneTimeCodeHandler";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMailUserVerify = async (
  email: string,
  userName: string,
  mongoose: any
) => {
  try {
    const verificationCode = await makeOneTimeCode(email, 10, mongoose);

    const msg = {
      to: email,
      from: "TripNote <noreply@tripnote.xyz>",
      subject: "【TripNote】 アカウントの認証をお願いします",
      text: `${
        userName.length > 0 && `${userName}様\n\n`
      }TripNoteのログイン用認証リンクを発行いたしました。下記のURLをクリックしてTripNoteにログイン下さい。 \n\n ${APP_URL}/verify-account/${verificationCode} \n\nThanks,\nTripNote Team `,
    };
    await sgMail.send(msg);
  } catch (err) {
    console.log(err);
  }
};
