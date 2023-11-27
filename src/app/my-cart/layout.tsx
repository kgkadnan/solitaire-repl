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
  SOLD_OUT_STATUS,
} from '@/constants/constant';

function MyCart({ children }: { children: React.ReactNode }) {
  let currentPath = usePathname();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeTabCount, setActiveTabCount] = useState(0);
  const [soldOutCount, setSoldOutCount] = useState(0);
  const [memoOutCount, setMemoOutCount] = useState(0);

  const { data } = useGetCartQuery({});

  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const activeDiamondItems = data.items
          .filter(
            (item: any) => item?.product?.diamond_status === ACTIVE_STATUS
          )
          .map((row: any) => row.product);
        setActiveTabCount(activeDiamondItems?.length);
      }
    };

    updateRows();
  }, [data]);

  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const soldOutItems = data.items
          .filter(
            (item: any) => item?.product?.diamond_status === SOLD_OUT_STATUS
          )
          .map((row: any) => row.product);

        setSoldOutCount(soldOutItems?.length);
      }
    };

    updateRows();
  }, [data]);

  useEffect(() => {
    const updateRows = () => {
      if (data) {
        const memoOutDiamondItems = data.items
          .filter(
            (item: any) => item?.product?.diamond_status === MEMO_OUT_STATUS
          )
          .map((row: any) => row.product);

        setMemoOutCount(memoOutDiamondItems?.length);
      }
    };

    updateRows();
  }, [data]);

  let myCartRoutes = [
    {
      id: '1',
      pathName: ManageLocales('app.myCart.active'),
      path: 'active',
      count: activeTabCount,
    },
    {
      id: '2',
      pathName: ManageLocales('app.myCart.soldOut'),
      path: 'sold-out',
      count: soldOutCount,
    },
    {
      id: '3',
      pathName: ManageLocales('Memo-Out'),
      path: 'memo-out',
      count: memoOutCount,
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
    headerHeading: 'My Cart',
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
          width: '100%',
        }}
      >
        <main style={{ width: '98%', minHeight: '70vh' }}>{children}</main>
      </div>
    </>
  );
}

export default MyCart;
