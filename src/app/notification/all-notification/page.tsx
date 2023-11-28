'use client';
import React, { useEffect, useState } from 'react';
import styles from './all-notification.module.scss';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import EllipseIcon from '@public/assets/icons/ellipse.svg?url';
import {
  useGetAllNotificationQuery,
  useUpdateNotificationMutation,
} from '@/features/api/notification';
import { formatCreatedAt } from '@/utils/format-date';
import { NoDataFound } from '@/components/common/no-data-found';
import { INotificationData } from './all-notification-interface';
import { NotificationParameter } from '@/components/notification/notification-interface';
import {
  NOTIFICATION_READ_STATUS,
  NOTIFICATION_TYPE,
  NOTIFICATION_UNREAD_STATUS,
  NOTIFICATION_UNSEEN_STATUS,
} from '@/constants/business-logic';

const Notification = () => {
  const [notificationData, setNotificationData] = useState<INotificationData[]>(
    []
  );

  const { data } = useGetAllNotificationQuery({ type: NOTIFICATION_TYPE });
  const [updateNotification] = useUpdateNotificationMutation();

  useEffect(() => {
    setNotificationData(data?.data);
  }, [data, notificationData]);

  function stringWithHTMLReplacement(
    template: string,
    parameter: NotificationParameter
  ) {
    const parts = template.split('${{');

    const modifiedString = parts.map((part, index) => {
      if (index === 0) {
        return <span key={index}>{part}</span>;
      } else {
        const [paramName] = part.split('}}');
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
    let filteredData = notificationData
      .filter((item) => item.category === category)
      .map((item) => ({ id: item.id, status: NOTIFICATION_READ_STATUS }));

    updateNotification(filteredData);
  };

  return (
    <div className={styles.showAllNotificationContainer}>
      {notificationData?.length > 0 ? (
        notificationData?.map((items) => {
          return (
            <div key={items.id} className="border-b border-solitaireSenary">
              <div
                className={`flex justify-between  ${
                  items.status === NOTIFICATION_UNREAD_STATUS ||
                  items.status === NOTIFICATION_UNSEEN_STATUS
                    ? styles.notificationCardContainer
                    : styles.readNotification
                }`}
                onClick={() => handleNotificationRead(items.category)}
              >
                <div className="flex justify-center items-center">
                  <EllipseIcon
                    className={
                      items.status === NOTIFICATION_UNREAD_STATUS ||
                      items.status === NOTIFICATION_UNSEEN_STATUS
                        ? styles.ellipseIconActive
                        : styles.ellipseIconInactive
                    }
                  />

                  <div className={styles.cardContentMainDiv}>
                    <p className={styles.title}>
                      {stringWithHTMLReplacement(
                        items.template,
                        items.parameter
                      )}
                    </p>
                    <p className={styles.time}>
                      {formatCreatedAt(items.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <CustomDisplayButton
                    displayButtonLabel={
                      items.category === 'wishlist'
                        ? 'Wishlist'
                        : items.category === 'my_cart'
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
        })
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default Notification;
