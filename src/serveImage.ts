import { readFile } from "node:fs/promises";
import path from "node:path";

const IMAGES_ROOT = path.join(__dirname, "..", "images");

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export interface PortafolioImage {
  buffer: Buffer;
  contentType: string;
}

/**
 * Lee una imagen del portafolio empaquetada dentro de este paquete
 * (node_modules/@marcosdemarte/portafolio/images/...). Pensado para
 * usarse desde un Route Handler de Next.js, ej:
 *
 *   // app/imagenes/portafolio/[...path]/route.ts
 *   export const runtime = "nodejs";
 *   export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
 *     const { path: segments } = await params;
 *     const image = await readPortafolioImage(segments);
 *     if (!image) return new Response("Not found", { status: 404 });
 *     return new Response(image.buffer, {
 *       headers: {
 *         "Content-Type": image.contentType,
 *         "Cache-Control": "public, max-age=31536000, immutable",
 *       },
 *     });
 *   }
 */
export async function readPortafolioImage(
  segments: string[],
): Promise<PortafolioImage | null> {
  const safeSegments = segments.filter(
    (segment) =>
      segment &&
      segment !== ".." &&
      !segment.includes("/") &&
      !segment.includes("\\"),
  );
  if (safeSegments.length === 0 || safeSegments.length !== segments.length) {
    return null;
  }

  const ext = path.extname(safeSegments[safeSegments.length - 1]).toLowerCase();
  const contentType = CONTENT_TYPES[ext];
  if (!contentType) return null;

  const filePath = path.join(IMAGES_ROOT, ...safeSegments);
  if (!filePath.startsWith(IMAGES_ROOT)) return null;

  try {
    const buffer = await readFile(filePath);
    return { buffer, contentType };
  } catch {
    return null;
  }
}
