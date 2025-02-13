'use client';

import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import { anchor } from '@/constants/v2/form';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';
import { Shape } from './components/shape';
import Setting from '@public/v2/assets/icons/match-pair-setting.svg?url';
import { Carat } from './components/carat';
import { Color } from './components/color';
import styles from '@components/v2/common/data-table/data-table.module.scss';
import { useLazyGetProductCountQuery } from '@/features/api/product';
import useValidationStateManagement from '../hooks/validation-state-management';
import { generateQueryParams } from './helpers/generate-query-parameters';
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
  EXCEEDS_LIMITS,
  EXCEEDS_LIMITS_MATCHING_PAIR,
  NO_MATCHING_PAIRS_FOUND,
  NO_STONE_FOUND,
  SELECT_SOME_PARAM,
  SOMETHING_WENT_WRONG
} from '@/constants/error-messages/form';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { setModifySearch } from './helpers/modify-search';
import { useAppSelector } from '@/hooks/hook';
// import logger from 'logging/log-util';
import {
  useAddSavedSearchMutation,
  useUpdateSavedSearchMutation
} from '@/features/api/saved-searches';
import Breadcrum from '@/components/v2/common/search-breadcrum/breadcrum';
import { MatchSubRoutes, Routes, SubRoutes } from '@/constants/v2/enums/routes';
import BinIcon from '@public/v2/assets/icons/bin.svg';
import Image from 'next/image';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import bookmarkIcon from '@public/v2/assets/icons/modal/bosaveSearchNameokmark.svg';
import { InputField } from '@/components/v2/common/input-field';

import { constructUrlParams } from '@/utils/v2/construct-url-params';
import CommonPoppup from '../../login/component/common-poppup';
import { kycStatus } from '@/constants/enums/kyc';

import CustomSwitch from '@/components/v2/common/switch/switch';

// import { Switch } from '@/components/v2/ui/switch';

export interface ISavedSearch {
  saveSearchName: string;
  isSavedSearch: boolean;
  label: string;
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
  // carat,
  errorState,
  errorSetState,
  setIsDialogOpen,
  setDialogContent,
  addSearches,
  setAddSearches,
  setIsLoading,

  isLoading,
  setIsCommonLoading,

