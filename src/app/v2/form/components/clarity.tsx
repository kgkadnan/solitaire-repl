import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React from 'react';
import { clarity } from '@/constants/v2/form';
import { IFormState } from '../interface/interface';
import { handleChange } from '../helpers/handle-change';

export const Clarity = ({ setState, state }: IFormState) => {
  const { setSelectedClarity } = setState;
  const { selectedClarity } = state;

  return (
    <div id="Clarity">
      <AccordionComponent
        value="Clarity"
        isDisable={true}
        accordionContent={
          <div>
            <Tile
              tileData={clarity}
              selectedTile={selectedClarity}
              setSelectedTile={setSelectedClarity}
              handleTileClick={handleChange}
            />
          </div>
        }
        accordionTrigger={'Clarity'}
        hasError={false}
      />
    </div>
  );
};
