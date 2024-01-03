'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import CalculatorIcon from '@public/assets/icons/calculator-outline.svg?url';
import NotificationHeaderIcon from '@public/assets/icons/notifications-outline.svg?url';
import NotificationPopoverIcon from '@public/assets/icons/notification-icon.svg?url';
import MyProfileIcon from '@public/assets/icons/my-profile.svg?url';
import UserIcon from '@public/assets/icons/user-outline.svg?url';
import DarkIcon from '@public/assets/icons/dark-mode.svg?url';
import LightIcon from '@public/assets/icons/light-mode.svg?url';
import LogOutIcon from '@public/assets/icons/log-out-outline.svg';
import { ToggleButton } from '../toggle';
import { CustomDisplayButton } from '../buttons/display-button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './top-navigation-bar.module.scss';
import { ManageLocales } from '@/utils/translate';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { CustomCalculator } from '@/components/calculator';
import { CustomSlider } from '../slider';
import {
  useGetAllNotificationQuery,
  useUpdateNotificationMutation
} from '@/features/api/notification';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { notificationBadge } from '@/features/notification/notification-slice';
import {
  INotificationItem,
  INotificationUpdate
} from '@/components/notification/notification-interface';
import { Notification } from '@/components/notification';
import { CustomDialog } from '../dialog';
import useUser from '@/lib/use-auth';
import { useTheme } from 'next-themes';

export interface ISavedSearch {
  saveSearchName: string;
  isSavedSearch: boolean;
  queryParams: Record<string, string | string[] | { lte: number; gte: number }>;
}
import { handleIsEditingKyc } from '@/utils/is-editing-kyc';
import Image from 'next/image';

