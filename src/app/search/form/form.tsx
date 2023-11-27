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
import renderSelectionButtons from './render-selection-button';
import renderParameterFields from './render-parameter-fields';
import renderOtherParameterFields from './render-other-parameter-field';
import formStateManagement from './form-state-management';
import { generateQueryParams } from './generate-query-parameter';
import {
  handleShapeChange,
  handleCaratRangeChange,
  handleColorChange,
  handleWhiteFilterChange,
  handleFancyFilterChange,
  handleIntensityChange,
  handleOvertoneChange,
  handleTingeChange,
  handleTingeIntensityChange,
  handleClarityChange,
  handleMakeChange,
  handleCutChange,
  handlePolishChange,
  handleSymmetryChange,
  handleFluorescenceChange,
  handleCuletChange,
  handleLabChange,
  handleHRChange,
  handleBrillianceChange,
  handleLocation,
  handleOrigin,
  handleGirdleChange,
  handleKeyToSymbolChange,
} from './handle-change';
import { handleReset } from './form-reset';

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
  //form state
  const { state, setState } = formStateManagement();
  const {
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
  } = state;

  const {
    setSelectedShape,
    setSelectedColor,
    setSelectedWhiteColor,
    setSelectedFancyColor,
    setSelectedIntensity,
    setSelectedOvertone,
    setSelectedTinge,
    setSelectedTingeIntensity,
    setSelectedClarity,
    setSelectedGirdleStep,
    setSelectedCaratRange,
    setSelectedMake,
    setSelectedCut,
    setSelectedPolish,
    setSelectedSymmetry,
    setSelectedFluorescence,
    setSelectedCulet,
    setSelectedGirdle,
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
    setCaratRangeFrom,
    setCaratRangeTo,
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
  } = setState;

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
  }, []);

  useEffect(() => {
    if (isNewSearch === 'form') {
      handleFormReset();
    }
  }, [isNewSearch]);

  const handleFormReset = () => {
    setSelectedStep('');
    setSearchCount(0);
    setIsError(false);
    setErrorText('');
    handleReset();
  };

  useEffect(() => {
    const queryParams = generateQueryParams(state);
    // Construct your search URL here
    !isValidationError && setSearchUrl(constructUrlParams(queryParams));
  }, [state]);

  const { data, error, isLoading, refetch } = useGetProductCountQuery({
    searchUrl,
  });

  useEffect(() => {
    if (searchCount !== -1) {
      if (data?.count > 300 && data?.count > 0) {
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

  const [caratRangeData, setCaratRangeData] = useState<string[]>(
    advanceSearch.carat.data
  );
  //// All user actions

  // let prevMakeData=""
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

  const handleSaveAndSearch: any = async () => {
    if (data?.count > 0) {
      if (data?.count < 300 && data?.count > 0) {
        const queryParams = generateQueryParams(state);
        const activeTab = searchResult?.activeTab;
        const activeSearch: boolean =
          addSearches[activeTab]?.saveSearchName.length;
        if (activeSearch) {
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


  const handleSearch = async (isSaved: boolean = false, id?: string) => {
    if (data?.count > 0) {
      if (data?.count < 300 && data?.count > 0) {
        const queryParams = generateQueryParams(state);
        if (modifySearchFrom === 'saved-search') {
          if (savedSearch?.savedSearch?.meta_data[savedSearch.activeTab]) {
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
                if (data?.count < 300 && data?.count > 0) {
                  const activeTab = searchResult?.activeTab;
                  if (activeTab !== undefined) {
                    const isSearchName: boolean =
                      addSearches[activeTab]?.saveSearchName.length;
                    const isSaved: boolean =
                      addSearches[activeTab]?.isSavedSearch.length;
                    // Check if the active search is not null and isSavedSearch is true
                    if (isSaved) {
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
            },
          ]}
          noBorderTop={styles.paginationContainerStyle}
        />
      </div>
    </div>
  );
};
export default AdvanceSearch;
