'use client';

import { AccordionComponent } from '@/components/v2/common/accordion';
import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import ImageTile from '@/components/v2/common/image-tile';
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

  return (
    <div>
      {' '}
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
