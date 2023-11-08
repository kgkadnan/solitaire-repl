'use client';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './search-result-layout.module.scss';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import CloseOutline from '@public/assets/icons/close-outline.svg?url';
import EditIcon from '@public/assets/icons/edit.svg';
import Image from 'next/image';
import { constructUrlParams } from '@/utils/construct-url-param';
import { useGetAllProductQuery } from '@/features/api/product';
import { useAppDispatch } from '@/hooks/hook';
import { modifySearchResult } from '@/features/search-result/search-result';

function SearchResultLayout({ children }: { children: React.ReactNode }) {
  let currentPath = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [yourSelectionData, setYourSelectionData] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [searchUrl, setSearchUrl] = useState('');

  let { data, error, isLoading, refetch } = useGetAllProductQuery({
    offset: 0,
    limit: 300,
    url: searchUrl,
  });

  let myProfileRoutes = [
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
  ];

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    let yourSelection = localStorage.getItem('Search');
    if (yourSelection) {
      const parseYourSelection = JSON.parse(yourSelection);
      setYourSelectionData(parseYourSelection);
      // Always fetch data, even on initial load
      let url = constructUrlParams(parseYourSelection[activeTab]);
      setSearchUrl(url);
    }
  }, [activeTab, data]);

  const handleSearchTab = (index: number) => {
    setActiveTab(index);
  };

  const closeSearch = (removeDataIndex: number) => {
    // Filter the dummyData to remove the specified search
    // const updatedData: Data = {};
    // Object.keys(dummyData).forEach((key, index) => {
    //   if (index !== removeDataIndex) {
    //     updatedData[key] = dummyData[key];
    //   }
    // });
    // // Update the state with the filtered dummyData
    // setRows([...Object.values(updatedData)[0]]); // Assuming you want to show the first search results after closing a search
  };

  const editSearchResult = (activeTab: number) => {
    dispatch(modifySearchResult({ activeTab }));
    router.push(`/search/form?edit=search-result`);
  };

  return (
    <>
      <div
        className={` ${styles.navBar} ${
          visible ? styles.visible : styles.hidden
        }`}
      >
        <div className="border-b border-solid  border-solitaireSenary absolute top-[80px] left-[122px] flex flex-row items-start justify-start gap-[20px] w-full bg-solitairePrimary py-3">
          {myProfileRoutes.map(({ id, pathName, path }) => {
            // Check if the current route matches the link's path
            const isActive = currentPath === `/search/${path}`;

            return (
              <Link
                className={`flex flex-row p-2.5  text-solitaireTertiary ${
                  isActive ? '' : 'hover:text-solitaireQuaternary'
                }`}
                href={`/search/${path}`}
                key={id}
              >
                <div className={`${isActive && 'text-solitaireQuaternary'}`}>
                  {pathName}
                </div>
              </Link>
            );
          })}

          <div className="flex items-start justify-start gap-[20px] text-solitaireTertiary pb-3 pt-2">
            {Object.keys(yourSelectionData).length > 0 &&
              Object.values(yourSelectionData).map(
                (yourSelection: any, index: number) => {
                  return (
                    <div key={`Search-${index}`}>
                      <div
                        style={{
                          marginRight:
                            index === yourSelection.length - 1 ? '0px' : '5px',
                        }}
                        className={`flex items-center cursor-pointer gap-[8px] rounded-sm ${
                          activeTab === index
                            ? styles.activeHeaderButtonStyle
                            : styles.headerButtonStyle
                        }`}
                      >
                        {activeTab === index && (
                          <div onClick={() => editSearchResult(activeTab)}>
                            <Image src={EditIcon} alt="Edit Icon" />
                          </div>
                        )}
                        <div>
                          <CustomDisplayButton
                            displayButtonLabel={`Search Results ${index + 1}`}
                            handleClick={() => handleSearchTab(index)}
                          />
                        </div>
                        <div onClick={() => closeSearch(index)}>
                          <CloseOutline stroke="#8C7459" />
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '70px',
          width: '100%',
        }}
      >
        <main style={{ width: '98%', minHeight: '70vh' }}>{children}</main>
      </div>
    </>
  );
}

export default SearchResultLayout;
