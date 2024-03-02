import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import AttachMentIcon from '@public/v2/assets/icons/attachment/attachment.svg?url';
import errorIcon from 'public/v2/assets/icons/attachment/error-icon.svg';
import Image from 'next/image';
import mediaIcon from '@public/v2/assets/icons/attachment/media-icon.svg';
import styles from './file-attachment.module.scss';
import deleteIcon from '@public/v2/assets/icons/attachment/delete-icon.svg';

// import { IModalSetState } from '@/app/search/result/result-interface';

import { ALLOWED_FILE_TYPES } from '@/constants/business-logic';
import { useAppDispatch } from '@/hooks/hook';
import { updateFormState } from '@/features/kyc/kyc';
import { IModalSetState } from '@/app/search/result/result-interface';
import { Label } from '@/components/ui/label';

import { handleDeleteAttachment } from '@/app/v2/kyc/helper/handle-delete-attachment';
import Loader from './component/loader';

interface IFileAttachments {
  lable: string;
  isRequired: boolean;
  formState: any;
  formKey: string;
  maxFile: number;
  minFile: number;
  fileSize: number;
  formErrorState: any;
  modalState: any;
  modalSetState: IModalSetState;
  fileUpload: ({ acceptedFiles, key }: any) => void;
}

const FileAttachments: React.FC<IFileAttachments> = ({
  lable,
  isRequired,
  formState,
  formKey,
  maxFile,
  minFile,
  formErrorState,
  fileSize,
  fileUpload
  // modalState,
  // fileUpload
}) => {
  const dispatch = useAppDispatch();
  const dropzoneStyle = {
    borderRadius: '8px',
    padding: '15px 20px',
    textAlign: 'center',
    width: '100%',
    cursor: 'pointer',
    backgroundColor: 'var(--neutral-25)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px'
  };

  const onDrop = (acceptedFiles: any) => {
    fileUpload({ acceptedFiles, key: formKey });
  };

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    minFile: minFile,
    accept: ALLOWED_FILE_TYPES,
    maxSize: fileSize,
    maxFiles: maxFile
  });

  useEffect(() => {
    if (fileRejections?.length) {
      dispatch(
        updateFormState({
          name: `formErrorState.attachment[${formKey}]`,
          value: fileRejections[0].errors[0].code
        })
      );
    }
  }, [fileRejections]);

  let uploadProgress = formState?.attachment?.[formKey]?.uploadProgress ?? '';
  let isFileUploaded = formState?.attachment?.[formKey]?.isFileUploaded ?? '';
  let selectedFile = formState?.attachment?.[formKey]?.selectedFile ?? '';
  let error = formErrorState?.attachment?.[formKey] ?? '';

  return (
    <>
      <div>
        <div
          className={`flex items-center bg-neutral25 rounded-[10px]  w-full  border-[1px] ${
            error.length ? 'border-dangerMain' : 'border-neutral-200'
          } ${
            isFileUploaded || error.length
              ? 'border-solid shadow-sm'
              : 'border-dashed'
          }`}
        >
          <div {...getRootProps()} style={dropzoneStyle}>
            <div className="w-[10%] flex items-start">
              {!error?.length ? (
                <Image src={mediaIcon} alt="mediaIcon" />
              ) : (
                <Image src={errorIcon} alt="errorIcon" />
              )}
            </div>

            {selectedFile.length < maxFile && (
              <input {...getInputProps()} name="attachment" />
            )}
            <div className=" flex flex-col w-[100%] text-left ">
              <div className="flex ">
                <Label className={` ${styles.label} `}>{lable}</Label>

                <p className={styles.label}>{isRequired && '*'}</p>
              </div>
              {selectedFile.length > 0 &&
                uploadProgress === 0 &&
                isFileUploaded && (
                  <div className="flex items-center gap-2">
                    {selectedFile.map((file: any) => (
                      <div
                        key={file.path}
                        className="flex text-neutral-600 text-sRegular items-center gap-2"
                      >
                        <p>{file.path}</p>
                      </div>
                    ))}
                  </div>
                )}
              {(!isFileUploaded || !selectedFile.length) && (
                <p className={styles.format}>
                  Max File Size: {`${(fileSize / (1024 * 1024)).toFixed(0)}`}
                  mb
                </p>
              )}
            </div>
            <div className="flex flex-col items-end w-[10%]">
              {uploadProgress > 0 ? (
                <Loader />
              ) : // <p className="text-[14px]">{`${uploadProgress}%`}</p>
              !isFileUploaded ? (
                <AttachMentIcon
                  className={error?.length ? styles.errorStroke : styles.stroke}
                />
              ) : (
                <div onClick={e => e.stopPropagation()}>
                  {isFileUploaded && (
                    <button
                      onClick={() => {
                        handleDeleteAttachment({
                          // setIsFileUploaded: `formState.attachment[${formKey}]`,
                          setSelectedFile: `formState.attachment[${formKey}]`,
                          dispatch
                        });
                      }}
                    >
                      <Image src={deleteIcon} alt="deleteIcon" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {error?.length > 0 && <p className={styles.errorFormat}>{error}</p>}
      </div>
    </>
  );
};

export default FileAttachments;
