import { useState } from 'react';

const useAttachmentsStateManagement = () => {
  // State for Pan Card
  const [uploadPanCardProgress, setUploadPanCardProgress] = useState(0);
  const [isPanFileUploaded, setIsPanFileUploaded] = useState(false);
  const [panSelectedFile, setPanSelectedFile] = useState([]);

  // State for Business Card
  const [uploadBusinessCardProgress, setUploadBusinessCardProgress] =
    useState(0);
  const [isBusinessFileUploaded, setIsBusinessFileUploaded] = useState(false);
  const [businessSelectedFile, setBusinessSelectedFile] = useState([]);

  // State for GST Certificate
  const [uploadGstCertCardProgress, setUploadGstCertCardProgress] = useState(0);
  const [isGstCertFileUploaded, setIsGstCertFileUploaded] = useState(false);
  const [gstCertSelectedFile, setGstCertSelectedFile] = useState([]);

  // State for Incorporation Certificate
  const [
    uploadIncorporationCertCardProgress,
    setUploadIncorporationCertCardProgress
  ] = useState(0);
  const [isIncorporationCertFileUploaded, setIsIncorporationCertFileUploaded] =
    useState(false);
  const [incorporationCertSelectedFile, setIncorporationCertSelectedFile] =
    useState([]);

  // State for Cancelled Cheque
  const [uploadCancelChaqueCardProgress, setUploadCancelChaqueCardProgress] =
    useState(0);
  const [isCancelChaqueFileUploaded, setIsCancelChaqueFileUploaded] =
    useState(false);
  const [cancelChaqueSelectedFile, setCancelChaqueSelectedFile] = useState([]);

  // State for Government Registration Certificate
  const [
    uploadGovermentRegCertCardProgress,
    setUploadGovermentRegCertCardProgress
  ] = useState(0);
  const [isGovermentRegCertFileUploaded, setIsGovermentRegCertFileUploaded] =
    useState(false);
  const [govermentRegCertSelectedFile, setGovermentRegCertSelectedFile] =
    useState([]);

  // State for PAN or Aadhaar Card
  const [uploadPanOrAdhaarCardProgress, setUploadPanOrAdhaarCardProgress] =
    useState(0);
  const [isPanOrAdhaarFileUploaded, setIsPanOrAdhaarFileUploaded] =
    useState(false);
  const [panOrAdhaarSelectedFile, setPanOrAdhaarSelectedFile] = useState([]);

  // State for Passport
  const [uploadPassportCardProgress, setUploadPassportCardProgress] =
    useState(0);
  const [isPassportFileUploaded, setIsPassportFileUploaded] = useState(false);
  const [passportSelectedFile, setPassportSelectedFile] = useState([]);

  // State for Photo ID of Person
  const [
    uploadPhotoIdOfPersonCardProgress,
    setUploadPhotoIdOfPersonCardProgress
  ] = useState(0);
  const [isPhotoIdOfPersonFileUploaded, setIsPhotoIdOfPersonFileUploaded] =
    useState(false);
  const [photoIdOfPersonSelectedFile, setPhotoIdOfPersonSelectedFile] =
    useState([]);

  // Combined state object for all attachments
  const attachmentsState = {
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
  };

  // Combined setState object for all attachments
  const attachmentsSetState = {
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
  };

  return {
    attachmentsState,
    attachmentsSetState
  };
};

export default useAttachmentsStateManagement;
