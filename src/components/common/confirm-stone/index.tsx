import { ManageLocales } from '@/utils/translate';
import React from 'react';
import styles from './confirm-stone.module.scss';
import CustomDataTable from '../data-table';
import { CustomDisplayButton } from '../buttons/display-button';
import { RadioButton } from '../custom-input-radio';
import { IConfirmStoneProps } from './interface';
import { CustomInputField } from '../input-field';
import { handleComment } from './helper/handle-comment';
import { handleRadioDayValue } from './helper/handle-radio-day-value';
import confirmImage from '@public/assets/icons/confirmation.svg';
import errorImage from '@public/assets/icons/error.svg';
import Image from 'next/image';
import { useConfirmProductMutation } from '@/features/api/product';
import Link from 'next/link';

const ConfirmStone: React.FC<IConfirmStoneProps> = ({
  listingColumns,
  errorState,
  errorSetState,
  onOpenChange,
  confirmStoneState,
  confirmStoneSetState,
  modalSetState,
  refetch
}) => {
  const [confirmProduct] = useConfirmProductMutation();

  const {
    setDialogContent,
    setIsDialogOpen,
    setIsPersistDialogOpen,
    setPersistDialogContent
  } = modalSetState;

  const { inputError, inputErrorContent, sliderErrorText, isSliderError } =
    errorState;
  const {
    setInputError,
    setInputErrorContent,
    setSliderErrorText,
    setIsSliderError
  } = errorSetState;
  const {
    confirmStoneData,
    commentValue,
    selectedDaysInputValue,
    selectedRadioDaysValue
  } = confirmStoneState;

  const {
    setCommentValue,
    setSelectedDaysInputValue,
    setSelectedRadioDaysValue
  } = confirmStoneSetState;

  /**
   * The function `handleConfirmStoneRadioChange` updates various state values based on the selected
   * radio button value.
   * @param {string} value - The value parameter is a string that represents the selected value from a
   * radio button.
   */
  const handleConfirmStoneRadioChange = (value: string) => {
    setIsSliderError(false);
    setSliderErrorText('');
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
      // onChange: handleConfirmStoneRadioChange,
      id: '0',
      value: '7',
      label: '7 Days',
      checked: selectedRadioDaysValue === '7'
    },
    {
      name: 'days',
      // onChange: handleConfirmStoneRadioChange,
      id: '1',
      value: '30',
      label: '30 Days',
      checked: selectedRadioDaysValue === '30'
    },
    {
      name: 'days',
      // onChange: handleConfirmStoneRadioChange,
      id: '2',
      value: '60',
      label: '60 Days',
      checked: selectedRadioDaysValue === '60'
    },
    {
      name: 'days',
      // onChange: handleConfirmStoneRadioChange,
      id: '3',
      value: 'other',
      label: (
        <>
          <div className="flex gap-2">
            <CustomInputField
              name="daysField"
              type="number"
              // disable={selectedRadioDaysValue !== 'other'}
              onChange={e =>
                handleRadioDayValue({
                  event: e,
                  setInputError,
                  setSelectedDaysInputValue,
                  setInputErrorContent
                })
              }
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
      checked: selectedRadioDaysValue === 'other'
    }
  ];

  /**
   * Function to confirm a stone by calling the `confirmStone` API endpoint.
   * It retrieves the variant IDs from the `confirmStoneData` array and adds them to the `variantIds` array.
   * If the `variantIds` array is not empty and there is no `inputError`, it calls the `confirmStone` function with the appropriate parameters.
   * Finally, it handles the promise returned by `confirmStone`, logging any errors to the console.
   * @returns None
   */

  const confirmStoneApiCall = () => {
    const variantIds: string[] = [];

    confirmStoneData.forEach((ids: any) => {
      variantIds.push(ids.variants[0].id);
    });

    if (!inputError) {
      if (
        variantIds.length &&
        ((selectedRadioDaysValue.length &&
          selectedRadioDaysValue !== 'other' &&
          !selectedDaysInputValue.length) ||
          (selectedRadioDaysValue === 'other' && selectedDaysInputValue.length))
      ) {
        confirmProduct({
          variants: variantIds,
          comments: commentValue,
          payment_term: parseInt(
            selectedDaysInputValue.length > 0
              ? selectedDaysInputValue
              : selectedRadioDaysValue
          )
        })
          .unwrap()
          .then(res => {
            if (res) {
              setIsPersistDialogOpen(true);
              setPersistDialogContent(
                <div className="text-center  flex flex-col justify-center items-center ">
                  <div className="w-[350px] flex justify-center items-center mb-3">
                    <Image src={confirmImage} alt="confirmImage" />
                  </div>
                  <div className="w-[350px]  text-center text-solitaireTertiary pb-3">
                    {variantIds.length} Stone Successfully Confirmed
                  </div>
                  <Link
                    href={'/my-diamonds'}
                    className={` p-[6px] w-[150px] bg-solitaireQuaternary text-[#fff] text-[14px] rounded-[5px]`}
                  >
                    Go to “My Diamonds”
                  </Link>
                </div>
              );
              setCommentValue('');
              setSelectedDaysInputValue('');
              setInputErrorContent('');
              setInputError(false);
              onOpenChange(false);

              if (refetch) {
                refetch();
              }
            }
          })
          .catch(e => {
            setCommentValue('');
            setSelectedDaysInputValue('');
            setInputErrorContent('');
            setInputError(false);
            onOpenChange(false);
            setIsDialogOpen(true);
            setDialogContent(
              <>
                <div className=" flex justify-center align-middle items-center">
                  <Image src={errorImage} alt="errorImage" />
                  <p>Error!</p>
                </div>
                <div className="text-center text-solitaireTertiary">
                  {e?.data?.message}
                </div>
              </>
            );
          });
      } else {
        setIsSliderError(true);
        setSliderErrorText('This Is a Mandotry Field');
      }
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
            errorSetState={errorSetState}
            confirmStoneSetState={confirmStoneSetState}
            modalSetState={modalSetState}
            confirmStoneState={confirmStoneState}
          />
        )}
        <div className="mt-5">
          <div className="flex text-center items-center gap-2">
            <p>
              {ManageLocales(
                'app.searchResult.slider.confirmStone.paymentTerms'
              )}
            </p>
            {isSliderError && (
              <p className="text-red-700 text-xs font-bold">
                {sliderErrorText}
              </p>
            )}
          </div>

          <div className="flex justify-between mt-2">
            {confirmRadioButtons?.map((radioData: any) => (
              <RadioButton
                radioMetaData={radioData}
                onChange={handleConfirmStoneRadioChange}
                key={radioData?.id}
              />
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
            // placeholder='Write Description'
            className="w-full bg-solitaireOctonary text-solitaireTertiary rounded-xl resize-none focus:outline-none p-2 placeholder:text-solitaireSenary mt-2"
            onChange={e => handleComment(e, setCommentValue)}
          />
        </div>

        <div className="flex text-center justify-center gap-4 mt-3">
          <CustomDisplayButton
            displayButtonLabel={ManageLocales(
              'app.searchResult.slider.confirmStone.cancel'
            )}
            displayButtonAllStyle={{
              displayButtonStyle: styles.transparent
            }}
            handleClick={() => {
              setSelectedRadioDaysValue('');
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
              displayButtonStyle: styles.filled
            }}
            handleClick={() => {
              confirmStoneApiCall();
            }}
          />
        </div>
        <div className="border-b border-solitaireSenary mt-5"></div>
      </div>
    </>
  );
};

export default ConfirmStone;
