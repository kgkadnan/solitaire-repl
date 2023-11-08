'use client';
import { CustomFooter } from '@/components/common/footer';
import styles from './search-results.module.scss';
import { ManageLocales } from '@/utils/translate';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import CloseOutline from '@public/assets/icons/close-outline.svg?url';
import EditIcon from '@public/assets/icons/edit.svg';
import sortOutline from '@public/assets/icons/sort-outline.svg';
import Image from 'next/image';
import { CustomDropdown } from '@/components/common/dropdown';
import { CustomSlider } from '@/components/common/slider';
import { CustomRadioButton } from '@/components/common/buttons/radio-button';
import { useGetAllProductQuery } from '@/features/api/product';
import CustomDataTable from '@/components/common/data-table';
import { constructUrlParams } from '@/utils/construct-url-param';
import CustomPagination from '@/components/common/pagination';
import { useAppDispatch } from '@/hooks/hook';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAddCartMutation } from '@/features/api/cart';
import { useGetSpecificPreviousQuery } from '@/features/api/previous-searches';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { notificationBadge } from '@/features/notification/notification-slice';
import { CustomDialog } from '@/components/common/dialog';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { Product, TableColumn } from './interface';
import { ManageListingSequenceResponse } from '../../my-account/manage-diamond-sequence/interface';

let optionLimits = [
  { id: 1, value: '50' },
  { id: 2, value: '100' },
  { id: 3, value: '150' },
];

