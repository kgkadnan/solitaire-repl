import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React from 'react';
import { fluorescence } from '@/constants/v2/form';
import { IFormState } from '../interface/interface';
import { handleChange } from '../helpers/handle-change';

export const Fluorescence = ({ state, setState }: IFormState) => {
  const { selectedFluorescence } = state;
  const { setSelectedFluorescence } = setState;
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
