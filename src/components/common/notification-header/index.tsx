'use client';

import React from 'react';
import styles from './notification-header.module.scss';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { usePathname, useRouter } from 'next/navigation';

const CustomNotificationHeader = () => {
  const router = useRouter();
  let currentPath = usePathname();
  const cardDetailHeaderData = [
    {
      label: 'Notifications',
      link: '/notification/all-notification'
    },
    {
      label: 'Notifications Settings',
      link: '/notification/setting'
    }
  ];

  const handleButtonClick = (link: string) => {
    router.push(`${link}`);
  };

  return (
    <>
      <div className={styles.showAllNotificationContainer}>
        <div className="flex items-center gap-14 ">
          {cardDetailHeaderData.map(cardDetails => {
            const isActive = currentPath === cardDetails.link;
            return (
              <div key={cardDetails.label}>
                <CustomDisplayButton
                  displayButtonAllStyle={{
                    displayButtonStyle: isActive
                      ? styles.activeHeaderButtonStyle
                      : styles.headerButtonStyle,
                    displayLabelStyle: styles.headerButtonLabelStyle
                  }}
                  displayButtonLabel={cardDetails.label}
                  handleClick={() => handleButtonClick(cardDetails.link)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CustomNotificationHeader;
