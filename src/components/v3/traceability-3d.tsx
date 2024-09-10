'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { traceabilityData } from '@/constants/v3/home';
import Image from 'next/image';
import TraceEnd from '@public/v3/home/trace-last.png';

gsap.registerPlugin(ScrollTrigger);

const Tracebility3d: React.FC = () => {
  const canvasRef3d = useRef<HTMLCanvasElement>(null);
  const imagesRef3d = useRef<HTMLImageElement[]>([]);
  const airpodsRef3d = useRef<{ frame: number }>({ frame: 0 });
  const frameCount = 884; // Adjusted for skipping
  const [currentFrame, setCurrentFrame] = useState(1);

  useEffect(() => {
    const canvas = canvasRef3d.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set initial canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize(); // Set size on load
    window.addEventListener('resize', setCanvasSize); // Adjust size on window resize

    const currentFrame = (index: number): string =>
      `/v3/webp-traceability/Final_2_0${(index * 1 + 1) // Skip every other image by incrementing by 2
        .toString()
        .padStart(4, '0')}.webp`;

    // Preload images
    const preloadImages = () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new window.Image();
        img.src = currentFrame(i);
        imagesRef3d.current.push(img);
      }
    };

    // Wait until the first image is loaded to start rendering
    const startRendering = () => {
      imagesRef3d.current[0].onload = () => {
        gsap.to(airpodsRef3d.current, {
          frame: frameCount - 1, // Adjusted for the skipped frames
          snap: 'frame',
          ease: 'none',
          scrollTrigger: {
            trigger: canvas,
            start: 'top top',
            end: () => `+=${canvas.height * 4}`, // Adjust the end based on the desired scroll length
            scrub: true,
            pin: true,
            anticipatePin: 1
          },
          onUpdate: () => {
            render();
            checkFrame(); // Check the current frame during scroll
          }
        });

        render(); // Initial render
      };
    };

    const render = () => {
      if (!context) return;

      const image = imagesRef3d.current[airpodsRef3d.current.frame];
      if (!image) return; // Ensure the image is available before rendering

      const aspectRatio = image.width / image.height;

      // Calculate the new dimensions of the image to fit the screen
      let imgWidth = canvas.width;
      let imgHeight = canvas.width / aspectRatio;

      if (imgHeight > canvas.height) {
        imgHeight = canvas.height;
        imgWidth = canvas.height * aspectRatio;
      }

      const x = (canvas.width - imgWidth) / 2;
      const y = (canvas.height - imgHeight) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, x, y, imgWidth, imgHeight);
    };
    const checkFrame = () => {
      setCurrentFrame(airpodsRef3d.current.frame);
    };
    preloadImages(); // Preload all images
    startRendering(); // Start the rendering process

    return () => {
      // Cleanup ScrollTrigger instances and resize event
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  console.log(currentFrame, 'jyoti');
  return (
    <div className="min-h-screen">
      <canvas ref={canvasRef3d} />
      <div className="fixed flex justify-between w-full xl:px-[112px] lg:pl-[44px] lg:pr-[32px] xl:top-[150px] lg:top-[125px]">
        <LeftStructure currentFrame={currentFrame} />
        <RightStructure currentFrame={currentFrame} />
      </div>
    </div>
  );
};

const RightStructure = ({ currentFrame }: { currentFrame: number }) => {
  const [activeData, setActiveData] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (currentFrame < 49 && activeData !== traceabilityData[0]) {
      setIsVisible(false);
      setActiveData(traceabilityData[0]);
    } else if (
      currentFrame >= 49 &&
      currentFrame < 305 &&
      activeData !== traceabilityData[1]
    ) {
      setIsVisible(false);
      setActiveData(traceabilityData[1]);
    } else if (
      currentFrame >= 305 &&
      currentFrame < 485 &&
      activeData !== traceabilityData[2]
    ) {
      setIsVisible(false);
      setActiveData(traceabilityData[2]);
    } else if (
      currentFrame >= 485 &&
      currentFrame < 770 &&
      activeData !== traceabilityData[3]
    ) {
      setIsVisible(false);
      setActiveData(traceabilityData[3]);
    } else if (
      currentFrame >= 770 &&
      currentFrame < 884 &&
      activeData !== traceabilityData[4]
    ) {
      setIsVisible(false);
      setActiveData(traceabilityData[4]);
    }

    // Trigger visibility transition
    // Hide first
    const timer = setTimeout(() => {
      setIsVisible(true); // Then show after a delay
    }, 50); // Small delay for transition effect

    return () => clearTimeout(timer);
  }, [currentFrame]); // Watch for changes in currentFrame

  return (
    <>
      {activeData && (
        <div
          key={activeData.header1}
          className={`xl:w-[420px] lg:w-[320px] bg-[#FFFFFF57] p-[20px] flex flex-col rounded-[12px] xl:gap-1 transition-opacity duration-1000 ${
            isVisible && currentFrame > 0 ? 'opacity-100' : 'opacity-25'
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
  currentFrame: number
) => {
  if (currentFrame >= timeStart && currentFrame <= timeEnd) {
    const duration = timeEnd - timeStart;
    const elapsedTime = currentFrame - timeStart;
    return `${((elapsedTime / duration) * 100).toFixed(0)}%`;
  } else if (currentFrame > timeEnd) {
    return '100%';
  }
  return '0%';
};

const LeftStructure = ({ currentFrame }: { currentFrame: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sections = [
    { timeStart: 0, timeEnd: 49 },
    { timeStart: 49, timeEnd: 305 },
    { timeStart: 305, timeEnd: 485 },
    { timeStart: 485, timeEnd: 770 },
    { timeStart: 770, timeEnd: 884 }
  ];
  const maxPercentagePerSection = 20; // Maximum percentage for each section

  const calculateProgress = (start: any, end: any, currentFrame: any) => {
    if (currentFrame < start) return 0;
    if (currentFrame >= end) return maxPercentagePerSection;

    const sectionDuration = end - start;
    const coveredDuration = currentFrame - start;
    return (coveredDuration / sectionDuration) * maxPercentagePerSection;
  };

  const [percentages, setPercentages] = useState(
    sections.map(sec =>
      calculateProgress(sec.timeStart, sec.timeEnd, currentFrame)
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
        calculateProgress(sec.timeStart, sec.timeEnd, currentFrame)
      )
    );
  }, [currentFrame]);
  return (
    <div
      className={`flex flex-col gap-2 transition-opacity duration-1000 ${
        isVisible && currentFrame >= 0 ? 'opacity-100' : 'opacity-25 '
      }`}
    >
      <style>{gradientLineStyles}</style>
      {/* Gradient Line Container */}
      {currentFrame >= 0 &&
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
                    sections[index].timeStart,
                    sections[index].timeEnd,
                    currentFrame
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
                  currentFrame > index ? 'opacity-100' : 'opacity-50'
                }`}
                style={{ boxShadow: 'var(--popups-shadow)' }}
              >
                <div
                  className={`absolute inset-0 rounded-full transition-opacity duration-1000 ${
                    currentFrame >= sections[index].timeStart
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {currentFrame >= sections[index].timeStart && (
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
                  currentFrame >= sections[index].timeStart
                    ? 'opacity-100'
                    : 'opacity-50'
                }`}
              >
                {trace.short}
              </p>
            </div>
          </div>
        ))}
      {currentFrame > 0 && (
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
export default Tracebility3d;
