'use client';

import { AccordionComponent } from '@/components/v2/common/accordion';
import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import ImageTile from '@/components/v2/common/image-tile';
import Tile from '@/components/v2/common/tile';
import { shapes, anchors, whites } from '@/constants/v2/form';
import React, { Dispatch, SetStateAction } from 'react';
import useFieldStateManagement from './hooks/form-state';

const Form = () => {
  const { state, setState, carat } = useFieldStateManagement();
  const {
    selectedShape,
    selectedWhiteColor,
    selectedTinge,
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
    selectedOvertone
  } = state;

  const {
    setSelectedShape,
    setSelectedWhiteColor,
    setSelectedFancyColor,
    setSelectedIntensity,
    setSelectedOvertone,
    setSelectedTinge,
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
    setCaratRangeTo
  } = setState;

  const handleFilterChange = (
    filterData: string,
    selectedFilters: string[],
    setSelectedFilters: Dispatch<SetStateAction<string[]>>
  ) => {
    if (selectedFilters.includes(filterData)) {
      setSelectedFilters((prevSelectedColors: string[]) =>
        prevSelectedColors.filter(selected => selected !== filterData)
      );
    } else {
      setSelectedFilters((prevSelectedColors: string[]) => [
        ...prevSelectedColors,
        filterData
      ]);
    }
  };
  const compareArrays = (arr1: string[], arr2: string[]) => {
    // Check if the lengths of the arrays are equal
    if (arr1.length !== arr2.length) {
      return false;
    }
    // Convert arrays to sets
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    // Compare sets
    for (const value of set1) {
      if (!set2.has(value)) {
        return false;
      }
    }
    // If the loop completes, sets are equal
    return true;
  };
  const handleShapeChange = (shape: string) => {
    const filteredShape: string[] = shapes.map(data => data.short_name);
    if (shape.toLowerCase() === 'all') {
      setSelectedShape(filteredShape);
      if (selectedShape.includes('All')) {
        setSelectedShape([]);
      }
    } else {
      if (selectedShape.includes('All')) {
        const filteredSelectedShape: string[] = selectedShape.filter(
          (data: any) => data !== 'All' && data !== shape
        );
        setSelectedShape(filteredSelectedShape);
      } else if (
        compareArrays(
          selectedShape.filter((data: any) => data !== 'All'),
          filteredShape.filter(data => data !== 'All' && data !== shape)
        )
      ) {
        setSelectedShape(filteredShape);
      } else {
        handleFilterChange(shape, selectedShape, setSelectedShape);
      }
    }
  };

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
                    handleSelectTile={handleShapeChange}
                  />
                }
                accordionTrigger={'Shape'}
                hasError={false}
              />
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px]">
              <div id="Carat">
                <AccordionComponent
                  value="Carat"
                  isDisable={true}
                  accordionContent={<div>hello</div>}
                  accordionTrigger={'Carat'}
                  hasError={false}
                />
              </div>
              <div id="Color">
                <AccordionComponent
                  value="Color"
                  isDisable={true}
                  accordionContent={
                    <div>
                      <Tile
                        tileData={whites}
                        selectedTile={selectedWhiteColor}
                        setSelectedTile={setSelectedWhiteColor}
                        handleTileClick={handleWhiteColorChange}
                      />
                    </div>
                  }
                  accordionTrigger={'Color'}
                  hasError={false}
                />
              </div>
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
