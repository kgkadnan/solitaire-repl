import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import { Tabs } from '@/components/v2/common/toggle';
import React, { Dispatch, SetStateAction } from 'react';
import { color, white } from '@/constants/v2/form';
import { handleFilterChange } from '../helpers/handle-filter-changes';

interface IColorProps {
  selectedColor: string;
  selectedWhiteColor: string[];
  setSelectedColor: Dispatch<SetStateAction<string>>;
  setSelectedWhiteColor: Dispatch<SetStateAction<string[]>>;
  setSelectedFancyColor: Dispatch<SetStateAction<string>>;
  setSelectedIntensity: Dispatch<SetStateAction<string>>;
  setSelectedOvertone: Dispatch<SetStateAction<string>>;
}

export const Color = ({
  selectedColor,
  selectedWhiteColor,
  setSelectedColor,
  setSelectedWhiteColor,
  setSelectedFancyColor,
  setSelectedIntensity,
  setSelectedOvertone
}: IColorProps) => {
  const handleWhiteColorChange = ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string[];
    setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    setSelectedFancyColor('');
    setSelectedIntensity('');
    setSelectedOvertone('');
    handleFilterChange(data, selectedTile, setSelectedTile);
  };
  return (
    <div id="Color">
      <AccordionComponent
        value="Color"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[24px]">
            <div className="flex justify-end">
              <div className="w-[200px]">
                <Tabs
                  onChange={setSelectedColor}
                  options={color}
                  backgroundColor={'var(--neutral-0)'}
                  fontColor={'var(--neutral-900)'}
                  fontSize="10"
                  selectedFontColor={'var(--neutral-25)'}
                  selectedBackgroundColor={'var(--primary-main)'}
                  border={'1px solid var(--neutral-200)'}
                  wrapperBorderRadius={'8px'}
                  optionBorderRadius={
                    selectedColor === 'white'
                      ? '8px 0px 0px 8px'
                      : '0px 8px 8px 0px'
                  }
                />
              </div>
            </div>
            <Tile
              tileData={white}
              selectedTile={selectedWhiteColor}
              setSelectedTile={setSelectedWhiteColor}
              handleTileClick={handleWhiteColorChange}
            />
          </div>
        }
        accordionTrigger={'Color'}
        hasError={false}
      />
    </div>
  );
};
