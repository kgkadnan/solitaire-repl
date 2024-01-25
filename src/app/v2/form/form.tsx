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
import ActionButton from '@/components/v2/common/action-button';
import bookmarkAddIcon from '@public/v2/assets/icons/bookmark-add-01.svg';
import searchIcon from '@public/v2/assets/icons/searchIcon.svg';
import addDemand from '@public/v2/assets/icons/add.svg';

import arrowIcon from '@public/v2/assets/icons/arrows.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { ManageLocales } from '@/utils/v2/translate';
import { useAppSelector } from '@/hooks/hook';
import { IActionButtonDataItem } from './interface/interface';
import { handleReset } from './helpers/reset';
import {
  MAX_SEARCH_FORM_COUNT,
  MIN_SEARCH_FORM_COUNT
} from '@/constants/business-logic';
import {
  EXCEEDS_LIIMITS,
  NO_STONE_FOUND,
  SOMETHING_WENT_WRONG
} from '@/constants/error-messages/form';

const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    selectedCaratRange,
    selectedFancyColor,
    selectedIntensity,
    selectedOvertone
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

  const modifySearchFrom = searchParams.get('edit');

  const searchResult: any = useAppSelector(
    (store: { searchResult: any }) => store.searchResult
  );

  const {
    setSearchUrl,
    searchUrl,
    isValidationError,
    isError,
    errorText,
    setErrorText,
    setSelectedStep,
    setSelectedShadeContain,
    setSearchCount,
    setMessageColor,
    messageColor,
    setIsError,
    searchCount,
    setValidationError,
    validationError
  } = useValidationStateManagement();

  const { errorState, errorSetState } = useNumericFieldValidation();

  const { caratError, discountError, pricePerCaratError, amountRangeError } =
    errorState;
  const {
    setCaratError,
    setDiscountError,
    setPricePerCaratError,
    setAmountRangeError
  } = errorSetState;

  const { data, error } = useGetProductCountQuery(
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

  //Handle search count and errors
  useEffect(() => {
    if (searchCount !== -1) {
      if (searchUrl) {
        if (
          data?.count > MAX_SEARCH_FORM_COUNT &&
          data?.count > MIN_SEARCH_FORM_COUNT
        ) {
          setIsError(true);
          setErrorText(EXCEEDS_LIIMITS);
          setMessageColor('dangerMain');
        } else if (data?.count === MIN_SEARCH_FORM_COUNT) {
          setIsError(true);
          setErrorText(NO_STONE_FOUND);
          setMessageColor('dangerMain');
        } else if (data?.count !== MIN_SEARCH_FORM_COUNT) {
          setMessageColor('successMain');
          setIsError(true);
          data?.count && setErrorText(`${data?.count} stones found`);
        } else {
          setIsError(false);
          setErrorText('');
          setMessageColor('dangerMain');
        }
      } else {
        setIsError(false);
        setErrorText('');
        setMessageColor('dangerMain');
      }
    }
    if (error) {
      setIsError(true);
      setErrorText(SOMETHING_WENT_WRONG);
      setMessageColor('dangerMain');
    }
    setSearchCount(searchCount + 1);
  }, [data, error, searchUrl, messageColor]);

  const handleFormReset = () => {
    setSelectedStep('');
    setSelectedShadeContain('');
    setSearchCount(0);
    setIsError(false);
    setErrorText('');
    handleReset(setState);
  };

  let actionButtonData: IActionButtonDataItem[] = [
    // {
    //   variant: 'secondary',
    //   svg: arrowIcon,
    //   label: ManageLocales('app.advanceSearch.cancel'),
    //   handler: () => {
    //     if (
    //       modifySearchFrom ===
    //       `${ManageLocales('app.search.savedSearchesRoute')}`
    //     ) {
    //       router.push(
    //         `/search?active-tab=${ManageLocales(
    //           'app.search.savedSearchesRoute'
    //         )}`
    //       );
    //     } else if (
    //       modifySearchFrom === `${ManageLocales('app.search.resultRoute')}`
    //     ) {
    //       router.push(
    //         `/search?active-tab=${ManageLocales('app.search.resultRoute')}-${
    //           searchResult.activeTab + 3
    //         }`
    //       );
    //     }
    //   },
    //   isHidden:
    //     modifySearchFrom !==
    //       `${ManageLocales('app.search.savedSearchesRoute')}` &&
    //     modifySearchFrom !== `${ManageLocales('app.search.resultRoute')}`
    // },
    {
      variant: 'secondary',
      svg: arrowIcon,
      label: ManageLocales('app.advanceSearch.reset'),
      handler: handleFormReset
    },

    {
      variant: 'secondary',
      svg: bookmarkAddIcon,
      label: `${ManageLocales('app.advanceSearch.saveSearch')}`,
      handler: () => {}
    },
    {
      variant: 'primary',
      svg: errorText === NO_STONE_FOUND ? addDemand : searchIcon,
      label: `${errorText === NO_STONE_FOUND ? 'Add Demand' : 'Search'} `,
      handler: () => {}
    }
  ];

  return (
    <div className="pt-[32px]">
      <div>
        <div>
          <div className="flex flex-col gap-[16px]">
            {/* <div className='sticky top-[32px] bg-neutral0  z-50'> */}
            <div>
              <span className="text-neutral900 text-headingM font-medium grid gap-[24px]">
                Search for Diamonds
              </span>
            </div>
            <AnchorLinkNavigation anchorNavigations={anchor} />
            {/* </div> */}
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
                setValidationError={setValidationError}
                validationError={validationError}
              />
              <Color
                selectedColor={selectedColor}
                selectedFancyColor={selectedFancyColor}
                selectedIntensity={selectedIntensity}
                selectedOvertone={selectedOvertone}
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
              <Fluorescence state={state} setState={setState} />
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
              setDiscountError={setDiscountError}
              discountError={discountError}
              pricePerCaratError={pricePerCaratError}
              setPricePerCaratError={setPricePerCaratError}
              amountRangeError={amountRangeError}
              setAmountRangeError={setAmountRangeError}
            />

            <Parameters
              state={state}
              setState={setState}
              errorSetState={errorSetState}
              errorState={errorState}
            />
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
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[8px] bg-neutral0 sticky bottom-0 z-50 h-[72px] py-[16px] border-t-[1px] border-neutral200 flex justify-between">
          <div className=" flex items-center">
            {isError && (
              <p className={`text-mRegular font-medium text-${messageColor}`}>
                {!isValidationError && errorText}
              </p>
            )}
          </div>
          <ActionButton actionButtonData={actionButtonData} />
        </div>
      </div>
    </div>
  );
};

export default Form;
