import React, { useEffect, useState, useRef } from 'react';
import arrowForward from '@public/assets/icons/arrow-forward.svg';
import arrowBackward from '@public/assets/icons/arrow-backword.svg';
import Image from 'next/image';

const AnchorLinkNavigation: React.FC = () => {
  const [showArrows, setShowArrows] = useState(false);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const calculateScrollAmount = (
    direction: 'left' | 'right',
    container: HTMLDivElement
  ): number => {
    return container.offsetWidth * 0.2 * (direction === 'left' ? -1 : 1);
  };

  const findNewActiveTab = (container: HTMLDivElement): void => {
    const tabs = container.querySelectorAll('.section');
    tabs.forEach((tab, index) => {
      const rect = tab.getBoundingClientRect();
      if (rect.left >= 0 && rect.right <= container.clientWidth / 2) {
        setActiveTab(index);
        window.location.hash = `#section${index}`;
      }
    });
  };

  const handleScroll = (): void => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowArrows(container.scrollWidth > container.clientWidth);
    }
  };

  const handleTabClick = (index: number): void => {
    setActiveTab(index);
  };

  const handleArrowClick = (direction: 'left' | 'right'): void => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = calculateScrollAmount(direction, container);
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      findNewActiveTab(container);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    window.addEventListener('resize', handleScroll);
    container && container.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render

    return () => {
      window.removeEventListener('resize', handleScroll);
      container && container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex items-center w-full bg-neutral200 sticky top-0 ">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar w-[95%] shadow-sm"
      >
        {Array(30)
          .fill('dummy')
          .map((_, index) => (
            <a
              key={index}
              className={`section flex-shrink-0 px-4 py-1 text-center text-mMedium  cursor-pointer whitespace-nowrap ${
                index === activeTab
                  ? 'border-b-2 border-black-200 text-primaryMain'
                  : 'text-neutral600'
              }`}
              href={`#section${index}`}
              onClick={() => handleTabClick(index)}
            >
              Section {index}
            </a>
          ))}
      </div>

      {showArrows && (
        <div className="flex w-[5%] justify-end">
          <button onClick={() => handleArrowClick('left')}>
            <Image
              src={arrowBackward}
              alt="Scroll Left"
              className="w-[24px] h-[24px]"
            />
          </button>
          <button onClick={() => handleArrowClick('right')}>
            <Image
              src={arrowForward}
              alt="Scroll Right"
              className="w-[24px] h-[24px]"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default AnchorLinkNavigation;
