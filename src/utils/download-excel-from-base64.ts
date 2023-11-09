export function downloadExcelFromBase64(
  base64String: string,
  fileName: string
) {
  // Convert the base64 string to a Blob
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  // Create URL for the Blob
  const blobUrl = URL.createObjectURL(blob);

  // Create a download link
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = fileName;

  // Simulate click to trigger download
  a.click();

  // Clean up: remove the object URL after download
  URL.revokeObjectURL(blobUrl);
}
