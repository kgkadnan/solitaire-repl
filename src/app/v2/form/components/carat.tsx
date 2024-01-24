import { AccordionComponent } from '@/components/v2/common/accordion';
import React, { Dispatch, SetStateAction } from 'react';
import { MinMaxInput } from '@/components/v2/common/min-max-input';
import element from '@public/v2/assets/icons/elements.svg';
import { IActionButtonDataItem } from '@/components/v2/common/action-button/exmple';
import ActionButton from '@/components/v2/common/action-button';
import CaratTile from '@/components/v2/common/carat-tile';

// export const Carat = ({
//   state,
//   setState,
//   errorState,
//   errorSetState
// }: IFormState) => {
//   const { caratMax, caratMin, selectedCaratRange } = state;
//   const { setCaratMin, setCaratMax, setSelectedCaratRange } = setState;
//   const { caratError } = errorState;
//   const { setCaratError } = errorSetState;
interface ICaratProps {
  caratMax: string;
  setCaratMax: Dispatch<SetStateAction<string>>;
  caratMin: string;
  setCaratMin: Dispatch<SetStateAction<string>>;
  selectedCaratRange: string[];
  setSelectedCaratRange: Dispatch<SetStateAction<string[]>>;
  caratError: string;
  setCaratError: Dispatch<SetStateAction<string>>;
}

export const Carat = ({
  caratMax,
  caratMin,
  setCaratMin,
  setCaratMax,
  selectedCaratRange,
  setSelectedCaratRange,
  caratError,
  setCaratError
}: ICaratProps) => {
  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaratMax(event.target.value);
  };
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaratMin(event.target.value);
  };

  const normalizeValue = (value: string) => {
    // Normalize user input like '3-3.99' to '3.00-3.99'
    const caratRange = value.split('-');
    if (caratRange[0] === '' || caratRange[1] === '') {
      setCaratError(`Please enter a valid carat range.`);
      return;
    } else if (caratRange[0] === '0' || caratRange[1] === '0') {
      setCaratError('Please enter value between “0.10 to 50”');
      return;
    } else if (caratRange[0] > caratRange[1]) {
      setCaratError(
        `Carat range cannot be ${caratRange[0]} to ${caratRange[1]}. Please enter a valid carat range.`
      );
      return;
    } else if (caratRange.length === 2) {
      const caratFrom = parseFloat(caratRange[0]).toFixed(2);
      const caratTo = parseFloat(caratRange[1]).toFixed(2);
      return `${caratFrom}-${caratTo}`;
    }
    return value;
  };

  // Function to handle adding carat range
  const handleAddCarat = ({
    data,
    selectedcaratTile,
    setSelectedcaratTile
  }: {
    data: string;
    selectedcaratTile: string[];
    setSelectedcaratTile: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    const validatedData = normalizeValue(data);

    if (validatedData) {
      if (selectedcaratTile.length < 5) {
        setCaratError('');
        if (!selectedcaratTile.includes(validatedData)) {
          setSelectedcaratTile([...selectedcaratTile, validatedData]);
        }
        setCaratMax('');
        setCaratMin('');
      } else {
        setCaratError('Max upto 5 carat can be added');
      }
    }
  };

  const handleCloseCarat = ({
    data,
    selectedcaratTile,
    setSelectedcaratTile
  }: {
    data: string;
    selectedcaratTile: string[];
    setSelectedcaratTile: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    if (selectedcaratTile.includes(data)) {
      setSelectedcaratTile(prevSelectedTile =>
        prevSelectedTile.filter(selected => selected !== data)
      );
    }
  };

  let actionButtonData: IActionButtonDataItem[] = [
    {
      variant: 'secondary',
      svg: element,
      label: 'Add Carat',
      handler: () =>
        handleAddCarat({
          data: `${caratMin}-${caratMax}`,
          selectedcaratTile: selectedCaratRange,
          setSelectedcaratTile: setSelectedCaratRange
        })
    }
  ];

  return (
    <div id="Carat">
      <AccordionComponent
        value="Carat"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[24px]">
            {' '}
            <div className="flex justify-between">
              <div className="">
                <MinMaxInput
                  minInputData={{
                    minValue: caratMin,
                    minPlaceHolder: '0.60',
                    minOnchange: handleMinChange
                  }}
                  maxInputData={{
                    maxValue: caratMax,
                    maxPlaceHolder: '3.80',
                    maxOnchange: handleMaxChange
                  }}
                  inputGap="gap-[10px]"
                  errorText={caratError}
                />
              </div>
              <div className="">
                <ActionButton actionButtonData={actionButtonData} />
              </div>
            </div>
            <CaratTile
              caratTileData={selectedCaratRange}
              handlecaratTileClick={handleCloseCarat}
              selectedcaratTile={selectedCaratRange}
              setSelectedcaratTile={setSelectedCaratRange}
            />
          </div>
        }
        accordionTrigger={'Carat'}
      />
    </div>
  );
};
