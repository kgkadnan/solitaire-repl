'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import CalculatorIcon from '@public/assets/icons/calculator-outline.svg?url';
import NotificationIcon from '@public/assets/icons/notifications-outline.svg?url';
import MyProfileIcon from '@public/assets/icons/my-profile.svg?url';
import SearchIcon from '@public/assets/icons/search-outline.svg?url';

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
export const TopNavigationBar = () => {
  const currentRoute = usePathname();
  const subRoute = useSearchParams().get('route');

  const dispatch = useAppDispatch();
  const notificationBadgeStoreData: boolean = useAppSelector(
    store => store.notificationBadge.status
  );

  // let badgeData = notificationBadgeStoreData.status;

  const [dialogContent, setDialogContent] = useState<ReactNode>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [offset, setOffset] = useState(0);
  let limit = 11;
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
      link: '/search?route=form',
      isActive: currentRoute === '/search' && subRoute === 'form'
    },
    {
      label: ManageLocales('app.topNav.myCart'),
      link: '/my-cart/active',
      isActive: currentRoute === '/my-cart/active'
    },
    {
      label: ManageLocales('app.topNav.myAccount'),
      link: '/my-account/summary',
      isActive: currentRoute === '/my-account/summary'
    }
  ];

  let handleRoute = (label: string, link: string) => {
    router.push(`${link}`);
    topNavData.forEach(navData => {
      if (navData.label !== label) {
        navData.isActive = false;
      }
    });
  };

  const handleButtonClick = (label: string, link: string) => {
    let localData = JSON.parse(localStorage.getItem('Search')!);

    let data = localData?.filter(
      (isSaved: any) => isSaved.isSavedSearch === false
    );

    // if (data?.length && link !== '/search?route=form') {
    if (data?.length && currentRoute == '/search') {
      setIsDialogOpen(true);
      setDialogContent(
        <>
          <div className="text-center align-middle text-solitaireTertiary">
            Do you want to save your &quot;Search <br /> Result &quot; for this
            session?
          </div>
          <div className=" flex justify-around align-middle text-solitaireTertiary gap-[25px] ">
            <CustomDisplayButton
              displayButtonLabel="No"
              handleClick={() => {
                localStorage.setItem('Search', JSON.stringify([]));
                handleRoute(label, link);
                setIsDialogOpen(false);
                setDialogContent('');
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonTransparent
              }}
            />
            <CustomDisplayButton
              displayButtonLabel="Yes"
              handleClick={() => {
                setIsDialogOpen(false);
                setDialogContent('');
              }}
              displayButtonAllStyle={{
                displayButtonStyle: styles.showResultButtonFilled
              }}
            />
          </div>
        </>
      );
    }
    // else if (data?.length && link === '/search?route=form') {
    //   handleRoute(label, link);
    // }
    else {
      localStorage.removeItem('Search');
      handleRoute(label, link);
    }
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

    let notificationMapData = data?.data?.map((item: NotificationItem) => ({
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
            {/* <SearchIcon className={styles.stroke} alt='advance-search' /> */}
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
            <div
              onClick={() => {
                handleButtonClick('My Account', topNavData[3].link);
              }}
            >
              <MyProfileIcon
                role="button"
                // topNavData[3].isActive ?
                stroke={topNavData[3].isActive ? '#8C7459' : '#CED2D2'}
                // className={styles.iconColor}
              />
            </div>
            <ToggleButton />
          </div>
        </div>
      </div>
    </>
  );
};
