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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

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

  const dotClasses = (timeStart: any, timeEnd: any) =>
    currentTime > timeStart && currentTime <= timeEnd
      ? 'bg-neutral400 relative w-8 rounded-[8px]'
      : 'bg-neutral400 w-2';

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-black">
      <video ref={videoRefHtml} className="w-full h-full object-cover">
        <source src="/v3/videos/traceability.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute bottom-8 flex justify-between space-x-4 bg-[#FFFFFF24] border-[white] rounded-[8px] px-[24px] py-[12px] border-[1px] min-w-[200px]">
        <div className="flex space-x-2 items-center ">
          {[
            { timeStart: 0, timeEnd: 3 },
            { timeStart: 3, timeEnd: 11 },
            { timeStart: 11, timeEnd: 14 },
            { timeStart: 14, timeEnd: 27 },
            { timeStart: 27, timeEnd: 30 }
          ].map(({ timeStart, timeEnd }) => (
            <div
              key={`${timeStart}-${timeEnd}`}
              onClick={() => handleReferenceClick(timeStart)}
              className={` h-2 rounded-[8px] rounded-full cursor-pointer ${dotClasses(
                timeStart,
                timeEnd
              )}`}
            >
              <div
                className="absolute top-0 left-0 h-full bg-neutral700 rounded-[16px]"
                style={{
                  width: calculateProgressWidth(timeStart, timeEnd, currentTime)
                }}
              />
            </div>
          ))}
        </div>
        <Image
          className="cursor-pointer "
          src={
            isPlaying
              ? videoRefHtml.current?.currentTime >= 30
                ? Restart
                : Pause
              : Play
          }
          onClick={handlePlayPause}
          alt="video control"
        />
      </div>
      <div className="absolute flex justify-between w-full xl:px-[112px] lg:px-[32px] top-[150px]">
        <LeftStructure currentTime={currentTime} />
        <RightStructure currentTime={currentTime} />
      </div>
    </div>
  );
};

// const RightStructure = ({ currentTime }: any) => {
//   return (
//     <>
//       {traceabilityData.map(
//         (data, index) =>
//           currentTime > data.timeStart &&
//           (index === 4 ? currentTime <= 31 : currentTime <= data.timeEnd) && (
//             <div
//               key={data.header1}
//               className={`w-[420px] bg-[#FFFFFF57] p-[20px] flex flex-col rounded-[12px] gap-1 transition-opacity duration-500 z-9999`}
//               style={{ boxShadow: 'var(--popups-shadow' }}
//             >
//               <p className="text-[16px] text-neutral900">Diamond Journey</p>
//               <div className="rounded-[8px] bg-[#ffffff] p-[12px] flex flex-col gap-1">
//                 <div className="flex gap-2">
//                   <Image
//                     src={data.icon}
//                     alt="trace steps"
//                     className="w-[40px] h-[40px]"
//                   />
//                   <p className="text-[16px] text-neutral900 font-semiBold">
//                     {data.header1}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <div className="min-w-[40px] pl-[20px]">
//                     <div className="border-l border-dotted border-gray-400 h-[120%] mt-[-20px]"></div>
//                   </div>
//                   {data.timeStart !== 0 ? (
//                     <ol className="list-disc pl-[20px]">
//                       {data.data.map((list: string, index: number) => (
//                         <li key={`list-${index}`}>{list}</li>
//                       ))}
//                     </ol>
//                   ) : (
//                     <div className="flex flex-col gap-2">
//                       <ol className="list-disc pl-[20px]">
//                         <li key={`list-${index}`}>{data.data[0]}</li>
//                         <li key={`list-${index}`}>{data.data[1]}</li>
//                       </ol>
//                       <p className="font-semiBold text-[12px]">
//                         {' '}
//                         Splitting & Barcoding
//                       </p>
//                       <ol className="list-disc pl-[20px]">
//                         <li key={`list-${index}`}>{data.data[2]}</li>
//                         <li key={`list-${index}`}>{data.data[3]}</li>
//                       </ol>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <Image
//                     src={TraceEnd}
//                     alt="trace steps"
//                     className="w-[40px] h-[40px]"
//                   />
//                   <p className="text-[16px] text-neutral900 font-semiBold">
//                     {data.header2}
//                   </p>
//                 </div>
//                 <div className="pl-[48px] flex gap-2 flex-wrap">
//                   {data.tags.map((tag: string, index: number) => (
//                     <div
//                       className="bg-[#E4E7EC] rounded-[4px] px-[6px] py-[8px] text-neutral800 text-[12px]"
//                       key={`${tag}-${index}`}
//                     >
//                       {tag}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )
//       )}
//     </>
//   );
// };

