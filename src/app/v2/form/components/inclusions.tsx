import { CustomInputlabel } from '@/components/common/input-label';
import React from 'react';
// import styles from '../form.module.scss';
import { ManageLocales } from '@/utils/translate';
import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import { handleSelection } from '@/app/v2/form/helpers/handle-filter-changes';
import { otherParameter } from '@/constants/v2/form';

// Define the interfaces for the component props
interface IRenderEachOtherParameterData {
  elementKey: string;
  elementValue: string[];
  state: string[];
  setState: any;
}
interface IRenderOtherParameterData {
  key: string;
  value: IRenderEachOtherParameterData[];
}
const Inclusions = ({state, setState}:any) => {
  // Destructure state variables
  const {
    blackTable,
    sideBlack,
    openCrown,
    openTable,
    openPavilion,
    milky,
    luster,
    eyeClean,
    tableInclusion,
    sideInclusion,
    naturalCrown,
    naturalGirdle,
    naturalPavilion,
    surfaceGraining,
    internalGraining
  } = state;
  const {
    setBlackTable,
    setSideBlack,
    setOpenCrown,
    setOpenTable,
    setOpenPavilion,
    setMilky,
    setLuster,
    setEyeClean,
    setTableInclusion,
    setSideInclusion,
    setNaturalCrown,
    setNaturalGirdle,
    setNaturalPavilion,
    setSurfaceGraining,
    setInternalGraining
  } = setState;

  let styles: any = '';

  // Create an array of other parameter data with respective change handlers and state
  let otherParameterDataState = [
    {
      key: ManageLocales('app.advanceSearch.blackInclusion'),
      value: [
        {
          state: blackTable,
          setState: setBlackTable
        },
        {
          state: sideBlack,
          setState: setSideBlack
        },
        {
          state: openCrown,
          setState: setOpenCrown
        },
        {
          state: openTable,
          setState: setOpenTable
        },
        {
          state: openPavilion,
          setState: setOpenPavilion
        },
        {
          state: milky,
          setState: setMilky
        },
        {
          state: luster,
          setState: setLuster
        },
        {
          state: eyeClean,
          setState: setEyeClean
        }
      ]
    },
    {
      key: ManageLocales('app.advanceSearch.whiteInclusion'),
      value: [
        {
          state: tableInclusion,
          setState: setTableInclusion
        },
        {
          state: sideInclusion,
          setState: setSideInclusion
        },
        {
          state: naturalCrown,
          setState: setNaturalCrown
        },
        {
          state: naturalGirdle,
          setState: setNaturalGirdle
        },
        {
          state: naturalPavilion,
          setState: setNaturalPavilion
        },
        {
          state: surfaceGraining,
          setState: setSurfaceGraining
        },
        {
          state: internalGraining,
          setState: setInternalGraining
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
          ...otherParameter[otherIndex].value[valueIndex]
        };
      })
    };
  });

  return (
    <>
      {
        <AccordionComponent
          value="Clarity"
          isDisable={true}
          accordionContent={
            <div>
              {otherParameterData.map((other: IRenderOtherParameterData) => (
                <div
                  key={`other-parameter-${other.key}`}
                  className={`${styles.otherParameterContainer}`}
                  style={{ paddingLeft: '10px' }}
                >
                  <CustomInputlabel
                    htmlfor="text"
                    label={other.key}
                    overriddenStyles={{ label: styles.otherParameterHeader }}
                  />
                  {other.value.map(data => (
                    <div
                      className={`${styles.filterSection} ${styles.otherParameterDataContainer}`}
                      key={`${other.key}-${data.elementKey}`}
                    >
                      <div className={`${styles.otherParameterTitle}`}>
                        <CustomInputlabel
                          htmlfor="text"
                          label={data.elementKey}
                          overriddenStyles={{ label: styles.labelPlainColor }}
                        />
                      </div>
                      <div className={`${styles.filterSectionData}`}>
                        <Tile
                          tileData={data.elementValue}
                          selectedTile={data.state}
                          setSelectedTile={data.setState}
                          handleTileClick={handleSelection}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          }
          accordionTrigger={'Clarity'}
          hasError={false}
        />
      }
    </>
  );
};

export default Inclusions;
