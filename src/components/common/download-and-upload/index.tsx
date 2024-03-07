import React, { useEffect } from 'react';
import { ManageLocales } from '@/utils/translate';
import Image from 'next/image';
import downloadOutlineShadow from '@public/assets/icons/download-outline-shadow.svg';
import UploadOutline from '@public/assets/icons/cloud-upload-outline.svg?url';
import { useDropzone } from 'react-dropzone';
import { handleFileupload } from '@/app/my-account/kyc/helper/handle-file-upload';
import greenCheckMarkOutline from '@public/assets/icons/green-checkmark-circle-outline.svg';
import { Progress } from '@/components/ui/progress';
import styles from './download-and-upload.module.scss';
import CustomMenuBar from '../menu-bar';
import eyeOutline from '@public/assets/icons/eye-outline.svg';
import deleteSvg from '@public/assets/icons/delete.svg';
import errorImage from '@public/assets/icons/error.svg';
import ellipsisVertical from '@public/assets/icons/ellipsis-vertical.svg';
import { handlePreview } from '@/app/my-account/kyc/helper/handle-file-preview';
import { handleDeleteAttachment } from '@/app/my-account/kyc/helper/handle-delete-attachment';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '@/constants/business-logic';
import { useAppDispatch } from '@/hooks/hook';
import { IModalSetState } from '@/app/search/result/result-interface';
import { useLazyGetKycPdfQuery } from '@/features/api/kyc';
import { updateFormState } from '@/features/kyc/kyc';

interface IDownloadAndUpload {
  formState: any;
  maxFile: number;
  modalSetState: IModalSetState;
  selectedCountry: string;
  formErrorState: any;
}

export const DownloadAndUpload = ({
  formState,
  formErrorState,
  maxFile,
  modalSetState,
  selectedCountry
}: IDownloadAndUpload) => {
  const { setIsModalOpen, setModalContent } = modalSetState;

  const [fetchTrigger] = useLazyGetKycPdfQuery({});

  const dispatch = useAppDispatch();
  const onDrop = (acceptedFiles: any) => {
    handleFileupload({
      acceptedFiles,
      setUploadProgress: `formState.attachment.upload_form.uploadProgress`,
      setIsFileUploaded: `formState.attachment.upload_form.isFileUploaded`,
      setSelectedFile: `formState.attachment.upload_form.selectedFile`,
      dispatch
    });
    dispatch(
      updateFormState({
        name: 'formErrorState.attachment.upload_form',
        value: ''
      })
    );
  };

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ALLOWED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    maxFiles: maxFile
  });

  useEffect(() => {
    if (fileRejections?.length) {
      dispatch(
        updateFormState({
          name: `formErrorState.attachment.upload_form`,
          value: fileRejections[0].errors[0].code
        })
      );
    }
  }, [fileRejections]);

  let uploadProgress = formState?.attachment?.upload_form?.uploadProgress ?? '';
  let isFileUploaded = formState?.attachment?.upload_form?.isFileUploaded ?? '';
  let selectedFile = formState?.attachment?.upload_form?.selectedFile ?? '';

  let error = formErrorState?.attachment?.upload_form ?? '';

  const handleDownloadFile = () => {
    fetchTrigger({ country: selectedCountry }).then(async res => {
      if (res.data && res.data?.url) {
        const link = document.createElement('a');
        link.href = res.data?.url;
        link.download = selectedCountry || 'downloaded_file';
        window.open(link.href, '_blank');
      }
    });
  };

  return (
    <>
      <div
        className="w-[45%] bg-solitaireSecondary h-[12vh] rounded-[10px] flex flex-col justify-evenly items-center p-3 cursor-pointer"
        onClick={() => {
          handleDownloadFile();
        }}
      >
        <Image
          src={downloadOutlineShadow}
          alt="downloadOutlineShadow"
          width={24}
          height={24}
        />
        <h1 className="text-solitaireTertiary text-[16px]">
          {ManageLocales('app.myProfile.kyc.download')}
        </h1>
        <p className="text-solitaireTertiary font-thin text-[14px]">
          Download the KYC form here
        </p>
      </div>

      <div
        {...getRootProps()}
        className="flex flex-col justify-evenly  h-[12vh] rounded-[10px]   bg-solitaireSecondary items-center p-3 cursor-pointer w-[45%]"
      >
        {selectedFile.length < maxFile && (
          <input {...getInputProps()} name="attachment" />
        )}

        {!error.length ? (
          <UploadOutline className={`${styles.stroke}`} />
        ) : (
          <Image src={errorImage} alt="errorImage" width={30} />
        )}

        {uploadProgress <= 0 && (
          <h1 className={`${error.length ? styles.errorlabel : styles.label}`}>
            {ManageLocales('app.myProfile.kyc.upload')}
          </h1>
        )}

        {selectedFile.length > 0 && uploadProgress === 0 && isFileUploaded && (
          <div className="flex items-center gap-2 justify-evenly w-full h-[3vh]">
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
            <div onClick={e => e.stopPropagation()}>
              {isFileUploaded && (
                <CustomMenuBar
                  menuTrigger={
                    <Image
                      src={ellipsisVertical}
                      alt="ellipsisVertical"
                      className="cursor-pointer"
                      height={20}
                      width={20}
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
                          // setIsFileUploaded: `formState.attachment.upload_form.isFileUploaded`,
                          setSelectedFile: `formState.attachment.upload_form`,
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
          </div>
        )}

        {uploadProgress > 0 && (
          <div className="flex items-center w-[90%] justify-between">
            <div className="w-[95%]">
              <Progress value={uploadProgress} className={'flex-none'} />
            </div>
            <p className="text-[14px]">{`${uploadProgress}%`}</p>
          </div>
        )}

        {(!isFileUploaded || !selectedFile.length) &&
          (!error.length ? (
            <p className={error.length ? styles.errorFormat : styles.format}>
              Upload the filled KYC form here | Max file size: 100 mb
            </p>
          ) : (
            <p className={styles.errorFormat} key={error}>
              {error}
            </p>
          ))}
      </div>
    </>
  );
};
