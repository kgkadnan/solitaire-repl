import React from 'react';

const ButtonLoader = () => {
  return (
    <div className=" flex  z-[1600]">
      <div
        className="  h-[20px] w-[20px] animate-spin rounded-full border-[2px] border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};

export default ButtonLoader;
