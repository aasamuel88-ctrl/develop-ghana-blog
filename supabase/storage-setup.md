# Supabase Storage Setup

Create the following buckets in the Supabase Dashboard → Storage:

| Bucket          | Public | Purpose                    |
|-----------------|--------|----------------------------|
| avatars         | Yes    | User profile pictures      |
| product-images  | Yes    | Product cover images       |
| blog-images     | Yes    | Blog featured images       |
| downloads       | No     | Secure product files       |

## Policies (recommended)

- **avatars / product-images / blog-images**: Public read, authenticated write
- **downloads**: Only authenticated owners or admins can generate signed URLs

Helper functions are available in `src/lib/storage.ts`.
