'use client';

import React, { useRef, useState, useEffect } from 'react';

const SmoothVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollPosition, setScrollPosition] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const rect = videoElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // console.log(rect.top)
      // if (rect.top >= windowHeight) {
      //   setScrollPosition(1); // Video is fully visible, no inset
      // } else
      if (Math.abs(rect.top) < windowHeight) {
        // Calculate how far rect.top has moved up (negative value)
        let visibleRatio;
        if (rect.top < 0) {
          const negativeTop = Math.abs(rect.top);

          // Calculate the visible ratio based on how far out of view the top is
          visibleRatio = Math.max(1 - negativeTop / windowHeight, 0);
        } else {
          const negativeTop = Math.abs(rect.top);

          // Calculate the visible ratio based on how far out of view the top is
          visibleRatio = Math.max(1 + negativeTop / windowHeight, 0);
        }

        setScrollPosition(visibleRatio);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Clip-path logic without any transform/zoom effect
  const clipPathValue =
    scrollPosition === 1
      ? 'inset(0% round 44px)' // Fully visible
      : `inset(${(1 - scrollPosition) * 6.25}% round 44px)`; // Increase inset as video moves out
  console.log(scrollPosition);
  return (
    <div
      className="welcome-video-wall-container h-[700px]"
      style={{
        clipPath: clipPathValue,
        transition: 'clip-path 0.5s ease'
      }}
    >
      <div
        className="welcome-video-content-container"
        style={{
          transition: 'transform 0.5s ease' // Apply smooth transition for clip-path changes
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
