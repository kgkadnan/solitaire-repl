// import React from 'react';
// // import WorldMap from '../components/world-map';
// // import dynamic from 'next/dynamic';
// // import GlobeComponent from '@/components/v3/globe';
// import AnimatedDotMap from '@/components/v3/animated-map';
// import AnimatedTextDomino from '@/components/v3/animated-text/domino';
// import AnimatedTextCoffee from '@/components/v3/animated-text/coffee';
// import AnimationSection from '@/components/v3/animated-text/scroll';

// // const WorldMap = dynamic(() => import('@/components/v3/world-map'), {
// //   ssr: false
// // });
// const index = () => {
//   return (
//     <div>
//       <AnimatedDotMap />
//       <div className="flex items-center justify-center h-screen">
//         <AnimatedTextDomino text={'hello'} />
//       </div>
//       <div className="flex items-center justify-center h-screen">
//         <AnimatedTextCoffee text={'hello'} />
//       </div>
//       <AnimationSection>Welcome to the era of scroll animations.</AnimationSection>

//       {/* <WorldMap /> */}
//       {/* <GlobeComponent /> */}
//     </div>
//   );
// };

// export default index;

'use client';

import AnimationSection from '@/components/v3/animated-text/scroll';
// import { AnimatePresence, motion } from 'framer-motion';
// import { useState } from 'react';

export default function Home() {
  // const [video, setVideo] = useState("/section1.mp4");
  // const [bgOpacity, setBgOpacity] = useState(0.7);

  return (
    <main className="min-h-screen">
      <section className="min-h-screen flex justify-center items-center bg-neutral-50">
        <h1 className="font-bold text-neutral-900 text-5xl">Hero section</h1>
      </section>
      <section className="bg-black/70">
        <div className="sticky h-screen inset-0">
          {/* <AnimatePresence mode="popLayout">
            <motion.video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              src={video}
              key={video}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
            />
          </AnimatePresence> */}
          {/* <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: bgOpacity }}
          /> */}
        </div>
        <AnimationSection
        // video="/section1.mp4"
        // setVideo={setVideo}
        // setBgOpacity={setBgOpacity}
        >
          Welcome to the era of scroll animations.
        </AnimationSection>
        <AnimationSection
        // video="/section2.mp4"
        // setVideo={setVideo}
        // setBgOpacity={setBgOpacity}
        >
          This demo seamlessly blends video content with aesthetic interactions.
        </AnimationSection>
        {/* <Section
          video="/section3.mp4"
          setVideo={setVideo}
          setBgOpacity={setBgOpacity}
        >
          You navigate simply by scrolling.
        </Section>
        <Section
          video="/section4.mp4"
          setVideo={setVideo}
          setBgOpacity={setBgOpacity}
        >
          You've never seen everything like this before.
        </Section> */}
      </section>
      <section className="min-h-screen flex justify-center items-center bg-neutral-50">
        <h1 className="font-bold text-neutral-900 text-5xl">Another section</h1>
      </section>
    </main>
  );
}
