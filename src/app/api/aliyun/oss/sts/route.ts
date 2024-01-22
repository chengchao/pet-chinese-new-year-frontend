import STSClient from "./get_sts";

// in seconds
// export const revalidate = 3600;

//
export async function GET() {
  const credentials = await STSClient.generateCredentials(
    process.env.ALIBABA_CLOUD_STS_TOKEN_DURATION_SECONDS,
    process.env.ALIBABA_CLOUD_STS_TOKEN_ROLE_ARN,
    process.env.ALIBABA_CLOUD_STS_TOKEN_ROLE_SESSION_NAME
  );

  return Response.json({
    accessKeyId: credentials.accessKeyId,
    accessKeySecret: credentials.accessKeySecret,
    securityToken: credentials.securityToken,
    expiration: credentials.expiration,
    bucket: process.env.ALIBABA_CLOUD_OSS_BUCKET,
    region: process.env.ALIBABA_CLOUD_OSS_REGION,
  });
}

// export async function HEAD(request: Request) {}

// export async function POST(request: NextRequest) {}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}

// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request: Request) {}
