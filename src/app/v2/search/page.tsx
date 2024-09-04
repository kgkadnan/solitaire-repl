'use client';
import React, { useEffect, useState } from 'react';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import Form, { ISavedSearch } from './form/form';
import useValidationStateManagement from './hooks/validation-state-management';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import EmptyScreen from '@/components/v2/common/empty-screen';
import empty from '@public/v2/assets/icons/data-table/empty-cart.svg';
import Image from 'next/image';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { DialogComponent } from '@/components/v2/common/dialog';
import { handleReset } from './form/helpers/reset';
import useFormStateManagement from './form/hooks/form-state';
import useNumericFieldValidation from './form/hooks/numeric-field-validation-management';
import Result from './result/result';
import SavedSearch from './saved-search/saved-search';
import { useAddSavedSearchMutation } from '@/features/api/saved-searches';
import { useGetProductCountQuery } from '@/features/api/product';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import { InputField } from '@/components/v2/common/input-field';
import bookmarkIcon from '@public/v2/assets/icons/modal/bookmark.svg';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { handleSaveSearch } from './result/helpers/handle-save-search';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';

const Search = () => {
  const subRoute = useSearchParams().get('active-tab');
  const editRoute = useSearchParams().get('edit');

  const [activeTab, setActiveTab] = useState(0);
  const [isAddDemand, setIsAddDemand] = useState(false);
  const [searchParameters, setSearchParameters] = useState<ISavedSearch[] | []>(
    []
  );

  const { setSearchUrl, searchUrl, addSearches, setAddSearches } =
    useValidationStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent, isInputDialogOpen } = modalState;

  const { setIsDialogOpen, setDialogContent, setIsInputDialogOpen } =
    modalSetState;
  const { state, setState, carat } = useFormStateManagement();
  const { errorState, errorSetState } = useNumericFieldValidation();
  const { errorState: inputErrorState, errorSetState: inputErrorSetState } =
    useErrorStateManagement();

  const { inputError } = inputErrorState;
  const { setInputError } = inputErrorSetState;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [searchLoading, setSearchLoading] = useState(false);

  const [saveSearchName, setSaveSearchName] = useState('');
  const [addSavedSearch] = useAddSavedSearchMutation();

  const { data } = useGetProductCountQuery(
    {
      searchUrl
    },
    {
      skip: !searchUrl
    }
  );

  useEffect(() => {
    let selection = JSON.parse(localStorage.getItem('Search')!) || [];
    const filteredSelection = selection.filter(
      (obj: any) => Object.keys(obj).length !== 0
    );
    if (
      subRoute !== SubRoutes.NEW_SEARCH &&
      subRoute !== SubRoutes.SAVED_SEARCH
    ) {
      const replaceSubrouteWithSearchResult = subRoute?.replace(
        `${SubRoutes.RESULT}-`,
        ''
      );
      if (
        parseInt(replaceSubrouteWithSearchResult!) &&
        parseInt(replaceSubrouteWithSearchResult!) <= filteredSelection.length
      ) {
        setActiveTab(parseInt(replaceSubrouteWithSearchResult!));
      } else setActiveTab(-1);
    } else {
      setActiveTab(0);
    }
  }, [subRoute]);
  useEffect(() => {
    const fetchMyAPI = async () => {
      const yourSelection = localStorage.getItem('Search');

      if (yourSelection) {
        let parseYourSelection = JSON.parse(yourSelection);

        // Filter out empty objects
        const filteredSelection = parseYourSelection.filter(
          (obj: any) => Object.keys(obj).length !== 0
        );

        // Update local storage only if empty objects were found and removed
        if (filteredSelection.length !== parseYourSelection.length) {
          localStorage.setItem('Search', JSON.stringify(filteredSelection));
        }

        // Check if there are valid entries after filtering
        if (filteredSelection.length > 0) {
          // Always fetch data, even on initial load
          const url = constructUrlParams(
            filteredSelection[activeTab]?.queryParams
          );
          if (activeTab) {
            setSearchUrl(url);
          }

          setSearchParameters(filteredSelection);
        }
      }
    };

    fetchMyAPI();
  }, [localStorage.getItem('Search')!]);

  const handleCloseAllTabs = () => {
    localStorage.removeItem('Search'),
      setIsDialogOpen(false),
      router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`),
      setSearchParameters([]);
    setAddSearches([]);
    // setDialogContent(
    //   <CommonPoppup
    //     content={ManageLocales('app.search.closeTabs')}
    //     status="warning"
    //     customPoppupStyle="h-[200px]"
    //     customPoppupBodyStyle="!mt-[65px]"
    //     header={ManageLocales('app.search.confirmHeader')}
    //     actionButtonData={[
    //       {
    //         variant: 'secondary',
    //         label: ManageLocales('app.modal.no'),
    //         handler: () => setIsDialogOpen(false),
    //         customStyle: 'flex-1 h-10'
    //       },
    //       {
    //         variant: 'primary',
    //         label: ManageLocales('app.modal.yes'),
    //         handler: () => {
    //           localStorage.removeItem('Search'),
    //             setIsDialogOpen(false),
    //             router.push(
    //               `${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`
    //             ),
    //             setSearchParameters([]);
    //           setAddSearches([]);
    //         },
    //         customStyle: 'flex-1 h-10'
    //       }
    //     ]}
    //   />
    // );

    // setIsDialogOpen(true);
  };

  const closeSearch = (
    removeDataIndex: number,
    yourSelection: ISavedSearch[]
  ) => {
    let closeSpecificSearch = yourSelection.filter(
      (_items: ISavedSearch, index: number) => {
        return index !== removeDataIndex - 1;
      }
    );

    if (removeDataIndex === 1) {
      setSearchParameters([]);
      setAddSearches([]);
      handleReset(setState, errorSetState);
      router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`);
    } else {
      setSearchParameters(closeSpecificSearch);
      setAddSearches(closeSpecificSearch);
      setActiveTab(removeDataIndex);
      router.push(
        `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${removeDataIndex - 1}`
      );
    }

    localStorage.setItem('Search', JSON.stringify(closeSpecificSearch));
  };

  const handleCloseSpecificTab = (id: number) => {
    let yourSelection = JSON.parse(localStorage.getItem('Search')!);

    // if (!yourSelection[id - 1]?.isSavedSearch) {
    //   setIsDialogOpen(true);
    //   setDialogContent(
    //     <CommonPoppup
    //       content={`Do you want to save your "Search Result" for this session?`}
    //       status="warning"
    //       customPoppupStyle="h-[200px]"
    //       customPoppupBodyStyle="!mt-[65px]"
    //       header={ManageLocales('app.search.confirmHeader')}
    //       actionButtonData={[
    //         {
    //           variant: 'secondary',
    //           label: ManageLocales('app.modal.no'),
    //           handler: () => {
    //             setIsDialogOpen(false);
    //             closeSearch(id, yourSelection);
    //           },
    //           customStyle: 'flex-1 h-10'
    //         },
    //         {
    //           variant: 'primary',
    //           label: ManageLocales('app.modal.yes'),
    //           handler: () => {
    //             if (yourSelection[id - 1]?.saveSearchName.length) {
    //               //update logic comes here
    //               const updateSaveSearchData = {
    //                 id: yourSelection[id - 1]?.id,
    //                 meta_data: yourSelection[id - 1]?.queryParams,
    //                 diamond_count: data?.count
    //               };
    //               updateSavedSearch(updateSaveSearchData)
    //                 .unwrap()
    //                 .then(() => {
    //                   setIsDialogOpen(false);
    //                   closeSearch(id, yourSelection);
    //                 })
    //                 .catch((error: any) => {
    //                   logger.error(error);
    //                 });
    //             } else {
    //               setIsInputDialogOpen(true);
    //               setIsDialogOpen(false);
    //             }
    //           },
    //           customStyle: 'flex-1 h-10'
    //         }
    //       ]}
    //     />
    //   );
    // } else {
    closeSearch(id, yourSelection);
    // }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError('');
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setSaveSearchName(inputValue);
    } else {
      setSaveSearchName(inputValue.slice(0, 20));
      setInputError('Input cannot exceed 20 characters');
    }
  };
  const renderContentWithInput = () => {
    return (
      <>
        {' '}
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={bookmarkIcon} alt="bookmarkIcon" />
        </div>
        <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px] ">
          <div>
            <h1 className="text-headingS text-neutral900">
              {' '}
              {ManageLocales('app.advanceSearch.savedSearch.input.header')}
            </h1>
            <p className="text-neutral600 text-mRegular">
              {ManageLocales('app.advanceSearch.savedSearch.input.content')}
            </p>
          </div>
          <div>
            <InputField
              type="text"
              value={saveSearchName}
              name={'savedSearch'}
              placeholder={'Search Name'}
              onChange={handleInputChange}
              styles={{
                inputMain: 'w-full',
                input: `h-[40px] p-2 flex-grow block w-[100%] !text-primaryMain min-w-0 rounded-r-sm text-mRegular shadow-[var(--input-shadow)] border-[1px] border-neutral200 rounded-r-[4px]
                ${inputError ? 'border-dangerMain' : 'border-neutral200'}`
              }}
            />

            <div className=" text-dangerMain text-sRegular font-regular flex text-left h-[5px]">
              {inputError ?? ''}
            </div>
          </div>

          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: ManageLocales('app.modal.cancel'),
                handler: () => {
                  setSaveSearchName('');
                  setInputError('');
                  setIsInputDialogOpen(false);
                },
                customStyle: 'flex-1 h-10'
              },
              {
                variant: 'primary',
                label: ManageLocales('app.modal.save'),
                isDisable: !saveSearchName.length,
                handler: () => {
                  if (!saveSearchName.length) {
                    setInputError('Please enter name');
                  } else {
                    if (!inputError?.length) {
                      handleSaveSearch({
                        addSavedSearch,
                        saveSearchName,
                        activeTab,
                        data,
                        setIsInputDialogOpen,
                        setStoredSelection: setSearchParameters,
                        setSaveSearchName,
                        setInputError
                      });
                    }
                  }
                },
                customStyle: 'flex-1 h-10'
              }
            ]}
          />
        </div>
      </>
    );
  };
  return (
    <div>
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        dialogStyle={{ dialogContent: isAddDemand ? 'min-h-[280px]' : '' }}
      />
      {isLoading && <CustomKGKLoader />}

      <InputDialogComponent
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />
      {subRoute === SubRoutes.NEW_SEARCH ||
      editRoute === SubRoutes.SAVED_SEARCH ||
      editRoute === SubRoutes.RESULT ? (
        <Form
          searchUrl={searchUrl}
          setSearchUrl={setSearchUrl}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchParameters={searchParameters}
          handleCloseAllTabs={handleCloseAllTabs}
          handleCloseSpecificTab={handleCloseSpecificTab}
          state={state}
          setState={setState}
          carat={carat}
          errorState={errorState}
          errorSetState={errorSetState}
          setIsDialogOpen={setIsDialogOpen}
          setDialogContent={setDialogContent}
          addSearches={addSearches}
          setAddSearches={setAddSearches}
          setIsLoading={setSearchLoading}
          setIsCommonLoading={setIsLoading}
          setIsAddDemand={setIsAddDemand}
          isMatchingPair={false}
          isLoading={searchLoading}
        />
      ) : subRoute === SubRoutes.SAVED_SEARCH ? (
        <SavedSearch setIsLoading={setIsLoading} />
      ) : activeTab === -1 ? (
        <div className="h-screen">
          {' '}
          <EmptyScreen
            label="Page not found"
            contentReactNode={
              <p className="text-neutral900  w-[17%] text-center">
                Page you are looking for doesnot exists
              </p>
            }
            onClickHandler={() => {}}
            imageSrc={empty}
          />
        </div>
      ) : (
        <Result
          activeTab={activeTab}
          searchParameters={searchParameters}
          setSearchParameters={setSearchParameters}
          setActiveTab={setActiveTab}
          handleCloseAllTabs={handleCloseAllTabs}
          handleCloseSpecificTab={handleCloseSpecificTab}
          setIsLoading={setIsLoading}
          setIsInputDialogOpen={setIsInputDialogOpen}
        />
      )}
    </div>
  );
};

export default Search;
