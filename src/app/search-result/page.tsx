'use client';
import { CustomFooter } from '@/components/common/footer';
import styles from './search-results.module.scss';
import { ManageLocales } from '@/utils/translate';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import CloseOutline from '@public/assets/icons/close-outline.svg?url';
import InfoCircleOutline from '@public/assets/icons/information-circle-outline.svg?url';
import sortOutline from '@public/assets/icons/sort-outline.svg';
import Image, { StaticImageData } from 'next/image';
import { CustomDropdown } from '@/components/common/dropdown';
import { CustomInputlabel } from '@/components/common/input-label';
import Tooltip from '@/components/common/tooltip';
import { CustomSlider } from '@/components/common/slider';
import { CustomRadioButton } from '@/components/common/buttons/radio-button';
import { useGetAllProductQuery } from '@/features/api/product';
import CustomDataTable, { Rows } from '@/components/common/data-table';
import { constructUrlParams } from '@/utils/construct-url-param';
import CustomPagination from '@/components/common/pagination';
import { useAppDispatch } from '@/hooks/hook';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAddCartMutation } from '@/features/api/cart';
import { useGetSpecificPreviousQuery } from '@/features/api/previous-searches';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { notificationBadge } from '@/features/notification/notification-slice';
import { CustomDialog } from '@/components/common/dialog';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { ManageListingSequenceResponse } from '../my-account/manage-diamond-sequence/page';

