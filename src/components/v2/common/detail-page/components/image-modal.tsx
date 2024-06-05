import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import closeSvg from '@public/v2/assets/icons/detail-page/close.svg';
import { Toast } from '../../copy-and-share/toast';
import Tooltip from '../../tooltip';
import { handleDownloadImage } from '@/utils/v2/detail-page';
import { IImagesType } from '../interface';
import downloadImg from '@public/v2/assets/icons/detail-page/download.svg';
import linkSvg from '@public/v2/assets/icons/detail-page/link.svg';
import forwardArrow from '@public/v2/assets/icons/arrow-forward.svg';
import backwardArrow from '@public/v2/assets/icons/arrow-backword.svg';
import backWardArrowDisable from '@public/v2/assets/icons/detail-page/back-ward-arrow-disable.svg';
import forWardAarrowDisable from '@public/v2/assets/icons/detail-page/forward-arrow-disable.svg';
import { Skeleton } from '@mui/material';
import DetailPageTabs from './tabs';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImageIndex?: number;
  images: IImagesType[];
  setIsLoading?: any;
  activeTab?: string;
}

const ImageModal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  images,
  selectedImageIndex,
  setIsLoading,
  activeTab
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [showToast, setShowToast] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState('Image');
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);

  const filteredImages = images.filter(image => {
    if (activePreviewTab === 'Video' && image.category === 'Video') return true;
    if (activePreviewTab === 'Certificate' && image.category === 'Certificate')
      return true;
    if (activePreviewTab === 'B2B Sparkle' && image.category === 'B2B Sparkle')
      return true;
    if (activePreviewTab === 'Image' && image.category === 'Image') return true;
    return false;
  });

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'ArrowLeft') {
        setImageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
      } else if (event.key === 'ArrowRight') {
        setImageIndex(prevIndex =>
          prevIndex < filteredImages.length - 1 ? prevIndex + 1 : prevIndex
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredImages.length]);

  useEffect(() => {
    activeTab && setActivePreviewTab(activeTab);
    selectedImageIndex && setImageIndex(selectedImageIndex);
  }, [activeTab, selectedImageIndex]);

  if (!isOpen) return null;

  const copyLink = ({ url }: { url: string }) => {
    navigator.clipboard.writeText(url).then(() => {
      setShowToast(true); // Show the toast notification
      setTimeout(() => {
        setShowToast(false); // Hide the toast notification after some time
      }, 4000);
    });
  };

  return (
    <div className="fixed z-[1200] inset-0 overflow-y-auto ">
      <Toast show={showToast} message="Copied Successfully" />
      <div className="flex items-center justify-center min-h-screen">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-[#101828] opacity-40"></div>
        <div className="bg-neutral0 p-2 rounded-[4px] sm:min-w-[340px] lg:p-6 z-20   lg:min-w-[630px] relative">
          <div className="flex flex-col  gap-4 ">
            <div className="w-full flex justify-end">
              <div className="flex justify-between w-[630px]">
                <DetailPageTabs
                  validImages={images}
                  setActivePreviewTab={setActivePreviewTab}
                  activePreviewTab={activePreviewTab}
                  setImageIndex={setImageIndex}
                />
                <button
                  onClick={() => {
                    onClose();
                    setActivePreviewTab('Image');
                  }}
                  className="text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                  <Image src={closeSvg} alt="Preview" height={40} width={40} />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center  gap-4">
              <div
                className="flex justify-center"
                style={{
                  position: 'relative'
                }}
              >
                {images.length > 0 ? (
                  filteredImages.length > 0 ? (
                    filteredImages[imageIndex]?.category === 'Video' ||
                    filteredImages[imageIndex]?.category === 'Certificate' ||
                    filteredImages[imageIndex]?.category === 'B2B Sparkle' ? (
                      <iframe
                        src={filteredImages[0]?.url}
                        className="w-[520px] h-[520px]"
                      />
                    ) : (
                      <Image
                        src={filteredImages[imageIndex]?.url}
                        alt={filteredImages[imageIndex]?.name}
                        width={650}
                        height={600}
                        className="w-[625px] h-[520px]"
                        onMouseEnter={e => {
                          // update image size and turn-on magnifier
                          const elem = e.currentTarget;
                          const { width, height } =
                            elem.getBoundingClientRect();
                          setSize([width, height]);
                          setShowMagnifier(true);
                        }}
                        onMouseLeave={() => {
                          setShowMagnifier(false);
                        }}
                        onMouseMove={e => {
                          // update cursor position
                          const elem = e.currentTarget;
                          const { top, left } = elem.getBoundingClientRect();

                          // calculate cursor position on the image
                          const x = e.pageX - left - window.pageXOffset;
                          const y = e.pageY - top - window.pageYOffset;
                          setXY([x, y]);
                        }}
                      />
                    )
                  ) : (
                    <Image
                      src={noImageFound}
                      alt="noImageFound"
                      width={650}
                      height={600}
                      className="w-[625px] h-[520px]"
                    />
                  )
                ) : (
                  <Skeleton
                    width={625}
                    variant="rectangular"
                    height={520}
                    animation="wave"
                  />
                )}
                <div
                  style={{
                    display: showMagnifier ? '' : 'none',
                    position: 'absolute',

                    // prevent magnifier blocks the mousemove event of img
                    pointerEvents: 'none',
                    // set size of magnifier
                    height: `${130}px`,
                    width: `${130}px`,
                    borderRadius: '50%',
                    // move element center to cursor pos
                    top: `${y - 130 / 2}px`,
                    left: `${x - 130 / 2}px`,
                    opacity: '1', // reduce opacity so you can verify position
                    backgroundColor: 'white',
                    backgroundImage: `url('${filteredImages[imageIndex]?.url}')`,
                    backgroundRepeat: 'no-repeat',
                    boxShadow: 'var(--popups-shadow)',

                    //calculate zoomed image size
                    backgroundSize: `${imgWidth * 1.5}px ${imgHeight * 1.5}px`,

                    //calculate position of zoomed image.
                    backgroundPositionX: `${-x * 1.5 + 130 / 2}px`,
                    backgroundPositionY: `${-y * 1.5 + 130 / 2}px`
                  }}
                ></div>
              </div>

              <div className="flex justify-between items-center w-[625px]">
                {filteredImages.length > 0 ? (
                  <div className="text-headingS font-medium text-neutral900">
                    {filteredImages[imageIndex]?.name}
                  </div>
                ) : (
                  <Skeleton
                    width={88}
                    variant="rectangular"
                    height={30}
                    animation="wave"
                  />
                )}
                <div className="flex gap-6">
                  {filteredImages.length > 0 &&
                    filteredImages[imageIndex]?.category === 'Image' && (
                      <>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setImageIndex(imageIndex - 1);
                            }}
                            disabled={!(imageIndex > 0)}
                            className={` rounded-[4px]  hover:bg-neutral50 w-[38px] h-[38px] text-center px-2 border-[1px] border-solid border-neutral200 shadow-sm ${
                              imageIndex <= 0 ? '!bg-neutral200' : 'bg-neutral0'
                            }`}
                          >
                            <Image
                              src={
                                !(imageIndex > 0)
                                  ? backWardArrowDisable
                                  : backwardArrow
                              }
                              alt={
                                !(imageIndex > 0)
                                  ? 'backWardArrowDisable'
                                  : 'backwardArrow'
                              }
                            />
                          </button>
                          <button
                            onClick={() => {
                              setImageIndex(imageIndex + 1);
                            }}
                            disabled={!(imageIndex < filteredImages.length - 1)}
                            className={`rounded-[4px] hover:bg-neutral50 w-[38px] h-[38px] text-center px-2 border-[1px] border-solid border-neutral200 shadow-sm ${
                              imageIndex >= filteredImages.length - 1
                                ? '!bg-neutral200'
                                : 'bg-neutral0'
                            }`}
                          >
                            <Image
                              src={
                                !(imageIndex < filteredImages.length - 1)
                                  ? forWardAarrowDisable
                                  : forwardArrow
                              }
                              alt={
                                !(imageIndex < filteredImages.length - 1)
                                  ? 'forWardAarrowDisable'
                                  : 'forwardArrow'
                              }
                            />
                          </button>
                        </div>
                        <div className="border-r-[1px] h-[40px] border-neutral200"></div>
                      </>
                    )}
                  <div className="flex gap-1">
                    {!(
                      activePreviewTab === 'Video' ||
                      activePreviewTab === 'B2B Sparkle'
                    ) && (
                      <Tooltip
                        tooltipTrigger={
                          <Image
                            className="cursor-pointer"
                            src={downloadImg}
                            height={40}
                            width={40}
                            alt={'Download'}
                            onClick={() => {
                              handleDownloadImage(
                                filteredImages[imageIndex].url || '',
                                filteredImages[imageIndex].name,
                                setIsLoading
                              );
                            }}
                          />
                        }
                        tooltipContent={
                          activePreviewTab === 'Certificate'
                            ? 'Download Certificate'
                            : 'Download Image'
                        }
                        tooltipContentStyles={'z-[1000]'}
                      />
                    )}

                    <Tooltip
                      tooltipTrigger={
                        <Image
                          className="cursor-pointer"
                          src={linkSvg}
                          height={40}
                          width={40}
                          alt={'linkSvg'}
                          onClick={() => {
                            copyLink({ url: filteredImages[imageIndex]?.url });
                          }}
                        />
                      }
                      tooltipContent={'Media Link'}
                      tooltipContentStyles={'z-[1000]'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
