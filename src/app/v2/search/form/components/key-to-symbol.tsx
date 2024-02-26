import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import React, { Dispatch, SetStateAction } from 'react';
import { keyToSymbol } from '@/constants/v2/form';
import { compareArrays } from '../helpers/compare-arrays';
import { handleFilterChange } from '../helpers/handle-filter-changes';

interface IKeyToSymbolProps {
  selectedKeyToSymbol: string[];
  setSelectedKeyToSymbol: Dispatch<SetStateAction<string[]>>;
}

const handleKeyToSymbolChange = ({
  data,
  selectedTile,
  setSelectedTile
}: any) => {
  if (data.toLowerCase() === 'all') {
    setSelectedTile(keyToSymbol);
    if (selectedTile.includes('All')) {
      setSelectedTile([]);
    }
  } else {
    if (selectedTile.includes('All')) {
      let filteredSelectedShape: string[] = selectedTile.filter(
        (data1: string) => data1 !== 'All' && data1 !== data
      );
      setSelectedTile(filteredSelectedShape);
    } else if (
      compareArrays(
        selectedTile.filter((data: string) => data !== 'All'),
        keyToSymbol.filter(data1 => data1 !== 'All' && data1 !== data)
      )
    ) {
      setSelectedTile(keyToSymbol);
    } else {
      handleFilterChange(data, selectedTile, setSelectedTile);
    }
  }
};

export const KeyToSymbol = ({
  selectedKeyToSymbol,
  setSelectedKeyToSymbol
}: IKeyToSymbolProps) => {
  return (
    <div id="Key to Symbol">
      <AccordionComponent
        value="Key to Symbol"
        isDisable={false}
        defaultValue="closed"
        accordionContent={
          <div className="px-[16px] py-[24px]">
            <Tile
              tileData={keyToSymbol}
              selectedTile={selectedKeyToSymbol}
              setSelectedTile={setSelectedKeyToSymbol}
              handleTileClick={handleKeyToSymbolChange}
            />
          </div>
        }
        accordionTrigger={'Key to Symbol'}
        hasError={false}
      />
    </div>
  );
};
