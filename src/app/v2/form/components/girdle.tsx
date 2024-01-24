import { AccordionComponent } from '@/components/v2/common/accordion';
import React from 'react';
import { IFormState } from '../interface/interface';
import { girdle } from '@/constants/v2/form';
import Tile from '@/components/v2/common/tile';
import { handleChange } from '../helpers/handle-change';

export const Girdle = ({ state, setState }: IFormState) => {
  const { selectedLab } = state;
  const { setSelectedLab } = setState;
  return (
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
  );
};
