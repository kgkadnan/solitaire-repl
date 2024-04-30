import React from 'react';

const CustomSlider = ({ filledRange }: any) => {
  const sliderWidth = 300; // Total width of the slider

  return (
    <div className="relative w-full h-10 bg-gray-300 rounded-full">
      {/* Unfilled Range */}
      <div
        className="absolute left-0 top-0 h-full bg-gray-400"
        style={{ width: `${sliderWidth}px` }}
      ></div>
      {/* Filled Range */}
      <div
        className="absolute left-0 top-0 h-full bg-red-500"
        style={{ width: `${filledRange}px` }}
      ></div>
      {/* Pinpoint Circle */}
      <div className="absolute bottom-0 left-[calc((100% * (filledRange / sliderWidth)) - 6px)] transform -translate-x-1/2 bg-yellow-500 w-6 h-6 rounded-full"></div>
    </div>
  );
};

export default CustomSlider;
