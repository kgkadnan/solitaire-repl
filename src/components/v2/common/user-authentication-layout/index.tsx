import React, { ReactNode, useEffect, useRef } from 'react';
import './style.css';
interface IUserAuthenticationLayoutProps {
  formData: ReactNode;
  screen: string;
}
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

const UserAuthenticationLayout: React.FC<IUserAuthenticationLayoutProps> = ({
  formData,
  screen
}) => {
  const playerRef = useRef<YT.Player | null>(null);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new YT.Player('youtube-player', {
        height: '550',
        width: '100%',
        videoId: 'rXjbNpi79FI', //screen === 'register' ? 'WI_43FwleUg' : 'bqbnuuOF9cI', // 'WI_43FwleUg',bqbnuuOF9cI
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          loop: 1,
          playlist: 'rXjbNpi79FI', // screen === 'register' ? 'WI_43FwleUg' : 'bqbnuuOF9cI', //'WI_43FwleUg',bqbnuuOF9cI
          disablekb: 1 // Disable keyboard controls
        },
        events: {
          onReady: event => {
            event.target.playVideo();
          },
          onStateChange: onPlayerStateChange
        }
      });
    };
  }, []);

  // Handler for state changes
  const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
    if (event.data === YT.PlayerState.PLAYING) {
      const duration = playerRef.current!.getDuration();
      const currentTime = playerRef.current!.getCurrentTime();
      const timeLeft = duration - currentTime;

      // If there's less than 1 second left, seek to the beginning
      if (timeLeft < 1) {
        playerRef.current!.seekTo(0, true);
        // event.target.playVideo();
      }
    }
  };

  return (
    <div className="w-full flex">
      <div className="w-[60%] h-[100vh] flex items-center bg-black  ">
        <div className="h-full w-full flex items-center">
          <div className="youtube-container">
            <div className="youtube-overlay"></div>

            <div id="youtube-player"></div>
          </div>
        </div>
      </div>
      <div className="w-[40%] flex justify-center text-center h-[100vh]  overflow-y-scroll">
        {formData}
      </div>
    </div>
  );
};

export default UserAuthenticationLayout;
