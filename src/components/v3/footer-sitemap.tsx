import React from 'react';
import Image from 'next/image';
import kgkLogo from '@public/v3/kgklogo.svg';
import { sitemap } from '@/constants/v3/sitemap';

const FooterSiteMap = () => {
  return (
    <div className="flex px-[112px] py-[64px] justify-between">
      <div className="w-[30%] flex flex-col gap-8">
        <Image src={kgkLogo} alt="KGK logo" />
        <p className="text-[#475467] text-lRegular">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          egestas sagittis commodo.
        </p>
      </div>
      <div className="w-[60%] flex  justify-between">
        {sitemap.map(site => (
          <div className="flex gap-4 flex-col" key={site.title}>
            <p className="text-[#667085] text-mMedium font-semiBold">
              {site.title}
            </p>
            <div className="flex flex-col gap-3">
              {site.content.map(link => (
                <div className="flex gap-2" key={link.data}>
                  {' '}
                  <a
                    href={link.link}
                    className="text-[#475467] font-semiBold text-lMedium"
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
      </div>
    </div>
  );
};

export default FooterSiteMap;
