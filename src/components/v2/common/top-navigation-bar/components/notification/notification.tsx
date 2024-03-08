import React from 'react';
import NotificationIcon from '@public/v2/assets/icons/topbar-icons/notification.svg';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover';
import { useGetNotificationQuery } from '@/features/api/notification/notification';

const Notification = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const storedUser = localStorage.getItem('auth');
  const token = storedUser ? JSON.parse(storedUser) : null;
  const { data } = useGetNotificationQuery({});

  const handleImageError = async (event: any) => {
    try {
      const response = await fetch(`${apiURL}store/account/profile/128`, {
        headers: {
          'Custom-Header': 'text/plain',
          Authorization: `Bearer ${token}`
        },
        redirect: 'follow'
      });
      const blob = await response.blob();
      const imageUrl = window.URL.createObjectURL(blob);

      // Replace the src attribute with the new image URL
      event.target.src = imageUrl;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };
  //   console.log('data', data);
  return (
    <Popover>
      <PopoverTrigger className="flex justify-center items-center">
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
          {data?.notices?.map((items: any) => {
            // console.log('items', items);
            return (
              <div key={items.id} className="flex">
                <div>
                  <Image src={''} onLoad={handleImageError} alt="" />
                </div>
                <div className="flex flex-col">
                  <div>{items.message}</div>
                  <span>{items.created_at}</span>
                </div>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
