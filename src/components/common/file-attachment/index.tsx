import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import DocumentOutline from '@public/assets/icons/document-outline.svg?url';
import AttachOutline from '@public/assets/icons/attach-outline.svg?url';
import EllipsisVertical from '@public/assets/icons/ellipsis-vertical.svg?url';
import Image from 'next/image';
import { CustomInputlabel } from '../input-label';
import styles from './file-attachment.module.scss';
import { Progress } from '@components/ui/progress';
import greenCheckMarkOutline from '@public/assets/icons/green-checkmark-circle-outline.svg';
import CustomMenuBar from '../menu-bar';
import eyeOutline from '@public/assets/icons/eye-outline.svg';
import deleteSvg from '@public/assets/icons/delete.svg';
import errorImage from '@public/assets/icons/error.svg';
import { handleFileupload } from '@/app/my-account/kyc/helper/handle-file-upload';
import { handlePreview } from '@/app/my-account/kyc/helper/handle-file-preview';

const ALLOWED_FILE_TYPES = {
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx'
  ],
  'image/jpeg': [],
  'application/pdf': []
};

// Function to convert bytes to megabytes
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

interface IFileAttachements {
  lable: string;
  isRequired: boolean;
  uploadProgress: any;
  isFileUploaded: any;
  setUploadProgress: any;
  setIsFileUploaded: any;
  setSelectedFile: any;
  selectedFile: any;
  MAX_FILE: number;
  modalSetState: any;
  setError?: any;
  error?: string;
}

const FileAttachements: React.FC<IFileAttachements> = ({
  lable,
  isRequired,
  uploadProgress,
  isFileUploaded,
  setUploadProgress,
  setIsFileUploaded,
  setSelectedFile,
  selectedFile,
  MAX_FILE,
  setError,
  error,
  modalSetState
}) => {
  const { setIsModalOpen, setModalContent } = modalSetState;

  const dropzoneStyle = {
    borderRadius: '10px',
    padding: '0px 20px',
    textAlign: 'center',
    height: '8vh',
    width: '100%',
    cursor: 'pointer',
    backgroundColor: 'hsl(var(--solitaire-secondary))',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const onDrop = (acceptedFiles: any) => {
    handleFileupload({
      acceptedFiles,
      setUploadProgress,
      setIsFileUploaded,
      setSelectedFile
    });
  };

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ALLOWED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    maxFiles: MAX_FILE
  });

  useEffect(() => {
    if (fileRejections?.length) {
      setError(fileRejections[0].errors[0].code);
    }
  }, [fileRejections]);

  const handleValidation = () => {
    // Check if selectedFile is empty for required fields
    if (isRequired && selectedFile.length === 0) {
      setError('File is required');
    } else {
      setError(null); // Clear error if selectedFile is not empty or not required
    }

    // Check for file rejections
    if (fileRejections?.length) {
      setError(fileRejections[0].errors[0].code);
    }
  };

  const handleDelete = ({ selectedFile, setIsFileUploaded }: any) => {
    const newFiles = [...selectedFile];
    newFiles.splice(newFiles.indexOf(selectedFile[0]), 1);
    setSelectedFile(newFiles);
    setIsFileUploaded(false);
  };

  return (
    <div className="flex items-center bg-solitaireSecondary rounded-[10px] px-3 w-full ">
      <div {...getRootProps()} style={dropzoneStyle}>
        <div className="w-[10%] flex items-start">
          {!error?.length ? (
            <DocumentOutline className={`${styles.stroke}`} />
          ) : (
            <Image src={errorImage} alt="errorImage" width={40} />
          )}
        </div>

        {selectedFile.length < MAX_FILE && (
          <input {...getInputProps()} name="attachment" />
        )}
        <div className=" flex flex-col w-[80%] text-left gap-1">
          <div className="flex ">
            <CustomInputlabel
              label={lable}
              htmlfor="attachment"
              overriddenStyles={{
                label: error?.length ? styles.errorlabel : styles.label
              }}
            />

            <p className={error?.length ? styles.errorlabel : styles.label}>
              {isRequired && '*'}
            </p>
          </div>
          {selectedFile.length > 0 &&
            uploadProgress === 0 &&
            isFileUploaded && (
              <div className="flex items-center gap-2">
                {selectedFile.map((file: any) => (
                  <div key={file.path} className="flex items-center gap-2">
                    <Image
                      src={greenCheckMarkOutline}
                      alt="greenCheckMarkOutline"
                      height={18}
                      width={18}
                    />
                    <p>{file.path}</p>
                  </div>
                ))}
              </div>
            )}
          {uploadProgress > 0 && (
            <Progress value={uploadProgress} className={'flex-none'} />
          )}
          {(!isFileUploaded || !selectedFile.length) &&
            (!error?.length ? (
              <p className={error?.length ? styles.errorFormat : styles.format}>
                Format: pdf, doc, jpeg | Max File Size: 100 mb
              </p>
            ) : (
              <p className={styles.errorFormat}>{error}</p>
            ))}
        </div>
        <div className="flex flex-col items-end w-[10%]">
          {uploadProgress > 0 ? (
            <p className="text-[14px]">{`${uploadProgress}%`}</p>
          ) : !isFileUploaded ? (
            <AttachOutline
              className={error?.length ? styles.errorStroke : styles.stroke}
            />
          ) : (
            <div onClick={e => e.stopPropagation()}>
              {isFileUploaded && (
                <CustomMenuBar
                  menuTrigger={<EllipsisVertical />}
                  menuItem={[
                    {
                      label: 'Preview',
                      id: '1',
                      svg: (
                        <Image
                          src={eyeOutline}
                          alt="eyeOutline"
                          width={24}
                          height={24}
                        />
                      ),
                      onSelect: () =>
                        handlePreview({
                          setIsModalOpen,
                          setModalContent,
                          selectedFile
                        })
                    },
                    {
                      label: 'Delete',
                      id: '2',
                      svg: (
                        <Image
                          src={deleteSvg}
                          alt="deleteSvg"
                          width={24}
                          height={24}
                        />
                      ),
                      onSelect: () =>
                        handleDelete({ selectedFile, setIsFileUploaded })
                    }
                  ]}
                  menuTriggerStyle={styles.menuTriggerStyle}
                  menuItemStyle={styles.menuItemStyle}
                  menuContentStyle={styles.menuContentStyle}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileAttachements;
