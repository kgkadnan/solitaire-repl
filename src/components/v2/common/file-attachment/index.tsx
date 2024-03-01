import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import AttachMentIcon from '@public/v2/assets/icons/attachment/attachment.svg?url';
import errorIcon from 'public/v2/assets/icons/attachment/error-icon.svg';
import Image from 'next/image';
import mediaIcon from '@public/v2/assets/icons/attachment/media-icon.svg';
import styles from './file-attachment.module.scss';
import greenCheckMarkOutline from '@public/assets/icons/green-checkmark-circle-outline.svg';
import deleteIcon from '@public/v2/assets/icons/attachment/delete-icon.svg';

import { handleFileupload } from '@/app/my-account/kyc/helper/handle-file-upload';
// import { IModalSetState } from '@/app/search/result/result-interface';

import { ALLOWED_FILE_TYPES } from '@/constants/business-logic';
import { useAppDispatch } from '@/hooks/hook';
import { updateFormState } from '@/features/kyc/kyc';
import { IModalSetState } from '@/app/search/result/result-interface';
import { Label } from '@/components/ui/label';
import Loader from '../loader';
import { handleDeleteAttachment } from '@/app/v2/kyc/helper/handle-delete-attachment';

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
}

const FileAttachments: React.FC<IFileAttachments> = ({
  lable,
  isRequired,
  formState,
  formKey,
  maxFile,
  minFile,
  formErrorState,
  fileSize
  // modalState,
  // modalSetState
}) => {
  const dispatch = useAppDispatch();
  const dropzoneStyle = {
    borderRadius: '10px',
    padding: '13px 20px',
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
    handleFileupload({
      acceptedFiles,
      setUploadProgress: `formState.attachment[${formKey}].uploadProgress`,
      setIsFileUploaded: `formState.attachment[${formKey}].isFileUploaded`,
      setSelectedFile: `formState.attachment[${formKey}].selectedFile`,
      dispatch
    });
    dispatch(
      updateFormState({
        name: `formErrorState.attachment[${formKey}]`,
        value: ''
      })
    );
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
      {/* <CustomModal
        isOpens={isModalOpen}
        setIsOpen={setIsModalOpen}
        dialogContent={modalContent}
        modalStyle={styles.modalStyle}
      /> */}
      <div
        className={`flex items-center bg-neutral25 rounded-[10px]  w-full  border-[1px] border-neutral-200 ${
          isFileUploaded ? 'border-solid shadow-popupsShadow' : 'border-dashed'
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
          <div className=" flex flex-col w-[80%] text-left gap-1">
            <div className="flex ">
              <Label
                className={` ${
                  error?.length ? styles.errorlabel : styles.label
                } `}
              >
                {lable}
              </Label>

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
            {(!isFileUploaded || !selectedFile.length) &&
              (!error?.length ? (
                <p
                  className={error?.length ? styles.errorFormat : styles.format}
                >
                  Max File Size: {`${(fileSize / (1024 * 1024)).toFixed(0)}`}mb
                </p>
              ) : (
                <p className={styles.errorFormat}>{error}</p>
              ))}
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
    </>
  );
};

export default FileAttachments;
