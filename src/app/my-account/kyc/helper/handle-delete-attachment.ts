interface IHandleDeleteAttachment {
  setIsFileUploaded: string;
  setSelectedFile: string;
  dispatch: any;
}

import { updateFormState } from '@/features/kyc/kyc';
export const handleDeleteAttachment = ({
  setIsFileUploaded,
  setSelectedFile,
  dispatch
}: IHandleDeleteAttachment) => {
  dispatch(
    updateFormState({
      name: setSelectedFile,
      value: []
    })
  );
  dispatch(
    updateFormState({
      name: setIsFileUploaded,
      value: false
    })
  );
};
