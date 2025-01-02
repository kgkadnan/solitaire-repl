import React, { ReactNode, useEffect, useRef, useState } from 'react';
import './style.css';

export interface IUserAuthenticationLayoutProps {
  formData: ReactNode;
  screen: string;
}

const UserAuthenticationLayout: React.FC<IUserAuthenticationLayoutProps> = ({
  formData,
  screen
}) => {
  const playerRef = useRef<YT.Player | null>(null);

  // Load the YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

    // Ensure onYouTubeIframeAPIReady is set only once
    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    // Manually call initializePlayer in case API is ready early
    if (window.YT && window.YT.Player) {
      initializePlayer();
    }
  }, []);

  const initializePlayer = () => {
    if (playerRef.current) return; // Prevent re-initialization
    playerRef.current = new window.YT.Player('youtube-player', {
      height: '550',
      width: '100%',
      videoId: 'awoG54PaWPg', // Example video ID
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3,
        loop: 1,
        playlist: 'awoG54PaWPg',
        disablekb: 1
      },
      events: {
        onReady: event => {
          event.target.playVideo();
        }
      }
    });
  };

  const togglePlayPause = () => {
    if (!playerRef.current) return;

    const playerState = playerRef.current.getPlayerState();

    if (playerState === window.YT.PlayerState.PLAYING) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="w-full flex">
      {/* Video Section */}
      <div className="w-[60%] h-[100vh] flex items-center bg-black px-2">
        <div
          className="h-full w-full flex items-center"
          onClick={togglePlayPause}
        >
          <div className="youtube-container">
            <div className="youtube-overlay"></div>
            <div id="youtube-player"></div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-[40%] flex justify-center text-center h-[100vh] overflow-y-scroll">
        {formData}
      </div>
    </div>
  );
};

export default UserAuthenticationLayout;
