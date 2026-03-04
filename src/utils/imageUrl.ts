/**
 * Converts a Dropbox share URL into a direct embeddable image URL.
 *
 * Dropbox share links (e.g. https://www.dropbox.com/s/xxx/file.jpg?dl=0)
 * must be converted to dl.dropboxusercontent.com links to be embeddable.
 *
 * "Preview" thumbnail links (previews.dropbox.com/p/thumb/...) are
 * temporary and will expire — always use the share link with ?raw=1 instead.
 */
export function getImageUrl(url: string | undefined | null): string {
  if (!url) return "";

  // Already a direct Dropbox CDN link — leave as-is
  if (url.includes("dl.dropboxusercontent.com")) return url;

  // Standard Dropbox share link — convert to direct CDN link
  // https://www.dropbox.com/s/xxx/file.jpg?dl=0
  // https://www.dropbox.com/scl/fi/xxx/file.jpg?rlkey=yyy&dl=0
  if (url.includes("www.dropbox.com")) {
    return url
      .replace("www.dropbox.com", "dl.dropboxusercontent.com")
      .replace(/[?&]dl=[01]/g, "") // strip dl=0 / dl=1
      .replace(/[?&]raw=[01]/g, ""); // strip raw=0 / raw=1
  }

  return url;
}
