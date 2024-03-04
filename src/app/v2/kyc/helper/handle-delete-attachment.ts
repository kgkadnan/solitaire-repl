interface IHandleDeleteAttachment {
  deleteApi: any;
  setSelectedFile: string;
  dispatch: any;
  selectedFile: any;
}

import { updateFormState } from '@/features/kyc/kyc';
export const handleDeleteAttachment = ({
  deleteApi,
  setSelectedFile,
  dispatch,
  selectedFile
}: IHandleDeleteAttachment) => {
  deleteApi({
    offline: true,
    fieldName: selectedFile.url,
    country: 'India'
  });
  dispatch(
    updateFormState({
      name: setSelectedFile,
      value: {}
    })
  );
  // dispatch(
  //   updateFormState({
  //     name: setIsFileUploaded,
  //     value: false
  //   })
  // );
};
