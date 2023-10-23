'use client';
import React, { useEffect, useState } from 'react';
import CalculatorIcon from '@public/assets/icons/calculator-outline.svg?url';
import NotificationIcon from '@public/assets/icons/notifications-outline.svg?url';
import MyProfileIcon from '@public/assets/icons/my-profile.svg?url';
import { ToggleButton } from '../toggle';
import { CustomDisplayButton } from '../buttons/display-button';
import { useRouter } from 'next/navigation';
import styles from './top-navigation-bar.module.scss';
import { ManageLocales } from '@/utils/translate';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CustomCalculator } from '@/components/caclulator';
import { CustomSlider } from '../slider';
import { Notification } from '@/components/notification';
import {
  useGetAllNotificationQuery,
  useUpdateNotificationMutation,
} from '@/features/api/notification';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { notificationBadge } from '@/features/notification/notification-slice';

export const TopNavigationBar = () => {
  const dispatch = useAppDispatch();
  const notificationBadgeStoreData: any = useAppSelector((store) => store);
  let badgeData = notificationBadgeStoreData.notificationBadge.status;

  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string>('');
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const { data } = useGetAllNotificationQuery({ type: 'APP' });
  const [updateNotification] = useUpdateNotificationMutation();

  const topNavData = [
    {
      label: ManageLocales('app.topNav.forYou'),
      link: '/',
    },
    {
      label: ManageLocales('app.topNav.advanceSearch'),
      link: '/advance-search',
    },
    {
      label: ManageLocales('app.topNav.previousSearch'),
      link: '/previous-search',
    },
    {
      label: ManageLocales('app.topNav.wishlist'),
      link: '/wishlist',
    },
    {
      label: ManageLocales('app.topNav.myCart'),
      link: '/my-cart',
    },
  ];

  const handleButtonClick = (label: string, link: string) => {
    setActiveButton(label);
    localStorage.removeItem('Search');
    router.push(`${link}?lang=en`);
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

    let notificationMapData = data.data.map((item: any) => ({
      id: item.id,
      status: item.status === 'read' ? 'read' : 'unread',
    }));

    const unreadNotifications = notificationMapData.filter(
      (item: any) => item.status === 'unread'
    );

    await updateNotification(unreadNotifications);
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
                  displayButtonStyle:
                    activeButton === navData.label
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
          <Popover>
            <PopoverTrigger>
              <CalculatorIcon role="button" className={styles.iconColor} />
            </PopoverTrigger>
            <PopoverContent className={styles.popoverContent}>
              <CustomCalculator />
            </PopoverContent>
          </Popover>
          <CustomSlider
            sheetContent={<Notification />}
            sheetTriggenContent={
              <div onClick={handleNotificationClick}>
                <div className={styles.notificationContainer}>
                  <NotificationIcon
                    role="button"
                    className={styles.iconColor}
                  />
                  {badgeData && <div className={styles.badge}></div>}
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
