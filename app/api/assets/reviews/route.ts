import { NextRequest, NextResponse } from "next/server";
import { put, list, del } from "@vercel/blob";

export const dynamic = "force-dynamic";

const CONFIG_PREFIX = "config/app-config";

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
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const config = await getConfig();
    const reviews = config.reviews || [];
    const version = config.reviewsVersion || 0;
    const newVersion = version + 1;

    const newReview = {
      id: Date.now().toString(),
      name: body.name,
      label: body.label,
      rating: body.rating,
      comment: body.comment,
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);

    const newConfig = {
      ...config,
      reviews,
      reviewsVersion: newVersion,
    };

    await saveConfig(newConfig);

    return NextResponse.json({
      ok: true,
      version: newVersion,
      reviewId: newReview.id,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { reviewId } = await req.json();

    if (!reviewId) {
      return NextResponse.json(
        { error: "reviewId is required" },
        { status: 400 },
      );
    }

    const config = await getConfig();
    const oldReviews = config.reviews || [];
    const oldVersion = config.reviewsVersion || 0;

    config.reviews = oldReviews.filter((review: { id: string }) => review.id !== reviewId);
    config.reviewsVersion = oldVersion + 1;

    await saveConfig(config);

    return NextResponse.json({
      ok: true,
      version: config.reviewsVersion,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const config = await getConfig();
    return NextResponse.json({
      version: config.reviewsVersion || 0,
      reviews: config.reviews || [],
    });
  } catch {
    return NextResponse.json({ version: 0, reviews: [] });
  }
}
