import { createClient } from '@/lib/supabase/client';

export type StorageBucket =
  | 'avatars'
  | 'product-images'
  | 'blog-images'
  | 'downloads';

/**
 * Upload a file to a Supabase Storage bucket.
 * Buckets must be created in the Supabase dashboard first.
 */
export async function uploadFile(
  bucket: StorageBucket,
  path: string,
  file: File
) {
  const supabase = createClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) throw error;
  return data;
}

/**
 * Get a public URL for a file in a public bucket.
 */
export function getPublicUrl(bucket: StorageBucket, path: string) {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Create a signed URL for private downloads (expires in seconds).
 */
export async function getSignedUrl(
  bucket: StorageBucket,
  path: string,
  expiresIn = 3600
) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}
