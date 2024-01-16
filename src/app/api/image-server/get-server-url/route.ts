import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
  // const { prefix } = await request.json();
  // console.log(`Image prefix: ${prefix}`);

  // const response = await axios.post(process.env.IMAGE_SERVER_URL, {
  //   prefix: prefix,
  // });

  // console.log(`Upload image prefix response status code: ${response.status}`);

  return NextResponse.json({
    imageServerUrl: process.env.IMAGE_SERVER_URL,
    trainingProgressPath: process.env.IMAGE_SERVER_TRAINING_PROGRESS_PATH,
  });
}
