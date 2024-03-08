import React, { useState } from 'react';
import NotificationIcon from '@public/v2/assets/icons/topbar-icons/notification.svg';
import prefrences from '@public/v2/assets/icons/my-account/prefrences.svg';
import markRead from '@public/v2/assets/icons/my-account/mark-read.svg';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover';
import styles from './notification.module.scss';
import {
  useLazyGetNotificationQuery,
  useLazyReadNotificationQuery,
  useSeenNotificationMutation
} from '@/features/api/notification/notification';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import logger from 'logging/log-util';

interface INotification {
  created_at: string;
  icon_url: string;
  id: number;
  message: string;
  read_at: string | null;
  seen_at: string;
  target_page: string;
  title: string;
}
const Notification = () => {
  const [triggerNotification] = useLazyGetNotificationQuery({});
  const [triggerReadNotification] = useLazyReadNotificationQuery({});
  const [seenNotification] = useSeenNotificationMutation({});
  const [notificationData, setNotificationData] = useState<INotification[]>([]);

  const formatCreatedAt = (createdAt: string) => {
    return formatDistanceToNow(new Date(createdAt), {
      addSuffix: true
    });
  };

  const handleReadNotification = (noticeId: number) => {
    triggerReadNotification({
      noticeId
    })
      .then(res => {
        if (res.data) {
          setNotificationData(prevData =>
            prevData.map(notification => {
              if (notification.id === noticeId) {
                return { ...notification, read_at: new Date().toISOString() };
              }
              return notification;
            })
          );
        }
      })
      .catch(error => {
        logger.error(error);
      });
  };
  console.log('notification', notificationData);

  const callNotification = () => {
    triggerNotification({}).then(res => {
      setNotificationData(res.data.notices);
      let notSeenIds: number[] = [];
      res.data.notices.forEach((notification: any) => {
        if (!notification.seen_at.length) {
          notSeenIds.push(notification.id);
        }
      });

      if (notSeenIds.length > 0) {
        seenNotification({ notice_ids: notSeenIds })
          .then(res => {
            logger.info(res);
          })
          .catch(error => {
            logger.error(error);
          });
      }
    });
  };
  const gradientClasses = [
    styles.gradient1,
    styles.gradient2,
    styles.gradient3
  ];

  return (
    <Popover>
      <PopoverTrigger
        className="flex justify-center items-center"
        onClick={() => {
          callNotification();
        }}
      >
        <Image src={NotificationIcon} alt="Notification Icon" />
      </PopoverTrigger>
      {/* Popover content with radio buttons */}
      <PopoverContent>
        <div className="bg-neutral25 w-[447px] border-[1px] border-solid border-primaryBorder shadow-popupsShadow  rounded-[8px] relative top-[5px] right-[13%]">
          <div className="border-solid border-b-[1px] border-neutral-200">
            <h1 className="text-headingS text-neutral-900 font-medium px-[24px] py-[16px]">
              Notifications
            </h1>
          </div>
          {notificationData?.length > 0 &&
            notificationData?.map((items: any, index: number) => {
              // Calculate the gradient index based on the item's index
              const gradientIndex = index % gradientClasses.length;
              // Get the gradient class for the calculated index
              const gradientClass = gradientClasses[gradientIndex];
              return (
                <div
                  key={items.id}
                  onClick={() => {
                    // !items.read_at.length &&
                    handleReadNotification(items.id);
                  }}
                  className={`${
                    !items.read_at.length && gradientClass
                  } flex p-[16px] w-[100%] gap-[15px] cursor-pointer border-b-[1px] border-neutral-200 hover:bg-neutral-50`}
                >
                  <div className="bg-neutral100 w-[40px] h-[40px] flex items-center justify-center rounded-[4px]">
                    <img src={items.icon_url} alt={items.icon_url} />
                  </div>
                  <div className="flex flex-col w-[85%]">
                    <div className="text-neutral-700 text-mMedium font-medium">
                      {items.message}
                    </div>
                    <span className="text-sRegular text-neutral-600 font-regular">
                      {formatCreatedAt(items.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
          <div className="flex justify-between px-[16px] pb-[20px] pt-[20px] border-t-[1px] border-neutral-200">
            <Link
              className="flex items-center gap-2 cursor-pointer"
              href={'/v2/my-account?path=notification-prefrences'}
            >
              <Image src={prefrences} alt="prefrences" />
              <span className="text-neutral-700 text-mRegular">
                Preferences
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Image src={markRead} alt="markRead" />
              <span className="text-neutral-700 text-mRegular">
                Mark all as read
              </span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
