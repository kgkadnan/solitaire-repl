import React, { useEffect, useState } from 'react';
import NotificationIcon from '@public/v2/assets/icons/topbar-icons/notification.svg?url';
import prefrences from '@public/v2/assets/icons/my-account/prefrences.svg';
import markRead from '@public/v2/assets/icons/my-account/mark-read.svg';
import emptyNotification from '@public/v2/assets/icons/empty-notification.svg';
import redDotSvg from '@public/v2/assets/icons/red-dot.svg';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover';
import styles from './notification.module.scss';
import {
  useGetNotificationQuery,
  useLazyGetNotificationQuery,
  useLazyReadNotificationQuery,
  useReadAllNotificationMutation,
  useSeenNotificationMutation
} from '@/features/api/notification';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
// import logger from 'logging/log-util';
import { SocketManager, useSocket } from '@/hooks/v2/socket-manager';
import useUser from '@/lib/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import {
  IN_TRANSIT,
  AVAILABLE_STATUS,
  HOLD_STATUS,
  PAST,
  MEMO_STATUS,
  PENDING,
  SOLD_STATUS
} from '@/constants/business-logic';
import NotificationSkeleton from '@/components/v2/skeleton/notification';
import { Tracking_Dashboard } from '@/constants/funnel-tracking';

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
const Notification = ({
  isInMaintenanceMode,
  pushToDataLayer
}: {
  isInMaintenanceMode: boolean;
  pushToDataLayer: any;
}) => {
  const router = useRouter();
  const currentPath = usePathname();
  const [triggerNotification] = useLazyGetNotificationQuery({});
  const [readAllNotification] = useReadAllNotificationMutation({});
  const { data } = useGetNotificationQuery({});
  const [triggerReadNotification] = useLazyReadNotificationQuery({});
  const [seenNotification] = useSeenNotificationMutation({});
  const [notificationData, setNotificationData] = useState<INotification[]>([]);

  const formatCreatedAt = (createdAt: string) => {
    return formatDistanceToNow(new Date(createdAt), {
      addSuffix: true
    });
  };

  useEffect(() => {
    setNotificationData(data?.notices);
  }, [data]);

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

          let getData = notificationData.filter(data => {
            return data.id === noticeId;
          })[0];

          let splitData = getData.target_page.split(':');
          if (splitData[0] === 'my-cart') {
            if (splitData[1] === 'active') {
              router.push(`/v2/my-cart?path=${AVAILABLE_STATUS}`);
            } else if (splitData[1] === 'memo') {
              router.push(`/v2/my-cart?path=${MEMO_STATUS}`);
            } else if (splitData[1] === 'hold') {
              router.push(`/v2/my-cart?path=${HOLD_STATUS}`);
            } else if (splitData[1] === 'sold') {
              router.push(`/v2/my-cart?path=${SOLD_STATUS}`);
            }
          } else if (splitData[0] === 'appointment') {
            router.push('/v2/my-appointments');
          } else if (splitData[0] === 'bid-to-buy') {
            if (splitData[1] === 'bidHistory') {
              router.push(`/v2/bid-2-buy?path=bidHistory`);
            } else if (splitData[1] === 'bidStone') {
              router.push(`/v2/bid-2-buy?path=bidStone`);
            } else if (splitData[1] === 'activeBid') {
              router.push(`/v2/bid-2-buy?path=activeBid`);
            }
          } else if (splitData[0] === 'new-arrival') {
            if (splitData[1] === 'bidHistory') {
              router.push(`/v2/new-arrivals?path=bidHistory`);
            } else if (splitData[1] === 'bidStone') {
              router.push(`/v2/new-arrivals?path=bidStone`);
            } else if (splitData[1] === 'activeBid') {
              router.push(`/v2/new-arrivals?path=activeBid`);
            }
          } else if (splitData[0] === 'your-orders') {
            if (splitData[1] === 'pendingInvoices') {
              router.push(`/v2/${splitData[0]}?path=${PENDING}`);
            } else if (splitData[1] === 'activeInvoices') {
              router.push(`/v2/${splitData[0]}?path=${IN_TRANSIT}`);
            } else if (splitData[1] === 'invoicesHistory') {
              router.push(`/v2/${splitData[0]}?path=${PAST}`);
            }
          } else if (splitData[0] === 'my-account') {
            router.push(`/v2/my-account`);
          } else if (splitData[0] === 'search') {
            router.push(`/v2/search?active-tab=new-search`);
          } else if (splitData[0] === 'home' || splitData[0] === 'dashboard') {
            router.push(`/v2`);
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const socketManager = new SocketManager();
  const { authToken } = useUser();

  useEffect(() => {
    if (authToken) useSocket(socketManager, authToken);
  }, [authToken, socketManager]);

  useEffect(() => {
    socketManager.on('notification', _data => _handleNotification());

    // Cleanup on component unmount
    return () => {
      socketManager.disconnect();
    };
  }, [socketManager, authToken]);

  const _handleNotification = () => {
    triggerNotification({}).then(res => {
      setNotificationData(res.data.notices);
    });
  };

  const callNotification = () => {
    triggerNotification({}).then(res => {
      setNotificationData(res.data.notices);
      let notSeenIds: number[] = [];
      res.data.notices.forEach((notification: any) => {
        if (!notification?.seen_at?.length) {
          notSeenIds.push(notification?.id);
        }
      });

      if (notSeenIds.length > 0) {
        seenNotification({ notice_ids: notSeenIds })
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  const readAllNotificationHandler = () => {
    readAllNotification({})
      .unwrap()
      .then(_res => {
        setNotificationData(prevData =>
          prevData.map(notification => {
            if (!notification.read_at) {
              return { ...notification, read_at: new Date().toISOString() };
            }
            return notification;
          })
        );
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
        className={`flex justify-center items-center ${
          isInMaintenanceMode &&
          'bg-neutral100 cursor-not-allowed w-[40px] rounded-[4px]'
        }`}
        onClick={_e => {
          callNotification();
          if (
            window?.dataLayer &&
            (currentPath === '/v2' || currentPath === '/')
          ) {
            pushToDataLayer(Tracking_Dashboard.click_notifications);
          }
        }}
      >
        {
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* <Image src={NotificationIcon} alt="Notification Icon" /> */}
            <NotificationIcon
              className={`${
                isInMaintenanceMode ? 'stroke-neutral400' : 'stroke-neutral900'
              }`}
            />
            {notificationData?.some(notification => !notification.seen_at) && (
              <div
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: 0,
                  left: '13px'
                }}
              >
                <Image src={redDotSvg} alt="Red Dot Icon" />
              </div>
            )}
          </div>
        }
      </PopoverTrigger>
      {/* Popover content with radio buttons */}
      {!isInMaintenanceMode && (
        <PopoverContent>
          {data === undefined ? (
            <NotificationSkeleton />
          ) : (
            <div className="bg-neutral25 w-[447px] border-[1px] border-solid border-primaryBorder  shadow-popupsShadow  rounded-[8px] relative top-[5px] right-[13%]">
              <div className="border-solid border-b-[1px] border-neutral200">
                <h1 className="text-headingS text-neutral900 font-medium px-[24px] py-[16px]">
                  Notifications
                </h1>
              </div>

              {notificationData?.length > 0 ? (
                <div className="max-h-[70vh] overflow-y-scroll">
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
                            handleReadNotification(items.id);
                          }}
                          className={`${
                            !items?.read_at?.length && gradientClass
                          } flex p-[16px] w-[100%] gap-[15px] cursor-pointer border-b-[1px] border-neutral200 hover:bg-neutral50 `}
                        >
                          <div
                            className={` w-[40px] h-[40px] flex items-center justify-center rounded-[4px] ${
                              !items?.read_at?.length
                                ? 'bg-neutral0'
                                : 'bg-neutral100'
                            }`}
                          >
                            <img src={items.icon_url} alt={items.icon_url} />
                          </div>
                          <div className="flex flex-col w-[85%]">
                            <div className="text-neutral700 text-mMedium font-medium">
                              {items.message}
                            </div>
                            <span className="text-sRegular text-neutral600 font-regular">
                              {formatCreatedAt(items.created_at)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="flex items-center justify-center py-5">
                  <Image src={emptyNotification} alt="emptyNotification" />
                </div>
              )}

              <div className="flex justify-between px-[16px] pb-[20px] pt-[20px] border-t-[1px] border-neutral200">
                <Link
                  className="flex items-center gap-2 cursor-pointer"
                  href={'/v2/my-account?path=notification-preferences'}
                >
                  <Image src={prefrences} alt="prefrences" />
                  <span className="text-neutral700 text-mRegular">
                    Preferences
                  </span>
                </Link>
                <button
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    readAllNotificationHandler();
                  }}
                >
                  <Image src={markRead} alt="markRead" />
                  <span className="text-neutral700 text-mRegular">
                    Mark all as read
                  </span>
                </button>
              </div>
            </div>
          )}
        </PopoverContent>
      )}
    </Popover>
  );
};

export default Notification;
