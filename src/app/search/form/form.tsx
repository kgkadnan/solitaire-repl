'use client';
import React, { useEffect, useState } from 'react';
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
import useFieldStateManagement from './hooks/field-state-management';
import { generateQueryParams } from './helpers/generate-query-parameter';
import { handleReset } from './helpers/reset';
import {
  MAX_SEARCH_FORM_COUNT,
  MAX_SEARCH_TAB_LIMIT,
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
import useNumericFieldValidation from './hooks/numeric-field-validation-management';
import {
  EXCEEDS_LIIMITS,
  MAX_LIMIT_REACHED,
  SELECT_SOME_PARAM,
  SOMETHING_WENT_WRONG,
  TITLE_ALREADY_EXISTS
} from '@/constants/error-messages/form';
import {
  NO_STONE_FOUND,
  SELECT_STONE_TO_PERFORM_ACTION
} from '@/constants/error-messages/form';
import { CustomInputDialog } from '@/components/common/input-dialogNew';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { FloatingLabelInput } from '@/components/common/floating-input';

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
  const { errorState, errorSetState } = useNumericFieldValidation();

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
    handleReset(setState, errorSetState);
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
          setErrorText(EXCEEDS_LIIMITS);
        } else if (data?.count === MIN_SEARCH_FORM_COUNT) {
          setIsError(true);
          setErrorText(NO_STONE_FOUND);
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
      setIsError(true);
      setErrorText(SOMETHING_WENT_WRONG);
    }
    setSearchCount(searchCount + 1);
  }, [data, error, searchUrl]);

  // Function: Save and search
  const handleSaveAndSearch: any = async () => {
    if (
      JSON.parse(localStorage.getItem('Search')!)?.length >=
        MAX_SEARCH_TAB_LIMIT &&
      modifySearchFrom !== `${RESULT}` &&
      modifySearchFrom !== `${SAVED_SEARCHES}`
    ) {
      setIsError(true);
      setErrorText(MAX_LIMIT_REACHED);
    } else {
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
                setInputErrorContent(TITLE_ALREADY_EXISTS);
              });
          }
        }
      } else {
        setIsError(true);
        setErrorText(SELECT_SOME_PARAM);
      }
    }
  };

  // Function: Handle search
  const handleSearch = async (isSaved: boolean = false, id?: string) => {
    if (
      JSON.parse(localStorage.getItem('Search')!)?.length >=
        MAX_SEARCH_TAB_LIMIT &&
      modifySearchFrom !== `${RESULT}`
    ) {
      setIsError(true);
      setErrorText(MAX_LIMIT_REACHED);
    } else {
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
            let modifySearchResult = JSON.parse(
              localStorage.getItem('Search')!
            );
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
        setErrorText(SELECT_SOME_PARAM);
      }
    }
  };

  const handleInputChange = (e: any) => {
    setInputErrorContent('');
    setSaveSearchName(e.target.value);
  };

  const renderContentWithInput = () => {
    return (
      <div className="w-full flex flex-col gap-6">
        <div className=" flex justify-center align-middle items-center">
          <p>Save And Search</p>
        </div>
        <div className="flex text-center gap-6 w-[350px]">
          <FloatingLabelInput
            label={'Enter name'}
            onChange={handleInputChange}
            type="text"
            name="save"
            value={saveSearchName}
            errorText={inputErrorContent}
          />
        </div>

        <div className="flex  gap-2">
          {/* Button to trigger the register action */}

          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.advanceSearch.cancel')}
            displayButtonAllStyle={{
              displayButtonStyle:
                ' bg-transparent   border-[1px] border-solitaireQuaternary  w-[80%] h-[40px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
            handleClick={() => {
              setSaveSearchName('');
              setInputErrorContent('');
              setIsInputDialogOpen(false);
            }}
          />
          <CustomDisplayButton
            displayButtonLabel={ManageLocales('app.advanceSearch.save')}
            displayButtonAllStyle={{
              displayButtonStyle: 'bg-solitaireQuaternary w-[80%] h-[40px]',
              displayLabelStyle:
                'text-solitaireTertiary text-[16px] font-medium'
            }}
            handleClick={() => {
              if (!saveSearchName.length) {
                setInputErrorContent('Please enter name');
              } else {
                handleSaveAndSearch();
              }
            }}
          />
        </div>
      </div>
    );
  };

  const handleAddDemand = () => {};

  return (
    <div>
      <CustomInputDialog
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />

      {renderContent(
        state,
        setState,
        validationError,
        setValidationError,
        errors,
        setErrors,
        errorState,
        errorSetState
      )}
      <div className="sticky bottom-0 bg-solitairePrimary mt-3 flex border-t-2 border-solitaireSenary">
        {isError && (
          <div className="w-[50%] flex items-center">
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
              fn: () => handleReset(setState, errorSetState)
            },
            {
              id: 3,
              displayButtonLabel: `${ManageLocales(
                'app.advanceSearch.saveSearch'
              )}`,
              style:
                modifySearchFrom === `${SAVED_SEARCHES}`
                  ? styles.filled
                  : styles.transparent,
              fn: () => {
                if (
                  JSON.parse(localStorage.getItem('Search')!)?.length >=
                    MAX_SEARCH_TAB_LIMIT &&
                  modifySearchFrom !== `${RESULT}` &&
                  modifySearchFrom !== `${SAVED_SEARCHES}`
                ) {
                  setIsError(true);
                  setErrorText(MAX_LIMIT_REACHED);
                } else {
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
                    }
                  } else {
                    setIsError(true);
                    setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
                  }
                }
              }
            },
            ...(data?.count !== MIN_SEARCH_FORM_COUNT
              ? [
                  {
                    id: 4,
                    displayButtonLabel: ManageLocales(
                      'app.advanceSearch.search'
                    ),
                    style: styles.filled,
                    fn: handleSearch,
                    isHidden: modifySearchFrom === `${SAVED_SEARCHES}`
                  }
                ]
              : [
                  {
                    id: 4,
                    displayButtonLabel: ManageLocales(
                      'app.advanceSearch.addDemand'
                    ),
                    style: styles.filled,
                    fn: handleAddDemand
                  }
                ])
          ]}
          noBorderTop={styles.paginationContainerStyle}
        />
      </div>
    </div>
  );
};
export default AdvanceSearch;
