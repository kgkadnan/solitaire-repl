'use client';

import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import { anchor } from '@/constants/v2/form';
import React, { useEffect } from 'react';
import useFormStateManagement from './hooks/form-state';
import { Shape } from './components/shape';
import { Carat } from './components/carat';
import { Color } from './components/color';
import { useGetProductCountQuery } from '@/features/api/product';
import useValidationStateManagement from './hooks/validation-state-management';
import { generateQueryParams } from './helpers/generate-query-parameters';
import { constructUrlParams } from '@/utils/construct-url-param';
import { Clarity } from './components/clarity';
import { MakeCutPolishSymmetry } from './components/make-cut-polish-symmetry';
import { Fluorescence } from './components/fluorescence';
import { Lab } from './components/lab';
import { Location } from './components/location';
import { CountryOfOrigin } from './components/country-of-origin';
import { Shade } from './components/shade';
import { Parameters } from './components/parameters';
import { Girdle } from './components/girdle';
import { Culet } from './components/culet';
import { KeyToSymbol } from './components/key-to-symbol';
import { DiscountPrice } from './components/discount-price';
import Inclusions from './components/inclusions';
import useNumericFieldValidation from './hooks/numeric-field-validation-management';

const Form = () => {
  const { state, setState } = useFormStateManagement();
  const {
    caratMax,
    caratMin,
    selectedClarity,
    selectedShape,
    selectedColor,
    selectedWhiteColor,
    selectedFluorescence,
    selectedLab,
    selectedLocation,
    selectedOrigin,
    selectedShade,
    discountMin, //discountFrom
    discountMax, //discountTo
    amountRangeMin, //priceRangeFrom
    amountRangeMax, //priceRangeTo
    pricePerCaratMin, //pricePerCaratFrom
    pricePerCaratMax, //pricePerCaratTo
    selectedGirdle,
    selectedCulet,
    selectedKeyToSymbol,
    selectedCaratRange
  } = state;
  const {
    setCaratMin,
    setCaratMax,
    setSelectedClarity,
    setSelectedShape,
    setSelectedColor,
    setSelectedWhiteColor,
    setSelectedFancyColor,
    setSelectedIntensity,
    setSelectedOvertone,
    setSelectedFluorescence,
    setSelectedLab,
    setSelectedLocation,
    setSelectedOrigin,
    setSelectedShade,
    setDiscountMin,
    setDiscountMax,
    setAmountRangeMin,
    setAmountRangeMax,
    setPricePerCaratMin,
    setPricePerCaratMax,
    setSelectedGirdle,
    setSelectedCulet,
    setSelectedKeyToSymbol,
    setSelectedCaratRange
  } = setState;

  const { setSearchUrl, searchUrl, isValidationError } =
    useValidationStateManagement();

  const { errorState, errorSetState } = useNumericFieldValidation();

  const { caratError } = errorState;
  const { setCaratError } = errorSetState;

  const { data } = useGetProductCountQuery(
    {
      searchUrl
    },
    {
      skip: !searchUrl
    }
  );

  // Update search URL when form state changes
  useEffect(() => {
    const queryParams = generateQueryParams(state);

    // Construct your search URL here
    if (!isValidationError) {
      setSearchUrl(constructUrlParams(queryParams));
    }
  }, [state]);

  return (
    <div>
      {/* <TopNavigationBar/> */}
      <div>
        {/* <SideNavigationBar/> */}
        <div>
          <div className="flex flex-col gap-[16px] w-[calc(100%-148px)]">
            <div>
              <span className="text-neutral900 text-headingM font-medium grid gap-[24px]">
                Search for Diamonds
              </span>
            </div>
            <AnchorLinkNavigation anchorNavigations={anchor} />

            <Shape
              setSelectedShape={setSelectedShape}
              selectedShape={selectedShape}
            />

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px]">
              <Carat
                caratMax={caratMax}
                caratMin={caratMin}
                setCaratMin={setCaratMin}
                setCaratMax={setCaratMax}
                selectedCaratRange={selectedCaratRange}
                setSelectedCaratRange={setSelectedCaratRange}
                caratError={caratError}
                setCaratError={setCaratError}
              />
              <Color
                selectedColor={selectedColor}
                selectedWhiteColor={selectedWhiteColor}
                setSelectedColor={setSelectedColor}
                setSelectedWhiteColor={setSelectedWhiteColor}
                setSelectedFancyColor={setSelectedFancyColor}
                setSelectedIntensity={setSelectedIntensity}
                setSelectedOvertone={setSelectedOvertone}
              />
            </div>
            <Clarity
              setSelectedClarity={setSelectedClarity}
              selectedClarity={selectedClarity}
            />
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px]">
              <MakeCutPolishSymmetry state={state} setState={setState} />
              <div className="flex flex-col gap-[16px]">
                <Lab
                  selectedLab={selectedLab}
                  setSelectedLab={setSelectedLab}
                />
                <Location
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px]">
              <Fluorescence
                selectedFluorescence={selectedFluorescence}
                setSelectedFluorescence={setSelectedFluorescence}
              />
              <CountryOfOrigin
                selectedOrigin={selectedOrigin}
                setSelectedOrigin={setSelectedOrigin}
              />
            </div>
            <Shade
              selectedShade={selectedShade}
              setSelectedShade={setSelectedShade}
            />
            <DiscountPrice
              setDiscountMin={setDiscountMin}
              setDiscountMax={setDiscountMax}
              setAmountRangeMin={setAmountRangeMin}
              setAmountRangeMax={setAmountRangeMax}
              setPricePerCaratMin={setPricePerCaratMin}
              setPricePerCaratMax={setPricePerCaratMax}
              discountMin={discountMin}
              discountMax={discountMax}
              amountRangeMin={amountRangeMin}
              amountRangeMax={amountRangeMax}
              pricePerCaratMin={pricePerCaratMin}
              pricePerCaratMax={pricePerCaratMax}
            />
            <Parameters />
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px]">
              <Girdle
                selectedGirdle={selectedGirdle}
                setSelectedGirdle={setSelectedGirdle}
              />
              <Culet
                selectedCulet={selectedCulet}
                setSelectedCulet={setSelectedCulet}
              />
            </div>
            <Inclusions state={state} setState={setState} />
            <KeyToSymbol
              selectedKeyToSymbol={selectedKeyToSymbol}
              setSelectedKeyToSymbol={setSelectedKeyToSymbol}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
