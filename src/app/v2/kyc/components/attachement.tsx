import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useState } from 'react';
import { AttachmentData } from './attachment-data/attachement-data';
import FileAttachments from '@/components/v2/common/file-attachment';
import CheckboxComponent from '@/components/v2/common/checkbox';
import {
  useDeleteDocumentMutation,
  useUploadDocumentMutation
} from '@/features/api/kyc';
import { handleFileupload } from '../helper/handle-file-upload';
import { updateFormState } from '@/features/kyc/kyc';
import { countries } from '@/constants/enums/kyc';
import { useAppDispatch } from '@/hooks/hook';
import { TermsDialogComponent } from './terms-and-conditions';
import { Tracking_KYC } from '@/constants/funnel-tracking';
import { trackEvent } from '@/utils/ga';

export const RenderAttachment = ({
  formErrorState,
  formState,
  modalSetState,
  modalState,
  country,
  handleTermAndCondition,
  selectedSubmissionOption,
  currentStepperStep
}: any) => {
  const [uploadDocument] = useUploadDocumentMutation({});
  const [deleteDocument] = useDeleteDocumentMutation({});
  const dispatch = useAppDispatch();
  const [openTerms, setOpenTerms] = useState(false);

  const handleDeleteAttachment = ({
    key
  }: {
    key: string;
    selectedFile: any;
  }) => {
    deleteDocument({
      offline:
        country === 'Other' || selectedSubmissionOption === 'offline'
          ? true
          : false,
      fieldName: key,
      country: country
    })
      .unwrap()
      .then(() => {
        dispatch(
          updateFormState({
            name: `formState.attachment[${key}]`,
            value: ''
          })
        );
      });
  };

  const buildFormData = ({ acceptedFiles, key }: any) => {
    const formData = new FormData();

    formData.append('country', country);
    formData.append(
      'offline',
      `${
        country === countries.OTHER || selectedSubmissionOption === 'offline'
          ? 'true'
          : 'false'
      }`
    );

    acceptedFiles.forEach((file: any) => {
      formData.append(key, file);
    });

    return formData;
  };
  const fileUpload = ({ acceptedFiles, key }: any) => {
    handleFileupload({
      acceptedFiles,
      setUploadProgress: `formState.attachment[${key}].uploadProgress`,
      setIsFileUploaded: `formState.attachment[${key}].isFileUploaded`,
      setSelectedFile: `formState.attachment[${key}]`,
      dispatch
    });
    dispatch(
      updateFormState({
        name: `formErrorState.attachment[${key}]`,
        value: ''
      })
    );
    uploadDocument(buildFormData({ acceptedFiles, key }))
      .unwrap()
      .then(_res => {})
      .catch(error => {
        console.log('Error', error);
      });
  };

  useEffect(() => {
    trackEvent({
      action: Tracking_KYC.KYC_Attachment_PageView,
      entry_point: localStorage.getItem('kyc_entryPoint') || '',
      category: 'KYC',
      country: localStorage.getItem('country') || ''
    });
  }, []);

  return (
    <div>
      <TermsDialogComponent isOpens={openTerms} setIsOpen={setOpenTerms} />

      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[16px]">
          <span className="rounded-[50%] bg-primaryMain flex items-center justify-center text-neutral25 text-lMedium font-medium w-[40px] h-[40px]">
            {currentStepperStep + 1}
          </span>
          <div>
            <h1 className="text-headingS font-medium text-neutral900">
              {ManageLocales('app.kyc.attachment.header.title')}
            </h1>
            <p className="text-neutral-900">
              Please upload only signed and stamped attachments in pdf, doc(x),
              jpeg, jpg, png formats.
            </p>
          </div>
        </div>
        <hr className="border-neutral200" />
        <div
          className={` ${'max-h-[670px]'} ${
            (country === countries.USA || country === countries.BELGIUM) &&
            'h-[39vh]'
          }  w-[100%] `}
        >
          <div
            className={` ${
              country === countries.INDIA
                ? 'max-h-[660px]'
                : country === countries.OTHER
                ? 'max-h-[360px]'
                : 'max-h-[216px]'
            } w-[100%] flex justify-center`}
          >
            <div className="w-[920px] flex flex-wrap flex-col  gap-[20px]">
              {AttachmentData &&
                AttachmentData[country]?.map((attch: any) => {
                  return attch.key && Object?.keys(attch.key).length ? (
                    <div key={attch.key} className="w-[50%]">
                      <h1 className="text-neutral900 text-mRegular py-3 capitalize ">
                        {attch.key}
                      </h1>
                      <div className="flex flex-col ">
                        {attch.value.map(
                          ({
                            id,
                            label,
                            // isRequired,
                            formKey,
                            maxFile,
                            minFile,
                            fileSize
                          }: any) => (
                            <FileAttachments
                              key={id}
                              label={label}
                              formKey={formKey}
                              formErrorState={formErrorState}
                              formState={formState}
                              modalSetState={modalSetState}
                              modalState={modalState}
                              maxFile={maxFile}
                              minFile={minFile}
                              fileSize={fileSize}
                              fileUpload={fileUpload}
                              handleDeleteAttachment={handleDeleteAttachment}
                            />
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div key={attch.id} className=" w-[50%]">
                      <FileAttachments
                        key={attch.id}
                        label={attch.label}
                        formKey={attch.formKey}
                        formErrorState={formErrorState}
                        formState={formState}
                        modalSetState={modalSetState}
                        modalState={modalState}
                        maxFile={attch.maxFile}
                        minFile={attch.minFile}
                        fileSize={attch.fileSize}
                        fileUpload={fileUpload}
                        handleDeleteAttachment={handleDeleteAttachment}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="w-[100%] mt-3 flex flex-col py-3 justify-center items-center">
          <div className="flex  items-center w-[920px]">
            <div className="pr-3 flex items-center">
              <CheckboxComponent
                onClick={() =>
                  handleTermAndCondition(!formState.termAndCondition)
                }
                isChecked={formState.termAndCondition}
                styles={
                  formErrorState.termAndCondition ? '!border-dangerMain' : ''
                }
              />
            </div>
            <div
              className={`flex gap-1 ${
                formErrorState.termAndCondition
                  ? 'text-dangerMain'
                  : 'text-neutral-900'
              }`}
            >
              <p
                className="cursor-pointer"
                onClick={() =>
                  handleTermAndCondition(!formState.termAndCondition)
                }
              >
                I hereby agree to
              </p>
              <div
                onClick={() => {
                  setOpenTerms(true);
                }}
                className={`cursor-pointer ${
                  formErrorState.termAndCondition
                    ? 'text-dangerMain '
                    : 'text-infoMain'
                } `}
              >
                terms and conditions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
