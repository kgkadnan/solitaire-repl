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
import { CustomRadioButton } from '@/components/common/buttons/radio-button';
import CustomDataTable from '@/components/common/data-table';
import { useAppDispatch } from '@/hooks/hook';
import { useRouter } from 'next/navigation';
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
const MAX_CHARACTERS = 1000;
const SearchResults = ({ data, activeTab, refetch: refetchRow }: any) => {
  const radioButtonStyles = {
    radioButtonStyle: styles.radioStyle,
    radioLabelStyle: styles.labelStyle,
    mainRadioButton: styles.mainRadioButtonStyle,
  };
  const radioButtonDefaultStyles = {
    radioButtonStyle: styles.radioStyle,
    radioLabelStyle: styles.labelStyle,
  };
  const confirmStoneRadioButtonStyle = {
    radioButtonStyle: styles.radioStyle,
    radioLabelStyle: styles.labelStyle,
    mainRadioButton: styles.confirmMainRadioButtonStyle,
  };

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [rows, setRows] = useState<Product[]>([]);
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const [yourSelectionData, setYourSelectionData] = useState<IYourSelection[]>(
    []
  );

  let [addSavedSearch] = useAddSavedSearchMutation();
  const [updateSavedSearch] = useUpdateSavedSearchMutation();
  //Radio Button
  const [selectedRadioValue, setSelectedRadioValue] = useState<any[]>([]);
  const [selectedCaratRadioValue, setSelectedCaratRadioValue] =
    useState<string>('');
  const [selectedClarityRadioValue, setSelectedClarityRadioValue] =
    useState<string>('');
  const [seletedPriceRadioValue, setseletedPriceRadioValue] =
    useState<string>('');

  const [selectedRadioDaysValue, setSelectedRadioDaysValue] =
    useState<string>();
  const [selectedDaysInputValue, setSelectedDaysInputValue] = useState('');

  const [selectedDefaultValue, setSelectedDefaultValue] = useState<string>('');

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
  const [confirmStoneData, setConfirmStoneData] = useState<Product[]>();

  const [commentValue, setCommentValue] = useState('');

  let [downloadExcel] = useDownloadExcelMutation();

  const [addCart] = useAddCartMutation();

  const {
    data: listingColumns,
    error,
    isLoading,
  } = useGetManageListingSequenceQuery({});

  //specific checkbox
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

  //Selecting All Checkbox Function
  const handleSelectAllCheckbox = () => {
    setIsCheckAll(!isCheckAll);

    setIsCheck(rows?.map((li: Product) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  //setting listing columns
  useEffect(() => {
    setTableColumns(listingColumns);
  }, [listingColumns]);

  //Checkbox Data for Custom Data Table
  let checkboxData = {
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    handleClick: handleClick,
    isCheck: isCheck,
    isCheckAll: isCheckAll,
  };

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

  //download Excel
  const downloadExcelFunction = () => {
    if (isCheck.length === 0) {
      setIsError(true);
      setErrorText('Please select a stone to perform action.');
    } else if (isCheck.length) {
      performDownloadExcel(isCheck);
    }
  };

  //compareStone
  const CompareStone = () => {
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
      router.push('/compare-stone');
      setIsError(false);
      setErrorText('');
    }
  };

  useEffect(() => {
    if (isDialogOpen) {
      console.log('isDialogOpen', isDialogOpen);
      // Set a timeout to close the dialog box after a delay (e.g., 3000 milliseconds)
      const timeoutId = setTimeout(() => {
        setIsDialogOpen(false);
      }, 3000);

      // Cleanup the timeout when the component unmounts or when isDialogOpen changes
      return () => clearTimeout(timeoutId);
    }
  }, [isDialogOpen]);

  //cart
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

  const handleConfirm = () => {
    if (isCheck.length) {
      setIsError(false);
      setErrorText('Please select a stone to perform action.');
      setIsSliderOpen(true);
      const confirmStone = rows.filter((item) => isCheck.includes(item.id));
      setConfirmStoneData(confirmStone);
    } else {
      setIsError(true);
      setErrorText('Please select a stone to perform action.');
    }
  };

  const handleCaratRadioChange = (radioValue: string) => {
    console.log('rrrrrrrrrrrrrrrrr', radioValue);
    setSelectedDefaultValue('');
    setSelectedCaratRadioValue(radioValue);
  };

  const handleDefaultRadioChange = (radioValue: string) => {
    console.log('radioValue', radioValue);
    setSelectedDefaultValue(radioValue);
    setSelectedCaratRadioValue('');
  };

  const handleComment = (event: any) => {
    let inputValue = event.target.value;
    if (inputValue.length <= MAX_CHARACTERS) {
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
              fn: CompareStone,
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
      fn: handleConfirm,
    },
  ];

  // Function to calculate total amount
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

  // Function to calculate average discount
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

  useEffect(() => {
    // Update total amount and average discount whenever isCheck changes
    setTotalAmount(calculateTotalAmount());
    setAverageDiscount(calculateAverageDiscount());
  }, [calculateTotalAmount, calculateAverageDiscount]);

  useEffect(() => {
    let yourSelection = JSON.parse(localStorage.getItem('Search')!);
    if (yourSelection) {
      setYourSelectionData(yourSelection);
      if (data?.products?.length) {
        setIsCheck([]);
        setIsCheckAll(false);
        setRows(data?.products);
      }
    }
  }, [data]); // Include isEffectExecuted in the dependency array

  const radioDataList = [
    {
      name: 'Default',
      handleChange: handleDefaultRadioChange,
      radioData: [
        {
          id: '1',
          value: 'Default',
          radioButtonLabel: 'Default',
          checked: selectedDefaultValue == 'Default',
        },
      ],
    },

    {
      name: 'carat',
      handleChange: handleCaratRadioChange,
      radioData: [
        {
          id: '1',
          value: 'Low to High',
          radioButtonLabel: 'Carat - Low to High',
          checked: selectedCaratRadioValue == 'Low to High',
        },
        {
          id: '2',
          value: 'High to Low',
          radioButtonLabel: 'Carat - High to Low',
          checked: selectedCaratRadioValue == 'High to Low',
        },
      ],
    },
    {
      name: 'clarity',
      handleChange: handleCaratRadioChange,
      radioData: [
        {
          id: '1',
          value: '(FL - I3)',
          radioButtonLabel: 'Clarity - (FL - I3)',
          checked: selectedClarityRadioValue == '(FL - I3)',
        },
        {
          id: '2',
          value: '(I3 - FL)',
          radioButtonLabel: 'Clarity - (I3 - FL)',
          checked: selectedClarityRadioValue == '(I3 - FL)',
        },
      ],
    },
    {
      name: 'price',
      handleChange: handleCaratRadioChange,
      radioData: [
        {
          id: '1',
          value: 'Price - Low to High',
          radioButtonLabel: 'Price - Low to High',
          checked: seletedPriceRadioValue == 'Price - Low to High',
        },
        {
          id: '2',
          value: 'Price - High to Low',
          radioButtonLabel: 'Price - High to Low',
          checked: seletedPriceRadioValue == 'Price - High to Low',
        },
      ],
    },
    {
      name: 'discount',
      handleChange: handleCaratRadioChange,
      radioData: [
        {
          id: '1',
          value: 'Discount - Low to High',
          radioButtonLabel: 'Discount - Low to High',
          checked: seletedPriceRadioValue == 'Discount - Low to High',
        },
        {
          id: '2',
          value: 'Discount - High to Low',
          radioButtonLabel: 'Discount - High to Low',
          checked: seletedPriceRadioValue == 'Discount - High to Low',
        },
      ],
    },
    {
      name: 'Table Inclusion',
      handleChange: handleCaratRadioChange,
      radioData: [
        {
          id: '1',
          value: 'Table Inclusion - (T0 - T3)',
          radioButtonLabel: 'Table Inclusion - (T0 - T3)',
          checked: seletedPriceRadioValue == 'Table Inclusion - (T0 - T3)',
        },
        {
          id: '2',
          value: 'Table Inclusion - (T3 - T0)',
          radioButtonLabel: 'Table Inclusion - (T3 - T0)',
          checked: seletedPriceRadioValue == 'Table Inclusion - (T3 - T0)',
        },
      ],
    },
    {
      name: 'Fluorescence',
      handleChange: handleCaratRadioChange,
      radioData: [
        {
          id: '1',
          value: 'Fluorescence - (NON - VSTG)',
          radioButtonLabel: 'Fluorescence - (NON - VSTG) ',
          checked: seletedPriceRadioValue == 'Fluorescence - (NON - VSTG)',
        },
        {
          id: '2',
          value: 'Fluorescence - (VSTG - NON)',
          radioButtonLabel: 'Fluorescence - (VSTG - NON) ',
          checked: seletedPriceRadioValue == 'Fluorescence - (VSTG - NON)',
        },
      ],
    },
    {
      name: 'Black Table',
      handleChange: handleCaratRadioChange,
      radioData: [
        {
          id: '1',
          value: 'Black Table - (B0 - B3)',
          radioButtonLabel: 'Black Table - (B0 - B3) ',
          checked: seletedPriceRadioValue == 'Black Table - (B0 - B3)',
        },
        {
          id: '2',
          value: 'Black Table - (B3 - B0)',
          radioButtonLabel: 'Black Table - (B3 - B0) ',
          checked: seletedPriceRadioValue == 'Black Table - (B3 - B0)',
        },
      ],
    },
    {
      name: 'Side Black',
      handleChange: handleCaratRadioChange,
      radioData: [
        {
          id: '1',
          value: 'Side Black - (SB0 - SB3)',
          radioButtonLabel: 'Side Black - (SB0 - SB3) ',
          checked: seletedPriceRadioValue == 'Black Table - (B0 - B3)',
        },
        {
          id: '2',
          value: 'Side Black - (SB3 - SB0)',
          radioButtonLabel: 'Side Black - (SB3 - SB0) ',
          checked: seletedPriceRadioValue == 'Black Table - (B3 - B0)',
        },
      ],
    },
    {
      name: 'Table Inclusion',
      handleChange: handleCaratRadioChange,
      radioData: [
        {
          id: '1',
          value: 'Table Inclusion - (T0 - T3)',
          radioButtonLabel: 'Table Inclusion - (T0 - T3) ',
          checked: seletedPriceRadioValue == 'Table Inclusion - (T0 - T3)',
        },
        {
          id: '2',
          value: 'Table Inclusion - (T3 - T0)',
          radioButtonLabel: 'Table Inclusion - (T3 - T0) ',
          checked: seletedPriceRadioValue == 'Table Inclusion - (T3 - T0)',
        },
      ],
    },
  ];

  const handleConfirmStoneRadioChange = (value: string) => {
    setInputError(false);
    setInputErrorContent('');
    setSelectedDaysInputValue('');
    setSelectedRadioDaysValue(value);
  };

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

  const onFocus = () => {
    handleConfirmStoneRadioChange('other');
  };

  const confirmRadioButtons = [
    {
      name: 'days',
      handleChange: handleConfirmStoneRadioChange,
      radioData: [
        {
          id: '0',
          value: '7 Days',
          radioButtonLabel: '7 Days',
          checked: selectedRadioDaysValue === '7 Days',
        },
        {
          id: '1',
          value: '30 Days',
          radioButtonLabel: '30 Days',
          checked: selectedRadioDaysValue === '30 Days',
        },
        {
          id: '2',
          value: '60 Days',
          radioButtonLabel: '60 Days',
          checked: selectedRadioDaysValue === '60 Days',
        },
        {
          id: '3',
          value: 'other',
          radioButtonLabel: (
            <>
              <div className="flex gap-2">
                <CustomInputField
                  name="days"
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
              {inputError ? <div>{inputErrorContent}</div> : ''}
            </>
          ),
          checked: selectedRadioDaysValue === 'other',
        },
      ],
    },
  ];

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

  const handleCloseInputDialog = () => {
    setIsInputDialogOpen(false);
    setInputError(false);
    setInputErrorContent('');
    setSaveSearchName('');
  };

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

  function sortProducts(sortBy: string, sortOrder: string) {
    return [...(data?.products || [])].sort((a, b) => {
      if (sortOrder === 'Low to High') {
        return a[sortBy] - b[sortBy];
      } else if (sortOrder === 'High to Low') {
        return b[sortBy] - a[sortBy];
      } else {
        // Default to original order if sortOrder is not recognized
        return 0;
      }
    });
  }

  const sortData = () => {
    const sortingOption = selectedRadioValue;

    // Assuming there's only one element in the array
    const [key, order] = sortingOption[0].split(' - ');

    let data = sortProducts(key.toLowerCase(), order);

    setRows(data);
  };

  const onOpenChange = (open: boolean) => {
    setIsSliderOpen(open);
  };

  return (
    <>
      <CustomSlider
        sheetContent={
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
                  {ManageLocales(
                    'app.searchResult.slider.confirmStone.paymentTerms'
                  )}
                </p>
                {confirmRadioButtons.map((radioData, index) => (
                  <CustomRadioButton
                    key={index} // Ensure each component has a unique key
                    radioMetaData={radioData}
                    radioButtonAllStyles={confirmStoneRadioButtonStyle}
                  />
                ))}
              </div>
              <div className="mt-5">
                {ManageLocales(
                  'app.searchResult.slider.confirmStone.addComment'
                )}

                <textarea
                  value={commentValue}
                  name="textarea"
                  rows={3}
                  // placeholder="Write Description (max 1000 characters)"
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
                    setInputError(false);
                    setInputErrorContent('');
                    setSelectedDaysInputValue('');
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
        }
        sheetContentStyle={styles.diamondDetailSheet}
        isSliderOpen={isSliderOpen}
        onOpenChange={onOpenChange}
      />
      <CustomInputDialog
        customInputDialogData={customInputDialogData}
        isError={inputError}
        setIsError={setInputError}
        setErrorContent={setInputErrorContent}
        errorContent={inputErrorContent}
        handleClose={handleCloseInputDialog}
      />
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />

      <div className="mb-2">
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
                    {/* <CustomRadioButton
                      radioMetaData={[
                        {
                          name: 'Default',
                          handleChange: handleCaratRadioChange,
                          radioData: [
                            {
                              id: '0',
                              value: 'Default',
                              radioButtonLabel: 'Default',
                              checked: selectedDefaultValue === 'Default',
                            },
                          ],
                        },
                      ]}
                      radioButtonAllStyles={radioButtonDefaultStyles}
                    /> */}

                    {radioDataList.map((radioData, index) => (
                      <CustomRadioButton
                        key={index} // Ensure each component has a unique key
                        radioMetaData={radioData}
                        // onChange={handleCaratRadioChange}
                        radioButtonAllStyles={radioButtonStyles}
                      />
                    ))}
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
                      // handleClick={showButtonHandleClick}
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
