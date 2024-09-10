import React from 'react';
import Image from 'next/image';
import Twitter from '@public/v3/social-media/twitter.svg';
import Facebook from '@public/v3/social-media/facebook.svg';
import Linkedin from '@public/v3/social-media/linkedin.svg';
import Instagram from '@public/v3/social-media/insta.svg';

const Footer = () => {
  return (
    <div className="xl:px-[112px] lg:px-[32px] bg-[#F9FAFB] flex justify-between py-12">
      <p className="text-neutral500 ">
        Copyright © {new Date().getFullYear()} KGK Diamonds. All rights
        reserved.
      </p>
      <div className="flex gap-8">
        <a
          href="https://www.linkedin.com/company/kgk-group/mycompany/"
          target="_blank"
        >
          {' '}
          <Image src={Linkedin} alt={'Linkedin'} />
        </a>
        <a href="https://www.instagram.com/kgk_group/?hl=en" target="_blank">
          {' '}
          <Image src={Instagram} alt={'Instagram'} />
        </a>

        <a
          href="https://www.facebook.com/KGKgroup.officialpage/"
          target="_blank"
        >
          <Image src={Facebook} alt={'Facebook'} />
        </a>
        <a href="https://x.com/kgk_group" target="_blank">
          {' '}
          <Image src={Twitter} alt={'Twitter'} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
