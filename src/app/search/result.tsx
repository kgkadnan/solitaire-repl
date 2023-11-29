/* The above code is a TypeScript React component called "SearchResults". It is responsible for
rendering and managing the search results page. */
'use client';
import { CustomFooter } from '@/components/common/footer';
import styles from './search-results.module.scss';
import { ManageLocales } from '@/utils/translate';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import sortOutline from '@public/assets/icons/sort-outline.svg';
import Image from 'next/image';
import { CustomDropdown } from '@/components/common/dropdown';
import { CustomSlider } from '@/components/common/slider';
import CustomDataTable from '@/components/common/data-table';
import { useAppDispatch } from '@/hooks/hook';
import { useAddCartMutation } from '@/features/api/cart';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { notificationBadge } from '@/features/notification/notification-slice';
import { CustomDialog } from '@/components/common/dialog';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { IYourSelection, Product, TableColumn } from './result-interface';
import {
  useAddSavedSearchMutation,
  useUpdateSavedSearchMutation,
} from '@/features/api/saved-searches';
import { CustomInputDialog } from '@/components/common/input-dialog';
import { downloadExcelFromBase64 } from '@/utils/download-excel-from-base64';
import CustomLoader from '@/components/common/loader';
import { CustomInputField } from '@/components/common/input-field';
import ConfirmStone from '@/components/common/confirm-stone';
import { RadioButton } from '@/components/common/custom-input-radio';
import { CONFIRM_STONE_COMMENT_MAX_CHARACTERS } from '@/constants/business-logic';
// Define a type for the radio state

