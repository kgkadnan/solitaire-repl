import React from 'react';
import Select, { InputActionMeta } from 'react-select';
import { savedSearchDropDownStyle } from './styles';
import cross from '@public/v2/assets/icons/data-table/cross.svg';
import searchIcon from '@public/v2/assets/icons/save-search-dropdown/Essentials.svg';
import Image from 'next/image';

interface ISavedSearchDropDownProps {
  handleClose: () => void;
  isOpen: boolean;
  options: any;
  onDropDownClick: any;
}

const SavedSearchDropDown = ({
  handleClose,
  isOpen,
  options,
  onDropDownClick
}: ISavedSearchDropDownProps) => {
  const computeDropdownFieldFromJson = (fieldData: any) => {
    return fieldData.map((data: any) => {
      return { value: data.name, label: data.name };
    });
  };
  const onInputChange = (
    inputValue: string,
    { action, prevInputValue }: InputActionMeta
  ) => {
    if (action === 'input-change') return inputValue;

    return prevInputValue;
  };

  return (
    <>
      {isOpen && (
        <div className="flex flex-col border-[1px] border-solid border-neutral200 bg-neutral0 h-auto min-h-[410px] w-[345px] rounded-[8px] p-[24px] gap-[16px] absolute top-[45px] right-[193px] z-[3]">
          <div className="flex justify-between">
            <h1 className="text-headingS font-medium text-neutral900">
              Saved Search list
            </h1>
            <button onClick={handleClose}>
              <Image src={cross} alt="cross" />
            </button>
          </div>
          <div className="relative" style={{ overflow: 'visible' }}>
            <Image
              src={searchIcon}
              alt="searchIcon"
              className="absolute top-[7px] left-[10px] z-[1]"
            />
            <Select
              onChange={onDropDownClick}
              options={computeDropdownFieldFromJson(options)}
              styles={savedSearchDropDownStyle}
              menuIsOpen={true}
              placeholder={'Search by Saved Filter Parameter'}
              onInputChange={onInputChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SavedSearchDropDown;
