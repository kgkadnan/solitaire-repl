'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import CalculatorIcon from '@public/assets/icons/calculator-outline.svg?url';
import NotificationIcon from '@public/assets/icons/notifications-outline.svg?url';
import MyProfileIcon from '@public/assets/icons/my-profile.svg?url';

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
  NotificationItem,
  NotificationUpdate
} from '@/components/notification/notification-interface';
import { Notification } from '@/components/notification';
import { CustomDialog } from '../dialog';

export interface ISavedSearch {
  saveSearchName: string;
  isSavedSearch: boolean;
  queryParams: Record<string, string | string[] | { lte: number; gte: number }>;
}
import { NEW_SEARCH } from '@/constants/application-constants/search-page';
export const TopNavigationBar = () => {
  const currentRoute = usePathname();
  const subRoute = useSearchParams().get('active-tab');

  const dispatch = useAppDispatch();
  const notificationBadgeStoreData: boolean = useAppSelector(
    store => store.notificationBadge.status
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
      link: `/search?active-tab=${NEW_SEARCH}`,
      isActive: currentRoute === '/search' && subRoute === `${NEW_SEARCH}`
    },
    {
      label: ManageLocales('app.topNav.myCart'),
      link: `/my-cart?active-tab=active`,
      isActive: currentRoute === '/my-cart'
    },
    {
      label: ManageLocales('app.topNav.myAccount'),
      link: '/my-account/summary',
      isActive: currentRoute === '/my-account/summary'
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

  const handleButtonClick = (label: string, link: string) => {
    handleRoute(label, link);
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

    const notificationMapData = data?.data?.map((item: NotificationItem) => ({
      id: item.id,
      status: item.status === 'read' ? 'read' : 'unread'
    }));

    const unreadNotifications: NotificationUpdate[] =
      notificationMapData?.filter(
        (item: NotificationUpdate) => item.status === 'unread'
      );

    unreadNotifications.length
      ? await updateNotification(unreadNotifications)
      : '';

    setOffset(0);
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
                    handleButtonClick(navData.label, navData.link)
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
                    <NotificationIcon
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
            <div
              onClick={() => {
                handleButtonClick('My Account', topNavData[3].link);
              }}
              className={`${styles.headerIconStyle}`}
            >
              <MyProfileIcon
                role="button"
                stroke={topNavData[3].isActive ? '#8C7459' : '#CED2D2'}
                className={
                  topNavData[3].isActive ? styles.activeIcon : styles.iconColor
                }
              />
            </div>
            <ToggleButton />
          </div>
        </div>
      </div>
    </>
  );
};
