export const getShapeDisplayName = (value = '') => {
  const shapesMapping: Record<string, string> = {
    EM: 'Emerald',
    BR: 'Round',
    PR: 'Princess',
    PS: 'Pear',
    AS: 'Asscher',
    RAD: 'Radiant',
    OV: 'Oval',
    CU: 'Cushion',
    MQ: 'Marquise',
    HS: 'Heart'
  };

  return shapesMapping[value] || value;
};
const apiURL = process.env.NEXT_PUBLIC_API_URL;
export const handleDownloadImage = async (
  imageUrl = '',
  name: string,
  setIsLoading?: any
) => {
  try {
    setIsLoading(true);

    // Fetch the base64 data for the file
    const response = await fetch(
      `${apiURL}public/get-blob-base64?url=${imageUrl}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Extract the base64 string from the response body
    const base64String = data?.data;
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Determine the file type based on the name or context
    let fileType;
    if (name === 'Certificate') {
      fileType = 'application/pdf';
    } else if (name === 'Video' || name === 'Sparkle') {
      fileType = 'video/mp4';
    } else {
      fileType = 'image/jpeg';
    }

    // Create a Blob for the file
    const blob = new Blob([byteArray], { type: fileType });

    // Create URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Create a download link
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = name;

    // Simulate click to trigger download
    a.click();

    // Clean up: remove the object URL after download
    URL.revokeObjectURL(blobUrl);

    setIsLoading(false);
  } catch (error) {
    console.error('Error downloading file:', error);
    setIsLoading(false);
  }
};
