export const handleDeleteAttachment = ({
  selectedFile,
  setIsFileUploaded,
  setSelectedFile
}: any) => {
  const newFiles = [...selectedFile];
  newFiles.splice(newFiles.indexOf(selectedFile[0]), 1);
  setSelectedFile(newFiles);
  setIsFileUploaded(false);
};
