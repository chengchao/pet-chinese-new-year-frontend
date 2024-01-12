declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      ALIBABA_CLOUD_ACCESS_KEY_ID: string;
      ALIBABA_CLOUD_ACCESS_KEY_SECRET: string;
      ALIBABA_CLOUD_STS_TOKEN_ENDPOINT: string;
      ALIBABA_CLOUD_STS_TOKEN_DURATION_SECONDS: int;
      ALIBABA_CLOUD_STS_TOKEN_ROLE_ARN: string;
      ALIBABA_CLOUD_STS_TOKEN_ROLE_SESSION_NAME: string;
      ALIBABA_CLOUD_OSS_REGION: string;
      ALIBABA_CLOUD_OSS_BUCKET: string;
      // add more environment variables and their types here
    }
  }
}

export {};