const SearchResults = ({ data, activeTab, refetch: refetchRow }: any) => {
  /* The above code is using the `useAppDispatch` hook from the Redux toolkit in a TypeScript React
  component. It is assigning the returned dispatch function to the `dispatch` constant. */
  const dispatch = useAppDispatch();

  const [rows, setRows] = useState<Product[]>([]);
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const [yourSelectionData, setYourSelectionData] = useState<IYourSelection[]>(
    []
  );

  const [selectedCaratRadioValue, setSelectedCaratRadioValue] =
    useState<string>('');
  const [selectedClarityRadioValue, setSelectedClarityRadioValue] =
    useState<string>('');
  const [selectedPriceRadioValue, setSelectedPriceRadioValue] =
    useState<string>('');
  const [selectedDiscountRadioValue, setSelectedDiscountRadioValue] =
    useState<string>('');
  const [seletedTableInclusionRadioValue, setSeletedTableInclusionRadioValue] =
    useState<string>('');
  const [selectedFluorescenceRadioValue, setSelectedFluorescenceRadioValue] =
    useState<string>('');
  const [selectedBlackTableRadioValue, setSelectedBlackTableRadioValue] =
    useState<string>('');
  const [selectedSideBlackRadioValue, setSelectedSideBlackRadioValue] =
    useState<string>('');
  const [selectedRadioDaysValue, setSelectedRadioDaysValue] =
    useState<string>();
  const [refetchDataToDefault, setRefetchDataToDefault] = useState(false);
  const [selectedDefaultValue, setSelectedDefaultValue] = useState<string>('');
  const [previousRadioState, setPreviousRadioState] = useState<any>(null);

  const [selectedDaysInputValue, setSelectedDaysInputValue] = useState('');

  const [totalAmount, setTotalAmount] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);

  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState<string>('');

  const [inputError, setInputError] = useState(false);
  const [inputErrorContent, setInputErrorContent] = useState('');

  const [isSliderOpen, setIsSliderOpen] = useState(Boolean);
  const [isSortBySliderOpen, setIsSortBySliderOpen] = useState(Boolean);

  const [confirmStoneData, setConfirmStoneData] = useState<Product[]>([]);
  const [commentValue, setCommentValue] = useState('');

  let [addSavedSearch] = useAddSavedSearchMutation();
  const [updateSavedSearch] = useUpdateSavedSearchMutation();
  let [downloadExcel] = useDownloadExcelMutation();
  const [addCart] = useAddCartMutation();
  const { data: listingColumns } = useGetManageListingSequenceQuery({});

  /**
   * The handleClick function updates the isCheck state based on the clicked id and also updates the
   * isCheckAll state if all rows are selected.
   * @param {string} id - The `id` parameter is a string that represents the identifier of an item.
   */
  const handleClick = (id: string) => {
    let updatedIsCheck = [...isCheck];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter((item) => item !== id);
    } else {
      updatedIsCheck.push(id);
    }

    setIsCheck(updatedIsCheck);

    if (updatedIsCheck.length === rows?.length) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
    if (isCheckAll) {
      setIsCheckAll(false);
    }
  };

  /**
   * The function `handleSelectAllCheckbox` toggles the `isCheckAll` state and updates the `isCheck`
   * state based on the `rows` array.
   */
  const handleSelectAllCheckbox = () => {
    setIsCheckAll(!isCheckAll);

    setIsCheck(rows?.map((li: Product) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  /* The above code is defining an object called `checkboxData` with four properties:
`handleSelectAllCheckbox`, `handleClick`, `isCheck`, and `isCheckAll`. These properties are likely
used in a React component to handle checkbox functionality. */
  let checkboxData = {
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    handleClick: handleClick,
    isCheck: isCheck,
    isCheckAll: isCheckAll,
  };

  /* The above code is a function called `performDownloadExcel` that takes an array of `productIds` as a
parameter. */
  const performDownloadExcel = (productIds: any[]) => {
    downloadExcel({ productIds })
      .unwrap()
      .then((res) => {
        let { data, fileName } = res;
        if (data) {
          setDialogContent(
            <>
              <div className="max-w-[380px] flex justify-center align-middle">
                <Image src={confirmImage} alt="vector image" />
              </div>
              <div className="max-w-[380px] flex justify-center align-middle text-solitaireTertiary">
                Download Excel Successfully
              </div>
            </>
          );
          setIsDialogOpen(true);
          downloadExcelFromBase64(data, fileName);
        }
      })
      .catch((e) => {
        console.log('error', e);
      });

    setIsCheck([]);
    setIsCheckAll(false);
    setIsError(false);
  };

  /**
   * The function `downloadExcelFunction` checks if a stone is selected and performs a download action if
   * it is.
   */
  const downloadExcelFunction = () => {
    if (isCheck.length === 0) {
      setIsError(true);
      setErrorText('Please select a stone to perform action.');
    } else if (isCheck.length) {
      performDownloadExcel(isCheck);
    }
  };
  /* The above code is using the `useEffect` hook in a React component. It is setting the state variable
`tableColumns` to the value of `listingColumns` when `listingColumns` changes. */
  useEffect(() => {
    setTableColumns(listingColumns);
  }, [listingColumns]);
  /**
   * The function `compareStone` checks the number of selected stones and performs different actions
   * based on the number, including displaying error messages or opening a new window to compare the
   * selected stones.
   */
  const compareStone = () => {
    if (isCheck.length > 10) {
      setIsError(true);
      setErrorText('You can compare maximum of ten stones.');
    } else if (isCheck.length < 1) {
      setIsError(true);
      setErrorText('Please select a stone to perform action');
    } else if (isCheck.length < 2) {
      setIsError(true);
      setErrorText('Minimum 2 stone to compare.');
    } else {
      let comapreStone = isCheck.map((id) => {
        return rows.find((row) => row.id === id);
      });

      localStorage.setItem('compareStone', JSON.stringify(comapreStone));
      window.open('/compare-stone', '_blank');
      setIsError(false);
      setErrorText('');
    }
  };

  /* useEffect hook in a TypeScript React component. It is used to
handle the logic for closing a dialog box after a certain delay. */
  useEffect(() => {
    if (isDialogOpen) {
      // Set a timeout to close the dialog box after a delay (e.g., 3000 milliseconds)
      const timeoutId = setTimeout(() => {
        setIsDialogOpen(false);
      }, 3000);

      // Cleanup the timeout when the component unmounts or when isDialogOpen changes
      return () => clearTimeout(timeoutId);
    }
  }, [isDialogOpen]);

  /* The above code is defining a function called `addToCart` in a TypeScript React component. */
  const addToCart = () => {
    if (isCheck.length > 100) {
      setIsError(true);
      setErrorText('The cart does not allow more than 100 Stones.');
    } else if (isCheck.length < 1) {
      setIsError(true);
      setErrorText('Please select a stone to perform action');
    } else {
      let hasMemoOut = isCheck.some((id) => {
        return rows.some(
          (row) => row.id == id && row.diamond_status === 'MemoOut'
        );
      });

      if (hasMemoOut) {
        setErrorText(
          'Some stones in your selection are not available, Please modify your selection.'
        );
        setIsError(true);
      } else {
        let variantIds = isCheck.map((id) => {
          const selectedRow = rows.find((row) => row.id === id);
          return selectedRow?.variants[0]?.id;
        });
        if (variantIds.length) {
          addCart({
            variants: variantIds,
          })
            .unwrap()
            .then((res) => {
              setIsError(false);
              setErrorText('');
              setDialogContent(
                <>
                  <div className="w-[350px] flex justify-center align-middle">
                    <Image src={confirmImage} alt="vector image" />
                  </div>
                  <div className="w-[350px] flex justify-center text-center align-middle text-solitaireTertiary pb-7">
                    {res?.message}
                  </div>
                </>
              );
              setIsDialogOpen(true);
              refetchRow();
              dispatch(notificationBadge(true));
            })
            .catch((error) => {
              setIsError(true);
              setErrorText(error?.data?.message);
            });
          setIsCheck([]);
          setIsCheckAll(false);
        }
      }
    }
  };

  /**
   * The function `handleConfirm` checks if any selected stones have a status of "MemoOut" and displays
   * an error message if so, otherwise it opens a slider and sets the selected stones data.
   * @param {string[]} [isCheck] - An optional array of strings representing the IDs of the stones that
   * are being checked.
   */
  const handleConfirm = (isCheck?: string[]) => {
    let hasMemoOut = isCheck?.some((id) => {
      return rows.some(
        (row) => row.id == id && row.diamond_status === 'MemoOut'
      );
    });

    if (hasMemoOut) {
      setErrorText(
        'Some stones in your selection are not available, Please modify your selection.'
      );
      setIsError(true);
    } else if (isCheck?.length) {
      setIsError(false);
      setErrorText('Please select a stone to perform action.');
      setIsSliderOpen(true);
      const confirmStone = rows.filter((item) => isCheck?.includes(item.id));
      setConfirmStoneData(confirmStone);
    } else {
      setIsError(true);
      setErrorText('Please select a stone to perform action.');
    }
  };

  /**
   * The above code defines multiple functions to handle radio button changes and update corresponding
   * state values.
   * @param {string} radioValue - The `radioValue` parameter is a string that represents the selected
   * value of a radio button.
   */
  const handleCaratRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedCaratRadioValue(radioValue);
  };
  const handleClarityRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedClarityRadioValue(radioValue);
  };
  const handlePriceRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedPriceRadioValue(radioValue);
  };
  const handleDiscountRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedDiscountRadioValue(radioValue);
  };
  const handleTableInclusionRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSeletedTableInclusionRadioValue(radioValue);
  };
  const handleFluorescenceRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedFluorescenceRadioValue(radioValue);
  };
  const handleBlackTableRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedBlackTableRadioValue(radioValue);
  };
  const handleSideBlackRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSelectedSideBlackRadioValue(radioValue);
  };
  const handleDefaultRadioChange = (radioValue: string) => {
    setSelectedCaratRadioValue('');
    setSelectedSideBlackRadioValue('');
    setSelectedBlackTableRadioValue('');
    setSeletedTableInclusionRadioValue('');
    setSelectedDiscountRadioValue('');
    setSelectedFluorescenceRadioValue('');
    setSelectedPriceRadioValue('');
    setSelectedClarityRadioValue('');
    setSelectedDefaultValue(radioValue);
  };

  /* The above code is defining an array of radio button data for sorting options. Each radio button data
object contains properties such as name, onChange event handler, id, value, label, and checked
status. These properties are used to render and handle the radio buttons in a React component. The
code also combines all the radio button data arrays into a single array called RadioData. */

  const DefaultRadioData = [
    {
      name: 'Default',
      onChange: handleDefaultRadioChange,
      id: '1',
      value: 'Default',
      label: 'Default',
      checked: selectedDefaultValue == 'Default',
    },
  ];
  const carartRadioData = [
    {
      name: 'carat',
      onChange: handleCaratRadioChange,
      id: '1',
      value: 'Carat - Low to High',
      label: 'Carat - Low to High',
      checked: selectedCaratRadioValue === 'Carat - Low to High',
    },
    {
      name: 'carat',
      onChange: handleCaratRadioChange,
      id: '2',
      value: 'Carat - High to Low',
      label: 'Carat - High to Low',
      checked: selectedCaratRadioValue === 'Carat - High to Low',
    },
  ];
  const clarityRadioData = [
    {
      name: 'clarity',
      onChange: handleClarityRadioChange,
      id: '1',
      value: 'Clarity - Low to High',
      label: 'Clarity - (FL - I3)',
      checked: selectedClarityRadioValue == 'Clarity - Low to High',
    },
    {
      name: 'clarity',
      onChange: handleClarityRadioChange,
      id: '2',
      value: 'Clarity - High to Low',
      label: 'Clarity - (I3 - FL)',
      checked: selectedClarityRadioValue == 'Clarity - High to Low',
    },
  ];
  const priceRadioData = [
    {
      name: 'price',
      onChange: handlePriceRadioChange,
      id: '1',
      value: 'Price - Low to High',
      label: 'Price - Low to High',
      checked: selectedPriceRadioValue == 'Price - Low to High',
    },
    {
      name: 'price',
      onChange: handlePriceRadioChange,
      id: '2',
      value: 'Price - High to Low',
      label: 'Price - High to Low',
      checked: selectedPriceRadioValue == 'Price - High to Low',
    },
  ];
  const discountRadioData = [
    {
      name: 'discount',
      onChange: handleDiscountRadioChange,
      id: '1',
      value: 'Discount - Low to High',
      label: 'Discount - Low to High',
      checked: selectedDiscountRadioValue == 'Discount - Low to High',
    },
    {
      name: 'discount',
      onChange: handleDiscountRadioChange,
      id: '2',
      value: 'Discount - High to Low',
      label: 'Discount - High to Low',
      checked: selectedDiscountRadioValue == 'Discount - High to Low',
    },
  ];
  const tableInclusionRadioData = [
    {
      name: 'Table Inclusion',
      onChange: handleTableInclusionRadioChange,
      id: '1',
      value: 'Table_Inclusion - Low to High',
      label: 'Table Inclusion - (T0 - T3)',
      checked:
        seletedTableInclusionRadioValue == 'Table_Inclusion - Low to High',
    },
    {
      name: 'Table Inclusion',
      onChange: handleTableInclusionRadioChange,
      id: '2',
      value: 'Table_Inclusion - High to Low',
      label: 'Table Inclusion - (T3 - T0)',
      checked:
        seletedTableInclusionRadioValue == 'Table_Inclusion - High to Low',
    },
  ];
  const fluorescenceRadioData = [
    {
      name: 'Fluorescence',
      onChange: handleFluorescenceRadioChange,
      id: '1',
      value: 'Fluorescence - Low to High',
      label: 'Fluorescence - (NON - VSTG) ',
      checked: selectedFluorescenceRadioValue == 'Fluorescence - Low to High',
    },
    {
      name: 'Fluorescence',
      onChange: handleFluorescenceRadioChange,
      id: '2',
      value: 'Fluorescence - High to Low',
      label: 'Fluorescence - (VSTG - NON) ',
      checked: selectedFluorescenceRadioValue == 'Fluorescence - High to Low',
    },
  ];
  const blackTableRadioData = [
    {
      name: 'Black Table',
      onChange: handleBlackTableRadioChange,
      id: '1',
      value: 'black_table - Low to High',
      label: 'Black Table - (B0 - B3) ',
      checked: selectedBlackTableRadioValue == 'black_table - Low to High',
    },
    {
      name: 'Black Table',
      onChange: handleBlackTableRadioChange,
      id: '2',
      value: 'black_table - High to Low',
      label: 'Black Table - (B3 - B0) ',
      checked: selectedBlackTableRadioValue == 'black_table - High to Low',
    },
  ];
  const sideBlackRadioData = [
    {
      name: 'Side Black',
      onChange: handleSideBlackRadioChange,
      id: '1',
      value: 'side_black - Low to High',
      label: 'Side Black - (SB0 - SB3) ',
      checked: selectedSideBlackRadioValue == 'side_black - Low to High',
    },
    {
      name: 'Side Black',
      onChange: handleSideBlackRadioChange,
      id: '2',
      value: 'side_black - High to Low',
      label: 'Side Black - (SB3 - SB0) ',
      checked: selectedSideBlackRadioValue == 'side_black - High to Low',
    },
  ];
  const RadioData = [
    ...DefaultRadioData,
    ...carartRadioData,
    ...clarityRadioData,
    ...priceRadioData,
    ...discountRadioData,
    ...tableInclusionRadioData,
    ...fluorescenceRadioData,
    ...blackTableRadioData,
    ...sideBlackRadioData,
  ];

  const customSortOrder = (orderArray: string[]) => (a: string, b: string) =>
    orderArray.indexOf(a) - orderArray.indexOf(b);

  const customSortFunctions: Record<string, Function> = {
    table_inclusion: customSortOrder(['T0', 'T1', 'B1', 'T2', 'T3']),
    fluorescence: customSortOrder([
      'NON',
      'FNT',
      'VSL',
      'MED',
      'STG',
      'SLT',
      'VSTG',
    ]),
    side_black: customSortOrder(['SBO', 'SBPP', 'SB1', 'SB2', 'SB3']),
    black_table: customSortOrder(['BO', 'BPP', 'B1', 'B2', 'B3']),
    clarity: customSortOrder([
      'FL',
      'IF',
      'VVS1',
      'VVS2',
      'VS1',
      'VS2',
      'SI1',
      'SI2',
      'SI3',
      'I1',
      'I2',
      'I3',
    ]),
  };

  /**
   * Sorts an array of products based on a specified order and key.
   * @param {any[]} data - The array of products to sort.
   * @param {string} order - The order in which to sort the products ('low to high' or 'high to low').
   * @param {string} key - The key to use for sorting the products.
   * @returns {any[]} - The sorted array of products.
   */
  const sortProducts = (data: any, order: string, key: string) =>
    [...data].sort((a, b) => {
      const customSortFunction = customSortFunctions[key];

      if (order === 'low to high' && customSortFunction) {
        return customSortFunction(a[key], b[key]);
      } else if (order === 'high to low' && customSortFunction) {
        return customSortFunction(b[key], a[key]);
      } else if (a[key] !== b[key]) {
        return order === 'low to high' ? a[key] - b[key] : b[key] - a[key];
      } else if (key === 'price') {
        return order === 'low to high'
          ? a?.variants[0]?.prices[0]?.amount -
              b?.variants[0]?.prices[0]?.amount
          : b?.variants[0]?.prices[0]?.amount -
              a?.variants[0]?.prices[0]?.amount;
      } else {
        return 0;
      }
    });

  /**
   * Sorts the data based on the selected sorting options.
   * @returns None
   */
  const sortData = () => {
    const sortingOptions = [
      seletedTableInclusionRadioValue,
      selectedCaratRadioValue,
      selectedDiscountRadioValue,
      selectedFluorescenceRadioValue,
      selectedBlackTableRadioValue,
      selectedSideBlackRadioValue,
      selectedClarityRadioValue,
      selectedPriceRadioValue,
      // Add more sorting options if needed
    ];
    // Save the current state as the previous state
    setPreviousRadioState((prevState: any) => ({
      ...prevState,
      seletedTableInclusionRadioValue,
      selectedCaratRadioValue,
      selectedDiscountRadioValue,
      selectedFluorescenceRadioValue,
      selectedBlackTableRadioValue,
      selectedSideBlackRadioValue,
      selectedClarityRadioValue,
      selectedDefaultValue,
      selectedPriceRadioValue,
    }));

    if (selectedDefaultValue.length) {
      setRefetchDataToDefault(!refetchDataToDefault);
      setIsSortBySliderOpen(false);
    } else {
      const validSortingOptions = sortingOptions
        .filter((option) => option !== '')
        .map((option) => option.split(' - '))
        .filter(([key, order]) => key && order)
        .map(([key, order]) => ({
          key: key.toLowerCase().trim(),
          order: order.toLowerCase().trim(),
        }));

      if (validSortingOptions.length > 0) {
        const sortedData = validSortingOptions.reduce(
          (acc, { key, order }) => sortProducts(acc, order, key),
          rows
        );
        setRows(sortedData);
        setIsSortBySliderOpen(false);
      }
    }
  };

  /**
   * The function `onOpenChangeSortBy` resets multiple state values and sets the `isSortBySliderOpen`
   * state based on the `open` parameter.
   * @param {boolean} open - A boolean value indicating whether the sort by slider should be open or
   * closed.
   */
  const onOpenChangeSortBy = (open: boolean) => {
    setIsSortBySliderOpen(open);
  };

  /**
   * Handles the cancel action by resetting the selected radio values to their previous state
   * or clearing them if there is no previous state. Also closes the sort by dropdown.
   * @returns None
   */
  const handleCancel = () => {
    if (previousRadioState) {
      setSeletedTableInclusionRadioValue(
        previousRadioState.selectedTableInclusionRadioValue || ''
      );
      setSelectedDefaultValue(previousRadioState.selectedDefaultValue || '');
      setSelectedPriceRadioValue(
        previousRadioState.selectedPriceRadioValue || ''
      );
      setSelectedCaratRadioValue(
        previousRadioState.selectedCaratRadioValue || ''
      );
      setSelectedDiscountRadioValue(
        previousRadioState.selectedDiscountRadioValue || ''
      );
      setSelectedFluorescenceRadioValue(
        previousRadioState.selectedFluorescenceRadioValue || ''
      );
      setSelectedBlackTableRadioValue(
        previousRadioState.selectedBlackTableRadioValue || ''
      );
      setSelectedSideBlackRadioValue(
        previousRadioState.selectedSideBlackRadioValue || ''
      );
      setSelectedClarityRadioValue(
        previousRadioState.selectedClarityRadioValue || ''
      );
      // Add more properties if needed
    } else {
      setSelectedClarityRadioValue('');
      setSelectedSideBlackRadioValue('');
      setSelectedBlackTableRadioValue('');
      setSelectedFluorescenceRadioValue('');
      setSelectedDiscountRadioValue('');
      setSelectedPriceRadioValue('');
      setSelectedCaratRadioValue('');
      setSeletedTableInclusionRadioValue('');
      setSelectedDefaultValue('');
      onOpenChangeSortBy(false);
    }
  };

  /**
   * The function `handleComment` updates the comment value based on the input value, but only if the
   * input value is within a certain character limit.
   * @param event - The event parameter is of type React.ChangeEvent<HTMLInputElement>. It represents the
   * event that occurred, such as a change in the input value of an HTML input element.
   */
  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    if (inputValue.length <= CONFIRM_STONE_COMMENT_MAX_CHARACTERS) {
      setCommentValue(inputValue);
    }
  };

  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: (
        <CustomDropdown
          dropdownTrigger={
            <CustomDisplayButton
              displayButtonLabel={ManageLocales('app.searchResult.footer.more')}
              displayButtonAllStyle={{
                displayButtonStyle: styles.transparent,
              }}
            />
          }
          dropdownMenu={[
            {
              label: 'Share',
              fn: '',
            },
            {
              label: 'Download Excel',
              fn: downloadExcelFunction,
            },
            {
              label: 'Find Matching Pair',
              fn: '',
            },
            {
              label: 'Compare Stone',
              fn: compareStone,
            },
          ]}
        />
      ),
    },
    {
      id: 2,
      displayButtonLabel: ManageLocales(
        'app.searchResult.footer.bookAppointment'
      ),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.transparent,
      fn: addToCart,
    },
    {
      id: 4,
      displayButtonLabel: ManageLocales('app.searchResult.footer.confirmStone'),
      style: styles.filled,
      fn: () => handleConfirm(isCheck),
    },
  ];

  /* The above code is defining a function called `calculateTotalAmount` using the `useCallback` hook in
React. This function calculates the total amount based on the selected rows and their corresponding
variants' prices. */
  const calculateTotalAmount = useCallback(() => {
    let total = 0;

    isCheck.forEach((id) => {
      const selectedRow = rows.find((row) => row.id === id);
      if (selectedRow) {
        const variant = selectedRow.variants.find(
          (variant) => variant.prices.length > 0
        );
        if (variant) {
          total += variant.prices[0].amount;
        }
      }
    });

    return total;
  }, [isCheck, rows]);

  /* The above code is a TypeScript React function called `calculateAverageDiscount`. It calculates the
average discount of selected rows based on the `isCheck` array and `rows` array. */
  const calculateAverageDiscount = useCallback(() => {
    let totalDiscount = 0;
    isCheck.forEach((id) => {
      const selectedRow = rows.find((row) => row.id === id);
      if (selectedRow) {
        totalDiscount += selectedRow?.discount;
      }
    });
    // Calculate average discount
    const avgDiscount = isCheck.length > 0 ? totalDiscount / isCheck.length : 0;
    return avgDiscount;
  }, [isCheck, rows]);

  /* The above code is using the useEffect hook in a React component. It is setting up a side effect that
will be triggered whenever the value of the "isCheck" variable changes. */
  useEffect(() => {
    // Update total amount and average discount whenever isCheck changes
    setTotalAmount(calculateTotalAmount());
    setAverageDiscount(calculateAverageDiscount());
  }, [calculateTotalAmount, calculateAverageDiscount]);

  /* The above code is using the useEffect hook in a React component. It is triggered whenever the `data`
variable changes. */
  useEffect(() => {
    let selection = localStorage.getItem('Search');
    if (selection) {
      let yourSelection = JSON.parse(selection);
      setYourSelectionData(yourSelection);
      if (data?.products?.length) {
        setIsCheck([]);
        setIsCheckAll(false);
        setRows(data?.products);
      }
    }
  }, [data, refetchDataToDefault]);

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
   * The function `handleSaveSearch` saves search data to localStorage and updates the state with the
   * saved search information.
   */
  const handleSaveSearch = async () => {
    // Retrieve the array from localStorage
    const searchData = localStorage.getItem('Search');

    if (searchData !== null) {
      const parseData = JSON.parse(searchData) || [];

      await addSavedSearch({
        name: saveSearchName,
        diamond_count: parseInt(data?.count),
        meta_data: parseData[activeTab].queryParams,
        is_deleted: false,
      })
        .unwrap()
        .then((res: any) => {
          parseData[activeTab] = {
            id: res?.id,
            saveSearchName,
            isSavedSearch: true,
            queryParams: parseData[activeTab].queryParams,
          };
          localStorage.setItem('Search', JSON.stringify(parseData));
          setYourSelectionData(parseData);
          setIsInputDialogOpen(false);
          setSaveSearchName('');
        })

        .catch((error: any) => {
          console.log('error', error);
          setInputError(true);
          setInputErrorContent(
            'Title already exists. Choose another title to save your search'
          );
        });
    }
  };

  const customInputDialogData = {
    isOpens: isInputDialogOpen,
    setIsOpen: setIsInputDialogOpen,
    setInputvalue: setSaveSearchName,
    inputValue: saveSearchName,
    displayButtonFunction: handleSaveSearch,
    label: 'Save And Search',
    name: 'save',
    displayButtonLabel2: 'Save',
  };

  /**
   * The function handleCloseInputDialog is used to close an input dialog and reset related state
   * variables.
   */
  const handleCloseInputDialog = () => {
    setIsInputDialogOpen(false);
    setInputError(false);
    setInputErrorContent('');
    setSaveSearchName('');
  };

  /**
   * The function `handleUpdateSaveSearch` updates the save search data in local storage and calls the
   * `updateSavedSearch` function.
   */
  const handleUpdateSaveSearch = () => {
    let yourSelection = JSON.parse(localStorage.getItem('Search')!);

    let updateSaveSearchData = {
      id: yourSelection[activeTab]?.id,
      name: yourSelection[activeTab]?.saveSearchName,
      meta_data: yourSelection[activeTab]?.queryParams,
      diamond_count: parseInt(data?.count),
    };

    yourSelection[activeTab] = {
      id: yourSelection[activeTab]?.id,
      saveSearchName: yourSelection[activeTab]?.saveSearchName,
      isSavedSearch: true,
      queryParams: yourSelection[activeTab].queryParams,
    };
    localStorage.setItem('Search', JSON.stringify(yourSelection));
    setYourSelectionData(yourSelection);
    updateSavedSearch(updateSaveSearchData);
  };

  /**
   * The function `onOpenChange` updates the state variables `isSliderOpen` and `selectedRadioDaysValue`
   * based on the value of the `open` parameter.
   * @param {boolean} open - The open parameter is a boolean value that indicates whether the slider is
   * open or closed.
   */
  const onOpenChange = (open: boolean) => {
    setIsSliderOpen(open);
    setSelectedRadioDaysValue('');
  };

  return (
    <>
      <CustomSlider
        sheetContent={
          <ConfirmStone
            onOpenChange={onOpenChange}
            commentValue={commentValue}
            handleComment={handleComment}
            setInputError={setInputError}
            listingColumns={listingColumns}
            confirmStoneData={confirmStoneData}
            confirmRadioButtons={confirmRadioButtons}
            setInputErrorContent={setInputErrorContent}
            setSelectedDaysInputValue={setSelectedDaysInputValue}
          />
        }
        isSliderOpen={isSliderOpen}
        onOpenChange={onOpenChange}
        sheetContentStyle={styles.diamondDetailSheet}
      />
      <CustomInputDialog
        isError={inputError}
        setIsError={setInputError}
        errorContent={inputErrorContent}
        handleClose={handleCloseInputDialog}
        setErrorContent={setInputErrorContent}
        customInputDialogData={customInputDialogData}
      />
      <CustomDialog
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        dialogContent={dialogContent}
      />

      <div className="mb-2 mt-[-40px]">
        {/* Count Bar  */}
        <div className="flex justify-between items-center h-7">
          <div className="flex gap-3">
            <p>
              {ManageLocales('app.searchResult.countBar.pieces')}:
              <span className="text-solitaireTertiary ml-[5px]">
                {`${isCheck.length}/${
                  rows?.length && tableColumns?.length && data?.count
                    ? data?.count
                    : 0
                }`}
              </span>
            </p>
            <p>
              {ManageLocales('app.searchResult.countBar.totalAvgDis')}:
              <span className="text-solitaireTertiary ml-[5px]">
                {averageDiscount.toFixed(2)}
              </span>
            </p>
            <p>
              {ManageLocales('app.searchResult.countBar.totalAmount')}:
              <span className="text-solitaireTertiary ml-[5px]">
                ${totalAmount.toFixed(2)}
              </span>
            </p>
          </div>
          <div className="flex gap-6">
            {yourSelectionData &&
            !yourSelectionData[activeTab]?.isSavedSearch ? (
              <CustomDisplayButton
                displayButtonLabel={'Save this search'}
                handleClick={() =>
                  yourSelectionData[activeTab].saveSearchName.length
                    ? handleUpdateSaveSearch()
                    : setIsInputDialogOpen(true)
                }
                displayButtonAllStyle={{
                  displayLabelStyle: `text-solitaireTertiary cursor-pointer`,
                }}
              />
            ) : (
              ''
            )}

            <CustomSlider
              sheetTriggenContent={
                <div className="flex gap-1">
                  <Image
                    src={sortOutline}
                    alt="sortOutline"
                    width={20}
                    height={5}
                  />
                  <p className="text-solitaireTertiary">Sort by</p>
                </div>
              }
              sheetContentStyle={styles.sheetContentStyle}
              sheetContent={
                <>
                  <div className={styles.sheetMainHeading}>
                    <p>
                      {ManageLocales('app.searchResult.slider.sortBy.filter')}
                    </p>
                  </div>

                  <div className={styles.radioButtonMainDiv}>
                    {RadioData.map((radioData, index) => {
                      return (
                        <RadioButton
                          key={index} // Ensure each component has a unique key
                          radioMetaData={radioData}
                        />
                      );
                    })}
                  </div>

                  {/* button */}
                  <div className={styles.customButtonDiv}>
                    <CustomDisplayButton
                      displayButtonLabel={ManageLocales(
                        'app.searchResult.slider.sortBy.cancel'
                      )}
                      displayButtonAllStyle={{
                        displayButtonStyle: styles.transparent,
                      }}
                      handleClick={handleCancel}
                    />
                    <CustomDisplayButton
                      displayButtonLabel={ManageLocales(
                        'app.searchResult.slider.sortBy.apply'
                      )}
                      displayButtonAllStyle={{
                        displayButtonStyle: styles.filled,
                      }}
                      handleClick={sortData}
                    />
                  </div>
                </>
              }
              isSliderOpen={isSortBySliderOpen}
              onOpenChange={onOpenChangeSortBy}
            />
          </div>
        </div>
      </div>
      {/* <CustomHeader dummyData={headerData} /> */}

      {rows?.length && tableColumns?.length ? (
        <CustomDataTable
          tableRows={rows}
          tableColumns={tableColumns}
          checkboxData={checkboxData}
          mainTableStyle={styles.tableWrapper}
          handleConfirm={handleConfirm}
        />
      ) : (
        <CustomLoader />
      )}

      <div className="sticky-bottom bg-solitairePrimary mt-3">
        <div className="flex border-t-2 border-solitaireSenary items-center py-3 gap-3">
          <div className="flex items-center gap-3">
            <span className="text-solitaireTertiary bg-solitaireSenary px-2 rounded-md">
              xxxxxxx
            </span>
            <p className="text-solitaireTertiary text-sm">Memo - Out</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-solitaireTertiary bg-[#614C4B] px-2 rounded-md">
              xxxxxxx
            </span>
            <p className="text-solitaireTertiary text-sm">In Cart</p>
          </div>
        </div>

        <div className="flex border-t-2 border-solitaireSenary items-center justify-between">
          {isError && (
            <div className="w-[30%]">
              <p className="text-red-700 text-base ">{errorText}</p>
            </div>
          )}
          <CustomFooter
            footerButtonData={footerButtonData}
            noBorderTop={styles.paginationContainerStyle}
          />
        </div>
      </div>
    </>
  );
};

export default SearchResults;
