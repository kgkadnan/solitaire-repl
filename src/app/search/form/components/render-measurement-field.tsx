import { CustomInputlabel } from '@/components/common/input-label';
import React, { Dispatch, SetStateAction } from 'react';
import styles from '../form.module.scss';
import { CustomInputField } from '@/components/common/input-field';
import advanceSearch from '@/constants/advance-search.json';
import Select from 'react-select';
import { colourStyles } from '../helpers/select-colour-style';
import { handleNumericRange } from '../helpers/handle-input-range-validation';
// Define interfaces for the component props
interface IRange {
  gte: number;
  lte: number;
}
interface IRenderMeasurementData {
  parameterState: string[];
  setParameterState: Dispatch<SetStateAction<string>>[];
  label: string;
  range: IRange;
  errorSetState?: Dispatch<SetStateAction<string>>;
  errorState?: string;
}
const renderMeasurementField = (
  state: any,
  setState: any,
  errorState: any,
  errorSetState: any
) => {
  // Destructure state variables
  const {
    tablePerFrom,
    tablePerTo,
    depthTo,
    depthFrom,
    crownAngleFrom,
    crownAngleTo,
    lengthFrom,
    lengthTo,
    pavilionDepthFrom,
    pavilionDepthTo,
    depthPerFrom,
    depthPerTo,
    crownHeightFrom,
    crownHeightTo,
    widthFrom,
    widthTo,
    lowerHalfFrom,
    lowerHalfTo,
    ratioFrom,
    ratioTo,
    girdlePerFrom,
    girdlePerTo,
    pavilionAngleFrom,
    pavilionAngleTo,
    starLengthFrom,
    starLengthTo,
    girdleFrom,
    girdleTo
  } = state;

  const {
    setTablePerFrom,
    setTablePerTo,
    setDepthTo,
    setDepthFrom,
    setCrownAngleFrom,
    setCrownAngleTo,
    setLengthFrom,
    setLengthTo,
    setPavilionDepthFrom,
    setPavilionDepthTo,
    setDepthPerFrom,
    setDepthPerTo,
    setCrownHeightFrom,
    setCrownHeightTo,
    setWidthFrom,
    setWidthTo,
    setLowerHalfFrom,
    setLowerHalfTo,
    setRatioFrom,
    setRatioTo,
    setGirdlePerFrom,
    setGirdlePerTo,
    setPavilionAngleFrom,
    setPavilionAngleTo,
    setStarLengthFrom,
    setStarLengthTo,
    setGirdleFrom,
    setGirdleTo,

    setSelectedCulet
  } = setState;

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

  // Define an array of objects representing measurement parameters and their state management functions
  const parameterDataState = [
    {
      parameterState: [tablePerFrom, tablePerTo],
      setParameterState: [setTablePerFrom, setTablePerTo],
      errorSetState: setTablePerError,
      errorState: tablePerError
    },
    {
      parameterState: [depthPerFrom, depthPerTo],
      setParameterState: [setDepthPerFrom, setDepthPerTo],
      errorSetState: setDepthPerError,
      errorState: depthPerError
    },
    {
      parameterState: [ratioFrom, ratioTo],
      setParameterState: [setRatioFrom, setRatioTo],
      errorSetState: setRatioError,
      errorState: ratioError
    },
    {
      parameterState: [lengthFrom, lengthTo],
      setParameterState: [setLengthFrom, setLengthTo],
      errorSetState: setLengthError,
      errorState: lengthError
    },
    {
      parameterState: [widthFrom, widthTo],
      setParameterState: [setWidthFrom, setWidthTo],
      errorSetState: setWidthError,
      errorState: widthError
    },
    {
      parameterState: [depthFrom, depthTo],
      setParameterState: [setDepthFrom, setDepthTo],
      errorSetState: setDepthError,
      errorState: depthError
    },
    {
      parameterState: [crownAngleFrom, crownAngleTo],
      setParameterState: [setCrownAngleFrom, setCrownAngleTo],
      errorSetState: setCrownAngleError,
      errorState: crownAngleError
    },
    {
      parameterState: [crownHeightFrom, crownHeightTo],
      setParameterState: [setCrownHeightFrom, setCrownHeightTo],
      errorSetState: setCrownHeightError,
      errorState: crownHeightError
    },
    {
      parameterState: [girdlePerFrom, girdlePerTo],
      setParameterState: [setGirdlePerFrom, setGirdlePerTo],
      errorSetState: setGirdlePerError,
      errorState: girdlePerError
    },
    {
      parameterState: [pavilionAngleFrom, pavilionAngleTo],
      setParameterState: [setPavilionAngleFrom, setPavilionAngleTo],
      errorSetState: setPavilionAngleError,
      errorState: pavilionAngleError
    },
    {
      parameterState: [pavilionDepthFrom, pavilionDepthTo],
      setParameterState: [setPavilionDepthFrom, setPavilionDepthTo],
      errorSetState: setPavilionHeightError,
      errorState: pavilionHeightError
    },
    {
      parameterState: [lowerHalfFrom, lowerHalfTo],
      setParameterState: [setLowerHalfFrom, setLowerHalfTo],
      errorSetState: setLowerHalfError,
      errorState: lowerHalfError
    },
    {
      parameterState: [starLengthFrom, starLengthTo],
      setParameterState: [setStarLengthFrom, setStarLengthTo],
      errorSetState: setStarLengthError,
      errorState: starLengthError
    }
  ];

  // Map the parameterDataState to create an array of objects with additional data from advanceSearch
  const parameterData = parameterDataState.map((parameter, index) => {
    return { ...parameter, ...advanceSearch.parameter[index] };
  });

  // Function to handle filter changes and culet selection based on user input
  const handleCuletChange = (data: any) => {
    setSelectedCulet(data.value);
  };

  const culetField = () => {
    return (
      <div className={`${styles.parameterContainer} pt-6`}>
        <Select
          options={computeDropdownField(advanceSearch.culet)}
          onChange={handleCuletChange}
          placeholder={'Culet'}
          styles={colourStyles}
        />
      </div>
    );
  };

  const computeDropdownField = (fieldData: string[]) => {
    return fieldData.map(data => {
      return { value: data, label: data };
    });
  };

  const handleGirdleFrom = (data: any) => {
    setGirdleFrom(data.value);
  };
  const handleGirdleTo = (data: any) => {
    setGirdleTo(data.value);
  };

  const girdle = () => {
    return (
      <div className={styles.parameterContainer}>
        <CustomInputlabel
          htmlfor="text"
          label={'Girdle'}
          overriddenStyles={{ label: styles.labelPlainColor }}
        />
        <div className={`${styles.filterSectio}  ${styles.parameterFilter}`}>
          <Select
            options={computeDropdownField(advanceSearch.girdle)}
            onChange={handleGirdleFrom}
            styles={colourStyles}
          />
          <div className={styles.parameterLabel}>to</div>
          <Select
            options={computeDropdownField(advanceSearch.girdle)}
            onChange={handleGirdleTo}
            styles={colourStyles}
          />
        </div>
      </div>
    );
  };

  const measurementFields = () => {
    return parameterData.map((parameter: IRenderMeasurementData) => (
      <div key={parameter.label} className={styles.parameterContainer}>
        <CustomInputlabel
          htmlfor="text"
          label={parameter.label}
          overriddenStyles={{ label: styles.labelPlainColor }}
        />
        <div className={`${styles.filterSection}  ${styles.parameterFilter}`}>
          <CustomInputField
            type="number"
            name={`${parameter.parameterState[0]}`}
            onChange={e => {
              parameter.setParameterState[0](e.target.value);
              errorSetState &&
                handleNumericRange({
                  from: e.target.value,
                  to: parameter.parameterState[1],
                  setErrorState: parameter?.errorSetState!,
                  rangeCondition: parameter.range
                });
            }}
            value={parameter.parameterState[0]}
            style={{
              input: styles.inputFieldStyles
            }}
          />
          <div className={styles.parameterLabel}>to</div>
          <CustomInputField
            type="number"
            name={`${parameter.parameterState[1]}`}
            onChange={e => {
              parameter.setParameterState[1](e.target.value);
              errorSetState &&
                handleNumericRange({
                  from: parameter.parameterState[0],
                  to: e.target.value,
                  setErrorState: parameter?.errorSetState!,
                  rangeCondition: parameter.range
                });
            }}
            value={parameter.parameterState[1]}
            style={{
              input: styles.inputFieldStyles
            }}
          />
        </div>
        {parameter.errorState && (
          <div className={styles.validationMessage}>{parameter.errorState}</div>
        )}
      </div>
    ));
  };

  return (
    <>
      {measurementFields()}
      {girdle()}
      {culetField()}
    </>
  );
};
export default renderMeasurementField;
