import { ManageLocales } from '@/utils/v2/translate';
import React from 'react';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import DashboardIcon from '@public/v2/assets/icons/sidebar-icons/dashboard-square.svg?url';
import ArrivalIcon from '@public/v2/assets/icons/sidebar-icons/new-arrivals.svg?url';

import SearchIcon from '@public/v2/assets/icons/sidebar-icons/search.svg?url';
import MyDaimondsIcon from '@public/v2/assets/icons/sidebar-icons/diamond.svg?url';
import BookmarkIcon from '@public/v2/assets/icons/sidebar-icons/bookmark.svg?url';
// import AppointmentIcon from '@public/v2/assets/icons/sidebar-icons/appointment.svg?url';
import CartIcon from '@public/v2/assets/icons/sidebar-icons/shopping-cart.svg?url';
// import SettingIcon from '@public/v2/assets/icons/sidebar-icons/setting.svg?url';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Tooltip from '../tooltip';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { Button } from '../../ui/button';

interface ISideNavigationBar {
  src?: React.ReactNode;
  title: string;
  link?: string;
  isActive?: boolean;
}
const SideNavigationBar = () => {
  const currentRoute = usePathname();
  const currentSubRoute = useSearchParams().get('active-tab');

  const router = useRouter();

  const SideNavigationData: ISideNavigationBar[] = [
    {
      src: <DashboardIcon />,
      title: ManageLocales('app.sideNavigationBar.dashboard'),
      link: Routes.DASHBOARD,
      isActive: currentRoute === Routes.DASHBOARD
    },
    {
      src: <ArrivalIcon />,
      title: ManageLocales('app.sideNavigationBar.newArrivals'),
      link: Routes.NEW_ARRIVAL,
      isActive: currentRoute === Routes.NEW_ARRIVAL
    },
    {
      title: 'line-separator-1'
    },
    {
      src: <SearchIcon />,
      title: ManageLocales('app.sideNavigationBar.search'),
      link: `${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`,
      isActive:
        currentRoute === Routes.SEARCH &&
        currentSubRoute !== SubRoutes.SAVED_SEARCH
    },

    {
      src: <BookmarkIcon />,
      title: ManageLocales('app.sideNavigationBar.bookmark'),
      link: `${Routes.SEARCH}?active-tab=${SubRoutes.SAVED_SEARCH}`,
      isActive:
        currentRoute === Routes.SEARCH &&
        currentSubRoute === SubRoutes.SAVED_SEARCH
    },
    // {
    //   src: <AppointmentIcon />,
    //   title: ManageLocales('app.sideNavigationBar.appointments'),
    //   link: Routes.APPOINTMENTS,
    //   isActive: currentRoute === Routes.APPOINTMENTS
    // },
    {
      src: <CartIcon />,
      title: ManageLocales('app.sideNavigationBar.myCart'),
      link: Routes.MY_CART,
      isActive: currentRoute === Routes.MY_CART
    },
    {
      src: <MyDaimondsIcon />,
      title: ManageLocales('app.sideNavigationBar.yourOrders'),
      link: Routes.YOUR_ORDERS,
      isActive: currentRoute === Routes.YOUR_ORDERS
    }
    // {
    //   title: 'line-separator-2'
    // },
    // {
    //   src: <SettingIcon />,
    //   title: ManageLocales('app.sideNavigationBar.settings'),
    //   link: Routes.SETTINGS,
    //   isActive: currentRoute === Routes.SETTINGS
    // }
  ];
  return (
    <div className="w-[84px] border-r-[1px] border-neutral200 overflow-hidden h-[100vh] fixed z-50 pt-[8px] flex flex-col items-center bg-neutral0">
      <div className="mb-[16px] cursor-pointer">
        <Image
          src={KgkIcon}
          alt="KGK logo"
          onClick={() => router.push(Routes.DASHBOARD)}
        />
      </div>
      <div className="z-50 flex flex-col gap-2">
        {SideNavigationData.map((items: ISideNavigationBar) => {
          return (
            <div className={` border-neutral200 `} key={items.title}>
              {items.link ? (
                <Tooltip
                  tooltipContentSide="right"
                  tooltipTrigger={
                    <div className="">
                      <Button
                        onClick={() => router.push(items.link!)}
                        className={
                          items.isActive
                            ? `bg-primaryMain p-[8px] rounded stroke-neutral25 `
                            : `p-[8px] stroke-primaryIconColor rounded hover:bg-neutral50 `
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
          );
        })}
      </div>
    </div>
  );
};

export default SideNavigationBar;
