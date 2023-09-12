'use client';
import CustomHeader from '@/components/common/header';
import { ManageLocales } from '@/utils/translate';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the useRouter hook
import React from 'react';

function MyAccountLayout({ children }: { children: React.ReactNode }) {
  let currentPath = usePathname();

  let myAccountHeader = {
    headerHeading: ManageLocales('app.myProfile.heading'),
  };

  let myProfileRoutes = [
    {
      id: '1',
      pathName: ManageLocales('app.myProfile.summary'),
      path: '/summary',
    },
    {
      id: '2',
      pathName: ManageLocales('app.myProfile.kyc'),
      path: '/kyc',
    },
    {
      id: '3',
      pathName: ManageLocales('app.myProfile.changePassword'),
      path: '/change-password',
    },
    {
      id: '4',
      pathName: ManageLocales('app.myProfile.manageDiamondSequence'),
      path: '/manage-diamond-sequence', // Corrected the path name
    },
    {
      id: '5',
      pathName: ManageLocales('app.myProfile.emailNotification'),
      path: '/email-notification',
    },
    {
      id: '6',
      pathName: ManageLocales('app.myProfile.reportBug'),
      path: '/report-bug',
    },
  ];

  return (
    <>
      <div className="sticky top-0 bg-solitairePrimary mt-16 overflow-y-scroll">
        <CustomHeader data={myAccountHeader} />
      </div>

      <div className="absolute top-[172px] left-[122px] flex flex-row items-start justify-start gap-[40px]">
        {myProfileRoutes.map(({ id, pathName, path }) => {
          // Check if the current route matches the link's path
          const isActive = currentPath === `/my-account${path}`;

          return (
            <Link
              className={`flex flex-row p-2.5 items-center justify-center text-solitaireTertiary ${
                isActive
                  ? 'border-b-[1px] border-solid border-solitaireQuaternary'
                  : 'hover:text-solitaireQuaternary'
              }`}
              href={`/my-account${path}`}
              key={id}
            >
              <div className={`${isActive && 'text-solitaireQuaternary'}`}>
                {pathName}
              </div>
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
