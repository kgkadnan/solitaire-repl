'use client';
import React, { useEffect, useState } from 'react';
import styles from './form.module.scss';
import { CustomRadioButton } from 'src/components/common/buttons/radio-button';
import { CustomSelectionButton } from 'src/components/common/buttons/selection-button';
import CustomImageTile from 'src/components/common/image-tile';
import { CustomInputField } from 'src/components/common/input-field';
import { CustomInputlabel } from 'src/components/common/input-label';
import { CustomFooter } from '@/components/common/footer';
import { useRouter, useSearchParams } from 'next/navigation';
import { ManageLocales } from '@/utils/translate';
import { CustomToast } from '@/components/common/toast';
import advanceSearch from '@/constants/advance-search.json';
import {
  useAddSavedSearchMutation,
  useUpdateSavedSearchMutation,
} from '@/features/api/saved-searches';
import { constructUrlParams } from '@/utils/construct-url-param';
import { useGetProductCountQuery } from '@/features/api/product';

import { useAppSelector } from '@/hooks/hook';
import { CustomInputDialog } from '@/components/common/input-dialog';
import { priceSchema } from '@/utils/zod-schema';
import {
  MAX_SEARCH_FORM_COUNT,
  MIN_SEARCH_FORM_COUNT,
} from '@/constants/business-logic-constants';

