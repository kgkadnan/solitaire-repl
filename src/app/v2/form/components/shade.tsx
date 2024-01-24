import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React from 'react';
import { shade } from '@/constants/v2/form';
import { IFormState } from '../interface/interface';
import { handleChange } from '../helpers/handle-change';

export const Shade = ({ state, setState }: IFormState) => {
  const { selectedShade } = state;
  const { setSelectedShade } = setState;
  return (
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
  );
};
