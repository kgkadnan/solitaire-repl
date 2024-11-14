export const handleReset = (setState: any, errorSetState: any) => {
  const {
    setSelectedShape,
    setSelectedWhiteColor,
    setSelectedFancyColor,
    setSelectedIntensity,
    setSelectedOvertone,
    setSelectedShade,
    setCaratRangeSelectionTemp,
    setCaratRangeSelection,
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
    setSelectedGirdle,
    setShowOnlyWithVideo
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
    setStarLengthError,
    setGirdleError,
    setCaratError,
    setDiscountError,
    setPricePerCaratError,
    setAmountRangeError
  } = errorSetState;

  setSelectedShape([]);
  setSelectedWhiteColor([]);
  setSelectedFancyColor('');
  setSelectedIntensity('');
  setSelectedOvertone('');
  setSelectedShade([]);
  setSelectedClarity([]);
  setSelectedCaratRange([]);
  setSelectedMake('');
  setSelectedCut([]);
  setSelectedPolish([]);
  setSelectedSymmetry([]);
  setSelectedFluorescence([]);
  setSelectedLab([]);
  setCaratRangeSelectionTemp([]);
  setCaratRangeSelection([]);
  setAmountRangeMin('');
  setAmountRangeMax('');
  setDiscountMin('');
  setDiscountMax('');
  setCaratMin('');
  setCaratMax('');
  setPricePerCaratMin('');
  setPricePerCaratMax('');
  setCaratRangeFrom('');
  setCaratRangeTo('');
  setTablePerMin('');
  setTablePerMax('');
  setDepthMin('');
  setDepthMax('');
  setCrownAngleMax('');
  setCrownAngleMin('');
  setLengthMax('');
  setLengthMin('');
  setPavilionHeightMax('');
  setPavilionHeightMin('');
  setDepthPerMax('');
  setDepthPerMin('');
  setCrownHeightMax('');
  setCrownHeightMin('');
  setWidthMax('');
  setWidthMin('');
  setLowerHalfMax('');
  setLowerHalfMin('');
  setRatioMax('');
  setRatioMin('');
  setGirdlePerMax('');
  setGirdlePerMin('');
  setPavilionAngleMax('');
  setPavilionAngleMin('');
  setStarLengthMax('');
  setStarLengthMin('');
  setBlackTable([]);
  setSideBlack([]);
  setOpenCrown([]);
  setOpenTable([]);
  setOpenPavilion([]);
  setMilky([]);
  setLuster([]);
  setEyeClean([]);
  setTableInclusion([]);
  setSideInclusion([]);
  setNaturalCrown([]);
  setNaturalGirdle([]);
  setNaturalPavilion([]);
  setSurfaceGraining([]);
  setInternalGraining([]);
  setSelectedLocation([]);
  setSelectedOrigin([]);
  setSelectedCulet([]);
  setSelectedKeyToSymbol([]);
  setSelectedGirdleStep('');
  setSelectedGirdle([]);
  setShowOnlyWithVideo(false);

  //Empty Error States
  setTablePerError('');
  setDepthPerError('');
  setRatioError('');
  setLengthError('');
  setWidthError('');
  setDepthError('');
  setCrownAngleError('');
  setCrownHeightError('');
  setGirdlePerError('');
  setPavilionAngleError('');
  setPavilionHeightError('');
  setLowerHalfError('');
  setStarLengthError('');
  setGirdleError('');
  setCaratError('');
  setDiscountError('');
  setPricePerCaratError('');
  setAmountRangeError('');
};
