import { useState } from 'react';

const useAttachmentsStateManagement = () => {
  // State for Pan Card
  const [uploadPanCardProgress, setUploadPanCardProgress] = useState(0);
  const [isPanFileUploaded, setIsPanFileUploaded] = useState(false);
  const [panSelectedFile, setPanSelectedFile] = useState([]);
  const [panError, setPanError] = useState('');

  // State for Business Card
  const [uploadBusinessCardProgress, setUploadBusinessCardProgress] =
    useState(0);
  const [isBusinessFileUploaded, setIsBusinessFileUploaded] = useState(false);
  const [businessSelectedFile, setBusinessSelectedFile] = useState([]);
  const [businessError, setBusinessError] = useState('');

  // State for GST Certificate
  const [uploadGstCertCardProgress, setUploadGstCertCardProgress] = useState(0);
  const [isGstCertFileUploaded, setIsGstCertFileUploaded] = useState(false);
  const [gstCertSelectedFile, setGstCertSelectedFile] = useState([]);
  const [gstCertError, setGstCertError] = useState('');
  // State for Incorporation Certificate
  const [
    uploadIncorporationCertCardProgress,
    setUploadIncorporationCertCardProgress
  ] = useState(0);
  const [isIncorporationCertFileUploaded, setIsIncorporationCertFileUploaded] =
    useState(false);
  const [incorporationCertSelectedFile, setIncorporationCertSelectedFile] =
    useState([]);
  const [incorporationCertError, setIncorporationCertError] = useState('');

  // State for Cancelled Cheque
  const [uploadCancelChaqueCardProgress, setUploadCancelChaqueCardProgress] =
    useState(0);
  const [isCancelChaqueFileUploaded, setIsCancelChaqueFileUploaded] =
    useState(false);
  const [cancelChaqueSelectedFile, setCancelChaqueSelectedFile] = useState([]);
  const [cancelChaqueError, setCancelChaqueError] = useState('');

  // State for Government Registration Certificate
  const [
    uploadGovermentRegCertCardProgress,
    setUploadGovermentRegCertCardProgress
  ] = useState(0);
  const [isGovermentRegCertFileUploaded, setIsGovermentRegCertFileUploaded] =
    useState(false);
  const [govermentRegCertSelectedFile, setGovermentRegCertSelectedFile] =
    useState([]);
  const [govermentRegCertError, setGovermentRegCertError] = useState('');

  // State for PAN or Aadhaar Card
  const [uploadPanOrAdhaarCardProgress, setUploadPanOrAdhaarCardProgress] =
    useState(0);
  const [isPanOrAdhaarFileUploaded, setIsPanOrAdhaarFileUploaded] =
    useState(false);
  const [panOrAdhaarSelectedFile, setPanOrAdhaarSelectedFile] = useState([]);
  const [panOrAdhaarError, setPanOrAdhaarError] = useState('');

  // State for Passport
  const [uploadPassportCardProgress, setUploadPassportCardProgress] =
    useState(0);
  const [isPassportFileUploaded, setIsPassportFileUploaded] = useState(false);
  const [passportSelectedFile, setPassportSelectedFile] = useState([]);
  const [passportError, setPassportError] = useState('');

  // State for Photo ID of Person
  const [
    uploadPhotoIdOfPerson1CardProgress,
    setUploadPhotoIdOfPerson1CardProgress
  ] = useState(0);
  const [isPhotoIdOfPerson1FileUploaded, setIsPhotoIdOfPerson1FileUploaded] =
    useState(false);
  const [photoIdOfPerson1SelectedFile, setPhotoIdOfPerson1SelectedFile] =
    useState([]);
  const [photoIdOfPerson1Error, setPhotoIdOfPerson1Error] = useState('');

  const [
    uploadPhotoIdOfPerson2CardProgress,
    setUploadPhotoIdOfPerson2CardProgress
  ] = useState(0);
  const [isPhotoIdOfPerson2FileUploaded, setIsPhotoIdOfPerson2FileUploaded] =
    useState(false);
  const [photoIdOfPerson2SelectedFile, setPhotoIdOfPerson2SelectedFile] =
    useState([]);
  const [photoIdOfPerson2Error, setPhotoIdOfPerson2Error] = useState('');

  const [
    uploadPhotoIdOfPerson3CardProgress,
    setUploadPhotoIdOfPerson3CardProgress
  ] = useState(0);
  const [isPhotoIdOfPerson3FileUploaded, setIsPhotoIdOfPerson3FileUploaded] =
    useState(false);
  const [photoIdOfPerson3SelectedFile, setPhotoIdOfPerson3SelectedFile] =
    useState([]);
  const [photoIdOfPerson3Error, setPhotoIdOfPerson3Error] = useState('');

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
