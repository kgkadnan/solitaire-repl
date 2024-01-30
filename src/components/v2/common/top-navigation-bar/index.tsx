import React from 'react';
import NotificationIcon from '@public/v2/assets/icons/topbar-icons/notification.svg';
import Image from 'next/image';
import { Avatar, AvatarImage } from '../../ui/avatar';

const TopNavigationBar = () => {
  return (
    <div className="min-h-[60px] border-b-[1px] border-neutral200 sticky top-0 bg-neutral0 z-[3] flex justify-end items-center pr-[32px]">
      <div className="z-50 flex gap-[16px]">
        <Image src={NotificationIcon} alt="Notification Icon" />
        <Avatar>
          <AvatarImage
            className="h-[40px] w-[40px]"
            src="https://github.com/shadcn.png"
            alt="Avatar Icon"
          />
        </Avatar>
      </div>
    </div>
  );
};

export default TopNavigationBar;
