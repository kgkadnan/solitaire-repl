// Define a function to generate query parameters based on the provided state
export const generateQueryParams = (state: any) => {
  // Destructure values from the state object
  const {
    selectedShape,
    selectedFancyColor,
    selectedIntensity,
    selectedOvertone,
    selectedTinge,
    selectedClarity,
    selectedCaratRange,
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
    selectedColor
  } = state;

  // Initialize an empty object to store query parameters
  const queryParams: any = {};

  // Check if a specific property exists in the state and add it to the queryParams object
  selectedShape?.length !== 0 && (queryParams['shape'] = selectedShape);
  selectedColor?.length !== 0 && (queryParams['color'] = selectedColor);
  selectedFancyColor?.length !== 0 &&
    (queryParams['fancy_color'] = selectedFancyColor);
  selectedIntensity?.length !== 0 &&
    (queryParams['fancy_intensity'] = selectedIntensity);
  selectedOvertone?.length !== 0 &&
    (queryParams['fancy_overtone'] = selectedOvertone);
  selectedTinge?.length !== 0 && (queryParams['color_shade'] = selectedTinge);
  selectedClarity?.length !== 0 && (queryParams['clarity'] = selectedClarity);
  if (selectedCaratRange && selectedCaratRange.length > 0) {
    const caratRanges = selectedCaratRange.map((range: string) => {
      const [minStr, maxStr] = range.split('-');
      const min = parseFloat(minStr);
      const max = parseFloat(maxStr);
      return { lte: max, gte: min };
    });
    queryParams['carat'] = caratRanges;
  }
  selectedCut?.length !== 0 && (queryParams['cut'] = selectedCut);
  selectedPolish?.length !== 0 && (queryParams['polish'] = selectedPolish);
  selectedSymmetry?.length !== 0 &&
    (queryParams['symmetry'] = selectedSymmetry);
  selectedFluorescence?.length !== 0 &&
    (queryParams['fluorescence'] = selectedFluorescence);
  selectedCulet?.length !== 0 && (queryParams['culet'] = selectedCulet);
  selectedGirdle?.length !== 0 && (queryParams['girdle'] = selectedGirdle);
  selectedKeyToSymbol?.length !== 0 &&
    (queryParams['key_to_symbol'] = selectedKeyToSymbol);
  selectedLab?.length !== 0 && (queryParams['lab'] = selectedLab);
  selectedLocation?.length !== 0 &&
    (queryParams['location'] = selectedLocation);
  selectedOrigin?.length !== 0 &&
    (queryParams['origin_country'] = selectedOrigin);
  priceRangeFrom &&
    priceRangeTo &&
    (queryParams['price_range'] = {
      lte: priceRangeTo,
      gte: priceRangeFrom
    });
  discountFrom &&
    discountTo &&
    (queryParams['discount'] = {
      lte: discountTo,
      gte: discountFrom
    });
  pricePerCaratFrom &&
    pricePerCaratTo &&
    (queryParams['price_per_carat'] = {
      lte: pricePerCaratTo,
      gte: pricePerCaratFrom
    });
  blackTableBI?.length !== 0 && (queryParams['table_black'] = blackTableBI);
  sideBlackBI?.length !== 0 && (queryParams['side_black'] = sideBlackBI);
  openCrownBI?.length !== 0 && (queryParams['crown_open'] = openCrownBI);
  openTableBI?.length !== 0 && (queryParams['table_open'] = openTableBI);
  openPavilionBI?.length !== 0 &&
    (queryParams['pavilion_open'] = openPavilionBI);
  milkyBI?.length !== 0 && (queryParams['milky'] = milkyBI);
  lusterBI?.length !== 0 && (queryParams['luster'] = lusterBI);
  eyeCleanBI?.length !== 0 && (queryParams['eye_clean'] = eyeCleanBI);
  selectedCulet?.length !== 0 && (queryParams['culet'] = selectedCulet);
  tableInclusionWI?.length !== 0 &&
    (queryParams['table_inclusion'] = tableInclusionWI);
  sideInclusionWI?.length !== 0 &&
    (queryParams['side_inclusion'] = sideInclusionWI);
  naturalCrownWI?.length !== 0 &&
    (queryParams['natural_crown'] = naturalCrownWI);
  naturalGirdleWI?.length !== 0 &&
    (queryParams['natural_girdle'] = naturalGirdleWI);
  naturalPavilionWI?.length !== 0 &&
    (queryParams['natural_pavilion'] = naturalPavilionWI);
  surfaceGrainingWI?.length !== 0 &&
    (queryParams['surface_graining'] = surfaceGrainingWI);
  internalGrainingWI?.length !== 0 &&
    (queryParams['internal_graining'] = internalGrainingWI);
  tablePerFrom &&
    tablePerTo &&
    (queryParams['table_percentage'] = {
      lte: tablePerTo,
      gte: tablePerFrom
    });
  depthFrom &&
    depthTo &&
    (queryParams['depth'] = {
      lte: depthTo,
      gte: depthFrom
    });
  crownAngleFrom &&
    crownAngleTo &&
    (queryParams['crown_angle'] = {
      lte: crownAngleTo,
      gte: crownAngleFrom
    });
  lengthFrom &&
    lengthTo &&
    (queryParams['length'] = {
      lte: lengthTo,
      gte: lengthFrom
    });
  pavilionDepthFrom &&
    pavilionDepthTo &&
    (queryParams['pavilion_height'] = {
      lte: pavilionDepthTo,
      gte: pavilionDepthFrom
    });
  depthPerFrom &&
    depthPerTo &&
    (queryParams['depth_percentage'] = {
      lte: depthPerTo,
      gte: depthPerFrom
    });
  crownHeightFrom &&
    crownHeightTo &&
    (queryParams['crown_height'] = {
      lte: crownHeightTo,
      gte: crownHeightFrom
    });
  widthFrom &&
    widthTo &&
    (queryParams['width'] = {
      lte: widthTo,
      gte: widthFrom
    });
  lowerHalfFrom &&
    lowerHalfTo &&
    (queryParams['lower_half'] = {
      lte: lowerHalfTo,
      gte: lowerHalfFrom
    });
  ratioFrom &&
    ratioTo &&
    (queryParams['ratio'] = {
      lte: ratioTo,
      gte: ratioFrom
    });
  girdlePerFrom &&
    girdlePerTo &&
    (queryParams['girdle_percentage'] = {
      lte: girdlePerTo,
      gte: girdlePerFrom
    });
  pavilionAngleFrom &&
    pavilionAngleTo &&
    (queryParams['pavilion_angle'] = {
      lte: pavilionAngleTo,
      gte: pavilionAngleFrom
    });
  starLengthFrom &&
    starLengthTo &&
    (queryParams['star_length'] = {
      lte: starLengthTo,
      gte: starLengthFrom
    });
  return queryParams;
};
