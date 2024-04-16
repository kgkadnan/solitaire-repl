import React, { useEffect } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import downloadKycIcon from '@public/v2/assets/icons/attachment/download-kyc.svg';
import styles from './download-and-upload.module.scss';
import { ALLOWED_FILE_TYPES } from '@/constants/business-logic';
import { useAppDispatch } from '@/hooks/hook';
import { useLazyGetKycPdfQuery } from '@/features/api/kyc';
import { updateFormState } from '@/features/kyc/kyc';
import mediaIcon from '@public/v2/assets/icons/attachment/media-icon.svg';
import errorIcon from 'public/v2/assets/icons/attachment/error-icon.svg';
import Loader from '../file-attachment/component/loader';
import deleteIcon from '@public/v2/assets/icons/attachment/delete-icon.svg';
import AttachMentIcon from '@public/v2/assets/icons/attachment/attachment.svg?url';
import { Label } from '../../ui/label';

interface IDownloadAndUpload {
  formState: any;
  maxFile: number;
  selectedCountry: string;
  formErrorState: any;
  fileUpload: any;
  handleDeleteAttachment: any;
}

export const DownloadAndUpload = ({
  formState,
  formErrorState,
  maxFile,
  selectedCountry,
  fileUpload,
  handleDeleteAttachment
}: IDownloadAndUpload) => {
  const [fetchTrigger] = useLazyGetKycPdfQuery({});

  const dropzoneStyle = {
    borderRadius: '8px',
    padding: '15px 20px',
    textAlign: 'center',
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px'
  };

  const dispatch = useAppDispatch();
  const onDrop = (acceptedFiles: any) => {
    fileUpload({ acceptedFiles, key: 'upload_form' });
  };

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ALLOWED_FILE_TYPES,
    maxSize: 20 * 1024 * 1024,
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

  let uploadProgress = formState?.attachment?.upload_form?.uploadProgress ?? 0;
  let isFileUploaded = formState?.attachment?.upload_form?.isFileUploaded ?? '';
  let selectedFile = formState?.attachment?.upload_form ?? '';

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
        className="rounded-[8px] w-[960px] "
        style={{
          background: `linear-gradient(45deg, hsla(198, 85%, 92%, 1), hsla(240, 100%, 95%, 1), hsla(36, 100%, 95%, 1))`
        }}
      >
        <div className="flex gap-5 justify-between items-center  py-[32px] px-[26px] ">
          <div className="w-full flex flex-col gap-[12px]">
            <h1 className="text-lRegular text-neutral-600 font-lRegular">
              {' '}
              Download the KYC form here
            </h1>
            <div
              className=" h-[72px] bg-neutral0 border-[1px] border-solid border-neutral-200 rounded-[4px] shadow-sm flex  justify-center gap-3 items-center  cursor-pointer"
              onClick={() => {
                handleDownloadFile();
              }}
            >
              <Image src={downloadKycIcon} alt="downloadKycIcon" />

              <p className="text-neutral-900 font-mMedium text-mMedium">
                Download KYC
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-[12px]">
            <h1 className="text-lRegular text-neutral-600 font-lRegular">
              {' '}
              Upload the KYC form here
            </h1>
            <div className="h-[72px]">
              <div
                {...getRootProps()}
                style={dropzoneStyle}
                className={`flex items-center bg-neutral0  rounded-[8px]  border-[1px] ${
                  error.length ? 'border-dangerMain' : 'border-neutral-200'
                } ${
                  isFileUploaded || error.length
                    ? 'border-solid shadow-sm'
                    : 'border-dashed'
                }`}
              >
                <div className="w-[10%] flex items-start">
                  {!error?.length ? (
                    <Image src={mediaIcon} alt="mediaIcon" />
                  ) : (
                    <Image src={errorIcon} alt="errorIcon" />
                  )}
                </div>

                {Object.keys(selectedFile).length < maxFile && (
                  <input {...getInputProps()} name="attachment" />
                )}
                <div className=" flex flex-col w-[80%] text-left ">
                  <div className="flex ">
                    <Label className={` ${styles.label} `}>Upload KYC</Label>
                  </div>
                  {Object.keys(selectedFile).length > 0 &&
                    uploadProgress === 0 &&
                    isFileUploaded && (
                      <div className="flex items-center gap-2">
                        <div className="flex text-neutral-600 text-sRegular items-center gap-2">
                          <p>{selectedFile.url}</p>
                        </div>
                      </div>
                    )}
                  {!Object.keys(selectedFile).length && (
                    <p className={styles.format}>
                      Upload the filled KYC form here | Max file size: 20 mb
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end w-[10%]">
                  {uploadProgress > 0 ? (
                    <Loader />
                  ) : // <p className="text-[14px]">{`${uploadProgress}%`}</p>
                  !Object.keys(selectedFile).length ? (
                    <AttachMentIcon
                      className={
                        error?.length ? styles.errorStroke : styles.stroke
                      }
                    />
                  ) : (
                    <div onClick={e => e.stopPropagation()}>
                      {Object.keys(selectedFile).length && (
                        <button
                          onClick={() => {
                            handleDeleteAttachment({ key: 'upload_form' });
                          }}
                        >
                          <Image src={deleteIcon} alt="deleteIcon" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {error?.length > 0 && (
                <p className={styles.errorFormat}>{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
