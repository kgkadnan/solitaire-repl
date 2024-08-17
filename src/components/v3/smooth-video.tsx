'use client';

import React, { useRef, useState, useEffect } from 'react';

const SmoothVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const rect = videoElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much the video is visible based on scroll position
      const visibleRatio = Math.max(
        Math.min((windowHeight - rect.top) / windowHeight, 1),
        0
      );

      // Set scroll position where 1 is fully visible and 0 is not visible
      setScrollPosition(visibleRatio);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Interpolate values for clip-path and transform matrix
  const clipPathValue = `inset(${(1 - scrollPosition) * 6.25}% round 44px)`;
  const transformValue = `matrix(${1 - (1 - scrollPosition) * 0.05}, 0, 0, ${
    1 - (1 - scrollPosition) * 0.05
  }, 0, 0)`;

  return (
    <div
      className="welcome-video-wall-container"
      style={{
        clipPath: clipPathValue,
        transition: 'clip-path 0.5s ease'
      }}
    >
      <div
        className="welcome-video-content-container"
        style={{
          transform: transformValue,
          transition: 'transform 0.5s ease'
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
          aria-label="A video showcasing the lineup of Mac products"
          src="/v3/videos/globe.mp4"
          style={{
            width: '100%',
            height: 'auto'
          }}
        ></video>
      </div>
    </div>
  );
};

export default SmoothVideoPlayer;
