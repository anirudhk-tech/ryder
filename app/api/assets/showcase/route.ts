import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

export const dynamic = "force-dynamic";

const SHOWCASE_PREFIX = "assets/showcase/";

type ShowcaseImage = {
  id: string;
  url: string;
  uploadedAt: string;
};

// GET - List all showcase images
export async function GET() {
  try {
    const { blobs } = await list({ prefix: SHOWCASE_PREFIX });

    const images: ShowcaseImage[] = blobs
      .filter((blob) => /\.(jpg|jpeg|png|webp|gif)$/i.test(blob.pathname))
      .map((blob) => ({
        id: blob.url, // Use URL as unique ID
        url: blob.url,
        uploadedAt: blob.uploadedAt.toISOString(),
      }))
      .sort(
        (a, b) =>
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );

    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}

// POST - Upload new showcase image(s)
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadedImages: ShowcaseImage[] = [];

    for (const file of files) {
      if (!(file instanceof Blob)) continue;

      // Generate unique filename with timestamp
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 8);
      const extension =
        file.type.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
      const filename = `${SHOWCASE_PREFIX}${timestamp}-${randomId}.${extension}`;

      const { url } = await put(filename, file, {
        access: "public",
        contentType: file.type || "image/jpeg",
      });

      uploadedImages.push({
        id: url,
        url,
        uploadedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      ok: true,
      uploaded: uploadedImages,
      count: uploadedImages.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a showcase image
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL provided" },
        { status: 400 }
      );
    }

    await del(imageUrl);

    return NextResponse.json({ ok: true, deleted: imageUrl });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
