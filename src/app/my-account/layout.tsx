'use client';
import CustomHeader from '@/components/common/header';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the useRouter hook
import React from 'react';

function MyAccountLayout({ children }: { children: React.ReactNode }) {
  let currentPath = usePathname();

  let headerData = {
    headerHeading: ManageLocales('Welcome to your account'),
  };

  let routes = [
    {
      id: '1',
      pathName: 'Summary',
      path: '/summary',
    },
    {
      id: '2',
      pathName: 'KYC',
      path: '/kyc',
    },
    { id: '3', pathName: 'Change Password', path: '/change-password' },
    {
      id: '4',
      pathName: 'Manage Diamond Sequence',
      path: '/manage-diamond-sequence', // Corrected the path name
    },
    { id: '5', pathName: 'Email Notification', path: '/email-notification' },
    { id: '6', pathName: 'Report Bug', path: '/report-bug' },
  ];

  return (
    <>
      <div className="sticky top-0 bg-solitairePrimary mt-16 overflow-y-scroll">
        <CustomHeader data={headerData} />
      </div>

      <div className="absolute top-[172px] left-[122px] flex flex-row items-start justify-start gap-[40px]">
        {routes.map(({ id, pathName, path }) => {
          // Check if the current route matches the link's path
          const isActive = currentPath === `/my-account${path}`;

          console.log('isActive', isActive);

          return (
            <Link
              className={`flex flex-row p-2.5 items-center justify-center text-solitaireTertiary ${
                isActive
                  ? 'border-b-[1px] border-solid border-solitaireQuaternary text-solitaireQuaternary'
                  : 'hover:text-solitaireQuaternary'
              }`}
              href={`/my-account${path}`}
              key={id}
            >
              <div className="relative">{pathName}</div>
            </Link>
          );
        })}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'right',
          marginTop: '110px',
          padding: '0px 30px',
        }}
      >
        <main style={{ width: 'calc(100% - 92px)', minHeight: '76vh' }}>
          {children}
        </main>
      </div>
    </>
  );
}

export default MyAccountLayout;
