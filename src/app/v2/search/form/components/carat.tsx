import { AccordionComponent } from '@/components/v2/common/accordion';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { MinMaxInput } from '@/components/v2/common/min-max-input';
import addCaratIcon from '@public/v2/assets/icons/add-carat.svg';
import CaratTile from '@/components/v2/common/carat-tile';
import { carat } from '@/constants/v2/form';
import styles from '../../../../../components/v2/common/action-button/action-button.module.scss';
import Image from 'next/image';
import { Button } from '@/components/v2/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/v2/ui/accordion';
import Tile from '@/components/v2/common/tile';
import { formatNumber } from '@/utils/fix-two-digit-number';

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
      setCaratError('');
      setCaratMax(event.target.value);
    }
  };
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
      setCaratError('');
      setCaratMin(event.target.value);
    }
  };

  const normalizeValue = (value: string) => {
    // Normalize user input like '3-3.99' to '3.00-3.99'
    const caratRange = value.split('-');

    if (caratRange[0] === '' && caratRange[1] === '') {
      setCaratError(
        `Please enter a range between ${formatNumber(
          carat.range.gte
        )} to ${formatNumber(carat.range.lte)} only`
      );
      return;
    } else if (caratRange[0] === '') {
      setCaratError(`"From" field cannot be empty`);
      return;
    } else if (caratRange[1] === '') {
      setCaratError(`"To" field cannot be empty`);
      return;
    } else if (
      Number(caratRange[0]) < carat.range.gte ||
      Number(caratRange[1]) > carat.range.lte
    ) {
      setCaratError(
        `Please enter a range between ${formatNumber(
          carat.range.gte
        )} to ${formatNumber(carat.range.lte)} only`
      );
      return;
    }

    if (Number(caratRange[0]) > Number(caratRange[1])) {
      setCaratError('“From” should be less than “To”');
      return;
    }

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

  const handleCaratRange = ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string[];
    setSelectedTile: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    const preDefineIndex = preDefineCarats.findIndex(item =>
      item.data.includes(data)
    );

    if (preDefineIndex !== -1) {
      const parentCategory = preDefineCarats[preDefineIndex].data[0];
      const subCategories = preDefineCarats[preDefineIndex].data.slice(1);

      if (subCategories.includes(data)) {
        const updatedTiles = selectedTile.includes(data)
          ? selectedTile.filter(tile => tile !== data)
          : [...selectedTile, data];

        if (
          !updatedTiles.includes(parentCategory) &&
          subCategories.every(subCat => updatedTiles.includes(subCat))
        ) {
          updatedTiles.push(parentCategory);
        } else if (
          updatedTiles.includes(parentCategory) &&
          !subCategories.every(subCat => updatedTiles.includes(subCat))
        ) {
          updatedTiles.splice(updatedTiles.indexOf(parentCategory), 1);
        }

        setSelectedTile(updatedTiles);

        const filterOutSpecificValues = (updatedTiles: string[]) => {
          const specificValues = ['1ct', '1.5ct', '2ct', '3ct', '4ct', '5ct+'];

          return updatedTiles.filter(tile => !specificValues.includes(tile));
        };

        setCaratRangeSelection(filterOutSpecificValues(updatedTiles));
      } else {
        let updatedTiles;

        if (selectedTile.includes(parentCategory)) {
          updatedTiles = selectedTile.filter(
            tile => ![parentCategory, ...subCategories].includes(tile)
          );
        } else {
          updatedTiles = [
            ...selectedTile.filter(tile => !subCategories.includes(tile)),
            parentCategory,
            ...subCategories
          ];
        }

        setSelectedTile(updatedTiles);

        const filterOutSpecificValues = (updatedTiles: string[]) => {
          const specificValues = ['1ct', '1.5ct', '2ct', '3ct', '4ct', '5ct+'];

          return updatedTiles.filter(tile => !specificValues.includes(tile));
        };

        setCaratRangeSelection(filterOutSpecificValues(updatedTiles));
      }
    }
  };

  let preDefineCarats = [
    {
      data: ['0.30-0.39'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: ['0.40-0.49'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: ['0.50-0.59'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: ['0.60-0.69'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: ['0.70-0.79'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: ['0.80-0.89'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: ['0.90-0.99'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: ['1ct', '1.00-1.19', '1.20-1.49'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: ['1.5ct', '1.50-1.69', '1.70-1.99'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: ['2ct', '2.00-2.49', '2.50-2.99'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: ['3ct', '3.00-3.49', '3.50-3.99'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: ['4ct', '4.00-4.49', '4.50-4.99'],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    },
    {
      data: [
        '5ct+',
        '5.00-5.49',
        '5.50-5.99',
        '6.00-6.99',
        '7.00-7.99',
        '8.00-9.99',
        '10.00-50.00'
      ],
      selected: caratRangeSelectionTemp,
      setSelected: setCaratRangeSelectionTemp,
      handleChange: handleCaratRange
    }
  ];

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
                      maxPlaceHolder: '50',
                      maxOnchange: e => {
                        handleMaxChange(e);
                      }
                    }}
                    inputGap="gap-[10px] !mb-[0px]"
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
                  <div className="flex justify-between">
                    {accordionValue.length > 0 ? (
                      ''
                    ) : (
                      <Tile
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
                        handleTileClick={handleCaratRange}
                      />
                    )}

                    <div className="absolute top-[6px] right-[0px]">
                      <AccordionTrigger
                        className={` ${styles.accordionTriggerStyle}`}
                      ></AccordionTrigger>
                    </div>
                  </div>
                  <AccordionContent
                    className={`flex flex-wrap gap-[8px]  ${styles.accordionSuccessStyle} ${styles.accordionContentStyle}`}
                  >
                    {preDefineCarats.map((preDefineCarat, index) => {
                      return (
                        <div key={index} className="">
                          <Tile
                            tileContainerStyle="flex-col  justify-center items-center "
                            tileStyle="w-[79px] !text-sMedium !p-0 !py-[8px]"
                            tileData={preDefineCarat.data}
                            selectedTile={preDefineCarat.selected}
                            setSelectedTile={preDefineCarat.setSelected}
                            handleTileClick={preDefineCarat.handleChange}
                          />
                        </div>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="h-[1vh] mt-1 text-dangerMain">
              {validationError ?? validationError}
            </div>
          </div>
        }
        accordionTrigger={'Carats'}
      />
    </div>
  );
};
