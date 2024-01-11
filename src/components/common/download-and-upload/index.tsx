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
import { MAX_FILE_SIZE } from '@/constants/business-logic';
import { useAppDispatch } from '@/hooks/hook';
import { IModalSetState } from '@/app/search/result/result-interface';
import { useLazyGetKycPdfQuery } from '@/features/api/kyc';

const ALLOWED_FILE_TYPES = {
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx'
  ],
  'image/jpeg': [],
  'application/pdf': []
};

interface IDownloadAndUpload {
  formState: any;
  maxFile: number;
  modalSetState: IModalSetState;
  selectedCountry: string;
}

export const DownloadAndUpload = ({
  formState,
  maxFile,
  modalSetState,
  selectedCountry
}: IDownloadAndUpload) => {
  const { setIsModalOpen, setModalContent } = modalSetState;
  const [getKycPdf, pdf] = useLazyGetKycPdfQuery();

  const dispatch = useAppDispatch();
  const onDrop = (acceptedFiles: any) => {
    handleFileupload({
      acceptedFiles,
      setUploadProgress: `formState.offline.upload.uploadProgress`,
      setIsFileUploaded: `formState.offline.upload.isFileUploaded`,
      setSelectedFile: `formState.offline.upload.selectedFile`,
      dispatch
    });
  };

  let uploadProgress = formState?.offline?.upload?.uploadProgress ?? '';
  let isFileUploaded = formState?.offline?.upload?.isFileUploaded ?? '';
  let selectedFile = formState?.offline?.upload?.selectedFile ?? '';

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ALLOWED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    maxFiles: maxFile
  });

  const handleKycFormDownload = () => {
    getKycPdf({ country: selectedCountry });
  };

  useEffect(() => {
    if (pdf && pdf?.data) {
      const link = document.createElement('a');
      link.href = pdf.data.url;
      link.download = selectedCountry || 'downloaded_file';
      window.open(link.href, '_blank');
    }
  }, [pdf]);

  return (
    <>
      <div
        className="w-[45%] bg-solitaireSecondary h-[12vh] rounded-[10px] flex flex-col justify-evenly items-center p-3 cursor-pointer"
        onClick={handleKycFormDownload}
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

        {!fileRejections.length ? (
          <UploadOutline className={`${styles.stroke}`} />
        ) : (
          <Image src={errorImage} alt="errorImage" width={30} />
        )}
        <h1
          className={`${
            fileRejections.length ? styles.errorlabel : styles.label
          }`}
        >
          {ManageLocales('app.myProfile.kyc.upload')}
        </h1>

        {selectedFile.length > 0 && uploadProgress === 0 && isFileUploaded && (
          <div className="flex items-center gap-2 justify-evenly w-full">
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
                          setIsFileUploaded: `formState.attachment.upload.isFileUploaded`,
                          setSelectedFile: `formState.attachment.upload.selectedFile`,
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
          (!fileRejections.length ? (
            <p
              className={
                fileRejections.length ? styles.errorFormat : styles.format
              }
            >
              Upload the filled KYC form here | Max file size: 100 mb
            </p>
          ) : (
            <p
              className={styles.errorFormat}
              key={fileRejections[0].errors[0].code}
            >
              {fileRejections[0].errors[0].code}
            </p>
          ))}
      </div>
    </>
  );
};
