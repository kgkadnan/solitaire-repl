import React from 'react';
import { useDropzone } from 'react-dropzone';
import DocumentOutline from '@public/assets/icons/document-outline.svg?url';
import AttachOutline from '@public/assets/icons/attach-outline.svg?url';
import ellipsisVertical from '@public/assets/icons/ellipsis-vertical.svg';
import Image from 'next/image';
import { CustomInputlabel } from '../input-label';
import styles from './file-attachment.module.scss';
import { Progress } from '@components/ui/progress';
import greenCheckMarkOutline from '@public/assets/icons/green-checkmark-circle-outline.svg';
import CustomMenuBar from '../menu-bar';
import eyeOutline from '@public/assets/icons/eye-outline.svg';
import deleteSvg from '@public/assets/icons/delete.svg';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import { CustomModal } from '../modal';
import pdf from '@public/assets/icons/pdf.svg';
import { handleFileupload } from '@/app/my-account/kyc/helper/handle-file-upload';

const ALLOWED_FILE_TYPES = {
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx'
  ],
  'image/jpeg': [],
  'application/pdf': []
};

// Function to convert bytes to megabytes
function bytesToMB(bytes: number) {
  return (bytes / (1024 * 1024)).toFixed(3); // Keep it rounded to 3 decimal places
}

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
  MAX_FILE
}) => {
  const { modalState, modalSetState } = useModalStateManagement();
  const { isModalOpen, modalContent } = modalState;
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

  const handlePreview = () => {
    setIsModalOpen(true);
    setModalContent(
      <>
        {selectedFile.map((file: any) => {
          const path = file.path;
          const fileExtension = path.slice(
            ((path.lastIndexOf('.') - 1) >>> 0) + 2
          );
          return (
            <>
              {file.type === 'application/pdf' ? (
                <iframe
                  src={file.preview}
                  style={{ width: '100%', height: '500px' }}
                  title="PDF Preview"
                ></iframe>
              ) : (
                // fileExtension == ('docx' || 'doc') ? (
                //   <FileViewer
                //     fileType={fileExtension}
                //     filePath={file.preview}
                //     className={'h-[60vh]'}
                //   />
                // ) :
                <Image
                  key={file.name}
                  src={file.preview}
                  alt={file.name}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-[60vh]"
                />
              )}
              <div className="flex items-center gap-1">
                {fileExtension == 'pdf' ? (
                  <Image src={pdf} alt="pdf" width={24} height={24} />
                ) : (
                  ''
                )}
                <p>
                  {file.name} | {`${bytesToMB(file.size)}MB`}
                </p>
              </div>
            </>
          );
        })}
      </>
    );
  };

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <div className="flex items-center bg-solitaireSecondary rounded-[10px] px-3 w-full ">
      <CustomModal
        isOpens={isModalOpen}
        setIsOpen={setIsModalOpen}
        dialogContent={modalContent}
        modalStyle={styles.modalStyle}
      />
      <div {...getRootProps()} style={dropzoneStyle}>
        <DocumentOutline
          className={`${
            fileRejections.length ? styles.errorStroke : styles.stroke
          } w-[10%]`}
        />
        {selectedFile.length < MAX_FILE && (
          <input {...getInputProps()} name="attachment" />
        )}
        <div className=" flex flex-col w-[80%] text-left gap-1">
          <div className="flex ">
            <CustomInputlabel
              label={lable}
              htmlfor="attachment"
              overriddenStyles={{
                label: fileRejections.length ? styles.errorlabel : styles.label
              }}
            />

            <p
              className={
                fileRejections.length ? styles.errorlabel : styles.label
              }
            >
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
          {(!isFileUploaded || !selectedFile.length) && (
            <p
              className={
                fileRejections.length ? styles.errorFormat : styles.format
              }
            >
              Format: pdf, doc, jpeg | Max File Size: 100 mb
            </p>
          )}
        </div>
        <div className="flex flex-col items-end w-[10%]">
          {uploadProgress > 0 ? (
            <p className="text-[14px]">{`${uploadProgress}%`}</p>
          ) : (
            !isFileUploaded && (
              <AttachOutline
                className={
                  fileRejections.length ? styles.errorStroke : styles.stroke
                }
              />
            )
          )}
        </div>
      </div>
      <div>
        {isFileUploaded && (
          <CustomMenuBar
            menuTrigger={
              <Image
                src={ellipsisVertical}
                alt="ellipsisVertical"
                className="cursor-pointer mr-[17px]"
                height={30}
                width={30}
              />
            }
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
                onSelect: handlePreview
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
                onSelect: handleDelete
              }
            ]}
            menuTriggerStyle={styles.menuTriggerStyle}
            menuItemStyle={styles.menuItemStyle}
            menuContentStyle={styles.menuContentStyle}
          />
        )}
      </div>
    </div>
  );
};

export default FileAttachements;
