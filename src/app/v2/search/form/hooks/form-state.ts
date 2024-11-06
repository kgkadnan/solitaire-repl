import { useState } from 'react';

const useFormStateManagement = () => {
  const [isSliderActive, setIsSliderActive] = useState(false);

  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('white');

  const [selectedWhiteColor, setSelectedWhiteColor] = useState<string[]>([]);
  const [selectedFancyColor, setSelectedFancyColor] = useState<any>([]);
  const [selectedIntensity, setSelectedIntensity] = useState<any>([]);
  const [selectedOvertone, setSelectedOvertone] = useState<any>([]);
  const [selectedShade, setSelectedShade] = useState<string[]>([]);
  const [selectedClarity, setSelectedClarity] = useState<string[]>([]);
  const [, setSelectedGirdleStep] = useState<string>();
  const [selectedCaratRange, setSelectedCaratRange] = useState<string[]>([]);
  const [caratRangeSelectionTemp, setCaratRangeSelectionTemp] = useState<
    string[]
  >([]);
  const [caratRangeSelection, setCaratRangeSelection] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedCut, setSelectedCut] = useState<string[]>([]);
  const [selectedPolish, setSelectedPolish] = useState<string[]>([]);
  const [selectedSymmetry, setSelectedSymmetry] = useState<string[]>([]);
  const [selectedFluorescence, setSelectedFluorescence] = useState<string[]>(
    []
  );
  const [selectedCulet, setSelectedCulet] = useState<string[]>([]);

  const [selectedKeyToSymbol, setSelectedKeyToSymbol] = useState<string[]>([]);
  const [selectionChecked, setSelectionChecked] = useState<string>('contain');

  const [selectedLab, setSelectedLab] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<string[]>([]);
  const [amountRangeMin, setAmountRangeMin] = useState<string>('');
  const [amountRangeMax, setAmountRangeMax] = useState<string>('');
  const [discountMin, setDiscountMin] = useState<string>('');
  const [discountMax, setDiscountMax] = useState<string>('');
  const [pricePerCaratMin, setPricePerCaratMin] = useState<string>('');
  const [pricePerCaratMax, setPricePerCaratMax] = useState<string>('');
  const [caratRangeFrom, setCaratRangeFrom] = useState<string>('');
  const [caratRangeTo, setCaratRangeTo] = useState<string>('');
  const [caratMin, setCaratMin] = useState<string>('');
  const [caratMax, setCaratMax] = useState<string>('');
  //other parameter Inclsuion state
  const [blackTable, setBlackTable] = useState<string[]>([]);
  const [sideBlack, setSideBlack] = useState<string[]>([]);
  const [openCrown, setOpenCrown] = useState<string[]>([]);
  const [openTable, setOpenTable] = useState<string[]>([]);
  const [openPavilion, setOpenPavilion] = useState<string[]>([]);
  const [milky, setMilky] = useState<string[]>([]);
  const [luster, setLuster] = useState<string[]>([]);
  const [eyeClean, setEyeClean] = useState<string[]>([]);
  const [tableInclusion, setTableInclusion] = useState<string[]>([]);
  const [sideInclusion, setSideInclusion] = useState<string[]>([]);
  const [naturalCrown, setNaturalCrown] = useState<string[]>([]);
  const [naturalGirdle, setNaturalGirdle] = useState<string[]>([]);
  const [naturalPavilion, setNaturalPavilion] = useState<string[]>([]);
  const [surfaceGraining, setSurfaceGraining] = useState<string[]>([]);
  const [internalGraining, setInternalGraining] = useState<string[]>([]);
  //parameter state
  const [tablePerMin, setTablePerMin] = useState<string>('');
  const [tablePerMax, setTablePerMax] = useState<string>('');
  const [depthMin, setDepthMin] = useState<string>('');
  const [depthMax, setDepthMax] = useState<string>('');
  const [crownAngleMax, setCrownAngleMax] = useState<string>('');
  const [crownAngleMin, setCrownAngleMin] = useState<string>('');
  const [lengthMax, setLengthMax] = useState<string>('');
  const [lengthMin, setLengthMin] = useState<string>('');
  const [pavilionHeightMax, setPavilionHeightMax] = useState<string>('');
  const [pavilionHeightMin, setPavilionHeightMin] = useState<string>('');
  const [depthPerMax, setDepthPerMax] = useState<string>('');
  const [depthPerMin, setDepthPerMin] = useState<string>('');
  const [crownHeightMax, setCrownHeightMax] = useState<string>('');
  const [crownHeightMin, setCrownHeightMin] = useState<string>('');
  const [widthMax, setWidthMax] = useState<string>('');
  const [widthMin, setWidthMin] = useState<string>('');
  const [lowerHalfMax, setLowerHalfMax] = useState<string>('');
  const [lowerHalfMin, setLowerHalfMin] = useState<string>('');
  const [ratioMax, setRatioMax] = useState<string>('');
  const [ratioMin, setRatioMin] = useState<string>('');
  const [girdlePerMax, setGirdlePerMax] = useState<string>('');
  const [girdlePerMin, setGirdlePerMin] = useState<string>('');
  const [selectedGirdle, setSelectedGirdle] = useState<string[]>([]);
  const [pavilionAngleMax, setPavilionAngleMax] = useState<string>('');
  const [pavilionAngleMin, setPavilionAngleMin] = useState<string>('');
  const [starLengthMax, setStarLengthMax] = useState<string>('');
  const [starLengthMin, setStarLengthMin] = useState<string>('');

  const [caratRangeData, setCaratRangeData] = useState<string[]>();

  const [showOnlyWithVideo, setShowOnlyWithVideo] = useState(false);
  return {
    state: {
      isSliderActive,
      selectedShape,
      selectedWhiteColor,
      selectedFancyColor,
      selectedIntensity,
      selectedOvertone,
      selectedShade,
      selectedClarity,
      selectedCaratRange,
      selectedMake,
      selectedCut,
      selectedPolish,
      selectedSymmetry,
      selectedFluorescence,
      selectedCulet,
      selectedKeyToSymbol,
      selectedLab,
      selectedLocation,
      selectedOrigin,
      amountRangeMin,
      amountRangeMax,
      discountMin,
      discountMax,
      caratMax,
      caratMin,
      caratRangeSelectionTemp,
      caratRangeSelection,
      pricePerCaratMin,
      pricePerCaratMax,
      caratRangeFrom,
      caratRangeTo,
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
      internalGraining,
      tablePerMin,
      tablePerMax,
      depthMin,
      depthMax,
      crownAngleMax,
      crownAngleMin,
      lengthMax,
      lengthMin,
      pavilionHeightMax,
      pavilionHeightMin,
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
      selectedColor,
      selectedGirdle,
      selectionChecked,
      showOnlyWithVideo
    },
    setState: {
      setIsSliderActive,
      setSelectedShape,
      setSelectedWhiteColor,
      setSelectedFancyColor,
      setSelectedIntensity,
      setSelectedOvertone,
      setSelectedShade,
      setSelectedClarity,
      setSelectedGirdleStep,
      setSelectedCaratRange,
      setSelectedMake,
      setSelectedCut,
      setSelectedPolish,
      setSelectedSymmetry,
      setSelectedFluorescence,
      setSelectedCulet,
      setSelectedKeyToSymbol,
      setSelectedLab,
      setSelectedLocation,
      setSelectedOrigin,
      setAmountRangeMin,
      setAmountRangeMax,
      setDiscountMin,
      setDiscountMax,
      setCaratMin,
      setCaratMax,
      setCaratRangeSelectionTemp,
      setCaratRangeSelection,
      setPricePerCaratMin,
      setPricePerCaratMax,
      setCaratRangeFrom,
      setCaratRangeTo,
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
      setTablePerMin,
      setTablePerMax,
      setDepthMin,
      setDepthMax,
      setCrownAngleMax,
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
      setSelectedColor,
      setSelectedGirdle,
      setSelectionChecked,
      setShowOnlyWithVideo
    },
    carat: {
      caratRangeData: caratRangeData,
      setCaratRangeData: setCaratRangeData
    }
  };
};
export default useFormStateManagement;
