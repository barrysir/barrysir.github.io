export function getParentUrl(u: URL) {
  const segments = u.pathname.split('/').filter(Boolean); // Remove empty segments

  // Remove the last path segment (if any)
  segments.pop();

  // Reconstruct the pathname
  u.pathname = '/' + segments.join('/');

  // Clear search and hash if you want a clean parent URL
  u.search = '';
  u.hash = '';

  return u.toString();
}