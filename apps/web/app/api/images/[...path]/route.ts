import { NextRequest } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    // Reconstruct the full path from the dynamic segments
    const imagePath = params.path.join("/");

    // Construct the full file path
    // We're running from the web app directory, so we need to go up to root first
    const fullPath = join(process.cwd(), "app/assets/images", imagePath);

    // Read the file
    const imageBuffer = await readFile(fullPath);

    // Determine content type based on file extension
    const extension = imagePath.split(".").pop()?.toLowerCase();
    let contentType = "image/png"; // default

    switch (extension) {
      case "png":
        contentType = "image/png";
        break;
      case "jpg":
      case "jpeg":
        contentType = "image/jpeg";
        break;
      case "gif":
        contentType = "image/gif";
        break;
      case "webp":
        contentType = "image/webp";
        break;
      case "svg":
        contentType = "image/svg+xml";
        break;
    }

    // Return the image with appropriate headers
    return new Response(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new Response("Image not found", { status: 404 });
  }
}
