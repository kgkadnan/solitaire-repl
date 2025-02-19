import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React, { Dispatch, SetStateAction } from 'react';
import { clarity } from '@/constants/v2/form';
import { handleChange } from '../helpers/handle-change';

interface IClarityProps {
  selectedClarity: string[];
  setSelectedClarity: Dispatch<SetStateAction<string[]>>;
}

export const Clarity = ({
  setSelectedClarity,
  selectedClarity
}: IClarityProps) => {
  return (
    <div id="Clarity">
      <AccordionComponent
        value="Clarity"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[24px]">
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
