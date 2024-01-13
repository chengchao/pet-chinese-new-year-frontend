import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { prefix } = await request.json();
  console.log(`Image prefix: ${prefix}`);
  return NextResponse.json({ message: "Hello World!" });
}
