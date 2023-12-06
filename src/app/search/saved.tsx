'use client';
import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import styles from './saved.module.scss';
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
  useDeleteSavedSearchMutation,
  useGetAllSavedSearchesQuery,
  useGetSavedSearchListQuery
} from '@/features/api/saved-searches';
import { formatCreatedAt } from '@/utils/format-date';
import { CustomCalender } from '@/components/common/calender';
import { DateRange } from 'react-day-picker';
import { useRouter } from 'next/navigation';
import { NoDataFound } from '@/components/common/no-data-found';
import { CustomDialog } from '@/components/common/dialog';
import { useGetProductCountQuery } from '@/features/api/product';
import {
  ICardData,
  IDateRange,
  IFormatedData,
  ISavedSearchData,
  Item
} from './saved-interface';
import { KeyLabelMapping } from '@/components/common/data-table/interface';
import { constructUrlParams } from '@/utils/construct-url-param';
import { useAppDispatch } from '@/hooks/hook';
import { modifySavedSearch } from '@/features/saved-search/saved-search';
import {
  MAX_SAVED_SEARCH_COUNT,
  MAX_SEARCH_TAB_LIMIT,
  PAGINATION_INTITAL_LIMMIT
} from '@/constants/business-logic';
import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';
import { Checkbox } from '@/components/ui/checkbox';
import { handleSelectAllCheckbox } from '@/components/common/checkbox/helper/handle-select-all-checkbox';

