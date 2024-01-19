import React, { useEffect, useState, useRef } from 'react';
import arrowForward from '@public/assets/icons/arrow-forward.svg';
import arrowBackward from '@public/assets/icons/arrow-backword.svg';
import Image from 'next/image';

const AnchorLinkNavigation: React.FC = () => {
  const [showArrows, setShowArrows] = useState(false);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  console.log('scrollContainerReff', scrollContainerRef);
  // Function to handle left and right arrow clicks
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount =
        container.offsetWidth * 0.2 * (direction === 'left' ? -1 : 1);
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowArrows(container.scrollWidth > container.clientWidth);
    }
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
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

  console.log('showArrows', showArrows);

  return (
    <div className="flex items-center w-full bg-white sticky top-0">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar w-[95%]"
      >
        {Array(30)
          .fill('dummy')
          .map((_, index) => (
            <a
              key={index}
              className={`section flex-shrink-0 px-4 py-1 text-center cursor-pointer whitespace-nowrap ${
                index === activeTab ? 'border-b-2 border-black-200' : ''
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
          <button onClick={() => scroll('left')} className="mr-2">
            <Image
              src={arrowBackward}
              alt="Scroll Left"
              width={24}
              height={24}
            />
          </button>
          <button onClick={() => scroll('right')} className="ml-2">
            <Image
              src={arrowForward}
              alt="Scroll Right"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default AnchorLinkNavigation;
