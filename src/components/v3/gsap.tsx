// import React, { useEffect } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const VideoBackground: React.FC = () => {
//   useEffect(() => {
//     const video = document.querySelector<HTMLVideoElement>('.video-background');
//     if (!video) return;

//     const src = video.currentSrc || video.src;

//     // Make sure the video is 'activated' on iOS
//     const once = (el: HTMLElement, event: string, fn: (e: Event) => void, opts?: AddEventListenerOptions) => {
//       const onceFn = (e: Event) => {
//         el.removeEventListener(event, onceFn);
//         fn(e); // Call the function with the event argument
//       };
//       el.addEventListener(event, onceFn, opts);
//     };

//     once(document.documentElement, 'touchstart', () => {
//       video.play();
//       video.pause();
//     });

//     // Scroll Control
//     const tl = gsap.timeline({
//       defaults: { duration: 1 },
//       scrollTrigger: {
//         trigger: '#container',
//         start: 'top top',
//         end: 'bottom bottom',
//         scrub: true,
//       },
//     });

//     once(video, 'loadedmetadata', () => {
//       tl.fromTo(
//         video,
//         { currentTime: 0 },
//         { currentTime: video.duration || 1 }
//       );
//     });

//     setTimeout(() => {
//       if (window.fetch!) {
//         fetch(src)
//           .then((response) => response.blob())
//           .then((response) => {
//             const blobURL = URL.createObjectURL(response);

//             const t = video.currentTime;
//             once(document.documentElement, 'touchstart', () => {
//               video.play();
//               video.pause();
//             });

//             video.setAttribute('src', blobURL);
//             video.currentTime = t + 0.01;
//           });
//       }
//     }, 1000);
//   }, []);

//   return (
//     <div className="relative">
//       <video
//         src="https://assets.codepen.io/39255/output_960.mp4"
//         playsInline
//         webkit-playsInline
//         preload="auto"
//         muted
//         className="fixed top-1/2 left-1/2 min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2"
//       />
//       <div id="container" className="h-[500vh]" />
//     </div>
//   );
// };

// export default VideoBackground;

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoBackground: React.FC = () => {
  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>('.video-background');
    if (!video) return;

    const src = video.currentSrc || video.src;

    // Make sure the video is 'activated' on iOS
    const once = (
      el: HTMLElement,
      event: string,
      fn: (e: Event) => void,
      opts?: AddEventListenerOptions
    ) => {
      const onceFn = (e: Event) => {
        el.removeEventListener(event, onceFn);
        fn(e); // Call the function with the event argument
      };
      el.addEventListener(event, onceFn, opts);
    };

    once(document.documentElement, 'touchstart', () => {
      video.play();
      video.pause();
    });

    // Scroll Control
    const tl = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: {
        trigger: '#container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });

    once(video, 'loadedmetadata', () => {
      tl.fromTo(
        video,
        { currentTime: 0 },
        { currentTime: video.duration || 1 }
      );
    });

    // Make sure the video source is properly fetched and set
    const setVideoSource = () => {
      if (window.fetch!) {
        fetch(src)
          .then(response => response.blob())
          .then(response => {
            const blobURL = URL.createObjectURL(response);

            const t = video.currentTime;
            once(document.documentElement, 'touchstart', () => {
              video.play();
              video.pause();
            });

            video.setAttribute('src', blobURL);
            video.currentTime = t + 0.01;
          });
      }
    };

    setTimeout(setVideoSource, 1000);
  }, []);

  return (
    <div className="relative">
      <video
        src="https://assets.codepen.io/39255/output_960.mp4"
        playsInline
        webkit-playsInline
        preload="auto"
        muted
        className="fixed top-1/2 left-1/2 min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2"
      />
      <div id="container" className="h-[500vh]" />
    </div>
  );
};

export default VideoBackground;
