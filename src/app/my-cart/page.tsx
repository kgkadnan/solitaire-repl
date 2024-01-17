'use client';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // Import the useRouter hook
import React, { useEffect, useState } from 'react';
import styles from './my-cart.module.scss';
import CustomHeader from '@/components/common/header';
import { useGetCartQuery } from '@/features/api/cart';
import {
  AVAILABLE_STATUS,
  HOLD_STATUS,
  MEMO_STATUS,
  SOLD_STATUS
} from '@/constants/business-logic';
import { IProductItem } from './interface/interface';
import MemoOut from './components/memo/memo';
import ActiveMyCart from './components/active/active';
import OutOfStock from './components/sold/sold';
import { IManageListingSequenceResponse } from '../my-account/manage-diamond-sequence/interface';
import { useGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { useDataTableStateManagement } from '@/components/common/data-table/hooks/data-table-state-management';
import { CustomDialog } from '@/components/common/dialog';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import { useCheckboxStateManagement } from '@/components/common/checkbox/hooks/checkbox-state-management';
import { useErrorStateManagement } from '@/hooks/error-state-management';
import { performDownloadExcel } from '@/utils/perform-download-excel';
import { useDownloadExcelMutation } from '@/features/api/download-excel';

import { NoDataFound } from '@/components/common/no-data-found';
import { CustomModal } from '@/components/common/modal';
import { SELECT_STONES } from '@/constants/error-messages/cart';
import HoldStones from './components/hold/hold';
import { handleRenderCartPages } from './healper/handle-render-cart-pages';

function MyCart() {
  // Get the current pathname using the usePathname hook

  const subRoute = useSearchParams().get('active-tab');
  const computeRouteAndComponentRenderer = () => {
    if (subRoute === `memo`) return 'memo';
    else if (subRoute === `active`) return 'active';
    else if (subRoute === `hold`) return 'hold';
    else if (subRoute === 'sold') {
      return 'sold';
    } else if (
      subRoute !== `memo` &&
      subRoute !== `active` &&
      subRoute !== `hold` &&
      subRoute !== `sold`
    ) {
      return 'no data found';
    }
  };

  // State variables for handling scroll visibility
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  // State variables for counting items in different cart statuses
  const [activeTabCount, setActiveTabCount] = useState(0);
  const [soldCount, setSoldCount] = useState(0);
  const [memoCount, setMemoCount] = useState(0);
  const [holdCount, setHoldCount] = useState(0);

  const [headerPath, setheaderPath] = useState<any>(
    computeRouteAndComponentRenderer()
  );

  /**
   * Initializes state variables for memo rows, active cart rows, and sold out rows.
   * @returns None
   */
  const [memoRows, setMemoRows] = useState([]);
  const [holdRows, setHoldRows] = useState([]);
  const [soldOutRows, setSoldOutRows] = useState([]);
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { tableColumns } = dataTableState;
  const { setTableColumns } = dataTableSetState;
  const { modalState, modalSetState } = useModalStateManagement();
  const {
    dialogContent,
    isDialogOpen,
    isPersistDialogOpen,
    persistDialogContent,
    isModalOpen,
    modalContent
  } = modalState;

  const {
    setDialogContent,
    setIsDialogOpen,
    setIsPersistDialogOpen,
    setIsModalOpen
  } = modalSetState;

  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { isCheck } = checkboxState;
  const { setIsCheck, setIsCheckAll } = checkboxSetState;

  const { errorState, errorSetState } = useErrorStateManagement();
  const { setIsError, setErrorText } = errorSetState;

  // Mutation for downloading Excel memoOutData
  let [downloadExcel] = useDownloadExcelMutation();

  // Fetching table columns for managing listing sequence
  const { data: listingColumns } =
    useGetManageListingSequenceQuery<IManageListingSequenceResponse>({});

  // Header data for CustomHeader component
  const headerData = {
    headerHeading: 'My Cart'
  };

  // Fetch cart data using the useGetCartQuery hook
  const { data, refetch } = useGetCartQuery({});

  // Define routes for different tabs in My Cart
  const myCartRoutes = [
    {
      id: '1',
      pathName: ManageLocales('app.myCart.active'),
      path: 'active',
      count: activeTabCount
    },
    {
      id: '2',
      pathName: ManageLocales('app.myCart.sold'),
      path: 'sold',
      count: soldCount
    },
    {
      id: '3',
      pathName: ManageLocales('app.myCart.memo'),
      path: 'memo',
      count: memoCount
    },
    {
      id: '4',
      pathName: ManageLocales('app.myCart.hold'),
      path: 'hold',
      count: holdCount
    }
  ];

  useEffect(() => {
    setheaderPath(computeRouteAndComponentRenderer());
  }, [subRoute]);

  // useEffect to update active tab count when cart data changes
  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const activeDiamondItems = data?.cart?.items
          ?.filter(
            (item: IProductItem) =>
              item?.product?.diamond_status === AVAILABLE_STATUS
          )
          .map((row: IProductItem) => row?.product);

        setActiveTabCount(activeDiamondItems?.length);
      }
    };
    updateRows();
  }, [data]);

  // // useEffect to update sold out count when cart data changes
  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const soldOutItems = data?.cart?.items
          ?.filter(
            (item: IProductItem) =>
              item?.product?.diamond_status === SOLD_STATUS
          )
          .map((row: IProductItem) => row?.product);

        setSoldCount(soldOutItems?.length);
        setSoldOutRows(soldOutItems);
      }
    };
    updateRows();
  }, [data]);

  // useEffect to update memo out count when cart data changes
  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const memoOutDiamondItems = data?.cart?.items
          ?.filter(
            (item: IProductItem) =>
              item?.product?.diamond_status === MEMO_STATUS
          )
          .map((row: IProductItem) => row?.product);

        setMemoCount(memoOutDiamondItems?.length);
        setMemoRows(memoOutDiamondItems);
      }
    };
    updateRows();
  }, [data]);

  // useEffect to update memo out count when cart data changes
  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const memoOutDiamondItems = data?.cart?.items
          ?.filter(
            (item: IProductItem) =>
              item?.product?.diamond_status === HOLD_STATUS
          )
          .map((row: IProductItem) => row?.product);

        setHoldCount(memoOutDiamondItems?.length);
        setHoldRows(memoOutDiamondItems);
      }
    };
    updateRows();
  }, [data]);

  // Attach scroll event listener when the component mounts
  useEffect(() => {
    // Handle scroll events to show/hide the navigation bar
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

  const handleSearchTab = (path: any) => {
    setheaderPath(path);
    setIsCheckAll(false);
    setIsCheck([]);
  };

  // Effect hook to update table columns when they change
  useEffect(() => {
    setTableColumns(listingColumns);
  }, [listingColumns, setTableColumns]);

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

  // Handle download of Excel based on user selection (All or Selected)
  const downloadExcelFunction = () => {
    if (isCheck.length === 0) {
      setIsError(true);
      setErrorText(SELECT_STONES);
    } else if (isCheck.length) {
      performDownloadExcel({
        products: isCheck,
        downloadExcelApi: downloadExcel,
        setDialogContent,
        setIsDialogOpen,
        setIsCheck,
        setIsCheckAll,
        setIsError
      });
    }
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
        <div className="absolute top-[165px] left-[122px] flex flex-row items-start justify-start  gap-[40px] w-full bg-solitairePrimary">
          {myCartRoutes.map(({ id, pathName, path, count }) => {
            return (
              <Link
                className={`flex flex-row p-2.5 items-center justify-center text-solitaireTertiary ${
                  headerPath === path ? '' : 'hover:text-solitaireQuaternary'
                }`}
                onClick={() => handleSearchTab(path)}
                href={`/my-cart?active-tab=${path}`}
                key={id}
              >
                <div
                  className={`${
                    headerPath === path &&
                    'text-solitaireQuaternary border-b-[1px] border-solid border-solitaireQuaternary'
                  }`}
                >
                  {pathName} {count > 0 && `(${count})`}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '50px',
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
          <CustomDialog
            isOpens={isPersistDialogOpen}
            setIsOpen={setIsPersistDialogOpen}
            dialogContent={persistDialogContent}
          />

          {handleRenderCartPages({
            headerPath,
            tableColumns,
            memoRows,
            downloadExcelFunction,
            errorSetState,
            errorState,
            checkboxState,
            checkboxSetState,
            modalSetState,
            refetch,
            modalState,
            data,
            holdRows,
            soldOutRows
          })}
        </main>
      </div>
    </>
  );
}

export default MyCart;
