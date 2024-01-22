import React, { useRef } from 'react';
import arrowForward from '@public/assets/icons/arrow-forward.svg';
import arrowBackward from '@public/assets/icons/arrow-backword.svg';
import Image from 'next/image';
import styles from './anchor-tag-navigation.module.scss';
import { Link } from 'react-scroll';

const AnchorLinkNavigation: React.FC = () => {
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
    <div className="flex items-center w-full bg-neutral0 sticky top-0">
      <div
        className="flex overflow-x-auto no-scrollbar w-[95%] shadow-sm"
        ref={containerRef}
      >
        {Array(30)
          .fill('dummy')
          .map((_, index) => (
            <Link
              activeClass={styles.active}
              to={`section${index}`}
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              key={index}
              className={`flex-shrink-0 px-4 py-1 text-center text-mMedium font-regular  cursor-pointer whitespace-nowrap text-neutral600`}
            >
              Section {index}
            </Link>
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
