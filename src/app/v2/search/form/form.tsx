'use client';

import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import { anchor } from '@/constants/v2/form';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Shape } from './components/shape';
import { Carat } from './components/carat';
import { Color } from './components/color';
import { useGetProductCountQuery } from '@/features/api/product';
import useValidationStateManagement from '../hooks/validation-state-management';
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
import { KeyToSymbol } from './components/key-to-symbol';
import { DiscountPrice } from './components/discount-price';
import Inclusions from './components/inclusions';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { IActionButtonDataItem } from './interface/interface';
import { handleReset } from './helpers/reset';
import {
  MAX_SEARCH_FORM_COUNT,
  MAX_SEARCH_TAB_LIMIT,
  MIN_SEARCH_FORM_COUNT
} from '@/constants/business-logic';
import {
  EXCEEDS_LIIMITS,
  MAX_LIMIT_REACHED,
  NO_STONE_FOUND,
  SELECT_SOME_PARAM,
  SOMETHING_WENT_WRONG
} from '@/constants/error-messages/form';
import { useRouter, useSearchParams } from 'next/navigation';
import { setModifySearch } from './helpers/modify-search';
import { useAppSelector } from '@/hooks/hook';
import logger from 'logging/log-util';
import { useUpdateSavedSearchMutation } from '@/features/api/saved-searches';
import Breadcrum from '@/components/v2/common/search-breadcrum/breadcrum';
import { SubRoutes } from '@/constants/v2/enums/routes';
import BinIcon from '@public/v2/assets/icons/bin.svg';

