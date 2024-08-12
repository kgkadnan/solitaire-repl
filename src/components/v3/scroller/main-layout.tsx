import React from 'react';
import AutoScrollImageGrid from './auto-scroll';

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8 bg-gray-900 text-white flex flex-col justify-center">
        <h1 className="text-6xl font-bold">
          Energize Your Ambition, Pulse Your Way
        </h1>
        <p className="mt-4 text-lg">
          Join us in the pursuit of excellence and take your game to new
          heights.
        </p>
        <button className="mt-8 py-2 px-4 bg-lime-500 text-black font-semibold rounded">
          Get Started
        </button>
      </div>
      <div className="w-1/3 bg-gray-800">
        <AutoScrollImageGrid />
      </div>
    </div>
  );
};

export default MainLayout;
