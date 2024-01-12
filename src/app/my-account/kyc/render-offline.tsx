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
import { CustomDialog } from '@/components/common/dialog';

interface IRenderOffline {
  data: any;
  modalSetState: IModalSetState;
  modalState: any;
  formErrorState: any;
  handleTermAndCondition: (state: boolean) => void;
  formState: any;
  fromWhere: string;
  handleSaveAndNext: (state: string) => void;
  handleSubmit: () => void;
  selectedCountry: string;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDialogOpen: boolean;
  dialogContent: any;
}
const RenderOffline = ({
  data,
  modalSetState,
  modalState,
  formErrorState,
  handleTermAndCondition,
  formState,
  fromWhere,
  handleSaveAndNext,
  handleSubmit,
  selectedCountry,
  setIsDialogOpen,
  isDialogOpen,
  dialogContent
}: IRenderOffline) => {
  const { isModalOpen, modalContent } = modalState;
  const { setIsModalOpen } = modalSetState;

  return (
    <div>
      <CustomDialog
        setIsOpen={setIsDialogOpen}
        isOpens={isDialogOpen}
        dialogContent={dialogContent}
      />
      <CustomModal
        isOpens={isModalOpen}
        setIsOpen={setIsModalOpen}
        dialogContent={modalContent}
        modalStyle={styles.modalStyle}
      />
      <div className="w-full flex justify-between  pb-5">
        <DownloadAndUpload
          formState={formState}
          formErrorState={formErrorState}
          maxFile={1}
          modalSetState={modalSetState}
          selectedCountry={selectedCountry}
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
          fromWhere === 'offline' ? 'max-h-[800px]' : 'max-h-[350px]'
        } flex flex-wrap flex-col gap-[20px] content-between`}
      >
        {data?.attachment &&
          data.attachment.map((attch: any) => {
            return attch.key && Object?.keys(attch.key).length ? (
              <div key={attch.key} className="w-[45%]">
                <h1 className="text-solitaireTertiary py-3 capitalize ">
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
                      minFile
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
                />
              </div>
            );
          })}
      </div>
      {fromWhere === 'other' && (
        <p className="text-[12px] text-solitaireSenary pb-5 w-[45%] text-center">
          Note*: Applicable for non UAE clients
        </p>
      )}
      <hr className="border-1 border-solitaireSenary w-[50%]" />
      <div className="flex py-6 items-center justify-center">
        <div className="pr-3 flex items-center">
          <Checkbox
            onClick={() => handleTermAndCondition(!formState.termAndCondition)}
            className={
              formErrorState.termAndCondition ? '!border-solitaireError' : ''
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
          <p>I hereby agree to</p>
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
      <div className="sticky bottom-0  bg-solitairePrimary">
        <CustomFooter
          footerButtonData={[
            {
              id: 1,
              displayButtonLabel: 'Back',
              style: styles.transparent,
              fn: () =>
                fromWhere === 'other'
                  ? handleSaveAndNext('country_selection')
                  : handleSaveAndNext('choice_for_filling_kyc')
            },
            {
              id: 2,
              displayButtonLabel: 'Submit',
              style: styles.filled,
              fn: handleSubmit
            }
          ]}
        />
      </div>
    </div>
  );
};

export default RenderOffline;
