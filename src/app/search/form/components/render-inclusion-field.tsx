import { CustomInputlabel } from '@/components/common/input-label';
import React from 'react';
import styles from '../form.module.scss';
import renderSelectionButtons from './render-selection-button';
import { ManageLocales } from '@/utils/translate';
import advanceSearch from '@/constants/advance-search.json';
import { handleFilterChange } from '../helpers/handle-change';

// Define the interfaces for the component props
interface IRenderEachOtherParameterData {
  element_key: string;
  element_value: string[];
  handleChange: (data: string) => void;
  state: string[];
}
interface IRenderOtherParameterData {
  key: string;
  value: IRenderEachOtherParameterData[];
}
const renderInclusionField = (state: any, setState: any) => {
  // Destructure state variables
  const {
    blackTableBI,
    sideBlackBI,
    openCrownBI,
    openTableBI,
    openPavilionBI,
    milkyBI,
    lusterBI,
    eyeCleanBI,
    tableInclusionWI,
    sideInclusionWI,
    naturalCrownWI,
    naturalGirdleWI,
    naturalPavilionWI,
    surfaceGrainingWI,
    internalGrainingWI
  } = state;
  const {
    setBlackTableBI,
    setSideBlackBI,
    setOpenCrownBI,
    setOpenTableBI,
    setOpenPavilionBI,
    setMilkyBI,
    setLusterBI,
    setEyeCleanBI,
    setTableInclusionWI,
    setSideInclusionWI,
    setNaturalCrownWI,
    setNaturalGirdleWI,
    setNaturalPavilionWI,
    setSurfaceGrainingWI,
    setInternalGrainingWI
  } = setState;

  // Define individual change handlers
  const handleBlackTableBIChange = (data: string) => {
    handleFilterChange(data, blackTableBI, setBlackTableBI);
  };
  const handleSideBlackBIChange = (data: string) => {
    handleFilterChange(data, sideBlackBI, setSideBlackBI);
  };
  const handleOpenCrownBIChange = (data: string) => {
    handleFilterChange(data, openCrownBI, setOpenCrownBI);
  };
  const handleOpenTableBIChange = (data: string) => {
    handleFilterChange(data, openTableBI, setOpenTableBI);
  };
  const handleOpenPavilionBIChange = (data: string) => {
    handleFilterChange(data, openPavilionBI, setOpenPavilionBI);
  };
  const handleMilkyBIChange = (data: string) => {
    handleFilterChange(data, milkyBI, setMilkyBI);
  };
  const handleLusterBIChange = (data: string) => {
    handleFilterChange(data, lusterBI, setLusterBI);
  };
  const handleEyeCleanBIChange = (data: string) => {
    handleFilterChange(data, eyeCleanBI, setEyeCleanBI);
  };
  const handleTableInclusionWIChange = (data: string) => {
    handleFilterChange(data, tableInclusionWI, setTableInclusionWI);
  };
  const handleSideInclusionWIChange = (data: string) => {
    handleFilterChange(data, sideInclusionWI, setSideInclusionWI);
  };
  const handleNaturalCrownWIChange = (data: string) => {
    handleFilterChange(data, naturalCrownWI, setNaturalCrownWI);
  };
  const handleNaturalGirdleWIChange = (data: string) => {
    handleFilterChange(data, naturalGirdleWI, setNaturalGirdleWI);
  };
  const handleNaturalPavilionWIChange = (data: string) => {
    handleFilterChange(data, naturalPavilionWI, setNaturalPavilionWI);
  };
  const handleSurfaceGrainingIChange = (data: string) => {
    handleFilterChange(data, surfaceGrainingWI, setSurfaceGrainingWI);
  };
  const handleinternalGrainingWIChange = (data: string) => {
    handleFilterChange(data, internalGrainingWI, setInternalGrainingWI);
  };

  // Create an array of other parameter data with respective change handlers and state
  let otherParameterDataState = [
    {
      key: ManageLocales('app.advanceSearch.blackInclusion'),
      value: [
        {
          handleChange: handleBlackTableBIChange,
          state: blackTableBI
        },
        {
          handleChange: handleSideBlackBIChange,
          state: sideBlackBI
        },
        {
          handleChange: handleOpenCrownBIChange,
          state: openCrownBI
        },
        {
          handleChange: handleOpenTableBIChange,
          state: openTableBI
        },
        {
          handleChange: handleOpenPavilionBIChange,
          state: openPavilionBI
        },
        {
          handleChange: handleMilkyBIChange,
          state: milkyBI
        },
        {
          handleChange: handleLusterBIChange,
          state: lusterBI
        },
        {
          handleChange: handleEyeCleanBIChange,
          state: eyeCleanBI
        }
      ]
    },
    {
      key: ManageLocales('app.advanceSearch.whiteInclusion'),
      value: [
        {
          handleChange: handleTableInclusionWIChange,
          state: tableInclusionWI
        },
        {
          handleChange: handleSideInclusionWIChange,
          state: sideInclusionWI
        },
        {
          handleChange: handleNaturalCrownWIChange,
          state: naturalCrownWI
        },
        {
          handleChange: handleNaturalGirdleWIChange,
          state: naturalGirdleWI
        },
        {
          handleChange: handleNaturalPavilionWIChange,
          state: naturalPavilionWI
        },
        {
          handleChange: handleSurfaceGrainingIChange,
          state: surfaceGrainingWI
        },
        {
          handleChange: handleinternalGrainingWIChange,
          state: internalGrainingWI
        }
      ]
    }
  ];

  // Map the otherParameterDataState to create an array of objects
  let otherParameterData = otherParameterDataState.map((other, otherIndex) => {
    return {
      key: other.key,
      value: other.value.map((data, valueIndex) => {
        return {
          ...data,
          ...advanceSearch.other_parameter[otherIndex].value[valueIndex]
        };
      })
    };
  });

  return otherParameterData.map((other: IRenderOtherParameterData) => (
    <div
      key={`other-parameter-${other.key}`}
      className={`${styles.otherParameterContainer}`}
      style={{paddingLeft:"10px"}}
    >
      <CustomInputlabel
        htmlfor="text"
        label={other.key}
        overriddenStyles={{ label: styles.otherParameterHeader }}
      />
      {other.value.map(data => (
        <div
          className={`${styles.filterSection} ${styles.otherParameterDataContainer}`}
          key={`${other.key}-${data.element_key}`}
        >
          <div className={`${styles.otherParameterTitle}`}>
            <CustomInputlabel
              htmlfor="text"
              label={data.element_key}
              overriddenStyles={{ label: styles.labelPlainColor }}
            />
          </div>
          <div className={`${styles.filterSectionData}`} >
            {renderSelectionButtons(
              data.element_value,
              '',
              styles.activeOtherStyles,
              data.state,
              data.handleChange
            )}
          </div>
        </div>
      ))}
    </div>
  ));
};

export default renderInclusionField;
