import React from 'react';

interface ITabProps {
  labels: string[]; // Array of labels for the tabs
  activeIndex: number; // Index of the currently active tab
  onTabClick: (index: number) => void; // Function to handle tab click
}

const Tab: React.FC<ITabProps> = ({ labels, activeIndex, onTabClick }) => {
  return (
    <div className="flex">
      {labels.map((label, index) => (
        <div
          key={label}
          className={`flex-1 py-2 px-4 text-center cursor-pointer border-[1px] border-neutral200 ${
            index === activeIndex
              ? 'bg-neutral0 text-neutral900' // Active tab styling
              : 'bg-primaryMain text-neutral25' // Inactive tab styling
          }
          ${index === 0 && 'rounded-l-[8px]'}
          ${index === labels.length - 1 && 'rounded-r-[8px]'}
          `}
          onClick={() => onTabClick(index)}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default Tab;
