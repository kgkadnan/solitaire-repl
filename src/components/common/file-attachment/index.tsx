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
// import { IModalSetState } from '@/app/search/result/result-interface';
import { handleDeleteAttachment } from '@/app/my-account/kyc/helper/handle-delete-attachment';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/constants/business-logic';
import { useAppDispatch } from '@/hooks/hook';
import { updateFormState } from '@/features/kyc/kyc';
import { CustomModal } from '../modal';
import { IModalSetState } from '@/app/search/result/result-interface';

interface IFileAttachments {
  lable: string;
  isRequired: boolean;
  formState: any;
  formKey: string;
  maxFile: number;
  minFile: number;
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
  modalState,
  modalSetState
}) => {
  const { setIsModalOpen, setModalContent } = modalSetState;
  const { isModalOpen, modalContent } = modalState;
  const dispatch = useAppDispatch();
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
    maxSize: MAX_FILE_SIZE,
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
      <CustomModal
        isOpens={isModalOpen}
        setIsOpen={setIsModalOpen}
        dialogContent={modalContent}
        modalStyle={styles.modalStyle}
      />
      <div className="flex items-center bg-solitaireSecondary rounded-[10px] px-3 w-full h-[9vh]">
        <div {...getRootProps()} style={dropzoneStyle}>
          <div className="w-[10%] flex items-start">
            {!error?.length ? (
              <DocumentOutline className={`${styles.stroke}`} />
            ) : (
              <Image src={errorImage} alt="errorImage" width={40} />
            )}
          </div>

          {selectedFile.length < maxFile && (
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
                <p
                  className={error?.length ? styles.errorFormat : styles.format}
                >
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
                          handleDeleteAttachment({
                            // setIsFileUploaded: `formState.attachment[${formKey}]`,
                            setSelectedFile: `formState.attachment[${formKey}]`,
                            dispatch
                          })
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
    </>
  );
};

export default FileAttachments;
