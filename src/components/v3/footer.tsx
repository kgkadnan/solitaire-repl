import React from 'react';
import Image from 'next/image';
import Twitter from '@public/v3/social-media/twitter.svg';
import Facebook from '@public/v3/social-media/facebook.svg';
import Linkedin from '@public/v3/social-media/linkedin.svg';

const Footer = () => {
  return (
    <div className="px-[112px] bg-[#F9FAFB] flex justify-between py-12">
      <p className="text-neutral500 ">
        Copyright © {new Date().getFullYear()} KGK Live. All rights reserved.
      </p>
      <div className="flex gap-8">
        <a href="https://x.com/">
          {' '}
          <Image src={Twitter} alt={'Twitter'} />
        </a>
        <a href="https://www.facebook.com/">
          <Image src={Facebook} alt={'Facebook'} />
        </a>
        <a href="https://www.linkedin.com/">
          {' '}
          <Image src={Linkedin} alt={'Linkedin'} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
