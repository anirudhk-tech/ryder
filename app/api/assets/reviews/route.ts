import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const configPath = path.join(process.cwd(), "config.json");

    const oldConfig = JSON.parse(await readFile(configPath, "utf8"));

    const reviews = oldConfig.reviews || [];

    const version = oldConfig.reviewsVersion || 0;
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
      ...oldConfig,
      reviews,
      reviewsVersion: newVersion,
    };

    await writeFile(configPath, JSON.stringify(newConfig, null, 2));

    return NextResponse.json({
      ok: true,
      version: newVersion,
      reviewId: newReview.id,
    });
  } catch (err) {
    console.error(err);
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

    const configPath = path.join(process.cwd(), "config.json");
    const config = JSON.parse(await readFile(configPath, "utf8"));

    const oldReviews = config.reviews || [];
    const oldVersion = config.reviewsVersion || 0;

    config.reviews = oldReviews.filter((review: any) => review.id !== reviewId);
    config.reviewsVersion = oldVersion + 1;

    await writeFile(configPath, JSON.stringify(config, null, 2));

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/reviews");

    return NextResponse.json({
      ok: true,
      version: config.reviewsVersion,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const configPath = path.join(process.cwd(), "config.json");

  try {
    const config = JSON.parse(await readFile(configPath, "utf8"));
    const version = config.reviewsVersion || 0;

    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/reviews");

    return NextResponse.json({ version, reviews: config.reviews });
  } catch (err) {
    return NextResponse.json({ version: 0 });
  }
}
