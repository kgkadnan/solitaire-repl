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
  useGetAllSavedSearchesQuery,
  useUpdateSavedSearchesMutation,
} from '@/slices/saved-searches';
import { CustomToast } from '@/components/common/toast';
import { CustomSlider } from '@/components/common/slider';
import { formatCreatedAt } from '@/utils/format-date';

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
  const [resultsPerPage, setResultsPerPage] = useState(1); // You can set the initial value here
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [sliderData, setSliderData] = useState<any>([]);

  const handleResultsPerPageChange = (event: string) => {
    const newResultsPerPage = parseInt(event, 10);
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(0); // Reset current page when changing results per page
  };

  const handlePageClick = (page: number) => {
    if (page >= 0 && page <= numberOfPages) {
      setIsCheck([]);
      setIsCheckAll(false);
      setCurrentPage(page);
    }
  };

  let optionLimits = [
    { id: 1, value: '1' },
    { id: 2, value: '10' },
  ];

  const { data, error, isLoading, refetch } = useGetAllSavedSearchesQuery({
    currentPage,
    resultsPerPage,
  });

  // Destructure the mutation function from the hook
  const [
    updateSavedSearches,
    { isLoading: updateIsLoading, isError: updateIsError },
  ] = useUpdateSavedSearchesMutation();

  //Data
  const [SavedSearchData, setSavedSearchData] = useState<IData[]>([]);
  const [cardData, setCardData] = useState<ICardData[]>([]);

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  //Search Bar States
  const [search, setSearch] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  //toast message
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastErrorMessage, setToastErrorMessage] = useState<string>('');

  const searchData = [
    'sample',
    'sample12',
    'sample3',
    'sample4',
    'sample5',
    'ooooo',
  ];

  const searchListNew = useMemo(
    () => [
      {
        id: 'gkgh32465442',
        name: 'ooooo',
        customer_id: '<sample_customer_id>',
        diamondCount: 256,
        filter: {
          color: ['D', 'F', 'E', 'G'],
          clarity: ['VVS2', 'VVS1', 'VS2'],
          polarity: ['EX', 'IDEAL', 'VG'],
          lab: ['GIA', 'HRD', 'IGI'],
        },
        isDeleted: false,
        created_at: '2023-08-23T08:03:54.942Z',
        updated_at: '2023-08-23T08:03:54.942Z',
      },
    ],
    [] // No dependencies
  );

  const renderCardData = useCallback(
    (data: any, suggestion?: string) => {
      return data?.map((item: any) => {
        const meta_data = Array.isArray(item.meta_data)
          ? item.meta_data[0].basicCardDetails
          : item.meta_data.basicCardDetails;

        const cardContent = (
          <CustomTable
            tableData={{
              tableHeads: Object.keys(meta_data),
              bodyData: [meta_data],
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
      const filteredSuggestions = searchData.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      // Extract card titles from filtered suggestions
      const suggestionTitles = filteredSuggestions.map((item) => item);
      setSuggestions(suggestionTitles);
      // Update state with an array of strings
    },
    [searchData]
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
      setCardData(renderCardData(SavedSearchData, ''));
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    setSearch(suggestion);

    let dataNew = SavedSearchData.map((data: { name: any }) => data.name);

    if (!dataNew.includes(suggestion)) {
      setCardData(renderCardData(searchListNew, suggestion));
    } else {
      setCardData(renderCardData(SavedSearchData, suggestion));
    }

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
    ),
    overriddenStyles: {
      headerDataStyles: 'flex items-end',
    },
  };

  useEffect(() => {
    const SavedSearchData = data?.data;
    let searchData = SavedSearchData?.savedSearch;
    setNumberOfPages(SavedSearchData?.totalPages);
    setSavedSearchData(searchData);

    // searchData?.filter((items: any) => {
    //   items.meta_data.filter((items: any) => {
    //     console.log(
    //       '---------------------------------------',
    //       items.basicCardDetails
    //     );
    //   });
    // });

    // Filter the location key from basicCardDetails
    const filteredData = searchData?.map((item: any) => ({
      ...item,
      meta_data: item.meta_data.map((metaItem: any) => ({
        ...metaItem,
        basicCardDetails: (({
          Location,
          Tinge,
          Fluorescence,
          Symmetry,
          ...rest
        }) => rest)(metaItem.basicCardDetails),
      })),
    }));

    setCardData(renderCardData(filteredData, search));
  }, [data, currentPage, resultsPerPage]);

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
      {showToast && <CustomToast message={toastErrorMessage} />}
      <div className="container flex flex-col">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-16 overflow-y-scroll">
          <CustomHeader data={savedSearchheaderData} />
        </div>

        {/* Custom Card and Checkbox map */}
        <div className="flex-grow overflow-y-auto min-h-[80vh]">
          <>
            {cardData?.map((items: any, index: number) => {
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
                            onClick={() => handleSlider(SavedSearchData[index])}
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

                          {sliderData.map((cardDetails: any) => (
                            <>
                              <div className="border-b border-solitaireTertiary flex items-center gap-14 text-solitaireTertiary mb-3 pb-5">
                                {cardDetails.meta_data.length > 1 &&
                                  cardDetails.meta_data.map(
                                    (data: any, index: number) => (
                                      <div
                                        key={`Search-${index}`}
                                        style={{
                                          marginRight:
                                            index ===
                                            cardDetails.meta_data.length - 1
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
                                key={cardDetails.meta_data.cardId}
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
                                    {Object?.entries(
                                      cardDetails &&
                                        cardDetails?.meta_data[activeTab]
                                          ?.basicCardDetails
                                    ).map(([key, value]) => (
                                      <div key={key}>
                                        <p className="flex">
                                          <span className={styles.innerHeading}>
                                            {key}
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
                                      cardDetails &&
                                        cardDetails?.meta_data[activeTab]
                                          .measurements
                                    ).map(([key, value]) => (
                                      <div key={key}>
                                        <p className="flex">
                                          <span className={styles.innerHeading}>
                                            {key}
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
                                      cardDetails &&
                                        cardDetails?.meta_data[activeTab]
                                          .OtherInformation
                                    ).map(([key, value]) => (
                                      <div key={key}>
                                        <p className="flex">
                                          <span className={styles.innerHeading}>
                                            {key}
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

                                  {Object.entries(
                                    cardDetails &&
                                      cardDetails?.meta_data[activeTab]
                                        .inclusionDetails
                                  ).map(([key, value]) => (
                                    <p className="flex" key={key}>
                                      <span
                                        className={
                                          styles.inclutionDetailsInnerHeadingStyle
                                        }
                                      >
                                        {key}
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
                          ))}

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
            resultsPerPage={resultsPerPage}
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
