'use client';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './saved-search.module.scss';
import { CustomTable } from '@/components/common/table';
import { CustomDisplayButton } from '@components/common/buttons/display-button';
import editIcon from '@public/assets/icons/edit.svg';
import CustomHeader from '@/components/common/header';
import { CustomCheckBox } from '@/components/common/checkbox';
import CustomSearchResultCard from '@/components/common/search-result-card';
import { CustomFooter } from '@/components/common/footer';
import { ManageLocales } from '@/utils/translate';
import CustomPagination from '@/components/common/pagination';
import { Checkbox } from '@/components/ui/checkbox';
import {
  useDeleteSavedSearchMutation,
  useGetAllSavedSearchesQuery,
  useGetSavedSearchListQuery,
} from '@/features/api/saved-searches';
import { CustomSlider } from '@/components/common/slider';
import { formatCreatedAt } from '@/utils/format-date';
import { CustomCalender } from '@/components/common/calender';
import { DateRange } from 'react-day-picker';
import { formatCassing } from '@/utils/format-cassing';
import { useAppDispatch } from '@/hooks/hook';
import { modifySavedSearch } from '@/features/saved-search/saved-search';
import { useRouter } from 'next/navigation';
import { NoDataFound } from '@/components/common/no-data-found';
import { CustomDialog } from '@/components/common/dialog';
import {
  ICardData,
  IDateRange,
  IFormatedData,
  IKeyLabelMapping,
  ISavedSearchData,
  Item,
} from './interface';
import { KeyLabelMapping } from '@/components/common/data-table/interface';

