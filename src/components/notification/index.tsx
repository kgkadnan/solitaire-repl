'use client';
import React, { useState } from 'react';
import styles from './notification.module.scss';
import CartIcon from '@public/assets/icons/cart-outline.svg?url';
import EllipseIcon from '@public/assets/icons/ellipse.svg?url';
import CalenderIcon from '@public/assets/icons/calendar-clear-outline.svg?url';
import { useRouter } from 'next/navigation';
import { SheetClose } from '../ui/sheet';
import { CustomDisplayButton } from '../common/buttons/display-button';

interface INotificationData {
  id: string;
  customer_id: string;
  template: string;
  parameters: {
    stoneId: string;
    abc: string;
  };
  category: string;
  sub_category: string;
  status: string;
  timestamp: string;
  has_cta: boolean;
  external_link: string;
  redirect_identifier: string[];
}

export const Notification = () => {
  const router = useRouter();
  const [visibleItems, setVisibleItems] = useState(10);
  const itemsPerPage = 10;

  const notificationData: INotificationData[] = [
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866587',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}} ',
      parameters: {
        stoneId: '123456789,123456780,... + 48 more',
        abc: 'yyyyyyy',
      },
      category: 'my_cart',
      sub_category: 'add',
      status: 'unread',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866588',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'unread',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866589',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '5786615',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866484',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },

    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866587',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}} ',
      parameters: {
        stoneId: '123456789,123456780,... + 48 more',
        abc: 'yyyyyyy',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866588',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866589',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '5786615',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866484',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866587',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}} ',
      parameters: {
        stoneId: '123456789,123456780,... + 48 more',
        abc: 'yyyyyyy',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866588',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866589',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '5786615',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866484',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866587',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}} ',
      parameters: {
        stoneId: '123456789,123456780,... + 48 more',
        abc: 'yyyyyyy',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866588',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866589',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '5786615',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
    {
      id: 'qwertyuiolsdfghjm',
      customer_id: '57866484',
      template:
        'your stone numbers ${{stoneId}} had been moved to card ${{abc}}',
      parameters: {
        stoneId: '123456789,123456780,... + 6 more',
        abc: '165296529',
      },
      category: 'appointment',
      sub_category: 'add',
      status: 'read',
      timestamp: '2023-09-15T00:00:00Z',
      has_cta: true,
      external_link: 'http',
      redirect_identifier: ['123456789'],
    },
  ];

  function replacePlaceholders(template: string, parameters: any) {
    const placeholders = template.match(/\${{(\w+)}}/g);
    if (!placeholders) {
      return template;
    }

    placeholders.forEach((placeholder) => {
      const key = placeholder.replace(/\${{(\w+)}}/, '$1');
      const value = parameters[key] || '';

      // const boldValue: any = `<p style="font-weight:1000" >${value}</p>`;

      template = template.replace(placeholder, value);
    });

    return template;
  }

  notificationData.forEach((response) => {
    response.template = replacePlaceholders(
      response.template,
      response.parameters
    );
  });

  const handleNotificationRead = () => {};

  const loadMoreItems = () => {
    setVisibleItems(visibleItems + itemsPerPage);
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
            <CustomDisplayButton displayButtonLabel="Mark all as read" />

            <div className={styles.notificationFooterButton}>
              <SheetClose>
                <CustomDisplayButton
                  displayButtonLabel="View All"
                  displayButtonAllStyle={{
                    displayButtonStyle: styles.viewAllButton,
                    displayLabelStyle: styles.viewAllLabel,
                  }}
                  handleClick={() => router.push('/notification')}
                />
              </SheetClose>
            </div>
          </div>
        </div>
        <div className={` ${styles.newNotificationContainer}`}>
          {notificationData.slice(0, visibleItems).map((items) => {
            return (
              <div
                key={items.customer_id}
                className={`flex ${
                  items.status === 'unread'
                    ? styles.readNotification
                    : styles.newNotificationContentMainDiv
                }`}
                onClick={() => handleNotificationRead()}
              >
                <div className={styles.notificationsIcons}>
                  <EllipseIcon
                    className={
                      items.status === 'unread'
                        ? styles.ellipseIconActive
                        : styles.ellipseIconInactive
                    }
                  />
                  {items.category === 'appointment' && (
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
                  <p className={styles.newNotificationMessage}>
                    {/* <div
                      dangerouslySetInnerHTML={{ __html: items.template }}
                      style={{ display: 'flex' }}
                    /> */}
                    {items.template}
                  </p>
                  <p className={styles.newNotificationStatusTime}>
                    {items.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.loadMoreButtonContainer}>
          {visibleItems < notificationData.length && (
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
