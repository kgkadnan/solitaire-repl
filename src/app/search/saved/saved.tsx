'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './saved.module.scss';
import { CustomTable } from '@/components/common/table';
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
import { useRouter } from 'next/navigation';
import { NoDataFound } from '@/components/common/no-data-found';
import { CustomDialog } from '@/components/common/dialog';
import { useGetProductCountQuery } from '@/features/api/product';
import {
  ICardData,
  IDateRange,
  IFormatedData,
  IItem,
  ISavedSearchData
} from './saved-interface';
import { useAppDispatch } from '@/hooks/hook';
import { modifySavedSearch } from '@/features/saved-search/saved-search';
import Image from 'next/image';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { Checkbox } from '@/components/ui/checkbox';
import { handleSelectAllCheckbox } from '@/components/common/checkbox/helper/handle-select-all-checkbox';
import { useCommonStateManagement } from './hooks/state-management';
import { formatRangeData } from './helpers/format-range-date';
import { handleDelete } from './helpers/handle-delete';
import { handleSearch } from './helpers/debounce';
import { convertDateToUTC } from '@/utils/convert-date-to-utc';
import { handleCardClick } from './helpers/handle-card-click';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';
import { useErrorStateManagement } from '@/hooks/error-state-management';
import logger from 'logging/log-util';
import { IKeyLabelMapping } from '@/interface/interface';
import {
  MAX_SAVED_SEARCH_COUNT,
  MAX_SEARCH_TAB_LIMIT
} from '@/constants/business-logic';
import {
  MAX_SEARCH_LIMIT_EXCEED,
  MODIFY_SEARCH_STONES_EXCEEDS_LIMIT
} from '@/constants/error-messages/saved';
import CustomLoader from '@/components/common/loader';

