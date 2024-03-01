import { ManageLocales } from '@/utils/v2/translate';
import React from 'react';
import { AttachmentData } from './attachment-data/attachement-data';
import FileAttachments from '@/components/v2/common/file-attachment';

export const RenderAttachment = ({
  formErrorState,
  formState,
  modalSetState,
  modalState,
  country
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
        <div className={`pb-5 ${'max-h-[811px]'} w-[100%] flex justify-center`}>
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
      </div>
    </div>
  );
};
