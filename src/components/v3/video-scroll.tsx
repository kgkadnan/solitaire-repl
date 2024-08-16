'use client';
import React, { useEffect, useRef, useState } from 'react';

const VideoScrollComponent: React.FC = () => {
  const [videoHeight, setVideoHeight] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVideoEnded, setIsVideoEnded] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current) {
        console.log('Video duration:', videoRef.current.duration);
        setVideoHeight(Math.floor(videoRef.current.duration) * 500); // Adjust 500 to your desired scroll-to-time ratio
      }
    };

    const handleScroll = (event: Event) => {
      if (videoRef.current) {
        const scrollPosition = window.pageYOffset;
        const frameNumber = scrollPosition / 500; // Adjust 500 to match the scroll-to-time ratio
        const videoCurrentTime = Math.min(
          frameNumber,
          videoRef.current.duration
        ); // Ensure currentTime does not exceed video duration

        videoRef.current.currentTime = videoCurrentTime;
        console.log('Scroll position:', scrollPosition);
        console.log('Video current time:', videoCurrentTime);

        if (videoCurrentTime >= videoRef.current.duration) {
          setIsVideoEnded(true);
        } else {
          setIsVideoEnded(false);
        }

        if (!isVideoEnded) {
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
  }, [isVideoEnded]);

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
          top: 50,
          //   left: 0,
          width: '90%',
          zIndex: 2,
          pointerEvents: 'none' // Disable pointer events to allow interactions with underlying content
        }}
      >
        <source
          type="video/mp4"
          // src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
          src="/v3/videos/globe.mp4"
        />
      </video>
      <div style={{ position: 'relative', zIndex: 3 }}>
        <p style={{ fontFamily: 'Helvetica', fontSize: '24px' }}>
          {/* Content here */}
        </p>
        <div style={{ height: '200vh' }}>{/* Scrollable content here */}</div>
      </div>
    </div>
  );
};

export default VideoScrollComponent;
