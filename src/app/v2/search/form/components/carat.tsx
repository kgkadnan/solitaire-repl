import { AccordionComponent } from '@/components/v2/common/accordion';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { MinMaxInput } from '@/components/v2/common/min-max-input';
import addCaratIcon from '@public/v2/assets/icons/add-carat.svg';
import CaratTile from '@/components/v2/common/carat-tile';
import { carat, preDefineCarats } from '@/constants/v2/form';
import styles from '../../../../../components/v2/common/action-button/action-button.module.scss';
import Image from 'next/image';
import { Button } from '@/components/v2/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  CustomAccordionTrigger
} from '@/components/v2/ui/accordion';
import Tile from '@/components/v2/common/tile';
import { formatNumber } from '@/utils/fix-two-digit-number';
import { handleCaratRange } from '../helpers/handle-carat-range';

interface ICaratProps {
  caratMax: string;
  setCaratMax: Dispatch<SetStateAction<string>>;
  caratMin: string;
  setCaratMin: Dispatch<SetStateAction<string>>;
  selectedCaratRange: string[];
  setSelectedCaratRange: Dispatch<SetStateAction<string[]>>;
  caratRangeSelectionTemp: string[];
  setCaratRangeSelectionTemp: Dispatch<SetStateAction<string[]>>;
  setCaratRangeSelection: Dispatch<SetStateAction<string[]>>;
  caratRangeSelection: string[];
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
  caratRangeSelectionTemp,
  setCaratRangeSelectionTemp,
  setCaratRangeSelection,
  caratError,
  setCaratError,
  setValidationError,
  validationError
}: ICaratProps) => {
  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
      setValidationError('');
      setCaratMax(event.target.value);
    }
  };
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
      setValidationError('');
      setCaratMin(event.target.value);
    }
  };

  const normalizeValue = (value: string) => {
    // Normalize user input like '3-3.99' to '3.00-3.99'
    const caratRange = value.split('-');

    if (caratRange[0] === '' && caratRange[1] === '') {
      setValidationError(
        `Please enter a range between ${formatNumber(
          carat.range.gte
        )} to ${formatNumber(carat.range.lte)} only`
      );
      return;
    } else if (caratRange[0] === '') {
      setValidationError(`"From" field cannot be empty`);
      return;
    } else if (caratRange[1] === '') {
      setValidationError(`"To" field cannot be empty`);
      return;
    } else if (
      Number(caratRange[0]) < carat.range.gte ||
      Number(caratRange[1]) > carat.range.lte
    ) {
      setValidationError(
        `Please enter a range between ${formatNumber(
          carat.range.gte
        )} to ${formatNumber(carat.range.lte)} only`
      );
      return;
    }

    if (Number(caratRange[0]) > Number(caratRange[1])) {
      setValidationError('“From” should be less than “To”');
      return;
    }

    if (caratRange[0] === '' || caratRange[1] === '') {
      setValidationError(`Please enter a valid carat range.`);
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
      setValidationError('');
      if (!selectedcaratTile.includes(validatedData)) {
        setSelectedcaratTile([...selectedcaratTile, validatedData]);
      }
      setCaratMax('');
      setCaratMin('');
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

  const [accordionValue, setAccordionValue] = useState('');

  return (
    <div id="Carats">
      <AccordionComponent
        value="Carats"
        isDisable={true}
        accordionContent={
          <div className="px-[16px] py-[24px]">
            {' '}
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px]">
              <div className="flex justify-between h-[60px]">
                <div className="">
                  <MinMaxInput
                    minInputData={{
                      minValue: caratMin,
                      minPlaceHolder: '0.15',
                      minOnchange: e => {
                        handleMinChange(e);
                      }
                    }}
                    maxInputData={{
                      maxValue: caratMax,
                      maxPlaceHolder: '50.00',
                      maxOnchange: e => {
                        handleMaxChange(e);
                      }
                    }}
                    inputGap="gap-[10px] !mb-[0px]"
                    errorText={validationError}
                    isShowError={false}
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
                      <Image src={addCaratIcon} alt={'add carat icon button'} />
                    </div>
                    <div
                      className={`${styles.ctaLabel} px-[4px] pr-[16px] pl-[8px]`}
                    >
                      Add Carats
                    </div>
                  </Button>
                </div>
              </div>
              <div className="min-h-[40px] mb-[10px]">
                <CaratTile
                  caratTileData={selectedCaratRange}
                  handlecaratTileClick={handleCloseCarat}
                  selectedcaratTile={selectedCaratRange}
                  setSelectedcaratTile={setSelectedCaratRange}
                />
              </div>
            </div>
            <div className="relative">
              <Accordion
                type="single"
                className="w-[100%]"
                collapsible
                onValueChange={items => {
                  setAccordionValue(items);
                }}
                value={accordionValue}
              >
                <AccordionItem value={'Carats'}>
                  <div className="flex relative w-full">
                    <div className="w-[84%]">
                      {accordionValue.length > 0 ? (
                        ''
                      ) : (
                        <Tile
                          tileContainerStyle=""
                          tileStyle="w-[79px] !text-sMedium !p-0 !py-[8px]"
                          tileData={[
                            '0.30-0.39',
                            '0.40-0.49',
                            '0.50-0.59',
                            '0.60-0.69',
                            '0.70-0.79',
                            '0.80-0.89',
                            '0.90-0.99',
                            '1ct',
                            '1.5ct',
                            '2ct',
                            '3ct',
                            '4ct',
                            '5ct+'
                          ]}
                          selectedTile={caratRangeSelectionTemp}
                          setSelectedTile={setCaratRangeSelectionTemp}
                          handleTileClick={({
                            data,
                            selectedTile,
                            setSelectedTile
                          }) => {
                            handleCaratRange({
                              data,
                              selectedTile,
                              setSelectedTile,
                              preDefineCarats,
                              setCaratRangeSelection
                            });
                          }}
                        />
                      )}
                    </div>

                    <div className="absolute top-[0px] right-[92px]">
                      <CustomAccordionTrigger
                        value={accordionValue}
                        className={` ${styles.accordionTriggerStyle}`}
                      ></CustomAccordionTrigger>
                    </div>
                  </div>
                  <AccordionContent
                    className={`flex flex-wrap gap-[8px] w-[84%]  ${styles.accordionSuccessStyle} ${styles.accordionContentStyle}`}
                  >
                    {preDefineCarats.map((preDefineCarat, index) => {
                      return (
                        <div key={index} className="">
                          <Tile
                            tileContainerStyle="flex-col   justify-center items-center "
                            tileStyle="w-[79px] !text-sMedium !p-0 !py-[8px]"
                            tileData={preDefineCarat.data}
                            selectedTile={caratRangeSelectionTemp}
                            setSelectedTile={setCaratRangeSelectionTemp}
                            handleTileClick={({
                              data,
                              selectedTile,
                              setSelectedTile
                            }) => {
                              handleCaratRange({
                                data,
                                selectedTile,
                                setSelectedTile,
                                preDefineCarats,
                                setCaratRangeSelection
                              });
                            }}
                          />
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            {/* <div className="h-[1vh] mt-1 text-dangerMain">
              {validationError ?? validationError}
            </div> */}
          </div>
        }
        accordionTrigger={'Carats'}
      />
    </div>
  );
};
