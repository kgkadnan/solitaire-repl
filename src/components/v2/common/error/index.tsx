import React from 'react';

const CustomErrorComponent: React.FC<any> = () => {
  return (
    <div className="min-h-[76vh] flex flex-col items-center justify-center text-neutral600">
      <div className="text-center align-middle h-[252px] w-[667px]">
        <p className="text-[100px] bold">503</p>
        <p className="text-[28px] font-medium leading-10 text-center">
          Error 503: Server unavailable
        </p>
        <p className="mt-[20px] text-lg font-medium text-center] px-4">
          Our website is on a quick trip to the diamond district. We will return
          with more sparkle!
        </p>
      </div>
    </div>
  );
};

export default CustomErrorComponent;
