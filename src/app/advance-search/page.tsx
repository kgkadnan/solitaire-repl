'use client';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './advance-search.module.scss';
import { CustomRadioButton } from 'src/components/common/buttons/radio-button';
import { CustomSelectionButton } from 'src/components/common/buttons/selection-button';
import CustomImageTile from 'src/components/common/image-tile';
import { CustomInputField } from 'src/components/common/input-field';
import { CustomInputlabel } from 'src/components/common/input-label';
import CustomHeader from '@/components/common/header';
import { CustomFooter } from '@/components/common/footer';
import { useSearchParams } from 'next/navigation';
import { ManageLocales } from '@/utils/translate';
import Tooltip from '@/components/common/tooltip';
import TooltipIcon from '@public/assets/icons/information-circle-outline.svg?url';
import { CustomToast } from '@/components/common/toast';
import { useAddPreviousSearchMutation } from '@/slices/previous-searches';
import advanceSearch from '@/constants/advance-search.json';
interface IAdvanceSearch {
  shape?: string[];
  color?: string[];
}
const AdvanceSearch = (props?: IAdvanceSearch) => {
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedWhiteColor, setSelectedWhiteColor] = useState<string[]>([]);
  const [selectedFancyColor, setSelectedFancyColor] = useState<string[]>([]);
  const [selectedRangeColor, setSelectedRangeColor] = useState<string[]>([]);
  const [selectedIntensity, setSelectedIntensity] = useState<string[]>([]);
  const [selectedOvertone, setSelectedOvertone] = useState<string[]>([]);
  const [selectedTinge, setSelectedTinge] = useState<string[]>([]);
  const [selectedTingeIntensity, setSelectedTingeIntensity] = useState<
    string[]
  >([]);
  const [selectedClarity, setSelectedClarity] = useState<string[]>([]);

  const [, setSelectedGirdleStep] = useState<string>();
  const [selectedCaratRange, setSelectedCaratRange] = useState<string[]>([]);

  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedCut, setSelectedCut] = useState<string[]>([]);
  const [selectedPolish, setSelectedPolish] = useState<string[]>([]);
  const [selectedSymmetry, setSelectedSymmetry] = useState<string[]>([]);
  const [selectedFluorescence, setSelectedFluorescence] = useState<string[]>(
    []
  );
  const [selectedCulet, setSelectedCulet] = useState<string[]>([]);
  const [selectedGirdle, setSelectedGirdle] = useState<string[]>([]);
  const [selectedGirdleStep2, setSelectedGirdleStep2] = useState<string[]>([]);

  const [selectedLab, setSelectedLab] = useState<string[]>([]);
  const [selectedHR, setSelectedHR] = useState<string[]>([]);
  const [selectedBrilliance, setSelectedBrilliance] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<string[]>([]);

  const [priceRangeFrom, setPriceRangeFrom] = useState<string>('');
  const [priceRangeTo, setPriceRangeTo] = useState<string>('');
  const [discountFrom, setDiscountFrom] = useState<string>('');
  const [discountTo, setDiscountTo] = useState<string>('');
  const [pricePerCaratFrom, setPricePerCaratFrom] = useState<string>('');
  const [pricePerCaratTo, setPricePerCaratTo] = useState<string>('');
  const [caratRangeFrom, setCaratRangeFrom] = useState<string>('');
  const [caratRangeTo, setCaratRangeTo] = useState<string>('');
  //other parameter Inclsuion state
  const [blackTableBI, setBlackTableBI] = useState<string[]>([]);
  const [sideBlackBI, setSideBlackBI] = useState<string[]>([]);
  const [openCrownBI, setOpenCrownBI] = useState<string[]>([]);
  const [openTableBI, setOpenTableBI] = useState<string[]>([]);
  const [openPavilionBI, setOpenPavilionBI] = useState<string[]>([]);
  const [milkyBI, setMilkyBI] = useState<string[]>([]);
  const [lusterBI, setLusterBI] = useState<string[]>([]);
  const [eyeCleanBI, setEyeCleanBI] = useState<string[]>([]);

  const [tableInclusionWI, setTableInclusionWI] = useState<string[]>([]);
  const [sideInclusionWI, setSideInclusionWI] = useState<string[]>([]);
  const [naturalCrownWI, setNaturalCrownWI] = useState<string[]>([]);
  const [naturalGirdleWI, setNaturalGirdleWI] = useState<string[]>([]);
  const [naturalPavilionWI, setNaturalPavilionWI] = useState<string[]>([]);
  const [surfaceGrainingWI, setSurfaceGrainingWI] = useState<string[]>([]);
  const [internalGrainingWI, setInternalGrainingWI] = useState<string[]>([]);

  //parameter state
  const [tablePerFrom, setTablePerFrom] = useState<string>('');
  const [tablePerTo, setTablePerTo] = useState<string>('');
  const [depthTo, setDepthTo] = useState<string>('');
  const [depthFrom, setDepthFrom] = useState<string>('');
  const [crownAngleFrom, setCrownAngleFrom] = useState<string>('');
  const [crownAngleTo, setCrownAngleTo] = useState<string>('');
  const [lengthFrom, setLengthFrom] = useState<string>('');
  const [lengthTo, setLengthTo] = useState<string>('');
  const [pavilionDepthFrom, setPavilionDepthFrom] = useState<string>('');
  const [pavilionDepthTo, setPavilionDepthTo] = useState<string>('');

  const [depthPerFrom, setDepthPerFrom] = useState<string>('');
  const [depthPerTo, setDepthPerTo] = useState<string>('');
  const [crownHeightFrom, setCrownHeightFrom] = useState<string>('');
  const [crownHeightTo, setCrownHeightTo] = useState<string>('');
  const [widthFrom, setWidthFrom] = useState<string>('');
  const [widthTo, setWidthTo] = useState<string>('');
  const [lowerHalfFrom, setLowerHalfFrom] = useState<string>('');
  const [lowerHalfTo, setLowerHalfTo] = useState<string>('');

  const [ratioFrom, setRatioFrom] = useState<string>('');
  const [ratioTo, setRatioTo] = useState<string>('');
  const [girdlePerFrom, setGirdlePerFrom] = useState<string>('');
  const [girdlePerTo, setGirdlePerTo] = useState<string>('');
  const [pavilionAngleFrom, setPavilionAngleFrom] = useState<string>('');
  const [pavilionAngleTo, setPavilionAngleTo] = useState<string>('');
  const [starLengthFrom, setStarLengthFrom] = useState<string>('');
  const [starLengthTo, setStarLengthTo] = useState<string>('');
  const [yourSelection, setYourSelection] = useState<Record<string, any>[]>([]);

  const [searchResultCount, setSearchResultCount] = useState<number>(1);
  const [searchApiCalled, setSearchApiCalled] = useState<boolean>(false);
  const [addSearches, setAddSearches] = useState<any[]>(['p', 'l', 'o', 'u']);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastErrorMessage, setToastErrorMessage] = useState<string>('');

 
  ///edit functionality
  const searchParams = useSearchParams();

  const search = searchParams.get('id');

  const searchListNew = useMemo(
    () => [
      {
        cardId: '1',
        header: 'ooooo',
        desc: '12-05-2023 | 10.12 AM',
        body: {
          StoneShape: 'Round',
          color: 'White',
          Carat: '2.01',
          Clarity: 'VVS2',
          Shade: 'WHT',
          Cut: 'Excellent',
          polish: 'EX',
          Rap: '23,500.00',
        },
      },
    ],
    [] // No dependencies
  );
  useEffect(() => {
    if (search !== null) {
      setSelectedShape([...selectedShape, searchListNew[0].body.StoneShape]);
      setSelectedCut([...selectedCut, searchListNew[0].body.Cut]);
      setSelectedClarity([...selectedClarity, searchListNew[0].body.Clarity]);
    }
  }, [search]);

  const imageTileStyles = {
    imageTileMainContainerStyles: styles.imageTileMainContainerStyles,
    imageTileContainerStyles: styles.imageTileContainerStyles,
    imageTileImageStyles: styles.imageTileImageStyles,
    imageTileLabelStyles: styles.imageTileLabelStyles,
    activeIndicatorStyles: styles.activeIndicatorStyles,
  };

  let parameterDataState = [
    {
      parameterState: [tablePerFrom, tablePerTo],
      setParameterState: [setTablePerFrom, setTablePerTo],
    },
    {
      parameterState: [depthPerFrom, depthPerTo],
      setParameterState: [setDepthPerFrom, setDepthPerTo],
    },
    {
      parameterState: [ratioFrom, ratioTo],
      setParameterState: [setRatioFrom, setRatioTo],
    },
    {
      parameterState: [lengthFrom, lengthTo],
      setParameterState: [setLengthFrom, setLengthTo],
    },
    {
      parameterState: [widthFrom, widthTo],
      setParameterState: [setWidthFrom, setWidthTo],
    },
    {
      parameterState: [depthFrom, depthTo],
      setParameterState: [setDepthFrom, setDepthTo],
    },

    {
      parameterState: [crownAngleFrom, crownAngleTo],
      setParameterState: [setCrownAngleFrom, setCrownAngleTo],
    },

    {
      parameterState: [crownHeightFrom, crownHeightTo],
      setParameterState: [setCrownHeightFrom, setCrownHeightTo],
    },
    {
      parameterState: [girdlePerFrom, girdlePerTo],
      setParameterState: [setGirdlePerFrom, setGirdlePerTo],
    },
    {
      parameterState: [pavilionAngleFrom, pavilionAngleTo],
      setParameterState: [setPavilionAngleFrom, setPavilionAngleTo],
    },

    {
      parameterState: [pavilionDepthFrom, pavilionDepthTo],
      setParameterState: [setPavilionDepthFrom, setPavilionDepthTo],
    },

    {
      parameterState: [lowerHalfFrom, lowerHalfTo],
      setParameterState: [setLowerHalfFrom, setLowerHalfTo],
    },

    {
      parameterState: [starLengthFrom, starLengthTo],
      setParameterState: [setStarLengthFrom, setStarLengthTo],
    },
  ];

  let parameterData = parameterDataState.map((parameter, index) => {
    return { ...parameter, ...advanceSearch.parameter[index] };
  });

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
          ...advanceSearch.other_parameter[otherIndex].value[
            valueIndex
          ],
        };
      }),
    };
  });

  const [caratRangeData, setCaratRangeData] = useState<string[]>(
    advanceSearch.carat.data
  );

  //// All user actions

  const handleFilterChange = (
    filterData: string,
    selectedFilters: string[] | string,
    setSelectedFilters: any
  ) => {
    if (selectedFilters.includes(filterData)) {
      setSelectedFilters((prevSelectedColors: any[]) =>
        prevSelectedColors.filter((selected) => selected !== filterData)
      );
    } else {
      setSelectedFilters((prevSelectedColors: any) => [
        ...prevSelectedColors,
        filterData,
      ]);
    }
  };

  const handleShapeChange = (shape: string) => {
    if (shape.toLowerCase() === 'all') {
      let filteredShape: string[] = advanceSearch.shape.map((data) => data.title);
      setSelectedShape(filteredShape);
      if (selectedShape.includes('All')) {
        setSelectedShape([]);
      }
    } else {
      handleFilterChange(shape, selectedShape, setSelectedShape);
    }
  };

  const handleColorChange = (data: string) => {
    setSelectedColor(data);
    setSelectedWhiteColor([]);
    setSelectedFancyColor([]);
    setSelectedRangeColor([]);
  };

  const handleWhiteFilterChange = (data: string) => {
    handleFilterChange(data, selectedWhiteColor, setSelectedWhiteColor);
  };

  const handleFancyFilterChange = (data: string) => {
    handleFilterChange(data, selectedFancyColor, setSelectedFancyColor);
  };

  const handleRangeFilterChange = (data: string) => {
    handleFilterChange(data, selectedRangeColor, setSelectedRangeColor);
  };

  const handleIntensityChange = (data: string) => {
    handleFilterChange(data, selectedIntensity, setSelectedIntensity);
  };
  const handleOvertoneChange = (data: string) => {
    handleFilterChange(data, selectedOvertone, setSelectedOvertone);
  };

  const handleTingeChange = (data: string) => {
    handleFilterChange(data, selectedTinge, setSelectedTinge);
  };

  const handleTingeIntensityChange = (data: string) => {
    handleFilterChange(data, selectedTingeIntensity, setSelectedTingeIntensity);
  };
  const handleClarityChange = (data: string) => {
    handleFilterChange(data, selectedClarity, setSelectedClarity);
  };
  const handleCaratRangeChange = (data: string) => {
    handleFilterChange(data, selectedCaratRange, setSelectedCaratRange);
  };
  // let prevMakeData=""
  const handleMakeChange = (data: string) => {
    if (data.toLowerCase() === '3ex') {
      if (data !== selectedMake) {
        setSelectedCut([...selectedCut, 'Excellent']);
        setSelectedPolish([...selectedPolish, 'Excellent']);
        setSelectedSymmetry([...selectedSymmetry, 'Excellent']);
      } else {
        setSelectedCut(
          selectedCut.filter((e) => e !== 'Excellent' && e !== 'Very Good')
        );
        setSelectedPolish(
          selectedPolish.filter((e) => e !== 'Excellent' && e !== 'Very Good')
        );
        setSelectedSymmetry(
          selectedSymmetry.filter((e) => e !== 'Excellent' && e !== 'Very Good')
        );
      }
      setSelectedFluorescence(selectedFluorescence.filter((e) => e !== 'NON'));
    }

    if (data.toLowerCase() === '3ex-non') {
      if (data !== selectedMake) {
        setSelectedCut([...selectedCut, 'Excellent']);
        setSelectedPolish([...selectedPolish, 'Excellent']);
        setSelectedSymmetry([...selectedSymmetry, 'Excellent']);
        setSelectedFluorescence([...selectedFluorescence, 'NON']);
      } else {
        setSelectedCut(
          selectedCut.filter((e) => e !== 'Excellent' && e !== 'Very Good')
        );
        setSelectedPolish(
          selectedPolish.filter((e) => e !== 'Excellent' && e !== 'Very Good')
        );
        setSelectedSymmetry(
          selectedSymmetry.filter((e) => e !== 'Excellent' && e !== 'Very Good')
        );
        setSelectedFluorescence(
          selectedFluorescence.filter((e) => e !== 'NON')
        );
      }
    }
    if (data.toLowerCase() === '3vg+') {
      if (data !== selectedMake) {
        // setSelectedCut(selectedCut.filter((e)=>e!=='Excellent'))
        setSelectedCut([...selectedCut, 'Excellent', 'Very Good']);
        setSelectedPolish([...selectedPolish, 'Excellent', 'Very Good']);
        setSelectedSymmetry([...selectedSymmetry, 'Excellent', 'Very Good']);
      } else {
        setSelectedCut(
          selectedCut.filter((e) => e !== 'Excellent' && e !== 'Very Good')
        );
        setSelectedPolish(
          selectedPolish.filter((e) => e !== 'Excellent' && e !== 'Very Good')
        );
        setSelectedSymmetry(
          selectedSymmetry.filter((e) => e !== 'Excellent' && e !== 'Very Good')
        );
        setSelectedFluorescence(
          selectedFluorescence.filter((e) => e !== 'NON')
        );
      }
    }
    data === selectedMake ? setSelectedMake('') : setSelectedMake(data);
  };

  const handleCutChange = (data: string) => {
    handleFilterChange(data, selectedCut, setSelectedCut);
  };
  const handlePolishChange = (data: string) => {
    handleFilterChange(data, selectedPolish, setSelectedPolish);
  };
  const handleSymmetryChange = (data: string) => {
    handleFilterChange(data, selectedSymmetry, setSelectedSymmetry);
  };

  const handleFluorescenceChange = (data: string) => {
    handleFilterChange(data, selectedFluorescence, setSelectedFluorescence);
  };

  const handleCuletChange = (data: string) => {
    handleFilterChange(data, selectedCulet, setSelectedCulet);
  };

  const handleGirdleChange = (data: string) => {
    handleFilterChange(data, selectedGirdle, setSelectedGirdle);
  };
  const handleGirdleStep2Change = (data: string) => {
    if (data.toLowerCase() === 'all') {
      let filteredGirdleStep: string[] =
        advanceSearch.key_to_symbol.map((girdleData) =>
          girdleData.toLowerCase() !== 'all' ? girdleData : ''
        );
      setSelectedGirdleStep2(filteredGirdleStep);
    } else {
      handleFilterChange(data, selectedGirdleStep2, setSelectedGirdleStep2);
    }
  };

  const handleLabChange = (data: string) => {
    handleFilterChange(data, selectedLab, setSelectedLab);
  };
  const handleHRChange = (data: string) => {
    handleFilterChange(data, selectedHR, setSelectedHR);
  };
  const handleBrillianceChange = (data: string) => {
    handleFilterChange(data, selectedBrilliance, setSelectedBrilliance);
  };

  const handleLocation = (data: string) => {
    handleFilterChange(data, selectedLocation, setSelectedLocation);
  };

  const handleOrigin = (data: string) => {
    handleFilterChange(data, selectedOrigin, setSelectedOrigin);
  };

  const handleGirdleStepChange = (radioValue: string) => {
    setSelectedGirdleStep(radioValue);
  };

  const handleAddCarat = (data: string) => {
    setCaratRangeData([...caratRangeData, data]);
    setSelectedCaratRange([...selectedCaratRange, data]);
    setCaratRangeFrom('');
    setCaratRangeTo('');
  };

  const [addPreviousSearch, { isLoading: addIsLoading, isError: addIsError }] =
    useAddPreviousSearchMutation();

  const formatSelection = (data: string[] | string) => {
    return (
      <div className={styles.yourSelectionInHeaderElement}>
        {' '}
        {Array.isArray(data)
          ? data.length > 1
            ? data.toString().substring(0, 4).concat('...')
            : data.toString()
          : data}
      </div>
    );
  };

  const handleReset = () => {
    setYourSelection([]);
    setSelectedShape([]);
    setSelectedColor('');
    setSelectedWhiteColor([]);
    setSelectedFancyColor([]);
    setSelectedRangeColor([]);
    setSelectedIntensity([]);
    setSelectedOvertone([]);
    setSelectedTinge([]);
    setSelectedTingeIntensity([]);
    setSelectedClarity([]);
    setSelectedCaratRange([]);
    setSelectedMake('');
    setSelectedCut([]);
    setSelectedPolish([]);
    setSelectedSymmetry([]);
    setSelectedFluorescence([]);
    setSelectedLab([]);
    setSelectedHR([]);
    setSelectedBrilliance([]);
    setPriceRangeFrom('');
    setPriceRangeTo('');
    setDiscountFrom('');
    setDiscountTo('');
    setPricePerCaratFrom('');
    setPricePerCaratTo('');
    setCaratRangeFrom('');
    setCaratRangeTo('');
    setBlackTableBI([]);
    setSideBlackBI([]);
    setOpenCrownBI([]);
    setOpenTableBI([]);
    setOpenPavilionBI([]);
    setMilkyBI([]);
    setLusterBI([]);
    setEyeCleanBI([]);
    setTableInclusionWI([]);

    setSideInclusionWI([]);
    setNaturalCrownWI([]);
    setNaturalGirdleWI([]);
    setNaturalPavilionWI([]);
    setSurfaceGrainingWI([]);
    setInternalGrainingWI([]);
    setTablePerFrom('');
    setTablePerTo('');
    setCrownAngleFrom('');
    setCrownAngleTo('');
    setLengthFrom('');
    setLengthTo('');
    setPavilionDepthFrom('');
    setPavilionDepthTo('');

    setDepthPerFrom('');
    setDepthPerTo('');
    setCrownHeightFrom('');
    setCrownHeightTo('');

    setWidthFrom('');
    setWidthTo('');
    setLowerHalfFrom('');
    setLowerHalfTo('');
    setRatioFrom('');
    setRatioTo('');
    setGirdlePerFrom('');
    setGirdlePerTo('');

    setPavilionAngleFrom('');
    setPavilionAngleTo('');
    setStarLengthFrom('');
    setStarLengthTo('');
  };

  const updateYourSelection = (key: string, value: any) => {
    setYourSelection((prevSelection) => {
      // Use filter to remove items with the same key
      const updatedSelection = prevSelection.filter(
        (item) =>
          !Object.keys(item).includes(ManageLocales(`app.advanceSearch.${key}`))
      );

      // Add the new item to the array
      return [
        ...updatedSelection,
        { [ManageLocales(`app.advanceSearch.${key}`)]: value },
      ];
    });
  };

  const handlePreviousSearchName = (name: string) => {
    const criteriaToCheck = [
      selectedShape,
      selectedColor,
      selectedWhiteColor,
      selectedFancyColor,
      selectedRangeColor,
      selectedIntensity,
      selectedOvertone,
      selectedTinge,
      selectedTingeIntensity,
      selectedClarity,
      selectedCaratRange,
      selectedMake,
      selectedCut,
      selectedPolish,
      selectedSymmetry,
      selectedLab,
    ];

    const selectedCriteria = criteriaToCheck
      .filter((criteria) => criteria.length > 0)
      .map((criteria) =>
        Array.isArray(criteria) ? criteria.join('') : criteria
      )
      .join(' ');

    return name + selectedCriteria;
  };

  const handleYourSelection = () => {
    selectedShape.length > 0 && updateYourSelection('shape', selectedShape);

    selectedColor.length > 0 && updateYourSelection('color', selectedColor);
    selectedWhiteColor.length > 0 &&
      updateYourSelection('white', selectedWhiteColor);
    selectedFancyColor.length > 0 &&
      updateYourSelection('fancy', selectedFancyColor);
    selectedRangeColor.length > 0 &&
      updateYourSelection('range', selectedRangeColor);
    selectedIntensity.length > 0 &&
      updateYourSelection('intensity', selectedIntensity);
    selectedOvertone.length > 0 &&
      updateYourSelection('overtone', selectedOvertone);
    selectedTinge.length > 0 && updateYourSelection('tinge', selectedTinge);

    selectedTingeIntensity.length > 0 &&
      updateYourSelection('tingeIntensity', selectedTingeIntensity);
    selectedClarity.length > 0 &&
      updateYourSelection('clarity', selectedClarity);
    selectedCaratRange.length > 0 &&
      updateYourSelection('caratRange', selectedCaratRange);
    selectedMake.length > 0 && updateYourSelection('make', selectedMake);
    selectedCut.length > 0 && updateYourSelection('cut', selectedCut);
    selectedPolish.length > 0 && updateYourSelection('polish', selectedPolish);

    selectedSymmetry.length > 0 &&
      updateYourSelection('symmetry', selectedSymmetry);
    selectedFluorescence.length > 0 &&
      updateYourSelection('fluorescence', selectedFluorescence);
    selectedCulet.length > 0 && updateYourSelection('culet', selectedCulet);
    selectedGirdle.length > 0 && updateYourSelection('girdle', selectedGirdle);
    selectedLab.length > 0 && updateYourSelection('lab', selectedLab);
    selectedHR.length > 0 && updateYourSelection('HA', selectedHR);
    selectedBrilliance.length > 0 &&
      updateYourSelection('brilliance', selectedBrilliance);
    selectedLocation.length > 0 &&
      updateYourSelection('location', selectedLocation);
    selectedOrigin.length > 0 && updateYourSelection('origin', selectedOrigin);
    (priceRangeFrom || priceRangeTo) &&
      updateYourSelection(
        'priceRange',
        `${
          priceRangeFrom +
          (priceRangeFrom && priceRangeTo && '-') +
          priceRangeTo
        }`
      );
    (discountFrom || discountTo) &&
      updateYourSelection(
        'discount',
        `${discountFrom + (discountFrom && discountTo && '-') + discountTo}`
      );
    (pricePerCaratFrom || pricePerCaratTo) &&
      updateYourSelection(
        'pricePerCarat',
        `${
          pricePerCaratFrom +
          (pricePerCaratFrom && pricePerCaratTo && '-') +
          pricePerCaratTo
        }`
      );
    (priceRangeFrom || priceRangeTo) &&
      updateYourSelection(
        'priceRange',
        `${
          priceRangeFrom +
          (priceRangeFrom && priceRangeTo && '-') +
          priceRangeTo
        }`
      );
    blackTableBI.length > 0 &&
      updateYourSelection('otherBIBlackTable', blackTableBI);
    sideBlackBI.length > 0 &&
      updateYourSelection('otherBISideTable', sideBlackBI);
    openCrownBI.length > 0 &&
      updateYourSelection('otherBIOpenCrown', openCrownBI);

    openTableBI.length > 0 &&
      updateYourSelection('otherBIOpenTable', openTableBI);
    openPavilionBI.length > 0 &&
      updateYourSelection('otherBIOpenPavilion', openPavilionBI);
    milkyBI.length > 0 && updateYourSelection('otherBIMilky', milkyBI);
    lusterBI.length > 0 && updateYourSelection('otherBILuster', lusterBI);
    eyeCleanBI.length > 0 && updateYourSelection('otherBIEyeClean', eyeCleanBI);
    tableInclusionWI.length > 0 &&
      updateYourSelection('otherWITableInclusion', tableInclusionWI);
    sideInclusionWI.length > 0 &&
      updateYourSelection('otherWISideInclusion', sideInclusionWI);
    naturalCrownWI.length > 0 &&
      updateYourSelection('otherWINaturalCrown', naturalCrownWI);

    naturalGirdleWI.length > 0 &&
      updateYourSelection('otherWINaturalGirdle', naturalGirdleWI);
    naturalPavilionWI.length > 0 &&
      updateYourSelection('otherWINaturalPavilion', naturalPavilionWI);
    surfaceGrainingWI.length > 0 &&
      updateYourSelection('otherWISurfaceGraining', surfaceGrainingWI);
    internalGrainingWI.length > 0 &&
      updateYourSelection('internalGraining', internalGrainingWI);

    (tablePerFrom || tablePerTo) &&
      updateYourSelection(
        'tablePer',
        `${tablePerFrom + (tablePerFrom && tablePerTo && '-') + tablePerTo}`
      );
    (crownAngleFrom || crownAngleTo) &&
      updateYourSelection(
        'crownAngle',
        `${
          crownAngleFrom +
          (crownAngleFrom && crownAngleTo && '-') +
          crownAngleTo
        }`
      );
    (lengthFrom || lengthTo) &&
      updateYourSelection(
        'length',
        `${lengthFrom + (lengthFrom && lengthTo && '-') + lengthTo}`
      );
    (pavilionDepthFrom || pavilionDepthTo) &&
      updateYourSelection(
        'pavilionDepth',
        `${
          pavilionDepthFrom +
          (pavilionDepthFrom && pavilionDepthTo && '-') +
          pavilionDepthTo
        }`
      );
    (depthPerFrom || depthPerTo) &&
      updateYourSelection(
        'depthPer',
        `${depthPerFrom + (depthPerFrom && priceRangeTo && '-') + priceRangeTo}`
      );
    (crownHeightFrom || crownHeightTo) &&
      updateYourSelection(
        'crownHeight',
        `${priceRangeFrom + (priceRangeFrom && depthPerTo && '-') + depthPerTo}`
      );

    (widthFrom || widthTo) &&
      updateYourSelection(
        'width',
        `${widthFrom + (widthFrom && widthTo && '-') + widthTo}`
      );
    (lowerHalfFrom || lowerHalfTo) &&
      updateYourSelection(
        'lowerHalf',
        `${lowerHalfFrom + (lowerHalfFrom && lowerHalfTo && '-') + lowerHalfTo}`
      );
    (ratioFrom || ratioTo) &&
      updateYourSelection(
        'ratio',
        `${ratioFrom + (ratioFrom && ratioTo && '-') + ratioTo}`
      );
    (girdlePerFrom || girdlePerTo) &&
      updateYourSelection(
        'girdlePer',
        `${girdlePerFrom + (girdlePerFrom && girdlePerTo && '-') + girdlePerTo}`
      );
    (pavilionAngleFrom || pavilionAngleTo) &&
      updateYourSelection(
        'pavilionAngle',
        `${
          pavilionAngleFrom +
          (pavilionAngleFrom && pavilionAngleTo && '-') +
          pavilionAngleTo
        }`
      );
    (starLengthFrom || starLengthTo) &&
      updateYourSelection(
        'starLength',
        `${
          starLengthFrom +
          (starLengthFrom && starLengthTo && '-') +
          starLengthTo
        }`
      );
  };

  const handleSearch = async () => {
    // if(parseInt(discountFrom)>advanceSearch.discount.range.start && parseInt(discountFrom)<advanceSearch.discount.range.end){
    //   setError
    // }
    if (searchResultCount > 300) {
      setToastErrorMessage(
        `Please modify your search, maximum 300 stones displayed`
      );
      setShowToast(true);
    } else {
      let searchName = '';
      searchName = handlePreviousSearchName(searchName);
      await addPreviousSearch({
        name: searchName,
        diamond_count: searchResultCount,
        meta_data: {
          shape: selectedShape,
          color: selectedWhiteColor,
          clarity: selectedClarity,
          cut: selectedCut,
          lab: selectedLab,
          polish: selectedPolish,
          shade: selectedColor,
        },
        is_deleted: false,
      });
    }
  };

  const handleAddAnotherSearch = () => {
    if (addSearches.length < 5) {
      //call previous serach api
      setAddSearches([...addSearches, 'ooo']);
      handleReset();
    } else {
      setShowToast(true);
      setToastErrorMessage('Add search limit exceeded');
    }
  };

  ///reusable jsx
  const renderSelectionButtons = (
    data: string[],
    className?: string,
    activeStyle?: string,
    relatedState?: string | string[],
    handleChange?: (change: string) => void,
    highlightIndicator?: boolean
  ) => {
    return data.map((data: string) => (
      <CustomSelectionButton
        key={data}
        selectionButtonLabel={data}
        handleClick={handleChange}
        data={data}
        selectionButtonAllStyles={{
          selectionButtonStyle: `${styles.selectionButtonStyles} ${
            className ?? ''
          }   ${
            typeof relatedState !== 'string'
              ? relatedState?.includes(data) && activeStyle
              : relatedState === data && activeStyle
          }`,
          selectionButtonLabelStyle: `${styles.labelDefaultStyle} ${
            highlightIndicator &&
            relatedState?.includes(data) &&
            styles.colorDataActiveStyle
          }`,
        }}
      />
    ));
  };

  const renderParameterFields = () => {
    return parameterData.map((parameter) => (
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
            onChange={(e) => {
              parameter.setParameterState[0](e.target.value);
            }}
            value={parameter.parameterState[0]}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <div className={styles.parameterLabel}>to</div>
          <CustomInputField
            type="number"
            name={`${parameter.parameterState[1]}`}
            onChange={(e) => {
              parameter.setParameterState[1](e.target.value);
            }}
            value={parameter.parameterState[1]}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>
    ));
  };

  const renderOtherParameterFields = () => {
    return otherParameterData.map((other) => (
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
            <div>
              <>
                {renderSelectionButtons(
                  data.element_value,
                  '',
                  styles.activeOtherStyles,
                  data.state,
                  data.handleChange
                )}
              </>
            </div>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div>
      {showToast && <CustomToast message={toastErrorMessage} />}
      <div className="sticky top-0 bg-solitairePrimary mt-16">
        <CustomHeader
          data={{
            headerHeading: ManageLocales('app.advanceSearch.header'),
            headerData: (
              <Tooltip
                tooltipElement={
                  <div className={`${styles.yourSelectionToolTipStyles}`}>
                    {' '}
                    <TooltipIcon />
                    <CustomInputlabel
                      htmlfor="text"
                      label={`${ManageLocales(
                        'app.advanceSearch.yourSelection'
                      )}:`}
                    />{' '}
                    <div className={styles.yourSelectionInHeader}>
                      {selectedShape.length > 0 &&
                        formatSelection(selectedShape)}{' '}
                      {selectedColor.length > 0 &&
                        formatSelection(selectedColor)}{' '}
                      {selectedTingeIntensity.length > 0 &&
                        formatSelection(selectedTingeIntensity)}{' '}
                      {selectedClarity.length > 0 &&
                        formatSelection(selectedClarity)}{' '}
                      {selectedCaratRange.length > 0 &&
                        formatSelection(selectedCaratRange)}
                      {selectedMake && formatSelection(selectedMake)}{' '}
                      {selectedLab.length > 0 && formatSelection(selectedLab)}
                    </div>
                  </div>
                }
                content={
                  <div className={styles.yourSelectionContentContainer}>
                    <CustomInputlabel
                      htmlfor="text"
                      label={`${ManageLocales(
                        'app.advanceSearch.yourSelection'
                      )}:`}
                      overriddenStyles={{
                        label: styles.yourSelectionTooltipHeader,
                      }}
                    />

                    <div className={styles.yourSelectionMainContainer}>
                      {yourSelection?.map((data) => {
                        return (
                          <div
                            key={Object.keys(data)[0]}
                            className={styles.yourSelectionSubContainer}
                          >
                            <div className={styles.labelContainer}>
                              {' '}
                              <CustomInputlabel
                                htmlfor="text"
                                label={Object.keys(data)[0]}
                              />
                              :
                            </div>
                            {/* Check data type of values and accordingly display the content */}
                            {Array.isArray(Object.values(data)[0])
                              ? Object.values(data)[0].toString()
                              : Object.values(data)[0]}
                          </div>
                        );
                      })}{' '}
                    </div>
                  </div>
                }
                handleEvent={handleYourSelection}
                tooltipStyles={{
                  tooltipContainerStyles: styles.tooltipContainerStyles,
                  tooltipContentStyle: styles.yourSelectionTooltipContentStyle,
                }}
              />
            ),
            overriddenStyles: {
              headerDataStyles: styles.yourSelectionHeader,
              headerDataContainerStyles: styles.yourSelectionContainer,
            },
          }}
        />
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          {' '}
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.shape')}
          />
        </div>
        <div className={styles.filterSectionData}>
          <CustomImageTile
            overriddenStyles={imageTileStyles}
            imageTileData={advanceSearch.shape}
            selectedTile={selectedShape}
            handleSelectTile={handleShapeChange}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.caratRange')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          className={`${styles.filterSectionData} ${styles.caratRangeFilter}`}
        >
          <div
            className={`${styles.filterSection} ${styles.rangeFilter}`}
            style={{ width: '420px' }}
          >
            <CustomInputField
              // style={className}
              type="number"
              name="caratRangeFrom"
              onChange={(e) => {
                setCaratRangeFrom(e.target.value);
              }}
              value={caratRangeFrom}
              placeholder={ManageLocales('app.advanceSearch.from')}
              style={{
                input: styles.inputFieldStyles,
              }}
            />
            <CustomInputField
              // style={className}
              type="number"
              name="caratRangeTO"
              onChange={(e) => {
                setCaratRangeTo(e.target.value);
              }}
              value={caratRangeTo}
              placeholder={ManageLocales('app.advanceSearch.to')}
              style={{
                input: styles.inputFieldStyles,
              }}
            />
            <CustomSelectionButton
              selectionButtonLabel={ManageLocales('app.advanceSearch.addCarat')}
              data={`${caratRangeFrom}-${caratRangeTo}`}
              handleClick={handleAddCarat}
              selectionButtonAllStyles={{
                selectionButtonStyle: `${styles.selectionButtonStyles} ${styles.addCarat}`,
              }}
            />
          </div>
          <div>
            {renderSelectionButtons(
              caratRangeData,
              '',
              styles.activeOtherStyles,
              selectedCaratRange,
              handleCaratRangeChange
            )}
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.color')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div className={styles.filterSectionData}>
          <div className={styles.filterSection}>
            {renderSelectionButtons(
              advanceSearch.color,
              styles.colorFilterStyles,
              styles.activeColorStyles,
              selectedColor,
              handleColorChange,
              true
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              {selectedColor.includes('White') &&
                renderSelectionButtons(
                  advanceSearch.white,
                  styles.whiteColorFilterStyle,
                  styles.activeOtherStyles,
                  selectedWhiteColor,
                  handleWhiteFilterChange
                )}
            </div>
            <div>
              {selectedColor.includes('Fancy') &&
                renderSelectionButtons(
                  advanceSearch.fancy,
                  '',
                  styles.activeOtherStyles,
                  selectedFancyColor,
                  handleFancyFilterChange
                )}
            </div>
            <div>
              {selectedColor.includes('Range') &&
                renderSelectionButtons(
                  advanceSearch.range,
                  '',
                  styles.activeOtherStyles,
                  selectedRangeColor,
                  handleRangeFilterChange
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedColor.includes('Fancy') && (
        <>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionLabel}>
              <CustomInputlabel
                htmlfor="text"
                label={ManageLocales('app.advanceSearch.intensity')}
              />
            </div>

            <div
              className={`${styles.filterSection} ${styles.filterSectionData}`}
            >
              {renderSelectionButtons(
                advanceSearch.intensity,
                '',
                styles.activeOtherStyles,
                selectedIntensity,
                handleIntensityChange
              )}
            </div>
          </div>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionLabel}>
              <CustomInputlabel
                htmlfor="text"
                label={ManageLocales('app.advanceSearch.overtone')}
              />
            </div>
            <div className={styles.filterSectionData}>
              <div
                className={`${styles.filterSection} ${styles.filterWrapSection}`}
              >
                {renderSelectionButtons(
                  advanceSearch.overtone,
                  '',
                  styles.activeOtherStyles,
                  selectedOvertone,
                  handleOvertoneChange
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.colorShade')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            advanceSearch.tinge,
            '',
            styles.activeOtherStyles,
            selectedTinge,
            handleTingeChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.colorShadeIntensity')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.tinge_intensity,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedTingeIntensity,
            handleTingeIntensityChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.clarity')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.clarity,
            '',
            styles.activeOtherStyles,
            selectedClarity,
            handleClarityChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.make')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.make,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedMake,
            handleMakeChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.cut')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.cut,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedCut,
            handleCutChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.polish')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.polish,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedPolish,
            handlePolishChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.symmetry')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.symmetry,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedSymmetry,
            handleSymmetryChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.fluorescence')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.fluorescence,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedFluorescence,
            handleFluorescenceChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.Culet')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.culet,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedCulet,
            handleCuletChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.lab')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            advanceSearch.lab,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedLab,
            handleLabChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.HA')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.brilliance,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedHR,
            handleHRChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.brilliance')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.brilliance,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedBrilliance,
            handleBrillianceChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.location')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.location,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedLocation,
            handleLocation
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.origin')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.origin,
            styles.countryOriginStyle,
            styles.activeOtherStyles,
            selectedOrigin,
            handleOrigin
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.discount')}
          />
        </div>
        <div className={`${styles.filterSection} ${styles.rangeFilter}`}>
          <CustomInputField
            // style={className}
            type="number"
            name="discountFrom"
            onChange={(e) => {
              setDiscountFrom(e.target.value);
            }}
            value={discountFrom}
            placeholder={ManageLocales('app.advanceSearch.from')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            // style={className}
            type="number"
            name="discountTo"
            onChange={(e) => {
              setDiscountTo(e.target.value);
            }}
            value={discountTo}
            placeholder={ManageLocales('app.advanceSearch.to')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.priceRange')}
          />
        </div>
        <div className={`${styles.filterSection} ${styles.rangeFilter}`}>
          <CustomInputField
            // style={className}
            type="number"
            name="priceRangeFrom"
            onChange={(e) => {
              setPriceRangeFrom(e.target.value);
            }}
            value={priceRangeFrom}
            placeholder={ManageLocales('app.advanceSearch.from')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            // style={className}
            type="number"
            name="priceRangeTo"
            onChange={(e) => {
              setPriceRangeTo(e.target.value);
            }}
            value={priceRangeTo}
            placeholder={ManageLocales('app.advanceSearch.to')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.pricePerCarat')}
          />
        </div>
        <div className={`${styles.filterSection} ${styles.rangeFilter}`}>
          <CustomInputField
            // style={className}
            type="number"
            name="pricePerCaratFrom"
            onChange={(e) => {
              setPricePerCaratFrom(e.target.value);
            }}
            value={pricePerCaratFrom}
            placeholder={ManageLocales('app.advanceSearch.from')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            type="number"
            name="pricePerCaratTo"
            onChange={(e) => {
              setPricePerCaratTo(e.target.value);
            }}
            value={pricePerCaratTo}
            placeholder={ManageLocales('app.advanceSearch.to')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.parameter')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          className={`${styles.filterSectionData} ${styles.filterWrapSection} `}
        >
          {renderParameterFields()}
        </div>
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales(
              'app.advanceSearch.inclusionsAndOtherParameter'
            )}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div className={styles.filterSectionData}>
          <div className={styles.filterSection}>
            {renderOtherParameterFields()}
          </div>
        </div>
      </div>

      <div className={`${styles.filterSection} ${styles.filterWrapSection}`}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.girdle')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column' }}
          className={styles.filterSectionData}
        >
          <div className={styles.filterSectionData}>
            <div
              className={`${styles.filterSection} ${styles.filterWrapSection}`}
            >
              {renderSelectionButtons(
                advanceSearch.girdle,
                '',
                styles.activeOtherStyles,
                selectedGirdle,
                handleGirdleChange
              )}
            </div>
          </div>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.step1')}
            overriddenStyles={{ label: styles.stepStyle }}
          />
          <div style={{ margin: '10px' }}>
            <CustomRadioButton
              radioData={[
                {
                  id: '1',
                  value: '1',
                  radioButtonLabel: ManageLocales(
                    'app.advanceSearch.radioLabel1'
                  ),
                },
                {
                  id: '2',
                  value: '2',
                  radioButtonLabel: ManageLocales(
                    'app.advanceSearch.radioLabel2'
                  ),
                },
              ]}
              onChange={handleGirdleStepChange}
              radioButtonAllStyles={{
                radioButtonStyle: styles.radioStyle,
                radioLabelStyle: styles.radioLabel,
              }}
            />
          </div>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.step2')}
            overriddenStyles={{ label: styles.stepStyle }}
          />
          <div
            className={`${styles.filterSection} ${styles.filterWrapSection}`}
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {renderSelectionButtons(
              advanceSearch.key_to_symbol,
              '',
              styles.activeOtherStyles,
              selectedGirdleStep2,
              handleGirdleStep2Change
            )}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 bg-solitairePrimary mt-3">
        <CustomFooter
          footerButtonData={[
            {
              id: 1,
              displayButtonLabel: ManageLocales('app.advanceSearch.reset'),
              style: styles.transparent,
              fn: handleReset,
            },
            {
              id: 2,
              displayButtonLabel: `${ManageLocales(
                'app.advanceSearch.saveSearch'
              )}`,
              style: styles.transparent,
            },
            {
              id: 3,
              displayButtonLabel: `${
                searchApiCalled && searchResultCount! === 0
                  ? ManageLocales('app.advanceSearch.addDemand')
                  : ManageLocales('app.advanceSearch.search')
              } ${
                searchResultCount! > 0 ? '(' + searchResultCount + ')' : '  '
              }`,
              style: styles.filled,
              fn: handleSearch,
            },
            {
              id: 4,
              displayButtonLabel: `${ManageLocales(
                'app.advanceSearch.addAnotherSearch'
              )} ${
                addSearches.length > 0 ? '(' + addSearches.length + ')' : '  '
              }`,
              style: ` ${styles.filled} ${styles.anotherSearch}`,
              fn: handleAddAnotherSearch,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdvanceSearch;
