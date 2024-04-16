import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import NoImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import closeSvg from '@public/v2/assets/icons/detail-page/close.svg';
import { Toast } from '../../copy-and-share/toast';
import Tooltip from '../../tooltip';
import { handleDownloadImage } from '@/utils/v2/detail-page';
import { ImagesType } from '../interfrace';
import ImageList from './image-list';
import downloadSvg from '@public/v2/assets/icons/detail-page/download.svg';
import linkSvg from '@public/v2/assets/icons/detail-page/link.svg';
import forwardArrow from '@public/v2/assets/icons/arrow-forward.svg';
import backwardArrow from '@public/v2/assets/icons/arrow-backword.svg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImageIndex: number;
  images: ImagesType[];
  setIsLoading?: any;
}

const ImageModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  images,
  selectedImageIndex,
  setIsLoading
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [showToast, setShowToast] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState<string>('');
  const handleImageClick = (index: number) => {
    setImageIndex(index);
  };

  useEffect(() => {
    setShowDownloadButton('');
    // setImageIndex(0);
  }, [isOpen]);
  useEffect(() => {
    setImageIndex(selectedImageIndex || 0);
  }, [selectedImageIndex]);

  if (!isOpen) return null;

  const copyLink = ({ url }: { url: string }) => {
    navigator.clipboard.writeText(url).then(() => {
      setShowToast(true); // Show the toast notification
      setTimeout(() => {
        setShowToast(false); // Hide the toast notification after some time
      }, 2000);
    });
  };

  return (
    <div className="fixed z-[1200] inset-0 overflow-y-auto ">
      <Toast show={showToast} message="Copied Successfully" />
      <div className="flex items-center justify-center min-h-screen">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-[#101828] opacity-40"></div>
        <div className="bg-white rounded-lg p-2 sm:min-h-[350px] sm:min-w-[340px] lg:p-6 z-20 lg:min-h-[700px] lg:min-w-[800px] relative">
          <div className="flex justify-between">
            <p className="flex items-center font-medium text-neutral-900">
              {images[imageIndex].name}
            </p>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <Image src={closeSvg} alt="Preview" height={40} width={40} />
            </button>
          </div>
          <div className="flex w-[100%]">
            <div className="mt-2 sm:max-h-[210px] lg:max-h-[510px] overflow-y-scroll w-[12%]">
              <ImageList
                images={images}
                selectedImageIndex={imageIndex}
                onImageClick={handleImageClick}
              />
            </div>
            <div className="mt-2 ml-2 relative">
              <div className="relative">
                {images[imageIndex].name === 'B2B' ||
                images[imageIndex].name === 'B2B Sparkle' ||
                images[imageIndex].name === 'GIA Certificate' ? (
                  images[imageIndex].url === 'null' ||
                  images[imageIndex].url === null ||
                  !images[imageIndex].url.length ? (
                    <img
                      src={NoImageFound}
                      alt="NoImageFound"
                      className="lg:w-[662px] lg:h-[510px] sm:w-[300px] sm:h-[210px]"
                      height={600}
                      width={650}
                      style={{
                        background: '#F2F4F7'
                      }}
                      onError={(e: any) => {
                        setShowDownloadButton(images[imageIndex].name);
                        e.target.onerror = null;
                        e.target.src = NoImageFound.src;
                      }}
                    />
                  ) : (
                    <iframe
                      frameBorder="0"
                      src={images[imageIndex].url}
                      className="lg:w-[650px] lg:h-[465px] sm:w-[300px] sm:h-[210px]"
                    />
                  )
                ) : (
                  <img
                    src={images[imageIndex].url}
                    style={{
                      background: '#F2F4F7'
                    }}
                    className="lg:w-[662px] lg:h-[510px] sm:w-[300px] sm:h-[210px]"
                    alt="Preview"
                    height={600}
                    width={650}
                    onError={(e: any) => {
                      setShowDownloadButton(images[imageIndex].name);
                      e.target.onerror = null;
                      e.target.src = NoImageFound.src;
                    }}
                  />
                )}
              </div>
              <button
                onClick={() => {
                  imageIndex > 0 && handleImageClick(imageIndex - 1);
                }}
                disabled={!(imageIndex > 0)}
                className={`absolute top-1/2 left-4 transform -translate-y-1/2  rounded-[4px] hover:bg-neutral-50  p-2 border-solid border-neutral-200 shadow-sm ${
                  imageIndex <= 0 ? '!bg-neutral200' : 'bg-neutral0'
                }`}
              >
                <Image src={backwardArrow} alt="backwardArrow" />
              </button>
              <button
                onClick={() => {
                  imageIndex < images.length - 1 &&
                    handleImageClick(imageIndex + 1);
                }}
                disabled={!(imageIndex < images.length - 1)}
                className={`absolute top-1/2 right-4 transform -translate-y-1/2  rounded-[4px] hover:bg-neutral-50  p-2 border-solid border-neutral-200 shadow-sm ${
                  imageIndex >= images.length - 1
                    ? '!bg-neutral200'
                    : 'bg-neutral0'
                }`}
              >
                <Image src={forwardArrow} alt="forwardArrow" />
              </button>
            </div>
          </div>

          <div className="flex mt-5 justify-center">
            {images[imageIndex].name !== 'B2B' &&
              images[imageIndex].name !== 'B2B Sparkle' &&
              !showDownloadButton.includes(images[imageIndex].name) && (
                <Tooltip
                  tooltipTrigger={
                    <Image
                      src={downloadSvg}
                      alt={downloadSvg}
                      height={40}
                      width={40}
                      className="mr-2 cursor-pointer"
                      onClick={() => {
                        handleDownloadImage(
                          images[imageIndex]?.url || '',
                          images[imageIndex].name,
                          setIsLoading
                        );
                      }}
                    />
                  }
                  tooltipContent={'Download'}
                  tooltipContentStyles={'z-[2000]'}
                />
              )}

            {!showDownloadButton.includes(images[imageIndex].name) && (
              <Tooltip
                tooltipTrigger={
                  <Image
                    src={linkSvg}
                    alt={linkSvg}
                    height={40}
                    width={40}
                    className="mr-2 cursor-pointer"
                    onClick={() => {
                      copyLink({ url: images[imageIndex]?.url });
                    }}
                  />
                }
                tooltipContent={'Media Link'}
                tooltipContentStyles={'z-[2000]'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
