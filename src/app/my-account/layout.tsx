'use client';
import CustomHeader from '@/components/common/header';
import { ManageLocales } from '@/utils/translate';
import { usePathname, useRouter } from 'next/navigation'; // Import the useRouter hook
import React, { useCallback, useEffect, useState } from 'react';
import styles from './my-account.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { handleIsEditingKyc } from '@/utils/is-editing-kyc';
import { useModalStateManagement } from '@/hooks/modal-state-management';
import { CustomDialog } from '@/components/common/dialog';

function MyAccountLayout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const router = useRouter();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const isEditingKYCStoreData: boolean = useAppSelector(
    store => store.isEditingKYC.status
  );

  const dispatch = useAppDispatch();
  const { modalState, modalSetState } = useModalStateManagement();

  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const { dialogContent, isDialogOpen } = modalState;

  const myAccountHeader = {
    headerHeading: ManageLocales('app.myProfile.heading')
  };

  const myProfileRoutes = [
    {
      id: '1',
      pathName: ManageLocales('app.myProfile.kyc'),
      path: 'kyc',
      isActive: currentPath === '/my-account/kyc'
    },
    {
      id: '2',
      pathName: ManageLocales('app.myProfile.summary'),
      path: 'summary',
      isActive: currentPath === '/my-account/summary'
    },

    {
      id: '3',
      pathName: ManageLocales('app.myProfile.changePassword'),
      path: 'change-password',
      isActive: currentPath === '/my-account/change-password'
    },
    {
      id: '4',
      pathName: ManageLocales('app.myProfile.ManageListingSequence'),
      path: 'manage-diamond-sequence', // Corrected the path name
      isActive: currentPath === '/my-account/manage-diamond-sequence'
    },
    {
      id: '5',
      pathName: ManageLocales('app.myProfile.emailNotification'),
      path: 'email-notification',
      isActive: currentPath === '/my-account/email-notification'
    },
    {
      id: '6',
      pathName: ManageLocales('app.myProfile.reportBug'),
      path: 'report-bug',
      isActive: currentPath === '/my-account/report-bug'
    }
  ];

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, prevScrollPos]);

  const handleRoute = (label: string, link: string) => {
    router.push(`${link}`);
    myProfileRoutes.forEach(navData => {
      if (navData.pathName !== label) {
        navData.isActive = false;
      }
    });
  };

  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div className="sticky top-0 bg-solitairePrimary mt-16 overflow-y-scroll z-50">
        <CustomHeader
          data={myAccountHeader}
          mainDivStyle={styles.mainHeaderStyle}
          visibleStyle={styles.visibleStyle}
        />
      </div>
      <div
        className={`z-50 ${styles.navBar} ${
          visible ? styles.visible : styles.hidden
        }`}
      >
        <div className="absolute top-[160px] left-[122px] flex flex-row items-start justify-start gap-[40px] w-full bg-solitairePrimary z-50 pb-[10px]">
          {myProfileRoutes.map(({ id, pathName, path, isActive }) => {
            return (
              <div
                onClick={() =>
                  handleIsEditingKyc({
                    isEditingKYCStoreData,
                    setIsDialogOpen,
                    setDialogContent,
                    dispatch,
                    handleRoute,
                    label: pathName,
                    link: `/my-account/${path}`,
                    styles,
                    currentRoute: currentPath
                  })
                }
                className={`flex flex-row p-2.5 items-center justify-center text-solitaireTertiary cursor-pointer ${
                  isActive
                    ? 'border-b-[1px] border-solid border-solitaireQuaternary'
                    : 'hover:text-solitaireQuaternary'
                }`}
                key={id}
              >
                <div
                  className={`${
                    isActive && 'text-solitaireQuaternary cursor-pointer'
                  }`}
                >
                  {pathName}
                </div>
              </div>
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

export default MyAccountLayout;
