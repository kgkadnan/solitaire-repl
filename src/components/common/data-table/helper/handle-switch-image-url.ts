/**
 * The function `handleSwitchImageUrl` sets the diamond detail iframe URL and image URL based on the
 * provided parameters and sets the active tab.
 * @param {string} id - A string representing the id of the diamond detail data.
 * @param {string | undefined} url - A string representing the URL of an image.
 * @param {string | undefined} iframeUrl - A string representing the URL of an iframe.
 */
export const handleSwitchImageUrl = (
  id: string,
  url: string | undefined,
  iframeUrl: string | undefined,
  setDiamondDetailIframeUrl: any,
  setDiamondDetailImageUrl: any,
  setActiveTab: any
) => {
  setDiamondDetailIframeUrl('');
  setDiamondDetailImageUrl('');
  if (iframeUrl) {
    setDiamondDetailIframeUrl(iframeUrl);
  } else if (url) {
    setDiamondDetailImageUrl(url);
  }
  setActiveTab(id);
};
