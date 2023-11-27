'use client';

import React, { useEffect, useState } from 'react';
import styles from './notification-setting.module.scss';
import { Switch } from '@/components/ui/switch';
import { CustomInputlabel } from '@/components/common/input-label';
import { formatCassing } from '@/utils/format-cassing';
import {
  useGetAllNotificationSettingQuery,
  useUpdateNotificationSettingMutation,
} from '@/features/api/notification-setting';
import { INotificationSetting } from './setting-interface';
import { NOTIFICATION_TYPE } from '@/constants/constant';

const NotificationSetting = () => {
  const { data } = useGetAllNotificationSettingQuery({
    type: NOTIFICATION_TYPE,
  });
  const [updateNotificationSetting] = useUpdateNotificationSettingMutation();
  const [settings, setSettings] = useState<INotificationSetting>({
    type: '',
    subscription: [],
  });

  useEffect(() => {
    setSettings({ type: NOTIFICATION_TYPE, subscription: data?.data });
  }, [data]);

  const toggleHandler = async (category: string) => {
    // Toggle the individual setting
    setSettings((prevSettings) => {
      const updatedSettings = {
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

      updateNotificationSetting(updatedSettings);

      return updatedSettings;
    });
  };

  return (
    <div className={styles.notificationSettingContainer}>
      {settings?.subscription?.map((setting) => {
        const key = setting?.category;
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
                  checked={setting.is_subscribed}
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
