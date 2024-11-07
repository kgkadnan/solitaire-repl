import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React from 'react';
import { fluorescence } from '@/constants/v2/form';
import { handleFilterChange } from '../helpers/handle-filter-changes';

export const Fluorescence = ({ state, setState }: any) => {
  const {
    selectedCut,
    selectedPolish,
    selectedSymmetry,
    selectedFluorescence
  } = state;
  const { setSelectedMake, setSelectedFluorescence } = setState;
  const handleFluorescenceChange = ({
    data,
    selectedTile,
    setSelectedTile
  }: any) => {
    handleFilterChange(data, selectedTile, setSelectedTile);
    const temp: string[] = selectedTile;
    const index = temp.indexOf(data);
    if (index !== -1) {
      temp.splice(index, 1);
    } else {
      temp.push(data);
    }
    if (
      selectedPolish.toString() === 'EX' &&
      selectedCut.toString() === 'EX' &&
      selectedSymmetry.toString() === 'EX'
    ) {
      if (temp.toString() === 'NON') {
        setSelectedMake('3EX+NON');
      } else {
        setSelectedMake('3EX');
      }
    } else if (
      (selectedCut.toString() === 'EX,VG' ||
        selectedCut.toString() === 'VG,EX') &&
      (selectedPolish.toString() === 'EX,VG' ||
        selectedPolish.toString() === 'VG,EX') &&
      (selectedSymmetry.toString() === 'EX,VG' ||
        selectedSymmetry.toString() === 'VG,EX') &&
      temp.length === 0
    ) {
      setSelectedMake('3VG+EX');
    } else if (
      selectedCut.toString() === 'G' &&
      selectedPolish.toString() === 'G' &&
      selectedSymmetry.toString() === 'G' &&
      temp.length === 0
    ) {
      setSelectedMake('3G');
    } else if (
      selectedCut.toString() === 'F' &&
      selectedPolish.toString() === 'F' &&
      selectedSymmetry.toString() === 'F' &&
      temp.length === 0
    ) {
      setSelectedMake('3F');
    } else {
      setSelectedMake('');
    }
  };
  return (
    <div id="Fluorescence">
      <AccordionComponent
        value="Fluorescence"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[12px]">
            <Tile
              tileData={fluorescence}
              selectedTile={selectedFluorescence}
              setSelectedTile={setSelectedFluorescence}
              handleTileClick={handleFluorescenceChange}
            />
          </div>
        }
        accordionTrigger={'Fluorescence'}
        hasError={false}
      />
    </div>
  );
};
