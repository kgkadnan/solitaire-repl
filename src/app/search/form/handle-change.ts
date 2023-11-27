import formStateManagement from './form-state-management';
import advanceSearch from '@/constants/advance-search.json';

const { state, setState } = formStateManagement();
const {
  selectedShape,
  selectedColor,
  selectedWhiteColor,
  selectedFancyColor,
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
  selectedFluorescence,
  selectedCulet,
  selectedGirdle,
  selectedKeyToSymbol,
  selectedLab,
  selectedHR,
  selectedBrilliance,
  selectedLocation,
  selectedOrigin,
  priceRangeFrom,
  priceRangeTo,
  discountFrom,
  discountTo,
  pricePerCaratFrom,
  pricePerCaratTo,
  caratRangeFrom,
  caratRangeTo,
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
} = state;

const {
  setSelectedShape,
  setSelectedColor,
  setSelectedWhiteColor,
  setSelectedFancyColor,
  setSelectedIntensity,
  setSelectedOvertone,
  setSelectedTinge,
  setSelectedTingeIntensity,
  setSelectedClarity,
  setSelectedGirdleStep,
  setSelectedCaratRange,
  setSelectedMake,
  setSelectedCut,
  setSelectedPolish,
  setSelectedSymmetry,
  setSelectedFluorescence,
  setSelectedCulet,
  setSelectedGirdle,
  setSelectedKeyToSymbol,
  setSelectedLab,
  setSelectedHR,
  setSelectedBrilliance,
  setSelectedLocation,
  setSelectedOrigin,
  setPriceRangeFrom,
  setPriceRangeTo,
  setDiscountFrom,
  setDiscountTo,
  setPricePerCaratFrom,
  setPricePerCaratTo,
  setCaratRangeFrom,
  setCaratRangeTo,
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
  setInternalGrainingWI,
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
} = setState;

export const handleBlackTableBIChange = (data: string) => {
  handleFilterChange(data, blackTableBI, setBlackTableBI);
};
export const handleSideBlackBIChange = (data: string) => {
  handleFilterChange(data, sideBlackBI, setSideBlackBI);
};
export const handleOpenCrownBIChange = (data: string) => {
  handleFilterChange(data, openCrownBI, setOpenCrownBI);
};
export const handleOpenTableBIChange = (data: string) => {
  handleFilterChange(data, openTableBI, setOpenTableBI);
};
export const handleOpenPavilionBIChange = (data: string) => {
  handleFilterChange(data, openPavilionBI, setOpenPavilionBI);
};
export const handleMilkyBIChange = (data: string) => {
  handleFilterChange(data, milkyBI, setMilkyBI);
};
export const handleLusterBIChange = (data: string) => {
  handleFilterChange(data, lusterBI, setLusterBI);
};
export const handleEyeCleanBIChange = (data: string) => {
  handleFilterChange(data, eyeCleanBI, setEyeCleanBI);
};
export const handleTableInclusionWIChange = (data: string) => {
  handleFilterChange(data, tableInclusionWI, setTableInclusionWI);
};
export const handleSideInclusionWIChange = (data: string) => {
  handleFilterChange(data, sideInclusionWI, setSideInclusionWI);
};
export const handleNaturalCrownWIChange = (data: string) => {
  handleFilterChange(data, naturalCrownWI, setNaturalCrownWI);
};
export const handleNaturalGirdleWIChange = (data: string) => {
  handleFilterChange(data, naturalGirdleWI, setNaturalGirdleWI);
};
export const handleNaturalPavilionWIChange = (data: string) => {
  handleFilterChange(data, naturalPavilionWI, setNaturalPavilionWI);
};
export const handleSurfaceGrainingIChange = (data: string) => {
  handleFilterChange(data, surfaceGrainingWI, setSurfaceGrainingWI);
};
export const handleinternalGrainingWIChange = (data: string) => {
  handleFilterChange(data, internalGrainingWI, setInternalGrainingWI);
};

