'use client';

import Carousel from '@/components/v2/common/carousel';
import KAMCard from '@/components/v2/common/kam-card';

const page = () => {
  const images = [
    {
      original: 'https://example.com/photo1.jpg',
      thumbnail: 'https://example.com/photo1_thumb.jpg'
    }
    // Add more images as needed
  ];
  return (
    <div>
      {' '}
      <div>search</div>
      <Carousel images={images} />
      <KAMCard
        name="Mr. Rajeev Sinha"
        role="Key Account Manager"
        phoneNumber="+91 910 876 6432"
        email="rajeev.sinha@kgkmail.com"
      />
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
