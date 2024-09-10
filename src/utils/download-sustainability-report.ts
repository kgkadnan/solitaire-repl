import { saveAs } from 'file-saver';

export const handleDownloadReport = async () => {
  // Assuming you have the PDF file fetched or generated dynamically
  const response = await fetch('/v3/sustainability/download-report.png');
  const blob = await response.blob();

  // Use FileSaver.js to save the file
  saveAs(blob, 'sustainability-report.pdf');
};
