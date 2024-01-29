'use client';

import React from 'react';
import Image from 'next/image';
import Tooltip from '../tooltip';

export interface IImageTileStyleProps {
  imageTileMainContainerStyles?: string;
  imageTileContainerStyles?: string;
  imageTileImageStyles?: string;
  imageTileLabelStyles?: string;
  activeIndicatorStyles?: string;
  imageTileIsNav?: string;
}
export interface IImageTileProps {
  src: any;
  title: string;
  short_name: string;
}

export interface IImageContainerProps {
  imageTileData: IImageTileProps[];
  handleSelectTile: (shape: string) => void;
  selectedTile: string[];
}

const ImageTile: React.FC<IImageContainerProps> = (
  imageProps: IImageContainerProps
) => {
  const { imageTileData, handleSelectTile, selectedTile } = imageProps;

  return (
    <div
      className={`grid  sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-[13px] p-[16px] cursor-pointer`}
    >
      {imageTileData.map((tileData: IImageTileProps) => {
        const { src, title, short_name } = tileData;

        return (
          <>
            <Tooltip
              tooltipTrigger={
                <div
                  key={`image-tile-data-${title}`}
                  role="img"
                  className={`px-[25px] py-[20px] border-[1px] bg-neutralShapeDefault   grid gap-[8px] w-[93px] h-[106px] rounded-[8px] justify-center text-center hover:border-neutralShapeHover  border-neutral50 ${
                    selectedTile.includes(short_name)
                      ? 'shadow-popupsShadow border-neutralShapeSelected'
                      : ''
                  }`}
                  onClick={() => {
                    handleSelectTile(short_name);
                  }}
                >
                  <Image
                    src={src}
                    alt={title}
                    className="mx-auto justify-center"
                  />

                  <span className="text-neutral400 text-sRegular font-regular">
                    {title}
                  </span>
                </div>
              }
              tooltipContent={title}
              key={`image-tile-data-${title}`}
            />
          </>
        );
      })}
    </div>
  );
};

export default ImageTile;
