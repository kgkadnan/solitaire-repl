import React, { Dispatch, SetStateAction } from 'react';
import { ManageLocales } from '@/utils/translate';
import { AccordionComponent } from '@/components/v2/common/accordion';
import Tile from '@/components/v2/common/tile';
import { otherParameter } from '@/constants/v2/form';
import { handleSelection } from '../helpers/handle-filter-changes';

// Define the interfaces for the component props
interface IInclusionsData {
  elementKey: string;
  elementValue: string[];
  state: string[];
  setState: any;
}
interface IInclusions {
  key: string;
  value: IInclusionsData[];
}
const Inclusions = ({ state, setState }: any) => {
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
    setInternalGraining,
    setSelectedShade
  } = setState;

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

  const handleFilterChange = ({
    data,
    selectedTile,
    setSelectedTile
  }: {
    data: string;
    selectedTile: string[];
    setSelectedTile: Dispatch<SetStateAction<string[]>>;
  }) => {
    setSelectedTile(prevSelectedFilters => {
      let updatedFilters = prevSelectedFilters.includes(data)
        ? prevSelectedFilters.filter(selected => selected !== data)
        : [...prevSelectedFilters, data];

      // If "M0" is selected/deselected, update the main selection state
      if (data === 'M0') {
        setSelectedShade((prevSelectedShades: any) => {
          let updatedShades = [...prevSelectedShades];

          if (updatedFilters.includes('M0')) {
            // Ensure "No BGM" is selected when "M0" and its dependencies are selected
            const noBgmDependencies = ['None', 'White', 'Yellow'];
            if (
              noBgmDependencies.every(dep => updatedShades.includes(dep)) &&
              updatedFilters.includes('M0')
            ) {
              if (!updatedShades.includes('No BGM')) {
                updatedShades.push('No BGM');
              }
            }
          } else {
            // Remove "No BGM" if M0 is removed
            updatedShades = updatedShades.filter(item => item !== 'No BGM');
          }

          return updatedShades;
        });
      }

      return updatedFilters;
    });
  };

  return (
    <>
      {
        <div id="Inclusions">
          <AccordionComponent
            value="Inclusions"
            isDisable={false}
            defaultValue="closed"
            accordionContent={
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px] px-[16px] py-[24px]">
                {otherParameterData.map((other: IInclusions) => (
                  <div
                    key={`other-parameter-${other.key}`}
                    className="grid gap-[16px]"
                  >
                    <span className="text-neutral900 text-mRegular font-regular grid gap-[12px]">
                      {other.key}
                    </span>
                    {other.value.map(data => (
                      <div
                        key={`${other.key}-${data.elementKey}`}
                        className="flex gap-[20px] items-center"
                      >
                        <span className="text-neutral900 text-mRegular font-regular min-w-[120px]">
                          {data.elementKey}
                        </span>
                        <div>
                          <Tile
                            tileData={data.elementValue}
                            selectedTile={data.state}
                            setSelectedTile={data.setState}
                            handleTileClick={
                              data.elementKey === 'Milky'
                                ? handleFilterChange
                                : handleSelection
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            }
            accordionTrigger={'Inclusions'}
            hasError={false}
          />
        </div>
      }
    </>
  );
};

export default Inclusions;
