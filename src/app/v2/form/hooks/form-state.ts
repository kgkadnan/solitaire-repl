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
  const [blackTableBI, setBlackTable] = useState<string[]>([]);
  const [sideBlackBI, setSideBlack] = useState<string[]>([]);
  const [openCrownBI, setOpenCrown] = useState<string[]>([]);
  const [openTableBI, setOpenTable] = useState<string[]>([]);
  const [openPavilionBI, setOpenPavilion] = useState<string[]>([]);
  const [milkyBI, setMilky] = useState<string[]>([]);
  const [lusterBI, setLuster] = useState<string[]>([]);
  const [eyeCleanBI, setEyeClean] = useState<string[]>([]);
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
  const [selectedGirdle, setSelectedGirdle] = useState<string[]>([]);

  const [pavilionAngleFrom, setPavilionAngleFrom] = useState<string>('');
  const [pavilionAngleTo, setPavilionAngleTo] = useState<string>('');
  const [starLengthFrom, setStarLengthFrom] = useState<string>('');
  const [starLengthTo, setStarLengthTo] = useState<string>('');
  const [caratRangeData, setCaratRangeData] = useState<string[]>();
  return {
    state: {
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
      selectedColor,
      selectedGirdle
    },
    setState: {
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
      setSelectedColor,
      setSelectedGirdle
    },
    carat: {
      caratRangeData: caratRangeData,
      setCaratRangeData: setCaratRangeData
    }
  };
};
export default useFormStateManagement;
