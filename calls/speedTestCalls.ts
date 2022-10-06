declare const SomApi: any;

import { APP_HOST, APP_PORT } from "./../constants";
import NetworkSpeed from "network-speed"; // ES6
import { APP_URL } from "../constants";

const testNetworkSpeed = new NetworkSpeed();

const getNetworkDownloadSpeed = async () => {
  try {
    const baseUrl = "/speed-test-download/map10.jpg";
    // const fileSizeInBytes = 1093957;
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
      path: "/api/speed-test-upload",
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
    // const speedDown = await getNetworkDownloadSpeed();
    // const speedUp = await getNetworkUploadSpeed();

    getSpeedDownload();

    return { speedDown: 0, speedUp: 0 };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

const getSpeedDownload = () => {
  try {
    console.log(
      "🚀 ~ file: speedTestCalls.ts ~ line 76 ~ getSpeedDownload ~ SomApi",
      SomApi
    );
    SomApi.account = "SOM633e746791aae";
    console.log(
      "🚀 ~ file: speedTestCalls.ts ~ line 77 ~ getSpeedDownload ~ SomApi.account",
      SomApi.account
    );
    SomApi.domainName = "nomadable.net";
    console.log(
      "🚀 ~ file: speedTestCalls.ts ~ line 79 ~ getSpeedDownload ~ SomApi.domainName",
      SomApi.domainName
    );

    SomApi.config = {
      sustainTime: 4,
      testServerEnabled: false,
      userInfoEnabled: false,
      latencyTestEnabled: false,
      uploadTestEnabled: true,
      progress: {
        enabled: true,
        verbose: false,
      },
    };
    console.log(
      "🚀 ~ file: speedTestCalls.ts ~ line 82 ~ getSpeedDownload ~ SomApi.config",
      SomApi.config
    );

    console.log(
      "🚀 ~ file: speedTestCalls.ts ~ line 95 ~ getSpeedDownload ~ SomApi.startTest",
      SomApi.startTest
    );
    SomApi.startTest();

    SomApi.onProgress = (progress: any) => {
      console.log(
        "🚀 ~ file: speedTestCalls.ts ~ line 90 ~ SomApi.onProgress ~ progress",
        progress
      );
    };

    SomApi.onError = (error: any) => {
      console.log(
        "🚀 ~ file: speedTestCalls.ts ~ line 97 ~ SomApi.onError ~ error",
        error
      );
    };

    SomApi.onTestCompleted = (result: any) => {
      console.log(
        "🚀 ~ file: speedTestCalls.ts ~ line 90 ~ SomApi.onTestCompleted ~ result",
        result
      );
    };
  } catch (err) {
    console.log(
      "🚀 ~ file: speedTestCalls.ts ~ line 114 ~ getSpeedDownload ~ err",
      err
    );
  }
};
