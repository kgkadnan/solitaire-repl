'use client';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './search-result-layout.module.scss';
import CloseOutline from '@public/assets/icons/close-outline.svg?url';
import EditIcon from '@public/assets/icons/edit.svg';
import Image from 'next/image';
import { constructUrlParams } from '@/utils/construct-url-param';
import { useGetAllProductQuery } from '@/features/api/product';
import AdvanceSearch from './form/form';
import SavedSearch from './saved';
import SearchResults from './result/result';
import { modifySearchResult } from '@/features/search-result/search-result';
import { useAppDispatch } from '@/hooks/hook';
import { CustomDialog } from '@/components/common/dialog';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { CustomInputDialog } from '@/components/common/input-dialog';
import {
  useAddSavedSearchMutation,
  useUpdateSavedSearchMutation,
} from '@/features/api/saved-searches';
import CustomLoader from '@/components/common/loader';
import {
  LISTING_PAGE_DATA_LIMIT,
  MAX_SEARCH_TAB_LIMIT,
} from '@/constants/business-logic';
import { NoDataFound } from '@/components/common/no-data-found';
import {
  NEW_SEARCH,
  SAVED_SEARCHES,
  SEARCH_RESULT,
} from '@/constants/application-constants/search-page';

interface IMyProfileRoutes {
  id: number;
  pathName: string;
  path: string | number;
}

