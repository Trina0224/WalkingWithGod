const WIDTH_BUCKETS = [1280, 1920, 2560, 3200, 3840];

export function getPreferredPhotoWidth(viewportWidth, devicePixelRatio = 1) {
  const cssWidth = Number(viewportWidth) || 1280;
  const pixelRatio = Math.max(1, Number(devicePixelRatio) || 1);
  const requested = cssWidth * pixelRatio;
  return WIDTH_BUCKETS.find((width) => width >= requested) || WIDTH_BUCKETS.at(-1);
}

export function getBrowserPhotoWidth() {
  if (typeof window === 'undefined') return 2560;
  return getPreferredPhotoWidth(window.innerWidth, window.devicePixelRatio);
}
