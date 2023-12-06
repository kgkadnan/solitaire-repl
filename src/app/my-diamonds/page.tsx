'use client';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import CustomHeader from '@/components/common/header';
import styles from './my-diamonds.module.scss';
import { CustomCalender } from '@/components/common/calender';
import { DateRange } from 'react-day-picker';
import { SearchIcon } from 'lucide-react';
import { CustomSearchInputField } from '@/components/common/search-input';
import {
  useCardMyInvoiceQuery,
  useCardPreviousConfirmationQuery,
  useCardRecentConfirmationQuery
} from '@/features/api/my-diamonds/my-diamond';
import RecentConfirmation from './recent-confirmation';
import MyInvoices from './my-invoice';
import PreviousConfirmation from './previous-confirmation';
import { IDateRange } from '../search/saved-interface';
import { formatNumberWithLeadingZeros } from '@/utils/formatNumberWithLeadingZeros';
import { PAGINATION_INTITAL_LIMMIT } from '@/constants/business-logic';

function MyDiamonds() {
  // State variables for handling scroll, date, search, and data
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [date, setDate] = useState<DateRange | undefined>();
  const [search, setSearch] = useState<string>('');
  const [recentConfirmData, setRecentConfirmData] = useState([]);
  const [originalData, setOriginalData] = useState(recentConfirmData);
  const [filteredData, setFilteredData] = useState(recentConfirmData);
  const [activeTab, setActiveTab] = useState<string>('Recent Confirmations');
  const [dateSearchUrl, setDateSearchUrl] = useState('');
  const [myInvoiceData, setMyInvoiceData] = useState([]);
  const [previousConfirmData, setPreviousConfirmData] = useState([]);
  const [myDiamondStatus, setMyDiamondStatus] = useState('');
  const [invoiceStatus, setInvoiceStatus] = useState('');
  const [previousConfirmStatus, setPreviousConfirmStatus] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(PAGINATION_INTITAL_LIMMIT);

  // Define routes for different tabs in My Diamonds
  let myDiamondsRoutes = [
    {
      id: '1',
      pathName: ManageLocales('app.myDiamonds.RecentConfirmations'),
      count: recentConfirmData?.length
    },
    {
      id: '2',
      pathName: ManageLocales('app.myDiamonds.MyInvoices'),
      count: myInvoiceData?.length
    },
    {
      id: '3',
      pathName: ManageLocales('app.myDiamonds.PreviousConfirmations'),
      count: previousConfirmData?.length
    }
  ];

  //Header Data
  const headerData = {
    headerHeading: 'My Diamonds'
  };

  // Style for the search input
  let searchInputStyle = {
    searchInput: styles.headerInputStyle,
    searchInputMain: 'relative'
  };

  // Query parameters for API request
  let resentConfiramtionStatus = 'pending';
  let fulfillmentStatus = 'not_fulfilled';
  let paymentStatus = 'awaiting';
  let fields = 'id,display_id,total';
  let expand = 'items';

  // Fetch recent confirmation data
  const { data: myDiamondRecentConfirmData } = useCardRecentConfirmationQuery(
    {
      resentConfiramtionStatus,
      fulfillmentStatus,
      paymentStatus,
      fields,
      expand,
      dateSearchUrl
    },
    {
      skip: activeTab !== 'Recent Confirmations'
    }
  );

  // Fetch my-invoice data
  const { data: myDiamondPendingInvoiceData } = useCardMyInvoiceQuery(
    {
      myDiamondStatus,
      invoiceStatus,
      dateSearchUrl
    },
    {
      skip: activeTab !== 'My Invoices'
    }
  );

  // Fetch previous-confiramtion-data
  const { data: previousConfirmationData } = useCardPreviousConfirmationQuery(
    {
      limit,
      offset,
      previousConfirmStatus,
      dateSearchUrl
    },
    {
      skip: activeTab !== 'Previous Confirmations'
    }
  );

  // Handle date selection in the calendar
  const handleDate = (date: IDateRange) => {
    const fromDate = date?.from?.toISOString().split('T')[0];
    const toDate = date?.to?.toISOString().split('T')[0];

    if (!date) {
      setDateSearchUrl('');
      setDate(undefined);
    } else {
      setDate(date);
      setDateSearchUrl(`created_at[gt]=${fromDate}&created_at[lt]=${toDate}`);
    }
  };

  // Handle search input change
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);

    // Determine the field to search based on the active tab
    const searchField =
      activeTab === 'Recent Confirmations' ? 'display_id' : 'invoice_id';

    // Filter orders based on the search input and the selected tab
    const filtered = originalData?.filter((items: any) => {
      let convertToPad =
        activeTab === 'Recent Confirmations'
          ? formatNumberWithLeadingZeros(items?.[searchField])
          : items?.[searchField];
      return String(convertToPad).includes(inputValue);
    });

    setFilteredData(filtered || originalData);
  };

  const handleInvoice = () => {
    setMyDiamondStatus('pending');
    setInvoiceStatus('available');
  };

  const handlePreviousConfirmation = () => {
    setPreviousConfirmStatus('completed');
  };

  // Handle tab click to set the active tab and page render check
  const handleClick = (pathName: string) => {
    setActiveTab(pathName);
    if (pathName === 'My Invoices') {
      handleInvoice();
    } else if (pathName === 'Previous Confirmations') {
      handlePreviousConfirmation();
    }
  };

  // useEffect to update originalData and filteredData when recentConfirmData changes
  useEffect(() => {
    setOriginalData(recentConfirmData);
    setFilteredData(recentConfirmData);
  }, [recentConfirmData]);

  // useEffect to update recentConfirmData when myDiamondRecentConfirmData changes
  useEffect(() => {
    setRecentConfirmData(myDiamondRecentConfirmData?.orders);
    setFilteredData(recentConfirmData);
  }, [myDiamondRecentConfirmData, setFilteredData, recentConfirmData]);

  // useEffect to update recentConfirmData when myDiamondRecentConfirmData changes
  useEffect(() => {
    setMyInvoiceData(myDiamondPendingInvoiceData?.orders);
    // setOriginalData(myDiamondPendingInvoiceData?.orders);
  }, [myDiamondPendingInvoiceData]);

  useEffect(() => {
    setPreviousConfirmData(previousConfirmationData?.orders);
    // setOriginalData(myDiamondPendingInvoiceData?.orders);
  }, [previousConfirmationData]);

  // useEffect to add/remove scroll event listener
  useEffect(() => {
    // Handle scroll events to show/hide the header
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

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
            {myDiamondsRoutes.map(({ id, pathName, count }) => {
              return (
                <Link
                  className={`flex flex-row p-2.5 items-center justify-center text-solitaireTertiary ${
                    activeTab === pathName
                      ? 'border-b-[1px] border-solid border-solitaireQuaternary'
                      : 'hover:text-solitaireQuaternary'
                  }`}
                  onClick={() => handleClick(pathName)}
                  href=""
                  key={id}
                >
                  <div
                    className={`${
                      activeTab === pathName && 'text-solitaireQuaternary'
                    }`}
                  >
                    {pathName}
                    {count > 0 && ` (${count})`}
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
                  activeTab === 'Recent Confirmations'
                    ? ManageLocales(
                        'app.myDiamonds.RecentConfirmations.header.searchByOrderId'
                      )
                    : ManageLocales(
                        'app.myDiamonds.MyInvoices.header.searchByInvoiceId'
                      )
                }
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
          width: '100%'
        }}
      >
        <main style={{ width: '98%', minHeight: '70vh' }}>
          {activeTab === 'Recent Confirmations' ? (
            <RecentConfirmation recentConfirmData={filteredData} />
          ) : activeTab === 'My Invoices' ? (
            <MyInvoices myInvoiceData={myInvoiceData} />
          ) : (
            <PreviousConfirmation
              previousConfirmData={previousConfirmData}
              setOffset={setOffset}
              setLimit={setLimit}
              limit={limit}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default MyDiamonds;
