import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

export const dynamic = "force-dynamic";

const CONFIG_PREFIX = "config/app-config";
const LOGO_PREFIX = "assets/logo";

async function getConfig() {
  try {
    const { blobs } = await list({ prefix: CONFIG_PREFIX });
    
    if (blobs.length === 0) {
      return { audioVersion: 0, logoPictureVersion: 0, reviewsVersion: 0, reviews: [] };
    }
    
    const sortedBlobs = blobs.sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    const latestConfig = sortedBlobs[0];
    
    const res = await fetch(latestConfig.url, { cache: "no-store" });
    
    if (!res.ok) {
      return { audioVersion: 0, logoPictureVersion: 0, reviewsVersion: 0, reviews: [] };
    }
    
    return await res.json();
  } catch {
    return { audioVersion: 0, logoPictureVersion: 0, reviewsVersion: 0, reviews: [] };
  }
}

async function saveConfig(config: Record<string, unknown>) {
  const { url } = await put(CONFIG_PREFIX + ".json", JSON.stringify(config, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: true,
  });
  
  try {
    const { blobs } = await list({ prefix: CONFIG_PREFIX });
    const oldBlobs = blobs.filter(b => b.url !== url);
    for (const blob of oldBlobs) {
      await del(blob.url);
    }
  } catch {
    // Cleanup failed, non-fatal
  }
  
  return url;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const { url } = await put(LOGO_PREFIX + ".png", file, {
      access: "public",
      contentType: file.type || "image/png",
      addRandomSuffix: true,
    });
    
    try {
      const { blobs } = await list({ prefix: LOGO_PREFIX });
      const oldLogoBlobs = blobs.filter(b => b.url !== url);
      for (const blob of oldLogoBlobs) {
        await del(blob.url);
      }
    } catch {
      // Cleanup failed, non-fatal
    }

    const config = await getConfig();
    const newVersion = (config.logoPictureVersion || 0) + 1;
    const newConfig = { ...config, logoPictureVersion: newVersion, logoUrl: url };
    await saveConfig(newConfig);

    return NextResponse.json({ ok: true, version: newVersion, url });
  } catch {
    return NextResponse.json(
      { error: "Failed to update logo" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json({
      version: config.logoPictureVersion || 0,
      url: config.logoUrl || null,
    });
  } catch {
    return NextResponse.json({ version: 0, url: null });
  }
}
