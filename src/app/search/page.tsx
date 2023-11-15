'use client';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './search-result-layout.module.scss';
import CloseOutline from '@public/assets/icons/close-outline.svg?url';
import EditIcon from '@public/assets/icons/edit.svg';
import Image from 'next/image';
import { constructUrlParams } from '@/utils/construct-url-param';
import { useGetAllProductQuery } from '@/features/api/product';
import AdvanceSearch from './form';
import SavedSearch from './saved';
import SearchResults from './result';
import { modifySearchResult } from '@/features/search-result/search-result';
import { useAppDispatch } from '@/hooks/hook';
import { CustomDialog } from '@/components/common/dialog';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { CustomInputDialog } from '@/components/common/input-dialog';
import {
  useAddSavedSearchMutation,
  useUpdateSavedSearchMutation,
} from '@/features/api/saved-searches';

interface IMyProfileRoutes {
  id: number;
  pathName: string;
  path: string | number;
}

function SearchResultLayout() {
  const subRoute = useSearchParams().get('route');
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
  const [myProfileRoutes, setMyProfileRoutes] = useState<IMyProfileRoutes[]>([
    {
      id: 1,
      pathName: ManageLocales('app.searchResult.header.newSearch'),
      path: 'form',
    },
    {
      id: 2,
      pathName: ManageLocales('app.savedSearch.header'),
      path: 'saved',
    },
  ]);
  const computeRouteAndComponentRenderer = () => {
    if (subRoute === 'saved') return 'Saved Searches';
    else if (subRoute === 'form') return 'New Search';
    else return `Search Results ${parseInt(subRoute!) - 2}`;
  };
  const [updateSavedSearch] = useUpdateSavedSearchMutation();
  const [headerPath, setheaderPath] = useState(
    computeRouteAndComponentRenderer()
  );
  let [addSavedSearch] = useAddSavedSearchMutation();
  let { data, error, isLoading, refetch } = useGetAllProductQuery({
    offset: 0,
    limit: 300,
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
      updateMyProfileRoute[i].path = i + 1;
    }

    if (removeDataIndex === 0 && updateMyProfileRoute.length === 2) {
      router.push(`search?route=form`);
    } else if (removeDataIndex === 0 && updateMyProfileRoute.length) {
      router.push(`/search?route=${removeDataIndex + 3}`);
      setheaderPath(`Search Results ${removeDataIndex + 1}`);
      setActiveTab(removeDataIndex + 1);
    } else {
      router.push(`/search?route=${removeDataIndex + 2}`);
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
      diamond_count: data?.count,
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
    if (subRoute !== 'form' && subRoute !== 'saved')
      setActiveTab(parseInt(subRoute!) - 2);
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
            path: index + 3,
          }))
          .filter(
            (newRoute: any) =>
              !myProfileRoutes.some(
                (existingRoute) => existingRoute.path === newRoute.path
              )
          );

        setMyProfileRoutes([...myProfileRoutes, ...newRoutes]);
      }
    };
    fetchMyAPI();
  }, [localStorage.getItem('Search')!, activeTab, maxTab]);

  const handleSearchTab = (index: number, pathName: string) => {
    if (maxTab < 5) {
      setActiveTab(index);
      setheaderPath(pathName);
    } else {
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className="max-w-[450px] flex justify-center text-center align-middle text-solitaireTertiary">
            'Max search limit reached. Please remove existing searches'
          </div>
        </>
      );
    }
  };

  const editSearchResult = (activeTab: number) => {
    dispatch(modifySearchResult({ activeTab: activeTab - 1 }));
    router.push(`/search?route=${subRoute}&edit=search-result`);
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
      <CustomInputDialog customInputDialogData={customInputDialogData} />
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
        <div className="border-b border-solid  border-solitaireSenary absolute top-[80px] left-[122px] flex flex-row items-start justify-start gap-[20px] w-full bg-solitairePrimary pb-3 pt-3">
          {myProfileRoutes.map(({ id, pathName, path }: any) => {
            // Check if the current route matches the link's path
            return path === 'form' || path === 'saved' ? (
              <Link
                className={`flex flex-row p-2.5  text-solitaireTertiary ${
                  headerPath === pathName
                    ? ''
                    : 'hover:text-solitaireQuaternary'
                }`}
                onClick={() => handleSearchTab(0, pathName)}
                href={
                  maxTab === 5 && path === 'form' ? `` : `/search?route=${path}`
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
              <div
                className={`flex items-center cursor-pointer gap-[8px] rounded-sm `}
              >
                {activeTab === parseInt(path) - 2 && (
                  <div onClick={() => editSearchResult(activeTab)}>
                    <Image src={EditIcon} alt="Edit Icon" />
                  </div>
                )}
                <Link
                  className={`flex flex-row p-2.5  text-solitaireTertiary ${
                    headerPath === pathName
                      ? ''
                      : 'hover:text-solitaireQuaternary'
                  }`}
                  onClick={() => handleSearchTab(parseInt(path) - 2, pathName)}
                  href={`/search?route=${path}`}
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
                <div onClick={() => closeSearch(parseInt(path) - 3)}>
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
          marginTop: '70px',
          width: '100%',
        }}
      >
        <main style={{ width: '98%', minHeight: '70vh' }}>
          {headerPath === 'New Search' ||
          editSubRoute === 'saved-search' ||
          editSubRoute === 'search-result' ? (
            <AdvanceSearch />
          ) : headerPath === 'Saved Searches' ? (
            <SavedSearch />
          ) : (
            <SearchResults data={data} activeTab={activeTab - 1} />
          )}
        </main>
      </div>
    </>
  );
}

export default SearchResultLayout;
