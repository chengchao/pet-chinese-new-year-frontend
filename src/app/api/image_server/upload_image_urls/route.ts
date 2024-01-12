import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { petName, names } = await request.json();
  console.log(`Request: ${petName}, ${names}`);
  return NextResponse.json({ message: "Hello World!" });
}
