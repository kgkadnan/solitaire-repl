"use client";
import { useState } from "react";
import CustomImageTile, { IImageTileProps } from ".";
import Round from "@public/assets/images/Round.png";

 const ImageTileExample=()=> {
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const handleChange = (shape: string, index: number) => {
   
    if (selectedShape.includes(shape)) {
      setSelectedShape((prevSelectedShape) =>
        prevSelectedShape.filter((selected) => selected !== shape)
      );
    } else {
      setSelectedShape((prevSelectedShape) => [...prevSelectedShape, shape]);
    }
  };
  const imageData: IImageTileProps[] = [
    {
      src: Round,
      title: "Round",
    },
    {
      src: Round,
      title: "Pear",
    },
    {
      src: Round,
      title: "Emerald",
    },
  ];
  return (
    <CustomImageTile
      imageTileData={imageData}
      selectedTile={selectedShape}
      handleSelectTile={handleChange}
    />
  );
}

export default  ImageTileExample;
