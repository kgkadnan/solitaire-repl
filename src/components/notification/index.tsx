'use client';
import React, { useState } from 'react';
import styles from './notification.module.scss';
import CartIcon from '@public/assets/icons/cart-outline.svg?url';
import EllipseIcon from '@public/assets/icons/ellipse.svg?url';
import CalenderIcon from '@public/assets/icons/calendar-clear-outline.svg?url';
import { useRouter } from 'next/navigation';
import { SheetClose } from '../ui/sheet';
import { CustomDisplayButton } from '../common/buttons/display-button';

export const Notification = () => {
  const router = useRouter();

  let notificationData = [
    {
      type: 'calendar',
      customer_id: '643872',
      notification_id: '57866587',
      title:
        'Stone Id’s 3560721055, 3560721055, 3560721055, & 3560721055 has been moved to your cart.',
      time: '2023-09-15T00:00:00Z',
      status: 'unread',
    },
    {
      type: 'cart',
      customer_id: '643872',
      notification_id: '57866588',
      title: '10% off on items in your cart!',
      time: '2023-09-15T08:00:00Z',
      status: 'unread',
    },
    {
      type: 'calendar',
      customer_id: '874321',
      notification_id: '57866589',
      title: 'Reminder: Meeting with the client at 2 PM.',
      time: '2023-09-15T14:00:00Z',
      status: 'read',
    },
    {
      type: 'cart',
      customer_id: '874321',
      notification_id: '57866590',
      title: 'Your cart is expiring soon! Complete your purchase.',
      time: '2023-09-15T03:00:00Z',
      status: 'read',
    },
    {
      type: 'calendar',
      customer_id: '987654',
      notification_id: '57866591',
      title: "Don't miss your flight tomorrow!",
      time: '2023-09-15T00:00:00Z',
      status: 'read',
    },
    {
      type: 'cart',
      customer_id: '987654',
      notification_id: '57866592',
      title: 'New items added to your wishlist.',
      time: '2023-09-13T00:00:00Z',
      status: 'read',
    },
    {
      type: 'calendar',
      customer_id: '345678',
      notification_id: '57866593',
      title: 'Upcoming webinar: Register now!',
      time: '2023-09-14T00:00:00Z',
      status: 'read',
    },
    {
      type: 'cart',
      customer_id: '345678',
      notification_id: '57866594',
      title: 'Flash sale alert: Save big on your favorite products.',
      time: '2023-09-15T08:00:00Z',
      status: 'read',
    },
    {
      type: 'calendar',
      customer_id: '456789',
      notification_id: '57866595',
      title: 'Important deadline approaching: Submit your project by Friday.',
      time: '2023-09-11T00:00:00Z',
      status: 'read',
    },
    {
      type: 'cart',
      customer_id: '456789',
      notification_id: '57866596',
      title: "Congratulations! You've earned a discount on your next purchase.",
      time: '2023-09-15T12:00:00Z',
      status: 'read',
    },
    {
      type: 'calendar',
      customer_id: '112233',
      notification_id: '57866597',
      title: 'Reminder: Parent-teacher conference next week.',
      time: '2023-09-12T00:00:00Z',
      status: 'read',
    },
    {
      type: 'cart',
      customer_id: '112233',
      notification_id: '57866598',
      title: 'Limited-time offer: Buy one, get one free!',
      time: '2023-09-15T08:00:00Z',
      status: 'read',
    },
    {
      type: 'calendar',
      customer_id: '445566',
      notification_id: '57866599',
      title: 'Your gym class is starting soon.',
      time: '2023-09-15T06:21:00Z',
      status: 'read',
    },
    {
      type: 'cart',
      customer_id: '445566',
      notification_id: '57866600',
      title: 'We miss you! Come back and complete your purchase.',
      time: '2023-09-14T00:00:00Z',
      status: 'read',
    },
    {
      type: 'calendar',
      customer_id: '667788',
      notification_id: '57866601',
      title: 'Hurry! Limited seats left for the conference.',
      time: '2023-09-15T08:00:00Z',
      status: 'read',
    },
    {
      type: 'cart',
      customer_id: '667788',
      notification_id: '57866602',
      title: 'Your favorite items are back in stock.',
      time: '2023-09-09T00:00:00Z',
      status: 'read',
    },
    {
      type: 'calendar',
      customer_id: '998877',
      notification_id: '57866603',
      title: 'Reminder: Pay your monthly bills today.',
      time: '2023-09-14T00:00:00Z',
      status: 'read',
    },
    {
      type: 'cart',
      customer_id: '998877',
      notification_id: '57866604',
      title: 'Special offer for loyal customers: Get 20% off!',
      time: '2023-09-15T08:00:00Z',
      status: 'read',
    },
    {
      type: 'calendar',
      customer_id: '223344',
      notification_id: '57866605',
      title: 'Save the date! Annual company picnic next month.',
      time: '2023-09-07T00:00:00Z',
      status: 'read',
    },
    {
      type: 'cart',
      customer_id: '223344',
      notification_id: '57866606',
      title: 'Last chance to grab these items at a discounted price.',
      time: '2023-09-15T12:00:00Z',
      status: 'read',
    },
  ];

  const handleNotificationRead = () => {};

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
                  }}
                  handleClick={() => router.push('/notification')}
                />
              </SheetClose>
            </div>
          </div>
        </div>
        <div className={` ${styles.newNotificationContainer}`}>
          {notificationData.map((items) => {
            return (
              <div
                key={items.notification_id}
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
                  {items.type === 'calendar' && (
                    <div className={styles.calendarIcon}>
                      <CalenderIcon />
                    </div>
                  )}
                  {items.type === 'cart' && (
                    <div className={styles.cartIcon}>
                      <CartIcon />
                    </div>
                  )}
                </div>
                <div>
                  <p className={styles.newNotificationMessage}>{items.title}</p>
                  <p className={styles.newNotificationStatusTime}>
                    {items.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.loadMoreButtonContainer}>
          <CustomDisplayButton
            displayButtonLabel="Load More"
            displayButtonAllStyle={{
              displayButtonStyle: styles.loadMoreButton,
            }}
          />
        </div>
      </div>
    </>
  );
};
