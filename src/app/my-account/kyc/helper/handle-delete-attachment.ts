import React from 'react';

interface IHandleDeleteAttachment {
  setIsFileUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<string[]>>;
}
export const handleDeleteAttachment = ({
  setIsFileUploaded,
  setSelectedFile
}: IHandleDeleteAttachment) => {
  setSelectedFile([]);
  setIsFileUploaded(false);
};
