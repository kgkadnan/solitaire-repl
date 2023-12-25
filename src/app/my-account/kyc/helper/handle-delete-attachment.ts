interface IhandleDeleteAttachment {
  setIsFileUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<string[]>>;
}
export const handleDeleteAttachment = ({
  setIsFileUploaded,
  setSelectedFile
}: IhandleDeleteAttachment) => {
  setSelectedFile([]);
  setIsFileUploaded(false);
};
