import { ManageLocales } from '@/utils/translate';
import React, { ReactNode } from 'react';
import styles from './confirm-stone.module.scss';
import CustomDataTable from '../data-table';
import { CustomDisplayButton } from '../buttons/display-button';
import { Product, TableColumn } from '@/app/search/result-interface';
import { RadioButton } from '../custom-input-radio';

interface IconfirmRadioButtons {
  name: string;
  onChange: (value: string) => void;
  id: string;
  value: string;
  label: ReactNode | string;
  checked: boolean;
}

interface IConfirmStoneProps {
  confirmStoneData: Product[];
  listingColumns: TableColumn[];
  commentValue: string;
  handleComment: (event: any) => void;
  setInputError: React.Dispatch<React.SetStateAction<boolean>>;
  setInputErrorContent: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDaysInputValue: React.Dispatch<React.SetStateAction<string>>;
  onOpenChange: (open: boolean) => void;
  confirmRadioButtons?: IconfirmRadioButtons[];
}

const ConfirmStone: React.FC<IConfirmStoneProps> = ({
  confirmStoneData,
  listingColumns,
  commentValue,
  handleComment,
  setInputError,
  setInputErrorContent,
  setSelectedDaysInputValue,
  onOpenChange,
  confirmRadioButtons,
}) => {
  return (
    <>
      <div className={styles.diamondDetailHeader}>
        <p className={`text-solitaireTertiary`}>
          {`${ManageLocales('app.searchResult.slider.confirmStone')}`}
        </p>
      </div>
      <div className="border-b border-solitaireSenary mb-5"></div>
      <div className="px-[50px]">
        {confirmStoneData?.length && (
          <CustomDataTable
            tableColumns={listingColumns}
            tableRows={confirmStoneData}
            selectionAllowed={false}
            mainTableStyle={styles.tableWrapper}
          />
        )}
        <div className="mt-5">
          <p>
            {ManageLocales('app.searchResult.slider.confirmStone.paymentTerms')}
          </p>

          <div className="flex justify-between mt-2">
            {confirmRadioButtons?.map((radioData: any, index: number) => (
              <RadioButton radioMetaData={radioData} key={index} />
            ))}
          </div>
        </div>
        <div className="mt-5">
          {ManageLocales('app.searchResult.slider.confirmStone.addComment')}

          <textarea
            value={commentValue}
            name="textarea"
            rows={3}
            data-testid="addComment"
            // placeholder="Write Description"
            className="w-full bg-solitaireOctonary text-solitaireTertiary rounded-xl resize-none focus:outline-none p-2 placeholder:text-solitaireSenary mt-2"
            onChange={handleComment}
          />
        </div>

        <div className="flex text-center justify-center gap-4 mt-3">
          <CustomDisplayButton
            displayButtonLabel={ManageLocales(
              'app.searchResult.slider.confirmStone.cancel'
            )}
            displayButtonAllStyle={{
              displayButtonStyle: styles.transparent,
            }}
            handleClick={() => {
              setSelectedDaysInputValue('');
              setInputErrorContent('');
              setInputError(false);
              onOpenChange(false);
            }}
          />
          <CustomDisplayButton
            displayButtonLabel={ManageLocales(
              'app.searchResult.slider.confirmStone'
            )}
            displayButtonAllStyle={{
              displayButtonStyle: styles.filled,
            }}
          />
        </div>
        <div className="border-b border-solitaireSenary mt-5"></div>
      </div>
    </>
  );
};

export default ConfirmStone;