export const TopNavigationBar = () => {
  const currentRoute = usePathname();
  const subRoute = useSearchParams().get('active-tab');
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const { userLoggedOut } = useUser();

  const dispatch = useAppDispatch();
  const notificationBadgeStoreData: boolean = useAppSelector(
    store => store.notificationBadge.status
  );

  const isEditingKYCStoreData: boolean = useAppSelector(
    store => store.isEditingKYC.status
  );

  const [dialogContent, setDialogContent] = useState<ReactNode>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 11;
  const { data } = useGetAllNotificationQuery({
    type: 'APP',
    offset,
    limit
  });

  const [updateNotification] = useUpdateNotificationMutation();

  const topNavData = [
    {
      label: ManageLocales('app.topNav.forYou'),
      link: '/',
      isActive: currentRoute === '/'
    },
    {
      label: ManageLocales('app.topNav.advanceSearch'),
      link: `/search?active-tab=${ManageLocales('app.search.newSearchRoute')}`,
      isActive:
        currentRoute === '/search' &&
        subRoute === `${ManageLocales('app.search.newSearchRoute')}`
    },
    {
      label: ManageLocales('app.topNav.myCart'),
      link: `/my-cart?active-tab=active`,
      isActive: currentRoute === '/my-cart'
    },
    {
      label: ManageLocales('app.topNav.myAccount'),
      link: '/my-account/kyc',
      isActive: currentRoute.includes('/my-account')
    }
  ];

  const handleRoute = (label: string, link: string) => {
    router.push(`${link}`);
    topNavData.forEach(navData => {
      if (navData.label !== label) {
        navData.isActive = false;
      }
    });
  };

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
  }, [prevScrollPos, data, handleScroll]);

  const handleNotificationClick = async () => {
    dispatch(notificationBadge(false));

    const notificationMapData = data?.data?.map((item: INotificationItem) => ({
      id: item.id,
      status: item.status === 'read' ? 'read' : 'unread'
    }));

    const unreadNotifications: INotificationUpdate[] =
      notificationMapData?.filter(
        (item: INotificationUpdate) => item.status === 'unread'
      );

    unreadNotifications.length
      ? await updateNotification(unreadNotifications)
      : '';

    setOffset(0);
  };

  const handleLogout = () => {
    userLoggedOut();
    router.push('/login');
  };

  return (
    <>
      <CustomDialog
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div
        className={`${styles.topNavigationMainDiv} ${
          visible ? styles.visible : styles.hidden
        }`}
      >
        <div className="h-[80px] flex justify-end items-center text-solitaireTertiary">
          <div className="flex items-center gap-14 mr-12">
            {topNavData.slice(0, 3).map(navData => (
              <div key={navData.label}>
                <CustomDisplayButton
                  displayButtonAllStyle={{
                    displayButtonStyle: navData.isActive
                      ? styles.activeHeaderButtonStyle
                      : styles.headerButtonStyle,
                    displayLabelStyle: styles.headerButtonLabelStyle
                  }}
                  displayButtonLabel={navData.label}
                  handleClick={() =>
                    handleIsEditingKyc({
                      isEditingKYCStoreData,
                      setIsDialogOpen,
                      setDialogContent,
                      dispatch,
                      handleRoute,
                      label: navData.label,
                      link: navData.link,
                      styles,
                      currentRoute
                    })
                  }
                />
              </div>
            ))}
            <Popover>
              <PopoverTrigger>
                <div className={styles.headerIconStyle}>
                  <CalculatorIcon role="button" className={styles.iconColor} />
                </div>
              </PopoverTrigger>
              <PopoverContent className={styles.popoverContent}>
                <CustomCalculator />
              </PopoverContent>
            </Popover>
            <CustomSlider
              sheetContent={
                <Notification
                  notificationData={data}
                  setOffset={setOffset}
                  offset={offset}
                  limit={limit}
                />
              }
              sheetTriggenContent={
                <div onClick={handleNotificationClick}>
                  <div
                    className={`${styles.notificationContainer} ${styles.headerIconStyle}`}
                  >
                    <NotificationHeaderIcon
                      role="button"
                      className={styles.iconColor}
                    />
                    {notificationBadgeStoreData && (
                      <div className={styles.badge}></div>
                    )}
                  </div>
                </div>
              }
              sheetContentStyle={styles.notificationSheetContent}
            />
            <div className={`${styles.headerIconStyle}`}>
              <Popover>
                <PopoverTrigger>
                  <div
                    className={`flex items-center mt-2 ${styles.headerIconStyle}`}
                  >
                    <MyProfileIcon
                      stroke={topNavData[3].isActive ? '#8C7459' : '#CED2D2'}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] h-[300px] p-[20px] bg-solitaireSecondary mt-[10px] rounded-3xl">
                  <div className="flex items-center gap-[18px] border-b border-solitaireSenary pb-[20px]">
                    <div className="">
                      <MyProfileIcon
                        stroke={topNavData[3].isActive ? '#8C7459' : '#CED2D2'}
                        className={
                          topNavData[3].isActive
                            ? styles.activeIcon
                            : styles.iconColor
                        }
                      />
                    </div>
                    <div className="">
                      <p className="text-[16px] font-semibold text-solitaireQuaternary">
                        Amanita Wilson
                      </p>
                      <p className="text-14px text-solitaireTertiary">
                        amanitawilson@gmail.com
                      </p>
                    </div>
                  </div>
                  <div className="border-b border-solitaireSenary mt-[10px] pb-[10px]">
                    <div className="fill-solitaireTertiary flex gap-[18px] items-center">
                      <UserIcon fill="solitaireTertiary" />
                      <CustomDisplayButton
                        displayButtonLabel="My Account"
                        displayButtonAllStyle={{
                          displayButtonStyle:
                            'text-14px font-light cursor-pointer'
                        }}
                        handleClick={() => {
                          handleIsEditingKyc({
                            isEditingKYCStoreData,
                            setIsDialogOpen,
                            setDialogContent,
                            dispatch,
                            handleRoute,
                            label: 'My Account',
                            link: topNavData[3].link,
                            styles,
                            currentRoute
                          });
                        }}
                      />
                    </div>
                    <div className="fill-solitaireTertiary flex justify-between items-center">
                      <div className="flex gap-[18px] items-center">
                        {currentTheme === 'dark' ? (
                          <DarkIcon fill="solitaireTertiary" />
                        ) : (
                          <LightIcon fill="solitaireTertiary" />
                        )}

                        <CustomDisplayButton
                          displayButtonLabel={
                            currentTheme === 'dark'
                              ? 'Dark Theme'
                              : 'Light Theme'
                          }
                          displayButtonAllStyle={{
                            displayButtonStyle:
                              'text-14px font-light cursor-pointer'
                          }}
                          handleClick={() => {
                            handleIsEditingKyc({
                              isEditingKYCStoreData,
                              setIsDialogOpen,
                              setDialogContent,
                              dispatch,
                              handleRoute,
                              label: 'My Account',
                              link: topNavData[3].link,
                              styles,
                              currentRoute
                            });
                          }}
                        />
                      </div>
                      <ToggleButton
                        setTheme={setTheme}
                        currentTheme={currentTheme}
                      />
                    </div>
                    <div className="fill-solitaireTertiary flex gap-[18px] items-center">
                      <NotificationPopoverIcon className="stroke-solitaireTertiary" />
                      <CustomDisplayButton
                        displayButtonLabel="Notification"
                        displayButtonAllStyle={{
                          displayButtonStyle:
                            'text-14px font-light cursor-pointer'
                        }}
                        handleClick={() => {
                          handleIsEditingKyc({
                            isEditingKYCStoreData,
                            setIsDialogOpen,
                            setDialogContent,
                            dispatch,
                            handleRoute,
                            label: 'Notificaton',
                            link: '/notification/all-notification',
                            styles,
                            currentRoute
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-[18px] mt-[10px]">
                    <Image src={LogOutIcon} alt="logout Icon" />
                    <CustomDisplayButton
                      displayButtonLabel="Logout"
                      handleClick={handleLogout}
                      displayButtonAllStyle={{
                        displayLabelStyle:
                          'font-semibold text-solitaireQuaternary text-[14px] cursor-pointer'
                      }}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
