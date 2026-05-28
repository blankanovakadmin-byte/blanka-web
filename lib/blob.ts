import { put, del, list } from '@vercel/blob';

const TTL_SECONDS = 72 * 60 * 60; // 72 hours

export async function uploadFile(
  filename: string,
  data: Buffer | Blob | ReadableStream,
  contentType: string
): Promise<string> {
  const { url } = await put(filename, data, {
    access: 'public',
    contentType,
    addRandomSuffix: true,
  });
  return url;
}

export function generateSignedUrl(blobUrl: string): string {
  const url = new URL(blobUrl);
  const expiry = Date.now() + TTL_SECONDS * 1000;
  url.searchParams.set('expires', String(expiry));
  // Vercel Blob uses token-based access; for private blobs use signed URLs via SDK
  return url.toString();
}

export async function listFiles() {
  const { blobs } = await list();
  return blobs;
}

export async function deleteFile(url: string) {
  await del(url);
}
