import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

export const dynamic = "force-dynamic";

const CONFIG_PREFIX = "config/app-config";
const BACKGROUND_PREFIX = "assets/background";

type BackgroundType = "color" | "image" | "video";

type BackgroundConfig = {
  type: BackgroundType;
  value: string;
};

async function getConfig() {
  try {
    const { blobs } = await list({ prefix: CONFIG_PREFIX });

    if (blobs.length === 0) {
      return {
        audioVersion: 0,
        logoPictureVersion: 0,
        reviewsVersion: 0,
        reviews: [],
        backgroundVersion: 0,
        background: { type: "color" as BackgroundType, value: "#000000" },
      };
    }

    const sortedBlobs = blobs.sort(
      (a, b) =>
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    const latestConfig = sortedBlobs[0];

    const res = await fetch(latestConfig.url, { cache: "no-store" });

    if (!res.ok) {
      return {
        audioVersion: 0,
        logoPictureVersion: 0,
        reviewsVersion: 0,
        reviews: [],
        backgroundVersion: 0,
        background: { type: "color" as BackgroundType, value: "#000000" },
      };
    }

    return await res.json();
  } catch {
    return {
      audioVersion: 0,
      logoPictureVersion: 0,
      reviewsVersion: 0,
      reviews: [],
      backgroundVersion: 0,
      background: { type: "color" as BackgroundType, value: "#000000" },
    };
  }
}

async function saveConfig(config: Record<string, unknown>) {
  const { url } = await put(
    CONFIG_PREFIX + ".json",
    JSON.stringify(config, null, 2),
    {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: true,
    }
  );

  try {
    const { blobs } = await list({ prefix: CONFIG_PREFIX });
    const oldBlobs = blobs.filter((b) => b.url !== url);
    for (const blob of oldBlobs) {
      await del(blob.url);
    }
  } catch {
    // Cleanup failed, non-fatal
  }

  return url;
}

// POST - Update background (color, image, or video)
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // Handle JSON body for color backgrounds
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const { type, value } = body as { type: BackgroundType; value: string };

      if (type !== "color" || !value) {
        return NextResponse.json(
          { error: "Invalid color background data" },
          { status: 400 }
        );
      }

      const config = await getConfig();
      const newVersion = (config.backgroundVersion || 0) + 1;
      const newBackground: BackgroundConfig = { type: "color", value };
      const newConfig = {
        ...config,
        backgroundVersion: newVersion,
        background: newBackground,
      };
      await saveConfig(newConfig);

      return NextResponse.json({
        ok: true,
        version: newVersion,
        background: newBackground,
      });
    }

    // Handle FormData for image/video uploads
    const formData = await req.formData();
    const file = formData.get("file");
    const type = formData.get("type") as BackgroundType;

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (type !== "image" && type !== "video") {
      return NextResponse.json(
        { error: "Invalid background type" },
        { status: 400 }
      );
    }

    const fileName =
      typeof (file as unknown as { name?: unknown })?.name === "string"
        ? ((file as unknown as { name: string }).name ?? "")
        : "";

    let extension = type === "video" ? "mp4" : "png";
    if (type === "video") {
      if (file.type === "video/webm" || fileName.toLowerCase().endsWith(".webm")) {
        extension = "webm";
      } else if (
        file.type === "video/quicktime" ||
        fileName.toLowerCase().endsWith(".mov")
      ) {
        extension = "mov";
      }
    }
    const { url } = await put(`${BACKGROUND_PREFIX}.${extension}`, file, {
      access: "public",
      contentType: file.type || (type === "video" ? "video/mp4" : "image/png"),
      addRandomSuffix: true,
    });

    // Clean up old background files
    try {
      const { blobs } = await list({ prefix: BACKGROUND_PREFIX });
      const oldBlobs = blobs.filter((b) => b.url !== url);
      for (const blob of oldBlobs) {
        await del(blob.url);
      }
    } catch {
      // Cleanup failed, non-fatal
    }

    const config = await getConfig();
    const newVersion = (config.backgroundVersion || 0) + 1;
    const newBackground: BackgroundConfig = { type, value: url };
    const newConfig = {
      ...config,
      backgroundVersion: newVersion,
      background: newBackground,
    };
    await saveConfig(newConfig);

    return NextResponse.json({
      ok: true,
      version: newVersion,
      background: newBackground,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to update background",
      },
      { status: 500 }
    );
  }
}

// GET - Retrieve current background config
export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json({
      version: config.backgroundVersion || 0,
      background: config.background || { type: "color", value: "#000000" },
    });
  } catch {
    return NextResponse.json({
      version: 0,
      background: { type: "color", value: "#000000" },
    });
  }
}
