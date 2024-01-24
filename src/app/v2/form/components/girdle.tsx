import { AccordionComponent } from '@/components/v2/common/accordion';
import React, { Dispatch, SetStateAction } from 'react';
import { girdle } from '@/constants/v2/form';
import Tile from '@/components/v2/common/tile';
import { handleGirdleChange } from '../helpers/handle-girdle';

interface ISGirdleProps {
  selectedGirdle: string[];
  setSelectedGirdle: Dispatch<SetStateAction<string[]>>;
}

export const Girdle = ({
  selectedGirdle,
  setSelectedGirdle
}: ISGirdleProps) => {
  return (
    <div id="Girdle">
      <AccordionComponent
        value="Girdle"
        isDisable={true}
        accordionContent={
          <div>
            <Tile
              tileData={girdle}
              selectedTile={selectedGirdle}
              setSelectedTile={setSelectedGirdle}
              handleTileClick={handleGirdleChange}
            />
          </div>
        }
        accordionTrigger={'Girdle'}
        hasError={false}
      />
    </div>
  );
};
