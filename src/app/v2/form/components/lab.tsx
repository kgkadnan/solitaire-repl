import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React, { Dispatch, SetStateAction } from 'react';
import { lab } from '@/constants/v2/form';
import { IFormState } from '../interface/interface';
import { handleChange } from '../helpers/handle-change';

interface ILabProps {
  selectedLab: string[];
  setSelectedLab: Dispatch<SetStateAction<string[]>>;
}

export const Lab = ({ selectedLab, setSelectedLab }: ILabProps) => {
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
