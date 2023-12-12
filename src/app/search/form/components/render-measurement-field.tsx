import { CustomInputlabel } from '@/components/common/input-label';
import React, { Dispatch, SetStateAction } from 'react';
import styles from '../form.module.scss';
import { CustomInputField } from '@/components/common/input-field';
import advanceSearch from '@/constants/advance-search.json';

// Define interfaces for the component props
interface IRange {
  start: number;
  end: number;
}
interface IRenderMeasurementData {
  parameterState: string[];
  setParameterState: Dispatch<SetStateAction<string>>[];
  label: string;
  range: IRange;
}
const renderMeasurementField = (state: any, setState: any) => {
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
    setGirdleTo
  } = setState;

  // Define an array of objects representing measurement parameters and their state management functions
  const parameterDataState = [
    {
      parameterState: [tablePerFrom, tablePerTo],
      setParameterState: [setTablePerFrom, setTablePerTo]
    },
    {
      parameterState: [depthPerFrom, depthPerTo],
      setParameterState: [setDepthPerFrom, setDepthPerTo]
    },
    {
      parameterState: [ratioFrom, ratioTo],
      setParameterState: [setRatioFrom, setRatioTo]
    },
    {
      parameterState: [lengthFrom, lengthTo],
      setParameterState: [setLengthFrom, setLengthTo]
    },
    {
      parameterState: [widthFrom, widthTo],
      setParameterState: [setWidthFrom, setWidthTo]
    },
    {
      parameterState: [depthFrom, depthTo],
      setParameterState: [setDepthFrom, setDepthTo]
    },
    {
      parameterState: [crownAngleFrom, crownAngleTo],
      setParameterState: [setCrownAngleFrom, setCrownAngleTo]
    },
    {
      parameterState: [crownHeightFrom, crownHeightTo],
      setParameterState: [setCrownHeightFrom, setCrownHeightTo]
    },
    {
      parameterState: [girdlePerFrom, girdlePerTo],
      setParameterState: [setGirdlePerFrom, setGirdlePerTo]
    },
    {
      parameterState: [pavilionAngleFrom, pavilionAngleTo],
      setParameterState: [setPavilionAngleFrom, setPavilionAngleTo]
    },
    {
      parameterState: [pavilionDepthFrom, pavilionDepthTo],
      setParameterState: [setPavilionDepthFrom, setPavilionDepthTo]
    },
    {
      parameterState: [lowerHalfFrom, lowerHalfTo],
      setParameterState: [setLowerHalfFrom, setLowerHalfTo]
    },
    {
      parameterState: [starLengthFrom, starLengthTo],
      setParameterState: [setStarLengthFrom, setStarLengthTo]
    },
    {
      parameterState: [girdleFrom, girdleTo],
      setParameterState: [setGirdleFrom, setGirdleTo]
    }
  ];

  // Map the parameterDataState to create an array of objects with additional data from advanceSearch
  const parameterData = parameterDataState.map((parameter, index) => {
    return { ...parameter, ...advanceSearch.parameter[index] };
  });

  // Initialize error state
  const initialErrorState = {
    key: '',
    value: ''
  };

  // Initialize variables for angle input validation
  const fromError = '';
  const setFromError = '';
  const fromAngle = '';
  const setFromAngle = '';
  const toAngle = '';
  const setToAngle = '';

  // Define a function to handle angle input validation
  const handleAngle = (
    key: string,
    value: string,
    setAngle: any,
    setError: any,
    otherValue: any
  ) => {
    const error = validateAngle(value, 0, 360);

    if (
      value.length > 0 &&
      otherValue !== '' &&
      value !== '' &&
      parseInt(value) < parseInt(otherValue)
    ) {
      setError({ key, value: 'Please enter a valid range from 0 to 360' });
    } else {
      setError(initialErrorState);
    }
    setAngle(value);
    if (error) {
      setError({ key, value: error });
    }
  };

  // Define a function for validating angle input
  function validateAngle(value: string, min: number, max: number) {
    const numValue = parseInt(value);

    if (
      value.length > 0 &&
      (value === '' || numValue < min || numValue > max)
    ) {
      return 'Please enter a valid range from 0 to 100';
    }
    return '';
  }

  return parameterData.map((parameter: IRenderMeasurementData) => (
    <div
      key={parameter.label}
      className={styles.parameterContainer}
      style={{ paddingLeft: '10px' }}
    >
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
          }}
          value={parameter.parameterState[0]}
          style={{
            input: styles.inputFieldStyles
          }}
          onBlur={e =>
            parameter.label === 'Crown Angle' ||
            parameter.label === 'Pavilion Angle'
              ? handleAngle(
                  parameter.label,
                  e.target.value,
                  setFromAngle,
                  setFromError,
                  toAngle
                )
              : ''
          }
        />
        <div className={styles.parameterLabel}>to</div>
        <CustomInputField
          type="number"
          name={`${parameter.parameterState[1]}`}
          onChange={e => {
            parameter.setParameterState[1](e.target.value);
          }}
          value={parameter.parameterState[1]}
          style={{
            input: styles.inputFieldStyles
          }}
          onBlur={e =>
            parameter.label === 'Crown Angle' ||
            parameter.label === 'Pavilion Angle'
              ? handleAngle(
                  parameter.label,
                  e.target.value,
                  setToAngle,
                  setFromError,
                  fromAngle
                )
              : ''
          }
        />
      </div>
      {fromError === parameter.label && (
        <div className={styles.validationMessage}>{fromError}</div>
      )}
    </div>
  ));
};

export default renderMeasurementField;
