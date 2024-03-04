import { updateFormState } from '@/features/kyc/kyc';
export const handleFileupload = async ({
  acceptedFiles,
  setUploadProgress,
  setIsFileUploaded,
  setSelectedFile,
  dispatch
}: any) => {
  try {
    if (acceptedFiles.length) {
      dispatch(
        updateFormState({
          name: setIsFileUploaded,
          value: false
        })
      );

      acceptedFiles.forEach((file: any) => {
        dispatch(
          updateFormState({
            name: setSelectedFile,
            value: { url: file.name }
          })
        );
      });

      const simulateUpload = async () => {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            resolve();
          }, 1000); // Simulate a 1-second delay
        });
      };
      dispatch(
        updateFormState({
          name: setUploadProgress,
          value: 0
        })
      );
      for (let i = 0; i <= 100; i += 50) {
        dispatch(
          updateFormState({
            name: setUploadProgress,
            value: i
          })
        );
        await simulateUpload(); // Simulate a delay between progress updates
      }
      dispatch(
        updateFormState({
          name: setUploadProgress,
          value: 0
        })
      );
      dispatch(
        updateFormState({
          name: setIsFileUploaded,
          value: true
        })
      );
    }
  } catch (error) {
    // Log an error message if the upload fails
    console.error('File upload failed:', error);
  }
};
