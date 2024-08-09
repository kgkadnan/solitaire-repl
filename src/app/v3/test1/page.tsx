// // import HeroLightpassCanvas from '@/components/v3/globe-animation';
// import AirpodsScrollAnimationNew from '@/components/v3/test';
// import React from 'react';

// const page = () => {
//   return (
//     <div className="flex justify-center top-50">
//       <AirpodsScrollAnimationNew />
//     </div>
//   );
// };

// export default page;
'use client';
import React, { useEffect, useRef } from 'react';

const AnimatedDiv = () => {
  const divRef = useRef(null);

  useEffect(() => {
    const div: any = divRef.current;
    const animation = div.animate(
      [
        {
          background:
            'radial-gradient(circle at 50% 0, rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0) 70.71%),' +
            'radial-gradient(circle at 6.7% 75%, rgba(0, 0, 255, 0.5), rgba(0, 0, 255, 0) 70.71%),' +
            'radial-gradient(circle at 93.3% 75%, rgba(0, 255, 0, 0.5), rgba(0, 255, 0, 0) 70.71%)',
          transform: 'scale(1)'
        },
        {
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0) 70.71%),' +
            'radial-gradient(circle at 25% 25%, rgba(0, 0, 255, 0.5), rgba(0, 0, 255, 0) 70.71%),' +
            'radial-gradient(circle at 75% 75%, rgba(0, 255, 0, 0.5), rgba(0, 255, 0, 0) 70.71%)',
          transform: 'scale(1.1)'
        }
      ],
      {
        duration: 5000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
      }
    );

    return () => animation.cancel();
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position: 'fixed',
        top: 50,
        marginTop: '100px',
        width: '500px',
        height: '500px',
        // borderRadius: '50%',
        background:
          'radial-gradient(circle at 50% 0, rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0) 70.71%),' +
          'radial-gradient(circle at 6.7% 75%, rgba(0, 0, 255, 0.5), rgba(0, 0, 255, 0) 70.71%),' +
          'radial-gradient(circle at 93.3% 75%, rgba(0, 255, 0, 0.5), rgba(0, 255, 0, 0) 70.71%)'
      }}
    ></div>
  );
};

export default AnimatedDiv;
