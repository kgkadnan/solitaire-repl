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
import { CONFIRM_STONE_COMMENT_MAX_CHARACTERS } from '@/constants/constant';

const SearchResults = ({ data, activeTab, refetch: refetchRow }: any) => {
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
  const [selectedCaratRadioValue, setSelectedCaratRadioValue] =
    useState<string>('');
  const [selectedClarityRadioValue, setSelectedClarityRadioValue] =
    useState<string>('');
  const [seletedPriceRadioValue, setSeletedPriceRadioValue] =
    useState<string>('');

  const [seletedDiscountRadioValue, setSeletedDiscountRadioValue] =
    useState<string>('');
  const [seletedTableInclusionRadioValue, setSeletedTableInclusionRadioValue] =
    useState<string>('');
  const [seletedFluorescenceRadioValue, setSeletedFluorescenceRadioValue] =
    useState<string>('');
  const [seletedBlackTableRadioValue, setSeletedBlackTableRadioValue] =
    useState<string>('');
  const [seletedSideBlackRadioValue, setSeletedSideBlackRadioValue] =
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
  const [confirmStoneData, setConfirmStoneData] = useState<Product[]>([]);

  const [isSortBySliderOpen, setIsSortBySliderOpen] = useState(Boolean);

  const [commentValue, setCommentValue] = useState('');

  let [downloadExcel] = useDownloadExcelMutation();

  const [addCart] = useAddCartMutation();

  const { data: listingColumns } = useGetManageListingSequenceQuery({});

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
      window.open('/compare-stone', '_blank');
      setIsError(false);
      setErrorText('');
    }
  };

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

  //Sort By Functions
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
    setSeletedPriceRadioValue(radioValue);
  };
  const handleDiscountRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSeletedDiscountRadioValue(radioValue);
  };
  const handleTableInclusionRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSeletedTableInclusionRadioValue(radioValue);
  };
  const handleFluorescenceRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSeletedFluorescenceRadioValue(radioValue);
  };
  const handleBlackTableRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSeletedBlackTableRadioValue(radioValue);
  };
  const handleSideBlackRadioChange = (radioValue: string) => {
    setSelectedDefaultValue('');
    setSeletedSideBlackRadioValue(radioValue);
  };
  const handleDefaultRadioChange = (radioValue: string) => {
    setSelectedCaratRadioValue('');
    setSeletedSideBlackRadioValue('');
    setSeletedBlackTableRadioValue('');
    setSeletedTableInclusionRadioValue('');
    setSeletedDiscountRadioValue('');
    setSeletedFluorescenceRadioValue('');
    setSeletedPriceRadioValue('');
    setSelectedClarityRadioValue('');
    setSelectedDefaultValue(radioValue);
  };

  //Sort By Data
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
      value: 'Low to High',
      label: 'Carat - Low to High',
      checked: selectedCaratRadioValue === 'Low to High',
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
      value: 'Clarity - (FL - I3)',
      label: 'Clarity - (FL - I3)',
      checked: selectedClarityRadioValue == 'Clarity - (FL - I3)',
    },
    {
      name: 'clarity',
      onChange: handleClarityRadioChange,
      id: '2',
      value: 'Clarity - (I3 - FL)',
      label: 'Clarity - (I3 - FL)',
      checked: selectedClarityRadioValue == 'Clarity - (I3 - FL)',
    },
  ];
  const priceRadioData = [
    {
      name: 'price',
      onChange: handlePriceRadioChange,
      id: '1',
      value: 'Price - Low to High',
      label: 'Price - Low to High',
      checked: seletedPriceRadioValue == 'Price - Low to High',
    },
    {
      name: 'price',
      onChange: handlePriceRadioChange,
      id: '2',
      value: 'Price - High to Low',
      label: 'Price - High to Low',
      checked: seletedPriceRadioValue == 'Price - High to Low',
    },
  ];
  const discountRadioData = [
    {
      name: 'discount',
      onChange: handleDiscountRadioChange,
      id: '1',
      value: 'Discount - Low to High',
      label: 'Discount - Low to High',
      checked: seletedDiscountRadioValue == 'Discount - Low to High',
    },
    {
      name: 'discount',
      onChange: handleDiscountRadioChange,
      id: '2',
      value: 'Discount - High to Low',
      label: 'Discount - High to Low',
      checked: seletedDiscountRadioValue == 'Discount - High to Low',
    },
  ];
  const tableInclusionRadioData = [
    {
      name: 'Table Inclusion',
      onChange: handleTableInclusionRadioChange,
      id: '1',
      value: 'Table Inclusion - (T0 - T3)',
      label: 'Table Inclusion - (T0 - T3)',
      checked: seletedTableInclusionRadioValue == 'Table Inclusion - (T0 - T3)',
    },
    {
      name: 'Table Inclusion',
      onChange: handleTableInclusionRadioChange,
      id: '2',
      value: 'Table Inclusion - (T3 - T0)',
      label: 'Table Inclusion - (T3 - T0)',
      checked: seletedTableInclusionRadioValue == 'Table Inclusion - (T3 - T0)',
    },
  ];
  const fluorescenceRadioData = [
    {
      name: 'Fluorescence',
      onChange: handleFluorescenceRadioChange,
      id: '1',
      value: 'Fluorescence - (NON - VSTG)',
      label: 'Fluorescence - (NON - VSTG) ',
      checked: seletedFluorescenceRadioValue == 'Fluorescence - (NON - VSTG)',
    },
    {
      name: 'Fluorescence',
      onChange: handleFluorescenceRadioChange,
      id: '2',
      value: 'Fluorescence - (VSTG - NON)',
      label: 'Fluorescence - (VSTG - NON) ',
      checked: seletedFluorescenceRadioValue == 'Fluorescence - (VSTG - NON)',
    },
  ];
  const blackTableRadioData = [
    {
      name: 'Black Table',
      onChange: handleBlackTableRadioChange,
      id: '1',
      value: 'Black Table - (B0 - B3)',
      label: 'Black Table - (B0 - B3) ',
      checked: seletedBlackTableRadioValue == 'Black Table - (B0 - B3)',
    },
    {
      name: 'Black Table',
      onChange: handleBlackTableRadioChange,
      id: '2',
      value: 'Black Table - (B3 - B0)',
      label: 'Black Table - (B3 - B0) ',
      checked: seletedBlackTableRadioValue == 'Black Table - (B3 - B0)',
    },
  ];
  const sideBlackRadioData = [
    {
      name: 'Side Black',
      onChange: handleSideBlackRadioChange,
      id: '1',
      value: 'Side Black - (SB0 - SB3)',
      label: 'Side Black - (SB0 - SB3) ',
      checked: seletedSideBlackRadioValue == 'Side Black - (SB0 - SB3)',
    },
    {
      name: 'Side Black',
      onChange: handleSideBlackRadioChange,
      id: '2',
      value: 'Side Black - (SB3 - SB0)',
      label: 'Side Black - (SB3 - SB0) ',
      checked: seletedSideBlackRadioValue == 'Side Black - (SB3 - SB0)',
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
  //Sort By Slider State Management
  const onOpenChangeSortBy = (open: boolean) => {
    setSelectedDefaultValue('');
    setSelectedCaratRadioValue('');
    setSeletedSideBlackRadioValue('');
    setSeletedBlackTableRadioValue('');
    setSeletedTableInclusionRadioValue('');
    setSeletedDiscountRadioValue('');
    setSeletedFluorescenceRadioValue('');
    setSeletedPriceRadioValue('');
    setSelectedClarityRadioValue('');
    setIsSortBySliderOpen(open);
  };

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
      fn: () => handleConfirm(isCheck),
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
    const sortingOption = '';

    // Assuming there's only one element in the array
    const [key, order] = sortingOption[0].split(' - ');

    let data = sortProducts(key.toLowerCase(), order);

    setRows(data);
  };

  const onOpenChange = (open: boolean) => {
    setIsSliderOpen(open);
    setSelectedRadioDaysValue('');
  };

  return (
    <>
      <CustomSlider
        sheetContent={
          <ConfirmStone
            confirmStoneData={confirmStoneData}
            listingColumns={listingColumns}
            confirmRadioButtons={confirmRadioButtons}
            commentValue={commentValue}
            handleComment={handleComment}
            setInputError={setInputError}
            setInputErrorContent={setInputErrorContent}
            setSelectedDaysInputValue={setSelectedDaysInputValue}
            onOpenChange={onOpenChange}
          />
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
                      handleClick={() => {
                        onOpenChangeSortBy(false);
                      }}
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
