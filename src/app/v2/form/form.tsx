'use client';

import { AccordionComponent } from '@/components/v2/common/accordion';
import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import ImageTile from '@/components/v2/common/image-tile';
import { DiscountPrice } from '@/components/v2/common/min-max-input/discount-price';
import Tile from '@/components/v2/common/tile';
import {
  shape,
  anchor,
  white,
  color,
  clarity,
  fluorescence,
  lab,
  location,
  countryOfOrigin,
  shade,
  girdle,
  culet,
  keyToSymbol
} from '@/constants/v2/form';
import React, { Dispatch, SetStateAction } from 'react';
import useFormStateManagement from './hooks/form-state';
import { Tabs } from '@/components/v2/common/toggle';
import { handleFilterChange } from './helpers/handle-filter-changes';
import { compareArrays } from './helpers/compare-arrays';
import { Shape } from './components/shape';
import { Carat } from './components/carat';
import { Color } from './components/color';

const Form = () => {
  const { state, setState, carat } = useFormStateManagement();
  const {
    selectedShape,
    selectedWhiteColor,
    selectedShade,
    selectedClarity,
    selectedCaratRange,
    selectedMake,
    selectedCut,
    selectedPolish,
    selectedSymmetry,
    selectedFluorescence,
    selectedKeyToSymbol,
    selectedLab,
    selectedLocation,
    selectedOrigin,
    priceRangeFrom,
    priceRangeTo,
    discountFrom,
    discountTo,
    pricePerCaratFrom,
    pricePerCaratTo,
    caratRangeFrom,
    caratRangeTo,
    selectedFancyColor,
    selectedIntensity,
    selectedOvertone,
    selectedColor,
    selectedCulet
  } = state;

  const {
    setSelectedShape,
    setSelectedWhiteColor,
    setSelectedFancyColor,
    setSelectedIntensity,
    setSelectedOvertone,
    setSelectedShade,
    setSelectedClarity,
    setSelectedCaratRange,
    setSelectedMake,
    setSelectedCut,
    setSelectedPolish,
    setSelectedSymmetry,
    setSelectedFluorescence,
    setSelectedKeyToSymbol,
    setSelectedLab,
    setSelectedLocation,
    setSelectedOrigin,
    setPriceRangeFrom,
    setPriceRangeTo,
    setDiscountFrom,
    setDiscountTo,
    setPricePerCaratFrom,
    setPricePerCaratTo,
    setCaratRangeFrom,
    setCaratRangeTo,
    setSelectedColor,
    setSelectedCulet
  } = setState;

  // const handleShapeChange = (shapeData: string) => {
  //   const filteredShape: string[] = shape.map(data => data.short_name);
  //   if (shapeData.toLowerCase() === 'all') {
  //     setSelectedShape(filteredShape);
  //     if (selectedShape.includes('All')) {
  //       setSelectedShape([]);
  //     }
  //   } else {
  //     if (selectedShape.includes('All')) {
  //       const filteredSelectedShape: string[] = selectedShape.filter(
  //         (data: any) => data !== 'All' && data !== shape
  //       );
  //       setSelectedShape(filteredSelectedShape);
  //     } else if (
  //       compareArrays(
  //         selectedShape.filter((data: any) => data !== 'All'),
  //         filteredShape.filter(data => data !== 'All' && data !== shapeData)
  //       )
  //     ) {
  //       setSelectedShape(filteredShape);
  //     } else {
  //       handleFilterChange(shapeData, selectedShape, setSelectedShape);
  //     }
  //   }
  // };

  // Function to handle color change based on user selection
  const handleWhiteColorChange = ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string[];
    setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    setSelectedFancyColor('');
    setSelectedIntensity('');
    setSelectedOvertone('');
    handleFilterChange(data, selectedTile, setSelectedTile);
  };

  const handleChange = ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string[];
    setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    handleFilterChange(data, selectedTile, setSelectedTile);
  };
  return (
    <div>
      {/* <TopNavigationBar/> */}
      <div>
        {/* <SideNavigationBar/> */}
        <div>
          <div className="flex flex-col gap-[16px] w-[calc(100%-148px)]">
            <div>
              <span className="text-neutral900 text-headingM font-medium grid gap-[24px]">
                Search for Diamonds
              </span>
            </div>
            <AnchorLinkNavigation anchorNavigations={anchor} />

            <Shape />

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px]">
              <Carat />
              <Color />
            </div>
            <div id="Clarity">
              <AccordionComponent
                value="Clarity"
                isDisable={true}
                accordionContent={
                  <div>
                    <Tile
                      tileData={clarity}
                      selectedTile={selectedClarity}
                      setSelectedTile={setSelectedClarity}
                      handleTileClick={handleChange}
                    />
                  </div>
                }
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
                accordionContent={
                  <div>
                    <Tile
                      tileData={fluorescence}
                      selectedTile={selectedFluorescence}
                      setSelectedTile={setSelectedFluorescence}
                      handleTileClick={handleChange}
                    />
                  </div>
                }
                accordionTrigger={'Fluorescence'}
                hasError={false}
              />
            </div>
            <div id="Lab">
              <AccordionComponent
                value="Lab"
                isDisable={true}
                accordionContent={
                  <div>
                    <Tile
                      tileData={lab}
                      selectedTile={selectedLab}
                      setSelectedTile={setSelectedLab}
                      handleTileClick={handleChange}
                    />
                  </div>
                }
                accordionTrigger={'Lab'}
                hasError={false}
              />
            </div>
            <div id="Location">
              <AccordionComponent
                value="Location"
                isDisable={true}
                accordionContent={
                  <div>
                    <Tile
                      tileData={location}
                      selectedTile={selectedLocation}
                      setSelectedTile={setSelectedLocation}
                      handleTileClick={handleChange}
                    />
                  </div>
                }
                accordionTrigger={'Location'}
                hasError={false}
              />
            </div>
            <div id="Country of Origin">
              <AccordionComponent
                value="Country of Origin"
                isDisable={true}
                accordionContent={
                  <div>
                    <Tile
                      tileData={countryOfOrigin}
                      selectedTile={selectedOrigin}
                      setSelectedTile={setSelectedOrigin}
                      handleTileClick={handleChange}
                    />
                  </div>
                }
                accordionTrigger={'Country of Origin'}
                hasError={false}
              />
            </div>
            <div id="Shade">
              <AccordionComponent
                value="Shade"
                isDisable={true}
                accordionContent={
                  <div>
                    <Tile
                      tileData={shade}
                      selectedTile={selectedShade}
                      setSelectedTile={setSelectedShade}
                      handleTileClick={handleChange}
                    />
                  </div>
                }
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
                accordionContent={
                  <div>
                    <Tile
                      tileData={girdle}
                      selectedTile={selectedLab}
                      setSelectedTile={setSelectedLab}
                      handleTileClick={handleChange}
                    />
                  </div>
                }
                accordionTrigger={'Girdle'}
                hasError={false}
              />
            </div>
            <div id="Culet">
              <AccordionComponent
                value="Culet"
                isDisable={true}
                accordionContent={
                  <div>
                    <Tile
                      tileData={culet}
                      selectedTile={selectedCulet}
                      setSelectedTile={setSelectedCulet}
                      handleTileClick={handleChange}
                    />
                  </div>
                }
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
                accordionContent={
                  <div>
                    <Tile
                      tileData={keyToSymbol}
                      selectedTile={selectedKeyToSymbol}
                      setSelectedTile={setSelectedKeyToSymbol}
                      handleTileClick={handleChange}
                    />
                  </div>
                }
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
