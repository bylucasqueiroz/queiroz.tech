import { readFile } from "node:fs/promises"
import { join } from "node:path"

/**
 * Width and height of a PNG or JPEG under `public/`, read from the file header at build time so
 * post images can go through next/image without listing dimensions in the MDX. Returns null for
 * remote URLs, other formats or unreadable files; callers fall back to a plain <img>.
 */
export async function getImageSize(src: string): Promise<{ width: number; height: number } | null> {
  if (!src.startsWith("/") || src.startsWith("//")) return null
  let data: Buffer
  try {
    data = await readFile(join(process.cwd(), "public", decodeURI(src)))
  } catch {
    return null
  }

  // PNG: signature, then the IHDR chunk holds width and height as big-endian uint32.
  if (data.length > 24 && data.readUInt32BE(0) === 0x89504e47) {
    return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) }
  }

  // JPEG: walk the segments until a start-of-frame marker (C0–CF, except C4, C8 and CC).
  if (data.length > 4 && data[0] === 0xff && data[1] === 0xd8) {
    let offset = 2
    while (offset + 9 < data.length) {
      if (data[offset] !== 0xff) return null
      const marker = data[offset + 1]
      const length = data.readUInt16BE(offset + 2)
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { width: data.readUInt16BE(offset + 7), height: data.readUInt16BE(offset + 5) }
      }
      offset += 2 + length
    }
  }
  return null
}
