import { CustomInputlabel } from '@/components/common/input-label';
import React from 'react';
// import styles from '../form.module.scss';
import { ManageLocales } from '@/utils/translate';
import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import { handleFilterChange, handleSelection } from '@/app/v2/form/helpers/handle-filter-changes';
import { otherParameter } from '@/constants/v2/form';

// Define the interfaces for the component props
interface IRenderEachOtherParameterData {
  elementKey: string;
  elementValue: string[];
  handleChange: (data: string) => void;
  state: string[];
  setState:any
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
    setBlackTable,
    setSideBlack,
    setOpenCrown,
    setOpenTable,
    setOpenPavilion,
    setMilky,
    setLuster,
    setEyeClean,
    setTableInclusionWI,
    setSideInclusionWI,
    setNaturalCrownWI,
    setNaturalGirdleWI,
    setNaturalPavilionWI,
    setSurfaceGrainingWI,
    setInternalGrainingWI
  } = setState;

  let styles:any=""

  // Define individual change handlers
  const handleBlackTableBIChange = (data: string) => {
    handleFilterChange(data, blackTableBI, setBlackTable);
  };
  const handleSideBlackBIChange = (data: string) => {
    handleFilterChange(data, sideBlackBI, setSideBlack);
  };
  const handleOpenCrownBIChange = (data: string) => {
    handleFilterChange(data, openCrownBI, setOpenCrown);
  };
  const handleOpenTableBIChange = (data: string) => {
    handleFilterChange(data, openTableBI, setOpenTable);
  };
  const handleOpenPavilionBIChange = (data: string) => {
    handleFilterChange(data, openPavilionBI, setOpenPavilion);
  };
  const handleMilkyBIChange = (data: string) => {
    handleFilterChange(data, milkyBI, setMilky);
  };
  const handleLusterBIChange = (data: string) => {
    handleFilterChange(data, lusterBI, setLuster);
  };
  const handleEyeCleanBIChange = (data: string) => {
    handleFilterChange(data, eyeCleanBI, setEyeClean);
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
          state: blackTableBI,
          setState:setBlackTable
        },
        {
          handleChange: handleSideBlackBIChange,
          state: sideBlackBI,
          setState:setSideBlack
        },
        {
          handleChange: handleOpenCrownBIChange,
          state: openCrownBI,
          setState:setOpenCrown
        },
        {
          handleChange: handleOpenTableBIChange,
          state: openTableBI,
          setState:setOpenTable
        },
        {
          handleChange: handleOpenPavilionBIChange,
          state: openPavilionBI,
          setState:setOpenPavilion
        },
        {
          handleChange: handleMilkyBIChange,
          state: milkyBI,
          setState:setMilky
        },
        {
          handleChange: handleLusterBIChange,
          state: lusterBI,
          setState:setLuster
        },
        {
          handleChange: handleEyeCleanBIChange,
          state: eyeCleanBI,
          setState:setEyeClean
        }
      ]
    },
    {
      key: ManageLocales('app.advanceSearch.whiteInclusion'),
      value: [
        {
          handleChange: handleTableInclusionWIChange,
          state: tableInclusionWI,
          setState:setTableInclusionWI
        },
        {
          handleChange: handleSideInclusionWIChange,
          state: sideInclusionWI,
          setState:setTableInclusionWI
        },
        {
          handleChange: handleNaturalCrownWIChange,
          state: naturalCrownWI,
          setState:setTableInclusionWI
        },
        {
          handleChange: handleNaturalGirdleWIChange,
          state: naturalGirdleWI,
          setState:setTableInclusionWI
        },
        {
          handleChange: handleNaturalPavilionWIChange,
          state: naturalPavilionWI,
          setState:setTableInclusionWI
        },
        {
          handleChange: handleSurfaceGrainingIChange,
          state: surfaceGrainingWI,
          setState:setTableInclusionWI
        },
        {
          handleChange: handleinternalGrainingWIChange,
          state: internalGrainingWI,
          setState:setTableInclusionWI
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

  return <>{
    <AccordionComponent
    value="Clarity"
    isDisable={true}
    accordionContent={
      <div>
        {
            otherParameterData.map((other: IRenderOtherParameterData) => (
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
                    {/* <Tile
          tileData={data.elementValue}
          selectedTile={data.state}
          setSelectedTile={data.setState}
          handleTileClick={handleSelection}
        />  */}
                    </div>
                  </div>
                ))}
              </div>
            ))
        }
        {/* <Tile
          tileData={clarity}
          selectedTile={selectedClarity}
          setSelectedTile={setSelectedClarity}
          handleTileClick={handleSelection}
        /> */}
      </div>
    }
    accordionTrigger={'Clarity'}
    hasError={false}
  />

            }
  </>
};

export default renderInclusionField;
