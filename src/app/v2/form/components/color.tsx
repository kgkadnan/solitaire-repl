import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import { Tabs } from '@/components/v2/common/toggle';
import React, { Dispatch, SetStateAction } from 'react';
import { color, fancy, white } from '@/constants/v2/form';
import { handleFilterChange } from '../helpers/handle-filter-changes';
import Select from 'react-select';
import { colourStyles } from '../helpers/select-color-style';

interface IColorProps {
  selectedColor: string;
  selectedFancyColor: any;
  selectedIntensity: any;
  selectedOvertone: any;
  selectedWhiteColor: string[];
  setSelectedColor: Dispatch<SetStateAction<string>>;
  setSelectedWhiteColor: Dispatch<SetStateAction<string[]>>;
  setSelectedFancyColor: Dispatch<SetStateAction<string[]>>;
  setSelectedIntensity: Dispatch<SetStateAction<string[]>>;
  setSelectedOvertone: Dispatch<SetStateAction<string[]>>;
}

export const Color = ({
  selectedColor,
  selectedFancyColor,
  selectedIntensity,
  selectedOvertone,
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
    setSelectedFancyColor([]);
    setSelectedIntensity([]);
    setSelectedOvertone([]);
    handleFilterChange(data, selectedTile, setSelectedTile);
  };

  // Function to handle fancy color filter change based on user selection
  const handleFancyFilterChange = (selectedOption: any) => {
    setSelectedWhiteColor([]);
    setSelectedFancyColor([]);
    selectedOption.map((data: any) => {
      setSelectedFancyColor((prevSelectedColors: string[]) => [
        ...prevSelectedColors,
        data
      ]);
    });
  };

  // Function to handle intensity change based on user selection
  const handleIntensityChange = (selectedOption: any) => {
    setSelectedWhiteColor([]);
    setSelectedIntensity([]);
    selectedOption.map((data: any) => {
      setSelectedIntensity((prevSelectedColors: string[]) => [
        ...prevSelectedColors,
        data
      ]);
    });
  };

  // Function to handle overtone change based on user selection
  const handleOvertoneChange = (selectedOption: any) => {
    setSelectedWhiteColor([]);
    setSelectedOvertone([]);
    selectedOption.map((data: any) => {
      setSelectedOvertone((prevSelectedColors: string[]) => [
        ...prevSelectedColors,
        data
      ]);
    });
  };

  return (
    <div id="Color">
      <AccordionComponent
        value="Color"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[24px] flex flex-col gap-[24px]">
            <div className="flex justify-end">
              <div className="w-[120px] h-[30px]">
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
                  selectionIndicatorMargin={0}
                />
              </div>
            </div>
            <div>
              {selectedColor === 'white' ? (
                <Tile
                  tileData={white}
                  selectedTile={selectedWhiteColor}
                  setSelectedTile={setSelectedWhiteColor}
                  handleTileClick={handleWhiteColorChange}
                />
              ) : (
                <div className="flex justify-between">
                  <div className="w-[200px]">
                    <Select
                      value={selectedFancyColor}
                      options={fancy}
                      onChange={handleFancyFilterChange}
                      placeholder={'Color'}
                      styles={colourStyles}
                      isMulti
                      closeMenuOnSelect={false}
                      autoFocus={false}
                    />
                  </div>
                  <div className="w-[200px]">
                    <Select
                      value={selectedIntensity}
                      options={fancy}
                      onChange={handleIntensityChange}
                      placeholder={'Intensity'}
                      styles={colourStyles}
                      isMulti
                      closeMenuOnSelect={false}
                    />
                  </div>
                  <div className="w-[200px]">
                    <Select
                      value={selectedOvertone}
                      options={fancy}
                      onChange={handleOvertoneChange}
                      placeholder={'Overtone'}
                      styles={colourStyles}
                      isMulti
                      closeMenuOnSelect={false}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        }
        accordionTrigger={'Color'}
        hasError={false}
      />
    </div>
  );
};
