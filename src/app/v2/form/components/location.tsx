import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React from 'react';
import { location } from '@/constants/v2/form';
import { IFormState } from '../interface/interface';
import { handleChange } from '../helpers/handle-change';

export const Location = ({ state, setState }: IFormState) => {
  const { selectedLocation } = state;
  const { setSelectedLocation } = setState;
  return (
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
  );
};
