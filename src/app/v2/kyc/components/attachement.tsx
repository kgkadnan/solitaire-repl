import { ManageLocales } from '@/utils/v2/translate';
import React from 'react';
import { AttachmentData } from './attachment-data/attachement-data';
import FileAttachments from '@/components/v2/common/file-attachment';
import { Checkbox } from '@/components/v2/ui/checkbox';

export const RenderAttachment = ({
  formErrorState,
  formState,
  modalSetState,
  modalState,
  country,
  handleTermAndCondition
}: any) => {
  return (
    <div>
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[16px]">
          <span className="rounded-[50%] bg-primaryMain flex items-center justify-center text-neutral25 text-lMedium font-medium w-[40px] h-[40px]">
            5
          </span>
          <h1 className="text-headingS font-medium text-neutral900">
            {ManageLocales('app.kyc.attachment.header.title')}
          </h1>
        </div>
        <hr className="border-neutral200" />
        <div className={` ${'max-h-[650px]'}  w-[100%]`}>
          <div className={` ${'max-h-[650px]'} w-[100%] flex justify-center`}>
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
                            />
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div key={attch.id} className=" w-[45%]">
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
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex  items-center">
            <div className="pr-3 flex items-center">
              <Checkbox
                onClick={() =>
                  handleTermAndCondition(!formState.termAndCondition)
                }
                checked={formState.termAndCondition}
                className={
                  formErrorState.termAndCondition
                    ? '!border-solitaireError'
                    : ''
                }
              />
            </div>
            <div
              className={`flex gap-1 ${
                formErrorState.termAndCondition
                  ? 'text-solitaireError'
                  : 'text-solitaireTertiary'
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
                className={`border-b ${
                  formErrorState.termAndCondition
                    ? 'border-solitaireError '
                    : 'border-solitaireSenary'
                } `}
                target="_blank"
              >
                terms and conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
