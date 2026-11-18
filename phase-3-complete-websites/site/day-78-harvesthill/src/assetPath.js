const deployBase = import.meta.env.BASE_URL;
const localMarker = '/day-78-harvesthill/';
const localRoot = location.protocol === 'file:'
  ? `${location.href.split(localMarker)[0]}${localMarker}`
  : null;

export const assetPath = (path) => location.protocol === 'file:'
  ? new URL(path.replace(/^\//, ''), localRoot).href
  : `${deployBase}${path.replace(/^\//, '')}`;