export interface TableColumn {
  label: string;
  accessor: string;
  sequence: number;
  is_fixed: boolean;
  is_disabled: boolean;
  id: string;
}

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

  const [rows, setRows] = useState<Rows[]>([]);
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
    setIsCheck(rows?.map((li: any) => li.id));
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

  // const tableColumns: TableColumn[] = [
  //   { label: 'Stock No', accessor: 'lot_id' },
  //   { label: 'Details', accessor: 'details' },
  //   { label: 'RPT No.', accessor: 'rpt_number' },
  //   { label: 'Loc.', accessor: 'location' },
  //   { label: 'SHP', accessor: 'shape' },
  //   { label: 'CTS', accessor: 'carat' },
  //   { label: 'COL', accessor: 'color' },
  //   { label: 'Clarity', accessor: 'clarity' },
  //   { label: 'CS', accessor: 'color_shade' },
  //   { label: 'CSI', accessor: 'color_shade_intensity' },
  //   { label: 'Milky', accessor: 'milky' },
  //   { label: 'RAP($)', accessor: 'rap' },
  //   { label: 'RAP Val.', accessor: 'rap_value' },
  //   { label: 'Discount%', accessor: 'discount' },
  //   { label: 'PR/CT', accessor: 'price_per_carat' },
  //   { label: 'AMT($)', accessor: 'amount' },
  //   { label: 'Cut', accessor: 'cut' },
  //   { label: 'Pol.', accessor: 'polish' },
  //   { label: 'Symm.', accessor: 'symmetry' },
  //   { label: 'FLS', accessor: 'fluorescence' },
  //   { label: 'LAB', accessor: 'lab' },
  //   { label: 'BRL', accessor: 'brilliance' },
  //   { label: 'TB', accessor: 'black_table' },
  //   { label: 'SI', accessor: 'side_inclusion' },
  //   { label: 'SB', accessor: 'side_black' },
  //   { label: 'TI', accessor: 'table_inclusion' },
  //   { label: 'TO', accessor: 'open_table' },
  //   { label: 'CO', accessor: 'open_crown' },
  //   { label: 'PO', accessor: 'open_pavilion' },
  //   { label: 'EC', accessor: 'eye_clean' },
  //   { label: 'CN', accessor: 'natural_crown' },
  //   { label: 'GN', accessor: 'natural_girdle' },
  //   { label: 'PN', accessor: 'natural_pavilion' },
  //   { label: 'SG', accessor: 'surface_graining' },
  //   { label: 'IG', accessor: 'internal_graining' },
  //   { label: 'TBL%', accessor: 'table_percentage' },
  //   { label: 'DEP%', accessor: 'depth_percentage' },
  //   { label: 'Length', accessor: 'length' },
  //   { label: 'Width', accessor: 'width' },
  //   { label: 'Depth', accessor: 'depth' },
  //   { label: 'Ratio', accessor: 'ratio' },
  //   { label: 'C/A', accessor: 'crown_angle' },
  //   { label: 'C/H', accessor: 'crown_height' },
  //   { label: 'H&A', accessor: 'ha' },
  //   { label: 'Girdle', accessor: 'girdle' },
  //   { label: 'P/A', accessor: 'pavilion_angle' },
  //   { label: 'P/D', accessor: 'pavilion_depth' },
  //   { label: 'Culet', accessor: 'culet' },
  //   { label: 'Ins.', accessor: 'inscription' },
  //   { label: 'Origin', accessor: 'origin_country' },
  //   { label: 'L/H.', accessor: 'lower_half' },
  //   { label: 'S/L', accessor: 'star_length' },
  //   { label: 'Girdle%', accessor: 'girdle_percentage' },
  //   { label: 'Luster', accessor: 'luster' },
  // ];

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
        return selectedRow?.variants[0].id;
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
      id: 2,
      displayButtonLabel: ManageLocales('app.searchResult.footer.confirmStone'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 3,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addSearch'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 4,
      displayButtonLabel: ManageLocales('app.searchResult.footer.modifySearch'),
      style: styles.transparent,
      fn: () => {},
    },
    {
      id: 5,
      displayButtonLabel: ManageLocales(
        'app.searchResult.footer.addToWhislist'
      ),
      style: styles.filled,
      fn: () => {},
    },
    {
      id: 6,
      displayButtonLabel: ManageLocales('app.searchResult.footer.addToCart'),
      style: styles.filled,
      fn: addToCart,
    },
  ];

  const handleSearchTab = (index: number) => {
    setIsCheckAll(false);
    setIsCheck([]);
    setActiveTab(index);
  };

  // Function to calculate total amount
  const calculateTotalAmount = useCallback(() => {
    let total = 0;
    isCheck.forEach((id) => {
      const selectedRow = rows.find((row) => row.id === id);
      if (selectedRow) {
        total += selectedRow.amount;
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
        totalDiscount += selectedRow.discount;
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

  const closeSearch = (removeDataIndex: number) => {
    // Filter the dummyData to remove the specified search
    // const updatedData: Data = {};
    // Object.keys(dummyData).forEach((key, index) => {
    //   if (index !== removeDataIndex) {
    //     updatedData[key] = dummyData[key];
    //   }
    // });
    // // Update the state with the filtered dummyData
    // setRows([...Object.values(updatedData)[0]]); // Assuming you want to show the first search results after closing a search
  };

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
      <div className="border-b border-solid  border-solitaireSenary mb-5">
        {/* top Header */}
        <div className={styles.topHeader}>
          <p className="">
            {ManageLocales('app.searchResult.header.searchResults')}
          </p>
        </div>

        {/* Search Tab Header */}
        <div className="flex items-center gap-5 text-solitaireTertiary w-full  p-2 bg-solitaireNonary rounded-lg bg-opacity-0">
          {Object.keys(yourSelectionData).length > 0 &&
            Object.values(yourSelectionData).map(
              (yourSelection: any, index: number) => {
                return (
                  <div key={`Search-${index}`}>
                    <div
                      style={{
                        marginRight:
                          index === yourSelection.length - 1 ? '0px' : '5px',
                      }}
                      className={`flex items-center cursor-pointer gap-[8px] rounded-sm ${
                        activeTab === index
                          ? styles.activeHeaderButtonStyle
                          : styles.headerButtonStyle
                      }`}
                    >
                      <div className="flex items-center">
                        <Tooltip
                          tooltipElement={
                            <InfoCircleOutline stroke="#8C7459" />
                          }
                          content={
                            <div
                              className={styles.yourSelectionContentContainer}
                            >
                              <CustomInputlabel
                                htmlfor="text"
                                label={`${ManageLocales(
                                  'app.advanceSearch.yourSelection'
                                )}:`}
                                overriddenStyles={{
                                  label: styles.yourSelectionTooltipHeader,
                                }}
                              />
                              <div
                                className={styles.yourSelectionMainContainer}
                              >
                                {Object.keys(yourSelection).map((key: any) => (
                                  <div
                                    key={`key-${key}`}
                                    className={`${styles.yourSelectionSubContainer}`}
                                  >
                                    <div className={styles.labelContainer}>
                                      <CustomInputlabel
                                        htmlfor="text"
                                        label={key}
                                      />
                                      :
                                    </div>
                                    <div className="text-sm font-light pl-2">
                                      {Array.isArray(yourSelection[key])
                                        ? yourSelection[key].join(', ')
                                        : yourSelection[key]}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          }
                          tooltipStyles={{
                            tooltipContainerStyles:
                              styles.tooltipContainerStyles,
                            tooltipContentStyle:
                              styles.yourSelectionTooltipContentStyle,
                          }}
                        />
                      </div>
                      <div>
                        <CustomDisplayButton
                          displayButtonAllStyle={{
                            displayLabelStyle: styles.headerButtonLabelStyle,
                          }}
                          displayButtonLabel={`Search ${index + 1}`}
                          handleClick={() => handleSearchTab(index)}
                        />
                      </div>
                      <div onClick={() => closeSearch(index)}>
                        <CloseOutline stroke="#8C7459" />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>

        {/* Count Bar  */}
        <div className="flex justify-between py-3">
          <div className="flex gap-3">
            <p>
              Pieces:
              <span className="text-solitaireTertiary ml-[5px]">
                {`${isCheck.length}/${data?.count}`}
              </span>
            </p>
            <p>
              Total Avg. Dis:
              <span className="text-solitaireTertiary ml-[5px]">
                {averageDiscount.toFixed(2)}
              </span>
            </p>
            <p>
              Total Amount:
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
