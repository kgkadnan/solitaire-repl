'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import style from './image-tile.module.scss';

export interface IImageTileStyleProps {
  imageTileMainContainerStyles?: string;
  imageTileContainerStyles?: string;
  imageTileImageStyles?: string;
  imageTileLabelStyles?: string;
  activeIndicatorStyles?: string;
  imageTileIsNav?: string;
}
export interface IImageTileProps {
  src: string | StaticImageData | any;
  title: string;
  link?: string;
  short_name?: any;
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
    isNavOption = false,
  } = imageProps;

  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  return (
    <div
      className={`${style.imageTileMainContainer} ${overriddenStyles?.imageTileMainContainerStyles}`}
    >
      {imageTileData.map((tileData: IImageTileProps) => {
        const { src, title, link, short_name } = tileData;
        return (
          <div
            key={`image-tile-data-${title}`}
            role="img"
            className={`${
              style.imageTileContainer
            } ${overriddenStyles?.imageTileContainerStyles} ${
              selectedTile?.includes(short_name ? short_name : title) &&
              overriddenStyles?.activeIndicatorStyles
            }`}
            onMouseEnter={() => setHoveredTile(title)}
            onMouseLeave={() => setHoveredTile(null)}
            onClick={() => {
              link
                ? handleSelectTile?.(title, link)
                : handleSelectTile?.(short_name);
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
                {src}
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
        );
      })}
    </div>
  );
};

export default CustomImageTile;