function SearchResultLayout() {
  const subRoute = useSearchParams().get('query');
  const masterRoute = usePathname();
  const editSubRoute = useSearchParams().get('edit');

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState<string>('');
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searchUrl, setSearchUrl] = useState('');
  const [dialogContent, setDialogContent] = useState<ReactNode>();
  const [removeIndex, setRemoveIndex] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [maxTab, setMaxTab] = useState<number>(0);

  const [inputError, setInputError] = useState(false);
  const [inputErrorContent, setInputErrorContent] = useState('');

  const [myProfileRoutes, setMyProfileRoutes] = useState<IMyProfileRoutes[]>([
    {
      id: 1,
      pathName: ManageLocales('app.searchResult.header.newSearch'),
      path: `${NEW_SEARCH}`,
    },
    {
      id: 2,
      pathName: ManageLocales('app.savedSearch.header'),
      path: `${SAVED_SEARCHES}`,
    },
  ]);

  const computeRouteAndComponentRenderer = () => {
    let yourSelection = JSON.parse(localStorage.getItem('Search')!);

    let replaceSubrouteWithSearchResult = subRoute?.replace(
      `${SEARCH_RESULT}-`,
      ''
    );

    if (subRoute === `${SAVED_SEARCHES}`) return 'Saved Searches';
    else if (subRoute === `${NEW_SEARCH}`) return 'New Search';
    else if (
      subRoute !== `${SAVED_SEARCHES}` &&
      subRoute !== `${NEW_SEARCH}` &&
      replaceSubrouteWithSearchResult
    ) {
      let isRouteExist =
        yourSelection[parseInt(replaceSubrouteWithSearchResult) - 1];
      if (isRouteExist === undefined) {
        return 'No Data Found';
      } else {
        return `Search Results ${parseInt(replaceSubrouteWithSearchResult!)}`;
      }
    } else if (
      (masterRoute === '/search' &&
        replaceSubrouteWithSearchResult?.length === 0) ||
      subRoute === null
    ) {
      return 'New Search';
    }
  };
  const [updateSavedSearch] = useUpdateSavedSearchMutation();
  const [headerPath, setheaderPath] = useState(
    computeRouteAndComponentRenderer()
  );
  let [addSavedSearch] = useAddSavedSearchMutation();
  let { data, isLoading, refetch } = useGetAllProductQuery({
    offset: 0,
    limit: LISTING_PAGE_DATA_LIMIT,
    url: searchUrl,
  });

  useEffect(() => {
    setheaderPath(computeRouteAndComponentRenderer());
  }, [subRoute]);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  const closeTheSearchFunction = (
    removeDataIndex: number,
    yourSelection: string[]
  ) => {
    let closeSpecificSearch = yourSelection.filter(
      (items: any, index: number) => {
        return index !== removeDataIndex;
      }
    );

    let updateMyProfileRoute = myProfileRoutes.filter((items, index) => {
      return index !== removeDataIndex + 2;
    });

    for (let i = 2; i < updateMyProfileRoute.length; i++) {
      updateMyProfileRoute[i].id = i + 1;
      updateMyProfileRoute[i].pathName = `Search Results ${i - 1}`;
      updateMyProfileRoute[i].path = i - 1;
    }

    if (removeDataIndex === 0 && updateMyProfileRoute.length === 2) {
      router.push(`search?query=${NEW_SEARCH}`);
    } else if (removeDataIndex === 0 && updateMyProfileRoute.length) {
      router.push(`/search?query=${SEARCH_RESULT}-${removeDataIndex + 1}`);
      setheaderPath(`Search Results ${removeDataIndex + 1}`);
      setActiveTab(removeDataIndex + 1);
    } else {
      router.push(`/search?query=${SEARCH_RESULT}-${removeDataIndex}`);
      setheaderPath(`Search Results ${removeDataIndex}`);
      setActiveTab(removeDataIndex);
    }

    localStorage.setItem('Search', JSON.stringify(closeSpecificSearch));
    setMyProfileRoutes(updateMyProfileRoute);
  };

  const handleCloseAndSave = async () => {
    let yourSelection = JSON.parse(localStorage.getItem('Search')!);

    await addSavedSearch({
      name: saveSearchName,
      diamond_count: parseInt(data?.count),
      meta_data: yourSelection[removeIndex]?.queryParams,
      is_deleted: false,
    })
      .unwrap()
      .then(() => {
        setIsInputDialogOpen(false);
        closeTheSearchFunction(removeIndex, yourSelection);
        setSaveSearchName('');
      })
      .catch((error: any) => {
        console.log('error', error);
        setInputError(true);
        setInputErrorContent(
          'Title already exists. Choose another title to save your search'
        );
      });
  };

  const closeSearch = (removeDataIndex: number) => {
    let yourSelection = JSON.parse(localStorage.getItem('Search')!);

    if (!yourSelection[removeDataIndex].isSavedSearch) {
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className="max-w-[450px] flex justify-center text-center align-middle text-solitaireTertiary">
            Do you want to save your &quot;Search <br /> Result &quot; for this
            session?
          </div>
          <div className="max-w-[450px] flex justify-around align-middle text-solitaireTertiary gap-[25px]">
            <CustomDisplayButton
              displayButtonLabel="No"
              handleClick={() => {
                setIsDialogOpen(false);
                closeTheSearchFunction(removeDataIndex, yourSelection);
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonTransparent,
              }}
            />
            <CustomDisplayButton
              displayButtonLabel="Yes"
              handleClick={async () => {
                if (yourSelection[removeDataIndex]?.saveSearchName.length) {
                  //update logic comes here
                  let updateSaveSearchData = {
                    id: yourSelection[removeDataIndex]?.id,
                    name: yourSelection[removeDataIndex]?.saveSearchName,
                    meta_data: yourSelection[removeDataIndex]?.queryParams,
                    diamond_count: data?.count,
                  };
                  updateSavedSearch(updateSaveSearchData)
                    .unwrap()
                    .then(() => {
                      setIsInputDialogOpen(true);
                      setIsDialogOpen(false);
                      closeTheSearchFunction(removeDataIndex, yourSelection);
                    })
                    .catch((error: any) => {
                      console.log('error', error);
                    });
                } else {
                  setIsInputDialogOpen(true);
                  setIsDialogOpen(false);
                  setRemoveIndex(removeDataIndex);
                }
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonFilled,
              }}
            />
          </div>
        </>
      );
    } else if (yourSelection[removeDataIndex]) {
      closeTheSearchFunction(removeDataIndex, yourSelection);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    if (subRoute !== `${NEW_SEARCH}` && subRoute !== `${SAVED_SEARCHES}`) {
      let replaceSubrouteWithSearchResult = subRoute?.replace(
        `${SEARCH_RESULT}-`,
        ''
      );
      setActiveTab(parseInt(replaceSubrouteWithSearchResult!));
    }
  }, [subRoute]);

  useEffect(() => {
    let fetchMyAPI = async () => {
      let yourSelection = localStorage.getItem('Search');

      if (yourSelection) {
        const parseYourSelection = JSON.parse(yourSelection);
        setMaxTab(parseYourSelection.length);

        // Always fetch data, even on initial load
        let url = constructUrlParams(
          parseYourSelection[activeTab - 1]?.queryParams
        );
        setSearchUrl(url);

        const newRoutes = parseYourSelection
          .map((data: any, index: number) => ({
            id: index + 3,
            pathName: `Search Results ${index + 1}`,
            path: index + 1,
          }))
          .filter(
            (newRoute: any) =>
              !myProfileRoutes.some(
                (existingRoute) => existingRoute.path === newRoute.path
              )
          );

        if (parseYourSelection.length) {
          setMyProfileRoutes([...myProfileRoutes, ...newRoutes]);
        } else {
          setMyProfileRoutes([
            {
              id: 1,
              pathName: ManageLocales('app.searchResult.header.newSearch'),
              path: `${NEW_SEARCH}`,
            },
            {
              id: 2,
              pathName: ManageLocales('app.savedSearch.header'),
              path: `${SAVED_SEARCHES}`,
            },
          ]);
        }
      }
    };
    fetchMyAPI();
  }, [localStorage.getItem('Search')!, activeTab, maxTab, usePathname()]);

  const handleSearchTab = (index: number, pathName: string) => {
    if (
      maxTab === MAX_SEARCH_TAB_LIMIT &&
      pathName.toLocaleLowerCase() === 'new search'
    ) {
      setIsDialogOpen(true);
      setDialogContent(
        <div className="max-w-[450px] flex justify-center text-center align-middle text-solitaireTertiary">
          Max search limit reached. Please remove existing searches
        </div>
      );
    } else {
      setActiveTab(index);
      setheaderPath(pathName);
    }
  };

  const editSearchResult = (activeTab: number) => {
    dispatch(modifySearchResult({ activeTab: activeTab - 1 }));
    router.push(`/search?query=${subRoute}&edit=${SEARCH_RESULT}`);
  };

  const handleCloseInputDialog = () => {
    setIsInputDialogOpen(false);
    setInputError(false);
    setSaveSearchName('');
  };

  const customInputDialogData = {
    isOpens: isInputDialogOpen,
    setIsOpen: setIsInputDialogOpen,
    setInputvalue: setSaveSearchName,
    inputValue: saveSearchName,
    displayButtonFunction: handleCloseAndSave,
    label: 'Save and close this search',
    name: 'Save',
    displayButtonLabel2: 'Save',
  };

  return (
    <>
      <CustomInputDialog
        customInputDialogData={customInputDialogData}
        isError={inputError}
        errorContent={inputErrorContent}
        setIsError={setInputError}
        setErrorContent={setInputErrorContent}
        handleClose={handleCloseInputDialog}
      />
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div
        className={` ${styles.navBar} ${
          visible ? styles.visible : styles.hidden
        }`}
      >
        <div className="border-b border-solid  border-solitaireSenary absolute top-[80px] left-[122px] flex flex-row items-start justify-start gap-[20px] w-full bg-solitairePrimary pb-3 pt-3 text-[13px] overflow-x-auto">
          {myProfileRoutes.map(({ id, pathName, path }: any) => {
            // Check if the current route matches the link's path
            return path === `${NEW_SEARCH}` || path === `${SAVED_SEARCHES}` ? (
              <Link
                className={`flex flex-row py-2.5 px-1.5  text-solitaireTertiary ${
                  headerPath === pathName
                    ? ''
                    : 'hover:text-solitaireQuaternary'
                }`}
                onClick={() => handleSearchTab(0, pathName)}
                href={
                  maxTab === MAX_SEARCH_TAB_LIMIT && path === `${NEW_SEARCH}`
                    ? ``
                    : `/search?query=${path}`
                }
                key={id}
              >
                <div
                  className={`${
                    headerPath === pathName && 'text-solitaireQuaternary'
                  }`}
                >
                  {pathName}
                </div>
              </Link>
            ) : (
              <div className={`flex items-center cursor-pointer  rounded-sm `}>
                {activeTab === parseInt(path) && (
                  <div onClick={() => editSearchResult(activeTab)}>
                    <Image src={EditIcon} alt="Edit Icon" />
                  </div>
                )}
                <Link
                  className={`flex flex-row py-2.5 px-1.5  text-solitaireTertiary ${
                    headerPath === pathName
                      ? ''
                      : 'hover:text-solitaireQuaternary'
                  }`}
                  onClick={() => handleSearchTab(parseInt(path), pathName)}
                  href={`/search?query=${SEARCH_RESULT}-${path}`}
                  key={id}
                >
                  <div
                    className={`${
                      headerPath === pathName && 'text-solitaireQuaternary'
                    }`}
                  >
                    {pathName}
                  </div>
                </Link>
                <div onClick={() => closeSearch(parseInt(path) - 1)}>
                  <CloseOutline stroke="#8C7459" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '78px',
          width: '100%',
        }}
      >
        <main style={{ width: '98%', minHeight: '70vh' }}>
          {headerPath === 'New Search' ||
          editSubRoute === `${SAVED_SEARCHES}` ||
          editSubRoute === `${SEARCH_RESULT}` ? (
            <AdvanceSearch />
          ) : headerPath === 'Saved Searches' ? (
            <SavedSearch />
          ) : isLoading ? (
            <CustomLoader />
          ) : headerPath === 'No Data Found' ? (
            <NoDataFound />
          ) : (
            <SearchResults
              data={data}
              activeTab={activeTab - 1}
              refetch={refetch}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default SearchResultLayout;