export interface ISavedSearch {
  saveSearchName: string;
  isSavedSearch: boolean;
  queryParams: Record<string, string | string[] | { lte: number; gte: number }>;
}
const Form = ({
  searchUrl,
  setSearchUrl,
  activeTab,
  setActiveTab,
  searchParameters,
  handleCloseAllTabs,
  handleCloseSpecificTab,
  state,
  setState,
  carat,
  errorState,
  errorSetState
}: {
  searchUrl: String;
  setSearchUrl: Dispatch<SetStateAction<string>>;
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  searchParameters: any;
  handleCloseAllTabs: () => void;
  handleCloseSpecificTab: (id: number) => void;
  state: any;
  setState: any;
  carat: any;
  errorState: any;
  errorSetState: any;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subRoute = useSearchParams().get('active-tab');

  const modifySearchFrom = searchParams.get('edit');
  const savedSearch: any = useAppSelector(
    (store: { savedSearch: any }) => store.savedSearch
  );

  // const { state, setState, carat } = useFormStateManagement();
  const [updateSavedSearch] = useUpdateSavedSearchMutation();

  const {
    caratMax,
    caratMin,
    selectedClarity,
    selectedShape,
    selectedColor,
    selectedWhiteColor,
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
    setSelectedKeyToSymbol,
    setSelectedCaratRange
  } = setState;

  // const modifySearchFrom = searchParams.get('edit');

  const {
    // setSearchUrl,
    // searchUrl,
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
    validationError,
    saveSearchName,
    addSearches,
    setAddSearches
  } = useValidationStateManagement();

  // const { errorState, errorSetState } = useNumericFieldValidation();

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

  // Load saved search data when component mounts
  useEffect(() => {
    let modifySearchResult = JSON.parse(localStorage.getItem('Search')!);
    let modifysavedSearchData = savedSearch?.savedSearch?.meta_data;
    if (
      modifySearchFrom === `${SubRoutes.SAVED_SEARCH}` &&
      modifysavedSearchData
    ) {
      setModifySearch(modifysavedSearchData, setState, carat);
    } else if (
      modifySearchFrom === `${SubRoutes.RESULT}` &&
      modifySearchResult
    ) {
      const replaceSubrouteWithSearchResult = subRoute?.replace(
        `${SubRoutes.RESULT}-`,
        ''
      );
      setActiveTab(parseInt(replaceSubrouteWithSearchResult!));
      setModifySearch(
        modifySearchResult[parseInt(replaceSubrouteWithSearchResult!) - 1]
          ?.queryParams,
        setState,
        carat
      );
    }
  }, [modifySearchFrom]);

  useEffect(() => {
    let data: ISavedSearch[] | [] =
      JSON.parse(localStorage.getItem('Search')!) || [];
    if (data?.length > 0 && data[data?.length - 1]) {
      setAddSearches(data);
    }
  }, []);

  const handleFormSearch = async (
    isSavedParams: boolean = false,
    id?: string
  ) => {
    if (
      JSON.parse(localStorage.getItem('Search')!)?.length >=
        MAX_SEARCH_TAB_LIMIT &&
      modifySearchFrom !== `${SubRoutes.RESULT}`
    ) {
      setIsError(true);
      setErrorText(MAX_LIMIT_REACHED);
    } else {
      if (searchUrl && data?.count > MIN_SEARCH_FORM_COUNT) {
        if (
          data?.count < MAX_SEARCH_FORM_COUNT &&
          data?.count > MIN_SEARCH_FORM_COUNT
        ) {
          const queryParams = generateQueryParams(state);
          if (modifySearchFrom === `${SubRoutes.SAVED_SEARCH}`) {
            if (savedSearch?.savedSearch?.meta_data[savedSearch.activeTab]) {
              const updatedMeta = [...savedSearch.savedSearch.meta_data];
              updatedMeta[savedSearch.activeTab] = queryParams;
              let data = {
                id: savedSearch.savedSearch.id,
                meta_data: updatedMeta
              };
              updateSavedSearch(data);
            }
          }
          if (modifySearchFrom === `${SubRoutes.RESULT}`) {
            let modifySearchResult = JSON.parse(
              localStorage.getItem('Search')!
            );
            let setDataOnLocalStorage = {
              id: modifySearchResult[activeTab - 1]?.id,
              saveSearchName:
                modifySearchResult[activeTab - 1]?.saveSearchName ||
                saveSearchName,
              isSavedSearch: isSavedParams,
              searchId: data?.search_id,
              queryParams
            };
            if (modifySearchResult[activeTab - 1]) {
              const updatedData = [...modifySearchResult];
              updatedData[activeTab - 1] = setDataOnLocalStorage;
              localStorage.setItem('Search', JSON.stringify(updatedData));
            }
            router.push(
              `/v2/search?active-tab=${SubRoutes.RESULT}-${activeTab}`
            );
          } else {
            let setDataOnLocalStorage = {
              id: id,
              saveSearchName: saveSearchName,
              searchId: data?.search_id,
              isSavedSearch: isSavedParams,
              queryParams
            };

            localStorage.setItem(
              'Search',
              JSON.stringify([...addSearches, setDataOnLocalStorage])
            );
            router.push(
              `/v2/search?active-tab=${SubRoutes.RESULT}-${
                JSON.parse(localStorage.getItem('Search')!).length
              }`
            );
          }
          // return;
        }
      } else {
        setIsError(true);
        setErrorText(SELECT_SOME_PARAM);
      }
    }
  };

  const handleFormReset = () => {
    setSelectedStep('');
    setSelectedShadeContain('');
    setSearchCount(0);
    setIsError(false);
    setErrorText('');
    setValidationError('');
    handleReset(setState, errorSetState);
  };
  const handleAddDemand = () => {
    logger.info('Add demand');
  };

  let actionButtonData: IActionButtonDataItem[] = [
    {
      variant: 'secondary',
      // svg: arrowIcon,
      label: ManageLocales('app.advanceSearch.cancel'),
      handler: () => {
        if (
          modifySearchFrom ===
          `${ManageLocales('app.search.savedSearchesRoute')}`
        ) {
          router.push(
            `/search?active-tab=${ManageLocales(
              'app.search.savedSearchesRoute'
            )}`
          );
        } else if (modifySearchFrom === `${SubRoutes.SAVED_SEARCH})}`) {
          router.push(
            `/search?active-tab=${SubRoutes.RESULT}-${activeTab + 1}`
          );
        }
      },
      isHidden:
        modifySearchFrom !==
          `${ManageLocales('app.search.savedSearchesRoute')}` &&
        modifySearchFrom !== `${SubRoutes.RESULT}`
    },
    {
      variant: 'secondary',
      // svg: arrowIcon,
      label: ManageLocales('app.advanceSearch.reset'),
      handler: handleFormReset
    },

    {
      variant: 'secondary',
      // svg: bookmarkAddIcon,
      label: `${ManageLocales('app.advanceSearch.saveSearch')}`,
      handler: () => {}
    },
    {
      variant: 'primary',
      // svg: errorText === NO_STONE_FOUND ? addDemand : searchIcon,
      label: `${errorText === NO_STONE_FOUND ? 'Add Demand' : 'Search'} `,
      handler: errorText === NO_STONE_FOUND ? handleAddDemand : handleFormSearch
    }
  ];

  return (
    <div className="pt-[32px]">
      <div>
        <div className="flex flex-col gap-[16px]">
          <div>
            <span className="text-neutral900 text-headingM font-medium grid gap-[24px]">
              Search for Diamonds
            </span>
          </div>
          {searchParameters.length > 0 ? (
            <div className="flex gap-[12px] flex-wrap border-[1px] border-neutral200 p-[16px]">
              <Breadcrum
                searchParameters={searchParameters}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleCloseSpecificTab={handleCloseSpecificTab}
              />
              <div className="pr-[2px] flex gap-[12px]  justify-end flex-wrap">
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'secondary',
                      svg: BinIcon,
                      handler: handleCloseAllTabs
                    }
                  ]}
                />
              </div>
            </div>
          ) : (
            ''
          )}

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
              <Lab selectedLab={selectedLab} setSelectedLab={setSelectedLab} />
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

          <Inclusions state={state} setState={setState} />
          <KeyToSymbol
            selectedKeyToSymbol={selectedKeyToSymbol}
            setSelectedKeyToSymbol={setSelectedKeyToSymbol}
          />
        </div>
      </div>
      <div
        className={`grid backdrop-blur-sm  gap-[8px]  sticky bottom-0 z-50 h-[72px] py-[16px] border-t-[1px] border-neutral200 flex ${'justify-end'} `}
      >
        <div
          className={` flex items-center md:grid-cols-1 lg:grid-cols-2 w-full  ${
            isError ? 'justify-between' : 'justify-end'
          } `}
        >
          {isError && (
            <>
              <span className="hidden  text-successMain" />
              <span
                className={`text-mRegular font-medium text-${messageColor}`}
              >
                {!isValidationError && errorText}
              </span>
            </>
          )}
          <ActionButton actionButtonData={actionButtonData} />
        </div>
      </div>
    </div>
  );
};

export default Form;
