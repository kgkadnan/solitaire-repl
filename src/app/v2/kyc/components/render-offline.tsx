import { ManageLocales } from '@/utils/v2/translate';
import React from 'react';
import { AttachmentData } from './attachment-data/attachement-data';
import FileAttachments from '@/components/v2/common/file-attachment';
import CheckboxComponent from '@/components/v2/common/checkbox';
import {
  useDeleteDocumentMutation,
  useUploadDocumentMutation
} from '@/features/api/kyc';
import { handleFileupload } from '../helper/handle-file-upload';
import { useAppDispatch } from '@/hooks/hook';
import { updateFormState } from '@/features/kyc/kyc';
import { countries } from '@/constants/enums/kyc';
import { DownloadAndUpload } from '@/components/v2/common/download-and-upload';
import ActionButton from '@/components/v2/common/action-button';

export const RenderOffline = ({
  formErrorState,
  formState,
  modalSetState,
  modalState,
  country,
  handleTermAndCondition,
  selectedSubmissionOption,
  handleBack,
  handleSubmit,
  fromWhere
}: any) => {
  const [uploadDocument] = useUploadDocumentMutation({});
  const [deleteDocument] = useDeleteDocumentMutation({});
  const dispatch = useAppDispatch();

  const buildFormData = ({ acceptedFiles, key }: any) => {
    const formData = new FormData();

    if (country === countries.OTHER || selectedSubmissionOption === 'offline') {
      formState.attachment?.upload_form?.selectedFile.forEach((file: any) => {
        formData.append('upload_form', file);
      });
    }
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
    uploadDocument(buildFormData({ acceptedFiles, key }))
      .unwrap()
      .then(() => {
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
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

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
            value: {}
          })
        );
      });
  };

  return (
    <div className="flex flex-col  items-center">
      <div className="w-[920px] mt-[20px] mb-[10px]">
        <h1 className="text-lMedium text-neutral-900 font-lMedium">
          Download and Upload Hub
        </h1>
        <p className="text-lRegular text-neutral-600 font-lRegular">
          Please download, complete, and manually upload your form here.
        </p>
      </div>
      <DownloadAndUpload
        formState={formState}
        formErrorState={formErrorState}
        maxFile={1}
        selectedCountry={country}
        fileUpload={fileUpload}
        handleDeleteAttachment={handleDeleteAttachment}
      />

      {fromWhere === countries.OTHER && (
        <p className="text-neutral-900 w-[920px] pt-3 text-mRegular">
          Note* (Mandatory): Please upload signed & stamped filled KYC form with
          3 Self Declarations
        </p>
      )}

      <hr className="border-neutral200 px-[3px] mt-[16px] w-[920px] mb-[25px]" />

      <div className="flex flex-col gap-[16px] w-[920px]">
        <div className="flex flex-col ">
          <h1 className="text-headingS font-medium text-neutral900">
            {ManageLocales('app.kyc.attachment.header.title')}
          </h1>
          <p className="text-neutral-900">
            Please upload only signed and stamped attachments in pdf, doc(x),
            jpeg, jpg, png formats.
          </p>
        </div>

        <div
          className={` ${'max-h-[670px]'} ${
            country === countries.OTHER
              ? 'h-[380px]'
              : country !== countries.INDIA
              ? 'h-[548px]'
              : ''
          } w-[100%] `}
        >
          <div
            className={` ${
              country === countries.INDIA
                ? 'max-h-[660px]'
                : country === countries.OTHER
                ? 'max-h-[360px]'
                : 'max-h-[200px]'
            } w-[100%] flex justify-center`}
          >
            <div className="w-[920px] flex flex-wrap flex-col  gap-[20px]">
              {AttachmentData &&
                AttachmentData[country].map((attch: any) => {
                  return attch.key && Object?.keys(attch.key).length ? (
                    <div key={attch.key} className="w-[50%]">
                      <h1 className="text-neutral900 text-mRegular py-3 capitalize ">
                        {attch.key}
                      </h1>
                      <div className="flex flex-col gap-[20px]">
                        {attch.value.map(
                          ({
                            id,
                            label,
                            isRequired,
                            formKey,
                            maxFile,
                            minFile,
                            fileSize
                          }: any) => (
                            <FileAttachments
                              key={id}
                              lable={label}
                              formKey={formKey}
                              isRequired={isRequired}
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
                        lable={attch.label}
                        formKey={attch.formKey}
                        isRequired={attch.isRequired}
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
          {fromWhere === countries.OTHER && (
            <p className="text-mRegular text-neutral-600 pb-5 ">
              Note*: Applicable for non UAE clients
            </p>
          )}
        </div>
        <div className="w-[100%] flex flex-col py-3 justify-center items-center">
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
              <a
                href="https://kgk.live/terms-condition"
                className={` ${
                  formErrorState.termAndCondition
                    ? 'text-dangerMain '
                    : 'text-infoMain'
                } `}
                target="_blank"
              >
                terms and conditions
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[72px] bg-neutral0 sticky bottom-0 border-[1px] border-solid border-neutral200 w-[1136px] rounded-t-[8px] mt-auto p-[16px]">
        {' '}
        <ActionButton
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.kyc.footer.back'),
              handler: () =>
                fromWhere === countries.OTHER
                  ? handleBack('country_selection')
                  : handleBack('submission_option')
            },
            {
              variant: 'primary',
              label: ManageLocales('app.kyc.footer.submit'),
              handler: () => {
                handleSubmit();
              }
            }
          ]}
          containerStyle="!justify-between"
        />
      </div>
    </div>
  );
};
