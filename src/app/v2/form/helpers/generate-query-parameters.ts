interface IState {
  selectedShape: string[];
  selectedColor: string;
  selectedWhiteColor: string[];
  selectedFancyColor: string;
  selectedIntensity: string;
  selectedOvertone: string;
  selectedShade: string[];
  selectedClarity: string[];
  selectedGirdleStep?: string;
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
  caratMin: string;
  caratMax: string;
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
  tablePerMin: string;
  tablePerMax: string;
  depthMin: string;
  depthMax: string;
  crownAngleMax: string;
  crownAngleMin: string;
  lengthMax: string;
  lengthMin: string;
  pavilionHeightMax: string;
  pavilionHeightMin: string;
  depthPerMax: string;
  depthPerMin: string;
  crownHeightMax: string;
  crownHeightMin: string;
  widthMax: string;
  widthMin: string;
  lowerHalfMax: string;
  lowerHalfMin: string;
  ratioMax: string;
  ratioMin: string;
  girdlePerMax: string;
  girdlePerMin: string;
  selectedGirdle: string[];
  pavilionAngleMax: string;
  pavilionAngleMin: string;
  starLengthMax: string;
  starLengthMin: string;
  caratRangeData?: string[];
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
    const formattedCaratData = selectedCaratRange.map(item => {
      const [min, max] = item.split('-');
      return { min: parseFloat(min), max: parseFloat(max) };
    });

    queryParams['carat'] = formattedCaratData;
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
      lte: discountMin,
      gte: discountMax
    });
  pricePerCaratMin &&
    pricePerCaratMax &&
    (queryParams['price_per_carat'] = {
      lte: pricePerCaratMin,
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
  tablePerMax &&
    tablePerMin &&
    (queryParams['table_percentage'] = {
      lte: tablePerMax,
      gte: tablePerMin
    });
  depthMax &&
    depthMin &&
    (queryParams['depth'] = {
      lte: depthMax,
      gte: depthMin
    });
  crownAngleMax &&
    crownAngleMin &&
    (queryParams['crown_angle'] = {
      lte: crownAngleMax,
      gte: crownAngleMin
    });
  lengthMax &&
    lengthMin &&
    (queryParams['length'] = {
      lte: lengthMax,
      gte: lengthMin
    });
  pavilionHeightMax &&
    pavilionHeightMin &&
    (queryParams['pavilion_height'] = {
      lte: pavilionHeightMax,
      gte: pavilionHeightMin
    });
  depthPerMax &&
    depthPerMin &&
    (queryParams['depth_percentage'] = {
      lte: depthPerMax,
      gte: depthPerMin
    });
  crownHeightMax &&
    crownHeightMin &&
    (queryParams['crown_height'] = {
      lte: crownHeightMax,
      gte: crownHeightMin
    });
  widthMax &&
    widthMin &&
    (queryParams['width'] = {
      lte: widthMax,
      gte: widthMin
    });
  lowerHalfMax &&
    lowerHalfMin &&
    (queryParams['lower_half'] = {
      lte: lowerHalfMax,
      gte: lowerHalfMin
    });
  ratioMax &&
    ratioMin &&
    (queryParams['ratio'] = {
      lte: ratioMax,
      gte: ratioMin
    });
  girdlePerMax &&
    girdlePerMin &&
    (queryParams['girdle_percentage'] = {
      lte: girdlePerMax,
      gte: girdlePerMin
    });
  pavilionAngleMax &&
    pavilionAngleMin &&
    (queryParams['pavilion_angle'] = {
      lte: pavilionAngleMax,
      gte: pavilionAngleMin
    });
  starLengthMax &&
    starLengthMin &&
    (queryParams['star_length'] = {
      lte: starLengthMax,
      gte: starLengthMin
    });
  return queryParams;
};
