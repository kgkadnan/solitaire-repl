'use client';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import CustomHeader from '@/components/common/header';
import styles from './my-diamonds.module.scss';
import CalenderIcon from '@public/assets/icons/calender.svg';
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
import {
  MAX_RECENT_CONFIRMATION_COUNT,
  PAGINATION_INTITAL_LIMMIT
} from '@/constants/business-logic';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover';
import Image from 'next/image';
import { RadioButton } from '@components/common/custom-input-radio';

function MyDiamonds() {
  // State variables for handling scroll, date, search, and data
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [recentConfiramtionSearchUrl, setRecentConfiramtionSearchUrl] =
    useState<string>('');
  const [myInvoiceSearchUrl, setMyInvoiceSearchUrl] = useState<string>('');
  const [previousConfirmationSearchUrl, setPreviousConfirmationSearchUrl] =
    useState<string>('');
  const [recentConfirmData, setRecentConfirmData] = useState([]);
  const [activeTab, setActiveTab] = useState<string>('Recent Confirmations');
  const [myInvoiceData, setMyInvoiceData] = useState([]);
  const [previousConfirmData, setPreviousConfirmData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(PAGINATION_INTITAL_LIMMIT);
  const [recentConfirmationSelectedDays, setRecentConfirmationSelectedDays] =
    useState<string>('');
  const [search, setsearch] = useState<string>('');
  const [myInvoiceSelectedDays, setMyInvoiceSelectedDays] =
    useState<string>('');
  const [
    previousConfirmationSelectedDays,
    setPreviousConfirmationSelectedDays
  ] = useState<string>('');

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
  let myDiamondStatus = 'pending';
  let invoiceStatus = 'available';
  let previousConfirmStatus = 'completed';
  let recentConfirmlimit = MAX_RECENT_CONFIRMATION_COUNT;
  let myInvoicelimit = MAX_RECENT_CONFIRMATION_COUNT;

  // Fetch recent confirmation data
  const { data: myDiamondRecentConfirmData } = useCardRecentConfirmationQuery({
    resentConfiramtionStatus,
    fulfillmentStatus,
    paymentStatus,
    fields,
    expand,
    recentConfiramtionSearchUrl,
    recentConfirmlimit,
    recentConfirmationSelectedDays
  });

  // Fetch my-invoice data
  const { data: myDiamondPendingInvoiceData } = useCardMyInvoiceQuery({
    myDiamondStatus,
    invoiceStatus,
    myInvoiceSearchUrl,
    myInvoicelimit,
    myInvoiceSelectedDays
  });

  // Fetch previous-confiramtion-data
  const { data: previousConfirmationData } = useCardPreviousConfirmationQuery({
    limit,
    offset,
    previousConfirmStatus,
    previousConfirmationSearchUrl,
    previousConfirmationSelectedDays
  });
  const handleMyDiamondsRadioChange = (value: string) => {
    const calculateDaysAgo = (days: number) => {
      const dateAgo = new Date();
      dateAgo.setDate(dateAgo.getDate() - days);
      return dateAgo.toISOString();
    };

    let selectedDays: string = '';

    if (value === '7') {
      selectedDays = calculateDaysAgo(7);
    } else if (value === '30') {
      selectedDays = calculateDaysAgo(30);
    } else if (value === '90') {
      selectedDays = calculateDaysAgo(90);
    }

    switch (activeTab) {
      case 'Recent Confirmations':
        setRecentConfirmationSelectedDays(selectedDays);
        break;
      case 'My Invoices':
        setMyInvoiceSelectedDays(selectedDays);
        break;
      default:
        setPreviousConfirmationSelectedDays(selectedDays);
        break;
    }
  };

  const myDiamondsRadioButtons = [
    {
      name: 'days',
      onChange: handleMyDiamondsRadioChange,
      id: '1',
      value: '7',
      label: 'Last Week',
      checked: false
    },
    {
      name: 'days',
      onChange: handleMyDiamondsRadioChange,
      id: '2',
      value: '30',
      label: 'Last Month',
      checked: false
    },
    {
      name: 'days',
      onChange: handleMyDiamondsRadioChange,
      id: '3',
      value: '90',
      label: 'Last 3 Months',
      checked: true
    }
  ];

  // Handle search input change
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setsearch(inputValue);

    if (!inputValue.length) {
      setRecentConfiramtionSearchUrl('');
      setMyInvoiceSearchUrl('');
      setPreviousConfirmationSearchUrl('');
    } else {
      if (activeTab === 'Recent Confirmations') {
        setRecentConfiramtionSearchUrl(`display_id=${inputValue}`);
      } else if (activeTab === 'My Invoices') {
        setMyInvoiceSearchUrl(`invoice_id=${inputValue}`);
      } else {
        setPreviousConfirmationSearchUrl(`invoice_id=${inputValue}`);
      }
    }
  };

  // Handle tab click to set the active tab and page render check
  const handleClick = (pathName: string) => {
    setActiveTab(pathName);
  };

  // useEffect to update recentConfirmData when myDiamondRecentConfirmData changes
  useEffect(() => {
    setRecentConfirmData(myDiamondRecentConfirmData?.orders);
  }, [myDiamondRecentConfirmData, recentConfirmData]);

  // useEffect to update recentConfirmData when myDiamondRecentConfirmData changes
  useEffect(() => {
    setMyInvoiceData(myDiamondPendingInvoiceData?.orders);
  }, [myDiamondPendingInvoiceData]);

  useEffect(() => {
    setPreviousConfirmData(previousConfirmationData?.orders);
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
            <div className="flex">
              <Popover>
                <PopoverTrigger className="flex justify-center mt-3 ml-5">
                  <Image
                    src={CalenderIcon}
                    alt="Calender Image"
                    width={24}
                    height={24}
                  />
                  <p className="text-solitaireTertiary ml-2 text-[14px]">
                    Filter By Days
                  </p>
                </PopoverTrigger>
                <PopoverContent className={styles.popoverContent}>
                  <div className="">
                    {myDiamondsRadioButtons?.map((radioData: any) => (
                      <div className="mb-3" key={radioData.id}>
                        <RadioButton
                          radioMetaData={radioData}
                          key={radioData?.id}
                        />
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
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
            <RecentConfirmation recentConfirmData={recentConfirmData} />
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
