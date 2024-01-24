import { AccordionComponent } from '@/components/v2/common/accordion';
import React from 'react';
import { IFormState } from '../interface/interface';
import { MinMaxInput } from '@/components/v2/common/min-max-input';

export const Carat = ({ state, setState }: IFormState) => {
  const { caratMax, caratMin } = state;
  const { setCaratMin, setCaratMax } = setState;

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
          <div>
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
            <div></div>
          </div>
        }
        accordionTrigger={'Carat'}
        hasError={false}
      />
    </div>
  );
};
