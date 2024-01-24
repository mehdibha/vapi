import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";

export const runtime = process.env.NODE_ENV === "development" ? "nodejs" : "edge";

const nanoid: (size?: number | undefined) => string = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

export async function POST(req: Request) {
  const file = req.body ?? "";
  const contentType = req.headers.get("content-type");
  if (contentType !== "image/jpeg") {
    return NextResponse.json(
      {
        code: "INVALID_CONTENT_TYPE",
        error: "Invalid content type. Expected image/jpeg.",
      },
      { status: 400 }
    );
  }
  // TODO: optimize image with sharp
  const filename = `${nanoid()}.${contentType.split("/")[1]}`;
  const blob = await put(filename, file, {
    contentType,
    access: "public",
  });

  return NextResponse.json(blob);
}
