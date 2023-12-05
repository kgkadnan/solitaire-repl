/**
 * The function `handleDownloadImage` opens a new browser tab with the provided image URL.
 * @param {string | undefined} imageUrl - The `imageUrl` parameter is a string that represents the URL
 * of an image that you want to download.
 */
export const handleDownloadImage = (imageUrl: string | undefined) => {
  window.open(imageUrl, '_blank');
};
