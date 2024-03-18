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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImageIndex: number;
  images: ImagesType[];
}

const ImageModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  images,
  selectedImageIndex
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [showToast, setShowToast] = useState(false);
  const handleImageClick = (index: number) => {
    setImageIndex(index);
  };

  useEffect(() => {
    setImageIndex(selectedImageIndex || 0);
  }, [selectedImageIndex]);

  if (!isOpen) return null;
  const handleImageError = (event: any) => {
    event.target.src = NoImageFound.src; // Set the fallback image when the original image fails to load
  };

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
            <div className="mt-2 sm:max-h-[210px] lg:max-h-[510px] overflow-y-scroll w-[10%]">
              <ImageList
                images={images}
                selectedImageIndex={imageIndex}
                onImageClick={handleImageClick}
              />
            </div>
            <div className="mt-2 ml-2">
              {images[imageIndex].name === 'B2B' ||
              images[imageIndex].name === 'B2B Sparkle' ? (
                <iframe
                  frameBorder="0"
                  src={images[imageIndex].url}
                  className="lg:w-[662px] lg:h-[465px] sm:w-[300px] sm:h-[210px]"
                  onError={handleImageError}
                />
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
                    e.target.onerror = null;
                    e.target.src = NoImageFound.src;
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex mt-5 justify-center">
            <Tooltip
              tooltipTrigger={
                <Image
                  src={downloadSvg}
                  alt={downloadSvg}
                  height={40}
                  width={40}
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    handleDownloadImage(images[imageIndex]?.url || '');
                  }}
                />
              }
              tooltipContent={'Media Link'}
              tooltipContentStyles={'z-[4]'}
            />

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
              tooltipContentStyles={'z-[4]'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
