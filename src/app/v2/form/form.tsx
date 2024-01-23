'use client';

import { AccordionComponent } from '@/components/v2/common/accordion';
import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import Cta from '@/components/v2/common/cta';
import ImageTile from '@/components/v2/common/image-tile';
import { InputLabel } from '@/components/v2/common/input-label';
import SideNavigationBar from '@/components/v2/common/side-navigation-bar';
import TopNavigationBar from '@/components/v2/common/top-navigation-bar';
import { shapes, anchors } from '@/constants/v2/form';
import React, { useState } from 'react';
import bookmarkAdd from '@public/v2/assets/icons/bookmark-add-01.svg';
import searchIcon from '@public/v2/assets/icons/searchIcon.svg';

interface ICtaDataItem {
  variant: 'secondary' | 'primary' | 'disable';
  svg: string; // Assuming the type of 'svg' is string, update it accordingly
  label: string;
  isDisable?: boolean;
}

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
      {/* <TopNavigationBar/> */}
      <div>
        {/* <SideNavigationBar/> */}{' '}
        <div>
          <div className="flex flex-col gap-[16px] w-[calc(100%-148px)]">
            <div>
              <span className="text-neutral900 text-headingM font-medium grid gap-[24px]">
                Search for Diamonds
              </span>
            </div>
            <AnchorLinkNavigation anchorNavigations={anchors} />

            <div id="Shape">
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
            <div id="Carat">
              <AccordionComponent
                value="Carat"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Carat'}
                hasError={false}
              />
            </div>
            <div id="Color">
              <AccordionComponent
                value="Color"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Color'}
                hasError={false}
              />
            </div>
            <div id="Clarity">
              <AccordionComponent
                value="Clarity"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Clarity'}
                hasError={false}
              />
            </div>
            <div id="Make Cut Polish Symmetry">
              <AccordionComponent
                value="Make Cut Polish Symmetry"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Make Cut Polish Symmetry'}
                hasError={false}
              />
            </div>
            <div id="Fluorescence">
              <AccordionComponent
                value="Fluorescence"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Fluorescence'}
                hasError={false}
              />
            </div>
            <div id="Lab">
              <AccordionComponent
                value="Lab"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Lab'}
                hasError={false}
              />
            </div>
            <div id="Location">
              <AccordionComponent
                value="Location"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Location'}
                hasError={false}
              />
            </div>
            <div id="Country of Origin">
              <AccordionComponent
                value="Country of Origin"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Country of Origin'}
                hasError={false}
              />
            </div>
            <div id="Shade">
              <AccordionComponent
                value="Shade"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Shade'}
                hasError={false}
              />
            </div>
            <div id="Discount% Price/Ct Amount Range">
              <AccordionComponent
                value="Discount% Price/Ct Amount Range"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Discount% Price/Ct Amount Range'}
                hasError={false}
              />
            </div>
            <div id="Parameters">
              <AccordionComponent
                value="Parameters"
                isDisable={false}
                accordionContent={<>Hello</>}
                accordionTrigger={'Parameters'}
                hasError={false}
              />
            </div>
            <div id="Girdle">
              <AccordionComponent
                value="Girdle"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Girdle'}
                hasError={false}
              />
            </div>
            <div id="Culet">
              <AccordionComponent
                value="Culet"
                isDisable={true}
                accordionContent={<>Hello</>}
                accordionTrigger={'Culet'}
                hasError={false}
              />
            </div>
            <div id="Inclusions">
              <AccordionComponent
                value="Inclusions"
                isDisable={false}
                accordionContent={<>Hello</>}
                accordionTrigger={'Inclusions'}
                hasError={false}
              />
            </div>
            <div id="Key to Symbol">
              <AccordionComponent
                value="Key to Symbol"
                isDisable={false}
                accordionContent={<>Hello</>}
                accordionTrigger={'Key to Symbol'}
                hasError={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
