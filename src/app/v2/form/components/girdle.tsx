import { AccordionComponent } from '@/components/v2/common/accordion';
import React from 'react';
import { IFormState } from '../interface/interface';
import { girdle } from '@/constants/v2/form';
import Tile from '@/components/v2/common/tile';
import { handleGirdleChange } from '../helpers/handle-girdle';

export const Girdle = ({ state, setState }: IFormState) => {
  const { selectedGirdle } = state;
  const { setSelectedGirdle } = setState;
  return (
    <div id="Girdle">
      <AccordionComponent
        value="Girdle"
        isDisable={true}
        accordionContent={
          <div className='px-[16px] py-[24px]'>
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
