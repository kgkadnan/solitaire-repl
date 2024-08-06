import React from 'react';
// import WorldMap from '../components/world-map';
// import dynamic from 'next/dynamic';
// import GlobeComponent from '@/components/v3/globe';
import AnimatedDotMap from '@/components/v3/animated-map';
import AnimatedTextDomino from '@/components/v3/animated-text/domino';
import AnimatedTextCoffee from '@/components/v3/animated-text/coffee';

// const WorldMap = dynamic(() => import('@/components/v3/world-map'), {
//   ssr: false
// });
const index = () => {
  return (
    <div>
      <AnimatedDotMap />
      <div className="flex items-center justify-center h-screen">
        <AnimatedTextDomino text={'hello'} />
      </div>
      <div className="flex items-center justify-center h-screen">
        <AnimatedTextCoffee text={'hello'} />
      </div>
      {/* <WorldMap /> */}
      {/* <GlobeComponent /> */}
    </div>
  );
};

export default index;
