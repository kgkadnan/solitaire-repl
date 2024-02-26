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
    <div>
      <div className="px-[16px] py-[24px] border-[1px] border-neutral200 rounded-[4px]">
        <Tile
          tileData={girdle}
          selectedTile={selectedGirdle}
          setSelectedTile={setSelectedGirdle}
          handleTileClick={handleGirdleChange}
        />
      </div>
    </div>
  );
};
