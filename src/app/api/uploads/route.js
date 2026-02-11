// app/api/uploads/route.js
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "posts");

function getFileFromFormData(formData) {
  const file = formData.get("file") ?? formData.get("image") ?? formData.get("imageUrl");
  if (file && typeof file.arrayBuffer === "function") return file;
  for (const [, value] of formData.entries()) {
    if (value && typeof value.arrayBuffer === "function") return value;
  }
  return null;
}

export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const image = getFileFromFormData(formData);

    if (!image) {
      return NextResponse.json(
        { success: false, message: "No file in request. Send a file in form field 'file', 'image', or 'imageUrl'." },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const rawName = image.name || "upload";
    const safeName = path.basename(rawName).replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = safeName || `upload-${Date.now()}`;
    const dir = UPLOAD_DIR;
    const filePath = path.join(dir, fileName);

    await mkdir(dir, { recursive: true });
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/posts/${fileName}`;

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        data: publicUrl,
        url: publicUrl,
        filename: fileName,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "File upload failed" },
      { status: 500 }
    );
  }
};
