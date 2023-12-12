'use client';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the useRouter hook
import React, { useEffect, useState } from 'react';
import styles from './my-cart.module.scss';
import CustomHeader from '@/components/common/header';
import { useGetCartQuery } from '@/features/api/cart';
import {
  ACTIVE_STATUS,
  MEMO_OUT_STATUS,
  SOLD_OUT_STATUS
} from '@/constants/business-logic';
import { ProductItem } from './interface';

function MyCart({ children }: { children: React.ReactNode }) {
  // Get the current pathname using the usePathname hook
  const currentPath = usePathname();
  // State variables for handling scroll visibility
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  // State variables for counting items in different cart statuses
  const [activeTabCount, setActiveTabCount] = useState(0);
  const [soldCount, setSoldCount] = useState(0);
  const [memoCount, setMemoCount] = useState(0);

  // Header data for CustomHeader component
  const headerData = {
    headerHeading: 'My Cart'
  };

  // Fetch cart data using the useGetCartQuery hook
  const { data } = useGetCartQuery({});

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
    }
  ];

  // useEffect to update active tab count when cart data changes
  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const activeDiamondItems = data?.cart?.items
          .filter(
            (item: ProductItem) =>
              item?.product?.diamond_status === ACTIVE_STATUS
          )
          .map((row: ProductItem) => row?.product);

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
          .filter(
            (item: ProductItem) =>
              item?.product?.diamond_status === SOLD_OUT_STATUS
          )
          .map((row: ProductItem) => row?.product);

        setSoldCount(soldOutItems?.length);
      }
    };
    updateRows();
  }, [data]);

  // // useEffect to update memo out count when cart data changes
  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const memoOutDiamondItems = data?.cart?.items
          .filter(
            (item: ProductItem) =>
              item?.product?.diamond_status === MEMO_OUT_STATUS
          )
          .map((row: ProductItem) => row?.product);

        setMemoCount(memoOutDiamondItems?.length);
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
        <div className="absolute top-[165px] left-[122px] flex flex-row items-start justify-start gap-[40px] w-full bg-solitairePrimary">
          {myCartRoutes.map(({ id, pathName, path, count }) => {
            // Check if the current route matches the link's path
            const isActive = currentPath === `/my-cart/${path}`;

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
          marginTop: '70px',
          width: '100%'
        }}
      >
        <main style={{ width: '98%', minHeight: '70vh' }}>{children}</main>
      </div>
    </>
  );
}

export default MyCart;
