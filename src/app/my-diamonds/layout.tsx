'use client';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the useRouter hook
import React, { ChangeEvent, useEffect, useState } from 'react';
import CustomHeader from '@/components/common/header';
import styles from './my-diamonds.module.scss';
import { CustomCalender } from '@/components/common/calender';
import { DateRange } from 'react-day-picker';
import { SearchIcon } from 'lucide-react';
import { CustomSearchInputField } from '@/components/common/search-input';

function MyDiamonds({ children }: { children: React.ReactNode }) {
  let currentPath = usePathname();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [date, setDate] = useState<DateRange | undefined>();
  const [search, setSearch] = useState<string>('');

  let myDiamondsRoutes = [
    {
      id: '1',
      pathName: ManageLocales('app.myDiamonds.RecentConfirmations'),
      path: 'recent-confirmation',
    },
    {
      id: '2',
      pathName: ManageLocales('app.myDiamonds.MyInvoices'),
      path: 'my-invoices',
    },
    {
      id: '3',
      pathName: ManageLocales('app.myDiamonds.PreviousConfirmations'),
      path: 'previous-confirmation',
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

  //Header Data
  const headerData = {
    headerHeading: 'My Diamonds',
  };

  const handleDate = () => {
    setDate(undefined);
  };

  let searchInputStyle = {
    searchInput: styles.headerInputStyle,
    searchInputMain: 'relative',
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    setSearch(inputValue);
    // Use the debounce function to wrap the debouncedSave function
    // const delayedSave = debounce(
    //   (inputValue) => debouncedSave(inputValue),
    //   1000
    // );
    // delayedSave(inputValue);
    // if (inputValue.length < 1) {
    //   setSearchByName('');
    // }
  };

  return (
    <>
      <div className="sticky top-0 bg-solitairePrimary mt-10 overflow-y-scroll">
        <CustomHeader
          data={headerData}
          mainDivStyle={styles.mainHeaderStyle}
          visibleStyle={styles.visibleStyle}
        />
      </div>
      <div
        className={`${styles.navBar} ${
          visible ? styles.visible : styles.hidden
        }`}
      >
        <div className="absolute top-[160px] left-[122px] flex items-start justify-between w-[90%] bg-solitairePrimary pt-2">
          <div className="flex gap-[40px]">
            {myDiamondsRoutes.map(({ id, pathName, path }) => {
              // Check if the current route matches the link's path
              const isActive = currentPath === `/my-diamonds/${path}`;

              return (
                <Link
                  className={`flex flex-row p-2.5 items-center justify-center text-solitaireTertiary ${
                    isActive
                      ? 'border-b-[1px] border-solid border-solitaireQuaternary'
                      : 'hover:text-solitaireQuaternary'
                  }`}
                  href={`${path}`}
                  key={id}
                >
                  <div className={`${isActive && 'text-solitaireQuaternary'}`}>
                    {pathName}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex gap-[20px]">
            <div className="flex gap-[15px]">
              <SearchIcon className="stroke-solitaireQuaternary mt-[10px]" />
              <CustomSearchInputField
                type="text"
                name="Search"
                style={searchInputStyle}
                value={search}
                onChange={handleSearch}
                placeholder={
                  currentPath === '/my-diamonds/recent-confirmation'
                    ? ManageLocales(
                        'app.myDiamonds.RecentConfirmations.header.searchByOrderId'
                      )
                    : ManageLocales(
                        'app.myDiamonds.MyInvoices.header.searchByInvoiceId'
                      )
                }
                // handleSuggestionClick={data.handleSuggestionClick}
                // suggestions={data.suggestions}
              />
            </div>
            <div className="flex mr-[30px] ">
              <CustomCalender date={date} handleDate={handleDate} />
            </div>
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

export default MyDiamonds;