const SearchResults = () => {
  const searchParams = useSearchParams();
  const previousSearchIds = searchParams.get('id');
  const router = useRouter();
  const dispatch = useAppDispatch();
  let currentPath = usePathname();

  const [rows, setRows] = useState<Product[]>([]);
  const [tableColumns, setTableColumns] = useState<TableColumn[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const [yourSelectionData, setYourSelectionData] = useState<string[]>([]);

  //pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(50); // You can set the initial value here
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [offset, setOffset] = useState(0);

  //Radio Button
  const [selectedValue, setSelectedValue] = useState('');

  const [totalAmount, setTotalAmount] = useState(0);
  const [averageDiscount, setAverageDiscount] = useState(0);

  const [searchUrl, setSearchUrl] = useState('');

  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isEntireSearch, setIsEntireSearch] = useState(false);

  let { data, error, isLoading, refetch } = useGetAllProductQuery({
    offset: offset,
    limit: limit,
    url: searchUrl,
  });

  let [downloadExcel] = useDownloadExcelMutation();

  let { data: previousSearch } = useGetSpecificPreviousQuery({
    id: previousSearchIds,
  });

  const [addCart, { isLoading: updateIsLoading, isError: updateIsError }] =
    useAddCartMutation();

  const { data: listingColumns } =
    useGetManageListingSequenceQuery<ManageListingSequenceResponse>({});

  let paginationStyle = {
    paginationContainerStyle: styles.paginationContainerStyle,
  };

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

  useEffect(() => {
    setTableColumns(listingColumns);
  }, [listingColumns]);

  //
  let checkboxData = {
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    handleClick: handleClick,
    isCheck: isCheck,
    isCheckAll: isCheckAll,
  };

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
                setIsEntireSearch(false);
                setIsDialogOpen(false);
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonTransparent,
              }}
            />
            <CustomDisplayButton
              displayButtonLabel="All"
              handleClick={() => {
                setIsEntireSearch(true);
                setIsDialogOpen(false);
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonFilled,
              }}
            />
          </div>
        </>
      );

      if (isEntireSearch) {
        console.log('userConfirmed', isEntireSearch);
        setIsCheck([]);
      } else if (isCheck.length && !isEntireSearch) {
        console.log('isCheck', isCheck);
        downloadExcel({
          productIds: isCheck,
        })
          .unwrap()
          .then((res) => {
            if (res.filePath) {
              console.log('res', res);
              window.open(
                `${process.env.NEXT_PUBLIC_API_URL}${res.filePath}`,
                '_blank'
              );
              setDialogContent(
                <>
                  <div className="max-w-[400px] flex justify-center align-middle">
                    <Image src={confirmImage} alt="vector image" />
                  </div>
                  <div className="max-w-[400px] flex justify-center align-middle text-solitaireTertiary">
                    Download Excel Successfully
                  </div>
                </>
              );
              setIsDialogOpen(true);
            }
          })
          .catch((e) => {
            console.log('error', error);
          });
        setIsCheck([]);
        setIsCheckAll(false);
        setIsError(false);
      }
    } else if (isCheck.length === 0) {
      setIsError(true);
      setErrorText('*Select stone to Download Excel.');
    } else {
      if (isCheck.length) {
        console.log('one downoad', isCheck);
        downloadExcel({
          productIds: isCheck,
        })
          .unwrap()
          .then((res) => {
            if (res.filePath) {
              window.open(
                `${process.env.NEXT_PUBLIC_API_URL}${res.filePath}`,
                '_blank'
              );
              setDialogContent(
                <>
                  <div className="max-w-[400px] flex justify-center align-middle">
                    <Image src={confirmImage} alt="vector image" />
                  </div>
                  <div className="max-w-[400px] flex justify-center align-middle text-solitaireTertiary">
                    Download Excel Successfully
                  </div>
                </>
              );
              setIsDialogOpen(true);
            }
          })
          .catch((e) => {
            console.log('error', error);
          });
      }
      setIsCheck([]);
      setIsCheckAll(false);
      setIsError(false);
    }
  };

  const CompareStone = () => {
    if (isCheck.length > 10) {
      setIsError(true);
      setErrorText('*You can compare maximum of ten stones.');
    } else if (isCheck.length < 1) {
      setIsError(true);
      setErrorText('*Select stone to compare.');
    } else if (isCheck.length < 2) {
      setIsError(true);
      setErrorText('*Minimum 2 stone to compare.');
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

  const addToCart = () => {
    if (isCheck.length > 100) {
      setIsError(true);
      setErrorText('*The cart does not allow more than 100 Stones.');
    } else if (isCheck.length < 1) {
      setIsError(true);
      setErrorText('*Select stone to add to cart.');
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
          .then(() => {
            setIsError(false);
            setErrorText('');
            setDialogContent(
              <>
                <div className="max-w-[400px] flex justify-center align-middle">
                  <Image src={confirmImage} alt="vector image" />
                </div>
                <div className="max-w-[400px] flex justify-center align-middle text-solitaireTertiary">
                  Item Successfully added to cart
                </div>
              </>
            );
            setIsDialogOpen(true);
            dispatch(notificationBadge(true));
          })
          .catch(() => {
            console.log('1111111111111111');
          });
        setIsCheck([]);
        setIsCheckAll(false);
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
      id: 6,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.transparent,
      fn: addToCart,
    },
    {
      id: 2,
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
    let yourSelection = localStorage.getItem('Search');
    if (yourSelection) {
      // Check if the effect has not been executed
      const parseYourSelection = JSON.parse(yourSelection);
      setYourSelectionData(parseYourSelection);
      let url = constructUrlParams(parseYourSelection[activeTab]);
      setSearchUrl(url);

      if (data?.products?.length) {
        setRows(data?.products);
        setNumberOfPages(Math.ceil(data?.count / data?.limit));
      }
    }
  }, [data, activeTab]); // Include isEffectExecuted in the dependency array

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

  const handleResultsPerPageChange = useCallback(
    (event: string) => {
      const newResultsPerPage = parseInt(event, 10);
      setLimit(newResultsPerPage);
      setOffset(0);
      setCurrentPage(0); // Reset current page when changing results per page
      setRows(data?.products);
      setNumberOfPages(Math.ceil(data?.count / newResultsPerPage));
    },
    [data]
  );

  const handlePageClick = (page: number) => {
    if (page >= 0 && page <= numberOfPages) {
      const offset = page * limit;
      setIsCheck([]);
      setIsCheckAll(false);
      setOffset(offset);
      setCurrentPage(page);
    }
  };

  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div className="mb-2">
        {/* Count Bar  */}
        <div className="flex justify-between py-3">
          <div className="flex gap-3">
            <p>
              {ManageLocales('app.searchResult.countBar.pieces')}:
              <span className="text-solitaireTertiary ml-[5px]">
                {`${isCheck.length}/${data?.count ? data?.count : 0}`}
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
          <CustomSlider
            sheetTriggenContent={
              <>
                <div className="flex gap-1">
                  <Image src={sortOutline} alt="sortOutline" width={20} />
                  <p className="text-solitaireTertiary">Sort by</p>
                </div>
              </>
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
      {/* <CustomHeader dummyData={headerData} /> */}
      <CustomDataTable
        tableRows={rows}
        tableColumns={tableColumns}
        checkboxData={checkboxData}
      />
      <div className="sticky-bottom bg-solitairePrimary mt-3">
        <div className="flex border-t-2 border-solitaireSenary items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-solitaireTertiary bg-solitaireSenary px-2 rounded-lg">
              xxxxxxx
            </span>
            <p className="text-solitaireTertiary text-sm">Memo - Out</p>
          </div>

          <CustomPagination
            currentPage={currentPage}
            totalPages={numberOfPages}
            resultsPerPage={limit}
            optionLimits={optionLimits}
            handlePageClick={handlePageClick}
            handleResultsPerPageChange={handleResultsPerPageChange}
            paginationStyle={paginationStyle}
          />
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
