export const setModifySearch = (data: any, setState: any, carat: any) => {
  const { setCaratRangeData } = carat;
  const {
    setSelectedShape,
    setSelectedOvertone,
    setSelectedTinge,
    setSelectedClarity,
    setSelectedCaratRange,
    setSelectedCut,
    setSelectedPolish,
    setSelectedSymmetry,
    setSelectedFluorescence,
    setSelectedCulet,
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
    setGirdleFrom,
    setGirdleTo
  } = setState;

  data?.shape && setSelectedShape(data?.shape);
  data?.carat &&
    setSelectedCaratRange(
      data?.carat.map(
        (carat: any) => `${carat?.gte.toFixed(2)}-${carat?.lte.toFixed(2)}`
      )
    );
  data?.carat && setCaratRangeData;
  data?.clarity && setSelectedClarity(data?.clarity);
  data?.cut && setSelectedCut(data?.cut);
  data?.lab && setSelectedLab(data?.lab);
  data?.culet && setSelectedCulet(data?.culet);
  data?.polish && setSelectedPolish(data?.polish);
  data?.location && setSelectedLocation(data?.location);
  data?.HA && setSelectedHR(data?.HA);
  data?.symmetry && setSelectedSymmetry(data?.symmetry);
  data?.fluoroscence && setSelectedFluorescence(data?.fluoroscence);
  data?.country_of_origin && setSelectedOrigin(data?.country_of_origin);
  data?.color_shade && setSelectedTinge(data?.color_shade);
  data?.overtone && setSelectedOvertone(data?.overtone);
  data?.brilliance && setSelectedBrilliance(data?.brilliance);
  data?.priceRange && setPriceRangeFrom(data?.priceRange?.gte);
  data?.priceRange && setPriceRangeTo(data?.priceRange?.lte);
  data?.discount && setDiscountFrom(data?.discount?.gte);
  data?.discount && setDiscountTo(data?.discount?.lte);
  data?.pricePerCarat && setPricePerCaratFrom(data?.pricePerCarat?.gte);
  data?.pricePerCarat && setPricePerCaratTo(data?.pricePerCarat?.lte);
  //measurements States
  data?.depth && setDepthFrom(data?.depth?.gte);
  data?.depth && setDepthTo(data?.depth?.lte);
  data?.ratio && setRatioFrom(data?.ratio?.gte);
  data?.ratio && setRatioTo(data?.ratio?.lte);
  data?.width && setWidthFrom(data?.width?.gte);
  data?.width && setWidthTo(data?.width?.lte);
  data?.length && setLengthFrom(data?.length?.gte);
  data?.length && setLengthTo(data?.length?.lte);
  data?.table_per && setTablePerFrom(data?.table_per?.gte);
  data?.table_per && setTablePerTo(data?.table_per?.lte);
  data?.girdle_per && setGirdlePerFrom(data?.girdle_per?.gte);
  data?.girdle_per && setGirdlePerTo(data?.girdle_per?.lte);
  data?.depth_per && setDepthPerFrom(data?.depth_per?.gte);
  data?.depth_per && setDepthPerTo(data?.depth_per?.lte);
  data?.lower_half && setLowerHalfFrom(data?.lower_half?.gte);
  data?.lower_half && setLowerHalfTo(data?.lower_half?.lte);
  data?.crown_angle && setCrownAngleFrom(data?.crown_angle?.gte);
  data?.crown_angle && setCrownAngleTo(data?.crown_angle?.lte);
  data?.star_length && setStarLengthFrom(data?.star_length?.gte);
  data?.star_length && setStarLengthTo(data?.star_length?.lte);
  data?.crown_height && setCrownHeightFrom(data?.crown_height?.gte);
  data?.crown_height && setCrownHeightTo(data?.crown_height?.lte);
  data?.pavilion_angle && setPavilionAngleFrom(data?.pavilion_angle?.gte);
  data?.pavilion_angle && setPavilionAngleTo(data?.pavilion_angle?.lte);
  data?.pavilion_height && setPavilionDepthFrom(data?.pavilion_height?.gte);
  data?.pavilion_height && setPavilionDepthTo(data?.pavilion_height?.lte);
  //inclusion_details States
  data?.milky && setMilkyBI(data?.milky);
  data?.luster && setLusterBI(data?.luster);
  data?.eye_clean && setEyeCleanBI(data?.eye_clean);
  data?.crown_open && setOpenCrownBI(data?.crown_open);
  data?.table_open && setOpenTableBI(data?.table_open);
  data?.side_table && setSideBlackBI(data?.side_table);
  data?.table_black && setBlackTableBI(data?.table_black);
  data?.natural_crown && setNaturalCrownWI(data?.natural_crown);
  data?.pavilion_open && setOpenPavilionBI(data?.pavilion_open);
  data?.natural_girdle && setNaturalGirdleWI(data?.natural_girdle);
  data?.side_inclusion && setSideInclusionWI(data?.side_inclusion);
  data?.table_inclusion && setTableInclusionWI(data?.table_inclusion);
  data?.natural_pavilion && setNaturalPavilionWI(data?.natural_pavilion);
  data?.surface_graining && setSurfaceGrainingWI(data?.surface_graining);
  data?.internal_graining && setInternalGrainingWI(data?.internal_graining);
  //other_information States
  data?.girdle && setGirdleFrom(data?.girdle?.gte);
  data?.girdle && setGirdleTo(data?.girdle?.lte);
  data?.key_to_symbol && setSelectedKeyToSymbol(data?.key_to_symbol);
};
