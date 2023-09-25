'use client';

import CustomNotificationHeader from '@/components/common/notification-header/notification-header';
import React, { useState } from 'react';
import styles from './notification-setting.module.scss';
import { Switch } from '@/components/ui/switch';
import { CustomInputlabel } from '@/components/common/input-label';

interface Settings {
  my_cart: boolean;
  new_arrival: boolean;
  my_diamonds: boolean;
  layouts: boolean;
  deal_of_the_day: boolean;
  matching_pair: boolean;
  bid_to_buy: boolean;
  appointments: boolean;
  wislist: boolean;
  dasdsa: boolean;
  wisdasdlist: boolean;
  wisfdflist: boolean;
}

const NotificationSetting = () => {
  const [settings, setSettings] = useState<Settings>({
    my_cart: false,
    new_arrival: false,
    my_diamonds: false,
    layouts: false,
    deal_of_the_day: false,
    matching_pair: false,
    bid_to_buy: false,
    appointments: false,
    wislist: false,
    dasdsa: false,
    wisdasdlist: false,
    wisfdflist: false,
  });

  const toggleHandler = (key: string) => {
    // Toggle the individual setting
    setSettings((prevSettings: any) => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  return (
    <div className={styles.notificationSettingContainer}>
      <div
        className={`border-b border-solitaireSenary ${styles.showNotificationsHeading}`}
      >
        <p>Notifications</p>
      </div>
      <CustomNotificationHeader />

      {Object.entries(settings).map(([key]) => {
        const formattedKey = key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());

        return (
          <div key={key} className="border-b border-solitaireSenary">
            <div className={` ${styles.notificationSettingContent}`}>
              <div className={styles.notificationSettingTitle}>
                <p>Allow notifications of "{formattedKey}"</p>
              </div>

              <div className={styles.toggleContainer}>
                <Switch
                  id={`on${key}`}
                  onClick={() => toggleHandler(key)}
                  className={styles.toggleButton}
                />
                <CustomInputlabel
                  htmlfor={`on${key}`}
                  label={settings[key as keyof Settings] ? 'On' : 'Off'}
                  overriddenStyles={{
                    label: settings[key as keyof Settings]
                      ? styles.toggleOn
                      : styles.toggleOff,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationSetting;
