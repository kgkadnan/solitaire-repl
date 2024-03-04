import React from 'react';

const CustomKGKLoader = () => {
  return (
    <div className="fixed inset-0  backdrop-brightness-50 bg-opacity-10 flex justify-center items-center z-[1600]">
      <img src="/loader.png" alt="Loader" />
    </div>
  );
};

export default CustomKGKLoader;
