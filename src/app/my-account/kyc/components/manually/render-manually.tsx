'use client';
import FileAttachments from '@/components/common/file-attachment';
import React, { useState } from 'react';
import Finger from '@public/assets/icons/noto_backhand-index-pointing-up.svg';
import Image from 'next/image';
import { ManageLocales } from '@/utils/translate';
import { DownloadAndUpload } from '@/components/common/donwlaod-and-upload';
import { Checkbox } from '@/components/ui/checkbox';
import { useModalStateManagement } from '@/hooks/modal-state-management';

import useAttachmentsStateManagement from '../../hooks/attachment-state-management';

const RenderManually = ({ data }: any) => {
  const {
    attachmentsState: {
      pan: {
        uploadProgress: uploadPanCardProgress,
        isUploaded: isPanFileUploaded,
        selectedFile: panSelectedFile,
        error: panError
      },
      business: {
        uploadProgress: uploadBusinessCardProgress,
        isUploaded: isBusinessFileUploaded,
        selectedFile: businessSelectedFile,
        error: businessError
      },
      gstCert: {
        uploadProgress: uploadGstCertCardProgress,
        isUploaded: isGstCertFileUploaded,
        selectedFile: gstCertSelectedFile,
        error: gstCertError
      },
      incorporationCert: {
        uploadProgress: uploadIncorporationCertCardProgress,
        isUploaded: isIncorporationCertFileUploaded,
        selectedFile: incorporationCertSelectedFile,
        error: incorporationCertError
      },
      cancelChaque: {
        uploadProgress: uploadCancelChaqueCardProgress,
        isUploaded: isCancelChaqueFileUploaded,
        selectedFile: cancelChaqueSelectedFile,
        error: cancelChaqueError
      },
      govermentRegCert: {
        uploadProgress: uploadGovermentRegCertCardProgress,
        isUploaded: isGovermentRegCertFileUploaded,
        selectedFile: govermentRegCertSelectedFile,
        error: govermentRegCertError
      },
      panOrAdhaar: {
        uploadProgress: uploadPanOrAdhaarCardProgress,
        isUploaded: isPanOrAdhaarFileUploaded,
        selectedFile: panOrAdhaarSelectedFile,
        error: panOrAdhaarError
      },
      section194Q: {
        uploadProgress: uploadSection194QCardProgress,
        isUploaded: isSection194QFileUploaded,
        selectedFile: section194QSelectedFile,
        error: section194QError
      },
      passport: {
        uploadProgress: uploadPassportCardProgress,
        isUploaded: isPassportFileUploaded,
        selectedFile: passportSelectedFile,
        error: passportError
      },
      photoIdOfPerson1: {
        uploadProgress: uploadPhotoIdOfPerson1CardProgress,
        isUploaded: isPhotoIdOfPerson1FileUploaded,
        selectedFile: photoIdOfPerson1SelectedFile,
        error: photoIdOfPerson1Error
      },
      photoIdOfPerson2: {
        uploadProgress: uploadPhotoIdOfPerson2CardProgress,
        isUploaded: isPhotoIdOfPerson2FileUploaded,
        selectedFile: photoIdOfPerson2SelectedFile,
        error: photoIdOfPerson2Error
      },
      photoIdOfPerson3: {
        uploadProgress: uploadPhotoIdOfPerson3CardProgress,
        isUploaded: isPhotoIdOfPerson3FileUploaded,
        selectedFile: photoIdOfPerson3SelectedFile,
        error: photoIdOfPerson3Error
      }
      // Add more types as needed
    },
    attachmentsSetState: {
      setPan: {
        setProgress: setUploadPanCardProgress,
        setIsUploaded: setIsPanFileUploaded,
        setSelectedFile: setPanSelectedFile,
        setError: setPanError
      },
      setBusiness: {
        setProgress: setUploadBusinessCardProgress,
        setIsUploaded: setIsBusinessFileUploaded,
        setSelectedFile: setBusinessSelectedFile,
        setError: setBusinessError
      },
      setGstCert: {
        setProgress: setUploadGstCertCardProgress,
        setIsUploaded: setIsGstCertFileUploaded,
        setSelectedFile: setGstCertSelectedFile,
        setError: setGstCertError
      },
      setIncorporationCert: {
        setProgress: setUploadIncorporationCertCardProgress,
        setIsUploaded: setIsIncorporationCertFileUploaded,
        setSelectedFile: setIncorporationCertSelectedFile,
        setError: setIncorporationCertError
      },
      setSection194Q: {
        setProgress: setUploadSection194QCardProgress,
        setIsUploaded: setIsSection194QFileUploaded,
        setSelectedFile: setSection194QSelectedFile,
        setError: setSection194QError
      },
      setCancelChaque: {
        setProgress: setUploadCancelChaqueCardProgress,
        setIsUploaded: setIsCancelChaqueFileUploaded,
        setSelectedFile: setCancelChaqueSelectedFile,
        setError: setCancelChaqueError
      },
      setGovermentRegCert: {
        setProgress: setUploadGovermentRegCertCardProgress,
        setIsUploaded: setIsGovermentRegCertFileUploaded,
        setSelectedFile: setGovermentRegCertSelectedFile,
        setError: setGovermentRegCertError
      },
      setPanOrAdhaar: {
        setProgress: setUploadPanOrAdhaarCardProgress,
        setIsUploaded: setIsPanOrAdhaarFileUploaded,
        setSelectedFile: setPanOrAdhaarSelectedFile,
        setError: setPanOrAdhaarError
      },
      setPassport: {
        setProgress: setUploadPassportCardProgress,
        setIsUploaded: setIsPassportFileUploaded,
        setSelectedFile: setPassportSelectedFile,
        setError: setPassportError
      },
      setPhotoIdOfPerson1: {
        setProgress: setUploadPhotoIdOfPerson1CardProgress,
        setIsUploaded: setIsPhotoIdOfPerson1FileUploaded,
        setSelectedFile: setPhotoIdOfPerson1SelectedFile,
        setError: setPhotoIdOfPerson1Error
      },
      setPhotoIdOfPerson2: {
        setProgress: setUploadPhotoIdOfPerson2CardProgress,
        setIsUploaded: setIsPhotoIdOfPerson2FileUploaded,
        setSelectedFile: setPhotoIdOfPerson2SelectedFile,
        setError: setPhotoIdOfPerson2Error
      },
      setPhotoIdOfPerson3: {
        setProgress: setUploadPhotoIdOfPerson3CardProgress,
        setIsUploaded: setIsPhotoIdOfPerson3FileUploaded,
        setSelectedFile: setPhotoIdOfPerson3SelectedFile,
        setError: setPhotoIdOfPerson3Error
      }
      // Add more types as needed
    }
  } = useAttachmentsStateManagement();

  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [uploadFilePreview, setUploadFilePreview] = useState<string[]>([]);

  const { modalState, modalSetState } = useModalStateManagement();

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
      error: panError,
      setError: setPanError,
      maxFile: 1,
      minFile: 1
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
      error: gstCertError,
      setError: setGstCertError,
      maxFile: 1,
      minFile: 1
    },
    {
      id: '3',
      label: 'Incorporation Certificate or ISE copy*',
      isRequired: true,
      uploadProgress: uploadIncorporationCertCardProgress,
      setUploadProgress: setUploadIncorporationCertCardProgress,
      isFileUploaded: isIncorporationCertFileUploaded,
      setIsFileUploaded: setIsIncorporationCertFileUploaded,
      setSelectedFile: setIncorporationCertSelectedFile,
      selectedFile: incorporationCertSelectedFile,
      error: incorporationCertError,
      setError: setIncorporationCertError,
      maxFile: 1,
      minFile: 1
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
      error: cancelChaqueError,
      setError: setCancelChaqueError,
      maxFile: 1,
      minFile: 1
    },
    {
      id: '5',
      label: 'Section 194Q',
      isRequired: true,
      uploadProgress: uploadSection194QCardProgress,
      isFileUploaded: isSection194QFileUploaded,
      setUploadProgress: setUploadSection194QCardProgress,
      setIsFileUploaded: setIsSection194QFileUploaded,
      setSelectedFile: setSection194QSelectedFile,
      selectedFile: section194QSelectedFile,
      error: section194QError,
      setError: setSection194QError,
      maxFile: 1,
      minFile: 1
    },
    {
      id: '6',
      label: 'Goverment Registration Certificate',
      isRequired: true,
      uploadProgress: uploadGovermentRegCertCardProgress,
      isFileUploaded: isGovermentRegCertFileUploaded,
      setUploadProgress: setUploadGovermentRegCertCardProgress,
      setIsFileUploaded: setIsGovermentRegCertFileUploaded,
      setSelectedFile: setGovermentRegCertSelectedFile,
      selectedFile: govermentRegCertSelectedFile,
      error: govermentRegCertError,
      setError: setGovermentRegCertError,
      maxFile: 1,
      minFile: 1
    },
    {
      id: '7',
      label: 'Business Card',
      isRequired: false,
      uploadProgress: uploadBusinessCardProgress,
      isFileUploaded: isBusinessFileUploaded,
      setUploadProgress: setUploadBusinessCardProgress,
      setIsFileUploaded: setIsBusinessFileUploaded,
      setSelectedFile: setBusinessSelectedFile,
      selectedFile: businessSelectedFile,
      error: businessError,
      setError: setBusinessError,
      maxFile: 1,
      minFile: 0
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
      error: panOrAdhaarError,
      setError: setPanOrAdhaarError,
      maxFile: 1,
      minFile: 1
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
      error: passportError,
      setError: setPassportError,
      maxFile: 1,
      minFile: 0
    }
  ];
  const photoId = [
    {
      id: '1',
      label: 'Photo ID 1',
      isRequired: false,
      uploadProgress: uploadPhotoIdOfPerson1CardProgress,
      isFileUploaded: isPhotoIdOfPerson1FileUploaded,
      setUploadProgress: setUploadPhotoIdOfPerson1CardProgress,
      setIsFileUploaded: setIsPhotoIdOfPerson1FileUploaded,
      setSelectedFile: setPhotoIdOfPerson1SelectedFile,
      selectedFile: photoIdOfPerson1SelectedFile,
      error: photoIdOfPerson1Error,
      setError: setPhotoIdOfPerson1Error,
      maxFile: 1,
      minFile: 0
    },
    {
      id: '2',
      label: 'Photo ID 2',
      isRequired: false,
      uploadProgress: uploadPhotoIdOfPerson2CardProgress,
      isFileUploaded: isPhotoIdOfPerson2FileUploaded,
      setUploadProgress: setUploadPhotoIdOfPerson2CardProgress,
      setIsFileUploaded: setIsPhotoIdOfPerson2FileUploaded,
      setSelectedFile: setPhotoIdOfPerson2SelectedFile,
      selectedFile: photoIdOfPerson2SelectedFile,
      error: photoIdOfPerson2Error,
      setError: setPhotoIdOfPerson2Error,
      maxFile: 1,
      minFile: 0
    },
    {
      id: '3',
      label: 'Photo ID 3',
      isRequired: false,
      uploadProgress: uploadPhotoIdOfPerson3CardProgress,
      isFileUploaded: isPhotoIdOfPerson3FileUploaded,
      setUploadProgress: setUploadPhotoIdOfPerson3CardProgress,
      setIsFileUploaded: setIsPhotoIdOfPerson3FileUploaded,
      setSelectedFile: setPhotoIdOfPerson3SelectedFile,
      selectedFile: photoIdOfPerson3SelectedFile,
      error: photoIdOfPerson3Error,
      setError: setPhotoIdOfPerson3Error,
      maxFile: 1,
      minFile: 0
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
          maxFile={1}
          modalSetState={modalSetState}
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
                setError,
                error,
                maxFile,
                minFile
              }) => {
                return (
                  <FileAttachments
                    key={id}
                    lable={label}
                    isRequired={isRequired}
                    uploadProgress={uploadProgress}
                    isFileUploaded={isFileUploaded}
                    setUploadProgress={setUploadProgress}
                    setIsFileUploaded={setIsFileUploaded}
                    setSelectedFile={setSelectedFile}
                    selectedFile={selectedFile}
                    maxFile={maxFile}
                    setError={setError}
                    error={error}
                    modalSetState={modalSetState}
                    minFile={minFile}
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
                setError,
                error,
                maxFile,
                minFile
              }) => {
                return (
                  <FileAttachments
                    key={id}
                    lable={label}
                    isRequired={isRequired}
                    uploadProgress={uploadProgress}
                    isFileUploaded={isFileUploaded}
                    setUploadProgress={setUploadProgress}
                    setIsFileUploaded={setIsFileUploaded}
                    setSelectedFile={setSelectedFile}
                    selectedFile={selectedFile}
                    setError={setError}
                    error={error}
                    maxFile={maxFile}
                    modalSetState={modalSetState}
                    minFile={minFile}
                  />
                );
              }
            )}
          </div>
          <h1 className="text-solitaireTertiary my-3">
            {ManageLocales('app.myProfile.kyc.photoId')}
          </h1>
          <div className="flex flex-col gap-[20px]">
            {photoId.map(
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
                setError,
                error,
                maxFile,
                minFile
              }) => {
                return (
                  <FileAttachments
                    key={id}
                    lable={label}
                    isRequired={isRequired}
                    uploadProgress={uploadProgress}
                    isFileUploaded={isFileUploaded}
                    setUploadProgress={setUploadProgress}
                    setIsFileUploaded={setIsFileUploaded}
                    setSelectedFile={setSelectedFile}
                    selectedFile={selectedFile}
                    maxFile={maxFile}
                    setError={setError}
                    error={error}
                    modalSetState={modalSetState}
                    minFile={minFile}
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

export default RenderManually;