let optionLimits = [
  { id: 1, value: '50' },
  { id: 2, value: '100' }
];
const SavedSearch = () => {
  // Style classes and variables
  const tableStyles = useMemo(() => {
    return {
      tableHeaderStyle: styles.tableHeader,
      tableBodyStyle: styles.tableBody
    };
  }, []);
  const searchCardTitle = useMemo(() => {
    return {
      tableHeaderStyle: styles.SearchCardTitle,
      tableBodyStyle: styles.SearchDateTime
    };
  }, []);
  const cardStyles = {
    cardContainerStyle: styles.searchCardContainer
  };

  const manySavedsearchButtonStyle = {
    displayButtonStyle: styles.manySavedSearchButton,
    displayLabelStyle: styles.manySavedSearchLabel
  };
  //pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(PAGINATION_INTITAL_LIMMIT); // You can set the initial value here
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [offset, setOffset] = useState(0);

  const [date, setDate] = useState<DateRange | undefined>();
  const [dateSearchUrl, setDateSearchUrl] = useState('');
  const [searchUrl, setSearchUrl] = useState('');

  //Data
  const [savedSearchData, setSavedSearchData] = useState<ISavedSearchData[]>(
    []
  );
  const [cardData, setCardData] = useState<ICardData[]>([]);

  //checkbox states
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { isCheck, isCheckAll } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;

  //Search Bar States
  const [search, setSearch] = useState<string>('');
  const [searchByName, setSearchByName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode>('');

  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  let router = useRouter();
  const dispatch = useAppDispatch();

  const { data } = useGetAllSavedSearchesQuery({
    limit,
    offset,
    dateSearchUrl,
    searchByName
  });

  const { data: productData } = useGetProductCountQuery({
    searchUrl
  });

  const handleResultsPerPageChange = useCallback(
    (event: string) => {
      const newResultsPerPage = parseInt(event, 10);
      setLimit(newResultsPerPage);
      setOffset(0);
      0; // Reset current page when changing results per page
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

  const { data: searchList } = useGetSavedSearchListQuery(search);

  // Destructure the mutation function from the hook
  const [deleteSavedSearch] = useDeleteSavedSearchMutation();

  const keyLabelMapping: KeyLabelMapping = useMemo(() => {
    return {
      shape: 'Shape',
      carat: 'carat',
      color: 'color',
      clarity: 'clarity',
      cut: 'cut',
      polish: 'polish',
      symmetry: 'Symmetry',
      price_range: 'Price Range',
      discount: 'Discount'
    };
  }, []);

  const formatRangeData = (data: any, key: string) => {
    const range = data;
    if (range && range.lte && range.gte) {
      return `${range.gte}-${range.lte}`;
    }
    return '-';
  };

  const renderCardData = useCallback(
    (data: any) => {
      return data?.map((item: any) => {
        // Filter the data based on the keyLabelMapping
        const filteredData: IFormatedData = {};
        for (const key in keyLabelMapping) {
          if (item.meta_data && !Array.isArray(item.meta_data[key])) {
            filteredData[keyLabelMapping[key]] = formatRangeData(
              item.meta_data[key],
              key
            );
          } else if (
            item.meta_data &&
            Array.isArray(item.meta_data[key]) &&
            typeof item.meta_data[key][0] !== 'string'
          ) {
            filteredData[keyLabelMapping[key]] = formatRangeData(
              item.meta_data[key][0],
              key
            );
          } else {
            filteredData[keyLabelMapping[key]] =
              item.meta_data[key] && item.meta_data[key]?.length
                ? item.meta_data[key]
                : '-';
          }
        }

        const cardContent = (
          <CustomTable
            tableData={{
              tableHeads: Object.keys(filteredData),
              bodyData: [Object.values(filteredData)]
            }}
            tableStyleClasses={tableStyles}
          />
        );

        return {
          id: item.id,
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
                      </div>
                    )
                  }
                ]
              }}
              tableStyleClasses={searchCardTitle}
            />
          ),
          cardContent: cardContent
        };
      });
    },
    [searchCardTitle, tableStyles, keyLabelMapping]
  );

  // Delete Data
  const handleDelete = () => {
    const searchTabData = JSON.parse(localStorage.getItem('Search') ?? '[]');

    if (isCheck?.length) {
      const matchingData = searchTabData.filter((item1: any, index: number) =>
        isCheck.some(item2 => {
          if (item1.id === item2) {
            item1.position = index + 1;
            return item1;
          }
        })
      );

      if (matchingData.length > 0) {
        setIsError(true);
        const searchNames = matchingData.map(
          (items: any) => items.saveSearchName
        );
        const resultPositions = matchingData.map((items: any) => {
          return `Search Result ${items.position}`;
        });

        const errorMessage =
          matchingData.length > 1
            ? `Your saved searches ${searchNames.join(
                ', '
              )} are already opened in ${resultPositions.join(
                ', '
              )} respectively. Please close those tabs and then try deleting it.`
            : `Your saved search ${searchNames.join(
                ', '
              )} is already opened in ${resultPositions.join(
                ', '
              )}. Please close the tab and then try deleting it.`;

        setErrorText(errorMessage);
      } else {
        setDialogContent(
          <>
            <p className="text-center mt-3">
              Do you want to Delete the selected Stones?
            </p>
            <div className="flex justify-center">
              <CustomDisplayButton
                displayButtonLabel="No"
                displayButtonAllStyle={{
                  displayButtonStyle: `mr-[25px] ${styles.transparent}`
                }}
                handleClick={() => setIsDialogOpen(false)}
              />
              <CustomDisplayButton
                displayButtonLabel="Yes"
                displayButtonAllStyle={{
                  displayButtonStyle: styles.filled
                }}
                handleClick={deleteStoneHandler}
              />
            </div>
          </>
        );
        setIsDialogOpen(true);
      }
    } else {
      setIsError(true);
      setErrorText(`You haven't picked any stones.`);
    }

    if (data?.data?.previousSearch?.length === 1 && numberOfPages !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const deleteStoneHandler = async () => {
    await deleteSavedSearch(isCheck)
      .unwrap()
      .then(() => {
        setIsCheck([]);
        setIsCheckAll(false);
        setDialogContent(
          <>
            <div className="max-w-[380px] flex justify-center align-middle">
              <Image src={confirmImage} alt="vector image" />
            </div>
            <div className="max-w-[380px] flex justify-center align-middle text-solitaireTertiary">
              Item successfully deleted from “Saved Search”
            </div>
          </>
        );
        setIsDialogOpen(true);
      })
      .catch((error: Error) => {
        console.log('error', error);
      });
    setIsCheck([]);
    setIsCheckAll(false);
    setIsError(false);
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
    const delayedSave = debounce(inputValue => debouncedSave(inputValue), 1000);
    delayedSave(inputValue);

    if (inputValue.length < 1) {
      setSearchByName('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setIsCheck([]);
    setIsCheckAll(false);
    setSearch(suggestion);
    setSearchByName(suggestion);
    setSuggestions([]);
  };

  //Footer Button Data
  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: ManageLocales('app.savedSearch.delete'),
      style: styles.filled,
      fn: handleDelete
    }
  ];

  const handleDate = (date: IDateRange) => {
    if (!date) {
      setDateSearchUrl('');
      setDate(undefined);
    } else {
      setDate(date);
      setDateSearchUrl(
        `&start_date=${new Date(date?.from)
          .toISOString()
          .replace('T', ' ')
          .replace('Z', '%2B00')}&end_date=${new Date(date.to)
          .toISOString()
          .replace('T', ' ')
          .replace('Z', '%2B00')}`
      );
    }
  };

  //Header Data
  const savedSearchheaderData = {
    headerHeading: savedSearchData?.length ? (
      <div className="flex items-center gap-[10px] bottom-0">
        <Checkbox
          onClick={() =>
            handleSelectAllCheckbox({
              setIsCheckAll,
              isCheckAll,
              setIsCheck,
              data: cardData
            })
          }
          data-testid={'Select All Checkbox'}
          checked={isCheckAll}
        />
        <p className="text-solitaireTertiary text-[14px]">
          {ManageLocales('app.common.header.selectAll')}
        </p>
      </div>
    ) : (
      ''
    ),
    //Search Data
    handleSearch: handleSearch,
    searchValue: search,
    handleSuggestionClick: handleSuggestionClick,
    suggestions: suggestions,
    headerData: (
      <div className="flex mr-[30px] ">
        <CustomCalender date={date} handleDate={handleDate} />
      </div>
    ),
    overriddenStyles: {
      headerDataStyles: 'flex items-center'
    }
  };

  useEffect(() => {
    let specificSavedSearchData = data?.savedSearches;
    setNumberOfPages(Math.ceil(data?.count / data?.limit));
    setSavedSearchData(specificSavedSearchData);
    setCardData(renderCardData(specificSavedSearchData));
  }, [data, limit, offset, renderCardData]);

  // Function to handle edit action
  const handleEdit = (stone: string) => {
    let savedSearchEditData = savedSearchData.filter((items: any) => {
      return items.id === stone;
    });

    dispatch(modifySavedSearch({ savedSearch: savedSearchEditData[0] }));
    router.push(`/search?route=saved&edit=saved-search`);
  };

  const handleCardClick = (id: string) => {
    let cardClickData: any = savedSearchData.filter((items: any) => {
      return items.id === id;
    });

    let url = constructUrlParams(cardClickData[0].meta_data);

    setSearchUrl(url);

    if (productData?.count > MAX_SAVED_SEARCH_COUNT) {
      setIsError(true);
      setErrorText('Please modify your search, the stones exceeds the limit.');
    } else {
      let data: any = JSON.parse(localStorage.getItem('Search')!);

      if (data?.length) {
        if (data?.length >= MAX_SEARCH_TAB_LIMIT) {
          setIsError(true);
          setErrorText(
            'Max search limit reached. Please remove existing searches'
          );
        } else {
          let localStorageData = [
            ...data,
            {
              saveSearchName: cardClickData[0].name,
              isSavedSearch: true,
              queryParams: cardClickData[0].meta_data,
              id: cardClickData[0].id
            }
          ];

          localStorage.setItem('Search', JSON.stringify(localStorageData));
          router.push(`/search?route=${data.length + 3}`);
        }
      } else {
        let localStorageData = [
          {
            saveSearchName: cardClickData[0].name,
            isSavedSearch: true,
            queryParams: cardClickData[0].meta_data,
            id: cardClickData[0].id
          }
        ];

        localStorage.setItem('Search', JSON.stringify(localStorageData));
        router.push(`/search?route=${3}`);
      }
    }
  };

  return (
    <>
      <CustomDialog
        setIsOpen={setIsDialogOpen}
        isOpens={isDialogOpen}
        dialogContent={dialogContent}
      />
      <div className="container flex flex-col">
        {/* Custom Header */}
        <div className="sticky top-0 bg-solitairePrimary mt-3">
          <CustomHeader
            data={savedSearchheaderData}
            mainDivStyle={styles.mainHeaderStyle}
            visibleStyle={styles.visibleStyle}
          />
        </div>
        <div className="h-[70vh] overflow-auto">
          {/* Custom Card and Checkbox map */}
          {cardData?.length ? (
            <div className="flex-grow">
              {cardData?.map((items: ICardData) => {
                return (
                  <div key={items.id}>
                    <div className="flex mt-6 ">
                      <CustomCheckBox
                        data={items.id}
                        isChecked={isCheck}
                        setIsCheck={setIsCheck}
                        setIsCheckAll={setIsCheckAll}
                        isCheckAll={isCheckAll}
                        row={cardData}
                        setIsError={setIsError}
                      />

                      <div
                        data-testid={'card-id123'}
                        className={`${styles.mainCardContainer}`}
                        onClick={() => handleCardClick(items.id)}
                      >
                        <CustomSearchResultCard
                          cardData={items}
                          overriddenStyles={cardStyles}
                          defaultCardPosition={false}
                          handleCardAction={handleEdit}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <NoDataFound />
          )}
        </div>

        {/* Custom Footer */}
        <div className="sticky bottom-0 bg-solitairePrimary mt-3">
          {data?.count > 0 && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={numberOfPages}
              resultsPerPage={limit}
              optionLimits={optionLimits}
              handlePageClick={handlePageClick}
              handleResultsPerPageChange={handleResultsPerPageChange}
            />
          )}

          {/* Custom Footer */}
          {footerButtonData?.length && (
            <div className="sticky bottom-0 bg-solitairePrimary mt-3 flex border-t-2 border-solitaireSenary items-center justify-between">
              {isError && (
                <div className="w-[50%]">
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
