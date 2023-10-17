'use client';

import React, { useState } from 'react';
import styles from './notification-setting.module.scss';
import { Switch } from '@/components/ui/switch';
import { CustomInputlabel } from '@/components/common/input-label';
import { formatCassing } from '@/utils/format-cassing';
import {
  useGetAllNotificationSettingQuery,
  useUpdateNotificationSettingMutation,
} from '@/slices/notification-setting';

interface INotificationSetting {
  type: string;
  subscription: {
    category: string;
    is_subscribed: boolean;
  }[];
}

const NotificationSetting = () => {
  const { data } = useGetAllNotificationSettingQuery({ type: 'APP' });
  const [updateNotificationSetting] = useUpdateNotificationSettingMutation();

  const [settings, setSettings] = useState<INotificationSetting>({
    type: 'APP',
    subscription: [
      {
        category: 'my_cart',
        is_subscribed: false,
      },
      // {
      //   category: 'new_arrival',
      //   is_subscribed: false,
      // },
      // {
      //   category: 'my_diamonds',
      //   is_subscribed: false,
      // },
      // {
      //   category: 'layouts',
      //   is_subscribed: false,
      // },
      // {
      //   category: 'deal_of_the_day',
      //   is_subscribed: false,
      // },
      // {
      //   category: 'matching_pair',
      //   is_subscribed: false,
      // },
      // {
      //   category: 'bid_to_buy',
      //   is_subscribed: false,
      // },
      // {
      //   category: 'appointments',
      //   is_subscribed: false,
      // },
      // {
      //   category: 'wishlist',
      //   is_subscribed: false,
      // },
    ],
  });

  const toggleHandler = async (category: string) => {
    // Toggle the individual setting
    setSettings((prevSettings) => {
      return {
        ...prevSettings,
        subscription: prevSettings.subscription.map((setting) => {
          if (setting.category === category) {
            return {
              ...setting,
              is_subscribed: !setting.is_subscribed,
            };
          }
          return setting;
        }),
      };
    });
    await updateNotificationSetting(settings);
  };

  // console.log(settings);

  return (
    <div className={styles.notificationSettingContainer}>
      {settings.subscription.map((setting) => {
        const key = setting.category;
        return (
          <div key={key} className="border-b border-solitaireSenary">
            <div className={` ${styles.notificationSettingContent}`}>
              <div className={styles.notificationSettingTitle}>
                <p>Allow notifications of &quot;{formatCassing(key)}&quot;</p>
              </div>

              <div className={styles.toggleContainer}>
                <Switch
                  id={`on${key}`}
                  onClick={() => toggleHandler(key)}
                  className={styles.toggleButton}
                />
                <CustomInputlabel
                  htmlfor={`on${key}`}
                  label={setting.is_subscribed ? 'On' : 'Off'}
                  overriddenStyles={{
                    label: setting.is_subscribed
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
