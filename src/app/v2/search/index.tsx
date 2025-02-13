'use client';
import React, { useEffect, useState } from 'react';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import Form, { ISavedSearch } from './form/form';
import useValidationStateManagement from './hooks/validation-state-management';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import EmptyScreen from '@/components/v2/common/empty-screen';
import empty from '@public/v2/assets/icons/data-table/empty-cart.svg';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { DialogComponent } from '@/components/v2/common/dialog';
import { handleReset } from './form/helpers/reset';
import useFormStateManagement from './form/hooks/form-state';
import useNumericFieldValidation from './form/hooks/numeric-field-validation-management';
import Result from './result/result';
import { useGetProductCountQuery } from '@/features/api/product';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';

import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';

const Search = () => {
  const subRoute = useSearchParams().get('active-tab');
  const editRoute = useSearchParams().get('edit');

  const [activeTab, setActiveTab] = useState(0);
  const [isAddDemand, setIsAddDemand] = useState(false);
  const [searchParameters, setSearchParameters] = useState<ISavedSearch[] | []>(
    []
  );
  const [isFetchProduct, setIsFetchProduct] = useState(false);

  const { setSearchUrl, searchUrl, addSearches, setAddSearches } =
    useValidationStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;

  const { setIsDialogOpen, setDialogContent, setIsInputDialogOpen } =
    modalSetState;
  const { state, setState, carat } = useFormStateManagement();
  const { errorState, errorSetState } = useNumericFieldValidation();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [searchLoading, setSearchLoading] = useState(false);

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
        parseInt(replaceSubrouteWithSearchResult!)
        //  && parseInt(replaceSubrouteWithSearchResult!) <= filteredSelection.length
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
  };

  const closeSearch = (
    removeDataIndex: number,
    yourSelection: ISavedSearch[]
  ) => {
    let closeSpecificSearch = yourSelection.filter(
      (_items: ISavedSearch, index: number) => index != removeDataIndex
    );

    // Reformat the searchId for remaining results to be sequential
    closeSpecificSearch = closeSpecificSearch.map((search, index) => ({
      ...search,
      label: `Result ${index + 1}` // Update searchId to be sequential
    }));

    if (closeSpecificSearch.length === 0) {
      setSearchParameters([]);
      setAddSearches([]);
      handleReset(setState, errorSetState);
      router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`);
    } else {
      setSearchParameters(closeSpecificSearch);
      setAddSearches(closeSpecificSearch);
      console.log('activeTab', activeTab);
      if (activeTab == removeDataIndex + 1) {
        setActiveTab(1);
        setIsFetchProduct(!isFetchProduct);
        router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-1`);
      } else if (activeTab > removeDataIndex + 1) {
        const newTab = activeTab - 1;
        setActiveTab(newTab);
        router.push(
          `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${newTab}`
        );
      }
    }
    localStorage.removeItem('Search');
    localStorage.setItem('Search', JSON.stringify(closeSpecificSearch));
  };

  const handleCloseSpecificTab = (id: number) => {
    let yourSelection = JSON.parse(localStorage.getItem('Search')!);
    closeSearch(id, yourSelection);
  };

  return (
    <div>
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        dialogStyle={{ dialogContent: isAddDemand ? 'min-h-[280px]' : '' }}
      />
      {isLoading && <CustomKGKLoader />}

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
          isLoading={searchLoading}
        />
      ) : activeTab === -1 ? (
        <div className="h-screen">
          {' '}
          <EmptyScreen
            label="Page not found"
            contentReactNode={
              <p className="text-neutral900  w-[17%] text-center">
                Page you are looking for does not exists
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
          isFetchProduct={isFetchProduct}
        />
      )}
    </div>
  );
};

export default Search;
