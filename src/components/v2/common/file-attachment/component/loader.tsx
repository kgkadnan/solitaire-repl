import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="inline-block h-[24px] w-[24px] animate-spin rounded-full border-[4px] border-solid border-primaryMain border-r-neutral-200 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
