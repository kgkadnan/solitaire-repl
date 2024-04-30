// import { VOLUME_DISCOUNT_LIMIT } from '@/constants/business-logic';
// import React from 'react';

// const StaticSlider = ({ filledRange }: any) => {
//   //   const filledRange = 250; // Initial filled range

//   return (
//     <div className=" ">
//       {/* Slider Track */}
//       <div className="bg-[#F9FAFB] rounded-[18px] h-[35px] flex px-2 items-center gap-1 relative">
//         <span className="text-sRegular text-neutral900">$0K</span>
//         <input
//           type="range"
//           min={0}
//           max={300}
//           value={filledRange}
//           className="slider appearance-none h-2 w-full rounded-full"
//           readOnly
//           style={{
//             background: `linear-gradient(to right, #5995ED 0%, #FFAD05 ${
//               filledRange / 3
//             }%, #E4E7EC ${filledRange / 3}%, #E4E7EC 100%)`
//           }}
//         />
//         <span className="text-sRegular text-neutral900">$300K</span>

//       {/* Circular Node at Start */}
//       {/* <div className="absolute top-0 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white"></div> */}
//       {/* Pin at 200 */}
//       <div
//         className="absolute bottom-6 text-center w-16 mx-auto left-0 right-0"
//         style={{ left: `calc(${100}% - 110px)` }}
//       >
//         <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto"></div>
//       </div>
//       <div
//         className="absolute top-7 text-center  left-0 right-0"
//         style={{ left: `calc(${filledRange / 3}%)` }}
//       >
//         <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default StaticSlider;

import React from 'react';

const StaticSlider = ({ filledRange }: any) => {
  return (
    <div className=" ">
      {/* Slider Track */}
      <div className="bg-[#F9FAFB] rounded-[18px] h-[35px] flex px-2 items-center gap-1 relative">
        <span className="text-sRegular text-neutral900">$0K</span>
        <input
          type="range"
          min={0}
          max={300}
          value={filledRange}
          className="slider appearance-none h-2 w-full rounded-full relative"
          readOnly
          style={{
            background: `linear-gradient(to right, #5995ED 0%, #FFAD05 ${
              filledRange / 3
            }%, #E4E7EC ${filledRange / 3}%, #E4E7EC 100%)`
          }}
        />
        <span className="text-sRegular text-neutral900">$300K</span>
        {/* Pinpoint circle at end of filled range */}
        <div
          className="absolute bottom-6 text-center"
          style={{ left: `calc(${(filledRange / 300) * 100}%)` }}
        >
          <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default StaticSlider;
