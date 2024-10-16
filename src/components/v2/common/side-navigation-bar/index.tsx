import { ManageLocales } from '@/utils/v2/translate';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import DashboardIcon from '@public/v2/assets/icons/sidebar-icons/dashboard-square.svg?url';
import ArrivalIcon from '@public/v2/assets/icons/sidebar-icons/new-arrivals.svg?url';
import Bid2BuyIcon from '@public/v2/assets/icons/sidebar-icons/bid-2-buy.svg?url';
import SearchIcon from '@public/v2/assets/icons/sidebar-icons/search.svg?url';
import MatchingPairIcon from '@public/v2/assets/icons/sidebar-icons/matching-pair.svg?url';

import MyDaimondsIcon from '@public/v2/assets/icons/sidebar-icons/diamond.svg?url';
import BookmarkIcon from '@public/v2/assets/icons/sidebar-icons/bookmark.svg?url';
import MyAppointments from '@public/v2/assets/icons/sidebar-icons/my-appointments.svg?url';
import FaqsIcon from '@public/v2/assets/icons/sidebar-icons/faqs.svg?url';
import CartIcon from '@public/v2/assets/icons/sidebar-icons/shopping-cart.svg?url';
import TurkeyIcon from '@public/v2/assets/icons/sidebar-icons/turkey.svg?url';
import styles from './side-navigation.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Tooltip from '../tooltip';
import { MatchSubRoutes, Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { Button } from '../../ui/button';
import { SocketManager, useSocket } from '@/hooks/v2/socket-manager';
import useUser from '@/lib/use-auth';
import { kycStatus } from '@/constants/enums/kyc';
import { useAppDispatch } from '@/hooks/hook';
import { setStartTime } from '@/features/track-page-event/track-page-event-slice';
import pako from 'pako';
import { useGetNavigationQuery } from '@/features/api/faqs';

interface ISideNavigationBar {
  src?: React.ReactNode;
  title: string;
  link?: string;
  isActive?: boolean;
  isVisible?: boolean;
}
const SideNavigationBar = ({
  isInMaintenanceMode
}: {
  isInMaintenanceMode: boolean;
}) => {
  const dispatch = useAppDispatch();

  const currentRoute = usePathname();
  const currentSubRoute = useSearchParams().get('active-tab');
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  const [showPulse, setShowPulse] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const router = useRouter();
  const { data: event } = useGetNavigationQuery({});

  useEffect(() => {
    setShowEvent(event?.turkey_event);
  }, [event]);
  const CustomSVG = () => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" />
      <g clipPath="url(#clip0_15648_63351)">
        <path d="M5 10.5H35V29.5H5V10.5Z" fill="#E30A17" />
        <path
          d="M18.9168 20L23.4394 18.6041L20.6441 22.2588V17.7412L23.4394 21.3959L18.9168 20ZM19.2251 22.54C18.6458 23.4096 17.7849 24.077 16.7719 24.4417C15.7589 24.8064 14.6486 24.8487 13.6082 24.5623C12.5677 24.2758 11.6533 23.676 11.0025 22.8532C10.3518 22.0304 10 21.0291 10 20C10 18.9709 10.3518 17.9696 11.0025 17.1468C11.6533 16.324 12.5677 15.7242 13.6082 15.4377C14.6486 15.1513 15.7589 15.1936 16.7719 15.5583C17.7849 15.923 18.6458 16.5904 19.2251 17.46C18.6842 16.8882 17.9733 16.4857 17.1865 16.3056C16.3997 16.1256 15.574 16.1766 14.8183 16.4517C14.0626 16.7269 13.4125 17.2134 12.954 17.8469C12.4954 18.4804 12.25 19.2312 12.25 20C12.25 20.7688 12.4954 21.5196 12.954 22.1531C13.4125 22.7866 14.0626 23.2731 14.8183 23.5483C15.574 23.8234 16.3997 23.8744 17.1865 23.6944C17.9733 23.5143 18.6842 23.1118 19.2251 22.54Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_15648_63351">
          <rect x="5" y="10.5" width="30" height="19" rx="2" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const SideNavigationData: ISideNavigationBar[] = [
    {
      src: <DashboardIcon />,
      title: ManageLocales('app.sideNavigationBar.dashboard'),
      link: Routes.DASHBOARD,
      isActive: currentRoute === Routes.DASHBOARD || currentRoute === '/',
      isVisible: true
    },
    {
      src: <ArrivalIcon />,
      title: ManageLocales('app.sideNavigationBar.newArrivals'),
      link: Routes.NEW_ARRIVAL,
      isActive: currentRoute === Routes.NEW_ARRIVAL,
      isVisible: true
    },
    {
      src: <Bid2BuyIcon />,
      title: ManageLocales('app.sideNavigationBar.bidToBuy'),
      link: `${Routes.BID_TO_BUY}`,
      isActive: currentRoute === Routes.BID_TO_BUY,
      isVisible: true
    },
    {
      src:
        currentRoute === Routes.TURKEY ? (
          <div className="border-[1px] border-[#5D6A6A] rounded-[4px]">
            <CustomSVG />
          </div>
        ) : (
          <div className="border-[1px] border-neutral300 rounded-[4px]">
            <CustomSVG />
          </div>
        ),
      title: 'Turkey Show',
      link: Routes.TURKEY,
      isActive: currentRoute === Routes.TURKEY,
      isVisible: showEvent
    },
    {
      title: 'line-separator-1',
      isVisible: true
    },
    {
      src: <SearchIcon />,
      title: ManageLocales('app.sideNavigationBar.search'),
      link: `${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`,
      isActive:
        currentRoute === Routes.SEARCH &&
        currentSubRoute !== SubRoutes.SAVED_SEARCH,
      isVisible: true
    },
    {
      src: <MatchingPairIcon />,
      title: ManageLocales('app.sideNavigationBar.matchingPair'),
      link: `${Routes.MATCHING_PAIR}?active-tab=${MatchSubRoutes.NEW_SEARCH}`,
      isActive:
        currentRoute === Routes.MATCHING_PAIR &&
        currentSubRoute !== MatchSubRoutes.SAVED_SEARCH,
      isVisible: true
    },

    {
      src: <BookmarkIcon />,
      title: ManageLocales('app.sideNavigationBar.bookmark'),
      link: `${Routes.SEARCH}?active-tab=${SubRoutes.SAVED_SEARCH}`,
      isActive:
        (currentRoute === Routes.SEARCH ||
          currentRoute === Routes.MATCHING_PAIR) &&
        currentSubRoute === SubRoutes.SAVED_SEARCH,
      isVisible: true
    },

    {
      src: <CartIcon />,
      title: ManageLocales('app.sideNavigationBar.myCart'),
      link: Routes.MY_CART,
      isActive: currentRoute === Routes.MY_CART,
      isVisible: true
    },
    {
      src: <MyDaimondsIcon />,
      title: ManageLocales('app.sideNavigationBar.yourOrders'),
      link: Routes.YOUR_ORDERS,
      isActive: currentRoute === Routes.YOUR_ORDERS,
      isVisible: true
    },
    {
      src: <MyAppointments />,
      title: ManageLocales('app.sideNavigationBar.myAppointments'),
      link: Routes.MY_APPOINTMENTS,
      isActive: currentRoute === Routes.MY_APPOINTMENTS,
      isVisible: true
    }
  ];

  const SideNavigationBottomData: ISideNavigationBar[] = [
    {
      src: <FaqsIcon />,
      title: ManageLocales('app.sideNavigationBar.faqs'),
      link: Routes.FAQS,
      isActive: currentRoute === Routes.FAQS
    }
  ];
  const { authToken } = useUser();

  const socketManager = useMemo(() => new SocketManager(), []);
  useEffect(() => {
    if (authToken) useSocket(socketManager, authToken);
  }, [authToken]);

  // const handleBidStones = useCallback((data: any) => {
  //   if (data.endTime) {
  //     setShowPulse(true);
  //   } else {
  //     setShowPulse(false);
  //   }
  //   // Set other related state here
  // }, []);

  async function decompressData<T = unknown>(
    compressedData: Uint8Array | ArrayBuffer | any
  ): Promise<T> {
    try {
      // Ensure compressedData is a Uint8Array
      const uint8Array: Uint8Array =
        compressedData instanceof Uint8Array
          ? compressedData
          : new Uint8Array(compressedData);

      // Decompress the data using pako
      const decompressed: string = await new Promise<string>(
        (resolve, reject) => {
          try {
            const result = pako.ungzip(uint8Array, { to: 'string' });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      );

      // Parse the decompressed string into JSON
      const data: T = JSON.parse(decompressed);
      return data;
    } catch (err: unknown) {
      // Ensure we have proper type checking for error
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Decompression failed: ${errorMessage}`);
      throw err;
    }
  }

  const handleBidStones = useCallback(
    async ({ part, message_id, data }: any) => {
      try {
        const decompressedPart: any = await decompressData(data);

        if (part === 1) {
          if (decompressedPart?.endTime ?? '') {
            setShowPulse(true);
          } else {
            setShowPulse(false);
          }
        }
      } catch (error) {
        console.error(
          `Failed to decompress part ${part} of message ${message_id}:`,
          error
        );
      }
    },
    []
  );

  useEffect(() => {
    const handleRequestGetBidStones = (_data: any) => {
      socketManager.emit('get_bidtobuy_stones');
    };
    socketManager.on('bidtobuy_stones', handleBidStones);

    // Setting up the event listener for "request_get_bid_stones"
    socketManager.on('request_get_bidtobuy_stones', handleRequestGetBidStones);

    // Return a cleanup function to remove the listeners
    return () => {
      socketManager.off('bidtobuy_stones', handleBidStones);
      socketManager.off(
        'request_get_bidtobuy_stones',
        handleRequestGetBidStones
      );
    };
  }, [socketManager, handleBidStones, authToken]);

  return (
    <div className="w-[84px] border-r-[1px] border-neutral200 overflow-hidden h-[100vh] fixed z-50 pt-[8px] flex flex-col items-center bg-neutral0">
      <div className="mb-[16px] cursor-pointer">
        <Image
          src={KgkIcon}
          alt="KGK logo"
          onClick={() => router.push(Routes.DASHBOARD)}
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="z-50 flex flex-col gap-2">
          {SideNavigationData.map((items: ISideNavigationBar) => {
            return (
              items.isVisible && (
                <div
                  className={` border-neutral200 ${
                    (items.link === Routes.MY_APPOINTMENTS &&
                      isKycVerified?.customer?.kyc?.status !==
                        kycStatus.APPROVED) ||
                    isInMaintenanceMode
                      ? '!cursor-not-allowed'
                      : 'cursor-pointer'
                  }`}
                  key={items.title}
                >
                  {items.link ? (
                    <Tooltip
                      tooltipContentSide="right"
                      tooltipTrigger={
                        <div
                          className={` ${
                            items.link === Routes.BID_TO_BUY &&
                            !isInMaintenanceMode &&
                            showPulse &&
                            styles.notification_dot
                          } ${
                            items.link === Routes.BID_TO_BUY &&
                            !isInMaintenanceMode &&
                            showPulse &&
                            styles.pulse
                          }`}
                        >
                          <Button
                            onClick={() => {
                              if (
                                items.link ===
                                `${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`
                              ) {
                                dispatch(
                                  setStartTime(new Date().toISOString())
                                );
                              }

                              router.push(items.link!);
                            }}
                            className={`${
                              items.link === Routes.TURKEY
                                ? currentRoute === Routes.TURKEY
                                  ? `px-[3px] py-[6px]  rounded h-[40px] w-[40px]`
                                  : `rounded hover:bg-neutral50 h-[40px] w-[40px]`
                                : items.isActive && !isInMaintenanceMode
                                ? `bg-primaryMain p-[8px] rounded stroke-neutral25 `
                                : `p-[8px] stroke-primaryIconColor rounded hover:bg-neutral50 `
                            } disabled:bg-neutral100`}
                            disabled={
                              (items.link === Routes.MY_APPOINTMENTS &&
                                isKycVerified?.customer?.kyc?.status !==
                                  kycStatus.APPROVED) ||
                              isInMaintenanceMode
                            }
                          >
                            {items.src}
                          </Button>
                        </div>
                      }
                      tooltipContentStyles={'z-50 text-sMedium'}
                      tooltipContent={items.title}
                    />
                  ) : (
                    <hr className="border-none h-[1px] bg-neutral200" />
                  )}
                </div>
              )
            );
          })}
        </div>
        <div className="z-50 flex flex-col gap-2 mb-[36px]">
          {SideNavigationBottomData.map((items: ISideNavigationBar) => {
            return (
              <div
                className={` border-neutral200 ${
                  isInMaintenanceMode ? '!cursor-not-allowed' : 'cursor-pointer'
                }`}
                key={items.title}
              >
                {items.link ? (
                  <Tooltip
                    tooltipContentSide="right"
                    tooltipTrigger={
                      <div
                        className={` ${
                          items.link === Routes.BID_TO_BUY &&
                          showPulse &&
                          styles.notification_dot
                        } ${
                          items.link === Routes.BID_TO_BUY &&
                          showPulse &&
                          styles.pulse
                        }`}
                      >
                        <Button
                          onClick={() => router.push(items.link!)}
                          className={
                            items.isActive && !isInMaintenanceMode
                              ? `bg-primaryMain p-[8px] rounded stroke-neutral25`
                              : `p-[8px] stroke-primaryIconColor rounded hover:bg-neutral50 `
                          }
                          disabled={isInMaintenanceMode}
                        >
                          {items.src}
                        </Button>
                      </div>
                    }
                    tooltipContentStyles={'z-50 text-sMedium'}
                    tooltipContent={items.title}
                  />
                ) : (
                  <hr className="border-none h-[1px] bg-neutral200" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNavigationBar;
