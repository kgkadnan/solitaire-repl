import React from 'react';

export interface ITabProps {
  labels: string[]; // Array of labels for the tabs
  activeIndex: number; // Index of the currently active tab
  onTabClick: (_index: number) => void; // Function to handle tab click
  activeCount: number;
  bidCount?: any;
  historyCount: number;
}

const Tab: React.FC<ITabProps> = ({
  labels,
  activeIndex,
  onTabClick,
  activeCount = 0,
  bidCount = 0,
  historyCount = 0
}) => {
  return (
    <div className="flex">
      {labels.map((label, index) => {
        const count =
          index === 0 ? bidCount : index === 1 ? activeCount : historyCount;

        const formattedLabel =
          count !== undefined && count !== ' ' ? `${label} (${count})` : label;

        return (
          <div
            key={label}
            className={`flex-1 py-2 px-4 text-center cursor-pointer border-[1px] border-neutral200 ${
              index === activeIndex
                ? 'bg-primaryMain text-neutral25 border-primaryMain' // Active tab styling
                : 'bg-neutral0 text-neutral900 ' // Inactive tab styling
            }
          ${index === 0 && 'rounded-l-[8px]'}
          ${index === labels.length - 1 && 'rounded-r-[8px]'}
          ${index > 0 ? '-ml-[1px]' : ''}
          `}
            onClick={() => onTabClick(index)}
          >
            {formattedLabel}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
