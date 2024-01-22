'use client';
import ImageTile from '@/components/v2/common/image-tile';
import { shape } from '@/constants/v2/form';
import React, { useState } from 'react';

const Form = () => {
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const handleChange = (shape: string) => {
    if (selectedShape.includes(shape)) {
      setSelectedShape(prevSelectedShape =>
        prevSelectedShape.filter(selected => selected !== shape)
      );
    } else {
      setSelectedShape(prevSelectedShape => [...prevSelectedShape, shape]);
    }
  };

  return (
    <div>
      Form
      <ImageTile
        imageTileData={shape}
        selectedTile={selectedShape}
        handleSelectTile={handleChange}
      />
    </div>
  );
};

export default Form;
