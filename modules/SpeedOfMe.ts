declare const SomApi: any;

SomApi.account = "SOM633e746791aae";
SomApi.domainName = "nomadable.net";

SomApi.config = {
  sustainTime: 4,
  testServerEnabled: false,
  userInfoEnabled: false,
  latencyTestEnabled: false,
  uploadTestEnabled: true,
  progress: {
    enabled: true,
    verbose: true,
  },
};

export const doNetSpeedTest = (props: {
  onProgressDownload: (mbps: number) => void;
  onProgressUpload: (mbps: number) => void;
  onError: () => void;
  onCompleted: (download: number, upload: number) => void;
}) => {
  SomApi.startTest();

  SomApi.onProgress = (progress: any) => {
    if (progress.type === "download") {
      props.onProgressDownload(progress.currentSpeed);
    } else {
      props.onProgressUpload(progress.currentSpeed);
    }
  };

  SomApi.onError = (error: any) => {
    props.onError();
  };

  SomApi.onTestCompleted = (result: any) => {
    props.onCompleted(result.download, result.upload);
  };
};
