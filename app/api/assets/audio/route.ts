import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const versionPath = path.join(process.cwd(), "config.json");
    const filePath = path.join(
      process.cwd(),
      "public",
      "assets",
      "Website.m4a",
    );

    const oldConfig = JSON.parse(await readFile(versionPath, "utf8"));
    const version = oldConfig.audioVersion;
    const newVersion = version + 1;
    const newConfig = { ...oldConfig, audioVersion: newVersion };

    await writeFile(filePath, buffer);
    await writeFile(versionPath, JSON.stringify(newConfig, null, 2));

    return NextResponse.json({ ok: true, version: newVersion });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update audio" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const versionPath = path.join(process.cwd(), "config.json");
  const version = JSON.parse(await readFile(versionPath, "utf8")).audioVersion;

  revalidatePath("/", "layout");
  revalidatePath("/", "page");
  revalidatePath("/assets/*");

  return NextResponse.json({ version });
}
