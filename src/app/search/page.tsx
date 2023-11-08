'use client';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './search-result-layout.module.scss';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import CloseOutline from '@public/assets/icons/close-outline.svg?url';
import EditIcon from '@public/assets/icons/edit.svg';
import Image from 'next/image';
import { constructUrlParams } from '@/utils/construct-url-param';
import { useGetAllProductQuery } from '@/features/api/product';
import AdvanceSearch from './form';

function SearchResultLayout({ children }: { children: React.ReactNode }) {
  const subRoute = useSearchParams().get('route');

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [yourSelectionData, setYourSelectionData] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [searchUrl, setSearchUrl] = useState('');
const [myProfileRoutes,setMyProfileRoutes]=useState([
  {
    id: '1',
    pathName: ManageLocales('app.searchResult.header.newSearch'),
    path: 'form'
  },
  {
    id: '2',
    pathName: ManageLocales('app.savedSearch.header'),
    path: 'saved'
  },
])
  const computeRouteAndComponentRenderer = () => {
    
    if (subRoute === 'saved')  return "Saved Searches" 
    else if (subRoute === 'form')  return "New Search" 
    else return `Search Results ${parseInt(subRoute!)}`

  }
  const [pathU, setPathU] = useState(computeRouteAndComponentRenderer())
  let { data, error, isLoading, refetch } = useGetAllProductQuery({
    offset: 0,
    limit: 300,
    url: searchUrl,
  });
console.log(pathU,"pathU")
  useEffect(() => {
    setPathU(computeRouteAndComponentRenderer())
  }, [subRoute]);

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
      let url = constructUrlParams(parseYourSelection[activeTab+1]);
      setSearchUrl(url);
      
   
    }
    
  }, [activeTab, data]);


  useEffect(() => {
    let yourSelection = localStorage.getItem('Search');
    if (yourSelection) {
      const parseYourSelection = JSON.parse(yourSelection);
      
      let remainingRoutes=parseYourSelection.map((data:any,index:number)=>{
        return {
          id:index+3,
          pathName:`Search Results ${index+1}`,
          path:index+3
        }
      })
    setMyProfileRoutes([...myProfileRoutes,...remainingRoutes])
    }
    
  }, [localStorage.getItem('Search')]);

  const handleSearchTab = (index: number) => {
    setActiveTab(index+1);
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
console.log(pathU,"oooooooooo")
  return (
    <>
      <div
        className={` ${styles.navBar} ${visible ? styles.visible : styles.hidden
          }`}
      >
        <div className="border-b border-solid  border-solitaireSenary absolute top-[80px] left-[122px] flex flex-row items-start justify-start gap-[20px] w-full bg-solitairePrimary pb-3 pt-3">
          {myProfileRoutes.map(({ id, pathName, path }) => {
            // Check if the current route matches the link's path
            return (

              <Link
                className={`flex flex-row p-2.5  text-solitaireTertiary ${pathU === pathName ? '' : 'hover:text-solitaireQuaternary'
                  }`}
                onClick={() => setPathU(pathName)}
                href={`/search?route=${path}`}
                key={id}
              >
                <div className={`${pathU === pathName && 'text-solitaireQuaternary'}`}>
                  {pathName}
                </div>
              </Link>
              // <AdvanceSearch/>
            );
          })}

          {/* <div className="flex items-start justify-start gap-[20px] text-solitaireTertiary pb-3 pt-2">
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
                        className={`flex items-center cursor-pointer gap-[8px] rounded-sm ${activeTab === index
                            ? styles.activeHeaderButtonStyle
                            : styles.headerButtonStyle
                          }`}
                      >
                        {activeTab === index && (
                          <div>
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
          </div> */}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '70px',
          width: '100%',
        }}
      >
        <main style={{ width: '98%', minHeight: '70vh' }}>{ pathU === 'Saved Searches' ? <div>hello</div> : pathU === 'New Search' ?<AdvanceSearch setPathState={setPathU}/> : <div>listing</div>}</main>
      </div>
    </>
  );
}

export default SearchResultLayout;