const SavedSearch = () => {
  // State management hooks
  const { commonState, commonSetState } = useCommonStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();

  //checkbox states
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { isCheck, isCheckAll } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;

  const { errorState, errorSetState } = useErrorStateManagement();
  const { isError, errorText } = errorState;
  const { setIsError, setErrorText } = errorSetState;

  const [cardId, setCardId] = useState('');

  const {
    setDialogContent,
    setIsDialogOpen,
    setPersistDialogContent,
    setIsPersistDialogOpen
  } = modalSetState;

  const {
    dialogContent,
    isDialogOpen,
    persistDialogContent,
    isPersistDialogOpen
  } = modalState;

  // Destructuring commonState and commonSetState
  const {
    currentPage,
    limit,
    numberOfPages,
    offset,
    date,
    dateSearchUrl,
    searchUrl,
    savedSearchData,
    cardData,
    search,
    searchByName,
    suggestions
  } = commonState;

  const {
    setCurrentPage,
    setLimit,
    setNumberOfPages,
    setOffset,
    setDate,
    setDateSearchUrl,
    setSearchUrl,
    setSavedSearchData,
    setCardData,
    setSearch,
    setSearchByName,
    setSuggestions
  } = commonSetState;

  const optionLimits = [
    { id: 1, value: '50' },
    { id: 2, value: '100' }
  ];

  const router = useRouter();
  const dispatch = useAppDispatch();

  // Fetching saved search data
  const { data } = useGetAllSavedSearchesQuery(
    {
      limit,
      offset,
      dateSearchUrl,
      searchByName
    },
    {
      skip: date && (!date.from || !date.to)
    }
  );

  const { data: productData, isLoading } = useGetProductCountQuery(
    {
      searchUrl
    },
    {
      skip: !searchUrl
    }
  );

  const { data: searchList } = useGetSavedSearchListQuery(search);

  // Mutation for deleting items from the saved search
  const [deleteSavedSearch] = useDeleteSavedSearchMutation();

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

  useEffect(() => {
    if (productData !== undefined) {
      // Filter the saved search data to get the clicked card's data
      const specificCardData: any = savedSearchData.filter(
        (items: ISavedSearchData) => {
          return items.id === cardId;
        }
      );
      // Check if the product data count exceeds the maximum limit
      if (productData?.count > MAX_SAVED_SEARCH_COUNT) {
        setIsError(true);
        setErrorText(MODIFY_SEARCH_STONES_EXCEEDS_LIMIT);
      } else {
        const data: any = JSON.parse(localStorage.getItem('Search')!);

        if (data?.length) {
          // Check if the maximum search tab limit is reached
          if (data?.length >= MAX_SEARCH_TAB_LIMIT) {
            setIsError(true);
            setErrorText(MAX_SEARCH_LIMIT_EXCEED);
          } else {
            // Add the clicked search to local storage and navigate to the search result page
            const localStorageData = [
              ...data,
              {
                saveSearchName: specificCardData[0].name,
                isSavedSearch: true,
                searchId: productData?.search_id,
                queryParams: specificCardData[0].meta_data,
                id: specificCardData[0].id
              }
            ];

            localStorage.setItem('Search', JSON.stringify(localStorageData));
            router.push(
              `/search?active-tab=${ManageLocales('app.search.resultRoute')}-${
                data.length + 1
              }`
            );
          }
        } else {
          // If no data in local storage, create a new entry and navigate to the search result page
          let localStorageData = [
            {
              saveSearchName: specificCardData[0].name,
              isSavedSearch: true,
              searchId: productData?.search_id,
              queryParams: specificCardData[0].meta_data,
              id: specificCardData[0].id
            }
          ];

          localStorage.setItem('Search', JSON.stringify(localStorageData));
          router.push(
            `/search?active-tab=${ManageLocales('app.search.resultRoute')}-${1}`
          );
        }
      }
    }
  }, [productData]);

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

  // Handler for clicking on pagination page number
  const handlePageClick = (page: number) => {
    if (page >= 0 && page <= numberOfPages) {
      const offset = page * limit;
      setIsCheck([]);
      setIsCheckAll(false);
      setOffset(offset);
      setCurrentPage(page);
    }
  };

  // Mapping data keys and table column labels
  const IKeyLabelMapping: IKeyLabelMapping = useMemo(() => {
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

  // Function to format and render card data
  const renderCardData = useCallback(
    (data: any) => {
      return data?.map((item: any) => {
        // Filter the data based on the IKeyLabelMapping
        const filteredData: IFormatedData = {};
        for (const key in IKeyLabelMapping) {
          if (item.meta_data && !Array.isArray(item.meta_data[key])) {
            filteredData[IKeyLabelMapping[key]] = formatRangeData(
              item.meta_data[key]
            );
          } else if (
            item.meta_data &&
            Array.isArray(item.meta_data[key]) &&
            typeof item.meta_data[key][0] !== 'string'
          ) {
            filteredData[IKeyLabelMapping[key]] = formatRangeData(
              item.meta_data[key][0]
            );
          } else {
            filteredData[IKeyLabelMapping[key]] =
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
                        <div
                          style={{ marginRight: '80px', paddingLeft: '20px' }}
                        >
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
    [searchCardTitle, tableStyles, IKeyLabelMapping]
  );

  // Handler for deleting saved searches
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
        logger.error(error);
      });
    setIsCheck([]);
    setIsCheckAll(false);
    setIsError(false);
  };

  // Debounced search function
  const debouncedSave = useCallback(
    (inputValue: string) => {
      // Filter data based on input value
      const filteredSuggestions = searchList.filter((item: IItem) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      // Extract card titles from filtered suggestions
      const suggestionTitles = filteredSuggestions.map(
        (item: IItem) => item.name
      );

      setSuggestions(suggestionTitles);
      // Update state with an array of strings
    },
    [searchList]
  );

  // Handler for suggestion click
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
      fn: () =>
        handleDelete({
          isCheck,
          setIsError,
          setErrorText,
          setPersistDialogContent,
          setIsPersistDialogOpen,
          deleteStoneHandler,
          numberOfPages,
          data,
          setCurrentPage,
          currentPage
        })
    }
  ];

  // Handler for date filter change
  const handleDate = (date: IDateRange) => {
    if (!date) {
      setDateSearchUrl('');
      setDate(undefined);
    } else {
      setDate(date);
      setDateSearchUrl(
        `&start_date=${convertDateToUTC(date.from)}&end_date=${convertDateToUTC(
          date.to,
          true
        )}`
      );
    }
  };

  // Handler for clearing search input
  const handleClearInput = () => {
    setSearch('');
    setIsCheck([]);
    setSearchByName('');
    setIsCheckAll(false);
  };

  //Header Data
  const savedSearchheaderData = {
    headerHeading: (
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
    ),
    //Search Data
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleSearch({
        e,
        setSearch,
        debouncedSave,
        setSearchByName,
        setIsCheck,
        setIsCheckAll
      }),
    searchValue: search,
    handleSuggestionClick: handleSuggestionClick,
    suggestions: suggestions,
    handleClearInput: handleClearInput,
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
    router.push(
      `/search?active-tab=${ManageLocales(
        'app.search.savedSearchesRoute'
      )}&edit=${ManageLocales('app.search.savedSearchesRoute')}`
    );
  };

  // useEffect(() => {
  //   if (isDialogOpen) {
  //     // Set a timeout to close the dialog box after a delay (e.g., 5000 milliseconds)
  //     const timeoutId = setTimeout(() => {
  //       setIsDialogOpen(false);
  //     }, 3500);

  //     // Cleanup the timeout when the component unmounts or when isDialogOpen changes
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isDialogOpen, setIsDialogOpen]);

  return (
    <>
      <CustomDialog
        setIsOpen={setIsDialogOpen}
        isOpens={isDialogOpen}
        dialogContent={dialogContent}
      />
      <CustomDialog
        isOpens={isPersistDialogOpen}
        setIsOpen={setIsPersistDialogOpen}
        dialogContent={persistDialogContent}
      />
      {isLoading ? (
        <CustomLoader />
      ) : (
        <div className="container flex flex-col">
          {/* Custom Header */}
          <div className="sticky top-0 bg-solitairePrimary mt-3 mb-[1px]">
            <CustomHeader
              data={savedSearchheaderData}
              mainDivStyle={styles.mainHeaderStyle}
              visibleStyle={styles.visibleStyle}
            />
          </div>
          <div className={`h-[70vh] ${styles.scrollBar} mb-[10px]`}>
            {/* Custom Card and Checkbox map */}
            {cardData?.length ? (
              <div className="flex-grow mt-[50px]">
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
                          onClick={() =>
                            handleCardClick(
                              items.id,
                              setCardId,
                              savedSearchData,
                              setSearchUrl
                            )
                          }
                        >
                          <CustomSearchResultCard
                            cardData={items}
                            overriddenStyles={{
                              cardContainerStyle: styles.searchCardContainer
                            }}
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
            {footerButtonData?.length && (
              <div className="sticky bottom-0 bg-solitairePrimary mt-3 flex border-t-2 border-solitaireSenary items-center justify-between">
                {isError && (
                  <div className="w-[50%]">
                    <p className="text-solitaireError text-base ">
                      {errorText}
                    </p>
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
      )}
    </>
  );
};

export default SavedSearch;
