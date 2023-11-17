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

const SearchResults = ({ data, activeTab, refetch: refetchRow }: any) => {
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
  const [selectedValue, setSelectedValue] = useState('');

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

  const performDownloadExcel = (
    productIds: any[],
    isEntireSearch?: boolean
  ) => {
    if (isEntireSearch) {
      console.log('isEntireSearch', isEntireSearch);
    } else {
      downloadExcel({ productIds })
        .unwrap()
        .then((res) => {
          let { data, fileName } = res;
          if (data) {
            downloadExcelFromBase64(data, fileName);
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
          }
        })
        .catch((e) => {
          console.log('error', e);
        });
    }
    setIsCheck([]);
    setIsCheckAll(false);
    setIsError(false);
  };

  //download Excel
  const downloadExcelFunction = () => {
    if (isCheckAll) {
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className="max-w-[330px] flex justify-center text-center align-middle text-solitaireTertiary">
            Do you want to all the stones available in search or just selected
            stones!
          </div>
          <div className="max-w-[400px] flex justify-around align-middle text-solitaireTertiary">
            <CustomDisplayButton
              displayButtonLabel="Selected"
              handleClick={() => {
                setIsDialogOpen(false);
                performDownloadExcel(isCheck);
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonTransparent,
              }}
            />
            <CustomDisplayButton
              displayButtonLabel="All"
              handleClick={() => {
                setIsDialogOpen(false);
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonFilled,
              }}
            />
          </div>
        </>
      );
    } else if (isCheck.length === 0) {
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
        setIsCheck([]);
        setIsCheckAll(false);
        return;
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

  // console.log("reosssss")

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
      fn: () => {},
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

  const handleRadioChange = (radioValue: string) => {
    setSelectedValue(radioValue);
  };

  const radioButtonStyles = {
    radioButtonStyle: styles.radioStyle,
    radioLabelStyle: styles.labelStyle,
    mainRadioButton: styles.mainRadioButtonStyle,
  };
  const radioButtonDefaultStyles = {
    radioButtonStyle: styles.radioStyle,
    radioLabelStyle: styles.labelStyle,
  };

  const radioDataList = [
    [
      {
        id: '1',
        value: '1',
        radioButtonLabel: 'Carat - Low to High',
      },
      {
        id: '2',
        value: '2',
        radioButtonLabel: 'Carat - High to Low',
      },
    ],
    [
      {
        id: '3',
        value: '3',
        radioButtonLabel: 'Clarity - (FL - I3)',
      },
      {
        id: '4',
        value: '4',
        radioButtonLabel: 'Clarity - (I3 - FL)',
      },
    ],
    [
      {
        id: '5',
        value: '5',
        radioButtonLabel: 'Price - Low to High',
      },
      {
        id: '6',
        value: '6',
        radioButtonLabel: 'Price - High to Low',
      },
    ],
    [
      {
        id: '7',
        value: '7',
        radioButtonLabel: 'Discount - Low to High',
      },
      {
        id: '8',
        value: '8',
        radioButtonLabel: 'Discount - High to Low',
      },
    ],
    [
      {
        id: '9',
        value: '9',
        radioButtonLabel: 'Table Inclusion - (T0 - T3)',
      },
      {
        id: '10',
        value: '10',
        radioButtonLabel: 'Table Inclusion - (T3 - T0)',
      },
    ],
    [
      {
        id: '11',
        value: '11',
        radioButtonLabel: 'Fluorescence - (NON - VSTG) ',
      },
      {
        id: '12',
        value: '12',
        radioButtonLabel: 'Fluorescence - (VSTG - NON) ',
      },
    ],
    [
      {
        id: '13',
        value: '13',
        radioButtonLabel: 'Black Table - (B0 - B3) ',
      },
      {
        id: '14',
        value: '14',
        radioButtonLabel: 'Black Table - (B3 - B0) ',
      },
    ],
    [
      {
        id: '15',
        value: '15',
        radioButtonLabel: 'Side Black - (SB0 - SB3) ',
      },
      {
        id: '16',
        value: '16',
        radioButtonLabel: 'Side Black - (SB3 - SB0) ',
      },
    ],
    [
      {
        id: '17',
        value: '17',
        radioButtonLabel: 'Table Inclusion - (T0 - T3) ',
      },
      {
        id: '18',
        value: '18',
        radioButtonLabel: 'Table Inclusion - (T3 - T0) ',
      },
    ],
  ];

  const handleSaveSearch = async () => {
    // Retrieve the array from localStorage
    const searchData = localStorage.getItem('Search');

    if (searchData !== null) {
      const parseData = JSON.parse(searchData) || [];

      await addSavedSearch({
        name: saveSearchName,
        diamond_count: data?.count,
        meta_data: parseData[activeTab].queryParams,
        is_deleted: false,
      })
        .unwrap()
        .then(() => {
          parseData[activeTab] = {
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

  const handleUpdateSaveSearch = () => {
    let yourSelection = JSON.parse(localStorage.getItem('Search')!);

    let updateSaveSearchData = {
      name: yourSelection[activeTab]?.saveSearchName,
      meta_data: yourSelection[activeTab]?.queryParams,
      diamond_count: data?.count,
    };

    yourSelection[activeTab] = {
      saveSearchName: yourSelection[activeTab]?.saveSearchName,
      isSavedSearch: true,
      queryParams: yourSelection[activeTab].queryParams,
    };
    localStorage.setItem('Search', JSON.stringify(yourSelection));
    setYourSelectionData(yourSelection);
    updateSavedSearch(updateSaveSearchData);
  };

  return (
    <>
      <CustomInputDialog
        customInputDialogData={customInputDialogData}
        isError={inputError}
        errorContent={inputErrorContent}
      />
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />

      <>
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
                      <CustomRadioButton
                        radioData={[
                          {
                            id: '0',
                            value: '0',
                            radioButtonLabel: 'Default',
                          },
                        ]}
                        onChange={handleRadioChange}
                        radioButtonAllStyles={radioButtonDefaultStyles}
                      />

                      {radioDataList.map((radioData, index) => (
                        <CustomRadioButton
                          key={index} // Ensure each component has a unique key
                          radioData={radioData}
                          onChange={handleRadioChange}
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
                        // handleClick={showButtonHandleClick}
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
    </>
  );
};

export default SearchResults;
