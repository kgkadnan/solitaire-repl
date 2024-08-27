'use client';
import React, { useEffect, useRef, useState } from 'react';

const VideoScrollComponent: React.FC = () => {
  const [videoHeight, setVideoHeight] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollCount, setScrollCount] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current) {
        setVideoHeight(Math.floor(videoRef.current.duration) * 500); // Adjust 500 to your desired scroll-to-time ratio
      }
    };

    const handleScroll = (event: Event) => {
      if (videoRef.current) {
        const scrollPosition = window.pageYOffset;
        let videoCurrentTime: number | undefined;

        if (scrollCount === 0) {
          // Stop at the 6th second on the first scroll
          videoCurrentTime = Math.min(scrollPosition / 500, 6);
          if (videoCurrentTime >= 6) {
            setScrollCount(1);
          }
        } else if (scrollCount === 1) {
          // Stop at the 14th second on the second scroll
          videoCurrentTime = Math.min(scrollPosition / 500, 14);
          if (videoCurrentTime >= 14) {
            setScrollCount(2);
          }
        }

        if (
          typeof videoCurrentTime === 'number' &&
          !isNaN(videoCurrentTime) &&
          videoCurrentTime < 14 &&
          videoCurrentTime
        ) {
          videoRef.current.currentTime = videoCurrentTime;
        } else {
          console.error('Invalid videoCurrentTime:', videoCurrentTime);
        }

        console.log('Scroll position:', scrollPosition);
        console.log('Video current time:', videoCurrentTime);

        if (scrollCount < 2) {
          event.preventDefault();
        }
      }
    };

    const handleLoad = () => {
      if (videoRef.current) {
        handleResize();
      }
    };

    // Initialize video height when metadata is loaded
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', handleLoad);
    }

    // Add scroll event listener with passive: false to allow preventDefault
    window.addEventListener('scroll', handleScroll, { passive: false });

    // Clean up event listeners
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleLoad);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollCount]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 1) {
      setVideoHeight(Math.floor(videoRef.current.duration) * 500); // Adjust 500 to your desired scroll-to-time ratio
    }
  }, [videoRef.current?.readyState]);

  return (
    <div
      ref={containerRef}
      style={{
        height: videoHeight + 'px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
      }}
      className="flex justify-center"
    >
      <video
        ref={videoRef}
        id="v0"
        preload="auto"
        muted
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          top: 100,
          width: '50%',
          zIndex: 2,
          pointerEvents: 'none' // Disable pointer events to allow interactions with underlying content
        }}
      >
        <source type="video/mp4" src="/v3/videos/globe.mp4" />
      </video>
    </div>
  );
};

export default VideoScrollComponent;
// 'use client';
// import React, { useEffect, useRef, useState } from 'react';

// const VideoScrollComponent: React.FC = () => {
//   const [videoHeight, setVideoHeight] = useState<number>(0);
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const [scrollCount, setScrollCount] = useState<number>(0);

//   useEffect(() => {
//     const handleResize = () => {
//       if (videoRef.current) {
//         const duration = videoRef.current.duration;
//         const ratio = window.innerHeight / duration; // Adjust the ratio based on the viewport height and video duration
//         setVideoHeight(duration * ratio); // Calculate video height based on the ratio
//       }
//     };

//     const handleScroll = (event: Event) => {
//       if (videoRef.current) {
//         const scrollPosition = window.pageYOffset;
//         const duration = videoRef.current.duration;
//         const ratio = window.innerHeight / duration;
//         let videoCurrentTime: number | undefined;

//         if (scrollCount === 0) {
//           // Stop at the 6th second on the first scroll
//           videoCurrentTime = Math.min(scrollPosition / ratio, 6);
//           if (videoCurrentTime >= 6) {
//             setScrollCount(1);
//           }
//         } else if (scrollCount === 1) {
//           // Stop at the 14th second on the second scroll
//           videoCurrentTime = Math.min(scrollPosition / ratio, 14);
//           if (videoCurrentTime >= 14) {
//             setScrollCount(2);
//           }
//         }

//         if (
//           typeof videoCurrentTime === 'number' &&
//           !isNaN(videoCurrentTime) &&
//           videoCurrentTime <= 14
//         ) {
//           videoRef.current.currentTime = videoCurrentTime;
//         }

//         if (scrollCount < 2) {
//           event.preventDefault();
//         }
//       }
//     };

//     const handleLoad = () => {
//       if (videoRef.current) {
//         handleResize();
//       }
//     };

//     // Initialize video height when metadata is loaded
//     if (videoRef.current) {
//       videoRef.current.addEventListener('loadedmetadata', handleLoad);
//     }

//     // Add scroll event listener with passive: false to allow preventDefault
//     window.addEventListener('scroll', handleScroll, { passive: false });

//     // Clean up event listeners
//     return () => {
//       if (videoRef.current) {
//         videoRef.current.removeEventListener('loadedmetadata', handleLoad);
//       }
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [scrollCount]);

//   useEffect(() => {
//     if (videoRef.current && videoRef.current.readyState >= 1) {
//       const duration = videoRef.current.duration;
//       const ratio = window.innerHeight / duration; // Adjust the ratio based on the viewport height and video duration
//       setVideoHeight(duration * ratio); // Calculate video height based on the ratio
//     }
//   }, [videoRef.current?.readyState]);

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         height: videoHeight + 'px',
//         overflow: 'hidden',
//         position: 'relative',
//         zIndex: 1,
//       }}
//       className="flex justify-center"
//     >
//       <video
//         ref={videoRef}
//         id="v0"
//         preload="auto"
//         muted
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           position: 'fixed',
//           top: 100,
//           width: '50%',
//           zIndex: 2,
//           pointerEvents: 'none', // Disable pointer events to allow interactions with underlying content
//         }}
//       >
//         <source type="video/mp4" src="/v3/videos/globe.mp4" />
//       </video>
//     </div>
//   );
// };

// export default VideoScrollComponent;
