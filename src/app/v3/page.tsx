'use client';
// import ShimmerButton from '@/components/v3/animated-button';
// import AirpodsScrollAnimation from '@/components/v3/globe-animation';
import HtmlAnimation from '@/components/v3/section-3d/html';
import SmoothVideoPlayer from '@/components/v3/smooth-video';
// import Tracebility3d from '@/components/v3/traceability-3d';
import TraceabilityHtml from '@/components/v3/traceability-html';
import React, { useEffect, useRef, useState } from 'react';

const LandingPage = () => {
  // const [isHtml, setIsHtml] = useState(true);
  // const [isManufactureBlurred, setIsManufactureBlurred] = useState(true);
  // const [isGlobalSalesBlurred, setIsGlobalSalesBlurred] = useState(true);
  const [canScrollGlobal, setCanScrollGlobal] = useState(false);
  const tracebilityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const tracebilityElement = tracebilityRef.current;
      if (tracebilityElement) {
        const { scrollTop, scrollHeight, clientHeight } = tracebilityElement;

        // If the user has scrolled to the bottom of Tracebility3d, allow global scrolling
        if (scrollTop + clientHeight >= scrollHeight) {
          setCanScrollGlobal(true);
        }
      }
    };

    const tracebilityElement = tracebilityRef.current;
    if (tracebilityElement) {
      tracebilityElement.addEventListener('scroll', handleScroll);
    }

    // Cleanup event listener
    return () => {
      if (tracebilityElement) {
        tracebilityElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const preventGlobalScroll = (event: any) => {
      if (!canScrollGlobal) {
        event.preventDefault();
      }
    };

    window.addEventListener('scroll', preventGlobalScroll, { passive: false });

    return () => {
      window.removeEventListener('scroll', preventGlobalScroll);
    };
  }, [canScrollGlobal]);

  return (
    //     <div className="relative ">
    //       <>
    //       {isHtml ? (
    //         <div className="flex flex-col">
    //           <div className="overflow-hidden	w-full flex justify-center pt-[80px] bg-[#FCFDFD] ">
    //             <HtmlAnimation />
    //           </div>
    //           <div className="xl:px-[112px] lg:px-[32px]  pb-[40px] flex flex-col bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom items-center  justify-center">
    //             <div className="flex flex-col gap-2 text-center w-[840px] py-[40px] justify-center">
    //               <div className="flex flex-col gap-2">
    //                 <p className="xl:text-[52px] lg:text-[42px] text-neutral900 font-black">
    //                   Manufacturing
    //                 </p>
    //                 <p className="text-neutral900 xl:text-[36px] lg:text-[28px] font-semiBold ">
    //                   Transforming Rough Diamonds
    //                 </p>
    //               </div>
    //               <p className="text-neutral900 text-[16px]  leading-6">
    //                 By manufacturing where the mines are located, we stimulate the
    //                 regional economy. As a consequence, we're seen as a favorable
    //                 company to work with in the eyes of the government and miners.
    //                 We double down on this value by ensuring that all our goods are
    //                 traceable and sustainably developed.
    //               </p>
    //             </div>
    //           </div>
    //           <div className="flex justify-center w-full">
    //             <TraceabilityHtml />
    //           </div>
    //           <div className="xl:px-[112px] lg:px-[32px]  pb-[40px] flex flex-col bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom items-center  justify-center">
    //             <div className="flex flex-col gap-2 text-center w-[840px] py-[40px] justify-center">
    //               <div className="flex flex-col gap-2">
    //                 <p className="xl:text-[52px] lg:text-[42px] text-neutral900 font-black">
    //                   Global{' '}
    //                 </p>
    //                 <p className="text-neutral900 xl:text-[36px] lg:text-[28px] font-semiBold ">
    //                   Manufacturing Units & Sales Offices{' '}
    //                 </p>
    //               </div>
    //               <p className="text-neutral900 text-[16px]  leading-6">
    //                 With sales offices in nearly every continent, we're ready to
    //                 serve our clients wherever they are. We stay client-centric by
    //                 accommodating to your needs, whether it's about terms, pricing,
    //                 shipping, or QC. So don't be shy, give us a call or come meet us
    //                 in-person!
    //               </p>
    //             </div>
    //           </div>
    //           <div className="bg-[#F2F4F7] flex items-center">
    //             <SmoothVideoPlayer />
    //           </div>
    //         </div>
    //       ) : (
    //         <div>
    //           <div className="relative">
    //             {/* Content with Blur Effect */}
    //             <div className="h-[100vh] xl:px-[112px] lg:px-[32px] pt-[160px] pb-[100px] flex flex-col ">
    //               <div
    //                 className={` transition-all duration-300 ease-in-out ${
    //                   isManufactureBlurred ? 'filter blur-sm' : 'filter-none'
    //                 } absolute inset-0`}
    //                 ref={tracebilityRef}
    //                 style={{ height: 'fit-content' }}
    //               >
    //                 <Tracebility3d />
    //               </div>
    //               {/* Overlay with CTA */}
    //               {isManufactureBlurred && (
    //                 <div className="relative z-10 flex justify-center items-center flex-col text-neutral900 gap-10">
    //                   <div className="flex flex-col gap-5 text-center w-[780px]">
    //                     <div className="flex flex-col">
    //                       <p className="text-neutral900 text-[62px] font-bold">
    //                         Manufacturing
    //                       </p>
    //                       <p className="text-neutral900 text-[42px] font-semiBold mt-[-20px]">
    //                         Transforming Rough Diamonds
    //                       </p>
    //                     </div>
    //                     <p className="text-primaryPressed text-[24px] font-semiBold leading-7">
    //                       By manufacturing where the mines are located, we stimulate
    //                       the regional economy. As a consequence, we're seen as a
    //                       favorable company to work with in the eyes of the
    //                       government and miners. We double down on this value by
    //                       ensuring that all our goods are traceable and sustainably
    //                       developed.
    //                     </p>
    //                   </div>

    //                   <ShimmerButton
    //                     className="!rounded-[8px] w-[120px] h-[44px]"
    //                     onClick={() =>
    //                       setIsManufactureBlurred(!isManufactureBlurred)
    //                     }
    //                   >
    //                     Explore
    //                   </ShimmerButton>
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //           <div className="relative">
    //             <div className="h-[100vh] xl:px-[112px] lg:px-[32px] pt-[160px] pb-[100px] flex flex-col ">
    //               <div
    //                 className={` transition-all duration-300 ease-in-out ${
    //                   isGlobalSalesBlurred ? 'filter blur-sm' : 'filter-none'
    //                 } absolute inset-0`}
    //               >
    //                 <AirpodsScrollAnimation />
    //               </div>
    //               {/* Overlay with CTA */}
    //               {isGlobalSalesBlurred && (
    //                 <div className="relative z-10 flex justify-center items-center flex-col text-neutral900 gap-10">
    //                   <div className="flex flex-col gap-5 text-center w-[780px]">
    //                     <div className="flex flex-col">
    //                       <p className="text-neutral900 text-[62px] font-bold">
    //                         Global
    //                       </p>
    //                       <p className="text-neutral900 text-[42px] font-semiBold mt-[-20px]">
    //                         Manufacturing Units & Sales Offices
    //                       </p>
    //                     </div>
    //                     <p className="text-primaryPressed text-[24px] font-semiBold leading-7">
    //                       With sales offices in nearly every continent, we're ready
    //                       to serve our clients wherever they are. We stay
    //                       client-centric by accommodating to your needs, whether
    //                       it's about terms, pricing, shipping, or QC. So don't be
    //                       shy, give us a call or come meet us in-person!
    //                     </p>
    //                   </div>

    //                   <ShimmerButton
    //                     className="!rounded-[8px] w-[120px] h-[44px]"
    //                     onClick={() =>
    //                       setIsGlobalSalesBlurred(!isGlobalSalesBlurred)
    //                     }
    //                   >
    //                     Explore
    //                   </ShimmerButton>
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       )}
    // </>
    //       {/* Toggle Button */}
    //       {/* <div className="fixed bottom-2 left-2 right-0 w-[200px] z-999">
    //         <button
    //           onClick={() => setIsHtml(!isHtml)}
    //           className=" rounded text-neutral600 text-[12px]"
    //         >
    //           Switch to {isHtml ? '3D' : 'HTML'} version
    //         </button>
    //       </div> */}
    //     </div>
    <div className="relative">
      {' '}
      <div className="flex flex-col">
        <div className="overflow-hidden	w-full flex justify-center pt-[80px] bg-[#FCFDFD] ">
          <HtmlAnimation />
        </div>
        <div className="xl:px-[112px] lg:px-[32px]  pb-[40px] flex flex-col bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient items-center blur-bottom  justify-center">
          <div className="flex flex-col gap-2 text-center w-[840px] py-[40px] justify-center">
            <div className="flex flex-col gap-2">
              <p className="xl:text-[52px] lg:text-[42px] text-neutral900 font-black">
                Manufacturing
              </p>
              <p className="text-neutral900 xl:text-[36px] lg:text-[28px] font-semiBold ">
                Transforming Rough to Polished Diamonds
              </p>
            </div>
            <p className="text-neutral900 text-[16px]  leading-6">
              By manufacturing where the mines are located, we stimulate the
              regional economy. As a consequence, we're seen as a favorable
              company to work with in the eyes of the government, miners, and
              our customers. We double down on this value by ensuring that all
              our goods are traceable and sustainably developed.
            </p>
          </div>
        </div>
        <div className="flex justify-center w-full h-fit">
          <TraceabilityHtml />
        </div>
        <div className="xl:px-[112px] lg:px-[32px]  pb-[40px] flex flex-col bg-animated-gradient bg-[length:200%_200%] bg-no-repeat animate-gradient blur-bottom items-center  justify-center">
          <div className="flex flex-col gap-2 text-center w-[840px] py-[40px] justify-center">
            <div className="flex flex-col gap-2">
              <p className="xl:text-[52px] lg:text-[42px] text-neutral900 font-black">
                Global{' '}
              </p>
              <p className="text-neutral900 xl:text-[36px] lg:text-[28px] font-semiBold ">
                Manufacturing Units & Sales Offices{' '}
              </p>
            </div>
            <p className="text-neutral900 text-[16px]  leading-6">
              With sales offices in nearly every continent, we're ready to serve
              our clients wherever they are. We stay client-centric by
              accommodating to your needs, whether it's about terms, pricing,
              shipping, or QC. So don't be shy, give us a call or come meet us
              in-person!
            </p>
          </div>
        </div>
        <div className="bg-[#F2F4F7] flex items-center justify-center">
          <SmoothVideoPlayer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
