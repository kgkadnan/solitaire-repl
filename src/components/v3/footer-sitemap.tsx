import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import kgkLogo from '@public/v3/kgklogo.svg';
import { officeLocation, sitemap } from '@/constants/v3/sitemap';
import Phone from '@public/v3/contact/phone.svg';
import Mail from '@public/v3/contact/mail.svg';
import Copy from '@public/v3/contact/copy.svg';
import Globe from '@public/v3/social-media/newletter-globe.png';
import India from '@public/v3/flags/india.svg';

import { toast } from './ui/use-toast';
import { useGetCountryCodeQuery } from '@/features/api/current-ip';

const FooterSiteMap = () => {
  const { data: currentCountryCode } = useGetCountryCodeQuery({});
  const [footerData, setFooterData] = useState({
    address: `DE-4011, D Tower 4th Floor,
Bharat Diamonds Bourse,
Bandra Kurla Complex,
Bandra East, Mumbai - 400051`,
    phone: '+91-9892421286',
    email: 'ajay.ghiya@kgkmail.com',
    flag: India
  });
  useEffect(() => {
    if (currentCountryCode?.country_name) {
      let country = currentCountryCode?.country_name.toLowerCase();
      if (country === 'united arab emirates' || country === 'israel') {
        setFooterData(officeLocation[1]);
      } else if (country === 'united states') {
        setFooterData(officeLocation[2]);
      } else if (country === 'belgium' || country === 'switzerland') {
        setFooterData(officeLocation[3]);
      } else {
        setFooterData(officeLocation[0]);
      }
    }
  }, [currentCountryCode]);
  return (
    <div className="flex xl:pr-[112px] lg:pr-[32px] justify-between gap-4 bg-[white]">
      <div className="w-[30%] flex flex-col gap-8">
        <Image src={Globe} alt="KGK Globe presence" width={250} />
      </div>
      <div className="w-[70%] flex flex-col justify-center gap-2">
        <Image
          src={kgkLogo}
          alt="KGK logo"
          className="ml-2 h-[48px] w-[36px]"
        />
        <div className="flex justify-between">
          {/* <div className=" flex w-[60%]  justify-between gap-2"> */}
          {sitemap.map(site => (
            <div className="flex gap-4 flex-col" key={site.title}>
              <p className="text-[#667085] text-mMedium font-semiBold pl-2">
                {site.title}
              </p>
              <div className="flex flex-col gap-0">
                {site.content.map(link => (
                  <div className="flex" key={link.data}>
                    {' '}
                    <a
                      href={link.link}
                      className="text-[#475467] hover:text-neutral900 hover:bg-neutral50 px-[8px] rounded-[8px] h-[38px] text-lMedium flex items-center"
                    >
                      {link.data}
                    </a>{' '}
                    {link.isNew && (
                      <div className="rounded-[16px] px-2 py-[2px] bg-[#ECFDF3] text-[#027A48] text-sMedium font-medium">
                        New
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* </div> */}
          <div className="w-[45%] flex flex-col gap-4">
            <p className="text-[#667085] text-mMedium font-semiBold">
              Contact us
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-[#475467] text-lRegular">
                {footerData.address}
              </p>
              <a
                href={`tel:${footerData.phone}`}
                className="flex gap-1 items-center"
              >
                <div className=" flex items-center ">
                  <Image src={Phone} alt={'Phone'} height={24} width={24} />
                </div>
                <Image
                  src={footerData.flag}
                  alt={'Phone'}
                  height={24}
                  width={24}
                />
                <p className="text-neutral600 text-lRegular">
                  {footerData.phone}
                </p>
              </a>
              <div className="flex gap-1 items-center">
                <a
                  href={`mailto:${footerData.email}`}
                  className="flex gap-1 items-center"
                >
                  {' '}
                  <div className="flex items-center ">
                    <Image src={Mail} alt={'Mail'} height={24} width={24} />
                  </div>
                  <p className="text-neutral600 text-lRegular">
                    {footerData.email}{' '}
                  </p>
                </a>
                <Image
                  src={Copy}
                  alt={'Copy'}
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(footerData.email).then(() =>
                      toast({
                        description: 'Copied successfully'
                      })
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSiteMap;
