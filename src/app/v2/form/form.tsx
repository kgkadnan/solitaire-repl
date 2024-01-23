'use client';

import { AccordionComponent } from '@/components/v2/common/accordion';
import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import ImageTile from '@/components/v2/common/image-tile';
import { shapes, anchors } from '@/constants/v2/form';
import Tile from '@/components/v2/common/tile';
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
      {' '}
      <AnchorLinkNavigation anchorNavigations={anchors} />
      <div className="mt-10" id="Shape">
        <AccordionComponent
          value="Shape"
          isDisable={true}
          accordionContent={
            <ImageTile
              imageTileData={shapes}
              selectedTile={selectedShape}
              handleSelectTile={handleChange}
            />
          }
          accordionTrigger={'Shape'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Carat">
        <AccordionComponent
          value="Carat"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Carat'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Color">
        <AccordionComponent
          value="Color"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Color'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Clarity">
        <AccordionComponent
          value="Clarity"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Clarity'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Make Cut Polish Symmetry">
        <AccordionComponent
          value="Make Cut Polish Symmetry"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Make Cut Polish Symmetry'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Fluorescence">
        <AccordionComponent
          value="Fluorescence"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Fluorescence'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Lab">
        <AccordionComponent
          value="Lab"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Lab'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Location">
        <AccordionComponent
          value="Location"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Location'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Country of Origin">
        <AccordionComponent
          value="Country of Origin"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Country of Origin'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Shade">
        <AccordionComponent
          value="Shade"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Shade'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Discount% Price/Ct Amount Range">
        <AccordionComponent
          value="Discount% Price/Ct Amount Range"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Discount% Price/Ct Amount Range'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Parameters">
        <AccordionComponent
          value="Parameters"
          isDisable={false}
          accordionContent={<>Hello</>}
          accordionTrigger={'Parameters'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Girdle">
        <AccordionComponent
          value="Girdle"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Girdle'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Culet">
        <AccordionComponent
          value="Culet"
          isDisable={true}
          accordionContent={<>Hello</>}
          accordionTrigger={'Culet'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Inclusions">
        <AccordionComponent
          value="Inclusions"
          isDisable={false}
          accordionContent={<>Hello</>}
          accordionTrigger={'Inclusions'}
          hasError={false}
        />
      </div>
      <div className="mt-10" id="Key to Symbol">
        <AccordionComponent
          value="Key to Symbol"
          isDisable={false}
          accordionContent={<>Hello</>}
          accordionTrigger={'Key to Symbol'}
          hasError={false}
        />
      </div>
    </div>
  );
};

export default Form;
