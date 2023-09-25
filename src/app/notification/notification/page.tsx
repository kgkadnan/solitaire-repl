'use client';

import React from 'react';
import styles from '../show-notification.module.scss';
import CustomNotificationHeader from '@/components/common/notification-header/notification-header';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import EllipseIcon from '@public/assets/icons/ellipse.svg?url';

const Notification = () => {
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
      <div className={styles.showAllNotificationContainer}>
        {showAllNotificationData.map((items) => {
          return (
            <div
              key={items.notification_id}
              className="border-b border-solitaireSenary"
            >
              <div
                className={`flex justify-between  ${
                  items.status === 'unread'
                    ? styles.notificationCardContainer
                    : styles.readNotification
                }`}
              >
                <div className="flex justify-center items-center">
                  <EllipseIcon
                    className={
                      items.status === 'unread'
                        ? styles.ellipseIconActive
                        : styles.ellipseIconInactive
                    }
                  />

                  <div className={styles.cardContentMainDiv}>
                    <p className={styles.title}>{items.title}</p>
                    <p className={styles.time}>{items.time}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <CustomDisplayButton
                    displayButtonLabel={
                      items.type === 'wishlist'
                        ? 'Wishlist'
                        : items.type === 'cart'
                        ? 'My Cart'
                        : ''
                    }
                    displayButtonAllStyle={{
                      displayButtonStyle: styles.transparent,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notification;
