import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import DocumentOutline from '@public/assets/icons/document-outline.svg?url';
import AttachOutline from '@public/assets/icons/attach-outline.svg?url';
import ellipsisVertical from '@public/assets/icons/ellipsis-vertical.svg';
import Image from 'next/image';
import { CustomInputlabel } from '../input-label';
import styles from './file-attachment.module.scss';
import { Progress } from '@components/ui/progress';
import greenCheckMarkOutline from '@public/assets/icons/green-checkmark-circle-outline.svg';

const ALLOWED_FILE_TYPES = {
  'application/msword': [],
  'image/jpeg': [],
  'application/pdf': []
};

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const MAX_FILE = 1;

interface IFileAttachements {
  lable: string;
}

const FileAttachements: React.FC<IFileAttachements> = ({ lable }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileUploaded, setFileUploaded] = useState(false); // New state variable

  const dropzoneStyle = {
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    height: '8vh',
    width: '80%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between'
  };

  const onDrop = useCallback(async (acceptedFiles: any) => {
    try {
      if (acceptedFiles.length) {
        setFileUploaded(false);
        const simulateUpload = async () => {
          return new Promise<void>(resolve => {
            setTimeout(() => {
              resolve();
            }, 1000); // Simulate a 1-second delay
          });
        };
        setUploadProgress(0);
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress(i);
          await simulateUpload(); // Simulate a delay between progress updates
        }
        setUploadProgress(0);
        setFileUploaded(true);
      }
    } catch (error) {
      // Log an error message if the upload fails
      console.error('File upload failed:', error);
    }
  }, []);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onclick,
      onchange,
      onDrop,
      accept: ALLOWED_FILE_TYPES,
      maxSize: MAX_FILE_SIZE,
      maxFiles: MAX_FILE
    });

  return (
    <div className="flex items-center bg-solitaireSecondary rounded-[10px] px-3 w-full justify-between">
      <DocumentOutline
        className={fileRejections.length ? styles.errorStroke : styles.stroke}
      />
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} name="attachment" />

        <div className=" flex flex-col w-[100%] text-left gap-[3px]">
          <CustomInputlabel
            label={lable}
            htmlfor="attachment"
            overriddenStyles={{
              label: fileRejections.length ? styles.errorlabel : styles.label
            }}
          />
          {acceptedFiles.length > 0 &&
            uploadProgress === 0 &&
            fileUploaded &&
            acceptedFiles.map((file: any) => (
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
          {uploadProgress > 0 && (
            <Progress value={uploadProgress} className={'flex-none'} />
          )}
          {!fileUploaded && (
            <p
              className={
                fileRejections.length ? styles.errorFormat : styles.format
              }
            >
              Format: pdf, doc, jpeg | Max File Size: 100 mb
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        {uploadProgress > 0 ? (
          <p className="text-[14px]">{`${uploadProgress}%`}</p>
        ) : fileUploaded ? (
          <Image
            src={ellipsisVertical}
            alt="ellipsisVertical"
            className="cursor-pointer"
            height={30}
            width={30}
            onClick={() => {
              console.log('hello');
            }}
          />
        ) : (
          <AttachOutline
            className={
              fileRejections.length ? styles.errorStroke : styles.stroke
            }
          />
        )}
      </div>
    </div>
  );
};

export default FileAttachements;
