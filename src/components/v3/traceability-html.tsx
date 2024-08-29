'use client';
import { traceabilityData } from '@/constants/v3/home';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Pause from '@public/v3/icons/pause.svg';
import Play from '@public/v3/icons/play.svg';
import TraceStart from '@public/v3/home/trace-start.png';
import TraceEnd from '@public/v3/home/trace-last.png';

const TraceabilityHtml = () => {
  const videoRefHtml: any = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePlayPause = () => {
    if (videoRefHtml.current.paused) {
      videoRefHtml.current.play();
      setIsPlaying(true);
    } else {
      videoRefHtml.current.pause();
      setIsPlaying(false);
    }
  };

  const handleReferenceClick = (time: any, index: number) => {
    if (videoRefHtml.current) {
      videoRefHtml.current.currentTime = time;
      if (videoRefHtml.current.paused) {
        videoRefHtml.current.play();
        setIsPlaying(true);
      }
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(videoRefHtml.current.currentTime);
    };

    videoRefHtml.current.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      videoRefHtml.current.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, []);

  const calculateProgressWidth = (timeStart: any, timeEnd: any) => {
    if (currentTime >= timeStart && currentTime <= timeEnd) {
      const duration = timeEnd - timeStart;
      const elapsedTime = currentTime - timeStart;
      return `${(elapsedTime / duration) * 100}%`;
    }
    return '0%';
  };

  const dotClasses = (timeStart: any, timeEnd: any) =>
    currentTime >= timeStart && currentTime < timeEnd
      ? 'bg-neutral400 relative w-8 rounded-[8px]'
      : 'bg-neutral400 w-2';

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-black">
      <video ref={videoRefHtml} className="w-full h-full object-cover">
        <source src="/v3/videos/traceability.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute bottom-8 flex space-x-4 bg-[#FFFFFF24] border-[white] rounded-[8px] px-[24px] py-[12px] border-[1px]">
        <div className="flex space-x-2 items-center ">
          {[
            { timeStart: 0, timeEnd: 2 },
            { timeStart: 2, timeEnd: 10 },
            { timeStart: 10, timeEnd: 13 },
            { timeStart: 13, timeEnd: 26 },
            { timeStart: 26, timeEnd: 29 }
          ].map(({ timeStart, timeEnd }, index) => (
            <div
              key={index}
              onClick={() => handleReferenceClick(timeStart, index)}
              className={` h-2 rounded-[8px] rounded-full cursor-pointer ${dotClasses(
                timeStart,
                timeEnd
              )}`}
            >
              <div
                className="absolute top-0 left-0 h-full bg-neutral700 rounded-[16px]"
                style={{
                  width: calculateProgressWidth(timeStart, timeEnd)
                }}
              />
            </div>
          ))}
        </div>
        <Image
          src={isPlaying ? Pause : Play}
          onClick={handlePlayPause}
          alt="video control"
        />
      </div>
      <div className="absolute flex justify-between w-full xl:px-[112px] lg:px-[32px]">
        <div>hello</div>
        <RightStructure currentTime={currentTime} />
      </div>
    </div>
  );
};

const RightStructure = ({ currentTime }: any) => {
  return (
    <>
      {traceabilityData.map(
        (data, index) =>
          currentTime > data.timeStart &&
          currentTime < data.timeEnd && (
            <div
              key={index}
              className={`w-[420px] bg-[#FFFFFF57] p-[20px] flex flex-col rounded-[12px] gap-2 transition-opacity duration-500 `}
            >
              <p className="text-[16px] text-neutral900">Diamond Journey</p>
              <div className="rounded-[8px] bg-[#ffffff] p-[12px] flex flex-col gap-2">
                <div className="flex gap-2">
                  <Image
                    src={TraceStart}
                    alt="trace steps"
                    className="w-[40px] h-[40px]"
                  />
                  <p className="text-[16px] text-neutral900 font-semiBold">
                    {data.header1}
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="min-w-[40px] pl-[20px]">
                    <div className="border-l border-dotted border-gray-400 h-[120%] mt-[-20px]"></div>
                  </div>
                  {data.timeStart !== 0 ? (
                    <ol className="list-disc">
                      {data.data.map((list: string, index: number) => (
                        <li key={`list-${index}`}>{list}</li>
                      ))}
                    </ol>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <ol className="list-disc">
                        <li key={`list-${index}`}>{data.data[0]}</li>
                        <li key={`list-${index}`}>{data.data[1]}</li>
                      </ol>
                      <p className="font-semiBold text-[12px]">
                        {' '}
                        Splitting & Barcoding
                      </p>
                      <ol className="list-disc">
                        <li key={`list-${index}`}>{data.data[2]}</li>
                        <li key={`list-${index}`}>{data.data[3]}</li>
                      </ol>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <Image
                    src={TraceEnd}
                    alt="trace steps"
                    className="w-[40px] h-[40px]"
                  />
                  <p className="text-[16px] text-neutral900 font-semiBold">
                    {data.header2}
                  </p>
                </div>
                <div className="pl-[48px] flex gap-2 flex-wrap">
                  {data.tags.map(tag => (
                    <div className="bg-[#E4E7EC] rounded-[4px] px-[6px] py-[8px] text-neutral800 text-[12px]">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
      )}
    </>
  );
};

export default TraceabilityHtml;
