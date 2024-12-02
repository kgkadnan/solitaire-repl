interface IState {
  selectedShape: string[];
  selectedColor: string;
  selectedWhiteColor: string[];
  selectedFancyColor: {
    label: string;
    value: string;
  }[];
  selectedIntensity: {
    label: string;
    value: string;
  }[];
  selectedOvertone: {
    label: string;
    value: string;
  }[];
  selectedShade: string[];
  selectedClarity: string[];
  selectedGirdleStep?: string;
  selectedCaratRange: string[];
  caratRangeSelection: string[];
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
  selectionChecked: string;
  showOnlyWithVideo: boolean;
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
    caratRangeSelection,
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
    selectedWhiteColor,
    selectedGirdle,
    selectionChecked,
    caratMin,
    caratMax,
    showOnlyWithVideo
  } = state;

  // Initialize an empty object to store query parameters
  const queryParams: any = {};

  // Check if a specific property exists in the state and add it to the queryParams object
  selectedShape?.length !== 0 && (queryParams['shape'] = selectedShape);
  selectedWhiteColor?.length !== 0 &&
    (queryParams['color'] = selectedWhiteColor);

  selectedFancyColor?.length !== 0 &&
    (queryParams['fancy_color'] = selectedFancyColor.map(
      fancyColor => fancyColor.value
    ));

  selectedIntensity?.length !== 0 &&
    (queryParams['fancy_intensity'] = selectedIntensity.map(
      intensity => intensity.value
    ));
  selectedOvertone?.length !== 0 &&
    (queryParams['fancy_overtone'] = selectedOvertone.map(
      overtone => overtone.value
    ));
  selectedShade?.length !== 0 && (queryParams['shade'] = selectedShade);
  selectedClarity?.length !== 0 && (queryParams['clarity'] = selectedClarity);

  if (
    (selectedCaratRange && selectedCaratRange.length > 0) ||
    (caratRangeSelection && caratRangeSelection.length > 0) ||
    caratMin !== '' ||
    caratMax !== ''
  ) {
    if (caratMin !== '' || caratMax !== '') {
      const caratMinValue = parseFloat(caratMin);
      const caratMaxValue = parseFloat(caratMax);

      const caratFrom = (
        caratMinValue >= 0.15 && caratMinValue <= 50 ? caratMinValue : 0.15
      ).toFixed(2);
      const caratTo = (
        caratMaxValue <= 50 && caratMaxValue >= 0.15 ? caratMaxValue : 50
      ).toFixed(2);
      if (
        !queryParams['carats']?.includes(`${caratFrom}-${caratTo}`) &&
        // !selectedCaratRange.includes(`${caratFrom}-${caratTo}`) &&
        parseFloat(caratFrom) <= parseFloat(caratTo)
      ) {
        queryParams['carats'] = [
          ...selectedCaratRange,
          ...caratRangeSelection,
          `${caratFrom}-${caratTo}`
        ];
      } else {
        queryParams['carats'] = [...selectedCaratRange, ...caratRangeSelection];
      }
    } else {
      queryParams['carats'] = [...selectedCaratRange, ...caratRangeSelection];
    }
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
  selectedKeyToSymbol?.length !== 0 &&
    (queryParams['key_to_symbol_search_type'] = selectionChecked);
  selectedLab?.length !== 0 && (queryParams['lab'] = selectedLab);
  selectedLocation?.length !== 0 &&
    (queryParams['location'] = selectedLocation);
  selectedOrigin?.length !== 0 &&
    (queryParams['origin_country'] = selectedOrigin);
  amountRangeMin?.length !== 0 &&
    amountRangeMax?.length !== 0 &&
    (queryParams['price_range'] = {
      lte: Number(amountRangeMax),
      gte: Number(amountRangeMin)
    });
  discountMin?.length !== 0 &&
    discountMax?.length !== 0 &&
    (queryParams['discount'] = {
      lte: Number(discountMax),
      gte: Number(discountMin)
    });
  pricePerCaratMin?.length !== 0 &&
    pricePerCaratMax?.length !== 0 &&
    (queryParams['price_per_carat'] = {
      lte: Number(pricePerCaratMax),
      gte: Number(pricePerCaratMin)
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
      lte: selectedGirdle[selectedGirdle.length - 1],
      gte: selectedGirdle[0]
    });
  tablePerMax?.length !== 0 &&
    tablePerMin?.length !== 0 &&
    (queryParams['table_percentage'] = {
      lte: Number(tablePerMax),
      gte: Number(tablePerMin)
    });
  depthMax?.length !== 0 &&
    depthMin?.length !== 0 &&
    (queryParams['depth'] = {
      lte: Number(depthMax),
      gte: Number(depthMin)
    });
  crownAngleMax?.length !== 0 &&
    crownAngleMin?.length !== 0 &&
    (queryParams['crown_angle'] = {
      lte: Number(crownAngleMax),
      gte: Number(crownAngleMin)
    });
  lengthMax?.length !== 0 &&
    lengthMin?.length !== 0 &&
    (queryParams['length'] = {
      lte: Number(lengthMax),
      gte: Number(lengthMin)
    });
  pavilionHeightMax?.length !== 0 &&
    pavilionHeightMin?.length !== 0 &&
    (queryParams['pavilion_height'] = {
      lte: Number(pavilionHeightMax),
      gte: Number(pavilionHeightMin)
    });
  depthPerMax?.length !== 0 &&
    depthPerMin?.length !== 0 &&
    (queryParams['depth_percentage'] = {
      lte: Number(depthPerMax),
      gte: Number(depthPerMin)
    });
  crownHeightMax?.length !== 0 &&
    crownHeightMin?.length !== 0 &&
    (queryParams['crown_height'] = {
      lte: Number(crownHeightMax),
      gte: Number(crownHeightMin)
    });
  widthMax?.length !== 0 &&
    widthMin?.length !== 0 &&
    (queryParams['width'] = {
      lte: Number(widthMax),
      gte: Number(widthMin)
    });
  lowerHalfMax?.length !== 0 &&
    lowerHalfMin?.length !== 0 &&
    (queryParams['lower_half'] = {
      lte: Number(lowerHalfMax),
      gte: Number(lowerHalfMin)
    });
  ratioMax?.length !== 0 &&
    ratioMin?.length !== 0 &&
    (queryParams['ratio'] = {
      lte: Number(ratioMax),
      gte: Number(ratioMin)
    });
  girdlePerMax?.length !== 0 &&
    girdlePerMin?.length !== 0 &&
    (queryParams['girdle_percentage'] = {
      lte: Number(girdlePerMax),
      gte: Number(girdlePerMin)
    });
  pavilionAngleMax?.length !== 0 &&
    pavilionAngleMin?.length !== 0 &&
    (queryParams['pavilion_angle'] = {
      lte: Number(pavilionAngleMax),
      gte: Number(pavilionAngleMin)
    });
  starLengthMax?.length !== 0 &&
    starLengthMin?.length !== 0 &&
    (queryParams['star_length'] = {
      lte: Number(starLengthMax),
      gte: Number(starLengthMin)
    });

  showOnlyWithVideo != false &&
    (queryParams['all_asset_required'] = showOnlyWithVideo);

  return queryParams;
};
