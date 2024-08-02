// components/AnimatedDotMap.js
import React from 'react';

const locations = [
  { id: 1, name: 'New York', cx: 50, cy: 50, r: 6, color: '#FF5733' },
  { id: 2, name: 'London', cx: 150, cy: 80, r: 8, color: '#33C1FF' },
  { id: 3, name: 'Tokyo', cx: 250, cy: 150, r: 5, color: '#75FF33' }
  // Add more locations as needed
];

const AnimatedDotMap = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <svg
        viewBox="0 0 300 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-full"
      >
        {locations.map(location => (
          <circle
            key={location.id}
            cx={location.cx}
            cy={location.cy}
            r={location.r}
            fill={location.color}
            className="animate-bounce"
          >
            <animate
              attributeName="r"
              from="5"
              to={location.r}
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">Stylized Dot Map</h1>
      </div>
    </div>
  );
};

export default AnimatedDotMap;
