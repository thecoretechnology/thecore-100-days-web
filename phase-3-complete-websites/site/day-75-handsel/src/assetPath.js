const baseUrl = import.meta.env?.BASE_URL || '/';

export const assetPath = path => path.startsWith(baseUrl)
  ? path
  : `${baseUrl}${path.replace(/^\/+/, '')}`;