  setBid
}: {
  searchUrl: string;
  setSearchUrl: Dispatch<SetStateAction<string>>;
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  searchParameters?: any;
  handleCloseAllTabs: () => void;
  handleCloseSpecificTab: (_id: number) => void;
  state: any;
  setState: any;
  carat: any;
  errorState: any;
  errorSetState: any;
  setIsDialogOpen: any;
  setDialogContent: any;
  addSearches?: any;
  setAddSearches?: any;
  setIsLoading: any;
  setIsAddDemand: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsCommonLoading: Dispatch<SetStateAction<boolean>>;
  isTurkey?: boolean;
  time?: any;
  setRowSelection?: any;
  setIsMPSOpen?: any;
  setBid?: any;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subRoute = useSearchParams().get('active-tab');
  const routePath = usePathname();
  const modifySearchFrom = searchParams.get('edit');
  const savedSearch: any = useAppSelector(
    (store: { savedSearch: any }) => store.savedSearch
  );
  const { modalState, modalSetState } = useModalStateManagement();
  const { isInputDialogOpen } = modalState;

  const { setIsInputDialogOpen } = modalSetState;
  const { setSaveSearchName, setInputError, inputError } =
    useValidationStateManagement();
  const newArrivalFilterData = useAppSelector(state => state.filterNewArrival);
  const bidToBuyFilterData = useAppSelector(state => state.filterBidToBuy);

  const [isAllowedToUnload, setIsAllowedToUnload] = useState(true);
  const isAllowedToUnloadRef = useRef(isAllowedToUnload);

  const {
    caratMax,
    caratRangeSelectionTemp,
    caratRangeSelection,
    caratMin,
    selectedClarity,
    selectedShape,
    selectedColor,
    selectedWhiteColor,
    selectedLab,
    selectedLocation,
    selectedOrigin,
    selectedShade,
    milky,
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
    selectedOvertone,
    selectionChecked,
    isSliderActive,
    showOnlyWithVideo
  } = state;
  const {
    setCaratMin,
    setCaratMax,
    setSelectedClarity,
    setSelectedShape,
    setSelectedColor,
    setCaratRangeSelectionTemp,
    setCaratRangeSelection,
    setSelectedWhiteColor,
    setSelectedFancyColor,
    setMilky,
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
    setSelectedCaratRange,
    setSelectionChecked,
    setIsSliderActive,
    setShowOnlyWithVideo
  } = setState;

  const {
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

    setMinMaxError,
    minMaxError
  } = useValidationStateManagement();

  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();

  let [
    triggerProductCountApi,
    { isLoading: isLoadingProductApi, isFetching: isFetchingProductApi }
  ] = useLazyGetProductCountQuery();

  // const { errorState, errorSetState } = useNumericFieldValidation();

  const { caratError, discountError, pricePerCaratError, amountRangeError } =
    errorState;
  const {
    setCaratError,
    setDiscountError,
    setPricePerCaratError,
    setAmountRangeError
  } = errorSetState;

  // Sync useRef with useState
  useEffect(() => {
    isAllowedToUnloadRef.current = isAllowedToUnload;
  }, [isAllowedToUnload]);

  // Reset form when a new search is initiated
  useEffect(() => {
    if (subRoute === SubRoutes.NEW_SEARCH) {
      handleFormReset();
    }
  }, [subRoute]);

  useEffect(() => {
    if (searchUrl.length > 0) {
      setErrorText('');
      setIsLoading(true);
      triggerProductCountApi({
        searchUrl: `${searchUrl}`
      })
        .unwrap()
        .then((response: any) => {
          setData(response), setError(''), setIsLoading(false);
        })
        .catch(e => {
          setError(e), setIsLoading(false);
        });
    }
  }, [searchUrl]);

  const DEBOUNCE_DELAY = 800; // Adjust delay as needed (in milliseconds)
  // Create a ref to hold the timeout ID
  const debounceTimeout = useRef<any | null>(null);

  // Update search URL when form state changes
  useEffect(() => {
    // Function to execute after debounce delay
    const handleSearchUrlUpdate = () => {
      // setErrorText('');
      const queryParams = generateQueryParams(state);

      if (!isValidationError && !isSliderActive && !minMaxError) {
        setSearchUrl(constructUrlParams(queryParams));
      }
    };

    // Clear the previous timeout if it exists
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout
    debounceTimeout.current = setTimeout(handleSearchUrlUpdate, DEBOUNCE_DELAY);

    // Cleanup function to clear the timeout when the component unmounts or the dependencies change
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [state]);

  //Handle search count and errors
  useEffect(() => {
    if (searchCount !== -1) {
      if (searchUrl) {
        if (
          data?.count > MAX_SEARCH_FORM_COUNT &&
          data?.count > MIN_SEARCH_FORM_COUNT &&
          routePath !== Routes.NEW_ARRIVAL
        ) {
          setIsError(true);
          setErrorText(EXCEEDS_LIMITS);
          setMessageColor('dangerMain');
        } else if (data?.count === MIN_SEARCH_FORM_COUNT) {
          setIsError(true);
          setErrorText(NO_STONE_FOUND);
          setMessageColor('dangerMain');
        } else if (data?.count !== MIN_SEARCH_FORM_COUNT) {
          setMessageColor('successMain');
          setIsError(true);
          data?.count && setErrorText(`${data?.count} ${'stones'} found`);
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
    setIsCommonLoading(false);
    setIsLoading(false);
    let modifySearchResult = JSON.parse(localStorage.getItem('Search')!);

    setSelectedCaratRange([]);

    if (modifySearchFrom === `${SubRoutes.RESULT}` && modifySearchResult) {
      const replaceSubrouteWithSearchResult = subRoute?.replace(
        `${SubRoutes.RESULT}-`,
        ''
      );
      setActiveTab(parseInt(replaceSubrouteWithSearchResult!));
      setModifySearch(
        modifySearchResult[parseInt(replaceSubrouteWithSearchResult!) - 1]
          ?.queryParams,
        setState
      );
    }
  }, [modifySearchFrom]);

  useEffect(() => {
    let data: ISavedSearch[] | [] =
      JSON.parse(localStorage.getItem('Search')!) || [];
    if (data?.length > 0 && data[data?.length - 1] && setAddSearches) {
      setAddSearches(data);
    }
  }, []);

  const handleFormSearch = async (
    isSavedParams: boolean = false,
    id?: string,
    formIdentifier = 'Search'
  ) => {
    let localStorageDataLength = JSON.parse(
      localStorage.getItem(formIdentifier)!
    );

    let caratFrom;
    let caratTo;
    if (caratMin || caratMax) {
      caratFrom = parseFloat(
        caratMin && caratMin >= 0.15 && caratMin <= 50 ? caratMin : 0.15
      ).toFixed(2);
      caratTo = parseFloat(
        caratMax && caratMax <= 50 && caratMax >= 0.15 ? caratMax : 50
      ).toFixed(2);

      !selectedCaratRange.includes(`${caratFrom}-${caratTo}`) &&
        parseFloat(caratFrom) <= parseFloat(caratTo) &&
        setSelectedCaratRange([
          ...selectedCaratRange,
          `${caratFrom}-${caratTo}`
        ]);
    }
    if (
      JSON.parse(localStorage.getItem(formIdentifier)!)?.length >=
        MAX_SEARCH_TAB_LIMIT &&
      modifySearchFrom !== `${SubRoutes.RESULT}`
    ) {
      setDialogContent(
        <CommonPoppup
          content={ManageLocales('app.search.maxTabReached.content')}
          status="warning"
          customPoppupBodyStyle="!mt-[70px]"
          header={ManageLocales('app.search.maxTabReached')}
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.modal.cancel'),
              handler: () => {
                setIsDialogOpen(false);
              },
              customStyle: 'flex-1 h-10'
            },
            {
              variant: 'primary',
              label: ManageLocales('app.modal.manageTabs'),
              handler: () => {
                formIdentifier === 'MatchingPair'
                  ? router.push(
                      `/v2/matching-pair?active-tab=${MatchSubRoutes.RESULT}-1`
                    )
                  : router.push(`/v2/search?active-tab=${SubRoutes.RESULT}-1`);

                setIsDialogOpen(false);
              },
              customStyle: 'flex-1 h-10'
            }
          ]}
        />
      );
      setSearchUrl('');
      setIsDialogOpen(true);
    } else if (
      (searchUrl || (caratFrom && caratTo)) &&
      data?.count > MIN_SEARCH_FORM_COUNT &&
      minMaxError.length === 0
    ) {
      if (
        data?.count <= MAX_SEARCH_FORM_COUNT &&
        data?.count > MIN_SEARCH_FORM_COUNT
      ) {
        const queryParams = generateQueryParams(state);
        setCaratMax('');
        setCaratMin('');

        setIsAllowedToUnload(false);
        let setDataOnLocalStorage = {
          id: id,
          saveSearchName: saveSearchName,
          searchId: data?.search_id,
          label:
            // `Result ${
            //   localStorageDataLength ? localStorageDataLength.length + 1 : 1
            // }`,
            !!saveSearchName
              ? saveSearchName?.replace(/\s+/g, '') +
                ' ' +
                ((localStorageDataLength?.length || 0) + 1)
              : `Result ${
                  localStorageDataLength ? localStorageDataLength.length + 1 : 1
                }`,
          isSavedSearch: isSavedParams,
          queryParams
        };

        localStorage.setItem(
          formIdentifier,
          JSON.stringify([...addSearches, setDataOnLocalStorage])
        );
        router.push(
          `/v2/search?active-tab=${SubRoutes.RESULT}-${
            JSON.parse(localStorage.getItem(formIdentifier)!).length
          }`
        );
      } else {
        setIsError(true);
      }
      setSearchUrl('');
    } else {
      setIsError(true);
      setErrorText(SELECT_SOME_PARAM);
      setSearchUrl('');
    }
  };

  const handleFormReset = () => {
    setSelectedStep('');
    setIsSliderActive(false);
    setSelectedShadeContain('');
    setSearchCount(0);
    setIsError(false);
    setErrorText('');
    setMinMaxError('');
    setValidationError('');
    handleReset(setState, errorSetState);
    setData({});
  };

  let actionButtonData: IActionButtonDataItem[] = [
    {
      variant: 'secondary',
      label: ManageLocales('app.advanceSearch.cancel'),
      handler: () => {
        if (modifySearchFrom === `${SubRoutes.SAVED_SEARCH}`) {
          router.push(`/v2/search?active-tab=${SubRoutes.SAVED_SEARCH}`);
        } else if (modifySearchFrom === `${SubRoutes.RESULT}`) {
          router.push(`/v2/search?active-tab=${SubRoutes.RESULT}-${activeTab}`);
        }
      },
      isHidden:
        modifySearchFrom !== `${SubRoutes.SAVED_SEARCH}` &&
        modifySearchFrom !== `${SubRoutes.RESULT}`
    },
    {
      variant: 'secondary',
      label: ManageLocales('app.advanceSearch.reset'),
      handler: () => {
        if (setBid) {
          setBid(newArrivalFilterData.bidData);
        }
        handleFormReset();
      }
    },

    {
      variant: 'primary',
      label:
        // 'Search',
        `${
          !isLoadingProductApi &&
          !isLoading &&
          !isFetchingProductApi &&
          minMaxError.length === 0 &&
          validationError.length === 0 &&
          errorText === NO_STONE_FOUND
            ? 'Add Demand'
            : 'Search'
        } `,
      handler:
        minMaxError.length === 0 && errorText === NO_MATCHING_PAIRS_FOUND
          ? () => {}
          : handleFormSearch,

      isDisable:
        !searchUrl.length ||
        minMaxError.length > 0 ||
        validationError.length > 0 ||
        (routePath === Routes.BID_TO_BUY && errorText === NO_STONE_FOUND)
          ? // errorText.length > 0
            true
          : false ||
            (!(isLoading || isLoadingProductApi || isFetchingProductApi) &&
              data?.count > MAX_SEARCH_FORM_COUNT &&
              data?.count > MIN_SEARCH_FORM_COUNT),

      isLoading: isLoading || isLoadingProductApi || isFetchingProductApi
    }
  ];
  console.log('searchUrl', searchUrl, minMaxError, validationError);

  return (
    <div className=" flex flex-col gap-[24px]">
      <div>
        <div className="py-2">
          <span className="text-neutral900 text-lRegular font-medium grid gap-[24px]">
            <div
              className={`${
                routePath.includes('v2/matching-pair') &&
                'flex justify-between items-center'
              }`}
            >
              Search for Diamonds
            </div>
          </span>
        </div>

        <div className="flex flex-col gap-[16px]">
          {searchParameters?.length > 0 ? (
            <div className="flex justify-between border-[1px] border-neutral200  px-[16px] py-[8px]">
              <div className="flex gap-[12px] flex-wrap ">
                <Breadcrum
                  searchParameters={searchParameters}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  handleCloseSpecificTab={handleCloseSpecificTab}
                  setIsLoading={setIsLoading}
                />
              </div>
              <div className="pr-[2px] flex justify-end flex-wrap">
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'secondary',
                      svg: BinIcon,
                      handler: handleCloseAllTabs,
                      customStyle: 'w-[40px] h-[40px]',
                      tooltip: 'Close all tabs'
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

          <Carat
            caratMax={caratMax}
            caratMin={caratMin}
            caratRangeSelectionTemp={caratRangeSelectionTemp}
            setCaratRangeSelectionTemp={setCaratRangeSelectionTemp}
            setCaratRangeSelection={setCaratRangeSelection}
            caratRangeSelection={caratRangeSelection}
            setCaratMin={setCaratMin}
            setCaratMax={setCaratMax}
            selectedCaratRange={selectedCaratRange}
            setSelectedCaratRange={setSelectedCaratRange}
            caratError={caratError}
            setCaratError={setCaratError}
            setValidationError={setValidationError}
            validationError={validationError}
          />
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-[16px]">
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

            <Clarity
              setSelectedClarity={setSelectedClarity}
              selectedClarity={selectedClarity}
            />
          </div>
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
            <div className="flex flex-col gap-[27px]">
              {(routePath.includes('v2/matching-pair') ||
                routePath.includes('v2/bid-2-buy') ||
                routePath.includes('v2/search') ||
                subRoute === SubRoutes.NEW_ARRIVAL) && (
                <div className="flex items-center  justify-between bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[4px]">
                  <p className="font-medium py-[5px] rounded-l-[4px]  px-[12px] bg-neutral50 text-neutral900 text-mMedium">
                     Images & Videos Required
                  </p>
                  <div className="px-[15px] pt-1">
                    <CustomSwitch
                      isOn={showOnlyWithVideo}
                      handleToggle={() => {
                        setShowOnlyWithVideo((prev: any) => !prev);
                      }}
                    />
                  </div>
                </div>
              )}

              <Fluorescence state={state} setState={setState} />
            </div>
            <CountryOfOrigin
              selectedOrigin={selectedOrigin}
              setSelectedOrigin={setSelectedOrigin}
            />
          </div>
          <Shade
            selectedShade={selectedShade}
            setSelectedShade={setSelectedShade}
            setMilky={setMilky}
            milky={milky}
          />

          <DiscountPrice
            setIsSliderActive={setIsSliderActive}
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
            setMinMaxError={setMinMaxError}
          />

          <Parameters
            state={state}
            setState={setState}
            errorSetState={errorSetState}
            errorState={errorState}
            setMinMaxError={setMinMaxError}
          />

          <Inclusions state={state} setState={setState} />
          <KeyToSymbol
            selectedKeyToSymbol={selectedKeyToSymbol}
            setSelectedKeyToSymbol={setSelectedKeyToSymbol}
            setSelectionChecked={setSelectionChecked}
            selectionChecked={selectionChecked}
          />
        </div>
      </div>
      <div
        className={`grid backdrop-blur-sm  gap-[8px]  sticky bottom-0 z-[2] h-[72px] py-[16px] border-t-[1px] border-neutral200 flex w-full `}
      >
        <div
          className={` flex items-center w-full  ${
            isError || minMaxError || validationError
              ? 'justify-between'
              : 'justify-end'
          } `}
        >
          {(isError ||
            minMaxError.length > 0 ||
            validationError.length > 0) && (
            <div>
              <span className="hidden  text-successMain" />
              <span
                className={`text-mRegular font-medium text-${
                  minMaxError.length > 0 ||
                  validationError.length > 0 ||
                  errorText === EXCEEDS_LIMITS ||
                  errorText === EXCEEDS_LIMITS_MATCHING_PAIR ||
                  errorText === NO_MATCHING_PAIRS_FOUND ||
                  errorText === NO_STONE_FOUND
                    ? 'dangerMain'
                    : messageColor
                } pl-[8px]`}
              >
                {isLoadingProductApi || isLoading || isFetchingProductApi
                  ? ''
                  : minMaxError.length
                  ? minMaxError
                  : validationError.length
                  ? validationError
                  : !isValidationError && errorText}
              </span>
            </div>
          )}
          <div className="pr-[16px]">
            {' '}
            <ActionButton actionButtonData={actionButtonData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
