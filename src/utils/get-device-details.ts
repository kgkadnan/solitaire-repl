export const getDeviceDetails = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    // We're on the server, return default values
    return { screenSize: '', deviceType: 'unknown', os: 'unknown' };
  }

  const screenSize = `${window.screen.width}x${window.screen.height}`;
  const os =
    (navigator as any)?.userAgentData?.platform ||
    navigator.platform ||
    'unknown';
  const deviceType =
    /iPad|Tablet/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && screen.width > 768 && screen.width < 1024)
      ? 'Tablet'
      : 'Laptop';

  return { screenSize, deviceType, os };
};
