import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React from 'react';
import { lab } from '@/constants/v2/form';
import { IFormState } from '../interface/interface';
import { handleChange } from '../helpers/handle-change';

export const Lab = ({ state, setState }: IFormState) => {
  const { selectedLab } = state;
  const { setSelectedLab } = setState;
  return (
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
  );
};
