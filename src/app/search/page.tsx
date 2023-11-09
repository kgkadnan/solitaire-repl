'use client';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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

function SearchResultLayout() {
  const subRoute = useSearchParams().get('route');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searchUrl, setSearchUrl] = useState('');
  const [myProfileRoutes, setMyProfileRoutes] = useState([
    {
      id: '1',
      pathName: ManageLocales('app.searchResult.header.newSearch'),
      path: 'form',
    },
    {
      id: '2',
      pathName: ManageLocales('app.savedSearch.header'),
      path: 'saved',
    },
  ]);
  const computeRouteAndComponentRenderer = () => {
    if (subRoute === 'saved') return 'Saved Searches';
    else if (subRoute === 'form') return 'New Search';
    else return `Search Results ${parseInt(subRoute!) - 2}`;
  };

  const [headerPath, setheaderPath] = useState(
    computeRouteAndComponentRenderer()
  );
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

  const closeSearch = (removeDataIndex: number) => {
    let yourSelection = JSON.parse(localStorage.getItem('Search')!);

    if (yourSelection[removeDataIndex]) {
      let closeSpecificSearch = yourSelection.filter(
        (items: any, index: number) => {
          return index !== removeDataIndex;
        }
      );
      localStorage.setItem('Search', JSON.stringify(closeSpecificSearch));
      let updateData = myProfileRoutes.filter((items, index) => {
        return index !== removeDataIndex + 2;
      });

      if (removeDataIndex === 0) {
        router.push(`search?route=form`);
      } else {
        router.push(`/search?route=${removeDataIndex + 2}`);
      }
      setMyProfileRoutes(updateData);
      setheaderPath(`Search Results ${removeDataIndex}`);
      setActiveTab(removeDataIndex);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  // useEffect(() => {
  //   let yourSelection = localStorage.getItem('Search');
  //   if (yourSelection) {
  //     const parseYourSelection = JSON.parse(yourSelection);
  //     let url = constructUrlParams(
  //       parseYourSelection[activeTab - 1]?.queryParams
  //     );
  //     setSearchUrl(url);
  //   }
  // }, [activeTab]);

  useEffect(() => {
    if (subRoute !== 'form' && subRoute !== 'saved')
      setActiveTab(parseInt(subRoute!) - 2);
  }, [subRoute]);

  useEffect(() => {
    let fetchMyAPI = async () => {
      let yourSelection = localStorage.getItem('Search');

      if (yourSelection) {
        const parseYourSelection = JSON.parse(yourSelection);

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
  }, [localStorage.getItem('Search')!, activeTab]);

  const handleSearchTab = (index: number, pathName: string) => {
    setActiveTab(index);
    console.log('pathName', pathName);
    setheaderPath(pathName);
  };

  const editSearchResult = (activeTab: number) => {
    dispatch(modifySearchResult({ activeTab: activeTab - 1 }));
    router.push(`/search?route=form&&edit=search-result`);
  };

  return (
    <>
      <div
        className={` ${styles.navBar} ${
          visible ? styles.visible : styles.hidden
        }`}
      >
        <div className="border-b border-solid  border-solitaireSenary absolute top-[80px] left-[122px] flex flex-row items-start justify-start gap-[20px] w-full bg-solitairePrimary pb-3 pt-3">
          {myProfileRoutes.map(({ id, pathName, path }) => {
            // Check if the current route matches the link's path
            return path === 'form' || path === 'saved' ? (
              <Link
                className={`flex flex-row p-2.5  text-solitaireTertiary ${
                  headerPath === pathName
                    ? ''
                    : 'hover:text-solitaireQuaternary'
                }`}
                onClick={() => handleSearchTab(0, pathName)}
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
          {headerPath === 'Saved Searches' ? (
            <SavedSearch />
          ) : headerPath === 'New Search' ? (
            <AdvanceSearch />
          ) : (
            <SearchResults data={data} />
          )}
        </main>
      </div>
    </>
  );
}

export default SearchResultLayout;
