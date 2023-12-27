import { useState } from 'react';

const useAttachmentsStateManagement = () => {
  // State for Pan Card
  const [uploadPanCardProgress, setUploadPanCardProgress] = useState<number>(0);
  const [isPanFileUploaded, setIsPanFileUploaded] = useState<boolean>(false);
  const [panSelectedFile, setPanSelectedFile] = useState<string[]>([]);
  const [panError, setPanError] = useState<string | null>('');

  // State for Business Card
  const [uploadBusinessCardProgress, setUploadBusinessCardProgress] =
    useState<number>(0);
  const [isBusinessFileUploaded, setIsBusinessFileUploaded] =
    useState<boolean>(false);
  const [businessSelectedFile, setBusinessSelectedFile] = useState<string[]>(
    []
  );
  const [businessError, setBusinessError] = useState<string | null>('');

  // State for GST Certificate
  const [uploadGstCertCardProgress, setUploadGstCertCardProgress] =
    useState<number>(0);
  const [isGstCertFileUploaded, setIsGstCertFileUploaded] =
    useState<boolean>(false);
  const [gstCertSelectedFile, setGstCertSelectedFile] = useState<string[]>([]);
  const [gstCertError, setGstCertError] = useState<string | null>('');
  // State for Incorporation Certificate
  const [
    uploadIncorporationCertCardProgress,
    setUploadIncorporationCertCardProgress
  ] = useState<number>(0);
  const [isIncorporationCertFileUploaded, setIsIncorporationCertFileUploaded] =
    useState<boolean>(false);
  const [incorporationCertSelectedFile, setIncorporationCertSelectedFile] =
    useState<string[]>([]);
  const [incorporationCertError, setIncorporationCertError] = useState<
    string | null
  >('');

  // State for Cancelled Cheque
  const [uploadCancelChaqueCardProgress, setUploadCancelChaqueCardProgress] =
    useState<number>(0);
  const [isCancelChaqueFileUploaded, setIsCancelChaqueFileUploaded] =
    useState<boolean>(false);
  const [cancelChaqueSelectedFile, setCancelChaqueSelectedFile] = useState<
    string[]
  >([]);
  const [cancelChaqueError, setCancelChaqueError] = useState<string | null>('');

  // State for Pan Card
  const [uploadSection194QCardProgress, setUploadSection194QCardProgress] =
    useState<number>(0);
  const [isSection194QFileUploaded, setIsSection194QFileUploaded] =
    useState<boolean>(false);
  const [section194QSelectedFile, setSection194QSelectedFile] = useState<
    string[]
  >([]);
  const [section194QError, setSection194QError] = useState<string | null>('');

  // State for Government Registration Certificate
  const [
    uploadGovermentRegCertCardProgress,
    setUploadGovermentRegCertCardProgress
  ] = useState<number>(0);
  const [isGovermentRegCertFileUploaded, setIsGovermentRegCertFileUploaded] =
    useState<boolean>(false);
  const [govermentRegCertSelectedFile, setGovermentRegCertSelectedFile] =
    useState<string[]>([]);
  const [govermentRegCertError, setGovermentRegCertError] = useState<
    string | null
  >('');

  // State for PAN or Aadhaar Card
  const [uploadPanOrAdhaarCardProgress, setUploadPanOrAdhaarCardProgress] =
    useState<number>(0);
  const [isPanOrAdhaarFileUploaded, setIsPanOrAdhaarFileUploaded] =
    useState<boolean>(false);
  const [panOrAdhaarSelectedFile, setPanOrAdhaarSelectedFile] = useState<
    string[]
  >([]);
  const [panOrAdhaarError, setPanOrAdhaarError] = useState<string | null>('');

  // State for Passport
  const [uploadPassportCardProgress, setUploadPassportCardProgress] =
    useState<number>(0);
  const [isPassportFileUploaded, setIsPassportFileUploaded] =
    useState<boolean>(false);
  const [passportSelectedFile, setPassportSelectedFile] = useState<string[]>(
    []
  );
  const [passportError, setPassportError] = useState<string | null>('');

  // State for Photo ID of Person
  const [
    uploadPhotoIdOfPerson1CardProgress,
    setUploadPhotoIdOfPerson1CardProgress
  ] = useState<number>(0);
  const [isPhotoIdOfPerson1FileUploaded, setIsPhotoIdOfPerson1FileUploaded] =
    useState<boolean>(false);
  const [photoIdOfPerson1SelectedFile, setPhotoIdOfPerson1SelectedFile] =
    useState<string[]>([]);
  const [photoIdOfPerson1Error, setPhotoIdOfPerson1Error] = useState<
    string | null
  >('');

  const [
    uploadPhotoIdOfPerson2CardProgress,
    setUploadPhotoIdOfPerson2CardProgress
  ] = useState<number>(0);
  const [isPhotoIdOfPerson2FileUploaded, setIsPhotoIdOfPerson2FileUploaded] =
    useState<boolean>(false);
  const [photoIdOfPerson2SelectedFile, setPhotoIdOfPerson2SelectedFile] =
    useState<string[]>([]);
  const [photoIdOfPerson2Error, setPhotoIdOfPerson2Error] = useState<
    string | null
  >('');

  const [
    uploadPhotoIdOfPerson3CardProgress,
    setUploadPhotoIdOfPerson3CardProgress
  ] = useState<number>(0);
  const [isPhotoIdOfPerson3FileUploaded, setIsPhotoIdOfPerson3FileUploaded] =
    useState<boolean>(false);
  const [photoIdOfPerson3SelectedFile, setPhotoIdOfPerson3SelectedFile] =
    useState<string[]>([]);
  const [photoIdOfPerson3Error, setPhotoIdOfPerson3Error] = useState<
    string | null
  >('');

  // Combined state object for all attachments
  const attachmentsState = {
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
    section194Q: {
      uploadProgress: uploadSection194QCardProgress,
      isUploaded: isSection194QFileUploaded,
      selectedFile: section194QSelectedFile,
      error: section194QError
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
  };

  // Combined setState object for all attachments
  const attachmentsSetState = {
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
    setCancelChaque: {
      setProgress: setUploadCancelChaqueCardProgress,
      setIsUploaded: setIsCancelChaqueFileUploaded,
      setSelectedFile: setCancelChaqueSelectedFile,
      setError: setCancelChaqueError
    },
    setSection194Q: {
      setProgress: setUploadSection194QCardProgress,
      setIsUploaded: setIsSection194QFileUploaded,
      setSelectedFile: setSection194QSelectedFile,
      setError: setSection194QError
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
  };

  return {
    attachmentsState,
    attachmentsSetState
  };
};

export default useAttachmentsStateManagement;
