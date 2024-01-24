import { AccordionComponent } from '@/components/v2/common/accordion';
import React, { Dispatch, SetStateAction } from 'react';
import { MinMaxInput } from '@/components/v2/common/min-max-input';
import element from '@public/v2/assets/icons/elements.svg';
import { IActionButtonDataItem } from '@/components/v2/common/action-button/exmple';
import ActionButton from '@/components/v2/common/action-button';

interface ICaratProps {
  caratMax: string;
  setCaratMax: Dispatch<SetStateAction<string>>;
  caratMin: string;
  setCaratMin: Dispatch<SetStateAction<string>>;
}

export const Carat = ({
  caratMax,
  caratMin,
  setCaratMin,
  setCaratMax
}: ICaratProps) => {
  let actionButtonData: IActionButtonDataItem[] = [
    {
      variant: 'secondary',
      svg: element,
      label: 'Add Carat',
      handler: () => {}
    }
  ];

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaratMax(event.target.value);
  };
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaratMin(event.target.value);
  };
  return (
    <div id="Carat">
      <AccordionComponent
        value="Carat"
        isDisable={true}
        accordionContent={
          <div className="flex items-center">
            <div>
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
                inputGap="gap-[121px]"
                errorText={''}
              />
            </div>
            <div>
              <ActionButton actionButtonData={actionButtonData} />
            </div>
          </div>
        }
        accordionTrigger={'Carat'}
        hasError={false}
      />
    </div>
  );
};
