// app/api/upload/route.ts
// import { existsSync } from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (request) => {
  try {
    const file = await request.formData();

    const image = file.get("file");

    const byteLength = await image.arrayBuffer();

    const bufferData = await Buffer.from(byteLength);

    const pathOfImage = `./public/uploads/crochets/${image.name}`;

    writeFile(pathOfImage, bufferData);

    return NextResponse.json(
      {
        message: "image upload successfully",
        data: pathOfImage,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "File upload failed" },
      { status: 500 }
    );
  }
};
