'use client';

import React, { useEffect, useState } from 'react';
import styles from './notification-header.module.scss';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import { useRouter } from 'next/navigation';

const CustomNotificationHeader = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('Notifications');
  const cardDetailHeaderData = [
    {
      label: 'Notifications',
      link: '/notification',
    },
    {
      label: 'Notifications Settings',
      link: '/notification/setting',
    },
  ];

  const handleButtonClick = (label: string, link: string) => {
    setActiveTab(label);
    router.push(`${link}?lang=en`);
  };

  return (
    <>
      <div className={styles.showAllNotificationContainer}>
        <div className="flex items-center gap-14 mt-[15px]">
          {cardDetailHeaderData.map((cardDetails) => (
            <div key={cardDetails.label}>
              <CustomDisplayButton
                displayButtonAllStyle={{
                  displayButtonStyle:
                    activeTab === cardDetails.label
                      ? styles.activeHeaderButtonStyle
                      : styles.headerButtonStyle,
                  displayLabelStyle: styles.headerButtonLabelStyle,
                }}
                displayButtonLabel={cardDetails.label}
                handleClick={() =>
                  handleButtonClick(cardDetails.label, cardDetails.link)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomNotificationHeader;
