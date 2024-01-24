import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React, { Dispatch, SetStateAction } from 'react';
import { shade } from '@/constants/v2/form';
import { handleChange } from '../helpers/handle-change';

interface IShadeProps {
  selectedShade: string[];
  setSelectedShade: Dispatch<SetStateAction<string[]>>;
}

export const Shade = ({ selectedShade, setSelectedShade }: IShadeProps) => {
  return (
    <div id="Shade">
      <AccordionComponent
        value="Shade"
        isDisable={true}
        accordionContent={
          <div>
            <Tile
              tileData={shade}
              selectedTile={selectedShade}
              setSelectedTile={setSelectedShade}
              handleTileClick={handleChange}
            />
          </div>
        }
        accordionTrigger={'Shade'}
        hasError={false}
      />
    </div>
  );
};
