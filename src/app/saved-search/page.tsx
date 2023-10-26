'use client';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
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
  useGetAllSavedSearchesQuery,
  useGetSavedSearchListQuery,
  useUpdateSavedSearchesMutation,
} from '@/features/api/saved-searches';
import { CustomToast } from '@/components/common/toast';
import { CustomSlider } from '@/components/common/slider';
import { formatCreatedAt } from '@/utils/format-date';
import { CustomCalender } from '@/components/common/calender';
import { DateRange } from 'react-day-picker';
import { formatCassing } from '@/utils/format-cassing';

interface ICardData {
  cardId: string;
  cardActionIcon: string;
  cardHeader: React.ReactNode;
  cardContent: React.ReactNode;
}

interface IData {
  id: string;
  name: string;
  customer_id: string;
  diamondCount: number;
  meta_data: any;
  filter: any;
  created_at: string;
  updated_at: string;
}

interface KeyLabelMapping {
  [key: string]: string;
}

const SavedSearch = () => {
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
  const showResulutButtonStyle = {
    displayButtonStyle: styles.showResultButtonStyle,
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

  const [sliderData, setSliderData] = useState<any>([]);
  const [date, setDate] = useState<DateRange | undefined>();
  const [searchUrl, setSearchUrl] = useState('');

  //Data
  const [SavedSearchData, setSavedSearchData] = useState<any[]>([]);
  const [cardData, setCardData] = useState<ICardData[]>([]);

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  //Search Bar States
  const [search, setSearch] = useState<string>('');
  const [searchByName, setSearchByName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleResultsPerPageChange = useCallback((event: string) => {
    const newResultsPerPage = parseInt(event, 10);
    setLimit(newResultsPerPage);
    setOffset(0);
    setCurrentPage(0); // Reset current page when changing results per page
    setNumberOfPages(Math.ceil(data?.count / newResultsPerPage));
  }, []);

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

  const { data, error, isLoading, refetch } = useGetAllSavedSearchesQuery({
    limit,
    offset,
    searchUrl,
    searchByName,
  });

  const { data: searchList } = useGetSavedSearchListQuery(search);

  // Destructure the mutation function from the hook
  const [
    updateSavedSearches,
    { isLoading: updateIsLoading, isError: updateIsError },
  ] = useUpdateSavedSearchesMutation();

  const keyLabelMapping: KeyLabelMapping = {
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

  const renderCardData = useCallback(
    (data: any, suggestion?: string) => {
      return data
        ?.filter((data: any) =>
          data.name.toLowerCase().startsWith(suggestion?.toLowerCase())
        )
        .map((item: any) => {
          // Filter the data based on the keyLabelMapping
          const filteredData: any = {};
          for (const key in keyLabelMapping) {
            if (item.meta_data[0].basic_card_details) {
              filteredData[keyLabelMapping[key]] =
                item.meta_data[0].basic_card_details[key] &&
                item.meta_data[0].basic_card_details[key].length
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
            cardActionIcon: editIcon,
            cardHeader: (
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
                          <CustomDisplayButton
                            displayButtonLabel={`Searches (${item.meta_data.length})`}
                            displayButtonAllStyle={manySavedsearchButtonStyle}
                          />
                        </div>
                      ),
                    },
                  ],
                }}
                tableStyleClasses={searchCardTitle}
              />
            ),
            cardContent: cardContent,
          };
        });
    },
    [searchCardTitle, tableStyles, editIcon, formatCreatedAt]
  );

  //Delete Data
  const handleDelete = async () => {
    let payload = { id: isCheck };
    await updateSavedSearches(payload);
    await refetch();
    setIsCheck([]);
    setIsCheckAll(false);

    if (data?.data?.previousSearch?.length === 1 && numberOfPages !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const debouncedSave = useCallback(
    (inputValue: string) => {
      // Filter data based on input value
      const filteredSuggestions = searchList.filter((item: any) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      // Extract card titles from filtered suggestions
      const suggestionTitles = filteredSuggestions.map(
        (item: any) => item.name
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

  const handleSuggestionClick = (suggestion: any) => {
    setSearch(suggestion);
    setSearchByName(suggestion);
    setSuggestions([]);
  };

  //specific checkbox
  const handleClick = (id: string) => {
    // const { id } = e.target;

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

  const handleDate = (date: any) => {
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
    searchCount: cardData?.length,
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
    const SavedSearchData = data?.data;
    let specificSavedSearchData = SavedSearchData?.savedSearch;
    setNumberOfPages(
      Math.ceil(SavedSearchData?.count / SavedSearchData?.limit)
    );
    setSavedSearchData(specificSavedSearchData);

    // Filter the location key from basic_card_details
    const filteredData = specificSavedSearchData?.map((item: any) => ({
      ...item,
      meta_data: item.meta_data.map((metaItem: any) => ({
        ...metaItem,
        basic_card_details: (({
          Location,
          Tinge,
          Fluorescence,
          Symmetry,
          ...rest
        }) => rest)(metaItem.basic_card_details),
      })),
    }));

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

  const handleSlider = (data: any) => {
    let savedSearchsingleDiamondData = SavedSearchData.filter((items: any) => {
      return items.id === data.id;
    });
    setSliderData(savedSearchsingleDiamondData);
    setActiveTab(0);
  };

  return (
    <>
      <div className="container flex flex-col">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-16 overflow-y-scroll">
          <CustomHeader data={savedSearchheaderData} />
        </div>

        {/* Custom Card and Checkbox map */}
        <div className="flex-grow overflow-y-auto min-h-[80vh]">
          <>
            {cardData?.map((items: any, indexTest: number) => {
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
                              handleSlider(SavedSearchData[indexTest])
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
                          <div className={styles.sheetMainHeading}>
                            <p>{ManageLocales('app.savedSearch.detailInfo')}</p>
                          </div>

                          {/* {sliderData.map((cardDetails: any) => ( */}
                          <>
                            <div className="border-b border-solitaireTertiary flex items-center gap-14 text-solitaireTertiary mb-3 pb-5">
                              {SavedSearchData[indexTest].meta_data.length >
                                1 &&
                                SavedSearchData[indexTest].meta_data.map(
                                  (data: any, index: number) => (
                                    <div
                                      key={`Search-${index}`}
                                      style={{
                                        marginRight:
                                          index ===
                                          SavedSearchData[indexTest].meta_data
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
                              key={SavedSearchData[indexTest].meta_data.cardId}
                            >
                              <div className={styles.sheetMainDiv}>
                                {/* Detailed Information section */}
                                <div className={styles.sheetHeading}>
                                  <p>
                                    {ManageLocales('app.savedSearch.basicInfo')}
                                  </p>
                                </div>

                                <div>
                                  {Object?.entries(
                                    SavedSearchData[indexTest] &&
                                      SavedSearchData[indexTest]?.meta_data[
                                        activeTab
                                      ]?.basic_card_details
                                  ).map(([key, value]) => (
                                    <div key={key}>
                                      <p className="flex">
                                        <span className={styles.innerHeading}>
                                          {formatCassing(key)}
                                        </span>
                                        <span className={styles.sheetValues}>
                                          {Array.isArray(value)
                                            ? (value as string[]).join(', ')
                                            : (value as string)}
                                        </span>
                                      </p>
                                    </div>
                                  ))}
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
                                  {Object?.entries(
                                    SavedSearchData[indexTest] &&
                                      SavedSearchData[indexTest]?.meta_data[
                                        activeTab
                                      ].measurements
                                  ).map(([key, value]) => (
                                    <div key={key}>
                                      <p className="flex">
                                        <span className={styles.innerHeading}>
                                          {formatCassing(key)}
                                        </span>
                                        <span className={styles.sheetValues}>
                                          {Array.isArray(value)
                                            ? (value as string[]).join(', ')
                                            : (value as string)}
                                        </span>
                                      </p>
                                    </div>
                                  ))}
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
                                  {Object.entries(
                                    SavedSearchData[indexTest] &&
                                      SavedSearchData[indexTest]?.meta_data[
                                        activeTab
                                      ].other_information
                                  ).map(([key, value]) => (
                                    <div key={key}>
                                      <p className="flex">
                                        <span className={styles.innerHeading}>
                                          {formatCassing(key)}
                                        </span>
                                        <span className={styles.sheetValues}>
                                          {Array.isArray(value)
                                            ? (value as string[]).join(', ')
                                            : (value as string)}
                                        </span>
                                      </p>
                                    </div>
                                  ))}
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

                                {SavedSearchData[indexTest] &&
                                  Object.entries(
                                    SavedSearchData[indexTest]?.meta_data[
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
                                        {Array.isArray(value)
                                          ? (value as string[]).join(', ')
                                          : (value as string)}
                                      </span>
                                    </p>
                                  ))}
                              </div>
                            </div>
                          </>
                          {/* // ))} */}

                          <div className="border-b border-solitaireTertiary mt-8"></div>

                          {/* Show Results button */}
                          <div className={styles.showResultMainDiv}>
                            <CustomDisplayButton
                              displayButtonLabel="Show Results"
                              displayButtonAllStyle={showResulutButtonStyle}
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

          {!!footerButtonData?.length && (
            <CustomFooter footerButtonData={footerButtonData} />
          )}
        </div>
      </div>
    </>
  );
};

export default SavedSearch;