export const handleFilterChange = (
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

const compareArrays = (arr1: string[], arr2: string[]) => {
  // Check if the lengths of the arrays are equal
  if (arr1.length !== arr2.length) {
    return false;
  }
  // Convert arrays to sets
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  // Compare sets
  for (const value of set1) {
    if (!set2.has(value)) {
      return false;
    }
  }
  // If the loop completes, sets are equal
  return true;
};

export const handleShapeChange = (shape: string) => {
  let filteredShape: string[] = advanceSearch.shape.map(
    (data) => data.short_name
  );
  if (shape.toLowerCase() === 'all') {
    setSelectedShape(filteredShape);
    if (selectedShape.includes('All')) {
      setSelectedShape([]);
    }
  } else {
    if (selectedShape.includes('All')) {
      let filteredSelectedShape: string[] = selectedShape.filter(
        (data) => data !== 'All' && data !== shape
      );
      setSelectedShape(filteredSelectedShape);
    } else if (
      compareArrays(
        selectedShape.filter((data) => data !== 'All'),
        filteredShape.filter((data) => data !== 'All' && data !== shape)
      )
    ) {
      setSelectedShape(filteredShape);
    } else {
      handleFilterChange(shape, selectedShape, setSelectedShape);
    }
  }
};
export const handleColorChange = (data: string) => {
  if (selectedColor !== data) {
    setSelectedColor(data);
  } else {
    setSelectedColor('');
  }
  setSelectedWhiteColor([]);
  setSelectedFancyColor([]);
};
export const handleWhiteFilterChange = (data: string) => {
  handleFilterChange(data, selectedWhiteColor, setSelectedWhiteColor);
};
export const handleFancyFilterChange = (data: string) => {
  handleFilterChange(data, selectedFancyColor, setSelectedFancyColor);
};
export const handleIntensityChange = (data: string) => {
  handleFilterChange(data, selectedIntensity, setSelectedIntensity);
};
export const handleOvertoneChange = (data: string) => {
  handleFilterChange(data, selectedOvertone, setSelectedOvertone);
};
export const handleTingeChange = (data: string) => {
  handleFilterChange(data, selectedTinge, setSelectedTinge);
};
export const handleTingeIntensityChange = (data: string) => {
  handleFilterChange(data, selectedTingeIntensity, setSelectedTingeIntensity);
};
export const handleClarityChange = (data: string) => {
  handleFilterChange(data, selectedClarity, setSelectedClarity);
};
export const handleCaratRangeChange = (data: string) => {
  console.log('Data', data, selectedCaratRange);
  handleFilterChange(data, selectedCaratRange, setSelectedCaratRange);
};

export const handleMakeChange = (data: string) => {
  if (data.toLowerCase() === '3ex') {
    if (data !== selectedMake) {
      setSelectedCut(['EX']);
      setSelectedPolish(['EX']);
      setSelectedSymmetry(['EX']);
    } else {
      setSelectedCut([]);
      setSelectedPolish([]);
      setSelectedSymmetry([]);
    }
    setSelectedFluorescence(selectedFluorescence.filter((e) => e !== 'NON'));
  }
  if (data.toLowerCase() === '3ex-non') {
    if (data !== selectedMake) {
      setSelectedCut(['EX']);
      setSelectedPolish(['EX']);
      setSelectedSymmetry(['EX']);
      setSelectedFluorescence(['NON']);
    } else {
      setSelectedCut([]);
      setSelectedPolish([]);
      setSelectedSymmetry([]);
      setSelectedFluorescence([]);
    }
  }
  if (data.toLowerCase() === '3vg+') {
    if (data !== selectedMake) {
      setSelectedCut(['EX', 'VG']);
      setSelectedPolish(['EX', 'VG']);
      setSelectedSymmetry(['EX', 'VG']);
    } else {
      setSelectedCut([]);
      setSelectedPolish([]);
      setSelectedSymmetry([]);
    }
    setSelectedFluorescence(selectedFluorescence.filter((e) => e !== 'NON'));
  }
  setSelectedMake(data === selectedMake ? '' : data);
};
export const handleFilterChangeAndMakeSelection = (
  data: string,
  selectedFilter: string[],
  setSelectedFilter: React.Dispatch<React.SetStateAction<string[]>>,
  firstCriteria: string[],
  secondCriteria: string[]
) => {
  handleFilterChange(data, selectedFilter, setSelectedFilter);
  let temp: string[] = [...selectedFilter];
  const index = temp.indexOf(data);
  if (index !== -1) {
    temp.splice(index, 1);
  } else {
    temp.push(data);
  }
  if (
    temp.toString() === 'EX' &&
    firstCriteria.toString() === 'EX' &&
    secondCriteria.toString() === 'EX'
  ) {
    if (selectedFluorescence.toString() === 'NON') {
      setSelectedMake('3EX-Non');
    } else {
      setSelectedMake('3EX');
    }
  } else if (
    (firstCriteria.toString() === 'EX,VG' ||
      firstCriteria.toString() === 'VG,EX') &&
    (secondCriteria.toString() === 'EX,VG' ||
      secondCriteria.toString() === 'VG,EX') &&
    (temp.toString() === 'EX,VG' || temp.toString() === 'VG,EX')
  ) {
    setSelectedMake('3VG+');
  } else {
    setSelectedMake('');
  }
};
export const handleCutChange = (data: string) => {
  handleFilterChangeAndMakeSelection(
    data,
    selectedCut,
    setSelectedCut,
    selectedPolish,
    selectedSymmetry
  );
};
export const handlePolishChange = (data: string) => {
  handleFilterChangeAndMakeSelection(
    data,
    selectedPolish,
    setSelectedPolish,
    selectedCut,
    selectedSymmetry
  );
};
export const handleSymmetryChange = (data: string) => {
  handleFilterChangeAndMakeSelection(
    data,
    selectedSymmetry,
    setSelectedSymmetry,
    selectedCut,
    selectedPolish
  );
};
export const handleFluorescenceChange = (data: string) => {
  handleFilterChange(data, selectedFluorescence, setSelectedFluorescence);
  let temp: string[] = selectedFluorescence;
  const index = temp.indexOf(data);
  if (index !== -1) {
    temp.splice(index, 1);
  } else {
    temp.push(data);
  }
  if (
    selectedPolish.toString() === 'EX' &&
    selectedCut.toString() === 'EX' &&
    selectedSymmetry.toString() === 'EX'
  ) {
    if (temp.toString() === 'NON') {
      setSelectedMake('3EX-Non');
    } else {
      setSelectedMake('3EX');
    }
  } else if (
    (selectedCut.toString() === 'EX,VG' ||
      selectedCut.toString() === 'VG,EX') &&
    (selectedPolish.toString() === 'EX,VG' ||
      selectedPolish.toString() === 'VG,EX') &&
    (selectedSymmetry.toString() === 'EX,VG' ||
      selectedSymmetry.toString() === 'VG,EX') &&
    temp.length === 0
  ) {
    setSelectedMake('3VG+');
  } else {
    setSelectedMake('');
  }
};
export const handleCuletChange = (data: string) => {
  handleFilterChange(data, selectedCulet, setSelectedCulet);
};
export const handleGirdleChange = (data: string) => {
  handleFilterChange(data, selectedGirdle, setSelectedGirdle);
};
export const handleKeyToSymbolChange = (comment: string) => {
  if (comment.toLowerCase() === 'all') {
    setSelectedKeyToSymbol(advanceSearch.key_to_symbol);
    if (selectedKeyToSymbol.includes('All')) {
      setSelectedKeyToSymbol([]);
    }
  } else {
    if (selectedKeyToSymbol.includes('All')) {
      let filteredSelectedShape: string[] = selectedKeyToSymbol.filter(
        (data) => data !== 'All' && data !== comment
      );
      setSelectedKeyToSymbol(filteredSelectedShape);
    } else if (
      compareArrays(
        selectedKeyToSymbol.filter((data) => data !== 'All'),
        advanceSearch.key_to_symbol.filter(
          (data) => data !== 'All' && data !== comment
        )
      )
    ) {
      setSelectedKeyToSymbol(advanceSearch.key_to_symbol);
    } else {
      handleFilterChange(comment, selectedKeyToSymbol, setSelectedKeyToSymbol);
    }
  }
};
export const handleLabChange = (data: string) => {
  handleFilterChange(data, selectedLab, setSelectedLab);
};
export const handleHRChange = (data: string) => {
  handleFilterChange(data, selectedHR, setSelectedHR);
};
export const handleBrillianceChange = (data: string) => {
  handleFilterChange(data, selectedBrilliance, setSelectedBrilliance);
};
export const handleLocation = (data: string) => {
  handleFilterChange(data, selectedLocation, setSelectedLocation);
};
export const handleOrigin = (data: string) => {
  handleFilterChange(data, selectedOrigin, setSelectedOrigin);
};
export const handleGirdleStepChange = (radioValue: string) => {
  setSelectedGirdleStep(radioValue);
};