const RightStructure = ({ currentTime }: any) => {
  const [activeData, setActiveData] = useState<any>(null);

  useEffect(() => {
    const matchedData = traceabilityData.find(
      (data, index) =>
        currentTime > data.timeStart &&
        (index === 4 ? currentTime <= 31 : currentTime <= data.timeEnd)
    );
    setActiveData(matchedData);
  }, [currentTime]);

  return (
    <>
      {activeData && (
        <div
          key={activeData.header1}
          className={`w-[420px] bg-[#FFFFFF57] p-[20px] flex flex-col rounded-[12px] gap-1 transition-opacity duration-500 transform transition-transform ease-in-out z-9999`}
          style={{ boxShadow: 'var(--popups-shadow)' }}
        >
          <p className="text-[16px] text-neutral900">Diamond Journey</p>
          <div className="rounded-[8px] bg-[#ffffff] p-[12px] flex flex-col gap-1">
            <div className="flex gap-2">
              <Image
                src={activeData.icon}
                alt="trace steps"
                className="w-[40px] h-[40px]"
              />
              <p className="text-[16px] text-neutral900 font-semiBold">
                {activeData.header1}
              </p>
            </div>
            <div className="flex gap-2">
              <div className="min-w-[40px] pl-[20px]">
                <div className="border-l border-dotted border-gray-400 h-[120%] mt-[-20px]"></div>
              </div>
              {activeData.timeStart !== 0 ? (
                <ol className="list-disc pl-[20px]">
                  {activeData.data.map((list: string, index: number) => (
                    <li key={`list-${index}`}>{list}</li>
                  ))}
                </ol>
              ) : (
                <div className="flex flex-col gap-2">
                  <ol className="list-disc pl-[20px]">
                    <li>{activeData.data[0]}</li>
                    <li>{activeData.data[1]}</li>
                  </ol>
                  <p className="font-semiBold text-[12px]">
                    Splitting & Barcoding
                  </p>
                  <ol className="list-disc pl-[20px]">
                    <li>{activeData.data[2]}</li>
                    <li>{activeData.data[3]}</li>
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
                {activeData.header2}
              </p>
            </div>
            <div className="pl-[48px] flex gap-2 flex-wrap">
              {activeData.tags.map((tag: string, index: number) => (
                <div
                  className="bg-[#E4E7EC] rounded-[4px] px-[6px] py-[8px] text-neutral800 text-[12px]"
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
    return `${(elapsedTime / duration) * 100}%`;
  } else if (currentTime > timeEnd) {
    return '100%';
  }
  return '0%';
};

const LeftStructure = ({ currentTime }: { currentTime: number }) => {
  return (
    <div className="flex flex-col gap-2">
      <style>{gradientLineStyles}</style>
      {/* Gradient Line Container */}
      {currentTime > 0 &&
        traceabilityData.map((trace, index) => (
          <div key={index} className="relative flex flex-col gap-2">
            <div
              className={`gradient-line-container mr-[20px] ${
                index !== 4 ? 'bottom-[-8px]' : 'bottom-0'
              }`}
              style={{}}
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
                  // bottom:'-8px'
                }}
              />
            </div>
            <div className="flex gap-2 items-center " key={index}>
              <div
                className={`w-[54px] h-[54px] bg-[white] rounded-[8px] flex items-center justify-center transition-opacity duration-500 ${
                  currentTime > trace.timeStart ? 'opacity-100' : 'opacity-50'
                }`}
                style={{ boxShadow: 'var(--popups-shadow' }}
              >
                {currentTime > trace.timeStart && (
                  <Image
                    src={trace.indicator}
                    alt={trace.header1}
                    layout="intrinsic"
                  />
                )}
              </div>
              <p className="text-neutral900 text-[14px]">
                {currentTime > trace.timeStart ? trace.short : ''}
              </p>
            </div>
          </div>
        ))}
      {currentTime > 0 && (
        <p className="pl-[15px] text-[14px] text-neutral700">
          {Math.min(
            (traceabilityData.filter(trace => currentTime > trace.timeEnd)
              .length /
              traceabilityData.length) *
              100,
            100
          ).toFixed(0)}
          %
        </p>
      )}
    </div>
  );
};

export default TraceabilityHtml;
