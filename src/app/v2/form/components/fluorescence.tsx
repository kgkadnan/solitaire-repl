import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React, { Dispatch, SetStateAction } from 'react';
import { fluorescence } from '@/constants/v2/form';
import { handleChange } from '../helpers/handle-change';

interface IFlouorescenceProps {
  selectedFluorescence: string[];
  setSelectedFluorescence: Dispatch<SetStateAction<string[]>>;
}

export const Fluorescence = ({
  selectedFluorescence,
  setSelectedFluorescence
}: IFlouorescenceProps) => {
  return (
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
  );
};
