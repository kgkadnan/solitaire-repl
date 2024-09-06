'use client';

import React, { useRef, useState, useEffect } from 'react';
import Pause from '@public/v3/icons/pause.svg';
import Play from '@public/v3/icons/play.svg';
import Image from 'next/image';

const SmoothVideoPlayer = () => {
  const videoRef: any = useRef<HTMLVideoElement>(null);
  const [scrollPosition, setScrollPosition] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!targetRef.current || !videoRef.current) return;

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of the target is visible
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Play video when the target div is in view
        videoRef.current?.play();
      } else {
        // Pause video when the target div is not in view
        videoRef.current?.pause();
      }
    }, options);

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current!) {
        observer?.unobserve(targetRef.current!); // Clean up observer on component unmount
      }
    };
  }, []);
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

  useEffect(() => {
    // Set the playback rate to slow down the video by 10%
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.9;
    }
  }, []);

  return (
    <div
      className="welcome-video-wall-container h-fit relative flex items-center "
      style={{
        width: '100%'

        // clipPath: clipPathValue,
        // transition: 'clip-path 0.9s ease'
      }}
    >
      <div
        className="welcome-video-content-container"
        style={{
          clipPath: clipPathValue,
          transition: 'clip-path 0.9s ease',
          // transform: `matrix(1, 0, 0, 1, ${translateX}, ${translateY})`,
          // transition: 'transform 0.9s ease',
          position: 'relative'
        }}
      >
        <video
          ref={videoRef}
          className="welcome-video-video cursor-pointer"
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
          onClick={handlePlayPause}
        ></video>
      </div>
      <div
        className="absolute bottom-10 right-20 cursor-pointer"
        style={{
          transform: `matrix(1, 0, 0, 1, ${translateX}, ${translateY})`,
          opacity: 0.817312,
          transition: 'transform 0.9s ease'
        }}
      >
        <Image
          src={isPlaying ? Pause : Play}
          onClick={handlePlayPause}
          alt="video control"
        />
      </div>
      <div className="absolute bottom-11 right-20" ref={targetRef}></div>
    </div>
  );
};

export default SmoothVideoPlayer;
