import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// Serve files from app/assets/video via API to avoid public/ and loader issues
export async function GET(
  _req: Request,
  { params }: { params: { path: string[] } }
) {
  try {
    const segments = params.path || [];
    // Ensure no path traversal
    const safeSegments = segments.filter((segment) => !segment.includes(".."));

    const absoluteFilePath = path.resolve(
      process.cwd(),
      "app",
      "assets",
      "video",
      ...safeSegments
    );

    const fileBuffer = await fs.readFile(absoluteFilePath);

    const ext = path.extname(absoluteFilePath).toLowerCase();
    const contentType =
      ext === ".webm"
        ? "video/webm"
        : ext === ".mp4"
        ? "video/mp4"
        : ext === ".mov"
        ? "video/quicktime"
        : "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    return new NextResponse("Not Found", { status: 404 });
  }
}


