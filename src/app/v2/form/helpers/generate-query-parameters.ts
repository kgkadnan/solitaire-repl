interface IState {
  selectedShape: string[];
  selectedColor: string;
  selectedWhiteColor: string[];
  selectedFancyColor: string;
  selectedIntensity: string;
  selectedOvertone: string;
  selectedShade: string[];
  selectedClarity: string[];
  selectedCaratRange: string[];
  selectedMake: string;
  selectedCut: string[];
  selectedPolish: string[];
  selectedSymmetry: string[];
  selectedFluorescence: string[];
  selectedCulet: string[];
  selectedKeyToSymbol: string[];
  selectedLab: string[];
  selectedLocation: string[];
  selectedOrigin: string[];
  amountRangeMin: string;
  amountRangeMax: string;
  discountMin: string;
  discountMax: string;
  pricePerCaratMin: string;
  pricePerCaratMax: string;
  caratRangeFrom: string;
  caratRangeTo: string;
  blackTable: string[];
  sideBlack: string[];
  openCrown: string[];
  openTable: string[];
  openPavilion: string[];
  milky: string[];
  luster: string[];
  eyeClean: string[];
  tableInclusion: string[];
  sideInclusion: string[];
  naturalCrown: string[];
  naturalGirdle: string[];
  naturalPavilion: string[];
  surfaceGraining: string[];
  internalGraining: string[];
  tablePerFrom: string;
  tablePerTo: string;
  depthTo: string;
  depthFrom: string;
  crownAngleFrom: string;
  crownAngleTo: string;
  lengthFrom: string;
  lengthTo: string;
  pavilionDepthFrom: string;
  pavilionDepthTo: string;
  depthPerFrom: string;
  depthPerTo: string;
  crownHeightFrom: string;
  crownHeightTo: string;
  widthFrom: string;
  widthTo: string;
  lowerHalfFrom: string;
  lowerHalfTo: string;
  ratioFrom: string;
  ratioTo: string;
  girdlePerFrom: string;
  girdlePerTo: string;
  pavilionAngleFrom: string;
  pavilionAngleTo: string;
  starLengthFrom: string;
  starLengthTo: string;
  selectedGirdle:string[]
}

// Define a function to generate query parameters based on the provided state
export const generateQueryParams = (state: IState) => {
  // Destructure values from the state object
  const {
    selectedShape,
    selectedFancyColor,
    selectedIntensity,
    selectedOvertone,
    selectedShade,
    selectedClarity,
    selectedCaratRange,
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
    pricePerCaratMin,
    pricePerCaratMax,
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
    selectedColor,
    selectedGirdle
  
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
  selectedShade?.length !== 0 && (queryParams['color_shade'] = selectedShade);
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
  selectedKeyToSymbol?.length !== 0 &&
    (queryParams['key_to_symbol'] = selectedKeyToSymbol);
  selectedLab?.length !== 0 && (queryParams['lab'] = selectedLab);
  selectedLocation?.length !== 0 &&
    (queryParams['location'] = selectedLocation);
  selectedOrigin?.length !== 0 &&
    (queryParams['origin_country'] = selectedOrigin);
  amountRangeMin &&
    amountRangeMax &&
    (queryParams['price_range'] = {
      lte: amountRangeMax,
      gte: amountRangeMin
    });
  discountMin &&
    discountMax &&
    (queryParams['discount'] = {
      lte: discountMax,
      gte: discountMin
    });
  pricePerCaratMin &&
    pricePerCaratMax &&
    (queryParams['price_per_carat'] = {
      lte: pricePerCaratMax,
      gte: pricePerCaratMax
    });
  blackTable?.length !== 0 && (queryParams['table_black'] = blackTable);
  sideBlack?.length !== 0 && (queryParams['side_black'] = sideBlack);
  openCrown?.length !== 0 && (queryParams['crown_open'] = openCrown);
  openTable?.length !== 0 && (queryParams['table_open'] = openTable);
  openPavilion?.length !== 0 && (queryParams['pavilion_open'] = openPavilion);
  milky?.length !== 0 && (queryParams['milky'] = milky);
  luster?.length !== 0 && (queryParams['luster'] = luster);
  eyeClean?.length !== 0 && (queryParams['eye_clean'] = eyeClean);
  selectedCulet?.length !== 0 && (queryParams['culet'] = selectedCulet);
  tableInclusion?.length !== 0 &&
    (queryParams['table_inclusion'] = tableInclusion);
  sideInclusion?.length !== 0 &&
    (queryParams['side_inclusion'] = sideInclusion);
  naturalCrown?.length !== 0 && (queryParams['natural_crown'] = naturalCrown);
  naturalGirdle?.length !== 0 &&
    (queryParams['natural_girdle'] = naturalGirdle);
  naturalPavilion?.length !== 0 &&
    (queryParams['natural_pavilion'] = naturalPavilion);
  surfaceGraining?.length !== 0 &&
    (queryParams['surface_graining'] = surfaceGraining);
  internalGraining?.length !== 0 &&
    (queryParams['internal_graining'] = internalGraining);
  selectedGirdle.length &&
    (queryParams['girdle'] = {
      lte: selectedGirdle[0],
      gte: selectedGirdle[selectedGirdle.length - 1]
    });
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
