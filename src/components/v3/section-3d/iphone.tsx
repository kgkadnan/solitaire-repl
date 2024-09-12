import React, { useEffect, useState } from 'react';
import ShimmerButton from '../animated-button';

const IphoneAnimation = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [isLastElement, setIsLastElement] = useState(false);

  const [imageList, setImageList] = useState([
    '/v3/home/usa.png',
    '/v3/home/india.png',
    '/v3/home/belgium.png',
    '/v3/home/dubai.png'
  ]);
  const [startRemoving, setStartRemoving] = useState(false);

  useEffect(() => {
    // Slide in the phone skeleton from the bottom
    const slideInTimeout = setTimeout(() => {
      setPhoneVisible(true);
    }, 500);

    // Start the image animation after the phone has slid in
    const imageAnimationTimeout = setTimeout(() => {
      if (activeIndex < imageList.length - 1) {
        setActiveIndex(prevIndex => prevIndex + 1);
      } else if (activeIndex === imageList.length - 1 && !startRemoving) {
        setStartRemoving(true);
        setIsLastElement(true); // Set the state when the last element is reached

        // Only start removing if more than 2 images left
        if (imageList.length > 2) {
          setTimeout(() => {
            setImageList(prevList => prevList.slice(1));
            setActiveIndex(prevIndex => prevIndex - 1);
          }, 700); // Delay to allow the last image to finish zooming
        }
      }
    }, 1000);

    return () => {
      clearTimeout(slideInTimeout);
      clearTimeout(imageAnimationTimeout);
    };
  }, [activeIndex, imageList.length, startRemoving]);

  return (
    <div className="relative flex items-center justify-center min-h-[80%] text-black w-full">
      <div className="h-full">KGK Inventory Locations</div>
      <div
        className={`relative transition-transform duration-700 flex justify-center ${
          phoneVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ width: 400, height: 640 }}
      >
        <div
          className="absolute h-full w-[80%] bg-no-repeat bg-contain flex justify-center mx-auto"
          style={{
            backgroundImage: `url('/v3/home/phone.png')`
          }}
        ></div>

        <div
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-transform duration-700`}
        >
          <ul className="list-none mt-[110px] p-0 w-[250px]">
            {imageList.map((src, index) => (
              <li
                key={index}
                className={`transition-transform duration-700 w-full ${
                  index <= activeIndex
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-50'
                }`}
                style={{
                  transform:
                    index === activeIndex &&
                    activeIndex !== imageList.length - 1
                      ? 'scale(1.8)'
                      : 'scale(1)',
                  transition: 'transform 0.7s ease, opacity 0.7s ease'
                }}
              >
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full mx-auto mb-4"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>points</div>
      {isLastElement && (
        <div
          className="absolute bottom-[-50px] w-full text-center bg-white flex justify-center shadow-lg before:content-[''] before:absolute before:top-[-1px] before:left-0 before:w-full before:h-[10px] before:shadow-[0_-5px_10px_rgba(0,0,0,0.1)]"
          style={{
            height: '50%',
            width: '100%',
            boxShadow: 'var(--popups-shadow)'
          }}
        >
          <div className="bg-white py-5 w-[800px] h-full relative">
            <h1 className="text-[36px] text-neutral900 font-semiBold">
              Trusted by Thousands of Buyers and Sellers
            </h1>
            <p className="text-[20px] text-[#475467] mb-[20px] px-[75px]">
              The world’s largest and most trusted marketplace for diamonds!
              Proud Members of Major Diamond and Jewelry Trade Organizations
            </p>
            <ShimmerButton
              className="!rounded-[8px] w-[200px] h-[44px]"
              onClick={() => {}}
            >
              Explore Now!
            </ShimmerButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default IphoneAnimation;
