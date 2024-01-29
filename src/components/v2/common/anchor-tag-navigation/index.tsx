import React, { useRef } from 'react';
import arrowForward from '@public/assets/icons/arrow-forward.svg';
import arrowBackward from '@public/assets/icons/arrow-backword.svg';
import Image from 'next/image';
import { Link } from 'react-scroll';

interface IAnchorLinkNavigation {
  anchorNavigations: string[];
}
const AnchorLinkNavigation: React.FC<IAnchorLinkNavigation> = ({
  anchorNavigations
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex items-center w-full bg-neutral0 sticky top-[60px]">
      <div
        className="flex overflow-x-auto no-scrollbar w-[95%] shadow-sm"
        ref={containerRef}
      >
        {anchorNavigations.map((links, index) => (
          <>
            <Link
              activeStyle={{
                borderBottom: '2px solid var(--neutral-900)',
                color: 'var(--neutral-900)'
              }}
              to={links}
              spy={true}
              smooth={true}
              offset={-210}
              duration={500}
              key={index}
              className={`flex-shrink-0 px-[12px] py-[8px] text-center text-mMedium font-medium capitalize cursor-pointer whitespace-nowrap text-neutral600`}
            >
              {links}
            </Link>
          </>
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