const AdvanceSearch = () => {
  const router = useRouter();
  const savedSearch = useAppSelector((store) => store.savedSearch);
  const searchResult = useAppSelector((store) => store.searchResult);

  const regexPattern = new RegExp(/^\d*\.?\d{0,2}$/);

  const [validationError, setValidationError] = useState('');

  const [isInputDialogOpen, setIsInputDialogOpen] = useState(false);

  const [searchCount, setSearchCount] = useState<number>(-1);
  const [saveSearchName, setSaveSearchName] = useState<string>('');
  const [searchUrl, setSearchUrl] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedWhiteColor, setSelectedWhiteColor] = useState<string[]>([]);
  const [selectedFancyColor, setSelectedFancyColor] = useState<string[]>([]);
  const [selectedIntensity, setSelectedIntensity] = useState<string[]>([]);
  const [selectedOvertone, setSelectedOvertone] = useState<string[]>([]);
  const [selectedTinge, setSelectedTinge] = useState<string[]>([]);
  const [selectedTingeIntensity, setSelectedTingeIntensity] = useState<
    string[]
  >([]);
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
  const [selectedGirdle, setSelectedGirdle] = useState<string[]>([]);
  const [selectedKeyToSymbol, setSelectedKeyToSymbol] = useState<string[]>([]);

  const [selectedLab, setSelectedLab] = useState<string[]>([]);
  const [selectedHR, setSelectedHR] = useState<string[]>([]);
  const [selectedBrilliance, setSelectedBrilliance] = useState<string[]>([]);
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
  const [blackTableBI, setBlackTableBI] = useState<string[]>([]);
  const [sideBlackBI, setSideBlackBI] = useState<string[]>([]);
  const [openCrownBI, setOpenCrownBI] = useState<string[]>([]);
  const [openTableBI, setOpenTableBI] = useState<string[]>([]);
  const [openPavilionBI, setOpenPavilionBI] = useState<string[]>([]);
  const [milkyBI, setMilkyBI] = useState<string[]>([]);
  const [lusterBI, setLusterBI] = useState<string[]>([]);
  const [eyeCleanBI, setEyeCleanBI] = useState<string[]>([]);

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
  const [pavilionAngleFrom, setPavilionAngleFrom] = useState<string>('');
  const [pavilionAngleTo, setPavilionAngleTo] = useState<string>('');
  const [starLengthFrom, setStarLengthFrom] = useState<string>('');
  const [starLengthTo, setStarLengthTo] = useState<string>('');

  const [addSearches, setAddSearches] = useState<any[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastErrorMessage, setToastErrorMessage] = useState<string>('');
  const [isValidationError, setIsValidationError] = useState<boolean>(false);

  const [inputError, setInputError] = useState(false);
  const [inputErrorContent, setInputErrorContent] = useState('');

  const [selectedStep, setSelectedStep] = useState('');

  ///edit functionality
  const searchParams = useSearchParams();

  const [updateSavedSearch] = useUpdateSavedSearchMutation();
  let [addSavedSearch] = useAddSavedSearchMutation();

  function generateQueryParams({
    selectedShape,
    selectedColor,
    selectedWhiteColor,
    selectedIntensity,
    selectedOvertone,
    selectedTinge,
    selectedTingeIntensity,
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
  }: any) {
    const queryParams: any = {};

    selectedShape?.length !== 0 && (queryParams['shape'] = selectedShape);
    // selectedColor && (queryParams['color'] = selectedColor);
    selectedWhiteColor?.length !== 0 &&
      (queryParams['color'] = selectedWhiteColor);
    selectedFancyColor?.length !== 0 &&
      (queryParams['fancy'] = selectedFancyColor);
    selectedIntensity?.length !== 0 &&
      (queryParams['intensity'] = selectedIntensity);
    selectedOvertone?.length !== 0 &&
      (queryParams['overtone'] = selectedOvertone);
    selectedTinge?.length !== 0 && (queryParams['color_shade'] = selectedTinge);
    selectedTingeIntensity?.length !== 0 &&
      (queryParams['color_shade_intensity'] = selectedTingeIntensity);
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
    selectedHR?.length !== 0 && (queryParams['ha'] = selectedHR);
    selectedBrilliance?.length !== 0 &&
      (queryParams['brilliance'] = selectedBrilliance);
    selectedLocation?.length !== 0 &&
      (queryParams['location'] = selectedLocation);
    selectedOrigin?.length !== 0 &&
      (queryParams['origin_country'] = selectedOrigin);
    priceRangeFrom &&
      priceRangeTo &&
      (queryParams['price_range'] = {
        lte: priceRangeTo,
        gte: priceRangeFrom,
      });

    discountFrom &&
      discountTo &&
      (queryParams['discount'] = {
        lte: discountTo,
        gte: discountFrom,
      });
    pricePerCaratFrom &&
      pricePerCaratTo &&
      (queryParams['price_per_carat'] = {
        lte: pricePerCaratTo,
        gte: pricePerCaratFrom,
      });
    blackTableBI?.length !== 0 && (queryParams['black_table'] = blackTableBI);
    sideBlackBI?.length !== 0 && (queryParams['side_black'] = sideBlackBI);
    openCrownBI?.length !== 0 && (queryParams['open_crown'] = openCrownBI);
    openTableBI?.length !== 0 && (queryParams['open_table'] = openTableBI);
    openPavilionBI?.length !== 0 &&
      (queryParams['open_pavilion'] = openPavilionBI);
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
        gte: tablePerFrom,
      });
    depthFrom &&
      depthTo &&
      (queryParams['depth'] = {
        lte: depthTo,
        gte: depthFrom,
      });
    crownAngleFrom &&
      crownAngleTo &&
      (queryParams['crown_angle'] = {
        lte: crownAngleTo,
        gte: crownAngleFrom,
      });
    lengthFrom &&
      lengthTo &&
      (queryParams['length'] = {
        lte: lengthTo,
        gte: lengthFrom,
      });
    pavilionDepthFrom &&
      pavilionDepthTo &&
      (queryParams['pavilion_depth'] = {
        lte: pavilionDepthTo,
        gte: pavilionDepthFrom,
      });
    depthPerFrom &&
      depthPerTo &&
      (queryParams['depth_percentage'] = {
        lte: depthPerTo,
        gte: depthPerFrom,
      });
    crownHeightFrom &&
      crownHeightTo &&
      (queryParams['crown_height'] = {
        lte: crownHeightTo,
        gte: crownHeightFrom,
      });
    widthFrom &&
      widthTo &&
      (queryParams['width'] = {
        lte: widthTo,
        gte: widthFrom,
      });
    lowerHalfFrom &&
      lowerHalfTo &&
      (queryParams['lower_half'] = {
        lte: lowerHalfTo,
        gte: lowerHalfFrom,
      });
    ratioFrom &&
      ratioTo &&
      (queryParams['ratio'] = {
        lte: ratioTo,
        gte: ratioFrom,
      });
    girdlePerFrom &&
      girdlePerTo &&
      (queryParams['girdle_percentage'] = {
        lte: girdlePerTo,
        gte: girdlePerFrom,
      });
    pavilionAngleFrom &&
      pavilionAngleTo &&
      (queryParams['pavilion_angle'] = {
        lte: pavilionAngleTo,
        gte: pavilionAngleFrom,
      });
    starLengthFrom &&
      starLengthTo &&
      (queryParams['star_length'] = {
        lte: starLengthTo,
        gte: starLengthFrom,
      });
    return queryParams;
  }

  const modifySearchFrom = searchParams.get('edit');
  const isNewSearch = searchParams.get('route');
  function setModifySearch(data: any) {
    //basic_card_details states
    data?.shape && setSelectedShape(data?.shape);
    data?.carat &&
      setSelectedCaratRange(
        data?.carat.map(
          (carat: any) => `${carat?.gte.toFixed(2)}-${carat?.lte.toFixed(2)}`
        )
      );

    data.carat && setCaratRangeData;

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
    data?.color_shade_intensity &&
      setSelectedTingeIntensity(data?.color_shade_intensity);
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
    data?.pavilion_depth && setPavilionDepthFrom(data?.pavilion_depth?.gte);
    data?.pavilion_depth && setPavilionDepthTo(data?.pavilion_depth?.lte);

    //inclusion_details States
    data?.milky && setMilkyBI(data?.milky);
    data?.luster && setLusterBI(data?.luster);
    data?.eye_clean && setEyeCleanBI(data?.eye_clean);
    data?.open_crown && setOpenCrownBI(data?.open_crown);
    data?.open_table && setOpenTableBI(data?.open_table);
    data?.side_table && setSideBlackBI(data?.side_table);
    data?.black_table && setBlackTableBI(data?.black_table);
    data?.natural_crown && setNaturalCrownWI(data?.natural_crown);
    data?.open_pavilion && setOpenPavilionBI(data?.open_pavilion);
    data?.natural_girdle && setNaturalGirdleWI(data?.natural_girdle);
    data?.side_inclusion && setSideInclusionWI(data?.side_inclusion);
    data?.table_inclusion && setTableInclusionWI(data?.table_inclusion);
    data?.natural_pavilion && setNaturalPavilionWI(data?.natural_pavilion);
    data?.surface_graining && setSurfaceGrainingWI(data?.surface_graining);
    data?.internal_graining && setInternalGrainingWI(data?.internal_graining);

    //other_information States
    data?.girdle && setSelectedGirdle(data?.girdle);
    data?.key_to_symbol && setSelectedKeyToSymbol(data?.key_to_symbol);
  }

  useEffect(() => {
    let modifySearchResult = JSON.parse(localStorage.getItem('Search')!);
    let modifysavedSearchData = savedSearch?.savedSearch?.meta_data;

    if (modifySearchFrom === 'saved-search' && modifysavedSearchData) {
      setModifySearch(modifysavedSearchData);
    } else if (modifySearchFrom === 'search-result' && modifySearchResult) {
      setModifySearch(modifySearchResult[searchResult.activeTab]?.queryParams);
    }
  }, [modifySearchFrom]);

  useEffect(() => {
    let data: any = JSON.parse(localStorage.getItem('Search')!);
    if (
      data?.length !== undefined &&
      data?.length > 0 &&
      data[data?.length - 1] !== undefined
    ) {
      setAddSearches(data);
    }

    // if(modifySearchFrom === "")
  }, []);

  useEffect(() => {
    if (isNewSearch === 'form') {
      handleReset();
    }
  }, [isNewSearch]);

  useEffect(() => {
    const queryParams = generateQueryParams({
      selectedShape,
      selectedColor,
      selectedWhiteColor,
      selectedFancyColor,
      selectedIntensity,
      selectedOvertone,
      selectedTinge,
      selectedTingeIntensity,
      selectedClarity,
      selectedCaratRange,
      caratRangeFrom,
      caratRangeTo,
      selectedMake,
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
    });

    // Construct your search URL here
    !isValidationError && setSearchUrl(constructUrlParams(queryParams));
  }, [
    selectedShape,
    selectedColor,
    selectedWhiteColor,
    selectedFancyColor,
    selectedIntensity,
    selectedOvertone,
    selectedTinge,
    selectedTingeIntensity,
    selectedClarity,
    selectedCaratRange,
    selectedMake,
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
  ]);

  const { data, error } = useGetProductCountQuery({
    searchUrl,
  });

  useEffect(() => {
    if (searchCount !== -1) {
      if (
        data?.count > MAX_SEARCH_FORM_COUNT &&
        data?.count > MIN_SEARCH_FORM_COUNT
      ) {
        setIsError(true);
        setErrorText(
          'Please modify your search, the stones exceeds the limit.'
        );
      } else if (data?.count === 0) {
        setIsError(true);
        setErrorText(`No stones found, Please modify your search.`);
      } else if (data?.count !== 0) {
        setIsError(true);
        setErrorText(`${data?.count} stones found`);
      } else {
        setIsError(false);
        setErrorText('');
      }
    }
    if (error) {
      let error1: any = error;
      setIsError(true);
      setErrorText(error1?.error);
    }
    setSearchCount(searchCount + 1);
  }, [data, error, errorText]);

  const imageTileStyles = {
    imageTileMainContainerStyles: styles.imageTileMainContainerStyles,
    imageTileContainerStyles: styles.imageTileContainerStyles,
    imageTileImageStyles: styles.imageTileImageStyles,
    imageTileLabelStyles: styles.imageTileLabelStyles,
    activeIndicatorStyles: styles.activeIndicatorStyles,
  };

  let parameterDataState = [
    {
      parameterState: [tablePerFrom, tablePerTo],
      setParameterState: [setTablePerFrom, setTablePerTo],
    },
    {
      parameterState: [depthPerFrom, depthPerTo],
      setParameterState: [setDepthPerFrom, setDepthPerTo],
    },
    {
      parameterState: [ratioFrom, ratioTo],
      setParameterState: [setRatioFrom, setRatioTo],
    },
    {
      parameterState: [lengthFrom, lengthTo],
      setParameterState: [setLengthFrom, setLengthTo],
    },
    {
      parameterState: [widthFrom, widthTo],
      setParameterState: [setWidthFrom, setWidthTo],
    },
    {
      parameterState: [depthFrom, depthTo],
      setParameterState: [setDepthFrom, setDepthTo],
    },

    {
      parameterState: [crownAngleFrom, crownAngleTo],
      setParameterState: [setCrownAngleFrom, setCrownAngleTo],
    },

    {
      parameterState: [crownHeightFrom, crownHeightTo],
      setParameterState: [setCrownHeightFrom, setCrownHeightTo],
    },
    {
      parameterState: [girdlePerFrom, girdlePerTo],
      setParameterState: [setGirdlePerFrom, setGirdlePerTo],
    },
    {
      parameterState: [pavilionAngleFrom, pavilionAngleTo],
      setParameterState: [setPavilionAngleFrom, setPavilionAngleTo],
    },

    {
      parameterState: [pavilionDepthFrom, pavilionDepthTo],
      setParameterState: [setPavilionDepthFrom, setPavilionDepthTo],
    },

    {
      parameterState: [lowerHalfFrom, lowerHalfTo],
      setParameterState: [setLowerHalfFrom, setLowerHalfTo],
    },

    {
      parameterState: [starLengthFrom, starLengthTo],
      setParameterState: [setStarLengthFrom, setStarLengthTo],
    },
  ];

  let parameterData = parameterDataState.map((parameter, index) => {
    return { ...parameter, ...advanceSearch.parameter[index] };
  });

  const handleBlackTableBIChange = (data: string) => {
    handleFilterChange(data, blackTableBI, setBlackTableBI);
  };

  const handleSideBlackBIChange = (data: string) => {
    handleFilterChange(data, sideBlackBI, setSideBlackBI);
  };

  const handleOpenCrownBIChange = (data: string) => {
    handleFilterChange(data, openCrownBI, setOpenCrownBI);
  };
  const handleOpenTableBIChange = (data: string) => {
    handleFilterChange(data, openTableBI, setOpenTableBI);
  };
  const handleOpenPavilionBIChange = (data: string) => {
    handleFilterChange(data, openPavilionBI, setOpenPavilionBI);
  };
  const handleMilkyBIChange = (data: string) => {
    handleFilterChange(data, milkyBI, setMilkyBI);
  };
  const handleLusterBIChange = (data: string) => {
    handleFilterChange(data, lusterBI, setLusterBI);
  };

  const handleEyeCleanBIChange = (data: string) => {
    handleFilterChange(data, eyeCleanBI, setEyeCleanBI);
  };

  const handleTableInclusionWIChange = (data: string) => {
    handleFilterChange(data, tableInclusionWI, setTableInclusionWI);
  };
  const handleSideInclusionWIChange = (data: string) => {
    handleFilterChange(data, sideInclusionWI, setSideInclusionWI);
  };
  const handleNaturalCrownWIChange = (data: string) => {
    handleFilterChange(data, naturalCrownWI, setNaturalCrownWI);
  };
  const handleNaturalGirdleWIChange = (data: string) => {
    handleFilterChange(data, naturalGirdleWI, setNaturalGirdleWI);
  };
  const handleNaturalPavilionWIChange = (data: string) => {
    handleFilterChange(data, naturalPavilionWI, setNaturalPavilionWI);
  };

  const handleSurfaceGrainingIChange = (data: string) => {
    handleFilterChange(data, surfaceGrainingWI, setSurfaceGrainingWI);
  };

  const handleinternalGrainingWIChange = (data: string) => {
    handleFilterChange(data, internalGrainingWI, setInternalGrainingWI);
  };

  let otherParameterDataState = [
    {
      key: ManageLocales('app.advanceSearch.blackInclusion'),
      value: [
        {
          handleChange: handleBlackTableBIChange,
          state: blackTableBI,
        },
        {
          handleChange: handleSideBlackBIChange,
          state: sideBlackBI,
        },
        {
          handleChange: handleOpenCrownBIChange,
          state: openCrownBI,
        },
        {
          handleChange: handleOpenTableBIChange,
          state: openTableBI,
        },
        {
          handleChange: handleOpenPavilionBIChange,
          state: openPavilionBI,
        },
        {
          handleChange: handleMilkyBIChange,
          state: milkyBI,
        },
        {
          handleChange: handleLusterBIChange,
          state: lusterBI,
        },
        {
          handleChange: handleEyeCleanBIChange,
          state: eyeCleanBI,
        },
      ],
    },
    {
      key: ManageLocales('app.advanceSearch.whiteInclusion'),
      value: [
        {
          handleChange: handleTableInclusionWIChange,
          state: tableInclusionWI,
        },
        {
          handleChange: handleSideInclusionWIChange,
          state: sideInclusionWI,
        },
        {
          handleChange: handleNaturalCrownWIChange,
          state: naturalCrownWI,
        },
        {
          handleChange: handleNaturalGirdleWIChange,
          state: naturalGirdleWI,
        },
        {
          handleChange: handleNaturalPavilionWIChange,
          state: naturalPavilionWI,
        },
        {
          handleChange: handleSurfaceGrainingIChange,
          state: surfaceGrainingWI,
        },
        {
          handleChange: handleinternalGrainingWIChange,
          state: internalGrainingWI,
        },
      ],
    },
  ];

  let otherParameterData = otherParameterDataState.map((other, otherIndex) => {
    return {
      key: other.key,
      value: other.value.map((data, valueIndex) => {
        return {
          ...data,
          ...advanceSearch.other_parameter[otherIndex].value[valueIndex],
        };
      }),
    };
  });

  const [caratRangeData, setCaratRangeData] = useState<string[]>(
    advanceSearch.carat.data
  );

  //// All user actions

  const handleFilterChange = (
    filterData: string,
    selectedFilters: string[] | string,
    setSelectedFilters: any
  ) => {
    if (selectedFilters.includes(filterData)) {
      setSelectedFilters((prevSelectedColors: any[]) =>
        prevSelectedColors.filter((selected) => selected !== filterData)
      );
    } else {
      setSelectedFilters((prevSelectedColors: any) => [
        ...prevSelectedColors,
        filterData,
      ]);
    }
  };

  const compareArrays = (arr1: string[], arr2: string[]) => {
    // Check if the lengths of the arrays are equal
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Convert arrays to sets
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    // Compare sets
    for (const value of set1) {
      if (!set2.has(value)) {
        return false;
      }
    }

    // If the loop completes, sets are equal
    return true;
  };

  const handleShapeChange = (shape: string) => {
    let filteredShape: string[] = advanceSearch.shape.map(
      (data) => data.short_name
    );
    if (shape.toLowerCase() === 'all') {
      setSelectedShape(filteredShape);
      if (selectedShape.includes('All')) {
        setSelectedShape([]);
      }
    } else {
      if (selectedShape.includes('All')) {
        let filteredSelectedShape: string[] = selectedShape.filter(
          (data) => data !== 'All' && data !== shape
        );

        setSelectedShape(filteredSelectedShape);
      } else if (
        compareArrays(
          selectedShape.filter((data) => data !== 'All'),
          filteredShape.filter((data) => data !== 'All' && data !== shape)
        )
      ) {
        setSelectedShape(filteredShape);
      } else {
        handleFilterChange(shape, selectedShape, setSelectedShape);
      }
    }
  };

  const handleColorChange = (data: string) => {
    if (selectedColor !== data) {
      setSelectedColor(data);
    } else {
      setSelectedColor('');
    }
    setSelectedWhiteColor([]);
    setSelectedFancyColor([]);
  };

  const handleWhiteFilterChange = (data: string) => {
    handleFilterChange(data, selectedWhiteColor, setSelectedWhiteColor);
  };

  const handleFancyFilterChange = (data: string) => {
    handleFilterChange(data, selectedFancyColor, setSelectedFancyColor);
  };

  const handleIntensityChange = (data: string) => {
    handleFilterChange(data, selectedIntensity, setSelectedIntensity);
  };
  const handleOvertoneChange = (data: string) => {
    handleFilterChange(data, selectedOvertone, setSelectedOvertone);
  };

  const handleTingeChange = (data: string) => {
    handleFilterChange(data, selectedTinge, setSelectedTinge);
  };

  const handleTingeIntensityChange = (data: string) => {
    handleFilterChange(data, selectedTingeIntensity, setSelectedTingeIntensity);
  };
  const handleClarityChange = (data: string) => {
    handleFilterChange(data, selectedClarity, setSelectedClarity);
  };
  const handleCaratRangeChange = (data: string) => {
    handleFilterChange(data, selectedCaratRange, setSelectedCaratRange);
  };
  // let prevMakeData=""
  const handleMakeChange = (data: string) => {
    if (data.toLowerCase() === '3ex') {
      if (data !== selectedMake) {
        setSelectedCut(['EX']);
        setSelectedPolish(['EX']);
        setSelectedSymmetry(['EX']);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
      }
      setSelectedFluorescence(selectedFluorescence.filter((e) => e !== 'NON'));
    }

    if (data.toLowerCase() === '3ex-non') {
      if (data !== selectedMake) {
        setSelectedCut(['EX']);
        setSelectedPolish(['EX']);
        setSelectedSymmetry(['EX']);
        setSelectedFluorescence(['NON']);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
        setSelectedFluorescence([]);
      }
    }

    if (data.toLowerCase() === '3vg+') {
      if (data !== selectedMake) {
        setSelectedCut(['EX', 'VG']);
        setSelectedPolish(['EX', 'VG']);
        setSelectedSymmetry(['EX', 'VG']);
      } else {
        setSelectedCut([]);
        setSelectedPolish([]);
        setSelectedSymmetry([]);
      }
      setSelectedFluorescence(selectedFluorescence.filter((e) => e !== 'NON'));
    }

    setSelectedMake(data === selectedMake ? '' : data);
  };

  const handleFilterChangeAndMakeSelection = (
    data: string,
    selectedFilter: string[],
    setSelectedFilter: React.Dispatch<React.SetStateAction<string[]>>,
    firstCriteria: string[],
    secondCriteria: string[]
  ) => {
    handleFilterChange(data, selectedFilter, setSelectedFilter);

    let temp: string[] = [...selectedFilter];
    const index = temp.indexOf(data);

    if (index !== -1) {
      temp.splice(index, 1);
    } else {
      temp.push(data);
    }
    if (
      temp.toString() === 'EX' &&
      firstCriteria.toString() === 'EX' &&
      secondCriteria.toString() === 'EX'
    ) {
      if (selectedFluorescence.toString() === 'NON') {
        setSelectedMake('3EX-Non');
      } else {
        setSelectedMake('3EX');
      }
    } else if (
      (firstCriteria.toString() === 'EX,VG' ||
        firstCriteria.toString() === 'VG,EX') &&
      (secondCriteria.toString() === 'EX,VG' ||
        secondCriteria.toString() === 'VG,EX') &&
      (temp.toString() === 'EX,VG' || temp.toString() === 'VG,EX')
    ) {
      setSelectedMake('3VG+');
    } else {
      setSelectedMake('');
    }
  };

  const handleCutChange = (data: string) => {
    handleFilterChangeAndMakeSelection(
      data,
      selectedCut,
      setSelectedCut,
      selectedPolish,
      selectedSymmetry
    );
  };

  const handlePolishChange = (data: string) => {
    handleFilterChangeAndMakeSelection(
      data,
      selectedPolish,
      setSelectedPolish,
      selectedCut,
      selectedSymmetry
    );
  };

  const handleSymmetryChange = (data: string) => {
    handleFilterChangeAndMakeSelection(
      data,
      selectedSymmetry,
      setSelectedSymmetry,
      selectedCut,
      selectedPolish
    );
  };
  const handleFluorescenceChange = (data: string) => {
    handleFilterChange(data, selectedFluorescence, setSelectedFluorescence);
    let temp: string[] = selectedFluorescence;
    const index = temp.indexOf(data);
    if (index !== -1) {
      temp.splice(index, 1);
    } else {
      temp.push(data);
    }
    if (
      selectedPolish.toString() === 'EX' &&
      selectedCut.toString() === 'EX' &&
      selectedSymmetry.toString() === 'EX'
    ) {
      if (temp.toString() === 'NON') {
        setSelectedMake('3EX-Non');
      } else {
        setSelectedMake('3EX');
      }
    } else if (
      (selectedCut.toString() === 'EX,VG' ||
        selectedCut.toString() === 'VG,EX') &&
      (selectedPolish.toString() === 'EX,VG' ||
        selectedPolish.toString() === 'VG,EX') &&
      (selectedSymmetry.toString() === 'EX,VG' ||
        selectedSymmetry.toString() === 'VG,EX') &&
      temp.length === 0
    ) {
      setSelectedMake('3VG+');
    } else {
      setSelectedMake('');
    }
  };

  const handleCuletChange = (data: string) => {
    handleFilterChange(data, selectedCulet, setSelectedCulet);
  };

  const handleGirdleChange = (data: string) => {
    handleFilterChange(data, selectedGirdle, setSelectedGirdle);
  };

  const handleKeyToSymbolChange = (comment: string) => {
    if (comment.toLowerCase() === 'all') {
      setSelectedKeyToSymbol(advanceSearch.key_to_symbol);
      if (selectedKeyToSymbol.includes('All')) {
        setSelectedKeyToSymbol([]);
      }
    } else {
      if (selectedKeyToSymbol.includes('All')) {
        let filteredSelectedShape: string[] = selectedKeyToSymbol.filter(
          (data) => data !== 'All' && data !== comment
        );

        setSelectedKeyToSymbol(filteredSelectedShape);
      } else if (
        compareArrays(
          selectedKeyToSymbol.filter((data) => data !== 'All'),
          advanceSearch.key_to_symbol.filter(
            (data) => data !== 'All' && data !== comment
          )
        )
      ) {
        setSelectedKeyToSymbol(advanceSearch.key_to_symbol);
      } else {
        handleFilterChange(
          comment,
          selectedKeyToSymbol,
          setSelectedKeyToSymbol
        );
      }
    }
  };

  const handleLabChange = (data: string) => {
    handleFilterChange(data, selectedLab, setSelectedLab);
  };
  const handleHRChange = (data: string) => {
    handleFilterChange(data, selectedHR, setSelectedHR);
  };
  const handleBrillianceChange = (data: string) => {
    handleFilterChange(data, selectedBrilliance, setSelectedBrilliance);
  };

  const handleLocation = (data: string) => {
    handleFilterChange(data, selectedLocation, setSelectedLocation);
  };

  const handleOrigin = (data: string) => {
    handleFilterChange(data, selectedOrigin, setSelectedOrigin);
  };

  const handleGirdleStepChange = (radioValue: string) => {
    setSelectedGirdleStep(radioValue);
  };

  function normalizeValue(value: string) {
    // Normalize user input like "3-3.99" to "3.00-3.99"
    const caratRange = value.split('-');

    if (caratRange[0] === '' || caratRange[1] === '') {
      setValidationError(`Please enter a valid carat range.`);
      return;
    } else if (caratRange[0] === '0' || caratRange[1] === '0') {
      setValidationError('Please enter value between “0.10 to 50”');
      return;
    } else if (caratRange[0] > caratRange[1]) {
      setValidationError(
        `Carat range cannot be ${caratRange[0]} to ${caratRange[1]}. Please enter a valid carat range.`
      );
      return;
    } else if (caratRange.length === 2) {
      const caratFrom = parseFloat(caratRange[0]).toFixed(2);
      const caratTo = parseFloat(caratRange[1]).toFixed(2);
      return `${caratFrom}-${caratTo}`;
    }
    return value;
  }

  const handleAddCarat = (data: string) => {
    let Validatedata = normalizeValue(data);

    if (Validatedata) {
      if (!caratRangeData.includes(Validatedata)) {
        setCaratRangeData([...caratRangeData, Validatedata]);
      }
      setSelectedCaratRange([...selectedCaratRange, Validatedata]);
      setCaratRangeFrom('');
      setCaratRangeTo('');
    }
  };

  const handleReset = () => {
    setSelectedStep('');
    setSearchCount(0);
    setIsError(false);
    setErrorText('');
    setSelectedShape([]);
    setSelectedColor('');
    setSelectedWhiteColor([]);
    setSelectedFancyColor([]);
    setSelectedIntensity([]);
    setSelectedOvertone([]);
    setSelectedTinge([]);
    setSelectedTingeIntensity([]);
    setSelectedClarity([]);
    setSelectedCaratRange([]);
    setSelectedMake('');
    setSelectedCut([]);
    setSelectedPolish([]);
    setSelectedSymmetry([]);
    setSelectedFluorescence([]);
    setSelectedLab([]);
    setSelectedHR([]);
    setSelectedBrilliance([]);
    setPriceRangeFrom('');
    setPriceRangeTo('');
    setDiscountFrom('');
    setDiscountTo('');
    setPricePerCaratFrom('');
    setPricePerCaratTo('');
    setCaratRangeFrom('');
    setCaratRangeTo('');
    setBlackTableBI([]);
    setSideBlackBI([]);
    setOpenCrownBI([]);
    setOpenTableBI([]);
    setOpenPavilionBI([]);
    setMilkyBI([]);
    setLusterBI([]);
    setEyeCleanBI([]);
    setTableInclusionWI([]);

    setSideInclusionWI([]);
    setNaturalCrownWI([]);
    setNaturalGirdleWI([]);
    setNaturalPavilionWI([]);
    setSurfaceGrainingWI([]);
    setInternalGrainingWI([]);
    setTablePerFrom('');
    setTablePerTo('');
    setCrownAngleFrom('');
    setCrownAngleTo('');
    setLengthFrom('');
    setLengthTo('');
    setPavilionDepthFrom('');
    setPavilionDepthTo('');

    setDepthPerFrom('');
    setDepthPerTo('');
    setCrownHeightFrom('');
    setCrownHeightTo('');

    setWidthFrom('');
    setWidthTo('');
    setLowerHalfFrom('');
    setLowerHalfTo('');
    setRatioFrom('');
    setRatioTo('');
    setGirdlePerFrom('');
    setGirdlePerTo('');

    setPavilionAngleFrom('');
    setPavilionAngleTo('');
    setStarLengthFrom('');
    setStarLengthTo('');
    setSelectedLocation([]);
    setSelectedOrigin([]);
  };

  // const   handleUpdateSaveSearch = () => {

  // }

  const handleSaveAndSearch: any = async () => {
    if (data?.count > MIN_SEARCH_FORM_COUNT) {
      if (
        data?.count < MAX_SEARCH_FORM_COUNT &&
        data?.count > MIN_SEARCH_FORM_COUNT
      ) {
        const queryParams = generateQueryParams({
          selectedShape,
          selectedColor,
          selectedWhiteColor,
          selectedFancyColor,
          selectedIntensity,
          selectedOvertone,
          selectedTinge,
          selectedTingeIntensity,
          selectedClarity,
          selectedCaratRange,
          caratRangeFrom,
          caratRangeTo,
          selectedMake,
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
        });

        const activeTab = searchResult?.activeTab;
        const activeSearch: boolean =
          addSearches[activeTab]?.saveSearchName.length;

        if (modifySearchFrom === 'saved-search') {
          if (savedSearch?.savedSearch?.meta_data) {
            let updatedMeta = savedSearch.savedSearch.meta_data;
            updatedMeta = queryParams;
            let data = {
              id: savedSearch.savedSearch.id,
              meta_data: updatedMeta,
            };
            updateSavedSearch(data);
            router.push(`/search?route=saved`);
          }
        } else if (activeSearch) {
          const updatedMeta = addSearches;

          updatedMeta[activeTab].queryParams = queryParams;

          let updateSaveSearchData = {
            id: updatedMeta[activeTab].id,
            name: updatedMeta[activeTab].saveSearchName,
            meta_data: updatedMeta[activeTab].queryParams,
            diamond_count: parseInt(data?.count),
          };

          updateSavedSearch(updateSaveSearchData)
            .unwrap()
            .then(() => {
              handleSearch(true);
            })
            .catch((error: any) => {
              console.log('error', error);
            });
        } else {
          await addSavedSearch({
            name: saveSearchName,
            diamond_count: parseInt(data?.count),
            meta_data: queryParams,
            is_deleted: false,
          })
            .unwrap()
            .then((res: any) => {
              handleSearch(true, res.id);
            })
            .catch((error: any) => {
              console.log('error', error);
              setInputError(true);
              setInputErrorContent(
                'Title already exists. Choose another title to save your search'
              );
            });
        }
      }
    } else {
      setIsError(true);
      setErrorText('Please select some parameter before initiating search');
    }
  };

  const validateField = (fieldName: string, fieldValue: string) => {
    const validationResult = priceSchema.safeParse(parseFloat(fieldValue));
    if (!validationResult.success) {
      setValidationError(`Invalid ${fieldName}.`);
      return false;
    }
    return true;
  };

  const handlePriceChange = (e: any, field: string) => {
    const newValue = e.target.value;
    let fromError;
    let toError;
    if (field === 'from') {
      setPriceRangeFrom(newValue);
      fromError = validateField('from price', newValue);
      if (!fromError) {
        setIsValidationError(true);
        setValidationError('error');
      }
    } else if (field === 'to') {
      setPriceRangeTo(newValue);
      toError = validateField('to price', newValue);
      if (!toError) {
        setIsValidationError(true);
        setValidationError('error1');
      }
    }

    const rangeError = validatePriceRange();
    if (rangeError.length > 0) {
      setIsValidationError(true);
      setValidationError(rangeError);
    }
    if (!fromError && !toError && !rangeError) {
      // Both fields are valid, and the range is valid
      setValidationError('');
      setIsValidationError(false);
      console.log('From Price:', parseFloat(priceRangeFrom));
      console.log('To Price:', parseFloat(priceRangeTo));
    }
  };

  const validatePriceRange = () => {
    const from = parseFloat(priceRangeFrom);
    const to = parseFloat(priceRangeTo);

    if (from > to) {
      return "'From' price should be less than 'to' price.";
    }

    return '';
  };

  // const handleFromPriceChange = (e:any) => {
  //   const newValue = e.target.value;
  //   setPriceRangeFrom(newValue);
  //   const error = validateField("from price", newValue);
  //   setIsValidationError(error)
  //   if(!error){
  //     console.log(error)
  //     // setValidationError("kkk");
  //     }
  //     else {
  //       const from = parseFloat(e.target.value);
  //       const to = parseFloat(priceRangeTo);

  //       if (from > to) {
  //         setValidationError("'From' price should be less than 'to' price.");
  //       } else {
  //         setValidationError('')
  //         // Both fields are valid, and the range is valid
  //         console.log("From Price:", from);
  //         console.log("To Price:", to);
  //       }
  //     }
  // };

  // const handleToPriceChange = (e:any) => {
  //   const newValue = e.target.value;
  //   setPriceRangeTo(newValue);
  //   const error = validateField("to price", newValue);
  //   setIsValidationError(error)
  //   if(!error){
  //     console.log(error)
  //   // setValidationError("lkk");
  //   }
  //   else {
  //     const from = parseFloat(priceRangeFrom);
  //     const to = parseFloat(e.target.value);

  //     if (from > to) {
  //       setValidationError("'From' price should be less than 'to' price.");
  //     } else {
  //       setValidationError('')
  //       // Both fields are valid, and the range is valid
  //       console.log("From Price:", from);
  //       console.log("To Price:", to);
  //     }
  //   }
  // };

  const handleSearch = async (isSaved: boolean = false, id?: string) => {
    if (data?.count > MIN_SEARCH_FORM_COUNT) {
      if (
        data?.count < MAX_SEARCH_FORM_COUNT &&
        data?.count > MIN_SEARCH_FORM_COUNT
      ) {
        const queryParams = generateQueryParams({
          selectedShape,
          selectedColor,
          selectedWhiteColor,
          selectedFancyColor,
          selectedIntensity,
          selectedOvertone,
          selectedTinge,
          selectedTingeIntensity,
          selectedClarity,
          selectedCaratRange,
          caratRangeFrom,
          caratRangeTo,
          selectedMake,
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
        });

        if (modifySearchFrom === 'search-result') {
          let modifySearchResult = JSON.parse(localStorage.getItem('Search')!);
          let setDataOnLocalStorage = {
            id: modifySearchResult[searchResult.activeTab]?.id,
            saveSearchName:
              modifySearchResult[searchResult.activeTab]?.saveSearchName ||
              saveSearchName,
            isSavedSearch: isSaved,
            queryParams,
          };

          if (modifySearchResult[searchResult.activeTab]) {
            const updatedData = [...modifySearchResult];
            updatedData[searchResult.activeTab] = setDataOnLocalStorage;
            localStorage.setItem('Search', JSON.stringify(updatedData));
          }

          router.push(`/search?route=${searchResult.activeTab + 3}`);
        } else {
          let setDataOnLocalStorage = {
            id: id,
            saveSearchName: saveSearchName,
            isSavedSearch: isSaved,
            queryParams,
          };
          localStorage.setItem(
            'Search',
            JSON.stringify([...addSearches, setDataOnLocalStorage])
          );
          router.push(
            `/search?route=${
              JSON.parse(localStorage.getItem('Search')!).length + 2
            }`
          );
        }

        // return;
      }
    } else {
      setIsError(true);
      setErrorText('Please select some parameter before initiating search');
    }
  };

  ///reusable jsx
  const renderSelectionButtons = (
    data: string[],
    className?: string,
    activeStyle?: string,
    relatedState?: string | string[],
    handleChange?: (change: string) => void,
    highlightIndicator?: boolean
  ) => {
    return data.map((data: string) => (
      <CustomSelectionButton
        key={data}
        selectionButtonLabel={data}
        handleClick={handleChange}
        data={data}
        selectionButtonAllStyles={{
          selectionButtonStyle: `${styles.selectionButtonStyles} ${
            className ?? ''
          }   ${
            typeof relatedState !== 'string'
              ? relatedState?.includes(data) && activeStyle
              : relatedState === data && activeStyle
          }`,
          selectionButtonLabelStyle: `${styles.labelDefaultStyle} ${
            highlightIndicator &&
            relatedState?.includes(data) &&
            styles.colorDataActiveStyle
          }`,
        }}
      />
    ));
  };

  const renderParameterFields = () => {
    return parameterData.map((parameter) => (
      <div key={parameter.label} className={styles.parameterContainer}>
        <CustomInputlabel
          htmlfor="text"
          label={parameter.label}
          overriddenStyles={{ label: styles.labelPlainColor }}
        />
        <div className={`${styles.filterSection}  ${styles.parameterFilter}`}>
          <CustomInputField
            type="number"
            name={`${parameter.parameterState[0]}`}
            onChange={(e) => {
              parameter.setParameterState[0](e.target.value);
            }}
            value={parameter.parameterState[0]}
            style={{
              input: styles.inputFieldStyles,
            }}
            onBlur={
              (e) =>
                parameter.label === 'Crown Angle' ||
                parameter.label === 'Pavilion Angle'
                  ? handleAngle(
                      parameter.label,
                      e.target.value,
                      setFromAngle,
                      setFromError,
                      toAngle
                    )
                  : ''
              // handleValidate(
              //     parameter.label,
              //     e.target.value,
              //     setFromValue,
              //     setFromError,
              //     toValue
              //   )
            }
          />
          <div className={styles.parameterLabel}>to</div>
          <CustomInputField
            type="number"
            name={`${parameter.parameterState[1]}`}
            onChange={(e) => {
              parameter.setParameterState[1](e.target.value);
            }}
            value={parameter.parameterState[1]}
            style={{
              input: styles.inputFieldStyles,
            }}
            onBlur={
              (e) =>
                parameter.label === 'Crown Angle' ||
                parameter.label === 'Pavilion Angle'
                  ? handleAngle(
                      parameter.label,
                      e.target.value,
                      setToAngle,
                      setFromError,
                      fromAngle
                    )
                  : ''
              //  handleValidate(
              //     parameter.label,
              //     e.target.value,
              //     setToValue,
              //     setFromError,
              //     fromValue
              //   )
            }
          />
        </div>
        {fromError.key === parameter.label && (
          <div className={styles.validationMessage}>{fromError.value}</div>
        )}
      </div>
    ));
  };

  const renderOtherParameterFields = () => {
    return otherParameterData.map((other) => (
      <div
        key={`other-parameter-${other.key}`}
        className={styles.otherParameterContainer}
      >
        <CustomInputlabel
          htmlfor="text"
          label={other.key}
          overriddenStyles={{ label: styles.otherParameterHeader }}
        />
        {other.value.map((data) => (
          <div
            className={`${styles.filterSection} ${styles.otherParameterDataContainer} `}
            key={`${other.key}-${data.element_key}`}
          >
            <div className={`${styles.otherParameterTitle}`}>
              <CustomInputlabel
                htmlfor="text"
                label={data.element_key}
                overriddenStyles={{ label: styles.labelPlainColor }}
              />
            </div>
            <div className={styles.filterSectionData}>
              {renderSelectionButtons(
                data.element_value,
                '',
                styles.activeOtherStyles,
                data.state,
                data.handleChange
              )}
            </div>
          </div>
        ))}
      </div>
    ));
  };

  const initialErrorState = {
    key: '',
    value: '',
  };

  const isInRange = (value: string) => {
    const numValue = parseInt(value);
    return numValue >= 1 && numValue <= 100;
  };

  function validateAngle(value: string, min: number, max: number) {
    const numValue = parseInt(value);

    if (
      value.length > 0 &&
      (value === '' || numValue < min || numValue > max)
    ) {
      return 'Please enter a valid range from 0 to 100';
    }
    return '';
  }

  const [fromError, setFromError] = useState(initialErrorState);

  const [fromAngle, setFromAngle] = useState('');
  const [toAngle, setToAngle] = useState('');

  interface Errors {
    discount: { from: string | null; to: string | null };
    price_range: { from: string | null; to: string | null };
    price_per_carat: { from: string | null; to: string | null };
    // Add more input groups here if needed
  }

  const [errors, setErrors] = useState<Errors>({
    discount: { from: null, to: null },
    price_range: { from: null, to: null },
    price_per_carat: { from: null, to: null },
    // Add more input groups here if needed
  });

  const handleValidate = (
    key: keyof Errors,
    inputType: 'from' | 'to',
    value: any,
    otherValue: any
  ) => {
    if (value == '' && otherValue == '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: { from: null, to: null },
      }));
    } else if (value.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: {
          ...prevErrors[key as keyof Errors],
          [inputType]: `Please enter a value for '${key} from'`,
        },
      }));
      // Handle other error logic as needed
    } else if (otherValue.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: {
          ...prevErrors[key as keyof Errors],
          [inputType]: `Please enter a value for '${key} to'`,
        },
      }));
      // Handle other error logic as needed
    } else if (value > 100 || otherValue > 100) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: {
          ...prevErrors[key as keyof Errors],
          [inputType]: 'Please enter a valid range from 0 to 100',
        },
      }));
      // Handle other error logic as needed
    } else if (
      (inputType === 'from' && value > otherValue) ||
      (inputType === 'to' && +value < otherValue)
    ) {
      // Error handling for 'from' value being greater than 'to' value and vice versa
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: {
          ...prevErrors[key as keyof Errors],
          [inputType]: `'${
            inputType === 'from' ? 'From' : 'To'
          }' value should not be ${
            inputType === 'from' ? 'greater' : 'less'
          } than '${inputType === 'from' ? 'To' : 'From'}' value`,
        },
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [key]: { from: null, to: null },
      }));

      // Handle other error logic as needed
    }
  };

  const handleAngle = (
    key: string,
    value: string,
    setAngle: any,
    setError: any,
    otherValue: any
  ) => {
    const error = validateAngle(value, 0, 360);

    if (
      value.length > 0 &&
      otherValue !== '' &&
      value !== '' &&
      parseInt(value) < parseInt(otherValue)
    ) {
      setError({ key, value: 'Please enter a valid range from 0 to 360' });
    } else {
      setError(initialErrorState);
    }
    setAngle(value);
    if (error) {
      setError({ key, value: error });
    }
  };

  const handleCloseInputDialog = () => {
    setIsInputDialogOpen(false);
    setInputError(false);
    setInputErrorContent('');
    setSaveSearchName('');
  };

  const customInputDialogData = {
    isOpens: isInputDialogOpen,
    setIsOpen: setIsInputDialogOpen,
    setInputvalue: setSaveSearchName,
    inputValue: saveSearchName,
    displayButtonFunction: handleSaveAndSearch,
    label: 'Save And Search',
    name: 'Save',
    displayButtonLabel2: 'Save',
  };

  return (
    <div>
      <CustomInputDialog
        customInputDialogData={customInputDialogData}
        isError={inputError}
        errorContent={inputErrorContent}
        setIsError={setInputError}
        setErrorContent={setInputErrorContent}
        handleClose={handleCloseInputDialog}
      />
      {showToast && <CustomToast message={toastErrorMessage} />}

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          {' '}
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.shape')}
          />
        </div>
        <div className={styles.filterSectionData}>
          <CustomImageTile
            overriddenStyles={imageTileStyles}
            imageTileData={advanceSearch.shape}
            selectedTile={selectedShape}
            handleSelectTile={handleShapeChange}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.caratRange')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          className={`${styles.filterSectionData} ${styles.caratRangeFilter}`}
        >
          <div
            className={`${styles.filterSection} ${styles.rangeFilter}`}
            style={{ width: '420px' }}
          >
            <div>
              <div className="flex gap-5">
                <CustomInputField
                  // style={className}
                  type="number"
                  name="caratRangeFrom"
                  onChange={(e) => {
                    if (regexPattern.test(e.target.value)) {
                      setValidationError('');
                      setCaratRangeFrom(e.target.value);
                    } else {
                      setValidationError(
                        'Please enter value between “0.01 to 50”'
                      );
                    }
                  }}
                  value={caratRangeFrom}
                  placeholder={ManageLocales('app.advanceSearch.from')}
                  style={{
                    input: styles.inputFieldStyles,
                  }}
                />
                <CustomInputField
                  // style={className}
                  type="number"
                  name="caratRangeTO"
                  onChange={(e) => {
                    // Use a regular expression to allow only numbers with up to two decimal places
                    if (regexPattern.test(e.target.value)) {
                      setCaratRangeTo(e.target.value);
                      setValidationError('');
                    } else {
                      setValidationError(
                        'Please enter value between “0.10 to 50”'
                      );
                    }
                  }}
                  value={caratRangeTo}
                  placeholder={ManageLocales('app.advanceSearch.to')}
                  style={{
                    input: styles.inputFieldStyles,
                  }}
                />
              </div>
            </div>

            <CustomSelectionButton
              selectionButtonLabel={ManageLocales('app.advanceSearch.addCarat')}
              data={`${caratRangeFrom}-${caratRangeTo}`}
              handleClick={handleAddCarat}
              selectionButtonAllStyles={{
                selectionButtonStyle: `${styles.addCartButtonStyles} ${styles.addCarat}`,
              }}
            />
          </div>
          <div className="text-red-500 text-xs ml-2 ">
            {validationError && validationError}
          </div>

          <div>
            {renderSelectionButtons(
              caratRangeData,
              '',
              styles.activeOtherStyles,
              selectedCaratRange,
              handleCaratRangeChange
            )}
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.color')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div className={styles.filterSectionData}>
          <div className={styles.filterSection}>
            {renderSelectionButtons(
              advanceSearch.color,
              styles.colorFilterStyles,
              styles.activeColorStyles,
              selectedColor,
              handleColorChange,
              true
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              {selectedColor.includes('White') &&
                renderSelectionButtons(
                  advanceSearch.white,
                  '',
                  styles.activeOtherStyles,
                  selectedWhiteColor,
                  handleWhiteFilterChange
                )}
            </div>
            <div>
              {selectedColor.includes('Fancy') &&
                renderSelectionButtons(
                  advanceSearch.fancy,
                  '',
                  styles.activeOtherStyles,
                  selectedFancyColor,
                  handleFancyFilterChange
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedColor.includes('Fancy') && (
        <>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionLabel}>
              <CustomInputlabel
                htmlfor="text"
                label={ManageLocales('app.advanceSearch.intensity')}
              />
            </div>

            <div
              className={`${styles.filterSection} ${styles.filterSectionData}`}
            >
              {renderSelectionButtons(
                advanceSearch.intensity,
                '',
                styles.activeOtherStyles,
                selectedIntensity,
                handleIntensityChange
              )}
            </div>
          </div>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionLabel}>
              <CustomInputlabel
                htmlfor="text"
                label={ManageLocales('app.advanceSearch.overtone')}
              />
            </div>
            <div className={styles.filterSectionData}>
              <div
                className={`${styles.filterSection} ${styles.filterWrapSection}`}
              >
                {renderSelectionButtons(
                  advanceSearch.overtone,
                  '',
                  styles.activeOtherStyles,
                  selectedOvertone,
                  handleOvertoneChange
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.colorShade')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            advanceSearch.color_shade,
            '',
            styles.activeOtherStyles,
            selectedTinge,
            handleTingeChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.colorShadeIntensity')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.color_shade_intensity,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedTingeIntensity,
            handleTingeIntensityChange
          )}
        </div>
      </div>
      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.clarity')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            advanceSearch.clarity,
            '',
            styles.activeOtherStyles,
            selectedClarity,
            handleClarityChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.make')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.make,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedMake,
            handleMakeChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.cut')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.cut,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedCut,
            handleCutChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.polish')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.polish,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedPolish,
            handlePolishChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.symmetry')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.symmetry,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedSymmetry,
            handleSymmetryChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.fluorescence')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.fluorescence,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedFluorescence,
            handleFluorescenceChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.Culet')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.culet,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedCulet,
            handleCuletChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.lab')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            advanceSearch.lab,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedLab,
            handleLabChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.HA')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.brilliance,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedHR,
            handleHRChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.brilliance')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.brilliance,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedBrilliance,
            handleBrillianceChange
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.location')}
          />
        </div>
        <div>
          {renderSelectionButtons(
            advanceSearch.location,
            styles.commonSelectionStyle,
            styles.activeOtherStyles,
            selectedLocation,
            handleLocation
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.origin')}
          />
        </div>
        <div className={styles.filterSectionData}>
          {renderSelectionButtons(
            advanceSearch.origin,
            styles.countryOriginStyle,
            styles.activeOtherStyles,
            selectedOrigin,
            handleOrigin
          )}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.discount')}
          />
        </div>
        <div className={`${styles.filterSection} ${styles.rangeFilter}`}>
          <CustomInputField
            // style={className}
            type="number"
            name="discountFrom"
            onChange={(e) => {
              setDiscountFrom(e.target.value);
              handleValidate('discount', 'from', e.target.value, discountTo);
            }}
            value={discountFrom}
            placeholder={ManageLocales('app.advanceSearch.from')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />

          <CustomInputField
            // style={className}
            type="number"
            name="discountTo"
            onChange={(e) => {
              setDiscountTo(e.target.value);
              handleValidate('discount', 'to', e.target.value, discountFrom);
            }}
            value={discountTo}
            placeholder={ManageLocales('app.advanceSearch.to')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
        {/* {fromError.key === 'discount' && ( */}
        <div className={styles.validationMessage}>
          {errors?.discount.from ?? errors?.discount.to}
        </div>
        {/* )} */}
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.priceRange')}
          />
        </div>
        <div className={`${styles.filterSection} ${styles.rangeFilter}`}>
          <CustomInputField
            // style={className}
            type="number"
            name="priceRangeFrom"
            onChange={(e) => {
              setPriceRangeFrom(e.target.value);
            }}
            value={priceRangeFrom}
            placeholder={ManageLocales('app.advanceSearch.from')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            // style={className}
            type="number"
            name="priceRangeTo"
            onChange={(e) => {
              setPriceRangeTo(e.target.value);
              handleValidate(
                'price_range',
                'to',
                e.target.value,
                priceRangeFrom
              );
            }}
            value={priceRangeTo}
            placeholder={ManageLocales('app.advanceSearch.to')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
        {validationError}
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.pricePerCarat')}
          />
        </div>
        <div className={`${styles.filterSection} ${styles.rangeFilter}`}>
          <CustomInputField
            // style={className}
            type="number"
            name="pricePerCaratFrom"
            onChange={(e) => {
              setPricePerCaratFrom(e.target.value);
              handleValidate(
                'price_per_carat',
                'from',
                e.target.value,
                pricePerCaratTo
              );
            }}
            value={pricePerCaratFrom}
            placeholder={ManageLocales('app.advanceSearch.from')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
          <CustomInputField
            type="number"
            name="pricePerCaratTo"
            onChange={(e) => {
              setPricePerCaratTo(e.target.value);
              handleValidate(
                'price_per_carat',
                'to',
                e.target.value,
                pricePerCaratFrom
              );
            }}
            value={pricePerCaratTo}
            placeholder={ManageLocales('app.advanceSearch.to')}
            style={{
              input: styles.inputFieldStyles,
            }}
          />
        </div>
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.parameter')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          className={`${styles.filterSectionData} ${styles.filterWrapSection} `}
        >
          {renderParameterFields()}
        </div>
      </div>

      <div className={styles.filterSection}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales(
              'app.advanceSearch.inclusionsAndOtherParameter'
            )}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div className={styles.filterSectionData}>
          <div className={styles.filterSection}>
            {renderOtherParameterFields()}
          </div>
        </div>
      </div>

      <div className={`${styles.filterSection} ${styles.filterWrapSection}`}>
        {' '}
        <div className={styles.filterSectionLabel}>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.girdle')}
            overriddenStyles={{ label: styles.specificFilterAlign }}
          />
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column' }}
          className={styles.filterSectionData}
        >
          <div className={styles.filterSectionData}>
            <div
              className={`${styles.filterSection} ${styles.filterWrapSection}`}
            >
              {renderSelectionButtons(
                advanceSearch.girdle,
                '',
                styles.activeOtherStyles,
                selectedGirdle,
                handleGirdleChange
              )}
            </div>
          </div>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.step1')}
            overriddenStyles={{ label: styles.stepStyle }}
          />
          <div style={{ margin: '10px' }}>
            <CustomRadioButton
              radioMetaData={{
                name: 'steps',
                handleChange: (data: string) => {
                  setSelectedStep(data);
                },
                radioData: [
                  {
                    id: '1',
                    value: 'Contains',
                    radioButtonLabel: 'Contains',
                    checked: selectedStep === 'Contains',
                  },
                  {
                    id: '2',
                    value: 'Does not contains',
                    radioButtonLabel: 'Does not contains',
                    checked: selectedStep === 'Does not contains',
                  },
                ],
              }}
              radioButtonAllStyles={{
                radioButtonStyle: styles.radioStyle,
                radioLabelStyle: styles.radioLabel,
              }}
            />
          </div>
          <CustomInputlabel
            htmlfor="text"
            label={ManageLocales('app.advanceSearch.step2')}
            overriddenStyles={{ label: styles.stepStyle }}
          />
          <div
            className={`${styles.filterSection} ${styles.filterWrapSection}`}
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {renderSelectionButtons(
              advanceSearch.key_to_symbol,
              '',
              styles.activeOtherStyles,
              selectedKeyToSymbol,
              handleKeyToSymbolChange
            )}
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 bg-solitairePrimary mt-3 flex border-t-2 border-solitaireSenary">
        {isError && (
          <div className="w-[40%] flex items-center">
            <span className="hidden  text-green-500" />
            <p
              className={`text-${
                data?.count < MAX_SEARCH_FORM_COUNT &&
                data?.count > MIN_SEARCH_FORM_COUNT
                  ? 'green'
                  : 'red'
              }-500 text-base`}
            >
              {!isValidationError && errorText}
            </p>
          </div>
        )}
        <CustomFooter
          footerButtonData={[
            {
              id: 1,
              displayButtonLabel: ManageLocales('app.advanceSearch.cancel'),
              style: styles.transparent,
              fn: () => {
                if (modifySearchFrom === 'saved-search') {
                  router.push('/search?route=saved');
                } else if (modifySearchFrom === 'search-result') {
                  router.push(`/search?route=${searchResult.activeTab + 3}`);
                }
              },
              isHidden:
                modifySearchFrom !== 'saved-search' &&
                modifySearchFrom !== 'search-result',
            },
            {
              id: 2,
              displayButtonLabel: ManageLocales('app.advanceSearch.reset'),
              style: styles.transparent,
              fn: handleReset,
            },
            {
              id: 3,
              displayButtonLabel: `${ManageLocales(
                'app.advanceSearch.saveSearch'
              )}`,
              style: styles.transparent,
              fn: () => {
                if (
                  data?.count < MAX_SEARCH_FORM_COUNT &&
                  data?.count > MIN_SEARCH_FORM_COUNT
                ) {
                  const activeTab = searchResult?.activeTab;
                  if (activeTab !== undefined) {
                    const isSearchName: boolean =
                      addSearches[activeTab]?.saveSearchName.length;
                    const isSaved: boolean =
                      addSearches[activeTab]?.isSavedSearch.length;
                    // Check if the active search is not null and isSavedSearch is true
                    if (modifySearchFrom === 'saved-search') {
                      handleSaveAndSearch();
                    } else if (isSaved) {
                      handleSaveAndSearch();
                    } else if (!isSaved && isSearchName) {
                      handleSaveAndSearch();
                    } else {
                      setIsInputDialogOpen(true);
                    }
                  } else {
                    setIsError(true);
                    setErrorText('Please make a selection to perform action.');
                  }
                }
              },
            },
            {
              id: 4,
              displayButtonLabel: ManageLocales('app.advanceSearch.search'),
              style: styles.filled,
              fn: handleSearch,
              isHidden: modifySearchFrom === 'saved-search',
            },
          ]}
          noBorderTop={styles.paginationContainerStyle}
        />
      </div>
    </div>
  );
};

export default AdvanceSearch;
