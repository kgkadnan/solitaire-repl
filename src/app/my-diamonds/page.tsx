'use client';
import React, { useEffect } from 'react';
import CustomHeader from '@/components/common/header';
import styles from './my-diamonds.module.scss';
import {
  useCardMyInvoiceQuery,
  useCardPreviousConfirmationQuery,
  useCardRecentConfirmationQuery
} from '@/features/api/my-diamonds/my-diamond';
import RecentConfirmation from './component/recent-confirmation';
import MyInvoices from './component/my-invoice';
import PreviousConfirmation from './component/previous-confirmation';
import {
  MAX_RECENT_CONFIRMATION_COUNT,
  MAX_MY_INVOICE_LIMIT_COUNT
} from '@/constants/business-logic';
import { FilterByDays } from './component/filter-by-days';
import { Tabs } from './component/tabs';
import { HeaderSearchBar } from './component/header-search-bar';
import { useCommonStateManagement } from './hooks/state-management';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import { CustomDialog } from '@/components/common/dialog';
import { CustomModal } from '@/components/common/modal';

const MyDiamonds = () => {
  const { commonState, commonSetState } = useCommonStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();

  const { dialogContent, isDialogOpen, isModalOpen, modalContent } = modalState;
  const { setIsDialogOpen, setIsModalOpen } = modalSetState;
  const {
    prevScrollPos,
    visible,
    recentConfiramtionSearchUrl,
    myInvoiceSearchUrl,
    previousConfirmationSearchUrl,
    recentConfirmData,
    activeTab,
    myInvoiceData,
    previousConfirmData,
    offset,
    limit,
    recentConfirmationSelectedDays,
    myInvoiceSelectedDays,
    previousConfirmationSelectedDays
  } = commonState;

  const {
    setPrevScrollPos,
    setVisible,
    setRecentConfiramtionSearchUrl,
    setMyInvoiceSearchUrl,
    setPreviousConfirmationSearchUrl,
    setRecentConfirmData,
    setActiveTab,
    setMyInvoiceData,
    setPreviousConfirmData,
    setOffset,
    setLimit,
    setRecentConfirmationSelectedDays,
    setMyInvoiceSelectedDays,
    setPreviousConfirmationSelectedDays
  } = commonSetState;

  //Header Data
  const headerData = {
    headerHeading: 'My Diamonds'
  };

  // Query parameters for API request
  let resentConfiramtionStatus = 'pending';
  let resentConfiramtionInvoiceStatus = 'pending';
  let expand = 'items';
  let myInvoiceStatus = 'pending';
  let myInvoiceInvoiceStatus = 'available';
  let previousConfirmStatus = 'completed';
  let recentConfirmlimit = MAX_RECENT_CONFIRMATION_COUNT;
  let myInvoicelimit = MAX_MY_INVOICE_LIMIT_COUNT;

  // Fetch recent confirmation data
  const { data: myDiamondRecentConfirmData } = useCardRecentConfirmationQuery({
    resentConfiramtionStatus,
    resentConfiramtionInvoiceStatus,
    expand,
    recentConfiramtionSearchUrl,
    recentConfirmlimit,
    recentConfirmationSelectedDays
  });

  // Fetch my-invoice data
  const { data: myDiamondPendingInvoiceData } = useCardMyInvoiceQuery({
    myInvoiceStatus,
    myInvoiceInvoiceStatus,
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

  // useEffect to update recentConfirmData when myDiamondRecentConfirmData changes
  useEffect(() => {
    setRecentConfirmData(myDiamondRecentConfirmData?.orders);
  }, [myDiamondRecentConfirmData]);

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

  // useEffect(() => {
  //   if (isDialogOpen) {
  //     // Set a timeout to close the dialog box after a delay (e.g., 5000 milliseconds)
  //     const timeoutId = setTimeout(() => {
  //       setIsDialogOpen(false);
  //     }, 3500);

  //     // Cleanup the timeout when the component unmounts or when isDialogOpen changes
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isDialogOpen, setIsDialogOpen]);

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
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            recentConfirmCount={recentConfirmData?.length}
            myInvoiceDataCount={myInvoiceData?.length}
            previousConfirmCount={previousConfirmData?.length}
          />
          <div className="flex gap-[20px] mr-[50px]">
            <HeaderSearchBar
              activeTab={activeTab}
              setRecentConfiramtionSearchUrl={setRecentConfiramtionSearchUrl}
              setMyInvoiceSearchUrl={setMyInvoiceSearchUrl}
              setPreviousConfirmationSearchUrl={
                setPreviousConfirmationSearchUrl
              }
            />
            <FilterByDays
              activeTab={activeTab}
              setRecentConfirmationSelectedDays={
                setRecentConfirmationSelectedDays
              }
              setMyInvoiceSelectedDays={setMyInvoiceSelectedDays}
              setPreviousConfirmationSelectedDays={
                setPreviousConfirmationSelectedDays
              }
            />
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
          <CustomDialog
            setIsOpen={setIsDialogOpen}
            isOpens={isDialogOpen}
            dialogContent={dialogContent}
          />
          <CustomModal
            isOpens={isModalOpen}
            setIsOpen={setIsModalOpen}
            dialogContent={modalContent}
            modalStyle={styles.modalStyle}
          />
          {activeTab === 'Recent Confirmations' ? (
            <RecentConfirmation
              recentConfirmData={recentConfirmData}
              modalSetState={modalSetState}
            />
          ) : activeTab === 'My Invoices' ? (
            <MyInvoices
              myInvoiceData={myInvoiceData}
              modalSetState={modalSetState}
            />
          ) : (
            <PreviousConfirmation
              previousConfirmData={previousConfirmData}
              setOffset={setOffset}
              setLimit={setLimit}
              limit={limit}
              modalSetState={modalSetState}
            />
          )}
        </main>
      </div>
    </>
  );
};

export default MyDiamonds;
