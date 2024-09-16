import React, { ReactNode, useEffect, useRef } from 'react';
import './style.css';

export interface IUserAuthenticationLayoutProps {
  formData: ReactNode;
  screen: string;
}

const UserAuthenticationLayout: React.FC<IUserAuthenticationLayoutProps> = ({
  formData,
  screen
}) => {
  const playerRef = useRef<YT.Player>();

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      if (playerRef.current) return; // Prevent re-initialization

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '550',
        width: '100%',
        videoId: 'awoG54PaWPg', // 'rXjbNpi79FI',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          loop: 1,
          playlist: 'awoG54PaWPg', // 'rXjbNpi79FI',
          disablekb: 1 // Disable keyboard controls
        },
        events: {
          onReady: event => {
            event.target.playVideo();
          }
        }
      });
    };
  }, []);

  useEffect(() => {
    // Initialize the player when the screen changes
    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }
  }, [screen]);

  return (
    <div className="w-full flex">
      <div className="w-[60%] h-[100vh] flex items-center bg-black">
        <div className="h-full w-full flex items-center">
          <div className="youtube-container">
            <div className="youtube-overlay"></div>
            <div id="youtube-player"></div>
          </div>
        </div>
      </div>
      <div className="w-[40%] flex justify-center text-center h-[100vh] overflow-y-scroll">
        {formData}
      </div>
    </div>
  );
};

export default UserAuthenticationLayout;
