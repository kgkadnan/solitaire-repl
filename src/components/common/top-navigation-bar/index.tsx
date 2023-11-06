'use client';
import React, { useEffect, useState } from 'react';
import CalculatorIcon from '@public/assets/icons/calculator-outline.svg?url';
import NotificationIcon from '@public/assets/icons/notifications-outline.svg?url';
import MyProfileIcon from '@public/assets/icons/my-profile.svg?url';
import SearchIcon from '@public/assets/icons/search-outline.svg?url';
import { ToggleButton } from '../toggle';
import { CustomDisplayButton } from '../buttons/display-button';
import { usePathname, useRouter } from 'next/navigation';
import styles from './top-navigation-bar.module.scss';
import { ManageLocales } from '@/utils/translate';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CustomCalculator } from '@/components/calculator';
import { CustomSlider } from '../slider';
import {
  useGetAllNotificationQuery,
  useUpdateNotificationMutation,
} from '@/features/api/notification';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { notificationBadge } from '@/features/notification/notification-slice';
import {
  NotificationItem,
  NotificationUpdate,
} from '@/components/notification/notification-interface';
import { Notification } from '@/components/notification';
export const TopNavigationBar = () => {
  const currentRoute = usePathname();
  const dispatch = useAppDispatch();
  const notificationBadgeStoreData: boolean = useAppSelector(
    (store) => store.notificationBadge.status
  );

  // let badgeData = notificationBadgeStoreData.status;

  const router = useRouter();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [offset, setOffset] = useState(0);
  let limit = 11;
  const { data } = useGetAllNotificationQuery({
    type: 'APP',
    offset,
    limit,
  });

  const [updateNotification] = useUpdateNotificationMutation();

  const topNavData = [
    {
      label: ManageLocales('app.topNav.forYou'),
      link: '/',
      isActive: currentRoute === '/',
    },
    {
      label: ManageLocales('app.topNav.advanceSearch'),
      link: '/advance-search',
      isActive: currentRoute === '/advance-search',
    },
    {
      label: ManageLocales('app.topNav.myCart'),
      link: '/my-cart',
      isActive: currentRoute === '/my-cart',
    },
  ];

  const handleButtonClick = (label: string, link: string) => {
    localStorage.removeItem('Search');
    router.push(`${link}?lang=en`);
    topNavData.forEach((navData) => {
      if (navData.label !== label) {
        navData.isActive = false;
      }
    });
  };

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
  }, [prevScrollPos, data]);

  const handleNotificationClick = async () => {
    dispatch(notificationBadge(false));

    let notificationMapData = data?.data?.map((item: NotificationItem) => ({
      id: item.id,
      status: item.status === 'read' ? 'read' : 'unread',
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
    <div
      className={`${styles.topNavigationMainDiv} ${
        visible ? styles.visible : styles.hidden
      }`}
    >
      <div className="h-[80px] flex justify-end items-center text-solitaireTertiary">
        <div className="flex items-center gap-14 mr-12">
          {topNavData.map((navData) => (
            <div key={navData.label}>
              <CustomDisplayButton
                displayButtonAllStyle={{
                  displayButtonStyle: navData.isActive
                    ? styles.activeHeaderButtonStyle
                    : styles.headerButtonStyle,
                  displayLabelStyle: styles.headerButtonLabelStyle,
                }}
                displayButtonLabel={navData.label}
                handleClick={() =>
                  handleButtonClick(navData.label, navData.link)
                }
              />
            </div>
          ))}
          {/* <SearchIcon className={styles.stroke} alt="advance-search" /> */}
          <Popover>
            <PopoverTrigger>
              <CalculatorIcon role="button" className={styles.iconColor} />
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
                <div className={styles.notificationContainer}>
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
          <div onClick={() => router.push('/my-account/summary')}>
            <MyProfileIcon role="button" className={styles.iconColor} />
          </div>
          <ToggleButton />
        </div>
      </div>
    </div>
  );
};
