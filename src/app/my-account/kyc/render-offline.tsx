'use client';
import FileAttachments from '@/components/common/file-attachment';
import React from 'react';
import Finger from '@public/assets/icons/noto_backhand-index-pointing-up.svg';
import Image from 'next/image';
import { ManageLocales } from '@/utils/translate';
import { DownloadAndUpload } from '@/components/common/download-and-upload';
import styles from './styles/attachment.module.scss';
import { CustomModal } from '@/components/common/modal';
import { CustomFooter } from '@/components/common/footer';
import { Checkbox } from '@/components/ui/checkbox';
import { IModalSetState } from '@/app/search/result/result-interface';

interface IRenderOffline {
  data: any;
  modalSetState: IModalSetState;
  modalState: any;
  formErrorState: any;
  handleTermAndCondition: () => void;
  formState: any;
  fromWhere: string;
  prevStep: () => void;
}
const RenderOffline = ({
  data,
  modalSetState,
  modalState,
  formErrorState,
  handleTermAndCondition,
  formState,
  fromWhere,
  prevStep
}: IRenderOffline) => {
  const { isModalOpen, modalContent } = modalState;
  const { setIsModalOpen } = modalSetState;
  const handleSubmit = () => {};

  return (
    <div>
      <CustomModal
        isOpens={isModalOpen}
        setIsOpen={setIsModalOpen}
        dialogContent={modalContent}
        modalStyle={styles.modalStyle}
      />
      <div className="w-full flex justify-between  pb-5">
        <DownloadAndUpload
          formState={formState}
          maxFile={1}
          modalSetState={modalSetState}
        />
      </div>
      {fromWhere === 'other' && (
        <p className="text-solitaireTertiary text-center pb-5 font-light">
          Note* (Mandatory): Please upload signed & stamped filled KYC form with
          3 Self Declarations
        </p>
      )}
      <hr className="border-1 border-solitaireSenary" />
      <div className="flex items-center gap-2 py-5">
        <Image src={Finger} alt={'Finger'} height={36} width={36} />
        <h1 className="text-[17px] text-solitaireTertiary">
          {ManageLocales('app.myProfile.kyc.attachments')}
        </h1>
      </div>
      <div
        className={`pb-5 ${
          fromWhere === 'offline' ? 'max-h-[800px]' : 'max-h-[400px]'
        } flex flex-wrap flex-col gap-[20px] content-between`}
      >
        {data?.attachment &&
          (Array.isArray(data.attachment)
            ? // Render when `attachment` is an array
              data.attachment.map(
                ({ id, label, isRequired, key, maxFile, minFile }: any) => (
                  <div key={id} className=" w-[45%]">
                    <FileAttachments
                      key={id}
                      lable={label}
                      formKey={key}
                      isRequired={isRequired}
                      formErrorState={formErrorState}
                      formState={formState}
                      modalSetState={modalSetState}
                      modalState={modalState}
                      maxFile={maxFile}
                      minFile={minFile}
                    />
                  </div>
                )
              )
            : // Render when `attachment` is an object
              Object.keys(data.attachment).map((category: any) => (
                <div key={category} className="w-[45%]">
                  <h1 className="text-solitaireTertiary py-3 capitalize ">
                    {category}
                  </h1>
                  <div className="flex flex-col gap-[20px]">
                    {data.attachment[category].map(
                      ({
                        id,
                        label,
                        isRequired,
                        key,
                        maxFile,
                        minFile
                      }: any) => (
                        <FileAttachments
                          key={id}
                          lable={label}
                          formKey={key}
                          isRequired={isRequired}
                          formErrorState={formErrorState}
                          formState={formState}
                          modalSetState={modalSetState}
                          modalState={modalState}
                          maxFile={maxFile}
                          minFile={minFile}
                        />
                      )
                    )}
                  </div>
                </div>
              )))}
      </div>
      {fromWhere === 'other' && (
        <p className="text-[12px] text-solitaireSenary pb-5 w-[45%] text-center">
          Note*: Applicable for non UAE clients
        </p>
      )}
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
      <div className="sticky bottom-0  bg-solitairePrimary">
        <CustomFooter
          footerButtonData={[
            {
              id: 1,
              displayButtonLabel: 'Back',
              style: styles.transparent,
              fn: prevStep
            },
            {
              id: 2,
              displayButtonLabel: 'Submit',
              style: styles.filled,
              fn: () => handleSubmit
            }
          ]}
        />
      </div>
    </div>
  );
};

export default RenderOffline;
