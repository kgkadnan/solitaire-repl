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
import { SheetContent, SheetTrigger, Sheet } from '@/components/ui/sheet';
import CustomSearchResultCard from '@/components/common/search-result-card';
import { CustomFooter } from '@/components/common/footer';
import { ManageLocales } from '@/utils/translate';
import CustomPagination from '@/components/common/pagination';
import {
  useGetAllSavedSearchesQuery,
  useUpdateSavedSearchesMutation,
} from '@/slices/saved-searches';

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
  filter: any;
  isDeleted: boolean;
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
  //pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(1); // You can set the initial value here
  const [numberOfPages, setNumberOfPages] = useState(0);

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
    isDeleted: false,
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

  // Function to format the created_at date
  const formatCreatedAt = (createdAt: any) => {
    const createdAtDate = new Date(createdAt);

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    const formattedDate = dateFormatter.format(createdAtDate);
    const formattedTime = timeFormatter.format(createdAtDate);

    return `${formattedDate} | ${formattedTime}`;
  };

  const renderCardData = useCallback(
    (data: any, suggestion?: string) => {
      return data
        ?.filter((data: any) =>
          data.name.toLowerCase().startsWith(suggestion?.toLowerCase())
        )
        .map((data: any) => ({
          cardId: data.id,
          cardActionIcon: editIcon,
          cardHeader: (
            <CustomTable
              tableData={{
                tableHeads: [data.name],
                bodyData: [{ desc: formatCreatedAt(data.created_at) }],
              }}
              tableStyleClasses={searchCardTitle}
            />
          ),
          cardContent: (
            <CustomTable
              tableData={{
                tableHeads: Object.keys(data.meta_data),
                bodyData: [data.meta_data],
              }}
              tableStyleClasses={tableStyles}
            />
          ),
        }));
    },
    [searchCardTitle, tableStyles]
  );

  //Delete Data
  const handleDelete = async () => {
    let payload = { id: isCheck, filter: { is_deleted: true } };
    await updateSavedSearches(payload);
    await refetch();
    setIsCheck([]);
    setIsCheckAll(false);

    if (data.data.previousSearch.length === 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const cardDetailData = [
    {
      cardId: 1,
      basicCardDetails: {
        Lab: 'GIA',
        Shape: 'Round',
        Carat: '2,2.5,3',
        Color: 'D,E,F',
        Clarity: 'FL,VVS1,VVS2',
        Tinge: 'WH',
        Cut: 'EX,VG,G',
        Polish: 'EX',
        Symmetry: 'EX',
        Fluorescene: 'Non',
        Location: 'IND',
      },

      inclutionDetails: {
        'Table Black': 'BO',
        'Side Black': 'SBO',
        'Table Inclution': 'TO',
        'Side Inclution': 'SO',
        'Table Open': 'N',
        'Crown Open': 'N',
        'Pavillion Open': 'N',
        'Eye Clean': 'Y',
        'Hearts & Arrows': '-',
        Brilliancy: '-',
        'Type 2 Certificate': '-',
        'Country Of Origin': '-',
        'Rough Mine': '-',
        'Natural Girdle': 'N',
        'Natural Crown': 'N',
        'Natural Pavillion': 'N',
        'Internal Graining': 'IGO',
        'Surface Graining': 'GO',
      },

      measurements: {
        Girdle: 'Med-Stk',
        Cutlet: 'None',
        Luster: 'EX',
      },

      OtherInformation: {
        'Key To Symbol': '-',
        'Report Comments': '-',
      },
    },
  ];

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
  const handleClick = (e: any) => {
    const { id } = e.target;

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
  const headerData = {
    headerHeading: ManageLocales('app.savedSearch.header'),
    handleSelectAllCheckbox: handleSelectAllCheckbox,
    isCheckAll: isCheckAll,
    //count
    searchCount: cardData?.length,
    //Search Data
    handleSearch: handleSearch,
    searchValue: search,
    handleSuggestionClick: handleSuggestionClick,
    suggestions: suggestions,
  };

  useEffect(() => {
    const SavedSearchData = data?.data;
    let searchData = SavedSearchData?.previousSearch;
    setNumberOfPages(SavedSearchData?.totalPages);
    setSavedSearchData(searchData);
    setCardData(renderCardData(searchData, search));
  }, [data, currentPage, resultsPerPage]);

  // Function to handle edit action
  const handleEdit = (stone: string) => {
    alert("You have clicked the 'Edit button'");
  };

  // Function to handle "Show Results" button click
  const showButtonHandleClick = () => {
    alert("You have clicked the 'show result' button");
  };

  return (
    <>
      <div className="container flex flex-col">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-16 overflow-y-scroll">
          <CustomHeader data={headerData} />
        </div>

        <Sheet>
          {/* Custom Card and Checkbox map */}
          <div className="flex-grow overflow-y-auto min-h-[80vh]">
            <>
              {cardData?.map((items: any) => {
                return (
                  <div key={items.cardId}>
                    <div className="flex mt-6">
                      <CustomCheckBox
                        data={items.cardId}
                        onClick={handleClick}
                        isChecked={isCheck}
                      />
                      <SheetTrigger className={styles.mainCardContainer}>
                        <CustomSearchResultCard
                          cardData={items}
                          overriddenStyles={cardStyles}
                          defaultCardPosition={false}
                          handleCardAction={handleEdit}
                        />
                      </SheetTrigger>
                      <SheetContent className={styles.sheetContentStyle}>
                        {/* Detailed Information section */}
                        <div
                          className={`border-b border-solitaireTertiary ${styles.sheetMainHeading}`}
                        >
                          <p>{ManageLocales('app.savedSearch.detailInfo')}</p>
                        </div>

                        {/* Loop through card detail data */}
                        {cardDetailData.map((cardDetails) => (
                          <div className="flex" key={cardDetails.cardId}>
                            <div className={styles.sheetMainDiv}>
                              <div className={styles.sheetHeading}>
                                <p>
                                  {ManageLocales('app.savedSearch.basicInfo')}
                                </p>
                              </div>

                              <div>
                                {Object.entries(
                                  cardDetails.basicCardDetails
                                ).map(([key, value]) => (
                                  <div key={key}>
                                    <p className="flex">
                                      <span className={styles.innerHeading}>
                                        {key}
                                      </span>
                                      <span className={styles.sheetValues}>
                                        {value}
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <div className={styles.sheetHeading}>
                                <p>
                                  {ManageLocales('app.savedSearch.measurement')}
                                </p>
                              </div>

                              <div>
                                {Object.entries(cardDetails.measurements).map(
                                  ([key, value]) => (
                                    <div key={key}>
                                      <p className="flex">
                                        <span className={styles.innerHeading}>
                                          {key}
                                        </span>
                                        <span className={styles.sheetValues}>
                                          {value}
                                        </span>
                                      </p>
                                    </div>
                                  )
                                )}
                              </div>

                              <div className={styles.sheetHeading}>
                                <p>
                                  {ManageLocales('app.savedSearch.otherInfo')}
                                </p>
                              </div>

                              <div>
                                {Object.entries(
                                  cardDetails.OtherInformation
                                ).map(([key, value]) => (
                                  <div key={key}>
                                    <p className="flex">
                                      <span className={styles.innerHeading}>
                                        {key}
                                      </span>
                                      <span className={styles.sheetValues}>
                                        {value}
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className={styles.inclusionDetailsMainDiv}>
                              <div className={styles.sheetHeading}>
                                <p>
                                  {ManageLocales(
                                    'app.savedSearch.inclusionDetails'
                                  )}
                                </p>
                              </div>
                              {Object.entries(cardDetails.inclutionDetails).map(
                                ([key, value]) => (
                                  <p className="flex" key={key}>
                                    <span
                                      className={
                                        styles.inclutionDetailsInnerHeadingStyle
                                      }
                                    >
                                      {key}
                                    </span>
                                    <span className={styles.sheetValues}>
                                      {value}
                                    </span>
                                  </p>
                                )
                              )}
                            </div>
                          </div>
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
                      </SheetContent>
                    </div>
                  </div>
                );
              })}
            </>
          </div>
        </Sheet>

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
