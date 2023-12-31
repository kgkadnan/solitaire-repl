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
import SavedSearch from './saved/saved';
import SearchResults from './result/result';
import { modifySearchResult } from '@/features/search-result/search-result';
import { useAppDispatch } from '@/hooks/hook';
import { CustomDialog } from '@/components/common/dialog';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';

import {
  useAddSavedSearchMutation,
  useUpdateSavedSearchMutation
} from '@/features/api/saved-searches';
import { LISTING_PAGE_DATA_LIMIT } from '@/constants/business-logic';
import { NoDataFound } from '@/components/common/no-data-found';
import { TITLE_ALREADY_EXISTS } from '@/constants/error-messages/search';
import { FloatingLabelInput } from '@/components/common/floating-input';
import { CustomInputDialog } from '@/components/common/input-dialog';
import logger from 'logging/log-util';

interface IMyProfileRoutes {
  id: number;
  pathName: {
    shortName: string;
    fullName: string;
  };
  path: string | number;
}

interface IPathName {
  shortName: string;
  fullName: string;
}

function SearchLayout() {
  const subRoute = useSearchParams().get('active-tab');
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

  const [, setInputError] = useState(false);
  const [inputErrorContent, setInputErrorContent] = useState('');

  const [viewPort, setViewPort] = useState<boolean>(true);

  const [myProfileRoutes, setMyProfileRoutes] = useState<IMyProfileRoutes[]>([
    {
      id: 1,
      pathName: {
        shortName: ManageLocales('app.searchResult.header.newSearch'),
        fullName: ManageLocales('app.searchResult.header.newSearch')
      },
      path:  ManageLocales('app.search.newSearchRoute')
    },
    {
      id: 2,
      pathName: {
        shortName: ManageLocales('app.savedSearch.header'),
        fullName: ManageLocales('app.savedSearch.header')
      },
      path: ManageLocales('app.search.savedSearchesRoute')
    }
  ]);

  const computeRouteAndComponentRenderer = () => {
    const yourSelection = JSON.parse(localStorage.getItem('Search')!);

    const replaceSubrouteWithSearchResult = subRoute?.replace(`${ManageLocales('app.search.resultRoute')}-`, '');

    if (subRoute === ManageLocales('app.search.savedSearchesRoute'))
      return {
        shortName:ManageLocales('app.search.savedSearchesHeader'),
        fullName:ManageLocales('app.search.savedSearchesHeader')
      };
    else if (subRoute === ManageLocales('app.search.newSearchRoute'))
      return {
        shortName: ManageLocales('app.search.newSearchHeader'),
        fullName: ManageLocales('app.search.newSearchHeader')
      };
    else if (
      subRoute !== ManageLocales('app.search.savedSearchesRoute') &&
      subRoute !== ManageLocales('app.search.newSearchRoute') &&
      replaceSubrouteWithSearchResult
    ) {
      const isRouteExist =
        yourSelection?.[parseInt(replaceSubrouteWithSearchResult) - 1];
      if (isRouteExist === undefined) {
        return {
          shortName: `No Data Found`,
          fullName: `No Data Found`
        };
      } else {
        return {
          shortName: `R ${parseInt(replaceSubrouteWithSearchResult!)}`,
          fullName: `Result ${parseInt(replaceSubrouteWithSearchResult!)}`
        };
      }
    } else if (
      masterRoute === '/search' &&
      (replaceSubrouteWithSearchResult?.length === 0 || subRoute === null)
    ) {
      return {
        shortName: ManageLocales('app.search.newSearchHeader'),
        fullName: ManageLocales('app.search.newSearchHeader')
      };
    }
  };
  const [updateSavedSearch] = useUpdateSavedSearchMutation();
  const [headerPath, setHeaderPath] = useState<any>(
    computeRouteAndComponentRenderer()
  );
  let [addSavedSearch] = useAddSavedSearchMutation();
  let { data, isLoading, refetch } = useGetAllProductQuery(
    {
      offset: 0,
      limit: LISTING_PAGE_DATA_LIMIT,
      url: searchUrl
    },
    {
      skip: !searchUrl
    }
  );
  useEffect(() => {
    setHeaderPath(computeRouteAndComponentRenderer());
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
      updateMyProfileRoute[i].pathName = {
        shortName: `R ${i - 1}`,
        fullName: `Result ${i - 1}`
      };
      updateMyProfileRoute[i].path = i - 1;
    }

    if (removeDataIndex === 0 && updateMyProfileRoute.length === 2) {
      router.push(`search?active-tab=${ManageLocales('app.search.newSearchRoute')}`);
    } else if (removeDataIndex === 0 && updateMyProfileRoute.length) {
      setHeaderPath({
        shortName: `R ${removeDataIndex + 1}`,
        fullName: `Result ${removeDataIndex + 1}`
      });
      setActiveTab(removeDataIndex + 1);

      router.push(`/search?active-tab=${ManageLocales('app.search.resultRoute')}-${removeDataIndex + 1}`);
    } else {
      setHeaderPath({
        shortName: `R ${removeDataIndex}`,
        fullName: `Result ${removeDataIndex}`
      });
      setActiveTab(removeDataIndex);
      router.push(`/search?active-tab=${ManageLocales('app.search.resultRoute')}-${removeDataIndex}`);
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
      is_deleted: false
    })
      .unwrap()
      .then(() => {
        setIsInputDialogOpen(false);
        closeTheSearchFunction(removeIndex, yourSelection);
        setSaveSearchName('');
      })
      .catch(() => {
        setInputError(true);
        setInputErrorContent(TITLE_ALREADY_EXISTS);
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
                displayButtonStyle: styles.showResultButtonTransparent
              }}
            />
            <CustomDisplayButton
              displayButtonLabel="Yes"
              handleClick={async () => {
                if (yourSelection[removeDataIndex]?.saveSearchName.length) {
                  //update logic comes here
                  const updateSaveSearchData = {
                    id: yourSelection[removeDataIndex]?.id,
                    meta_data: yourSelection[removeDataIndex]?.queryParams,
                    diamond_count: data?.count
                  };
                  updateSavedSearch(updateSaveSearchData)
                    .unwrap()
                    .then(() => {
                      setIsInputDialogOpen(true);
                      setIsDialogOpen(false);
                      closeTheSearchFunction(removeDataIndex, yourSelection);
                    })
                    .catch((error: any) => {
                      logger.error(error);
                    });
                } else {
                  setIsInputDialogOpen(true);
                  setIsDialogOpen(false);
                  setRemoveIndex(removeDataIndex);
                }
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonFilled
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
    if (searchUrl) refetch();
  }, [searchUrl]);

  useEffect(() => {
    if (subRoute !== ManageLocales('app.search.newSearchRoute') && subRoute !== ManageLocales('app.search.savedSearchesRoute')) {
      const replaceSubrouteWithSearchResult = subRoute?.replace(
        `${ManageLocales('app.search.resultRoute')}-`,
        ''
      );
      setActiveTab(parseInt(replaceSubrouteWithSearchResult!));
    }
  }, [subRoute]);

  useEffect(() => {
    const fetchMyAPI = async () => {
      const yourSelection = localStorage.getItem('Search');

      if (yourSelection) {
        const parseYourSelection = JSON.parse(yourSelection);
        setMaxTab(parseYourSelection.length);

        // Always fetch data, even on initial load
        const url = constructUrlParams(
          parseYourSelection[activeTab - 1]?.queryParams
        );
        setSearchUrl(url);

        const newRoutes = parseYourSelection
          .map((data: any, index: number) => ({
            id: index + 3,
            pathName: {
              shortName: `R ${index + 1}`,
              fullName: `Result ${index + 1}`
            },

            path: index + 1
          }))
          .filter(
            (newRoute: any) =>
              !myProfileRoutes.some(
                existingRoute => existingRoute.path === newRoute.path
              )
          );

        if (parseYourSelection.length) {
          setMyProfileRoutes([...myProfileRoutes, ...newRoutes]);
          if (isLoading) {
            refetch();
          }
        } else {
          setMyProfileRoutes([
            {
              id: 1,
              pathName: {
                shortName: `${ManageLocales('app.search.newSearchHeader')}`,
                fullName: `${ManageLocales('app.search.newSearchHeader')}`
              },
              path: ManageLocales('app.search.newSearchRoute')
            },
            {
              id: 2,
              pathName: {
                shortName: `${ManageLocales('app.search.savedSearchesHeader')}`,
                fullName: `${ManageLocales('app.search.savedSearchesHeader')}`
              },
              path: ManageLocales('app.search.savedSearchesRoute')
            }
          ]);
        }
      }
    };

    fetchMyAPI();
  }, [localStorage.getItem('Search')!, activeTab, maxTab, usePathname()]);

  const handleSearchTab = (index: number, pathName: IPathName) => {
    setActiveTab(index);
    setHeaderPath(pathName);
  };

  const editSearchResult = (activeTab: number) => {
    dispatch(modifySearchResult({ activeTab: activeTab - 1 }));
    router.push(`/search?active-tab=${subRoute}&edit=${ManageLocales('app.search.resultRoute')}`);
  };

  const handleCloseResultTabs = () => {
    localStorage.removeItem('Search');
    setMyProfileRoutes([
      {
        id: 1,
        pathName: {
          shortName: `${ManageLocales('app.search.newSearchHeader')}`,
          fullName: `${ManageLocales('app.search.newSearchHeader')}`
        },
        path: ManageLocales('app.search.newSearchRoute')
      },
      {
        id: 2,
        pathName: {
          shortName: `${ManageLocales('app.search.savedSearchesHeader')}`,
          fullName: `${ManageLocales('app.search.savedSearchesHeader')}`
        },
        path: ManageLocales('app.search.savedSearchesRoute')
      }
    ]);
    router.push(`/search?active-tab=${ManageLocales('app.search.newSearchRoute')}`);
  };

  const isRoute = (path: string) => {
    return path === ManageLocales('app.search.newSearchRoute') || path === ManageLocales('app.search.savedSearchesRoute');
  };

  useEffect(() => {
    const isViewPortGreater =
      (window.innerWidth - 400) / (myProfileRoutes.length - 2) > 140;
    setViewPort(isViewPortGreater);
  }, [myProfileRoutes]);

  const handleInputChange = (e: any) => {
    setInputErrorContent('');
    setSaveSearchName(e.target.value);
  };

  const renderContentWithInput = () => {
    return (
      <div className="w-full flex flex-col gap-6">
        <div className=" flex justify-center align-middle items-center">
          <p>Save and close this search</p>
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
                handleCloseAndSave();
              }
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <CustomInputDialog
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
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
        <div className="border-b border-solid  border-solitaireSenary items-center absolute top-[80px] left-[122px] flex flex-row  w-[90%] justify-between  bg-solitairePrimary pb-3 pt-3 text-[13px] gap-[20px] h-[80px]">
          <div className="flex ">
            {myProfileRoutes.map(({ id, pathName, path }: any) => {
              // Check if the current route matches the link's path
              return (
                isRoute(path) && (
                  <Link
                    className={`flex flex-row py-2.5 px-1.5  text-solitaireTertiary min-w-[110px] ${
                      headerPath.fullName === pathName.fullName
                        ? ''
                        : 'hover:text-solitaireQuaternary'
                    }`}
                    onClick={() => handleSearchTab(0, pathName)}
                    href={`/search?active-tab=${path}`}
                    key={id}
                  >
                    <div
                      className={`${
                        headerPath.fullName === pathName.fullName &&
                        'text-solitaireQuaternary'
                      }`}
                    >
                      {pathName.fullName}
                    </div>
                  </Link>
                )
              );
            })}
          </div>
          <div className=" flex " style={{ width: '100%' }}>
            {myProfileRoutes.map(({ id, pathName, path }: any) => {
              // Check if the current route matches the link's path
              return (
                !isRoute(path) && (
                  <div
                    className={`flex items-center cursor-pointer  rounded-sm `}
                    style={{
                      minWidth:
                        (window.innerWidth - 500) /
                          (myProfileRoutes.length - 2) >
                        170
                          ? '8%'
                          : '5%'
                    }}
                  >
                    <div className="w-[24px]">
                      {activeTab === parseInt(path) && (
                        <div onClick={() => editSearchResult(activeTab)}>
                          <Image src={EditIcon} alt="Edit Icon" />
                        </div>
                      )}
                    </div>
                    <Link
                      className={`flex flex-row py-2.5 px-1.5  text-solitaireTertiary ${
                        headerPath.fullName === pathName.fullName
                          ? ''
                          : 'hover:text-solitaireQuaternary'
                      }`}
                      onClick={() => handleSearchTab(parseInt(path), pathName)}
                      href={`/search?active-tab=${ManageLocales('app.search.resultRoute')}-${path}`}
                      key={id}
                    >
                      <div
                        className={`${
                          headerPath.fullName === pathName.fullName &&
                          'text-solitaireQuaternary'
                        }`}
                      >
                        {viewPort
                          ? pathName.fullName
                          : activeTab === parseInt(path)
                          ? pathName.fullName
                          : pathName.shortName}
                      </div>
                    </Link>
                    <div onClick={() => closeSearch(parseInt(path) - 1)}>
                      <CloseOutline stroke="#8C7459" />
                    </div>
                  </div>
                )
              );
            })}
          </div>
          {JSON.parse(localStorage.getItem('Search')!)?.length > 0 && (
            <div className="w-[120px]">
              <CustomDisplayButton
                displayButtonLabel="Close Results"
                displayButtonAllStyle={{
                  displayLabelStyle: styles.closeResultButton
                }}
                handleClick={() => {
                  handleCloseResultTabs();
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '60px',
          width: '100%'
        }}
      >
        <main style={{ width: '98%', minHeight: '70vh' }}>
          {headerPath.fullName === `${ManageLocales('app.search.newSearchHeader')}` ||
          editSubRoute === ManageLocales('app.search.savedSearchesRoute') ||
          editSubRoute === `${ManageLocales('app.search.resultRoute')}` ? (
            <AdvanceSearch />
          ) : headerPath.fullName === `${ManageLocales('app.search.savedSearchesHeader')}` ? (
            <SavedSearch />
          ) : headerPath.fullName === 'No Data Found' ? (
            <NoDataFound />
          ) : (
            <SearchResults
              searchUrl={searchUrl}
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

export default SearchLayout;
