'use client';
import React, { useEffect, useState } from 'react';
import styles from './notification.module.scss';
import CartIcon from '@public/assets/icons/cart-outline.svg?url';
import EllipseIcon from '@public/assets/icons/ellipse.svg?url';
import CalenderIcon from '@public/assets/icons/calendar-clear-outline.svg?url';
import { useRouter } from 'next/navigation';
import { SheetClose } from '../ui/sheet';
import { CustomDisplayButton } from '../common/buttons/display-button';
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

export const Notification = () => {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(10);
  const [notificationData, setNotificationData] = useState<INotificationData[]>(
    []
  );
  const itemsPerPage = 10;

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

  const handleNotificationRead = async (
    // id: string,
    // status: string,
    category: string
  ) => {
    let filteredData = notificationData
      .filter((item) => item.category === category)
      .map((item) => ({ id: item.id, status: 'read' }));

    // updateNotification([{ id: id, status: status }, ...filteredData]);
    await updateNotification(filteredData);
  };

  const loadMoreItems = () => {
    setVisibleItems(visibleItems + itemsPerPage);
  };

  const handleMarkAllAsRead = async () => {
    let notificationMapData = data.data.map((item: any) => ({
      id: item.id,
      status: 'read',
    }));

    await updateNotification(notificationMapData);
  };

  return (
    <>
      <div className={styles.notificationMainContainer}>
        <div
          className={`flex justify-between border-b border-solitaireSenary pb-5`}
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
          {notificationData?.slice(0, visibleItems).map((items) => {
            return (
              <div
                key={items.customer_id}
                className={`flex ${
                  items.status === 'unread'
                    ? styles.readNotification
                    : styles.newNotificationContentMainDiv
                }`}
                onClick={() =>
                  // handleNotificationRead(items.id, items.status, items.category)
                  handleNotificationRead(items.category)
                }
              >
                <div className={styles.notificationsIcons}>
                  <EllipseIcon
                    className={
                      items.status === 'unread'
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
          })}
        </div>
        <div className={styles.loadMoreButtonContainer}>
          {visibleItems < notificationData?.length && (
            <CustomDisplayButton
              displayButtonLabel="Load More"
              displayButtonAllStyle={{
                displayButtonStyle: styles.loadMoreButton,
              }}
              handleClick={loadMoreItems}
            />
          )}
        </div>
      </div>
    </>
  );
};
