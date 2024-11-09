import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Get the form data from the request
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    // Generate unique filename
    const uniqueFilename = `${Date.now()}-${file.name}`;

    // Upload directly to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: "public",
    });

    return NextResponse.json({
      url: blob.url,
      success: true,
    });
  } catch (error) {
    console.error("Failed to upload file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
