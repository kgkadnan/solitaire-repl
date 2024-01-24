import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React, { Dispatch, SetStateAction } from 'react';
import { culet } from '@/constants/v2/form';
import { handleChange } from '../helpers/handle-change';

interface ICuletProps {
  selectedCulet: string[];
  setSelectedCulet: Dispatch<SetStateAction<string[]>>;
}

export const Culet = ({ selectedCulet, setSelectedCulet }: ICuletProps) => {
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
