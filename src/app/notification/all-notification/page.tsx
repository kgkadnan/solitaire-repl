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
interface INotificationData {
  id: string;
  customer_id: string;
  template: string;
  parameter: {
    stoneId: string;
    abc: string;
  };
  category: string;
  sub_category: string;
  status: string;
  created_at: string;
  has_cta: boolean;
  external_link: string;
  redirect_identifier: string[];
}
const Notification = () => {
  const [notificationData, setNotificationData] = useState<INotificationData[]>(
    []
  );

  const { data } = useGetAllNotificationQuery({ type: 'APP' });
  const [updateNotification] = useUpdateNotificationMutation();

  useEffect(() => {
    setNotificationData(data?.data);
  }, [data, notificationData]);

  function stringWithHTMLReplacement(template: string, parameter: any) {
    const parts = template.split('${{');

    const modifiedString = parts.map((part, index) => {
      if (index === 0) {
        return <span key={index}>{part}</span>;
      } else {
        const [paramName] = part.split('}}');
        return (
          <span key={index}>
            <span style={{ fontWeight: 600 }}>{parameter[paramName]}</span>
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
      .map((item) => ({ id: item.id, status: 'read' }));

    updateNotification(filteredData);
  };

  return (
    <>
      <div className={styles.showAllNotificationContainer}>
        {notificationData?.map((items) => {
          return (
            <div key={items.id} className="border-b border-solitaireSenary">
              <div
                className={`flex justify-between  ${
                  items.status === 'unread'
                    ? styles.notificationCardContainer
                    : styles.readNotification
                }`}
                onClick={() => handleNotificationRead(items.category)}
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
        })}
      </div>
    </>
  );
};

export default Notification;
