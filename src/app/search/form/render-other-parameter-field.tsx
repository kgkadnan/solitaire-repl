import { CustomInputlabel } from '@/components/common/input-label';
import React from 'react';
import styles from './form.module.scss';
import renderSelectionButtons from './render-selection-button';
import { ManageLocales } from '@/utils/translate';
import fieldStateManagement from './field-state-management';
import advanceSearch from '@/constants/advance-search.json';
import {
  handleBlackTableBIChange,
  handleSideBlackBIChange,
  handleOpenCrownBIChange,
  handleOpenTableBIChange,
  handleOpenPavilionBIChange,
  handleMilkyBIChange,
  handleLusterBIChange,
  handleEyeCleanBIChange,
  handleTableInclusionWIChange,
  handleSideInclusionWIChange,
  handleNaturalCrownWIChange,
  handleNaturalGirdleWIChange,
  handleNaturalPavilionWIChange,
  handleSurfaceGrainingIChange,
  handleinternalGrainingWIChange,
} from './handle-change';

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
const renderOtherParameterFields = () => {
  const { state } = fieldStateManagement();
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
    internalGrainingWI,
  } = state;

  let otherParameterDataState = [
    {
      key: ManageLocales('app.advanceSearch.blackInclusion'),
      value: [
        {
          handleChange: handleBlackTableBIChange,
          state: blackTableBI,
        },
        {
          handleChange: handleSideBlackBIChange,
          state: sideBlackBI,
        },
        {
          handleChange: handleOpenCrownBIChange,
          state: openCrownBI,
        },
        {
          handleChange: handleOpenTableBIChange,
          state: openTableBI,
        },
        {
          handleChange: handleOpenPavilionBIChange,
          state: openPavilionBI,
        },
        {
          handleChange: handleMilkyBIChange,
          state: milkyBI,
        },
        {
          handleChange: handleLusterBIChange,
          state: lusterBI,
        },
        {
          handleChange: handleEyeCleanBIChange,
          state: eyeCleanBI,
        },
      ],
    },
    {
      key: ManageLocales('app.advanceSearch.whiteInclusion'),
      value: [
        {
          handleChange: handleTableInclusionWIChange,
          state: tableInclusionWI,
        },
        {
          handleChange: handleSideInclusionWIChange,
          state: sideInclusionWI,
        },
        {
          handleChange: handleNaturalCrownWIChange,
          state: naturalCrownWI,
        },
        {
          handleChange: handleNaturalGirdleWIChange,
          state: naturalGirdleWI,
        },
        {
          handleChange: handleNaturalPavilionWIChange,
          state: naturalPavilionWI,
        },
        {
          handleChange: handleSurfaceGrainingIChange,
          state: surfaceGrainingWI,
        },
        {
          handleChange: handleinternalGrainingWIChange,
          state: internalGrainingWI,
        },
      ],
    },
  ];
  let otherParameterData = otherParameterDataState.map((other, otherIndex) => {
    return {
      key: other.key,
      value: other.value.map((data, valueIndex) => {
        return {
          ...data,
          ...advanceSearch.other_parameter[otherIndex].value[valueIndex],
        };
      }),
    };
  });

  return otherParameterData.map((other: IRenderOtherParameterData) => (
    <div
      key={`other-parameter-${other.key}`}
      className={styles.otherParameterContainer}
    >
      <CustomInputlabel
        htmlfor="text"
        label={other.key}
        overriddenStyles={{ label: styles.otherParameterHeader }}
      />
      {other.value.map((data) => (
        <div
          className={`${styles.filterSection} ${styles.otherParameterDataContainer} `}
          key={`${other.key}-${data.element_key}`}
        >
          <div className={`${styles.otherParameterTitle}`}>
            <CustomInputlabel
              htmlfor="text"
              label={data.element_key}
              overriddenStyles={{ label: styles.labelPlainColor }}
            />
          </div>
          <div className={styles.filterSectionData}>
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

export default renderOtherParameterFields;
