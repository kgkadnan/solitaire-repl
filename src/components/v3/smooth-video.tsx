// 'use client';

// import React, { useRef, useState, useEffect } from 'react';
// import Pause from '@public/v3/icons/pause.svg';
// import Play from '@public/v3/icons/play.svg';

// import Image from 'next/image';

// const SmoothVideoPlayer = () => {
//   const videoRef: any = useRef<HTMLVideoElement>(null);
//   const [scrollPosition, setScrollPosition] = useState(1);
//   const [isPlaying, setIsPlaying] = useState(true);

//   const handlePlayPause = () => {
//     if (isPlaying) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const videoElement = videoRef.current;
//       if (!videoElement) return;

//       const rect = videoElement.getBoundingClientRect();
//       const windowHeight = window.innerHeight;

//       if (rect.top < 0 && Math.abs(rect.top) < windowHeight) {
//         const negativeTop = Math.abs(rect.top);
//         const visibleRatio = Math.max(1 - negativeTop / windowHeight, 0);
//         visibleRatio <= 0.8 && setScrollPosition(visibleRatio);
//       } else if (rect.top < windowHeight / 2) {
//         setScrollPosition(0.8);
//       } else {
//         setScrollPosition(1);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const clipPathValue =
//     scrollPosition === 1
//       ? 'inset(0% round 0px)' // Fully visible with no border-radius
//       : `inset(${(1 - scrollPosition) * 6.25}% round ${
//           44 * (1 - scrollPosition)
//         }px)`; // Increase inset and border-radius as video moves out

//   const translateX = scrollPosition === 1 ? 0 : -59.3359 * (1 - scrollPosition);
//   const translateY = scrollPosition === 1 ? 0 : -25 * (1 - scrollPosition);

//   return (
//     <div
//       className="welcome-video-wall-container h-[700px] relative"
//       style={{
//         clipPath: clipPathValue,
//         transition: 'clip-path 0.5s ease'
//       }}
//     >
//       <div
//         className="welcome-video-content-container "
//         style={{
//           transition: 'transform 0.5s ease',
//           position: 'relative'
//         }}
//       >
//         <video
//           ref={videoRef}
//           className="welcome-video-video "
//           muted
//           playsInline
//           loop
//           preload="auto"
//           role="img"
//           autoPlay
//           aria-label="A video showcasing the lineup of Mac products"
//           src="/v3/videos/globe.mp4"
//           style={{
//             width: '100%',
//             height: 'auto'
//           }}
//         ></video>
//       </div>
//       <div
//         className="absolute bottom-10 right-20 cursor-pointer"
//         style={{
//           // bottom: '30px',
//           // right: '30px',
//           transform: `matrix(1, 0, 0, 1, ${translateX}, ${translateY})`,
//           opacity: 0.817312,
//           transition: 'transform 0.5s ease'
//         }}
//       >
//         <Image
//           src={isPlaying ? Pause : Play}
//           onClick={handlePlayPause}
//           alt="video control"
//         />
//       </div>
//     </div>
//   );
// };

// export default SmoothVideoPlayer;

'use client';

import React, { useRef, useState, useEffect } from 'react';
import Pause from '@public/v3/icons/pause.svg';
import Play from '@public/v3/icons/play.svg';
import Image from 'next/image';

const SmoothVideoPlayer = () => {
  const videoRef: any = useRef<HTMLVideoElement>(null);
  const [scrollPosition, setScrollPosition] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleScroll = () => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const rect = videoElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < 0 && Math.abs(rect.top) < windowHeight) {
        const negativeTop = Math.abs(rect.top);
        const visibleRatio = Math.max(1 - negativeTop / windowHeight, 0);
        setScrollPosition(visibleRatio <= 0.8 ? visibleRatio : 0.8);
      } else if (rect.top < windowHeight / 2) {
        setScrollPosition(0.8);
      } else {
        setScrollPosition(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const clipPathValue =
    scrollPosition === 1
      ? 'inset(0% round 0px)' // Fully visible with no border-radius
      : `inset(${(1 - scrollPosition) * 6.25}% round ${
          44 * (1 - scrollPosition)
        }px)`; // Increase inset and border-radius as video moves out

  const translateX = scrollPosition === 1 ? 0 : -59.3359 * (1 - scrollPosition);
  const translateY = scrollPosition === 1 ? 0 : -25 * (1 - scrollPosition);

  return (
    <div
      className="welcome-video-wall-container h-[700px] relative"
      style={{
        clipPath: clipPathValue,
        transition: 'clip-path 0.7s ease-in-out'
      }}
    >
      <div
        className="welcome-video-content-container"
        style={{
          transform: `matrix(1, 0, 0, 1, ${translateX}, ${translateY})`,
          transition: 'transform 0.7s ease-in-out',
          position: 'relative'
        }}
      >
        <video
          ref={videoRef}
          className="welcome-video-video"
          muted
          playsInline
          loop
          preload="auto"
          role="img"
          autoPlay
          aria-label="A video showcasing the lineup of Mac products"
          src="/v3/videos/globe.mp4"
          style={{
            width: '100%',
            height: 'auto'
          }}
        ></video>
      </div>
      <div
        className="absolute bottom-10 right-20 cursor-pointer"
        style={{
          transform: `matrix(1, 0, 0, 1, ${translateX}, ${translateY})`,
          opacity: 0.817312,
          transition: 'transform 0.7s ease-in-out'
        }}
      >
        <Image
          src={isPlaying ? Pause : Play}
          onClick={handlePlayPause}
          alt="video control"
        />
      </div>
    </div>
  );
};

export default SmoothVideoPlayer;
