import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-brightness-50 bg-opacity-50 z-50 flex justify-center items-center z-[1600]">
      <div
        className=" inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-solitaireTertiary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
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
