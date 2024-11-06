import { girdleSortedArray } from '@/constants/v2/form';
import { checkCaratRange } from './check-carat-range';

const transformColorData = (colorArray: string[]) => {
  return colorArray.map(color => ({
    value: color,
    label: color
  }));
};

export const setModifySearch = (data: any, setState: any) => {
  const {
    setSelectedShape,
    setSelectedWhiteColor,
    setSelectedFancyColor,
    setSelectedIntensity,
    setSelectedOvertone,
    setSelectedShade,
    setSelectedClarity,
    setSelectedCaratRange,
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
    setPricePerCaratMin,
    setPricePerCaratMax,
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
    setSelectionChecked,
    setCaratRangeSelection,
    setCaratRangeSelectionTemp,
    setShowOnlyWithVideo
  } = setState;
  data?.shape && setSelectedShape(data?.shape);

  data?.carats &&
    data.carats.forEach((carat: any) => {
      checkCaratRange(
        carat,
        setCaratRangeSelectionTemp,
        setCaratRangeSelection,
        setSelectedCaratRange
      );
    });
  data?.clarity && setSelectedClarity(data?.clarity);
  data?.cut && setSelectedCut(data?.cut);
  data?.lab && setSelectedLab(data?.lab);
  data?.culet && setSelectedCulet(data?.culet);
  data?.polish && setSelectedPolish(data?.polish);
  data?.location && setSelectedLocation(data?.location);
  data?.symmetry && setSelectedSymmetry(data?.symmetry);
  data?.fluorescence && setSelectedFluorescence(data?.fluorescence);
  data?.origin_country && setSelectedOrigin(data?.origin_country);
  data?.shade && setSelectedShade(data?.shade);
  data?.color && setSelectedWhiteColor(data?.color);
  data?.fancy_overtone &&
    setSelectedOvertone(transformColorData(data?.fancy_overtone));
  data?.fancy_intensity &&
    setSelectedIntensity(transformColorData(data?.fancy_intensity));

  data?.fancy_color &&
    setSelectedFancyColor(transformColorData(data?.fancy_color));
  data?.price_range && setAmountRangeMin(data?.price_range?.gte);
  data?.price_range && setAmountRangeMax(data?.price_range?.lte);
  data?.discount && setDiscountMin(data?.discount?.gte);
  data?.discount && setDiscountMax(data?.discount?.lte);
  data?.price_per_carat && setPricePerCaratMin(data?.price_per_carat?.gte);
  data?.price_per_carat && setPricePerCaratMax(data?.price_per_carat?.lte);
  //measurements States
  data?.depth && setDepthMin(data?.depth?.gte);
  data?.depth && setDepthMax(data?.depth?.lte);
  data?.ratio && setRatioMin(data?.ratio?.gte);
  data?.ratio && setRatioMax(data?.ratio?.lte);
  data?.width && setWidthMin(data?.width?.gte);
  data?.width && setWidthMax(data?.width?.lte);
  data?.length && setLengthMin(data?.length?.gte);
  data?.length && setLengthMax(data?.length?.lte);
  data?.table_percentage && setTablePerMin(data?.table_percentage?.gte);
  data?.table_percentage && setTablePerMax(data?.table_percentage?.lte);
  data?.['girdle_percentage'] &&
    setGirdlePerMin(data['girdle_percentage']?.gte);
  data?.['girdle_percentage'] &&
    setGirdlePerMax(data['girdle_percentage']?.lte);
  data?.['depth_percentage'] && setDepthPerMin(data?.['depth_percentage']?.gte);
  data?.['depth_percentage'] && setDepthPerMax(data?.['depth_percentage']?.lte);
  data?.lower_half && setLowerHalfMin(data?.lower_half?.gte);
  data?.lower_half && setLowerHalfMax(data?.lower_half?.lte);
  data?.crown_angle && setCrownAngleMin(data?.crown_angle?.gte);
  data?.crown_angle && setCrownAngleMax(data?.crown_angle?.lte);
  data?.star_length && setStarLengthMin(data?.star_length?.gte);
  data?.star_length && setStarLengthMax(data?.star_length?.lte);
  data?.crown_height && setCrownHeightMin(data?.crown_height?.gte);
  data?.crown_height && setCrownHeightMax(data?.crown_height?.lte);
  data?.pavilion_angle && setPavilionAngleMin(data?.pavilion_angle?.gte);
  data?.pavilion_angle && setPavilionAngleMax(data?.pavilion_angle?.lte);
  data?.pavilion_height && setPavilionHeightMin(data?.pavilion_height?.gte);
  data?.pavilion_height && setPavilionHeightMax(data?.pavilion_height?.lte);
  data?.milky && setMilky(data?.milky);
  data?.luster && setLuster(data?.luster);
  data?.eye_clean && setEyeClean(data?.eye_clean);
  data?.crown_open && setOpenCrown(data?.crown_open);
  data?.table_open && setOpenTable(data?.table_open);
  data?.side_black && setSideBlack(data?.side_black);
  data?.table_black && setBlackTable(data?.table_black);
  data?.natural_crown && setNaturalCrown(data?.natural_crown);
  data?.pavilion_open && setOpenPavilion(data?.pavilion_open);
  data?.natural_girdle && setNaturalGirdle(data?.natural_girdle);
  data?.side_inclusion && setSideInclusion(data?.side_inclusion);
  data?.table_inclusion && setTableInclusion(data?.table_inclusion);
  data?.natural_pavilion && setNaturalPavilion(data?.natural_pavilion);
  data?.surface_graining && setSurfaceGraining(data?.surface_graining);
  data?.internal_graining && setInternalGraining(data?.internal_graining);
  let minIndex = girdleSortedArray.indexOf(data?.girdle?.gte);
  let maxIndex = girdleSortedArray.indexOf(data?.girdle?.lte);
  const girdleData = girdleSortedArray.slice(minIndex, maxIndex + 1);
  data?.girdle && setSelectedGirdle(girdleData);
  data?.key_to_symbol && setSelectedKeyToSymbol(data?.key_to_symbol);
  data?.key_to_symbol_search_type &&
    setSelectionChecked(data?.key_to_symbol_search_type);
  data?.all_asset_required && setShowOnlyWithVideo(data?.all_asset_required);
};
