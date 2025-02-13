import React, { useEffect, useRef, useState } from 'react';
import arrowForward from '@public/v2/assets/icons/arrow-forward.svg';
import arrowBackward from '@public/v2/assets/icons/arrow-backword.svg';
import Image from 'next/image';
import { Link } from 'react-scroll';
import { kycStatus } from '@/constants/enums/kyc';

export interface IAnchorLinkNavigation {
  anchorNavigations: string[];
}
const AnchorLinkNavigation: React.FC<IAnchorLinkNavigation> = ({
  anchorNavigations
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLink, setActiveLink] = useState('');
  const [allowScrollReset, setAllowScrollReset] = useState(true);

  const handleScroll = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  const handleLinkClick = (link: string) => {
    setAllowScrollReset(false);
    setTimeout(() => {
      setAllowScrollReset(true);
    }, 2000); // Delay to re-enable scroll reset
    setActiveLink(link);
  };

  useEffect(() => {
    const handleUserScroll = () => {
      if (allowScrollReset) {
        setActiveLink('');
      }
    };

    window.addEventListener('scroll', handleUserScroll);

    return () => {
      window.removeEventListener('scroll', handleUserScroll);
    };
  }, [allowScrollReset]);
  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  return (
    <div
      className={`flex items-center w-full bg-neutral0 sticky  z-[2] ${'top-[60px]'} `}
    >
      <div
        className="flex overflow-x-auto no-scrollbar w-[95%] shadow-sm py-[10px]"
        ref={containerRef}
      >
        {anchorNavigations.map(links => (
          <div key={`keys-${links}`}>
            <Link
              activeStyle={{
                borderBottom: '2px solid var(--neutral-900)',
                color: 'var(--neutral-900)'
              }}
              to={links}
              spy={true}
              smooth={true}
              offset={-120}
              duration={100}
              delay={0}
              className={`flex-shrink-0 px-[12px] py-[8px] text-center text-mMedium font-medium capitalize cursor-pointer whitespace-nowrap text-neutral600 ${
                activeLink === links
                  ? 'border-b-2 border-neutral900 text-neutral900'
                  : ''
              }`}
              onClick={() => handleLinkClick(links)}
            >
              {links}
            </Link>
          </div>
        ))}
      </div>

      <div className="flex w-[5%] justify-end">
        <button onClick={() => handleScroll(-150)}>
          <Image
            src={arrowBackward}
            alt="Scroll Left"
            className="w-[24px] h-[24px]"
          />
        </button>
        <button onClick={() => handleScroll(150)}>
          <Image
            src={arrowForward}
            alt="Scroll Right"
            className="w-[24px] h-[24px]"
          />
        </button>
      </div>
    </div>
  );
};

export default AnchorLinkNavigation;
