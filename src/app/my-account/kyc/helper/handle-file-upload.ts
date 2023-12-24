export const handleFileupload = async ({
  acceptedFiles,
  setUploadProgress,
  setIsFileUploaded,
  setSelectedFile
}: any) => {
  try {
    if (acceptedFiles.length) {
      setIsFileUploaded(false);

      acceptedFiles.forEach((file: any) => {
        setSelectedFile((prevState: any) => [...prevState, file]);
      });

      const simulateUpload = async () => {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            resolve();
          }, 1000); // Simulate a 1-second delay
        });
      };
      setUploadProgress(0);
      for (let i = 0; i <= 100; i += 50) {
        setUploadProgress(i);
        await simulateUpload(); // Simulate a delay between progress updates
      }
      setUploadProgress(0);
      setIsFileUploaded(true);
    }
  } catch (error) {
    // Log an error message if the upload fails
    console.error('File upload failed:', error);
  }
};
