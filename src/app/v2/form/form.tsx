'use client';

import { AccordionComponent } from '@/components/v2/common/accordion';
import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import Cta from '@/components/v2/common/cta';
import ImageTile from '@/components/v2/common/image-tile';
import Tile from '@/components/v2/common/tile';
import { shape } from '@/constants/v2/form';
import React, { useState } from 'react';
import bookmarkAdd from '@public/v2/assets/icons/bookmark-add-01.svg';
import searchIcon from '@public/v2/assets/icons/searchIcon.svg';

interface ICtaDataItem {
  variant: 'secondary' | 'primary' | 'disable';
  svg: string;
  label: string;
  isDisable?: boolean;
}

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
  const [girdle, setGirdle] = useState<string[]>([]);
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

  let ctaData: ICtaDataItem[] = [
    {
      variant: 'disable',
      svg: bookmarkAdd,
      label: 'Save Search',
      isDisable: true
    },
    { variant: 'secondary', svg: bookmarkAdd, label: 'Save Search' },
    { variant: 'primary', svg: searchIcon, label: 'Search' }
  ];

  let girdleData = [
    'ETN',
    'VTN',
    'STN',
    'THN',
    'MED',
    'STK',
    'THK',
    'VTK',
    'ETK '
  ];

  const handleGirdleTileClick = ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string[];
    setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    // Find the index of the clicked item in the data array
    const clickedIndex = girdleData.indexOf(data);

    if (clickedIndex !== -1) {
      // Find the index of the previously selected item in the data array
      let lastSelectedIndex;

      if (
        clickedIndex < girdleData.indexOf(selectedTile[0]) ||
        clickedIndex < girdleData.indexOf(selectedTile[selectedTile.length - 1])
      ) {
        lastSelectedIndex =
          selectedTile.length > 0
            ? girdleData.indexOf(selectedTile[selectedTile.length - 1])
            : -1;
      } else {
        lastSelectedIndex =
          selectedTile.length > 0 ? girdleData.indexOf(selectedTile[0]) : -1;
      }

      if (lastSelectedIndex !== -1) {
        // Determine the range of items to select
        const startIndex = Math.min(clickedIndex, lastSelectedIndex);
        const endIndex = Math.max(clickedIndex, lastSelectedIndex);

        // If clicked item is the same as the last selected item or the first selected item, deselect the entire range
        if (
          data === selectedTile[selectedTile.length - 1] ||
          data === selectedTile[0]
        ) {
          setSelectedTile([]);
        } else {
          // Add the clicked item to the existing range if it's next to the last selected item
          const newSelected = girdleData.slice(
            startIndex,
            clickedIndex === endIndex + 1 ? endIndex + 2 : endIndex + 1
          );

          // Update the selected items
          setSelectedTile(newSelected);
        }
      } else {
        // Toggle the clicked item
        setSelectedTile([data]);
      }
    }
  };

  return (
    <div>
      <Cta ctaData={ctaData} />
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
      <div className="mt-10" id="girdle">
        <AccordionComponent
          value="Girdle"
          isDisable={true}
          accordionContent={
            <Tile
              tileData={girdleData}
              selectedTile={girdle}
              setSelectedTile={setGirdle}
              handleTileClick={handleGirdleTileClick}
            />
          }
          accordionTrigger={'Girdle'}
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
