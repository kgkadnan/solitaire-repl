import { ManageLocales } from '@/utils/translate';
import React from 'react';
import styles from './confirm-stone.module.scss';
import CustomDataTable from '../data-table';
import { CustomDisplayButton } from '../buttons/display-button';
import { RadioButton } from '../custom-input-radio';
import { useConfirmStoneMutation } from '@/features/api/my-diamonds/my-diamond';
import { IConfirmStoneProps } from './interface';
import { CustomInputField } from '../input-field';
import { CONFIRM_STONE_COMMENT_MAX_CHARACTERS } from '@/constants/business-logic';

const ConfirmStone: React.FC<IConfirmStoneProps> = ({
  listingColumns,
  errorState,
  errorSetState,
  onOpenChange,
  confirmStoneState,
  confirmStoneSetState,
}) => {
  const [confirmStone] = useConfirmStoneMutation();

  const { inputError, inputErrorContent } = errorState;
  const { setInputError, setInputErrorContent } = errorSetState;
  const {
    confirmStoneData,
    commentValue,
    selectedDaysInputValue,
    selectedRadioDaysValue,
  } = confirmStoneState;

  const {
    setCommentValue,
    setSelectedDaysInputValue,
    setSelectedRadioDaysValue,
  } = confirmStoneSetState;

  /**
   * The function handles the change event of a radio input and updates the state based on the input
   * value.
   * @param event - The event parameter is of type React.ChangeEvent<HTMLInputElement>. It represents the
   * event that occurred when the radio button value is changed.
   */
  const handleRadioDayValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(event.target.value);
    if (inputValue >= 121) {
      setInputError(true);
      setInputErrorContent('Invalid input.');
      const formattedValue = event.target.value;
      setSelectedDaysInputValue(formattedValue);
    } else if (inputValue) {
      setInputError(false);
      setInputErrorContent('');
      const formattedValue = event.target.value;
      setSelectedDaysInputValue(formattedValue);
    } else if (event.target.value === '') {
      setInputError(false);
      setInputErrorContent('');
      // If the input is empty, clear the state
      setSelectedDaysInputValue('');
    }
  };

  /**
   * The function `handleConfirmStoneRadioChange` updates various state values based on the selected
   * radio button value.
   * @param {string} value - The value parameter is a string that represents the selected value from a
   * radio button.
   */
  const handleConfirmStoneRadioChange = (value: string) => {
    setInputError(false);
    setInputErrorContent('');
    setSelectedDaysInputValue('');
    setSelectedRadioDaysValue(value);
  };

  /**
   * The onFocus function calls the handleConfirmStoneRadioChange function with the argument 'other'.
   */
  const onFocus = () => {
    handleConfirmStoneRadioChange('other');
  };

  /* The above code is defining an array of radio button objects for a form in a TypeScript React
 component. Each radio button object has properties such as name, onChange event handler, id, value,
 label, and checked. The radio buttons are used to select a duration (7 days, 30 days, 60 days, or a
 custom value) and update the selected value in the component's state. The last radio button has a
 custom label that includes an input field for entering a custom number of days. */
  const confirmRadioButtons = [
    {
      name: 'days',
      onChange: handleConfirmStoneRadioChange,
      id: '0',
      value: '7',
      label: '7 Days',
      checked: selectedRadioDaysValue === '7',
    },
    {
      name: 'days',
      onChange: handleConfirmStoneRadioChange,
      id: '1',
      value: '30',
      label: '30 Days',
      checked: selectedRadioDaysValue === '30',
    },
    {
      name: 'days',
      onChange: handleConfirmStoneRadioChange,
      id: '2',
      value: '60',
      label: '60 Days',
      checked: selectedRadioDaysValue === '60',
    },
    {
      name: 'days',
      onChange: handleConfirmStoneRadioChange,
      id: '3',
      value: 'other',
      label: (
        <>
          <div className="flex gap-2">
            <CustomInputField
              name="daysField"
              type="number"
              // disable={selectedRadioDaysValue !== 'other'}
              onChange={handleRadioDayValue}
              value={selectedDaysInputValue}
              placeholder="Max 120 Days"
              style={{ input: 'w-[80px]' }}
              onFocus={onFocus}
            />
            <div>Days</div>
          </div>
          {inputError ? (
            <div className="h-[10px] text-[#983131]">{inputErrorContent}</div>
          ) : (
            <div className="h-[10px]" />
          )}
        </>
      ),
      checked: selectedRadioDaysValue === 'other',
    },
  ];

  /**
   * Function to confirm a stone by calling the `confirmStone` API endpoint.
   * It retrieves the variant IDs from the `confirmStoneData` array and adds them to the `variantIds` array.
   * If the `variantIds` array is not empty and there is no `inputError`, it calls the `confirmStone` function with the appropriate parameters.
   * Finally, it handles the promise returned by `confirmStone`, logging any errors to the console.
   * @returns None
   */
  const confirmStoneFunction = () => {
    let variantIds: string[] = [];

    confirmStoneData.forEach((ids: any) => {
      variantIds.push(ids.variants[0].id);
    });

    if (variantIds.length && !inputError) {
      confirmStone({
        variants: variantIds,
        comments: commentValue,
        payment_term: parseInt(
          selectedDaysInputValue.length > 0
            ? selectedDaysInputValue
            : selectedRadioDaysValue
        ),
      })
        .unwrap()
        .then((res) => {})
        .catch((e) => console.log(e));
    }
  };

  /**
   * The function `handleComment` updates the comment value based on the input value, but only if the
   * input value is within a certain character limit.
   * @param event - The event parameter is of type React.ChangeEvent<HTMLInputElement>. It represents the
   * event that occurred, such as a change in the input value of an HTML input element.
   */
  const handleComment = (event: any) => {
    let inputValue = event.target.value;
    if (inputValue.length <= CONFIRM_STONE_COMMENT_MAX_CHARACTERS) {
      setCommentValue(inputValue);
    }
  };

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
            handleClick={() => {
              confirmStoneFunction();
            }}
          />
        </div>
        <div className="border-b border-solitaireSenary mt-5"></div>
      </div>
    </>
  );
};

export default ConfirmStone;
