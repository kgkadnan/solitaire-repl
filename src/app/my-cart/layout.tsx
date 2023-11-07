'use client';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the useRouter hook
import React, { useEffect, useState } from 'react';
import styles from './my-cart.module.scss';

function MyCart({ children }: { children: React.ReactNode }) {
  let currentPath = usePathname();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  let myProfileRoutes = [
    {
      id: '1',
      pathName: ManageLocales('app.myCart.active'),
      path: 'active',
    },
    {
      id: '2',
      pathName: ManageLocales('app.myCart.outOfStock'),
      path: 'out-of-stock',
    },
    {
      id: '3',
      pathName: ManageLocales('Memo-Out'),
      path: 'memo-out',
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

  return (
    <>
      <div
        className={`${styles.navBar} ${
          visible ? styles.visible : styles.hidden
        }`}
      >
        <div className="absolute top-[150px] left-[122px] flex flex-row items-start justify-start gap-[40px] w-full bg-solitairePrimary py-4">
          {myProfileRoutes.map(({ id, pathName, path }) => {
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
                  {pathName}
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
