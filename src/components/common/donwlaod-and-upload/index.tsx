import { ManageLocales } from '@/utils/translate';
import Image from 'next/image';
import donwloadOutlineShadow from '@public/assets/icons/download-outline-shadow.svg';
import UploadOutline from '@public/assets/icons/cloud-upload-outline.svg?url';
import { useDropzone } from 'react-dropzone';
import { handleFileupload } from '@/app/my-account/kyc/helper/handle-file-upload';
import greenCheckMarkOutline from '@public/assets/icons/green-checkmark-circle-outline.svg';
import { Progress } from '@/components/ui/progress';
import styles from './download-and-upload.module.scss';

const ALLOWED_FILE_TYPES = {
  'application/msword': [],
  'image/jpeg': [],
  'application/pdf': []
};
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const DownloadAndUpload = ({
  uploadProgress,
  isFileUploaded,
  setUploadProgress,
  setIsFileUploaded,
  setSelectedFile,
  selectedFile,
  MAX_FILE
}: any) => {
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

  const handleKycFormDownload = () => {
    // Create a link element
    const link = document.createElement('a');
    link.href = 'assets/images/User_Registration.PNG'; // Set the file URL

    link.download = 'KYC Form'; // Set the file name when downloaded
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Remove the link from the document
  };

  return (
    <>
      <div
        className="w-[45%] bg-solitaireSecondary h-[12vh] rounded-[10px] flex flex-col justify-evenly items-center p-3 cursor-pointer"
        onClick={handleKycFormDownload}
      >
        <Image
          src={donwloadOutlineShadow}
          alt="donwloadOutlineShadow"
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
        className="w-[45%] bg-solitaireSecondary h-[12vh] rounded-[10px] flex flex-col justify-evenly items-center p-3 cursor-pointer"
      >
        {selectedFile.length < MAX_FILE && (
          <input {...getInputProps()} name="attachment" />
        )}
        <UploadOutline
          className={`${
            fileRejections.length ? styles.errorStroke : styles.stroke
          }`}
        />
        <h1
          className={`${
            fileRejections.length ? styles.errorlabel : styles.label
          }`}
        >
          {ManageLocales('app.myProfile.kyc.upload')}
        </h1>
        {selectedFile.length > 0 && uploadProgress === 0 && isFileUploaded && (
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
          <div className="flex items-center w-[90%] justify-between">
            <div className="w-[95%]">
              <Progress value={uploadProgress} className={'flex-none'} />
            </div>
            <p className="text-[14px]">{`${uploadProgress}%`}</p>
          </div>
        )}

        {(!isFileUploaded || !selectedFile.length) && (
          <p
            className={`${
              fileRejections.length ? styles.errorFormat : styles.format
            }`}
          >
            Upload the filled KYC form here | Max file size: 100 mb
          </p>
        )}
      </div>
    </>
  );
};
