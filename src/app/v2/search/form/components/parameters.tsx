import { AccordionComponent } from '@/components/v2/common/accordion';
import { InputLabel } from '@/components/v2/common/input-label';
import { MinMaxInput } from '@/components/v2/common/min-max-input';
import React from 'react';
import { parameter } from '@/constants/v2/form';
import { handleNumericRange } from '../helpers/handle-input-range-validation';
import { Girdle } from './girdle';
import { Culet } from './culet';
export const Parameters = ({
  state,
  setState,
  errorSetState,
  errorState
}: any) => {
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
    setStarLengthMin,
    setSelectedCulet,
    setSelectedGirdle,
    setCrownAngleMax
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
    selectedGirdle,
    selectedCulet
  } = state;

  const {
    setTablePerError,
    setDepthPerError,
    setRatioError,
    setLengthError,
    setWidthError,
    setDepthError,
    setCrownAngleError,
    setCrownHeightError,
    setGirdlePerError,
    setPavilionAngleError,
    setPavilionHeightError,
    setLowerHalfError,
    setStarLengthError
  } = errorSetState;

  const {
    tablePerError,
    depthPerError,
    ratioError,
    lengthError,
    widthError,
    depthError,
    crownAngleError,
    crownHeightError,
    girdlePerError,
    pavilionAngleError,
    pavilionHeightError,
    lowerHalfError,
    starLengthError
  } = errorState;

  let parameters = [
    {
      label: 'Table (%)',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setTablePerMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setTablePerMin(event.target.value);
        }
      },
      minValue: tablePerMin,
      maxValue: tablePerMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
      errorSetState: setTablePerError,
      errorState: tablePerError
    },
    {
      label: 'Depth (%)',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setDepthPerMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setDepthPerMin(event.target.value);
        }
      },
      minValue: depthPerMin,
      maxValue: depthPerMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
      errorSetState: setDepthPerError,
      errorState: depthPerError
    },
    {
      label: 'Ratio',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setRatioMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setRatioMin(event.target.value);
        }
      },
      minValue: ratioMin,
      maxValue: ratioMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
      errorSetState: setRatioError,
      errorState: ratioError
    },
    {
      label: 'Length',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setLengthMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setLengthMin(event.target.value);
        }
      },
      minValue: lengthMin,
      maxValue: lengthMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
      errorSetState: setLengthError,
      errorState: lengthError
    },
    {
      label: 'Width',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setWidthMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setWidthMin(event.target.value);
        }
      },
      minValue: widthMin,
      maxValue: widthMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
      errorSetState: setWidthError,
      errorState: widthError
    },
    {
      label: 'Depth',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setDepthMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setDepthMin(event.target.value);
        }
      },
      minValue: depthMin,
      maxValue: depthMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
      errorSetState: setDepthError,
      errorState: depthError
    },
    {
      label: 'Crown Angle',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setCrownAngleMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setCrownAngleMin(event.target.value);
        }
      },
      minValue: crownAngleMin,
      maxValue: crownAngleMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '360',
      errorSetState: setCrownAngleError,
      errorState: crownAngleError
    },
    {
      label: 'Crown Height',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setCrownHeightMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setCrownHeightMin(event.target.value);
        }
      },
      minValue: crownHeightMin,
      maxValue: crownHeightMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
      errorSetState: setCrownHeightError,
      errorState: crownHeightError
    },
    {
      label: 'Girdle %',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setGirdlePerMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setGirdlePerMin(event.target.value);
        }
      },
      minValue: girdlePerMin,
      maxValue: girdlePerMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
      errorSetState: setGirdlePerError,
      errorState: girdlePerError
    },
    {
      label: 'Pavilion Angle',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setPavilionAngleMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setPavilionAngleMin(event.target.value);
        }
      },
      minValue: pavilionAngleMin,
      maxValue: pavilionAngleMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '360',
      errorSetState: setPavilionAngleError,
      errorState: pavilionAngleError
    },
    {
      label: 'Pavilion Height',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setPavilionHeightMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setPavilionHeightMin(event.target.value);
        }
      },
      minValue: pavilionHeightMin,
      maxValue: pavilionHeightMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
      errorSetState: setPavilionHeightError,
      errorState: pavilionHeightError
    },
    {
      label: 'Lower Half',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setLowerHalfMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setLowerHalfMin(event.target.value);
        }
      },
      minValue: lowerHalfMin,
      maxValue: lowerHalfMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
      errorSetState: setLowerHalfError,
      errorState: lowerHalfError
    },
    {
      label: 'Star Length',
      handleMaxChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setStarLengthMax(event.target.value);
        }
      },
      handleMinChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*\.?\d{0,2}$/.test(event.target.value)) {
          setStarLengthMin(event.target.value);
        }
      },
      minValue: starLengthMin,
      maxValue: starLengthMax,
      minPlaceHolder: '0',
      maxPlaceHolder: '100',
      errorSetState: setStarLengthError,
      errorState: starLengthError
    }
  ];

  // Map the parameterDataState to create an array of objects with additional data from advanceSearch
  const parameterData = parameters.map((parameters, index) => {
    return { ...parameters, ...parameter[index] };
  });
  let isErrorPersist = parameterData.some(error => error.errorState.length > 0);
  return (
    <div id="Parameters">
      <AccordionComponent
        value="Parameters"
        isDisable={false}
        accordionContent={
          <div className="flex flex-wrap gap-[24px] px-[16px] py-[24px]">
            <div className="flex flex-wrap gap-[24px]">
              {parameterData.map(
                ({
                  label,
                  maxValue,
                  minValue,
                  maxPlaceHolder,
                  minPlaceHolder,
                  handleMaxChange,
                  handleMinChange,
                  errorState,
                  errorSetState,
                  range
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
                          minOnchange: e => {
                            handleMinChange(e);
                            errorSetState &&
                              handleNumericRange({
                                min: e.target.value,
                                max: maxValue,
                                setErrorState: errorSetState,
                                rangeCondition: range
                              });
                          }
                        }}
                        maxInputData={{
                          maxValue: maxValue,
                          maxPlaceHolder: maxPlaceHolder,
                          maxOnchange: e => {
                            handleMaxChange(e);
                            errorSetState &&
                              handleNumericRange({
                                min: minValue,
                                max: e.target.value,
                                setErrorState: errorSetState,
                                rangeCondition: range
                              });
                          }
                        }}
                        inputGap="gap-[20px]"
                        errorText={errorState}
                      />
                    </div>
                  );
                }
              )}
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px] w-[100%]">
              <div className="flex flex-col gap-[8px]" id="Girdle">
                <InputLabel
                  label={'Girdle'}
                  htmlFor=""
                  styles="text-neutral900 text-sRegular font-regular"
                />
                <Girdle
                  selectedGirdle={selectedGirdle}
                  setSelectedGirdle={setSelectedGirdle}
                />
              </div>
              <div id="Culet" className="flex flex-col gap-[8px]">
                <InputLabel
                  label={'Culet'}
                  htmlFor=""
                  styles="text-neutral900 text-sRegular font-regular"
                />
                <Culet
                  selectedCulet={selectedCulet}
                  setSelectedCulet={setSelectedCulet}
                />
              </div>
            </div>
          </div>
        }
        accordionTrigger={'Parameters'}
        hasError={isErrorPersist}
      />
    </div>
  );
};
