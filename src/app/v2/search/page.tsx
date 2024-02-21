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
import warningIcon from '@public/v2/assets/icons/modal/warning.svg';
import { ManageLocales } from '@/utils/v2/translate';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { DialogComponent } from '@/components/v2/common/dialog';
import { handleReset } from './form/helpers/reset';
import useFormStateManagement from './form/hooks/form-state';
import useNumericFieldValidation from './form/hooks/numeric-field-validation-management';
import Result from './result/result';
import SavedSearch from './saved-search/saved-search';

const Search = () => {
  const subRoute = useSearchParams().get('active-tab');
  const editRoute = useSearchParams().get('edit');

  const [activeTab, setActiveTab] = useState(0);
  const [searchParameters, setSearchParameters] = useState<ISavedSearch[] | []>(
    []
  );

  const { setSearchUrl, searchUrl, addSearches, setAddSearches } =
    useValidationStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;

  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const { state, setState, carat } = useFormStateManagement();
  const { errorState, errorSetState } = useNumericFieldValidation();

  const router = useRouter();

  useEffect(() => {
    let selection = JSON.parse(localStorage.getItem('Search')!) || [];
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
        parseInt(replaceSubrouteWithSearchResult!) <= selection.length
      ) {
        setActiveTab(parseInt(replaceSubrouteWithSearchResult!));
      } else setActiveTab(-1);
    } else {
      setActiveTab(0);
    }
  }, [subRoute]);
console.log(state,"looooooooooooooooooooooo")
  useEffect(() => {
    const fetchMyAPI = async () => {
      const yourSelection = localStorage.getItem('Search');

      if (yourSelection) {
        const parseYourSelection = JSON.parse(yourSelection);

        //   // Always fetch data, even on initial load
        const url = constructUrlParams(
          parseYourSelection[activeTab]?.queryParams
        );
        setSearchUrl(url);
        setSearchParameters(parseYourSelection);
      }
    };

    fetchMyAPI();
  }, [localStorage.getItem('Search')!]);

  const handleCloseAllTabs = () => {
    setDialogContent(
      <>
        {' '}
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={warningIcon} alt="warningIcon" />
        </div>
        <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[350px]">
          <div>
            <h1 className="text-headingS text-neutral900">
              {' '}
              {ManageLocales('app.search.confirmHeader')}
            </h1>
            <p className="text-neutral600 text-mRegular">
              {ManageLocales('app.search.closeTabs')}
            </p>
          </div>
          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: ManageLocales('app.modal.no'),
                handler: () => setIsDialogOpen(false),
                customStyle: 'flex-1'
              },
              {
                variant: 'primary',
                label: ManageLocales('app.modal.yes'),
                handler: () => {
                  localStorage.removeItem('Search'),
                    setIsDialogOpen(false),
                    router.push(
                      `${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`
                    ),
                    setSearchParameters([]);
                  setAddSearches([]);
                },
                customStyle: 'flex-1'
              }
            ]}
          />
        </div>
      </>
    );
    setIsDialogOpen(true);
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
      handleReset(setState, errorSetState);
      router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`);
    } else {
      setActiveTab(removeDataIndex);
      router.push(
        `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${removeDataIndex - 1}`
      );
    }

    localStorage.setItem('Search', JSON.stringify(closeSpecificSearch));
    // setSearchParameters(closeSpecificSearch);
  };

  const handleCloseSpecificTab = (id: number) => {
    let yourSelection = JSON.parse(localStorage.getItem('Search')!);

    if (!yourSelection[id - 1]?.isSavedSearch) {
      setDialogContent(
        <>
          {' '}
          <div className="absolute left-[-84px] top-[-84px]">
            <Image src={warningIcon} alt="warningIcon" />
          </div>
          <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[350px]">
            <div>
              <h1 className="text-headingS text-neutral900">
                {' '}
                {ManageLocales('app.search.confirmHeader')}
              </h1>
              <p className="text-neutral600 text-mRegular">
                {ManageLocales('app.search.closeSpecificTabs')}
              </p>
            </div>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.modal.no'),
                  handler: () => {
                    setIsDialogOpen(false);
                    // closeSearch(id, yourSelection);
                  },
                  customStyle: 'flex-1'
                },
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.yes'),
                  handler: () => {
                    setIsDialogOpen(false);
                    closeSearch(id, yourSelection);
                  },
                  customStyle: 'flex-1'
                }
              ]}
            />
          </div>
        </>
      );
      setIsDialogOpen(true);
    } else {
      closeSearch(id, yourSelection);
    }
  };
  return (
    <div>
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
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
        />
      ) : subRoute === SubRoutes.SAVED_SEARCH ? (
        <SavedSearch />
      ) : activeTab === -1 ? (
        <div className="h-screen">
          {' '}
          <EmptyScreen
            label="Page not found"
            message="Page you are looking for doesnot exists"
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
        />
      )}
    </div>
  );
};

export default Search;
