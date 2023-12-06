'use client';

import React, { useState } from 'react';
import { CustomDisplayButton } from '../buttons/display-button';
import { useRouter } from 'next/navigation';
import styles from './bottom-navigation-bar.module.scss';
import { ManageLocales } from '@/utils/translate';

export const BottomNavigationBar = () => {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string>('');
  const bottomNavData = [
    {
      label: ManageLocales('app.bottomNav.aboutUs'),
      link: ''
    },
    {
      label: ManageLocales('app.bottomNav.contactUs'),
      link: ''
    },
    {
      label: ManageLocales('app.bottomNav.privacyPolicy'),
      link: ''
    },
    {
      label: ManageLocales('app.bottomNav.terms'),
      link: ''
    }
  ];

  const handleButtonClick = (label: string, link: string) => {
    setActiveButton(label);
    router.push(link);
  };

  return (
    <>
      <div
        className={`h-[112px] bg-solitaireSecondary flex justify-between pl-32 ${styles.mainBottomNavtionain}`}
      >
        <div className="flex items-center gap-14">
          {bottomNavData.map(bottomNavData => (
            <div key={bottomNavData.label}>
              <CustomDisplayButton
                displayButtonAllStyle={{
                  displayButtonStyle:
                    activeButton === bottomNavData.label
                      ? styles.activeHeaderButtonStyle
                      : styles.headerButtonStyle,
                  displayLabelStyle: styles.footerLabel
                }}
                displayButtonLabel={bottomNavData.label}
                handleClick={() =>
                  handleButtonClick(bottomNavData.label, bottomNavData.link)
                }
              />
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <CustomDisplayButton
            displayButtonAllStyle={{
              displayButtonStyle: styles.copyRightButton,
              displayLabelStyle: styles.footerLabel
            }}
            displayButtonLabel="Copyright © 2022 KGK Live. All rights reserved. "
          />
        </div>
      </div>
    </>
  );
};
