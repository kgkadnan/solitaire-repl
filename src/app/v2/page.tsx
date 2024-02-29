'use client';

import DashboardCarousel from '@/components/v2/common/carousel';
import KAMCard from '@/components/v2/common/kam-card';

const page = () => {
  return (
    <div>
      {' '}
      <div>search</div>
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
      <div className="border-t-[1px] p-4 flex justify-between border-neutral200 text-lRegular fixed bottom-0 left-[84px] right-0 bg-white mt-[20px]">
        <div className="text-infoMain  flex gap-2">
          <p>Terms & Conditions</p>
          <p>Privacy Policy</p>
        </div>
        <p className="text-neutral500">
          Copyright © 2022 KGK Live.All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default page;
