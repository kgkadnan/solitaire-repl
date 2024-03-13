import React from 'react';

const CustomKGKLoader = () => {
  return (
    <div
      className="fixed inset-0  flex justify-center items-center z-[1600]"
      style={{ backgroundColor: 'rgba(16, 24, 40, 0.14)' }}
    >
      <img
        src="/loader.gif"
        alt="Loader"
        width={120}
        height={120}
        style={{ borderRadius: '6px' }}
      />
    </div>
  );
};

export default CustomKGKLoader;
