'use client';
import React, { useEffect } from 'react';
import styles from './form.module.scss';
import { CustomFooter } from '@/components/common/footer';
import { useRouter, useSearchParams } from 'next/navigation';
import { ManageLocales } from '@/utils/translate';
import {
  useAddSavedSearchMutation,
  useUpdateSavedSearchMutation
} from '@/features/api/saved-searches';
import { constructUrlParams } from '@/utils/construct-url-param';
import { useGetProductCountQuery } from '@/features/api/product';
import { useAppSelector } from '@/hooks/hook';
import { CustomInputDialog } from '@/components/common/input-dialog';
import useFieldStateManagement from './hooks/field-state-management';
import { generateQueryParams } from './helpers/generate-query-parameter';
import { handleReset } from './helpers/reset';
import {
  MAX_SEARCH_FORM_COUNT,
  MIN_SEARCH_FORM_COUNT
} from '@/constants/business-logic';
import { setModifySearch } from './helpers/modify-search';
import useValidationStateManagement from './hooks/validation-state-management';
import renderContent from './components/render-form-field';
import {
  NEW_SEARCH,
  SAVED_SEARCHES,
  RESULT
} from '@/constants/application-constants/search-page';
import { ISavedSearch } from '@/components/common/top-navigation-bar';

const AdvanceSearch = () => {
  const router = useRouter();

  // Selectors for data from Redux store
  const savedSearch: any = useAppSelector(
    (store: { savedSearch: any }) => store.savedSearch
  );
  const searchResult: any = useAppSelector(
    (store: { searchResult: any }) => store.searchResult
  );

  /* The above code is a TypeScript React code snippet. It is using the `useFieldStateManagement` hook to
destructure and assign the `state`, `setState`, and `carat` variables. These variables are likely
used for managing the state of a form field or input element in a React component. */
  const { state, setState, carat } = useFieldStateManagement();

  // Hooks for managing validation and other UI states
  const {
    isInputDialogOpen,
    setIsInputDialogOpen,
    setSelectedStep,
    setSelectedShadeContain,
    searchCount,
    setSearchCount,
    searchUrl,
    setSearchUrl,
    isError,
    setIsError,
    errorText,
    setErrorText,
    addSearches,
    setAddSearches,
    isValidationError,
    inputError,
    setInputError,
    inputErrorContent,
    setInputErrorContent,
    saveSearchName,
    setSaveSearchName,
    validationError,
    setValidationError,
    errors,
    selectedStep,
    selectedShadeContain,
    setErrors
  } = useValidationStateManagement();

  const searchParams = useSearchParams();

  // Mutations for API interactions
  const [updateSavedSearch] = useUpdateSavedSearchMutation();
  let [addSavedSearch] = useAddSavedSearchMutation();

  const { data, error } = useGetProductCountQuery(
    {
      searchUrl
    },
    {
      skip: !searchUrl
    }
  );

  // Check if the search form is in 'edit' mode
  const modifySearchFrom = searchParams.get('edit');
  const isNewSearch = searchParams.get('active-tab');

  // Load saved search data when component mounts
  useEffect(() => {
    let modifySearchResult = JSON.parse(localStorage.getItem('Search')!);
    let modifysavedSearchData = savedSearch?.savedSearch?.meta_data;
    if (modifySearchFrom === `${SAVED_SEARCHES}` && modifysavedSearchData) {
      setModifySearch(modifysavedSearchData, setState, carat);
    } else if (modifySearchFrom === `${RESULT}` && modifySearchResult) {
      setModifySearch(
        modifySearchResult[searchResult.activeTab]?.queryParams,
        setState,
        carat
      );
    }
  }, [modifySearchFrom]);

  //Load saved searches from local storage when component mounts
  useEffect(() => {
    let data: ISavedSearch[] | [] =
      JSON.parse(localStorage.getItem('Search')!) || [];
    if (data?.length > 0 && data[data?.length - 1]) {
      setAddSearches(data);
    }
  }, []);

  // Reset form when a new search is initiated
  useEffect(() => {
    if (isNewSearch === `${NEW_SEARCH}`) {
      handleFormReset();
    }
  }, [isNewSearch]);

  const handleFormReset = () => {
    setSelectedStep('');
    setSelectedShadeContain('');
    setSearchCount(0);
    setIsError(false);
    setErrorText('');
    handleReset(setState);
  };

  // Update search URL when form state changes
  useEffect(() => {
    const queryParams = generateQueryParams(state);
    // Construct your search URL here
    if (!isValidationError) {
      setSearchUrl(constructUrlParams(queryParams));
    }
  }, [state]);

  //Handle search count and errors
  useEffect(() => {
    if (searchCount !== -1) {
      if (searchUrl) {
        if (
          data?.count > MAX_SEARCH_FORM_COUNT &&
          data?.count > MIN_SEARCH_FORM_COUNT
        ) {
          setIsError(true);
          setErrorText(
            'Please modify your search, the stones exceeds the limit.'
          );
        } else if (data?.count === MIN_SEARCH_FORM_COUNT) {
          setIsError(true);
          setErrorText(`No stones found, Please modify your search.`);
        } else if (data?.count !== MIN_SEARCH_FORM_COUNT) {
          setIsError(true);
          data?.count && setErrorText(`${data?.count} stones found`);
        } else {
          setIsError(false);
          setErrorText('');
        }
      } else {
        setIsError(false);
        setErrorText('');
      }
    }
    if (error) {
      let error1: any = error;
      setIsError(true);
      setErrorText(error1?.error);
    }
    setSearchCount(searchCount + 1);
  }, [data, error, searchUrl]);

  // Function: Save and search
  const handleSaveAndSearch: any = async () => {
    if (searchUrl && data?.count > MIN_SEARCH_FORM_COUNT) {
      if (
        data?.count < MAX_SEARCH_FORM_COUNT &&
        data?.count > MIN_SEARCH_FORM_COUNT
      ) {
        const queryParams = generateQueryParams(state);
        const activeTab: number = searchResult?.activeTab;

        const activeSearch: number =
          addSearches[activeTab]?.saveSearchName.length;

        if (modifySearchFrom === `${SAVED_SEARCHES}`) {
          if (savedSearch?.savedSearch?.meta_data) {
            let updatedMeta = savedSearch.savedSearch.meta_data;
            updatedMeta = queryParams;
            let updateSavedData = {
              id: savedSearch.savedSearch.id,
              meta_data: updatedMeta,
              diamond_count: parseInt(data?.count)
            };
            updateSavedSearch(updateSavedData);
            router.push(`/search?active-tab=${SAVED_SEARCHES}`);
          }
        } else if (activeSearch) {
          const updatedMeta = addSearches;
          updatedMeta[activeTab].queryParams = queryParams;
          let updateSaveSearchData = {
            id: updatedMeta[activeTab].id,
            meta_data: updatedMeta[activeTab].queryParams,
            diamond_count: parseInt(data?.count)
          };
          updateSavedSearch(updateSaveSearchData)
            .unwrap()
            .then(() => {
              handleSearch(true);
            })
            .catch((error: any) => {
              console.log('error', error);
            });
        } else {
          await addSavedSearch({
            name: saveSearchName,
            diamond_count: parseInt(data?.count),
            meta_data: queryParams,
            is_deleted: false
          })
            .unwrap()
            .then((res: any) => {
              handleSearch(true, res.id);
            })
            .catch((error: any) => {
              console.log('error', error);
              setInputError(true);
              setInputErrorContent(
                'Title already exists. Choose another title to save your search'
              );
            });
        }
      }
    } else {
      setIsError(true);
      setErrorText('Please select some parameter before initiating search');
    }
  };

  // Function: Handle search
  const handleSearch = async (isSaved: boolean = false, id?: string) => {
    if (searchUrl && data?.count > MIN_SEARCH_FORM_COUNT) {
      if (
        data?.count < MAX_SEARCH_FORM_COUNT &&
        data?.count > MIN_SEARCH_FORM_COUNT
      ) {
        const queryParams = generateQueryParams(state);
        if (modifySearchFrom === `${SAVED_SEARCHES}`) {
          if (savedSearch?.savedSearch?.meta_data[savedSearch.activeTab]) {
            const updatedMeta = [...savedSearch.savedSearch.meta_data];
            updatedMeta[savedSearch.activeTab] = queryParams;
            let data = {
              id: savedSearch.savedSearch.id,
              meta_data: updatedMeta
            };
            updateSavedSearch(data);
          }
        }
        if (modifySearchFrom === `${RESULT}`) {
          let modifySearchResult = JSON.parse(localStorage.getItem('Search')!);
          let setDataOnLocalStorage = {
            id: modifySearchResult[searchResult.activeTab]?.id,
            saveSearchName:
              modifySearchResult[searchResult.activeTab]?.saveSearchName ||
              saveSearchName,
            isSavedSearch: isSaved,
            queryParams
          };
          if (modifySearchResult[searchResult.activeTab]) {
            const updatedData = [...modifySearchResult];
            updatedData[searchResult.activeTab] = setDataOnLocalStorage;
            localStorage.setItem('Search', JSON.stringify(updatedData));
          }
          router.push(
            `/search?active-tab=${RESULT}-${searchResult.activeTab + 1}`
          );
        } else {
          let setDataOnLocalStorage = {
            id: id,
            saveSearchName: saveSearchName,
            isSavedSearch: isSaved,
            queryParams
          };
          localStorage.setItem(
            'Search',
            JSON.stringify([...addSearches, setDataOnLocalStorage])
          );
          router.push(
            `/search?active-tab=${RESULT}-${
              JSON.parse(localStorage.getItem('Search')!).length
            }`
          );
        }
        // return;
      }
    } else {
      setIsError(true);
      setErrorText('Please select some parameter before initiating search');
    }
  };

  // Data for custom input dialog
  const customInputDialogData = {
    isOpens: isInputDialogOpen,
    setIsOpen: setIsInputDialogOpen,
    setInputvalue: setSaveSearchName,
    inputValue: saveSearchName,
    displayButtonFunction: handleSaveAndSearch,
    label: 'Save And Search',
    name: 'Save',
    displayButtonLabel2: 'Save'
  };

  // Function: Close input dialog
  const handleCloseInputDialog = () => {
    setIsInputDialogOpen(false);
    setInputError(false);
    setInputErrorContent('');
    setSaveSearchName('');
  };

  return (
    <div>
      <CustomInputDialog
        customInputDialogData={customInputDialogData}
        isError={inputError}
        errorContent={inputErrorContent}
        setIsError={setInputError}
        setErrorContent={setInputErrorContent}
        handleClose={handleCloseInputDialog}
      />

      {renderContent(
        state,
        setState,
        validationError,
        setValidationError,
        errors,
        selectedStep,
        setSelectedStep,
        setErrors
      )}
      <div className="sticky bottom-0 bg-solitairePrimary mt-3 flex border-t-2 border-solitaireSenary">
        {isError && (
          <div className="w-[40%] flex items-center">
            <span className="hidden  text-green-500" />
            <p
              className={`text-${
                searchUrl &&
                data?.count < MAX_SEARCH_FORM_COUNT &&
                data?.count > MIN_SEARCH_FORM_COUNT
                  ? 'green'
                  : 'red'
              }-500 text-base`}
            >
              {!isValidationError && errorText}
            </p>
          </div>
        )}
        <CustomFooter
          footerButtonData={[
            {
              id: 1,
              displayButtonLabel: ManageLocales('app.advanceSearch.cancel'),
              style: styles.transparent,
              fn: () => {
                if (modifySearchFrom === `${SAVED_SEARCHES}`) {
                  router.push(`/search?active-tab=${SAVED_SEARCHES}`);
                } else if (modifySearchFrom === `${RESULT}`) {
                  router.push(
                    `/search?active-tab=${RESULT}-${searchResult.activeTab + 3}`
                  );
                }
              },
              isHidden:
                modifySearchFrom !== `${SAVED_SEARCHES}` &&
                modifySearchFrom !== `${RESULT}`
            },
            {
              id: 2,
              displayButtonLabel: ManageLocales('app.advanceSearch.reset'),
              style: styles.transparent,
              fn: () => handleReset(setState)
            },
            {
              id: 3,
              displayButtonLabel: `${ManageLocales(
                'app.advanceSearch.saveSearch'
              )}`,
              style: styles.transparent,
              fn: () => {
                if (
                  data?.count < MAX_SEARCH_FORM_COUNT &&
                  data?.count > MIN_SEARCH_FORM_COUNT
                ) {
                  const activeTab = searchResult?.activeTab;
                  if (activeTab !== undefined) {
                    const isSearchName: number =
                      addSearches[activeTab]?.saveSearchName.length;
                    const isSaved: boolean =
                      addSearches[activeTab]?.isSavedSearch;
                    // Check if the active search is not null and isSavedSearch is true
                    if (modifySearchFrom === `${SAVED_SEARCHES}`) {
                      handleSaveAndSearch();
                    } else if (isSaved) {
                      handleSaveAndSearch();
                    } else if (!isSaved && isSearchName) {
                      handleSaveAndSearch();
                    } else {
                      searchUrl && setIsInputDialogOpen(true);
                    }
                  } else {
                    setIsError(true);
                    setErrorText('Please make a selection to perform action.');
                  }
                }
              }
            },
            {
              id: 4,
              displayButtonLabel: ManageLocales('app.advanceSearch.search'),
              style: styles.filled,
              fn: handleSearch,
              isHidden: modifySearchFrom === `${SAVED_SEARCHES}`
            }
          ]}
          noBorderTop={styles.paginationContainerStyle}
        />
      </div>
    </div>
  );
};
export default AdvanceSearch;
