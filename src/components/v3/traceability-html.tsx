'use client';
import { traceabilityData } from '@/constants/v3/home';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Pause from '@public/v3/home/pause.svg';
import Play from '@public/v3/home/play.svg';
import TraceEnd from '@public/v3/home/trace-last.png';
import Restart from '@public/v3/home/restart.svg';

const calculateProgressWidth = (
  timeStart: any,
  timeEnd: any,
  currentTime: any
) => {
  if (currentTime >= timeStart && currentTime <= timeEnd) {
    const duration = timeEnd - timeStart;
    const elapsedTime = currentTime - timeStart;
    return `${(elapsedTime / duration) * 100}%`;
  }
  return '0%';
};
const TraceabilityHtml = () => {
  const videoRefHtml: any = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handlePlayPause = () => {
    if (videoRefHtml.current.currentTime >= 30) {
      handleReferenceClick(0);
      videoRefHtml.current.play();
    } else if (videoRefHtml.current.paused) {
      videoRefHtml.current.play();
      setIsPlaying(true);
    } else {
      videoRefHtml.current.pause();
      setIsPlaying(false);
    }
  };

  const handleReferenceClick = (time: any) => {
    if (videoRefHtml.current) {
      videoRefHtml.current.currentTime = time;
      if (videoRefHtml.current.paused) {
        videoRefHtml.current.play();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      if (videoRefHtml.current?.currentTime >= 30) videoRefHtml.current.pause();

      setCurrentTime(videoRefHtml.current?.currentTime);
    };

    videoRefHtml.current.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      videoRefHtml.current?.removeEventListener(
        'timeupdate',
        updateCurrentTime
      );
    };
  }, []);

  useEffect(() => {
    if (!targetRef.current || !videoRefHtml.current) return;

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5 // Trigger when 50% of the target is visible
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Play video when the target div is in view
        videoRefHtml.current?.play();
      } else {
        // Pause video when the target div is not in view
        videoRefHtml.current?.pause();
      }
    }, options);

    observer.observe(targetRef.current);

    return () => {
      if (targetRef.current!) {
        observer?.unobserve(targetRef.current!); // Clean up observer on component unmount
      }
    };
  }, []);

  const dotClasses = (timeStart: any, timeEnd: any, index: number) =>
    (currentTime >= timeStart && currentTime <= timeEnd) ||
    (videoRefHtml.current?.currentTime >= 30 && index === 4)
      ? `bg-neutral400 relative w-8 rounded-[8px] ${
          videoRefHtml.current?.currentTime >= 30 &&
          index === 4 &&
          'bg-neutral700'
        }`
      : 'bg-neutral400 w-2';
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-black">
      <video
        ref={videoRefHtml}
        className="w-full h-full object-cover"
        autoPlay
        preload="auto"
        muted
        role="img"
        playsInline
      >
        <source src="/v3/videos/traceability.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute bottom-14 flex justify-between gap-4">
        <div
          className="flex justify-around items-center h-[38px] bg-[#FFFFFF24] border-[white] rounded-[8px] px-[8px]  border-[1px] min-w-[150px]"
          style={{ boxShadow: 'var(--popups-shadow' }}
          ref={targetRef}
        >
          {[
            { timeStart: 0, timeEnd: 3 },
            { timeStart: 3, timeEnd: 11 },
            { timeStart: 11, timeEnd: 17 },
            { timeStart: 17, timeEnd: 27 },
            { timeStart: 27, timeEnd: 30 }
          ].map(({ timeStart, timeEnd }, index) => (
            <div
              key={`${timeStart}-${timeEnd}`}
              onClick={() => handleReferenceClick(timeStart)}
              className={`relative h-2 rounded-[8px] cursor-pointer transition-all duration-300 ease-in-out overflow-hidden ${dotClasses(
                timeStart,
                timeEnd,
                index
              )}`}
            >
              {currentTime >= timeStart && currentTime <= timeEnd && (
                <div
                  className="absolute top-0 left-0 h-full bg-neutral700 transition-width duration-300 ease-in-out rounded-[12px]"
                  style={{
                    width: calculateProgressWidth(
                      timeStart,
                      timeEnd,
                      currentTime
                    )
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <Image
          className="cursor-pointer "
          src={
            videoRefHtml.current?.currentTime >= 30
              ? Restart
              : isPlaying
              ? Pause
              : Play
          }
          onClick={handlePlayPause}
          alt="video control"
          style={{ boxShadow: 'var(--popups-shadow)' }}
        />
      </div>
      <div className="absolute flex justify-between w-full xl:px-[112px] lg:pl-[44px] lg:pr-[32px] xl:top-[150px] lg:top-[125px]">
        <LeftStructure currentTime={currentTime} />
        <RightStructure currentTime={currentTime} />
      </div>
    </div>
  );
};

const RightStructure = ({ currentTime }: any) => {
  const [activeData, setActiveData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const matchedData = traceabilityData.find(
      (data, index) =>
        currentTime >= data.timeStart &&
        (index === 4 ? currentTime <= 31 : currentTime <= data.timeEnd)
    );
    setActiveData(matchedData);
  }, [currentTime]);

  useEffect(() => {
    if (activeData) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [activeData]);

  return (
    <>
      {activeData && (
        <div
          key={activeData.header1}
          className={`xl:w-[420px] lg:w-[320px] bg-[#FFFFFF57] p-[20px] flex flex-col rounded-[12px] xl:gap-1 transition-opacity duration-1000 ${
            isVisible && currentTime > 0 ? 'opacity-100' : 'opacity-25 '
          } `}
          style={{ boxShadow: 'var(--popups-shadow)', height: 'fit-content' }}
        >
          <div className="rounded-[8px] bg-[#ffffff] p-[12px] flex flex-col ">
            <div className="flex gap-2">
              <Image
                src={activeData.icon}
                alt="trace steps"
                className="xl:w-[40px] xl:h-[40px] lg:w-[30px] lg:h-[30px] flex items-center"
              />
              <p className="xl:text-[16px] lg:text-[12px] text-neutral900 font-semiBold flex items-center lg:leading-[16px] xl:leading-[20px]">
                {activeData.header1}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="min-w-[40px] xl:pl-[20px] lg:pl-[15px]">
                <div className="border-l border-dotted border-gray-400 xl:h-[115%] lg:h-[110%] xl:mt-[-15px] lg:mt-[-10px]"></div>
              </div>
              {activeData.timeStart !== 0 ? (
                <ol className="list-disc xl:pl-[20px] lg:pl-[10px] ">
                  {activeData.data.map((list: string, index: number) => (
                    <li
                      key={`list-${index}`}
                      className="xl:text-[14px] lg:text-[10px] xl:leading-[20px] lg:leading-[14px]"
                    >
                      {list}
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="flex flex-col gap-2">
                  <ol className="list-disc pl-[20px]">
                    <li className="xl:text-[14px] lg:text-[10px] xl:leading-[20px] lg:leading-[14px]">
                      {activeData.data[0]}
                    </li>
                    <li className="xl:text-[14px] lg:text-[10px] xl:leading-[20px] lg:leading-[14px]">
                      {activeData.data[1]}
                    </li>
                  </ol>
                  <p className="font-semiBold xl:text-[14px] lg:text-[10px] xl:leading-[20px]">
                    Splitting & Barcoding
                  </p>
                  <ol className="list-disc pl-[20px]">
                    <li className="xl:text-[14px] lg:text-[10px] xl:leading-[20px] lg:leading-[14px]">
                      {activeData.data[2]}
                    </li>
                    <li className="xl:text-[14px] lg:text-[10px] xl:leading-[20px] lg:leading-[14px]">
                      {activeData.data[3]}
                    </li>
                  </ol>
                </div>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src={TraceEnd}
                alt="trace steps"
                className="xl:w-[40px] xl:h-[40px] lg:w-[30px] lg:h-[30px]"
              />
              <p className="xl:text-[16px] lg:text-[12px] text-neutral900 font-semiBold">
                {activeData.header2}
              </p>
            </div>
            <div className="pl-[48px] flex gap-2 flex-wrap">
              {activeData.tags.map((tag: string, index: number) => (
                <div
                  className="bg-[#E4E7EC] rounded-[4px] px-[6px] xl:py-[8px] lg:py-[2px] text-neutral800 xl:text-[12px] lg:text-[10px]"
                  key={`${tag}-${index}`}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Define custom CSS for the vertical gradient line
const gradientLineStyles = `
  .gradient-line-container {
    position: absolute;
    left: -10px; /* Adjust based on desired spacing */
    top: 0;
    
    width: 2px; /* Width of the line */
    background: #D0D5DD; /* Default color */
    display: flex;
    align-items: flex-start; /* Align to top */
    overflow: hidden; /* Ensure the gradient fill is confined */
    border-radius:10%
  }

  .gradient-line-fill {
    width: 120%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    transition: height 0.5s ease-in-out;
    position: absolute;
    top: 0; /* Position at the top to grow downwards */
  }
`;

const calculateProgressHeight = (
  timeStart: number,
  timeEnd: number,
  currentTime: number
) => {
  if (currentTime >= timeStart && currentTime <= timeEnd) {
    const duration = timeEnd - timeStart;
    const elapsedTime = currentTime - timeStart;
    return `${((elapsedTime / duration) * 100).toFixed(0)}%`;
  } else if (currentTime > timeEnd) {
    return '100%';
  }
  return '0%';
};

const LeftStructure = ({ currentTime }: { currentTime: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sections = [
    { timeStart: 0, timeEnd: 3 },
    { timeStart: 3, timeEnd: 11 },
    { timeStart: 11, timeEnd: 17 },
    { timeStart: 17, timeEnd: 27 },
    { timeStart: 27, timeEnd: 30 }
  ];
  const maxPercentagePerSection = 20; // Maximum percentage for each section

  const calculateProgress = (start: any, end: any, currentTime: any) => {
    if (currentTime < start) return 0;
    if (currentTime >= end) return maxPercentagePerSection;

    const sectionDuration = end - start;
    const coveredDuration = currentTime - start;
    return (coveredDuration / sectionDuration) * maxPercentagePerSection;
  };

  const [percentages, setPercentages] = useState(
    sections.map(sec =>
      calculateProgress(sec.timeStart, sec.timeEnd, currentTime)
    )
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  useEffect(() => {
    setPercentages(
      sections.map(sec =>
        calculateProgress(sec.timeStart, sec.timeEnd, currentTime)
      )
    );
  }, [currentTime]);
  return (
    <div
      className={`flex flex-col gap-2 transition-opacity duration-1000 ${
        isVisible && currentTime >= 0 ? 'opacity-100' : 'opacity-25 '
      }`}
    >
      <style>{gradientLineStyles}</style>
      {/* Gradient Line Container */}
      {currentTime >= 0 &&
        traceabilityData.map((trace, index) => (
          <div key={index} className="relative flex flex-col gap-2">
            <div
              className={`gradient-line-container mr-[20px] ${
                index !== 4 ? 'bottom-[-8px]' : 'bottom-0'
              }`}
            >
              <div
                className="gradient-line-fill"
                style={{
                  height: calculateProgressHeight(
                    trace.timeStart,
                    trace.timeEnd,
                    currentTime
                  ),
                  background:
                    index === 0
                      ? 'linear-gradient(to bottom, #FFAD05, #FFAD05)'
                      : index === 1
                      ? 'linear-gradient(to bottom, #FFAD05, #168B85)'
                      : index === 2
                      ? 'linear-gradient(to bottom,  #168B85, #168B85)'
                      : index === 3
                      ? 'linear-gradient(to bottom,  #168B85, #5995ED)'
                      : 'linear-gradient(to bottom, #5995ED, #5995ED)'
                }}
              />
            </div>
            <div className="flex gap-2 items-center " key={index}>
              <div
                className={`w-[54px] h-[54px] bg-[white] rounded-[8px] flex items-center justify-center transition-opacity duration-500 relative overflow-hidden ${
                  currentTime >= trace.timeStart ? 'opacity-100' : 'opacity-50'
                }`}
                style={{ boxShadow: 'var(--popups-shadow)' }}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-opacity duration-1000 ${
                    currentTime >= trace.timeStart ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {currentTime >= trace.timeStart && (
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-white animate-clock-reveal"></div>
                      <Image
                        src={trace.indicator}
                        alt={trace.header1}
                        layout="intrinsic"
                        className="w-full h-full absolute inset-0"
                      />
                    </div>
                  )}
                </div>
              </div>

              <p
                className={`text-neutral900 text-[14px] transition-opacity duration-500 ${
                  currentTime >= trace.timeStart ? 'opacity-100' : 'opacity-50'
                }`}
              >
                {trace.short}
              </p>
            </div>
          </div>
        ))}
      {currentTime > 0 && (
        <p className="pl-[15px] text-[14px] text-neutral700">
          {(
            percentages[0] +
            percentages[1] +
            percentages[2] +
            percentages[3] +
            percentages[4]
          ).toFixed(0)}
          %
        </p>
      )}
    </div>
  );
};

export default TraceabilityHtml;
