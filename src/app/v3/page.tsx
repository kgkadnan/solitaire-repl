import React from 'react';
// import WorldMap from '../components/world-map';
// import dynamic from 'next/dynamic';
// import GlobeComponent from '@/components/v3/globe';
import AnimatedDotMap from '@/components/v3/animated-map';

// const WorldMap = dynamic(() => import('@/components/v3/world-map'), {
//   ssr: false
// });
const index = () => {
  return (
    <div>
      <AnimatedDotMap />
      {/* <WorldMap /> */}
      {/* <GlobeComponent /> */}
    </div>
  );
};

export default index;
