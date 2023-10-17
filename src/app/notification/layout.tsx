'use client';
import CustomNotificationHeader from '@/components/common/notification-header';
import React from 'react';
import styles from './show-notification.module.scss';
import { usePathname } from 'next/navigation';
import { ManageLocales } from '@/utils/translate';

function MyAccountLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  let showAllNotificationData = [
    {
      notification_id: '57866587',
      type: 'wishlist',
      title: ' Your item has been moved from “My Cart” to “Wishlist”',
      time: '2023-09-15T00:00:00Z',
      status: 'unread',
    },
    {
      notification_id: '57866586',
      type: 'cart',
      title: ' Your item has been moved from “My Cart” to “Wishlist”',
      time: '2023-09-15T00:00:00Z',
      status: 'read',
    },
    {
      notification_id: '57866585',
      type: 'wishlist',
      title: ' Your item has been moved from “My Cart” to “Wishlist”',
      time: '2023-09-15T00:00:00Z',
      status: 'read',
    },
    {
      notification_id: '57866584',
      type: 'wishlist',
      title: ' Your item has been moved from “My Cart” to “Wishlist”',
      time: '2023-09-15T00:00:00Z',
      status: 'unread',
    },
  ];
  const unreadCount = showAllNotificationData.filter(
    (item) => item.status === 'unread'
  ).length;
  return (
    <>
      <div
        className={`border-b border-solitaireSenary ${styles.showNotificationsHeading}`}
      >
        <p>
          {ManageLocales('app.notification.notifications')}
          {path !== '/notification/setting' && `(${unreadCount})`}
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
