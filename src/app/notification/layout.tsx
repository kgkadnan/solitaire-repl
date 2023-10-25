'use client';
import CustomNotificationHeader from '@/components/common/notification-header';
import React, { useEffect, useState } from 'react';
import styles from './show-notification.module.scss';
import { usePathname } from 'next/navigation';
import { ManageLocales } from '@/utils/translate';
import { useGetAllNotificationQuery } from '@/features/api/notification';

function MyAccountLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const [notificationSettingData, setNotificationSettingData] = useState([]);

  const { data } = useGetAllNotificationQuery({ type: 'APP' });

  useEffect(() => {
    setNotificationSettingData(data?.data);
  }, [data, notificationSettingData]);

  // console.log(notificationSettingData);

  const unreadCount =
    notificationSettingData &&
    notificationSettingData.filter((item: any) => item.status === 'unread')
      .length;

  return (
    <>
      <div
        className={`border-b border-solitaireSenary ${styles.showNotificationsHeading}`}
      >
        <p>
          {ManageLocales('app.notification.notifications')}
          {path !== '/notification/setting' &&
            unreadCount > 0 &&
            `(${unreadCount})`}
        </p>
      </div>
      <CustomNotificationHeader />
      <div
        style={{
          display: 'flex',
          width: '100%',
        }}
      >
        <main style={{ width: '98%', minHeight: '70vh' }}>{children}</main>
      </div>
    </>
  );
}

export default MyAccountLayout;
