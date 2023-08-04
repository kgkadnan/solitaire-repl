"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import style from "@/components/image-tile/image-tile.module.scss";

export interface IImageTilePropsStyles {
  imageTileMainContainerStyles?: string;
  imageTileContainerStyles?: string;
  imageTileImageStyles?: string;
  imageTileLabelStyles?: string;
  activeIndicatorStyles?: string;
}
export interface IImageTileProps {
  src: string | StaticImageData;
  title: string;
}

export interface IImageContainerProps {
  imageTileData: IImageTileProps[];
  overriddenStyles?: IImageTilePropsStyles;
  handleSelectTile: (shape: string, index: number) => void;
  selectedTile: string[];
}

function CustomImageTile(imageProps: IImageContainerProps) {
  const { imageTileData, overriddenStyles, selectedTile, handleSelectTile } =
    imageProps;
  return (
    <div
      className={`${style.imageTileMainContainer} ${overriddenStyles?.imageTileMainContainerStyles}`}
    >
      {imageTileData.map((tileData: IImageTileProps, index: number) => {
        const { src, title } = tileData;
        return (
          <div
            key={`image-tile-data-${index}`}
            className={`${style.imageTileContainer} ${
              overriddenStyles?.imageTileContainerStyles
            } ${selectedTile.includes(title) ? style.activeIndicator : " "}`}
            onClick={() => {
              handleSelectTile(title, index);
            }}
          >
            <Image
              src={src}
              alt={title}
              className={`${style.imageTileImage} ${overriddenStyles?.imageTileImageStyles} `}
            />
            <div
              className={`${style.imageTileLabel} ${overriddenStyles?.imageTileLabelStyles}`}
            >
              {title}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CustomImageTile;
