import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React from 'react';
import { IFormState } from '../interface/interface';
import { handleChange } from '../helpers/handle-change';
import { keyToSymbol } from '@/constants/v2/form';

export const KeyToSymbol = ({ setState, state }: IFormState) => {
  const { selectedKeyToSymbol } = state;
  const { setSelectedKeyToSymbol } = setState;
  return (
    <div id="Key to Symbol">
      <AccordionComponent
        value="Key to Symbol"
        isDisable={false}
        accordionContent={
          <div className='px-[16px] py-[24px]'>
            <Tile
              tileData={keyToSymbol}
              selectedTile={selectedKeyToSymbol}
              setSelectedTile={setSelectedKeyToSymbol}
              handleTileClick={handleChange}
            />
          </div>
        }
        accordionTrigger={'Key to Symbol'}
        hasError={false}
      />
    </div>
  );
};
