import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React, { Dispatch, SetStateAction } from 'react';
import { countryOfOrigin } from '@/constants/v2/form';
import { handleChange } from '../helpers/handle-change';

interface IShapeProps {
  selectedOrigin: string[];
  setSelectedOrigin: Dispatch<SetStateAction<string[]>>;
}

export const CountryOfOrigin = ({
  selectedOrigin,
  setSelectedOrigin
}: IShapeProps) => {
  return (
    <div id="Country of Origin">
      <AccordionComponent
        value="Country of Origin"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[24px]">
            <Tile
              tileData={countryOfOrigin}
              selectedTile={selectedOrigin}
              setSelectedTile={setSelectedOrigin}
              handleTileClick={handleChange}
            />
          </div>
        }
        accordionTrigger={'Country of Origin'}
        hasError={false}
      />
    </div>
  );
};
