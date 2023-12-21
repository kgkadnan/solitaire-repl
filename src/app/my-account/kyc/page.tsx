'use client';
import FileAttachements from '@/components/common/file-attachment';
import React, { useState } from 'react';
import Finger from '@public/assets/icons/noto_backhand-index-pointing-up.svg';
import Image from 'next/image';
import { ManageLocales } from '@/utils/translate';
import { DownloadAndUpload } from '@/components/common/donwlaod-and-upload';
import useAttachmentsStateManagement from './hooks/attachment-state-management';
import { Checkbox } from '@/components/ui/checkbox';

const Kyc = () => {
  const {
    attachmentsState: {
      pan: {
        uploadProgress: uploadPanCardProgress,
        isUploaded: isPanFileUploaded,
        selectedFile: panSelectedFile
      },
      business: {
        uploadProgress: uploadBusinessCardProgress,
        isUploaded: isBusinessFileUploaded,
        selectedFile: businessSelectedFile
      },
      gstCert: {
        uploadProgress: uploadGstCertCardProgress,
        isUploaded: isGstCertFileUploaded,
        selectedFile: gstCertSelectedFile
      },
      incorporationCert: {
        uploadProgress: uploadIncorporationCertCardProgress,
        isUploaded: isIncorporationCertFileUploaded,
        selectedFile: incorporationCertSelectedFile
      },
      cancelChaque: {
        uploadProgress: uploadCancelChaqueCardProgress,
        isUploaded: isCancelChaqueFileUploaded,
        selectedFile: cancelChaqueSelectedFile
      },
      govermentRegCert: {
        uploadProgress: uploadGovermentRegCertCardProgress,
        isUploaded: isGovermentRegCertFileUploaded,
        selectedFile: govermentRegCertSelectedFile
      },
      panOrAdhaar: {
        uploadProgress: uploadPanOrAdhaarCardProgress,
        isUploaded: isPanOrAdhaarFileUploaded,
        selectedFile: panOrAdhaarSelectedFile
      },
      passport: {
        uploadProgress: uploadPassportCardProgress,
        isUploaded: isPassportFileUploaded,
        selectedFile: passportSelectedFile
      },
      photoIdOfPerson: {
        uploadProgress: uploadPhotoIdOfPersonCardProgress,
        isUploaded: isPhotoIdOfPersonFileUploaded,
        selectedFile: photoIdOfPersonSelectedFile
      }
      // Add more types as needed
    },
    attachmentsSetState: {
      setPan: {
        setProgress: setUploadPanCardProgress,
        setIsUploaded: setIsPanFileUploaded,
        setSelectedFile: setPanSelectedFile
      },
      setBusiness: {
        setProgress: setUploadBusinessCardProgress,
        setIsUploaded: setIsBusinessFileUploaded,
        setSelectedFile: setBusinessSelectedFile
      },
      setGstCert: {
        setProgress: setUploadGstCertCardProgress,
        setIsUploaded: setIsGstCertFileUploaded,
        setSelectedFile: setGstCertSelectedFile
      },
      setIncorporationCert: {
        setProgress: setUploadIncorporationCertCardProgress,
        setIsUploaded: setIsIncorporationCertFileUploaded,
        setSelectedFile: setIncorporationCertSelectedFile
      },
      setCancelChaque: {
        setProgress: setUploadCancelChaqueCardProgress,
        setIsUploaded: setIsCancelChaqueFileUploaded,
        setSelectedFile: setCancelChaqueSelectedFile
      },
      setGovermentRegCert: {
        setProgress: setUploadGovermentRegCertCardProgress,
        setIsUploaded: setIsGovermentRegCertFileUploaded,
        setSelectedFile: setGovermentRegCertSelectedFile
      },
      setPanOrAdhaar: {
        setProgress: setUploadPanOrAdhaarCardProgress,
        setIsUploaded: setIsPanOrAdhaarFileUploaded,
        setSelectedFile: setPanOrAdhaarSelectedFile
      },
      setPassport: {
        setProgress: setUploadPassportCardProgress,
        setIsUploaded: setIsPassportFileUploaded,
        setSelectedFile: setPassportSelectedFile
      },
      setPhotoIdOfPerson: {
        setProgress: setUploadPhotoIdOfPersonCardProgress,
        setIsUploaded: setIsPhotoIdOfPersonFileUploaded,
        setSelectedFile: setPhotoIdOfPersonSelectedFile
      }
      // Add more types as needed
    }
  } = useAttachmentsStateManagement();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [uploadFilePreview, setUploadFilePreview] = useState([]);

  const companyDocument = [
    {
      id: '1',
      label: 'Pan Card',
      isRequired: true,
      uploadProgress: uploadPanCardProgress,
      isFileUploaded: isPanFileUploaded,
      setUploadProgress: setUploadPanCardProgress,
      setIsFileUploaded: setIsPanFileUploaded,
      setSelectedFile: setPanSelectedFile,
      selectedFile: panSelectedFile,
      MAX_FILE: 1
    },
    {
      id: '2',
      label: 'GST Certificate',
      isRequired: true,
      uploadProgress: uploadGstCertCardProgress,
      setUploadProgress: setUploadGstCertCardProgress,
      isFileUploaded: isGstCertFileUploaded,
      setIsFileUploaded: setIsGstCertFileUploaded,
      setSelectedFile: setGstCertSelectedFile,
      selectedFile: gstCertSelectedFile,
      MAX_FILE: 1
    },
    {
      id: '3',
      label: 'Incorporation Certificate',
      isRequired: true,
      uploadProgress: uploadIncorporationCertCardProgress,
      setUploadProgress: setUploadIncorporationCertCardProgress,
      isFileUploaded: isIncorporationCertFileUploaded,
      setIsFileUploaded: setIsIncorporationCertFileUploaded,
      setSelectedFile: setIncorporationCertSelectedFile,
      selectedFile: incorporationCertSelectedFile,
      MAX_FILE: 1
    },
    {
      id: '4',
      label: 'Cancel Chaque',
      isRequired: true,
      uploadProgress: uploadCancelChaqueCardProgress,
      isFileUploaded: isCancelChaqueFileUploaded,
      setUploadProgress: setUploadCancelChaqueCardProgress,
      setIsFileUploaded: setIsCancelChaqueFileUploaded,
      setSelectedFile: setCancelChaqueSelectedFile,
      selectedFile: cancelChaqueSelectedFile,
      MAX_FILE: 1
    },
    {
      id: '5',
      label: 'Goverment Registration Certificate',
      isRequired: true,
      uploadProgress: uploadGovermentRegCertCardProgress,
      isFileUploaded: isGovermentRegCertFileUploaded,
      setUploadProgress: setUploadGovermentRegCertCardProgress,
      setIsFileUploaded: setIsGovermentRegCertFileUploaded,
      setSelectedFile: setGovermentRegCertSelectedFile,
      selectedFile: govermentRegCertSelectedFile,
      MAX_FILE: 1
    },
    {
      id: '6',
      label: 'Business Card',
      isRequired: true,
      uploadProgress: uploadBusinessCardProgress,
      isFileUploaded: isBusinessFileUploaded,
      setUploadProgress: setUploadBusinessCardProgress,
      setIsFileUploaded: setIsBusinessFileUploaded,
      setSelectedFile: setBusinessSelectedFile,
      selectedFile: businessSelectedFile,
      MAX_FILE: 1
    }
  ];
  const companyOwnerDocument = [
    {
      id: '1',
      label: 'Pan Card/Aadhar Card',
      isRequired: true,
      uploadProgress: uploadPanOrAdhaarCardProgress,
      isFileUploaded: isPanOrAdhaarFileUploaded,
      setUploadProgress: setUploadPanOrAdhaarCardProgress,
      setIsFileUploaded: setIsPanOrAdhaarFileUploaded,
      setSelectedFile: setPanOrAdhaarSelectedFile,
      selectedFile: panOrAdhaarSelectedFile,
      MAX_FILE: 1
    },
    {
      id: '2',
      label: 'Passport',
      isRequired: false,
      uploadProgress: uploadPassportCardProgress,
      isFileUploaded: isPassportFileUploaded,
      setUploadProgress: setUploadPassportCardProgress,
      setIsFileUploaded: setIsPassportFileUploaded,
      setSelectedFile: setPassportSelectedFile,
      selectedFile: passportSelectedFile,
      MAX_FILE: 1
    },
    {
      id: '3',
      label: 'Photo ID of person/s authorised to collect goods',
      isRequired: false,
      uploadProgress: uploadPhotoIdOfPersonCardProgress,
      isFileUploaded: isPhotoIdOfPersonFileUploaded,
      setUploadProgress: setUploadPhotoIdOfPersonCardProgress,
      setIsFileUploaded: setIsPhotoIdOfPersonFileUploaded,
      setSelectedFile: setPhotoIdOfPersonSelectedFile,
      selectedFile: photoIdOfPersonSelectedFile,
      MAX_FILE: 3
    }
  ];

  const handleTermAndCondition = () => {};

  return (
    <div>
      <div className="w-full flex justify-between pb-5">
        <DownloadAndUpload
          uploadProgress={uploadProgress}
          isFileUploaded={isFileUploaded}
          setUploadProgress={setUploadProgress}
          setIsFileUploaded={setIsFileUploaded}
          setSelectedFile={setUploadFilePreview}
          selectedFile={uploadFilePreview}
          MAX_FILE={1}
        />
      </div>
      <hr className="border-1 border-solitaireSenary" />
      <div className="flex items-center gap-2 py-5">
        <Image src={Finger} alt={'Finger'} height={36} width={36} />
        <h1 className="text-[17px] text-solitaireTertiary">
          {ManageLocales('app.myProfile.kyc.attachments')}
        </h1>
      </div>
      <div className="flex w-full justify-between pb-5">
        <div className="w-[45%]">
          <h1 className="text-solitaireTertiary mb-3">
            {ManageLocales('app.myProfile.kyc.companyDocuments')}
          </h1>
          <div className="flex flex-col gap-[20px]">
            {companyDocument.map(
              ({
                id,
                label,
                isRequired,
                uploadProgress,
                isFileUploaded,
                setUploadProgress,
                setIsFileUploaded,
                setSelectedFile,
                selectedFile,
                MAX_FILE
              }) => {
                return (
                  <FileAttachements
                    key={id}
                    lable={label}
                    isRequired={isRequired}
                    uploadProgress={uploadProgress}
                    isFileUploaded={isFileUploaded}
                    setUploadProgress={setUploadProgress}
                    setIsFileUploaded={setIsFileUploaded}
                    setSelectedFile={setSelectedFile}
                    selectedFile={selectedFile}
                    MAX_FILE={MAX_FILE}
                  />
                );
              }
            )}
          </div>
        </div>
        <div className="w-[45%]">
          <h1 className="text-solitaireTertiary mb-3">
            {ManageLocales('app.myProfile.kyc.companyOwnerDocuments')}
          </h1>
          <div className="flex flex-col gap-[20px]">
            {companyOwnerDocument.map(
              ({
                id,
                label,
                isRequired,
                uploadProgress,
                isFileUploaded,
                setUploadProgress,
                setIsFileUploaded,
                setSelectedFile,
                selectedFile,
                MAX_FILE
              }) => {
                return (
                  <FileAttachements
                    key={id}
                    lable={label}
                    isRequired={isRequired}
                    uploadProgress={uploadProgress}
                    isFileUploaded={isFileUploaded}
                    setUploadProgress={setUploadProgress}
                    setIsFileUploaded={setIsFileUploaded}
                    setSelectedFile={setSelectedFile}
                    selectedFile={selectedFile}
                    MAX_FILE={MAX_FILE}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
      <hr className="border-1 border-solitaireSenary w-[50%]" />
      <div className="flex py-6 items-center justify-center">
        <div className="pr-3 flex items-center">
          <Checkbox onClick={() => handleTermAndCondition()} />
        </div>
        <div className="text-solitaireTertiary flex gap-1">
          <p>I hereby agree to</p>
          <a
            href="https://kgk.live/terms-condition"
            className="border-b-[1px] border-solid border-solitaireQuaternary"
            target="_blank"
          >
            terms and conditions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Kyc;
