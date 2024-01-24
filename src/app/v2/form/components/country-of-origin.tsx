import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React from 'react';
import { countryOfOrigin } from '@/constants/v2/form';
import { IFormState } from '../interface/interface';
import { handleChange } from '../helpers/handle-change';

export const CountryOfOrigin = ({ state, setState }: IFormState) => {
  const { selectedOrigin } = state;
  const { setSelectedOrigin } = setState;
  return (
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
  );
};
