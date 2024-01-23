'use client';

import { AccordionComponent } from '@/components/v2/common/accordion';
import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import ImageTile from '@/components/v2/common/image-tile';
import { DiscountPrice } from '@/components/v2/common/min-max-input/discount-price';
import Tile from '@/components/v2/common/tile';
import { shape } from '@/constants/v2/form';
import React, { useState } from 'react';

const Form = () => {
  let linkItems = [
    'shape',
    'clarity',
    'fluorescence',
    'parameter',
    'shade',
    'lab',
    'inclusions'
  ];
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

  const [make, setMake] = useState<string[]>([]);
  const [cut, setCut] = useState<string[]>([]);
  const handleTileClick = ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string[];
    setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    if (selectedTile.includes(data)) {
      setSelectedTile(prevSelectedTile =>
        prevSelectedTile.filter(selected => selected !== data)
      );
    } else {
      setSelectedTile(prevSelectedTile => [...prevSelectedTile, data]);
    }
  };

  let tileData = ['3EX', '3EX+NON', '3VG+EX', '3G', '3F'];
  let cutData = [
    { title: 'Excellent', short_name: 'EX' },
    { title: 'Very Good', short_name: 'VG' },
    { title: 'Good', short_name: 'G' },
    { title: 'Fair', short_name: 'F' }
  ];

  return (
    <div>
      <DiscountPrice />
      <Tile
        tileData={tileData}
        selectedTile={make}
        setSelectedTile={setMake}
        handleTileClick={handleTileClick}
      />
      <Tile
        tileData={cutData}
        selectedTile={cut}
        setSelectedTile={setCut}
        handleTileClick={handleTileClick}
      />
      <AnchorLinkNavigation linkItems={linkItems} />
      <div className="mt-10" id="shape">
        <AccordionComponent
          value="Shape"
          isDisable={true}
          accordionContent={
            <ImageTile
              imageTileData={shape}
              selectedTile={selectedShape}
              handleSelectTile={handleChange}
            />
          }
          accordionTrigger={'Shape'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="clarity">
        <AccordionComponent
          value="Clarity"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Clarity'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="fluorescence">
        <AccordionComponent
          value="Fluorescence"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Fluorescence'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="parameter">
        <AccordionComponent
          value="Parameter"
          isDisable={false}
          accordionContent={<>Hello</>}
          accordionTrigger={'Parameter'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="shade">
        <AccordionComponent
          value="Shade"
          isDisable={false}
          accordionContent={<>Hello</>}
          accordionTrigger={'Shade'}
          hasError={true}
        />
      </div>
      <div className="mt-10" id="lab">
        <AccordionComponent
          value="Lab"
          isDisable={false}
          accordionContent={<>Hello</>}
          accordionTrigger={'Lab'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="inclusions">
        <AccordionComponent
          value="Inclusions"
          isDisable={false}
          accordionContent={<>Hello</>}
          accordionTrigger={'Inclusions'}
          hasError={false}
        />
      </div>
    </div>
  );
};

export default Form;
