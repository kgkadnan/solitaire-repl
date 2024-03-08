import { ALLOWED_FILE_TYPES } from '@/constants/business-logic';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import mediaIcon from '@public/v2/assets/icons/attachment/media-icon.svg';
import errorIcon from 'public/v2/assets/icons/attachment/error-icon.svg';
import AttachMentIcon from '@public/v2/assets/icons/attachment/attachment.svg?url';
import Loader from '@/components/v2/common/file-attachment/component/loader';
import { Label } from '@/components/ui/label';
import styles from './profile-update.module.scss';
import {
  useLazyGetProfilePhotoQuery,
  useUpdateProfilePhotoMutation
} from '@/features/api/my-account';
import deleteIcon from '@public/v2/assets/icons/attachment/delete-icon.svg';

const ProfileUpdate = () => {
  const [updateProfilePhoto] = useUpdateProfilePhotoMutation({});
  const [triggerGetProfilePhoto] = useLazyGetProfilePhotoQuery({});

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

  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const getPhoto = async () => {
      // await triggerGetProfilePhoto({ size: 128 })
      //   .unwrap()
      //   .then((res: any) => {
      //     console.log(res);
      //   });
      fetch(`${apiURL}/store/account/profile/${128}`)
        .then(response => response.blob())
        .then(blob => {
          console.log(blob);
          // Do something with the image data
        });
    };
    getPhoto();
  }, []);

  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<any>({});
  const [error, setError] = useState('');

  const buildFormData = ({ acceptedFiles, key }: any) => {
    const formData = new FormData();

    acceptedFiles.forEach((file: any) => {
      formData.append(key, file);
    });

    return formData;
  };

  const handleFileUpload = async ({ acceptedFiles }: any) => {
    try {
      if (acceptedFiles.length) {
        setIsFileUploaded(false);

        acceptedFiles.forEach((file: any) => {
          setSelectedFile({ url: file.name });
        });

        const simulateUpload = async () => {
          return new Promise<void>(resolve => {
            setTimeout(() => {
              resolve();
            }, 1000); // Simulate a 1-second delay
          });
        };

        setUploadProgress(0);
        for (let i = 0; i <= 100; i += 50) {
          setUploadProgress(i);
          await simulateUpload(); // Simulate a delay between progress updates
        }
        setUploadProgress(0);
        setIsFileUploaded(true);
      }
    } catch (error) {
      // Log an error message if the upload fails
      console.error('File upload failed:', error);
    }
  };

  const onDrop = async (acceptedFiles: any) => {
    updateProfilePhoto(buildFormData({ acceptedFiles, key: 'profile' }))
      .unwrap()
      .then(() => {
        handleFileUpload({ acceptedFiles });
      });
  };

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ALLOWED_FILE_TYPES,
    maxSize: 20 * 1024 * 1024,
    maxFiles: 1
  });
  useEffect(() => {
    if (fileRejections?.length) {
      setError(fileRejections[0].errors[0].code);
    }
  }, [fileRejections]);

  return (
    <div className="w-full flex flex-col items-center mt-[16px]  min-h-[71vh]">
      <div className="w-[760px] flex flex-col gap-[16px]">
        <h1 className="text-neutral-900 text-headingS font-medium">
          Upload Profile Picture
        </h1>
        <div className="h-[72px]">
          <div
            {...getRootProps()}
            style={dropzoneStyle}
            className={`flex items-center bg-neutral0  rounded-[10px]  border-[1px] ${
              error.length ? 'border-dangerMain' : 'border-neutral-200'
            } ${
              isFileUploaded || error.length
                ? 'border-solid shadow-sm'
                : 'border-dashed'
            }`}
          >
            <div className="w-[10%] mb-[15px] flex items-start">
              {!error?.length ? (
                <Image src={mediaIcon} alt="mediaIcon" />
              ) : (
                <Image src={errorIcon} alt="errorIcon" />
              )}
            </div>

            <input {...getInputProps()} name="attachment" />

            <div className=" flex flex-col w-[80%] text-left ">
              <div className="flex flex-col w-[80%] text-left">
                <div className="flex ">
                  <Label className={` ${styles.label} `}>
                    Drag & Drop or Upload
                  </Label>
                </div>
                <div>
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
                      Accepted File Type - Png, Jpg, Svg{' '}
                    </p>
                  )}
                </div>
              </div>
              {!Object.keys(selectedFile).length && (
                <p className={`${styles.format} mt-1`}>Max File Size: 20 mb</p>
              )}
            </div>
            <div className="flex flex-col items-end w-[10%]">
              {uploadProgress > 0 ? (
                <Loader />
              ) : // <p className="text-[14px]">{`${uploadProgress}%`}</p>
              !Object.keys(selectedFile).length ? (
                <AttachMentIcon
                  className={error?.length ? styles.errorStroke : styles.stroke}
                />
              ) : (
                <div onClick={e => e.stopPropagation()}>
                  {Object.keys(selectedFile).length && isFileUploaded && (
                    <button
                      onClick={() => {
                        // handleDeleteAttachment({ key: formKey });
                      }}
                    >
                      <Image src={deleteIcon} alt="deleteIcon" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {error?.length > 0 && <p className={styles.errorFormat}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
