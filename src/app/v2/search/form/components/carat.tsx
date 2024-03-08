import { AccordionComponent } from '@/components/v2/common/accordion';
import React, { Dispatch, SetStateAction } from 'react';
import { MinMaxInput } from '@/components/v2/common/min-max-input';
import element from '@public/v2/assets/icons/elements.svg';
import CaratTile from '@/components/v2/common/carat-tile';
import { handleNumericRange } from '../helpers/handle-input-range-validation';
import { carat } from '@/constants/v2/form';
import { Button } from '@/components/ui/button';
import styles from '../../../../../components/v2/common/action-button/action-button.module.scss';
import Image from 'next/image';

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
  validationError: string;
  setValidationError: Dispatch<SetStateAction<string>>;
}

export const Carat = ({
  caratMax,
  caratMin,
  setCaratMin,
  setCaratMax,
  selectedCaratRange,
  setSelectedCaratRange,
  caratError,
  setCaratError,
  setValidationError,
  validationError
}: ICaratProps) => {
  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
      setCaratMax(event.target.value);
    }
  };
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
      setCaratMin(event.target.value);
    }
  };

  const normalizeValue = (value: string) => {
    // Normalize user input like '3-3.99' to '3.00-3.99'
    const caratRange = value.split('-');
    if (caratRange[0] === '' || caratRange[1] === '') {
      setCaratError(`Please enter a valid carat range.`);
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

    if (!caratError.length && validatedData) {
      if (selectedcaratTile.length < 5) {
        setValidationError('');
        if (!selectedcaratTile.includes(validatedData)) {
          setSelectedcaratTile([...selectedcaratTile, validatedData]);
        }
        setCaratMax('');
        setCaratMin('');
      } else {
        setValidationError('Max 5 carats ranges can be added');
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
      setValidationError('');
    }
  };

  return (
    <div id="Carats">
      <AccordionComponent
        value="Carats"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[24px]">
            {' '}
            <div className="flex justify-between">
              <div className="">
                <MinMaxInput
                  minInputData={{
                    minValue: caratMin,
                    minPlaceHolder: '0',
                    minOnchange: e => {
                      handleMinChange(e);
                      handleNumericRange({
                        min: e.target.value,
                        max: caratMax,
                        setErrorState: setCaratError,
                        rangeCondition: carat.range
                      });
                    }
                  }}
                  maxInputData={{
                    maxValue: caratMax,
                    maxPlaceHolder: '30',
                    maxOnchange: e => {
                      handleMaxChange(e);
                      handleNumericRange({
                        min: caratMin,
                        max: e.target.value,
                        setErrorState: setCaratError,
                        rangeCondition: carat.range
                      });
                    }
                  }}
                  inputGap="gap-[10px]"
                  errorText={caratError}
                />
              </div>
              <div className="">
                <Button
                  onClick={() =>
                    handleAddCarat({
                      data: `${caratMin}-${caratMax}`,
                      selectedcaratTile: selectedCaratRange,
                      setSelectedcaratTile: setSelectedCaratRange
                    })
                  }
                  variant={'secondary'}
                  className={`${styles.ctaStyle} 
               
             ${styles.ctaSecondaryStyle}  'px-4 py-2 flex gap-1' `}
                >
                  <div className="pl-[16px]">
                    <Image src={element} alt={'icon-button'} />
                  </div>
                  <div
                    className={`${styles.ctaLabel} px-[4px] pr-[16px] pl-[8px]`}
                  >
                    Add Carats
                  </div>
                </Button>
              </div>
            </div>
            <CaratTile
              caratTileData={selectedCaratRange}
              handlecaratTileClick={handleCloseCarat}
              selectedcaratTile={selectedCaratRange}
              setSelectedcaratTile={setSelectedCaratRange}
            />
            <div className="h-[1vh] text-dangerMain">
              {validationError ?? validationError}
            </div>
          </div>
        }
        accordionTrigger={'Carats'}
      />
    </div>
  );
};
