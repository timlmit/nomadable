import { APP_HOST, APP_PORT } from "./../constants";
import NetworkSpeed from "network-speed"; // ES6
import { APP_URL } from "../constants";
import { start } from "repl";

const testNetworkSpeed = new NetworkSpeed();

const getNetworkDownloadSpeed = async () => {
  try {
    const baseUrl =
      "https://upload.wikimedia.org/wikipedia/commons/f/ff/Pizigani_1367_Chart_10MB.jpg";
    const fileSizeInBytes = 10174706;
    const speed = await testNetworkSpeed.checkDownloadSpeed(
      baseUrl,
      fileSizeInBytes
    );

    const speedDown = Math.round(parseInt(speed.mbps));
    if (!speedDown) throw Error;

    return speedDown;
  } catch (err) {
    return 0;
  }
};

const getNetworkUploadSpeed = async () => {
  try {
    const options = {
      hostname: APP_HOST,
      port: APP_PORT,
      path: "/api/speed-checker-upload",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const fileSizeInBytes = 2000000;
    const speed = await testNetworkSpeed.checkUploadSpeed(
      options,
      fileSizeInBytes
    );

    const speedUp = Math.round(parseInt(speed.mbps));
    if (!speedUp) throw Error;

    return speedUp;
  } catch (err) {
    return 0;
  }
};

export const callGetSpeed = async (): Promise<{
  speedDown: number;
  speedUp: number;
}> => {
  try {
    const speedDown = await getNetworkDownloadSpeed();
    const speedUp = await getNetworkUploadSpeed();

    return { speedDown, speedUp };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};
