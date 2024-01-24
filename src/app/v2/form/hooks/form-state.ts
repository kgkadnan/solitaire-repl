import { useState } from 'react';

const useFormStateManagement = () => {
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');

  const [selectedWhiteColor, setSelectedWhiteColor] = useState<string[]>([]);
  const [selectedFancyColor, setSelectedFancyColor] = useState<string>('');
  const [selectedIntensity, setSelectedIntensity] = useState<string>('');
  const [selectedOvertone, setSelectedOvertone] = useState<string>('');
  const [selectedShade, setSelectedShade] = useState<string[]>([]);
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

  const [selectedKeyToSymbol, setSelectedKeyToSymbol] = useState<string[]>([]);
  const [selectedLab, setSelectedLab] = useState<string[]>([]);
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
  const [girdleFrom, setGirdleFrom] = useState<string>('');
  const [girdleTo, setGirdleTo] = useState<string>('');
  const [pavilionAngleFrom, setPavilionAngleFrom] = useState<string>('');
  const [pavilionAngleTo, setPavilionAngleTo] = useState<string>('');
  const [starLengthFrom, setStarLengthFrom] = useState<string>('');
  const [starLengthTo, setStarLengthTo] = useState<string>('');
  const [caratRangeData, setCaratRangeData] = useState<string[]>();
  return {
    state: {
      girdleFrom,
      girdleTo,
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
      priceRangeFrom,
      priceRangeTo,
      discountFrom,
      discountTo,
      pricePerCaratFrom,
      pricePerCaratTo,
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
      selectedColor
    },
    setState: {
      setGirdleFrom,
      setGirdleTo,
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
      setPriceRangeFrom,
      setPriceRangeTo,
      setDiscountFrom,
      setDiscountTo,
      setPricePerCaratFrom,
      setPricePerCaratTo,
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
      setSelectedColor
    },
    carat: {
      caratRangeData: caratRangeData,
      setCaratRangeData: setCaratRangeData
    }
  };
};
export default useFormStateManagement;
