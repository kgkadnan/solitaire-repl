'use client';

import React, { ReactNode, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import style from './image-tile.module.scss';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

export interface IImageTileStyleProps {
  imageTileMainContainerStyles?: string;
  imageTileContainerStyles?: string;
  imageTileImageStyles?: string;
  imageTileLabelStyles?: string;
  activeIndicatorStyles?: string;
  imageTileIsNav?: string;
}
export interface IImageTileProps {
  src: string | StaticImageData | object;
  title: string;
  link?: string;
  short_name?: string;
  isActive?: boolean;
}

export interface IImageContainerProps {
  imageTileData: IImageTileProps[];
  overriddenStyles?: IImageTileStyleProps;
  handleSelectTile?: (shape: string, link?: string) => void;
  selectedTile?: string[];
  isNavOption?: boolean;
}

const CustomImageTile: React.FC<IImageContainerProps> = (
  imageProps: IImageContainerProps
) => {
  const {
    imageTileData,
    overriddenStyles,
    selectedTile,
    handleSelectTile,
    isNavOption = false
  } = imageProps;

  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  return (
    <TooltipProvider>
      <Tooltip>
        <div
          className={`${style.imageTileMainContainer} ${overriddenStyles?.imageTileMainContainerStyles}`}
        >
          {imageTileData.map((tileData: IImageTileProps) => {
            const { src, title, link, short_name, isActive } = tileData;

            const isTileActive =
              isActive || (short_name && selectedTile?.includes(short_name));
            return (
              <>
                <TooltipTrigger asChild>
                  <div
                    key={`image-tile-data-${title}`}
                    role="img"
                    className={`${
                      style.imageTileContainer
                    } ${overriddenStyles?.imageTileContainerStyles} ${
                      isTileActive && overriddenStyles?.activeIndicatorStyles
                    }`}
                    onMouseEnter={() => setHoveredTile(title)}
                    onMouseLeave={() => setHoveredTile(null)}
                    onClick={() => {
                      link
                        ? handleSelectTile?.(title, link)
                        : short_name && handleSelectTile?.(short_name);
                    }}
                  >
                    {typeof src === 'string' ? (
                      <Image
                        src={src}
                        alt={title}
                        width={100}
                        height={100}
                        className={`${style.imageTileImage} ${overriddenStyles?.imageTileImageStyles} `}
                      />
                    ) : (
                      <div
                        className={`${style.imageTileImage} ${overriddenStyles?.imageTileImageStyles} `}
                      >
                        {src as ReactNode}
                      </div>
                    )}

                    {/* <div
              className={`${style.imageTileLabel} ${overriddenStyles?.imageTileLabelStyles}`}
            >
              {title}
            </div> */}

                    {isNavOption ? (
                      hoveredTile === title && (
                        <div
                          className={`${style.imageTileLabel} ${overriddenStyles?.imageTileLabelStyles}`}
                        >
                          {title}
                        </div>
                      )
                    ) : (
                      <div
                        className={`${style.imageTileLabel} ${overriddenStyles?.imageTileLabelStyles}`}
                      >
                        {title}
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{short_name}</p>
                </TooltipContent>
              </>
            );
          })}
        </div>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomImageTile;
