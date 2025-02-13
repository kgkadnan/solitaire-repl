import { ManageLocales } from '@/utils/v2/translate';
import React, { useState } from 'react';
import KgkIcon from '@public/v2/assets/icons/sidebar-icons/vector.svg';

import SearchIcon from '@public/v2/assets/icons/sidebar-icons/search.svg?url';
import BarcodeIcon from '@public/v2/assets/icons/sidebar-icons/barcode.svg?url';

import styles from './side-navigation.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Tooltip from '../tooltip';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { Button } from '../../ui/button';
import { kycStatus } from '@/constants/enums/kyc';
import { useAppDispatch } from '@/hooks/hook';

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
  // constants

  const currentRoute = usePathname();
  console.log('currentRoute', currentRoute);
  const currentDetailPath = useSearchParams().get('path');

  const [showPulse, setShowPulse] = useState(false);
  const router = useRouter();

  const SideNavigationData: ISideNavigationBar[] = [
    {
      src: <BarcodeIcon />,
      title: 'Diamond Barcode Scanner',
      link: Routes.DIAMOND_BARCODE_SCANNER,
      isActive: currentRoute === Routes.DIAMOND_BARCODE_SCANNER,
      isVisible: true
    },

    {
      src: <SearchIcon />,
      title: ManageLocales('app.sideNavigationBar.search'),
      link: `${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`,
      isActive: currentRoute === Routes.SEARCH,

      isVisible: true
    }
  ];

  return (
    <div className="w-[84px] border-r-[1px] border-neutral200 overflow-hidden h-[100vh] fixed z-50 pt-[8px] flex flex-col items-center bg-neutral0">
      <div className="mb-[16px] cursor-pointer">
        <Image
          src={KgkIcon}
          alt="KGK logo"
          onClick={() => {
            router.push(Routes.SEARCH_TYPE);
          }}
        />
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="z-50 flex flex-col gap-2">
          {SideNavigationData.map((items: ISideNavigationBar) => {
            return (
              items.isVisible && (
                <div
                  className={` border-neutral200 ${
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
                          }`}
                        >
                          <Button
                            onClick={() => {
                              router.push(items.link!);
                            }}
                            className={`${
                              items.isActive && !isInMaintenanceMode
                                ? `bg-primaryMain p-[8px] rounded stroke-neutral25 `
                                : `p-[8px] stroke-primaryIconColor rounded hover:bg-neutral50 `
                            } disabled:bg-neutral100`}
                            disabled={isInMaintenanceMode}
                          >
                            {items.src}
                          </Button>
                        </div>
                      }
                      tooltipContentStyles={'z-[60] text-sMedium'}
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
      </div>
    </div>
  );
};

export default SideNavigationBar;