const SavedSearch = () => {
  const router = useRouter();
  // Style classes and variables
  const tableStyles = {
    tableHeaderStyle: styles.tableHeader,
    tableBodyStyle: styles.tableBody,
  };
  const searchCardTitle = {
    tableHeaderStyle: styles.SearchCardTitle,
    tableBodyStyle: styles.SearchDateTime,
  };
  const cardStyles = {
    cardContainerStyle: styles.searchCardContainer,
  };

  const manySavedsearchButtonStyle = {
    displayButtonStyle: styles.manySavedSearchButton,
    displayLabelStyle: styles.manySavedSearchLabel,
  };
  //pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(50); // You can set the initial value here
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [offset, setOffset] = useState(0);

  const [activeTab, setActiveTab] = useState(0);

  const [date, setDate] = useState<DateRange | undefined>();
  const [searchUrl, setSearchUrl] = useState('');

  //Data
  const [savedSearchData, setSavedSearchData] = useState<ISavedSearchData[]>(
    []
  );
  const [cardData, setCardData] = useState<ICardData[]>([]);

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  //Search Bar States
  const [search, setSearch] = useState<string>('');
  const [searchByName, setSearchByName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const dispatch = useAppDispatch();

  const { data, error, isLoading, refetch } = useGetAllSavedSearchesQuery({
    limit,
    offset,
    searchUrl,
    searchByName,
  });

  const handleResultsPerPageChange = useCallback(
    (event: string) => {
      const newResultsPerPage = parseInt(event, 10);
      setLimit(newResultsPerPage);
      setOffset(0);
      setCurrentPage(0); // Reset current page when changing results per page
      setNumberOfPages(Math.ceil(data?.count / newResultsPerPage));
    },
    [data?.count]
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

  let optionLimits = [
    { id: 1, value: '50' },
    { id: 2, value: '100' },
  ];

  const { data: searchList } = useGetSavedSearchListQuery(search);

  // Destructure the mutation function from the hook
  const [
    deleteSavedSearch,
    { isLoading: updateIsLoading, isError: updateIsError },
  ] = useDeleteSavedSearchMutation();

  const keyLabelMapping: KeyLabelMapping = useMemo(() => {
    return {
      shape: 'Shape',
      color: 'color',
      carat: 'carat',
      clarity: 'clarity',
      cut: 'cut',
      polish: 'polish',
      symmetry: 'Symmetry',
      price_range: 'Price Range',
      discount: 'Discount',
    };
  }, []);

  const renderCardData = useCallback(
    (data: ISavedSearchData[]) => {
      return data?.map((item) => {
        // Filter the data based on the keyLabelMapping
        const filteredData: IFormatedData = {};
        for (const key in keyLabelMapping) {
          if (item.meta_data[0].basic_card_details) {
            filteredData[keyLabelMapping[key]] =
              item.meta_data[0].basic_card_details[key] &&
              item.meta_data[0].basic_card_details[key]?.length
                ? item.meta_data[0].basic_card_details[key]
                : '-';
          }
        }
        const cardContent = (
          <CustomTable
            tableData={{
              tableHeads: Object.keys(filteredData),
              bodyData: [Object.values(filteredData)],
            }}
            tableStyleClasses={tableStyles}
          />
        );

        return {
          cardId: item.id,
          cardActionIcon: item.meta_data.length <= 1 && editIcon,
          cardHeader: (
            <div className="">
              <CustomTable
                tableData={{
                  tableHeads: [item.name],
                  bodyData: [
                    {
                      desc: (
                        <div className={styles.parentDivHeaderSectiom}>
                          <div style={{ marginRight: '80px' }}>
                            {formatCreatedAt(item.created_at)}
                          </div>

                          {item.meta_data.length > 1 && ( // Conditionally render the button
                            <CustomDisplayButton
                              displayButtonLabel={`Searches (${item.meta_data.length})`}
                              displayButtonAllStyle={manySavedsearchButtonStyle}
                            />
                          )}
                        </div>
                      ),
                    },
                  ],
                }}
                tableStyleClasses={searchCardTitle}
              />
            </div>
          ),
          cardContent: cardContent,
        };
      });
    },
    [searchCardTitle, tableStyles, keyLabelMapping, manySavedsearchButtonStyle]
  );

  //Delete Data
  const handleDelete = () => {
    if (isCheck.length) {
      setIsDialogOpen(true);
    } else {
      setIsError(true);
      setErrorText(`You haven't picked any stones.`);
    }

    if (data?.data?.previousSearch?.length === 1 && numberOfPages !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const deleteStoneHandler = async () => {
    await deleteSavedSearch(isCheck);
    await refetch();
    setIsCheck([]);
    setIsCheckAll(false);
    setIsDialogOpen(false);
  };

  const debouncedSave = useCallback(
    (inputValue: string) => {
      // Filter data based on input value
      const filteredSuggestions = searchList.filter((item: Item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      // Extract card titles from filtered suggestions
      const suggestionTitles = filteredSuggestions.map(
        (item: Item) => item.name
      );

      setSuggestions(suggestionTitles);
      // Update state with an array of strings
    },
    [searchList]
  );

  const debounce = <T extends any[]>(
    fn: (...args: T) => void,
    delay: number
  ) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: T) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    setSearch(inputValue);

    // Use the debounce function to wrap the debouncedSave function
    const delayedSave = debounce(
      (inputValue) => debouncedSave(inputValue),
      1000
    );
    delayedSave(inputValue);

    if (inputValue.length < 1) {
      setSearchByName('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    setSearchByName(suggestion);
    setSuggestions([]);
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

    if (updatedIsCheck.length === cardData?.length) {
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
    setIsCheck(cardData?.map((li) => li.cardId));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  //Footer Button Data
  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: ManageLocales('app.savedSearch.delete'),
      style: styles.filled,
      fn: handleDelete,
    },
  ];

  const handleDate = (date: IDateRange) => {
    console.log('date', date);
    setDate(date);
    setSearchUrl(
      `&startDate=${new Date(date.from)
        .toISOString()
        .replace('T', ' ')
        .replace('Z', '%2B00')}&endDate=${new Date(date.to)
        .toISOString()
        .replace('T', ' ')
        .replace('Z', '%2B00')}`
    );
  };

  //Header Data
  const savedSearchheaderData = {
    headerHeading: ManageLocales('app.savedSearch.header'),
    //count
    searchCount: data?.data?.count > 0 && data?.data?.count,
    //Search Data
    handleSearch: handleSearch,
    searchValue: search,
    handleSuggestionClick: handleSuggestionClick,
    suggestions: suggestions,
    headerData: (
      <>
        <div className="flex mr-[30px] ">
          <CustomCalender date={date} handleDate={handleDate} />
        </div>
        <div className="flex items-center gap-[10px] bottom-0">
          <Checkbox
            onClick={handleSelectAllCheckbox}
            data-testid={'Select All Checkbox'}
            checked={isCheckAll}
          />
          <p className="text-solitaireTertiary text-base font-medium">
            {ManageLocales('app.common.header.selectAll')}
          </p>
        </div>
      </>
    ),
    overriddenStyles: {
      headerDataStyles: 'flex items-center',
    },
  };

  useEffect(() => {
    const savedSearchData = data?.data;
    let specificSavedSearchData = savedSearchData?.savedSearch;
    setNumberOfPages(
      Math.ceil(savedSearchData?.count / savedSearchData?.limit)
    );

    setSavedSearchData(specificSavedSearchData);

    // Filter the location key from basic_card_details
    const filteredData = specificSavedSearchData?.map(
      (item: ISavedSearchData) => ({
        ...item,
        meta_data: item.meta_data.map((metaItem) => ({
          ...metaItem,
          basic_card_details: (({
            Location,
            Tinge,
            Fluorescence,
            Symmetry,
            ...rest
          }) => rest)(metaItem.basic_card_details),
        })),
      })
    );

    setCardData(renderCardData(filteredData));
  }, [data, limit, offset]);

  // Function to handle edit action
  const handleEdit = (stone: string) => {
    alert("You have clicked the 'Edit button'");
  };

  // Function to handle "Show Results" button click
  const showButtonHandleClick = () => {
    alert("You have clicked the 'show result' button");
  };

  const handleButtonClick = (index: number) => {
    setActiveTab(index);
  };

  const handleSlider = () => {
    // let savedSearchsingleDiamondData = savedSearchData.filter((items: any) => {
    //   return items.id === data.id;
    // });
    setActiveTab(0);
  };

  const modifySearchHandler = (id: string, activeTab: number) => {
    let modifyData = savedSearchData.filter((data) => {
      return data.id === id;
    })[0];

    dispatch(modifySavedSearch({ modifyData, activeTab }));

    router.push(`/advance-search?edit=saved-search`);
  };

  return (
    <>
      <CustomDialog
        setIsOpen={setIsDialogOpen}
        isOpens={isDialogOpen}
        dialogContent={
          <>
            <p className="text-center mt-3">
              Do you want to Delete the selected Stones?
            </p>
            <div className="flex justify-center">
              <CustomDisplayButton
                displayButtonLabel="Yes"
                displayButtonAllStyle={{
                  displayButtonStyle: `mr-[25px] ${styles.transparent}`,
                }}
                handleClick={deleteStoneHandler}
              />
              <CustomDisplayButton
                displayButtonLabel="No"
                displayButtonAllStyle={{
                  displayButtonStyle: styles.filled,
                }}
                handleClick={() => setIsDialogOpen(false)}
              />
            </div>
          </>
        }
      />
      <div className="container flex flex-col">
        {/* Custom Header */}
        {/* <div className="sticky top-0 bg-solitairePrimary mt-16 overflow-y-scroll">
          <CustomHeader data={savedSearchheaderData} />
        </div> */}

        {/* Custom Card and Checkbox map */}
        {cardData?.length ? (
          <div className="flex-grow overflow-y-auto min-h-[80vh]">
            <>
              {cardData?.map((items: ICardData, indexTest: number) => {
                return (
                  <div key={items.cardId}>
                    <div className="flex mt-6">
                      <CustomCheckBox
                        data={items.cardId}
                        onClick={handleClick}
                        isChecked={isCheck}
                      />
                      <CustomSlider
                        sheetTriggerStyle={styles.mainCardContainer}
                        sheetTriggenContent={
                          <>
                            <div
                              onClick={() =>
                                // handleSlider(savedSearchData[indexTest])
                                handleSlider()
                              }
                            >
                              <CustomSearchResultCard
                                cardData={items}
                                overriddenStyles={cardStyles}
                                defaultCardPosition={false}
                                handleCardAction={handleEdit}
                              />
                            </div>
                          </>
                        }
                        sheetContentStyle={styles.sheetContentStyle}
                        sheetContent={
                          <>
                            <div
                              className={`border-b border-solitaireSenary ${styles.sheetMainHeading}`}
                            >
                              <p>
                                {ManageLocales('app.savedSearch.detailInfo')}
                              </p>
                            </div>
                            {/* {sliderData.map((cardDetails: any) => ( */}
                            <>
                              <div className="sticky top-[82px] bg-solitaireSecondary flex items-center gap-14 text-solitaireTertiary">
                                {savedSearchData[indexTest].meta_data.length >
                                  1 &&
                                  savedSearchData[indexTest].meta_data.map(
                                    (data, index: number) => (
                                      <div
                                        key={`Search-${index}`}
                                        style={{
                                          marginRight:
                                            index ===
                                            savedSearchData[indexTest].meta_data
                                              .length -
                                              1
                                              ? '0px'
                                              : '16px',
                                        }}
                                      >
                                        <CustomDisplayButton
                                          displayButtonAllStyle={{
                                            displayButtonStyle:
                                              activeTab === index
                                                ? styles.activeHeaderButtonStyle
                                                : styles.headerButtonStyle,
                                            displayLabelStyle:
                                              styles.headerButtonLabelStyle,
                                          }}
                                          displayButtonLabel={`Search ${
                                            index + 1
                                          }`}
                                          handleClick={() =>
                                            handleButtonClick(index)
                                          }
                                        />
                                      </div>
                                    )
                                  )}
                              </div>
                              <div
                                className="flex"
                                key={savedSearchData[indexTest].id}
                              >
                                <div className={styles.sheetMainDiv}>
                                  {/* Detailed Information section */}
                                  <div className={styles.sheetHeading}>
                                    <p>
                                      {ManageLocales(
                                        'app.savedSearch.basicInfo'
                                      )}
                                    </p>
                                  </div>

                                  <div>
                                    {savedSearchData[indexTest] &&
                                    savedSearchData[indexTest]?.meta_data &&
                                    savedSearchData[indexTest]?.meta_data[
                                      activeTab
                                    ] &&
                                    savedSearchData[indexTest]?.meta_data[
                                      activeTab
                                    ]?.basic_card_details
                                      ? Object.entries(
                                          savedSearchData[indexTest]?.meta_data[
                                            activeTab
                                          ]?.basic_card_details
                                        ).map(([key, value]) => (
                                          <div key={key}>
                                            <p className="flex">
                                              <span
                                                className={styles.innerHeading}
                                              >
                                                {formatCassing(key)}
                                              </span>
                                              <span
                                                className={styles.sheetValues}
                                              >
                                                <span
                                                  className={styles.sheetValues}
                                                >
                                                  <span
                                                    className={
                                                      styles.sheetValues
                                                    }
                                                  >
                                                    <span
                                                      className={
                                                        styles.sheetValues
                                                      }
                                                    >
                                                      <span
                                                        className={
                                                          styles.sheetValues
                                                        }
                                                      >
                                                        <span
                                                          className={
                                                            styles.sheetValues
                                                          }
                                                        >
                                                          {Array.isArray(value)
                                                            ? value.length > 0
                                                              ? value.join(', ')
                                                              : '-'
                                                            : typeof value ===
                                                                'string' &&
                                                              value.trim() ===
                                                                ''
                                                            ? '-'
                                                            : typeof value ===
                                                              'string'
                                                            ? value
                                                            : '-'}
                                                        </span>
                                                      </span>
                                                    </span>
                                                  </span>
                                                </span>
                                              </span>
                                            </p>
                                          </div>
                                        ))
                                      : ''}
                                  </div>

                                  {/* measurement Information section */}
                                  <div className={styles.sheetHeading}>
                                    <p>
                                      {ManageLocales(
                                        'app.previousSearch.measurement'
                                      )}
                                    </p>
                                  </div>

                                  <div>
                                    {savedSearchData[indexTest] &&
                                    savedSearchData[indexTest]?.meta_data &&
                                    savedSearchData[indexTest]?.meta_data[
                                      activeTab
                                    ] &&
                                    savedSearchData[indexTest]?.meta_data[
                                      activeTab
                                    ].measurements
                                      ? Object.entries(
                                          savedSearchData[indexTest]?.meta_data[
                                            activeTab
                                          ].measurements
                                        ).map(([key, value]) => (
                                          <div key={key}>
                                            <p className="flex">
                                              <span
                                                className={styles.innerHeading}
                                              >
                                                {formatCassing(key)}
                                              </span>
                                              <span
                                                className={styles.sheetValues}
                                              >
                                                {Array.isArray(value)
                                                  ? value.length > 0
                                                    ? value.join(', ')
                                                    : '-'
                                                  : typeof value === 'string' &&
                                                    value.trim() === ''
                                                  ? '-'
                                                  : typeof value === 'string'
                                                  ? value
                                                  : '-'}
                                              </span>
                                            </p>
                                          </div>
                                        ))
                                      : ''}
                                  </div>

                                  {/* other Information section */}
                                  <div className={styles.sheetHeading}>
                                    <p>
                                      {ManageLocales(
                                        'app.previousSearch.otherInfo'
                                      )}
                                    </p>
                                  </div>

                                  <div>
                                    {savedSearchData[indexTest] &&
                                    savedSearchData[indexTest]?.meta_data &&
                                    savedSearchData[indexTest]?.meta_data[
                                      activeTab
                                    ] &&
                                    savedSearchData[indexTest]?.meta_data[
                                      activeTab
                                    ].other_information
                                      ? Object.entries(
                                          savedSearchData[indexTest]?.meta_data[
                                            activeTab
                                          ].other_information
                                        ).map(([key, value]) => (
                                          <div key={key}>
                                            <p className="flex">
                                              <span
                                                className={styles.innerHeading}
                                              >
                                                {formatCassing(key)}
                                              </span>
                                              <span
                                                className={styles.sheetValues}
                                              >
                                                {Array.isArray(value)
                                                  ? value.length > 0
                                                    ? value.join(', ')
                                                    : '-'
                                                  : typeof value === 'string' &&
                                                    value.trim() === ''
                                                  ? '-'
                                                  : typeof value === 'string'
                                                  ? value
                                                  : '-'}
                                              </span>
                                            </p>
                                          </div>
                                        ))
                                      : ''}
                                  </div>
                                </div>

                                {/* inclusionDetails Information section */}
                                <div className={styles.inclusionDetailsMainDiv}>
                                  <div className={styles.sheetHeading}>
                                    <p>
                                      {ManageLocales(
                                        'app.previousSearch.inclusionDetails'
                                      )}
                                    </p>
                                  </div>

                                  {savedSearchData[indexTest] &&
                                  savedSearchData[indexTest]?.meta_data &&
                                  savedSearchData[indexTest]?.meta_data[
                                    activeTab
                                  ] &&
                                  savedSearchData[indexTest]?.meta_data[
                                    activeTab
                                  ].inclusion_details ? (
                                    Object.entries(
                                      savedSearchData[indexTest]?.meta_data[
                                        activeTab
                                      ].inclusion_details
                                    ).map(([key, value]) => (
                                      <p className="flex" key={key}>
                                        <span
                                          className={
                                            styles.inclutionDetailsInnerHeadingStyle
                                          }
                                        >
                                          {formatCassing(key)}
                                        </span>
                                        <span className={styles.sheetValues}>
                                          {Array.isArray(value) &&
                                          value.length > 0
                                            ? value.join(', ')
                                            : (typeof value === 'string' &&
                                                value.trim() !== '') ||
                                              typeof value === 'number'
                                            ? value
                                            : '-'}
                                        </span>
                                      </p>
                                    ))
                                  ) : (
                                    // Handle the case where the data is not available, e.g., display a loading message or an error message.
                                    <p>Data not available</p>
                                  )}

                                  {/* other Information section */}
                                  <div className={styles.sheetHeading}>
                                    <p>
                                      {ManageLocales(
                                        'app.previousSearch.otherInfo'
                                      )}
                                    </p>
                                  </div>

                                  <div>
                                    {savedSearchData[indexTest] &&
                                    savedSearchData[indexTest]?.meta_data &&
                                    savedSearchData[indexTest]?.meta_data[
                                      activeTab
                                    ] &&
                                    savedSearchData[indexTest]?.meta_data[
                                      activeTab
                                    ].other_information
                                      ? Object.entries(
                                          savedSearchData[indexTest]?.meta_data[
                                            activeTab
                                          ].other_information
                                        ).map(([key, value]) => (
                                          <div key={key}>
                                            <p className="flex">
                                              <span
                                                className={styles.innerHeading}
                                              >
                                                {formatCassing(key)}
                                              </span>
                                              <span
                                                className={styles.sheetValues}
                                              >
                                                <span
                                                  className={styles.sheetValues}
                                                >
                                                  {Array.isArray(value) &&
                                                  value.length > 0
                                                    ? value.join(', ')
                                                    : (typeof value ===
                                                        'string' &&
                                                        value.trim() !== '') ||
                                                      typeof value === 'number'
                                                    ? value
                                                    : '-'}
                                                </span>
                                              </span>
                                            </p>
                                          </div>
                                        ))
                                      : ''}
                                  </div>
                                </div>
                              </div>
                            </>
                            {/* // ))} */}

                            {/* Show Results button */}
                            <div
                              className={`border-t border-solitaireTertiary mt-8 ${styles.showResultMainDiv}`}
                            >
                              <CustomDisplayButton
                                displayButtonLabel="Modify Search"
                                displayButtonAllStyle={{
                                  displayButtonStyle:
                                    styles.showResultButtonTransparent,
                                }}
                                handleClick={() =>
                                  modifySearchHandler(items.cardId, activeTab)
                                }
                              />
                              <CustomDisplayButton
                                displayButtonLabel="Show Results"
                                displayButtonAllStyle={{
                                  displayButtonStyle:
                                    styles.showResultButtonFilled,
                                }}
                                handleClick={showButtonHandleClick}
                              />
                            </div>
                          </>
                        }
                      />
                    </div>
                  </div>
                );
              })}
            </>
          </div>
        ) : (
          <NoDataFound />
        )}

        {/* Custom Footer */}
        <div className="sticky bottom-0 bg-solitairePrimary mt-3">
          <CustomPagination
            currentPage={currentPage}
            totalPages={numberOfPages}
            resultsPerPage={limit}
            optionLimits={optionLimits}
            handlePageClick={handlePageClick}
            handleResultsPerPageChange={handleResultsPerPageChange}
          />

          {/* Custom Footer */}
          {footerButtonData?.length && (
            <div className="sticky bottom-0 bg-solitairePrimary mt-3 flex border-t-2 border-solitaireSenary items-center justify-between">
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
          )}
        </div>
      </div>
    </>
  );
};

export default SavedSearch;
