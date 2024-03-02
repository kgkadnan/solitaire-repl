'use client';

import DashboardCarousel from '@/components/v2/common/carousel';
import KAMCard from '@/components/v2/common/kam-card';
import styles from './search/saved-search/saved-search.module.scss';
import ArrivalIcon from '@public/v2/assets/icons/sidebar-icons/new-arrivals.svg?url';
import CartIcon from '@public/v2/assets/icons/sidebar-icons/shopping-cart.svg?url';
import AppointmentIcon from '@public/v2/assets/icons/sidebar-icons/appointment.svg?url';
// import BidToBuyIcon from '@public/v2/assets/icons/sidebar-icons/bid-to-buy.svg?url';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const options = [
    {
      label: 'New Arrivals',
      icon: <ArrivalIcon />,
      color: styles.gradient1,
      count: 0,
      isAvailable: true,
      link: '/v2/new-arrivals'
    },
    {
      label: 'My Cart',
      icon: <CartIcon />,
      color: styles.gradient2,
      count: 0,
      isAvailable: true,
      link: '/v2/my-cart'
    },
    {
      label: 'Bid to Buy',
      icon: <AppointmentIcon />,
      color: styles.gradient3,
      count: 0,
      isAvailable: false,
      link: '/v2/my-cart'
    },
    {
      label: 'My Appointments',
      icon: <AppointmentIcon />,
      color: styles.gradient4,
      count: 0,
      isAvailable: false,
      link: '/v2/my-cart'
    }
  ];
  return (
    <>
      <div className="flex flex-col gap-4 ">
        {' '}
        <div>
          <div>
            <p>Hello</p>
          </div>
        </div>
        <iframe
          src="https://drive.google.com/file/d/1DsQMFAsZPnEsDGX9TkiCHWhp7WXeMnO0/preview"
          width="640"
          height="480"
          allow="autoplay"
        ></iframe>
        <div className="flex justify-between gap-4">
          {options.map(data => {
            return (
              <div
                className={`border-[1px] border-neutral200 p-[24px] flex rounded-[8px] w-full ${
                  data.isAvailable ? 'cursor-pointer' : 'cursor-default'
                }`}
                key={data.label}
                onClick={
                  data.isAvailable
                    ? () => {
                        router.push(data.link);
                      }
                    : () => {}
                }
              >
                {data.icon}
                <div>
                  <p className="text-neutral600 text-mRegular">{data.label}</p>
                  <p className={`text-neutral900 text-headingS medium `}>
                    {data.isAvailable
                      ? data.count === 0
                        ? '-'
                        : data.count
                      : 'Coming Soon'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex w-full gap-2">
          {' '}
          {/* Ensure the container takes up full width */}
          {/* Carousel Container - Allow it to shrink if necessary but also give it an initial width */}
          <div className="flex-1 flex-shrink min-w-0">
            <DashboardCarousel />
          </div>
          {/* KAMCard Container - Prevent it from shrinking and assign a max width */}
          <div className="flex-shrink-0 w-[300px] max-w-full">
            <KAMCard
              name="Mr. Rajeev Sinha"
              role="Key Account Manager"
              phoneNumber="+91 910 876 6432"
              email="rajeev.sinha@kgkmail.com"
            />
          </div>
        </div>
      </div>
      <div
        className="border-t-[1px] p-4 flex justify-between border-neutral200 text-lRegular 
     
     mt-[20px]"
      >
        {/* for fixed footer */}
        {/* fixed bottom-0 left-[84px] right-0 bg-white  */}
        <div className="text-infoMain  flex gap-2">
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>
        <p className="text-neutral500">
          Copyright © 2022 KGK Live.All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Dashboard;
