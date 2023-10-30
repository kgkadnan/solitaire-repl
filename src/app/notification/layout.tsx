'use client';
import CustomNotificationHeader from '@/components/common/notification-header';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ManageLocales } from '@/utils/translate';
import { useGetAllNotificationQuery } from '@/features/api/notification';
import CustomHeader from '@/components/common/header';

function MyAccountLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  const [notificationSettingData, setNotificationSettingData] = useState([]);

  const { data } = useGetAllNotificationQuery({ type: 'APP' });

  useEffect(() => {
    setNotificationSettingData(data?.data);
  }, [data, notificationSettingData]);

  const unreadCount =
    notificationSettingData &&
    notificationSettingData.filter((item: any) => item.status === 'unread')
      .length;

  let notificationHeader = {
    headerHeading: (
      <p>
        {ManageLocales('app.notification.notifications')}
        {path !== '/notification/setting' &&
          unreadCount > 0 &&
          `(${unreadCount})`}
      </p>
    ),
  };

  return (
    <>
      <div className="sticky top-0 bg-solitairePrimary mt-16 overflow-y-scroll">
        <CustomHeader data={notificationHeader} />
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
