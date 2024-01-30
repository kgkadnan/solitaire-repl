import { ManageLocales } from '@/utils/v2/translate';
import React from 'react';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';
import DashboardIcon from '@public/v2/assets/icons/sidebar-icons/dashboard-square.svg?url';
import SearchIcon from '@public/v2/assets/icons/sidebar-icons/search.svg?url';
import MyDaimondsIcon from '@public/v2/assets/icons/sidebar-icons/diamond.svg?url';
import BookmarkIcon from '@public/v2/assets/icons/sidebar-icons/bookmark.svg?url';
import AppointmentIcon from '@public/v2/assets/icons/sidebar-icons/appointment.svg?url';
import CartIcon from '@public/v2/assets/icons/sidebar-icons/shopping-cart.svg?url';
import SettingIcon from '@public/v2/assets/icons/sidebar-icons/setting.svg?url';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Tooltip from '../tooltip';
import { Button } from '@/components/ui/button';
import { Routes } from '@/constants/v2/enums/routes';

const SideNavigationBar = () => {
  const currentRoute = usePathname();
  const router = useRouter();
  const SideNavigationData = [
    {
      src: <DashboardIcon />,
      title: ManageLocales('app.sideNavigationBar.dashboard'),
      link: Routes.DASHBOARD,
      isActive: currentRoute === Routes.DASHBOARD
    },
    {
      src: <SearchIcon />,
      title: ManageLocales('app.sideNavigationBar.search'),
      link: Routes.SEARCH,
      isActive: currentRoute === Routes.SEARCH
    },
    {
      src: <MyDaimondsIcon />,
      title: ManageLocales('app.sideNavigationBar.myDiamonds'),
      link: Routes.MYDIAMONDS,
      isActive: currentRoute === Routes.MYDIAMONDS
    },
    {
      src: <BookmarkIcon />,
      title: ManageLocales('app.sideNavigationBar.bookmark'),
      link: Routes.SAVEDSEARCH,
      isActive: currentRoute === Routes.SAVEDSEARCH
    },
    {
      src: <AppointmentIcon />,
      title: ManageLocales('app.sideNavigationBar.appointments'),
      link: Routes.APPOINTMENTS,
      isActive: currentRoute === Routes.APPOINTMENTS
    },
    {
      src: <CartIcon />,
      title: ManageLocales('app.sideNavigationBar.myCart'),
      link: Routes.MYCART,
      isActive: currentRoute === Routes.MYCART
    },
    {
      src: <SettingIcon />,
      title: ManageLocales('app.sideNavigationBar.settings'),
      link: Routes.SETTINGS,
      isActive: currentRoute === Routes.SETTINGS
    }
  ];
  return (
    <div className="w-[84px] border-r-[1px] border-neutral200 overflow-hidden h-[100vh] fixed z-50 pt-[8px] flex flex-col items-center bg-neutral0">
      <div className="mb-[16px] cursor-pointer">
        <Image src={KgkIcon} alt="KGK logo" onClick={() => router.push('/')} />
      </div>
      <div className="z-50">
        {SideNavigationData.map((items: any) => {
          return (
            <div
              className="my-[8px] first:border-b-[1px] last:border-t-[1px] border-neutral200"
              key={items.title}
            >
              <Tooltip
                tooltipContentSide="right"
                tooltipTrigger={
                  <div className="">
                    <Button
                      onClick={() => router.push(items.link)}
                      className={
                        items.isActive
                          ? 'bg-primaryMain p-[8px] rounded stroke-neutral25'
                          : 'p-[8px] stroke-primaryIconColor rounded hover:bg-neutral50'
                      }
                    >
                      {items.src}
                    </Button>
                  </div>
                }
                tooltipContentStyles={'z-50 text-sMedium'}
                tooltipContent={items.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavigationBar;
