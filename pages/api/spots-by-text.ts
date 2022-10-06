import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import axios from "axios";
import { config } from "aws-sdk";
import { text } from "stream/consumers";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

const getPlaceCandidates = async (input: string) => {
  try {
    const URL =
      "https://maps.googleapis.com/maps/api/place/queryautocomplete/json";
    const KEY = `key=${process.env.GAPI_KEY}`;
    const INPUT = `input=${encodeURIComponent(input.trim())}`;
    // const INPUT_TYPE = "inputtype=textquery";
    const LANG = "language=en";
    // const ITEMS = "fields=place_id,name,structured_formatting";

    const response = await axios({
      method: "get",
      url: `${URL}?${KEY}&${INPUT}&${LANG}`,
    });

    return response.data;
  } catch (error) {
    throw Error;
  }
};

handler.get(async (req: any, res: any) => {
  const { text } = req.query;

  try {
    const { predictions } = await getPlaceCandidates(text);
    const spotPredictions = predictions.map((p: any) => ({
      placeId: p.place_id,
      mainText: p.structured_formatting.main_text,
      secondaryText: p.structured_formatting.secondary_text,
    }));

    return res.status(200).json({ spotPredictions });
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
