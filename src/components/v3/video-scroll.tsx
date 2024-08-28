'use client';
import React, { useEffect, useRef, useState } from 'react';

const VideoScrollComponent: React.FC = () => {
  const [videoHeight, setVideoHeight] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollCount, setScrollCount] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current && videoDuration > 0) {
        // Adjust 2000 to your desired scroll-to-time ratio
        setVideoHeight(videoDuration * 3000);
      }
    };

    const handleScroll = (event: Event) => {
      if (videoRef.current) {
        const scrollPosition = window.pageYOffset;
        let videoCurrentTime: number | undefined;

        // Ratio of scroll to video time (adjust 3000 as needed)
        const scrollToTimeRatio = 3000;

        if (scrollCount === 0) {
          // Stop at the 6th second on the first scroll
          videoCurrentTime = Math.min(scrollPosition / scrollToTimeRatio, 6);
          if (videoCurrentTime >= 6) {
            setScrollCount(1);
          }
        } else if (scrollCount === 1) {
          // Stop at the 14th second on the second scroll
          videoCurrentTime = Math.min(scrollPosition / scrollToTimeRatio, 14);
          if (videoCurrentTime >= 14) {
            setScrollCount(2);
          }
        } else {
          // Continue playing until the video ends
          videoCurrentTime = Math.min(
            scrollPosition / scrollToTimeRatio,
            videoDuration
          );
        }

        if (typeof videoCurrentTime === 'number' && !isNaN(videoCurrentTime)) {
          videoRef.current.currentTime = videoCurrentTime;
          if (videoCurrentTime >= videoDuration - 0.5) {
            videoRef.current.pause(); // Pause slightly before the end to prevent missing the last second
          }
        } else {
          console.error('Invalid videoCurrentTime:', videoCurrentTime);
        }

        // Prevent scrolling if the video hasn't reached its end
        if (
          scrollCount < 2 &&
          videoCurrentTime !== undefined &&
          videoCurrentTime < videoDuration
        ) {
          event.preventDefault(); // Prevent the default scroll behavior
        }
      }
    };

    const handleLoad = () => {
      if (videoRef.current) {
        setVideoDuration(videoRef.current.duration);
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
  }, [scrollCount, videoDuration]);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 1) {
      setVideoDuration(videoRef.current.duration);
      setVideoHeight(videoRef.current.duration * 3000); // Adjust 3000 to your desired scroll-to-time ratio
    }
  }, [videoRef.current?.readyState]);

  return (
    <div
      ref={containerRef}
      style={{
        height: videoHeight + 'px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        background: 'radial-gradient(circle, #FFFFFF, #344444)'
      }}
      className="flex justify-center "
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
          width: '70%',
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
