import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React, { Dispatch, SetStateAction } from 'react';
import { location } from '@/constants/v2/form';
import { handleChange } from '../helpers/handle-change';

interface ILocationProps {
  selectedLocation: string[];
  setSelectedLocation: Dispatch<SetStateAction<string[]>>;
}

export const Location = ({
  selectedLocation,
  setSelectedLocation
}: ILocationProps) => {
  return (
    <div id="Location">
      <AccordionComponent
        value="Location"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[24px]">
            <Tile
              tileData={location}
              selectedTile={selectedLocation}
              setSelectedTile={setSelectedLocation}
              handleTileClick={handleChange}
            />
          </div>
        }
        accordionTrigger={'Location'}
        hasError={false}
      />
    </div>
  );
};
