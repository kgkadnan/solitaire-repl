import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React, { Dispatch, SetStateAction } from 'react';
import { handleChange } from '../helpers/handle-change';
import { keyToSymbol } from '@/constants/v2/form';

interface IKeyToSymbolProps {
  selectedKeyToSymbol: string[];
  setSelectedKeyToSymbol: Dispatch<SetStateAction<string[]>>;
}

export const KeyToSymbol = ({
  selectedKeyToSymbol,
  setSelectedKeyToSymbol
}: IKeyToSymbolProps) => {
  return (
    <div id="Key to Symbol">
      <AccordionComponent
        value="Key to Symbol"
        isDisable={false}
        accordionContent={
          <div>
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
