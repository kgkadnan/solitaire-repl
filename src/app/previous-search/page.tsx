'use client';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './previous-search.module.scss';
import { CustomTable } from '@/components/common/table';
import { CustomDisplayButton } from '@components/common/buttons/display-button';
import editIcon from '@public/assets/icons/edit.svg';
import CustomHeader from '@/components/common/header';
import { CustomCheckBox } from '@/components/common/checkbox';
import CustomSearchResultCard from '@/components/common/search-result-card';
import { CustomFooter } from '@/components/common/footer';
import { ManageLocales } from '@/utils/translate';
import CustomPagination from '@/components/common/pagination';
import {
  useGetAllPreviousSearchesQuery,
  useGetPreviousSearchListQuery,
  useUpdatePreviousSearchMutation,
} from '@/features/api/previous-searches';
import { CustomSlider } from '@/components/common/slider';
import { CustomToast } from '@/components/common/toast';
import { Checkbox } from '@/components/ui/checkbox';
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

interface KeyLabelMapping {
  [key: string]: string;
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

const PreviousSearch = () => {
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
  const [limit, setLimit] = useState(50); // You can set the initial value here
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [offset, setOffset] = useState(0);

  const [searchUrl, setSearchUrl] = useState('');
  const [date, setDate] = React.useState<DateRange | undefined>();

  //Data
  const [PreviousSearchData, setPreviousSearchData] = useState<any[]>([]);
  const [cardData, setCardData] = useState<ICardData[]>([]);

  //checkbox states
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  //Search Bar States
  const [search, setSearch] = useState<string>('');
  const [searchByName, setSearchByName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  //toast message
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastErrorMessage, setToastErrorMessage] = useState<string>('');

  let optionLimits = [
    { id: 1, value: '50' },
    { id: 2, value: '100' },
  ];

  const { data, error, isLoading, refetch } = useGetAllPreviousSearchesQuery({
    offset,
    limit,
    searchUrl,
    searchByName,
  });
  const { data: searchList } = useGetPreviousSearchListQuery(search);

  const handleResultsPerPageChange = useCallback(
    (event: string) => {
      const newResultsPerPage = parseInt(event, 10);
      setLimit(newResultsPerPage);
      setOffset(0);
      setCurrentPage(0); // Reset current page when changing results per page
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

  // Destructure the mutation function from the hook
  const [
    updatePreviousSearch,
    { isLoading: updateIsLoading, isError: updateIsError },
  ] = useUpdatePreviousSearchMutation();

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
        .map((data: any) => {
          // Filter the data based on the keyLabelMapping
          const filteredData: any = {};
          for (const key in keyLabelMapping) {
            if (data.meta_data.basic_card_details) {
              filteredData[keyLabelMapping[key]] =
                data.meta_data.basic_card_details[key] &&
                data.meta_data.basic_card_details[key].length
                  ? data.meta_data.basic_card_details[key]
                  : '-';
            }
          }

          return {
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
                  tableHeads: Object.keys(filteredData),
                  bodyData: [Object.values(filteredData)],
                }}
                tableStyleClasses={tableStyles}
              />
            ),
          };
        });
    },
    [searchCardTitle, tableStyles]
  );

  //Delete Data
  const handleDelete = async () => {
    if (isCheck.length) {
      let payload = { id: isCheck, filter: { is_deleted: true } };
      await updatePreviousSearch(payload);
      await refetch();
      setIsCheck([]);
      setIsCheckAll(false);
    } else {
      setShowToast(true);
      setToastErrorMessage('Check to delete previous search data.');
    }

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
    console.log('suggestion', suggestion);
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
      displayButtonLabel: ManageLocales('app.previousSearch.delete'),
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
  const previousSearchheaderData = {
    headerHeading: ManageLocales('app.previousSearch.header'),
    //count
    searchCount: cardData?.length,
    //Search Data
    handleSearch: handleSearch,
    searchValue: search,
    handleSuggestionClick: handleSuggestionClick,
    suggestions: suggestions,
    headerData: (
      <>
        <div className="flex mr-[30px]">
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
    const previousSearchData = data?.data;
    let searchData = previousSearchData?.previousSearch;
    setNumberOfPages(
      Math.ceil(previousSearchData?.count / previousSearchData?.limit)
    );
    setPreviousSearchData(searchData);
    setCardData(renderCardData(searchData));
  }, [data, offset, limit]);

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
      {showToast && <CustomToast message={toastErrorMessage} />}
      <div className="container flex flex-col">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-16 overflow-y-scroll">
          <CustomHeader data={previousSearchheaderData} />
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
                      sheetTriggenContent={
                        <>
                          <CustomSearchResultCard
                            cardData={items}
                            overriddenStyles={cardStyles}
                            defaultCardPosition={false}
                            handleCardAction={handleEdit}
                          />
                        </>
                      }
                      sheetTriggerStyle={styles.mainCardContainer}
                      sheetContent={
                        <>
                          {/* Detailed Information section */}
                          <div
                            className={`border-b border-solitaireTertiary ${styles.sheetMainHeading}`}
                          >
                            <p>
                              {ManageLocales('app.previousSearch.detailInfo')}
                            </p>
                          </div>

                          {/* Loop through card detail data */}
                          {/* {PreviousSearchData.map((cardDetails) => ( */}
                          <div
                            className="flex"
                            key={PreviousSearchData[index]?.id}
                          >
                            <div className={styles.sheetMainDiv}>
                              <div className={styles.sheetHeading}>
                                <p>
                                  {ManageLocales(
                                    'app.previousSearch.basicInfo'
                                  )}
                                </p>
                              </div>

                              <div>
                                {Object.entries(
                                  PreviousSearchData[index].meta_data
                                    .basic_card_details
                                ).map(([key, value]: any) => (
                                  <div key={key}>
                                    <p className="flex">
                                      <span className={styles.innerHeading}>
                                        {formatCassing(key)}
                                      </span>
                                      <span className={styles.sheetValues}>
                                        {typeof value !== 'string'
                                          ? value?.join(',')
                                          : formatCassing(value)}
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <div className={styles.sheetHeading}>
                                <p>
                                  {ManageLocales(
                                    'app.previousSearch.measurement'
                                  )}
                                </p>
                              </div>

                              <div>
                                {Object.entries(
                                  PreviousSearchData[index].meta_data
                                    .measurements
                                ).map(([key, value]: any) => (
                                  <div key={key}>
                                    <p className="flex">
                                      <span className={styles.innerHeading}>
                                        {formatCassing(key)}
                                      </span>
                                      <span className={styles.sheetValues}>
                                        {typeof value !== 'string'
                                          ? value.join(',')
                                          : formatCassing(value)}
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <div className={styles.sheetHeading}>
                                <p>
                                  {ManageLocales(
                                    'app.previousSearch.otherInfo'
                                  )}
                                </p>
                              </div>

                              <div>
                                {Object.entries(
                                  PreviousSearchData[index].meta_data
                                    .other_information
                                ).map(([key, value]: any) => (
                                  <div key={key}>
                                    <p className="flex">
                                      <span className={styles.innerHeading}>
                                        {formatCassing(key)}
                                      </span>
                                      <span className={styles.sheetValues}>
                                        {typeof value !== 'string'
                                          ? value.join(',')
                                          : formatCassing(value)}
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
                                    'app.previousSearch.inclusionDetails'
                                  )}
                                </p>
                              </div>
                              {Object.entries(
                                PreviousSearchData[index].meta_data
                                  .inclusion_details
                              ).map(([key, value]: any) => (
                                <p className="flex" key={key}>
                                  <span
                                    className={
                                      styles.inclutionDetailsInnerHeadingStyle
                                    }
                                  >
                                    {formatCassing(key)}
                                  </span>
                                  <span className={styles.sheetValues}>
                                    {typeof value !== 'string'
                                      ? value.join(',')
                                      : formatCassing(value)}
                                  </span>
                                </p>
                              ))}
                            </div>
                          </div>
                          {/* ))} */}

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
                      sheetContentStyle={styles.sheetContentStyle}
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

export default PreviousSearch;
