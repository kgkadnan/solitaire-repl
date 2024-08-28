'use client';
import React, { useEffect, useRef, useState } from 'react';

const VideoScrollComponentNew: React.FC = () => {
  const videoRef: any = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [scrollTriggered, setScrollTriggered] = useState<boolean>(false);
  const [videoPlayedOnce, setVideoPlayedOnce] = useState<boolean>(false);
  const [lastScrollPos, setLastScrollPos] = useState<number>(0);
  const [isReversing, setIsReversing] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const currentScrollPos =
        window.pageYOffset || document.documentElement.scrollTop;

      if (videoRef.current && !isVideoPlaying && !videoPlayedOnce) {
        // Start playing the video when the user scrolls for the first time
        videoRef.current.play();
        setIsVideoPlaying(true);
        setScrollTriggered(true);

        // Disable global scroll while the video is playing
        document.body.style.overflow = 'hidden';

        // Prevent global scroll while the video is playing
        event.preventDefault();
      } else if (scrollTriggered && videoPlayedOnce && !isVideoPlaying) {
        // Resume playing the video when the user scrolls further
        videoRef.current.play();
        setIsVideoPlaying(true);

        // Prevent global scroll while the video is playing
        event.preventDefault();
      }

      // Determine scroll direction
      if (currentScrollPos < lastScrollPos && videoRef.current) {
        // User is scrolling up, play video backward
        setIsReversing(true);
        videoRef.current.playbackRate = -1; // Play video in reverse
        if (videoRef.current.currentTime === 0) {
          videoRef.current.pause(); // Pause when reaching the start
        }
      } else if (currentScrollPos > lastScrollPos && videoRef.current) {
        // User is scrolling down, play video forward
        setIsReversing(false);
        videoRef.current.playbackRate = 1; // Play video forward
      }

      setLastScrollPos(currentScrollPos);
    };

    // Add scroll event listener with passive: false to allow preventDefault
    window.addEventListener('scroll', handleScroll, { passive: false });

    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = ''; // Re-enable global scroll when the component unmounts
    };
  }, [isVideoPlaying, scrollTriggered, videoPlayedOnce, lastScrollPos]);

  useEffect(() => {
    if (videoRef.current) {
      const handleTimeUpdate = () => {
        // Pausing the video at the end or beginning depending on the direction
        if (
          videoRef.current.currentTime >= 6.75 &&
          !videoPlayedOnce &&
          !isReversing
        ) {
          videoRef.current.pause();
          videoRef.current.currentTime = 6.9;
          setIsVideoPlaying(false);
          setVideoPlayedOnce(true);

          // Re-enable global scroll for the next scroll event
          document.body.style.overflow = '';
        } else if (videoRef.current.currentTime <= 0 && isReversing) {
          videoRef.current.pause();
          setIsVideoPlaying(false);

          // Re-enable global scroll after the video stops at the start
          document.body.style.overflow = '';
        } else if (
          videoRef.current.currentTime >= 15 &&
          videoPlayedOnce &&
          !isReversing
        ) {
          videoRef.current.pause();
          videoRef.current.currentTime = 15;
          setIsVideoPlaying(false);

          // Re-enable global scroll after the video stops at 15 seconds
          document.body.style.overflow = '';
        }
      };

      // Add time update listener to control playback
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);

      // Clean up time update listener
      return () => {
        videoRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [videoPlayedOnce, isReversing]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 0);
  }, []);

  return (
    <div
      style={{
        height: '300vh',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        paddingTop: '100vh'
      }}
      className="flex justify-center"
    >
      <video
        ref={videoRef}
        preload="auto"
        muted
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          top: '12vh',
          width: '80%',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        <source type="video/mp4" src="/v3/videos/globe.mp4" />
      </video>
    </div>
  );
};

export default VideoScrollComponentNew;
