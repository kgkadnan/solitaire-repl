import { AccordionComponent } from '@/components/v2/common/accordion';
import { InputLabel } from '@/components/v2/common/input-label';
import { MinMaxInput } from '@/components/v2/common/min-max-input';
import React from 'react';

export const Parameters = ({ state, setState }: any) => {
  const {
    setTablePerMin,
    setTablePerMax,
    setDepthMin,
    setDepthMax,
    setCrownAngleMin,
    setLengthMax,
    setLengthMin,
    setPavilionHeightMax,
    setPavilionHeightMin,
    setDepthPerMax,
    setDepthPerMin,
    setCrownHeightMax,
    setCrownHeightMin,
    setWidthMax,
    setWidthMin,
    setLowerHalfMax,
    setLowerHalfMin,
    setRatioMax,
    setRatioMin,
    setGirdlePerMax,
    setGirdlePerMin,
    setPavilionAngleMax,
    setPavilionAngleMin,
    setStarLengthMax,
    setStarLengthMin
  } = setState;
  const {
    tablePerMin,
    tablePerMax,
    depthMin,
    depthMax,
    crownAngleMax,
    crownAngleMin,
    lengthMax,
    lengthMin,
    pavilionHeightMin,
    pavilionHeightMax,
    depthPerMax,
    depthPerMin,
    crownHeightMax,
    crownHeightMin,
    widthMax,
    widthMin,
    lowerHalfMax,
    lowerHalfMin,
    ratioMax,
    ratioMin,
    girdlePerMax,
    girdlePerMin,
    pavilionAngleMax,
    pavilionAngleMin,
    starLengthMax,
    starLengthMin,
    setCrownAngleMax
  } = state;

  let parameters = [
    {
      label: 'Table (%)',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setTablePerMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setTablePerMin(event.target.value);
      },
      minValue: tablePerMin,
      maxValue: tablePerMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100'
    },
    {
      label: 'Depth (%)',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDepthPerMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDepthPerMin(event.target.value);
      },
      minValue: depthPerMin,
      maxValue: depthPerMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100'
    },
    {
      label: 'Ratio',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setRatioMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setRatioMin(event.target.value);
      },
      minValue: ratioMin,
      maxValue: ratioMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100'
    },
    {
      label: 'Length',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setLengthMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setLengthMin(event.target.value);
      },
      minValue: lengthMin,
      maxValue: lengthMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100'
    },
    {
      label: 'Width',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setWidthMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setWidthMin(event.target.value);
      },
      minValue: widthMin,
      maxValue: widthMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100'
    },
    {
      label: 'Depth',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDepthMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setDepthMin(event.target.value);
      },
      minValue: depthMin,
      maxValue: depthMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100'
    },
    {
      label: 'Crown Angle',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setCrownAngleMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setCrownAngleMin(event.target.value);
      },
      minValue: crownAngleMin,
      maxValue: crownAngleMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '360'
    },
    {
      label: 'Crown Height',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setCrownHeightMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setCrownHeightMin(event.target.value);
      },
      minValue: crownHeightMin,
      maxValue: crownHeightMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100'
    },
    {
      label: 'Girdle %',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setGirdlePerMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setGirdlePerMin(event.target.value);
      },
      minValue: girdlePerMin,
      maxValue: girdlePerMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100'
    },
    {
      label: 'Pavilion Angle',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPavilionAngleMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPavilionAngleMin(event.target.value);
      },
      minValue: pavilionAngleMin,
      maxValue: pavilionAngleMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '360'
    },
    {
      label: 'Pavilion Height',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPavilionHeightMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setPavilionHeightMin(event.target.value);
      },
      minValue: pavilionHeightMin,
      maxValue: pavilionHeightMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100'
    },
    {
      label: 'Lower Half',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setLowerHalfMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setLowerHalfMin(event.target.value);
      },
      minValue: lowerHalfMin,
      maxValue: lowerHalfMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100'
    },
    {
      label: 'Star Length',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setStarLengthMax(event.target.value);
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setStarLengthMin(event.target.value);
      },
      minValue: starLengthMin,
      maxValue: starLengthMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100'
    }
  ];

  return (
    <div id="Parameters">
      <AccordionComponent
        value="Parameters"
        isDisable={false}
        accordionContent={
          <div className="flex flex-wrap gap-[30px] px-[16px] py-[24px]">
            {parameters.map(
              ({
                label,
                maxValue,
                minValue,
                maxPlaceHolder,
                minPlaceHolder,
                handleMaxChange,
                handleMinChange
              }) => {
                return (
                  <div key={label} className="flex flex-col gap-[8px]">
                    <InputLabel
                      label={label}
                      htmlFor=""
                      styles="text-neutral900 text-sRegular font-regular"
                    />
                    <MinMaxInput
                      minInputData={{
                        minValue: minValue,
                        minPlaceHolder: minPlaceHolder,
                        minOnchange: handleMinChange
                      }}
                      maxInputData={{
                        maxValue: maxValue,
                        maxPlaceHolder: maxPlaceHolder,
                        maxOnchange: handleMaxChange
                      }}
                      inputGap="gap-[20px]"
                      errorText={''}
                    />
                  </div>
                );
              }
            )}
          </div>
        }
        accordionTrigger={'Parameters'}
        hasError={false}
      />
    </div>
  );
};
