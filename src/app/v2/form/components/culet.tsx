import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React from 'react';
import { culet } from '@/constants/v2/form';
import { IFormState } from '../interface/interface';
import { handleChange } from '../helpers/handle-change';

export const Culet = ({ setState, state }: IFormState) => {
  const { selectedCulet } = state;
  const { setSelectedCulet } = setState;
  return (
    <div id="Culet">
      <AccordionComponent
        value="Culet"
        isDisable={true}
        accordionContent={
          <div className='px-[16px] py-[24px]'>
            <Tile
              tileData={culet}
              selectedTile={selectedCulet}
              setSelectedTile={setSelectedCulet}
              handleTileClick={handleChange}
            />
          </div>
        }
        accordionTrigger={'Culet'}
        hasError={false}
      />
    </div>
  );
};
