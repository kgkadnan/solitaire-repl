"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import style from "./image-tile.module.scss";

export interface IImageTileStyleProps {
  imageTileMainContainerStyles?: string;
  imageTileContainerStyles?: string;
  imageTileImageStyles?: string;
  imageTileLabelStyles?: string;
  activeIndicatorStyles?: string;
  imageTileIsNav? :string
  
}
export interface IImageTileProps {
  src: string | StaticImageData | any;
  title: string;
}

export interface IImageContainerProps {
  imageTileData: IImageTileProps[];
  overriddenStyles?: IImageTileStyleProps;
  handleSelectTile?: (shape: string, index: number) => void;
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
      {imageTileData.map((tileData: IImageTileProps, index: number) => {
        const { src, title } = tileData;
        return (
          <div
            key={`image-tile-data-${title}`}
            className={`${style.imageTileContainer} ${
              overriddenStyles?.imageTileContainerStyles
            } ${
              selectedTile?.includes(title) &&
              (isNavOption ? overriddenStyles?.imageTileIsNav : style.activeIndicator)
            }`}
            onMouseEnter={() => setHoveredTile(title)}
            onMouseLeave={() => setHoveredTile(null)}
            onClick={() => {
              handleSelectTile?.(title, index);
            }}
          >
            {src?.src ? <Image
              src={src}
              alt={title}
              className={`${style.imageTileImage} ${overriddenStyles?.imageTileImageStyles} `}
            /> : <div className={`${style.imageTileImage} ${overriddenStyles?.imageTileImageStyles} `}>{src}</div> }
           
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
