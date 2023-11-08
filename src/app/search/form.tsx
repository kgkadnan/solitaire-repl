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
import Link from 'next/link';

interface QueryParameters {
  [key: string]: string | string[];
}

const AdvanceSearch = () => {
  const router = useRouter();
  const previousSearch = useAppSelector((store) => store.previousSearch);
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

  const [savedSearches, setSavedSearches] = useState<any[]>([]);

  const [searchIndex, setSearchIndex] = useState<number>(0);

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

  const [fieldValidation, setFieldValidation] = useState<string>('');

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
  }: any) {
    const queryParams: QueryParameters = {};

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

    let caratValues: string[] = [];
    if (selectedCaratRange && selectedCaratRange.length > 0) {
      caratValues = selectedCaratRange.map((caratRange: string) => {
        const caratData = caratRange.split('-');
        const caratFrom = parseFloat(caratData[0]).toFixed(2);
        const caratTo = parseFloat(caratData[1]).toFixed(2);
        return `${caratFrom}-${caratTo}`;
      });

      caratValues && (queryParams['carat'] = caratValues);
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
      (queryParams['price_range'] = `${priceRangeFrom}-${priceRangeTo}`);
    discountFrom &&
      discountTo &&
      (queryParams['discount'] = `${discountFrom}-${discountTo}`);
    pricePerCaratFrom &&
      pricePerCaratTo &&
      (queryParams[
        'price_per_carat'
      ] = `${pricePerCaratFrom}-${pricePerCaratTo}`);
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
      (queryParams['table_percentage'] = `${tablePerFrom}-${tablePerTo}`);
    depthFrom && depthTo && (queryParams['depth'] = `${depthTo}-${depthFrom}`);
    crownAngleFrom &&
      crownAngleTo &&
      (queryParams['crown_angle'] = `${crownAngleFrom}-${crownAngleTo}`);
    lengthFrom &&
      lengthTo &&
      (queryParams['length'] = `${lengthFrom}-${lengthTo}`);
    pavilionDepthFrom &&
      pavilionDepthTo &&
      (queryParams[
        'pavilion_depth'
      ] = `${pavilionDepthFrom}-${pavilionDepthTo}`);
    depthPerFrom &&
      depthPerTo &&
      (queryParams['depth_percentage'] = `${depthPerFrom}-${depthPerTo}`);
    crownHeightFrom &&
      crownHeightTo &&
      (queryParams['crown_height'] = `${crownHeightFrom}-${crownHeightTo}`);
    widthFrom && widthTo && (queryParams['width'] = `${widthFrom}-${widthTo}`);
    lowerHalfFrom &&
      lowerHalfTo &&
      (queryParams['lower_half'] = `${lowerHalfFrom}-${lowerHalfTo}`);
    ratioFrom && ratioTo && (queryParams['ratio'] = `${ratioFrom}-${ratioTo}`);
    girdlePerFrom &&
      girdlePerTo &&
      (queryParams['girdle_percentage'] = `${girdlePerFrom}-${girdlePerTo}`);
    pavilionAngleFrom &&
      pavilionAngleTo &&
      (queryParams[
        'pavilion_angle'
      ] = `${pavilionAngleFrom}-${pavilionAngleTo}`);
    starLengthFrom &&
      starLengthTo &&
      (queryParams['star_length'] = `${starLengthFrom}-${starLengthTo}`);

    return queryParams;
  }

  const modifySearchFrom = searchParams.get('edit');

  function setModifySearch(data: any) {
    //basic_card_details states
    data?.shape && setSelectedShape(data?.shape);
    data?.carat && setSelectedCaratRange(data?.carat);
    data?.clarity && setSelectedClarity(data?.clarity);
    data?.cut && setSelectedCut(data?.cut);
    data?.lab && setSelectedLab(data?.lab);
    data?.culet && setSelectedCulet(data?.culet);
    data?.polish && setSelectedPolish(data?.polish);
    data?.location && setSelectedLocation(data?.location);
    data['HA'] && setSelectedHR(data['HA']);
    data?.symmetry && setSelectedSymmetry(data?.symmetry);
    data?.fluoroscence && setSelectedFluorescence(data?.fluoroscence);
    data?.country_of_origin && setSelectedOrigin(data?.country_of_origin);
    data?.color_shade && setSelectedTinge(data?.color_shade);
    data?.color_shade_intensity &&
      setSelectedTingeIntensity(data?.color_shade_intensity);
    data?.overtone && setSelectedOvertone(data?.overtone);
    data?.brilliance && setSelectedBrilliance(data?.brilliance);
    data?.priceRange && setPriceRangeFrom(data?.priceRange?.split('-')[0]);
    data?.priceRange && setPriceRangeTo(data?.priceRange?.split('-')[1]);
    data?.discount && setDiscountFrom(data?.discount?.split('-')[0]);
    data?.discount && setDiscountTo(data?.discount?.split('-')[1]);
    data?.pricePerCarat &&
      setPricePerCaratFrom(data?.pricePerCarat?.split('-')[0]);
    data?.pricePerCarat &&
      setPricePerCaratTo(data?.pricePerCarat?.split('-')[1]);
    //measurements States

    data?.depth && setDepthFrom(data?.depth?.split('-')[0]);
    data?.depth && setDepthTo(data?.depth?.split('-')[1]);
    data?.ratio && setRatioFrom(data?.ratio?.split('-')[0]);
    data?.ratio && setRatioTo(data?.ratio?.split('-')[1]);
    data?.width && setWidthFrom(data?.width?.split('-')[0]);
    data?.width && setWidthTo(data?.width?.split('-')[1]);
    data?.length && setLengthFrom(data?.length?.split('-')[0]);
    data?.length && setLengthTo(data?.length?.split('-')[1]);
    data?.table_per && setTablePerFrom(data?.table_per?.split('-')[0]);
    data?.table_per && setTablePerTo(data?.table_per?.split('-')[1]);
    data?.girdle_per && setGirdlePerFrom(data?.girdle_per?.split('-')[0]);
    data?.girdle_per && setGirdlePerTo(data?.girdle_per?.split('-')[1]);
    data?.depth_per && setDepthPerFrom(data?.depth_per?.split('-')[0]);
    data?.depth_per && setDepthPerTo(data?.depth_per?.split('-')[1]);
    data?.lower_half && setLowerHalfFrom(data?.lower_half?.split('-')[0]);
    data?.lower_half && setLowerHalfTo(data?.lower_half?.split('-')[1]);
    data?.crown_angle && setCrownAngleFrom(data?.crown_angle?.split('-')[0]);
    data?.crown_angle && setCrownAngleTo(data?.crown_angle?.split('-')[1]);
    data?.star_length && setStarLengthFrom(data?.star_length?.split('-')[0]);
    data?.star_length && setStarLengthTo(data?.star_length?.split('-')[1]);
    data?.crown_height && setCrownHeightFrom(data?.crown_height?.split('-')[0]);
    data?.crown_height && setCrownHeightTo(data?.crown_height?.split('-')[1]);
    data?.pavilion_angle &&
      setPavilionAngleFrom(data?.pavilion_angle?.split('-')[0]);
    data?.pavilion_angle &&
      setPavilionAngleTo(data?.pavilion_angle?.split('-')[1]);
    data?.pavilion_depth &&
      setPavilionDepthFrom(data?.pavilion_depth?.split('-')[0]);
    data?.pavilion_depth &&
      setPavilionDepthTo(data?.pavilion_depth?.split('-')[1]);

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
    let modifyPreviousSearchData = previousSearch?.previousSearch?.meta_data;
    let modifysavedSearchData = savedSearch?.savedSearch?.meta_data;

    if (modifySearchFrom === 'previous-search' && modifyPreviousSearchData) {
      setModifySearch(modifyPreviousSearchData);
    } else if (modifySearchFrom === 'saved-search' && modifysavedSearchData) {
      setModifySearch(modifysavedSearchData[savedSearch.activeTab]);
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
      let index = data?.length - 1;
      //basic_card_details
      const cut = data[index]?.cut;
      const lab = data[index]?.lab;
      const carat = data[index]?.carat;
      const color = data[index]?.color;
      const culet = data[index]?.culet;
      const shapes = data[index]?.shape;
      const polish = data[index]?.polish;
      const clarity = data[index]?.clarity;
      const location = data[index]?.location;
      const symmetry = data[index]?.symmetry;
      const priceRange = data[index]?.price_range;
      const pricePerCarat = data[index]?.price_per_carat;
      const discount = data[index]?.discount;
      const color_shade = data[index]?.color_shade;
      const color_shade_intensity = data[index]?.color_shade_intensity;
      const overtone = data[index]?.overtone;
      const HA = data[index]?.['H&A'];
      const brilliance = data[index]?.brilliance;
      const fluoroscence = data[index]?.fluoroscence;
      const country_of_origin = data[index]?.country_of_origin;

      //measurements
      const depth = data[index]?.depth;
      const ratio = data[index]?.ratio;
      const width = data[index]?.width;
      const length = data[index]?.length;
      const table_per = data[index]?.['table%'];
      const girdle_per = data[index]?.['girdle%'];
      const depth_per = data[index]?.['depth%'];
      const lower_half = data[index]?.lower_half;
      const crown_angle = data[index]?.crown_angle;
      const star_length = data[index]?.star_length;
      const crown_height = data[index]?.crown_height;
      const pavilion_angle = data[index]?.pavilion_angle;
      const pavilion_depth = data[index]?.pavilion_depth;

      //inclusion_details
      const milky = data[index]?.milky;
      const luster = data[index]?.luster;
      const eye_clean = data[index]?.eye_clean;
      const open_crown = data[index]?.open_crown;
      const open_table = data[index]?.open_table;
      const side_table = data[index]?.side_table;
      const black_table = data[index]?.black_table;
      const natural_crown = data[index]?.natural_crown;
      const open_pavilion = data[index]?.open_pavilion;
      const natural_girdle = data[index]?.natural_girdle;
      const side_inclusion = data[index]?.side_inclusion;
      const table_inclusion = data[index]?.table_inclusion;
      const natural_pavilion = data[index]?.natural_pavilion;
      const surface_graining = data[index]?.surface_graining;
      const internal_graining = data[index]?.internal_graining;

      //other_information
      const girdle = data[index]?.girdle;
      const key_to_symbol = data[index]?.key_to_symbol;

      //basic_card_details states
      shapes && setSelectedShape(shapes);
      carat && setSelectedCaratRange(carat);
      clarity && setSelectedClarity(clarity);
      cut && setSelectedCut(cut);
      lab && setSelectedLab(lab);
      culet && setSelectedCulet(culet);
      polish && setSelectedPolish(polish);
      location && setSelectedLocation(location);
      HA && setSelectedHR(HA);
      symmetry && setSelectedSymmetry(symmetry);
      fluoroscence && setSelectedFluorescence(fluoroscence);
      country_of_origin && setSelectedOrigin(country_of_origin);
      color_shade && setSelectedTinge(color_shade);
      color_shade_intensity && setSelectedTingeIntensity(color_shade_intensity);
      overtone && setSelectedOvertone(overtone);
      brilliance && setSelectedBrilliance(brilliance);
      priceRange && setPriceRangeFrom(priceRange.split('-')[0]);
      priceRange && setPriceRangeTo(priceRange.split('-')[1]);
      discount && setDiscountFrom(discount.split('-')[0]);
      discount && setDiscountTo(discount.split('-')[1]);
      pricePerCarat && setPricePerCaratFrom(pricePerCarat.split('-')[0]);
      pricePerCarat && setPricePerCaratTo(pricePerCarat.split('-')[1]);
      //measurements States

      depth && setDepthFrom(depth.split('-')[0]);
      depth && setDepthTo(depth.split('-')[1]);
      ratio && setRatioFrom(ratio.split('-')[0]);
      ratio && setRatioTo(ratio.split('-')[1]);
      width && setWidthFrom(width.split('-')[0]);
      width && setWidthTo(width.split('-')[1]);
      length && setLengthFrom(length.split('-')[0]);
      length && setLengthTo(length.split('-')[1]);
      table_per && setTablePerFrom(table_per.split('-')[0]);
      table_per && setTablePerTo(table_per.split('-')[1]);
      girdle_per && setGirdlePerFrom(girdle_per.split('-')[0]);
      girdle_per && setGirdlePerTo(girdle_per.split('-')[1]);
      depth_per && setDepthPerFrom(depth_per.split('-')[0]);
      depth_per && setDepthPerTo(depth_per.split('-')[1]);
      lower_half && setLowerHalfFrom(lower_half.split('-')[0]);
      lower_half && setLowerHalfTo(lower_half.split('-')[1]);
      crown_angle && setCrownAngleFrom(crown_angle.split('-')[0]);
      crown_angle && setCrownAngleTo(crown_angle.split('-')[1]);
      star_length && setStarLengthFrom(star_length.split('-')[0]);
      star_length && setStarLengthTo(star_length.split('-')[1]);
      crown_height && setCrownHeightFrom(crown_height.split('-')[0]);
      crown_height && setCrownHeightTo(crown_height.split('-')[1]);
      pavilion_angle && setPavilionAngleFrom(pavilion_angle.split('-')[0]);
      pavilion_angle && setPavilionAngleTo(pavilion_angle.split('-')[1]);
      pavilion_depth && setPavilionDepthFrom(pavilion_depth.split('-')[0]);
      pavilion_depth && setPavilionDepthTo(pavilion_depth.split('-')[1]);

      //inclusion_details States
      milky && setMilkyBI(milky);
      luster && setLusterBI(luster);
      eye_clean && setEyeCleanBI(eye_clean);
      open_crown && setOpenCrownBI(open_crown);
      open_table && setOpenTableBI(open_table);
      side_table && setSideBlackBI(side_table);
      black_table && setBlackTableBI(black_table);
      natural_crown && setNaturalCrownWI(natural_crown);
      open_pavilion && setOpenPavilionBI(open_pavilion);
      natural_girdle && setNaturalGirdleWI(natural_girdle);
      side_inclusion && setSideInclusionWI(side_inclusion);
      table_inclusion && setTableInclusionWI(table_inclusion);
      natural_pavilion && setNaturalPavilionWI(natural_pavilion);
      surface_graining && setSurfaceGrainingWI(surface_graining);
      internal_graining && setInternalGrainingWI(internal_graining);

      //other_information States
      girdle && setSelectedGirdle(girdle);
      key_to_symbol && setSelectedKeyToSymbol(key_to_symbol);

      let popData = data.filter((items: any, dataIndex: number) => {
        return dataIndex !== index;
      });
      setAddSearches(popData);
      // localStorage.removeItem('Search');

      // setAddSearches(data);
    }
  }, []);

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

  const { data, error, isLoading, refetch } = useGetProductCountQuery({
    searchUrl,
  });

  useEffect(() => {
    if (searchCount > 0) {
      if (data?.count > 300 && data?.count > 0) {
        setIsError(true);
        setErrorText(
          'Please modify your search, the stones exceeds the limit.'
        );
      } else if (data?.count === 0) {
        setIsError(true);
        setErrorText(`No stones found`);
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
    // console.log(error, 'error');
    // else{
    //   setIsError(true)
    //   setErrorText(`Please select the stone parameters to make the search.`)
    // }
    setSearchCount(searchCount + 1);
  }, [data, error]);

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

  const handleShapeChange = (shape: string) => {
    if (shape.toLowerCase() === 'all') {
      let filteredShape: string[] = advanceSearch.shape.map(
        (data) => data.short_name
      );

      setSelectedShape(filteredShape);
      if (selectedShape.includes('All')) {
        setSelectedShape([]);
      }
    } else {
      handleFilterChange(shape, selectedShape, setSelectedShape);
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
        setSelectedCut([...selectedCut, 'EX']);
        setSelectedPolish([...selectedPolish, 'EX']);
        setSelectedSymmetry([...selectedSymmetry, 'EX']);
      } else {
        setSelectedCut(selectedCut.filter((e) => e !== 'EX' && e !== 'VG'));
        setSelectedPolish(
          selectedPolish.filter((e) => e !== 'EX' && e !== 'VG')
        );
        setSelectedSymmetry(
          selectedSymmetry.filter((e) => e !== 'EX' && e !== 'VG')
        );
      }
      setSelectedFluorescence(selectedFluorescence.filter((e) => e !== 'NON'));
    }

    if (data.toLowerCase() === '3ex-non') {
      if (data !== selectedMake) {
        setSelectedCut([...selectedCut, 'EX']);
        setSelectedPolish([...selectedPolish, 'EX']);
        setSelectedSymmetry([...selectedSymmetry, 'EX']);
        setSelectedFluorescence([...selectedFluorescence, 'NON']);
      } else {
        setSelectedCut(selectedCut.filter((e) => e !== 'EX' && e !== 'VG'));
        setSelectedPolish(
          selectedPolish.filter((e) => e !== 'EX' && e !== 'VG')
        );
        setSelectedSymmetry(
          selectedSymmetry.filter((e) => e !== 'EX' && e !== 'VG')
        );
        setSelectedFluorescence(
          selectedFluorescence.filter((e) => e !== 'NON')
        );
      }
    }

    if (data.toLowerCase() === '3vg+') {
      if (data !== selectedMake) {
        setSelectedCut([...selectedCut, 'EX', 'VG']);
        setSelectedPolish([...selectedPolish, 'EX', 'VG']);
        setSelectedSymmetry([...selectedSymmetry, 'EX', 'VG']);
      } else {
        setSelectedCut(selectedCut.filter((e) => e !== 'EX' && e !== 'VG'));
        setSelectedPolish(
          selectedPolish.filter((e) => e !== 'EX' && e !== 'VG')
        );
        setSelectedSymmetry(
          selectedSymmetry.filter((e) => e !== 'EX' && e !== 'VG')
        );
        setSelectedFluorescence(
          selectedFluorescence.filter((e) => e !== 'NON')
        );
      }
    }

    setSelectedMake(data === selectedMake ? '' : data);
  };

  const handleCutChange = (data: string) => {
    handleFilterChange(data, selectedCut, setSelectedCut);
  };
  const handlePolishChange = (data: string) => {
    handleFilterChange(data, selectedPolish, setSelectedPolish);
  };
  const handleSymmetryChange = (data: string) => {
    handleFilterChange(data, selectedSymmetry, setSelectedSymmetry);
  };

  const handleFluorescenceChange = (data: string) => {
    handleFilterChange(data, selectedFluorescence, setSelectedFluorescence);
  };

  const handleCuletChange = (data: string) => {
    handleFilterChange(data, selectedCulet, setSelectedCulet);
  };

  const handleGirdleChange = (data: string) => {
    handleFilterChange(data, selectedGirdle, setSelectedGirdle);
  };

  const handleGirdleStep2Change = (data: string) => {
    if (data.toLowerCase() === 'all') {
      let filteredGirdleStep: string[] = advanceSearch.key_to_symbol.map(
        (girdleData) => (girdleData.toLowerCase() !== 'all' ? girdleData : '')
      );
      setSelectedKeyToSymbol(filteredGirdleStep);
    } else {
      handleFilterChange(data, selectedKeyToSymbol, setSelectedKeyToSymbol);
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

    console.log('caratRange[0]', caratRange[0] === '');

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

  const handleSaveAndSearch: any = async () => {
    if (searchCount > 1) {
      if (data?.count < 300 && data?.count > 0) {
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

        if (addSearches.length === 0) {
          setSavedSearches([queryParams]);
        }
        console.log('queryParams', queryParams);
        await addSavedSearch({
          name: saveSearchName,
          diamond_count: data?.count,
          meta_data: [...savedSearches, queryParams],
          is_deleted: false,
        })
          .unwrap()
          .then(() => {
            console.log('hereeeeeeeeeeeeeeeeeee');
            handleSearch(true);
          })
          .catch((error: any) => {
            console.log('error', error);
          });
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

  const handleAddSearchIndex = () => {
    if (addSearches.length < 5) {
      setAddSearches((prevSearches) => [
        ...prevSearches,
        {
          ...prevSearches[searchIndex],
          shape: selectedShape,
          clarity: selectedClarity,
        },
      ]);
    }
  };

  const handleAddSearches = () => {
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

    setAddSearches([...addSearches, queryParams]);

    // setSearchIndex(addSearches.length + 1);
  };

  const handleSearch = async (isSaved: boolean = false) => {
    if (searchCount > 1) {
      if (data?.count < 300 && data?.count > 0) {
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

        if (modifySearchFrom === 'saved-search') {
          if (savedSearch.savedSearch.meta_data[savedSearch.activeTab]) {
            const updatedMeta = [...savedSearch.savedSearch.meta_data];
            // updatedMeta[savedSearch.activeTab] = prepareSearchParam();
            updatedMeta[savedSearch.activeTab] = queryParams;

            let data = {
              id: savedSearch.savedSearch.id,
              meta_data: updatedMeta,
            };

            updateSavedSearch(data);
          }
        }

        // return;

        let setDataOnLocalStorage = {
          saveSearchName,
          isSavedSearch: isSaved,
          queryParams,
        };

        localStorage.setItem(
          'Search',
          JSON.stringify([...addSearches, setDataOnLocalStorage])
          // JSON.stringify([ ,setDataOnLocalStorage])
        );

        router.push(
          `/search?route=${
            JSON.parse(localStorage.getItem('Search')!).length + 2
          }`
        );
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
            <div>
              <>
                {renderSelectionButtons(
                  data.element_value,
                  '',
                  styles.activeOtherStyles,
                  data.state,
                  data.handleChange
                )}
              </>
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
      <CustomInputDialog customInputDialogData={customInputDialogData} />
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
        <div>
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
        <div>
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
              radioData={[
                {
                  id: '1',
                  value: '1',
                  radioButtonLabel: ManageLocales(
                    'app.advanceSearch.radioLabel1'
                  ),
                },
                {
                  id: '2',
                  value: '2',
                  radioButtonLabel: ManageLocales(
                    'app.advanceSearch.radioLabel2'
                  ),
                },
              ]}
              onChange={handleGirdleStepChange}
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
              handleGirdleStep2Change
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
                data?.count < 300 && data?.count > 0 ? 'green' : 'red'
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
              displayButtonLabel: ManageLocales('app.advanceSearch.reset'),
              style: styles.transparent,
              fn: handleReset,
            },
            {
              id: 2,
              displayButtonLabel: `${ManageLocales(
                'app.advanceSearch.saveSearch'
              )}`,
              style: styles.transparent,
              fn: () => {
                if (searchCount > 1) {
                  setIsInputDialogOpen(true);
                } else {
                  setIsError(true);
                  setErrorText(
                    '*Please select some parameter before initiating search'
                  );
                }
              },
              isDisable: modifySearchFrom === 'saved-search',
            },
            {
              id: 3,
              displayButtonLabel: ManageLocales('app.advanceSearch.search'),
              style: styles.filled,
              fn: handleSearch,
            },
          ]}
          noBorderTop={styles.paginationContainerStyle}
        />
      </div>
    </div>
  );
};

export default AdvanceSearch;
