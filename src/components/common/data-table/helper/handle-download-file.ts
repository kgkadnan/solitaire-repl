/**
 * The `handleDownloadFile` function creates a link element, sets its href and download attributes, appends
 * it to the document body, triggers a click event on the link, and then removes the link from the
 * document body.
 * @param {string} downloadUrl - The `downloadUrl` parameter is a string that represents the URL of the
 * file that you want to download.
 */
export const handleDownloadFile = (downloadUrl: string) => {
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'Vision360.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
