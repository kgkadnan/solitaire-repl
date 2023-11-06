'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './notification.module.scss';
import CartIcon from '@public/assets/icons/cart-outline.svg?url';
import EllipseIcon from '@public/assets/icons/ellipse.svg?url';
import CalenderIcon from '@public/assets/icons/calendar-clear-outline.svg?url';
import { useRouter } from 'next/navigation';
import { SheetClose } from '../ui/sheet';
import { CustomDisplayButton } from '../common/buttons/display-button';
import { useUpdateNotificationMutation } from '@/features/api/notification';
import { formatCreatedAt } from '@/utils/format-date';
import { NoDataFound } from '../common/no-data-found';
import {
  NotificationItem,
  NotificationParameter,
  NotificationProps,
  NotificationUpdate,
} from './notification-interface';

export const Notification: React.FC<NotificationProps> = ({
  notificationData,
  setOffset,
  offset,
  limit,
}) => {
  const router = useRouter();

  const [updateNotification] = useUpdateNotificationMutation();
  const [storeNotificationData, setStoreNotificationData] = useState<
    NotificationItem[]
  >([]);

  useEffect(() => {
    if (offset === 0 && notificationData) {
      setStoreNotificationData(notificationData.data);
    } else if (offset > 0) {
      storeMyNotificationData();
    }
  }, [notificationData, offset]);

  const storeMyNotificationData = useCallback(() => {
    if (offset > 0) {
      const newNotificationData: NotificationItem[] = (
        notificationData?.data ?? []
      ).filter(
        (newItem) =>
          !storeNotificationData.some(
            (existingItem) => newItem.id === existingItem.id
          )
      );

      setStoreNotificationData([
        ...storeNotificationData,
        ...newNotificationData,
      ]);
    }
  }, [notificationData]);

  function stringWithHTMLReplacement(
    template: string,
    parameter: NotificationParameter
  ) {
    const parts = template?.split('${{');

    const modifiedString = parts?.map((part, index) => {
      if (index === 0) {
        return <span key={index}>{part}</span>;
      } else {
        const [paramName] = part?.split('}}');

        return (
          <span key={index}>
            <span style={{ fontWeight: 600 }}>
              {parameter[paramName as keyof NotificationParameter]}
            </span>
            {part.substr(paramName.length + 2)}
          </span>
        );
      }
    });

    return <div>{modifiedString}</div>;
  }

  const handleNotificationRead = async (category: string) => {
    let filteredData: NotificationUpdate[] = storeNotificationData
      ?.filter((item: NotificationItem) => item.category === category)
      .map((item: NotificationItem) => ({ id: item.id, status: 'read' }));

    await updateNotification(filteredData);
  };

  const loadMoreItems = () => {
    setOffset(offset + limit);
  };

  const handleMarkAllAsRead = async () => {
    let notificationMapData = storeNotificationData.map(
      (item: NotificationItem) => ({
        id: item.id,
        status: 'read',
      })
    );

    await updateNotification(notificationMapData);
  };

  return (
    <>
      <div className={styles.notificationMainContainer}>
        <div
          className={`sticky top-0 bg-solitairePrimary flex justify-between border-b border-solitaireSenary pb-5 pt-5`}
        >
          <div className={`flex items-center ${styles.notificationHeading}`}>
            <p>Notifications</p>
          </div>

          <div className={`flex items-center ${styles.markAllReadButton}`}>
            <CustomDisplayButton
              displayButtonLabel="Mark all as read"
              handleClick={handleMarkAllAsRead}
            />

            <div className={styles.notificationFooterButton}>
              <SheetClose>
                <CustomDisplayButton
                  displayButtonLabel="View All"
                  displayButtonAllStyle={{
                    displayButtonStyle: styles.viewAllButton,
                    displayLabelStyle: styles.viewAllLabel,
                  }}
                  handleClick={() =>
                    router.push('/notification/all-notification')
                  }
                />
              </SheetClose>
            </div>
          </div>
        </div>
        <div className={` ${styles.newNotificationContainer}`}>
          {storeNotificationData?.length > 0 ? (
            storeNotificationData?.map((items: NotificationItem) => {
              return (
                <div
                  key={items.customer_id}
                  className={`flex ${
                    items.status === 'unread' || items.status === 'unseen'
                      ? styles.readNotification
                      : styles.newNotificationContentMainDiv
                  }`}
                  onClick={() => handleNotificationRead(items.category)}
                >
                  <div className={styles.notificationsIcons}>
                    <EllipseIcon
                      className={
                        items.status === 'unread' || items.status === 'unseen'
                          ? styles.ellipseIconActive
                          : styles.ellipseIconInactive
                      }
                    />
                    {items.category === 'appointments' && (
                      <div className={styles.calendarIcon}>
                        <CalenderIcon />
                      </div>
                    )}
                    {items.category === 'my_cart' && (
                      <div className={styles.cartIcon}>
                        <CartIcon />
                      </div>
                    )}
                  </div>
                  <div>
                    {stringWithHTMLReplacement(items.template, items.parameter)}

                    <p className={styles.newNotificationStatusTime}>
                      {formatCreatedAt(items.created_at)}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <NoDataFound />
          )}
        </div>
        <div className={styles.loadMoreButtonContainer}>
          {notificationData && notificationData?.data?.length >= limit ? (
            <CustomDisplayButton
              displayButtonLabel="Load More"
              displayButtonAllStyle={{
                displayButtonStyle: styles.loadMoreButton,
              }}
              handleClick={loadMoreItems}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};
