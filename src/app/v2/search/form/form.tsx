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
import { Carat } from './components/carat';
import { Color } from './components/color';
import {
  useAddDemandMutation,
  useLazyGetProductCountQuery
} from '@/features/api/product';
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
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';

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
import { useRouter, useSearchParams } from 'next/navigation';
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
import bookmarkIcon from '@public/v2/assets/icons/modal/bookmark.svg';
import { InputField } from '@/components/v2/common/input-field';
import { isSearchAlreadyExist } from '../saved-search/helpers/handle-card-click';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import CommonPoppup from '../../login/component/common-poppup';
import { kycStatus } from '@/constants/enums/kyc';
import { useLazyGetMatchingPairCountQuery } from '@/features/api/match-pair';
import { useAppDispatch } from '@/hooks/hook';
import { useSharePageEventMutation } from '@/features/api/track-page';
import {
  resetTimeTracking,
  setEndTime,
  setIsSuccess
} from '@/features/track-page-event/track-page-event-slice';
import { filterFunction } from '@/features/filter-new-arrival/filter-new-arrival-slice';
import { parseQueryString } from './helpers/parse-query-string';
import { filterBidData } from './helpers/filter-bid-data';
import { filterBidToBuyFunction } from '@/features/filter-bid-to-buy/filter-bid-to-buy-slice';
import { queryParamsFunction } from '@/features/event-params/event-param-slice';

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
  // carat,
  errorState,
  errorSetState,
  setIsDialogOpen,
  setDialogContent,
  addSearches,
  setAddSearches,
  setIsLoading,
  setIsAddDemand,
  isMatchingPair = false,
  isLoading,
  setIsCommonLoading,
  isTurkey = false
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
  isMatchingPair: boolean;
  isLoading: boolean;
  setIsCommonLoading: Dispatch<SetStateAction<boolean>>;
  isTurkey?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subRoute = useSearchParams().get('active-tab');

  const modifySearchFrom = searchParams.get('edit');
  const savedSearch: any = useAppSelector(
    (store: { savedSearch: any }) => store.savedSearch
  );

  const { startTime, endTime } = useAppSelector(
    state => state.pageTimeTracking
  );

  const newArrivalFilterData = useAppSelector(state => state.filterNewArrival);
  const bidToBuyFilterData = useAppSelector(state => state.filterBidToBuy);

  const [isAllowedToUnload, setIsAllowedToUnload] = useState(true);
  const isAllowedToUnloadRef = useRef(isAllowedToUnload);

  const dispatch = useAppDispatch();

  const [sharePageEvent] = useSharePageEventMutation();

  const [updateSavedSearch] = useUpdateSavedSearchMutation();
  let [addSavedSearch] = useAddSavedSearchMutation();
  const [addDemandApi] = useAddDemandMutation();

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
    isSliderActive
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
    setIsSliderActive
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
    setSaveSearchName,
    setInputError,
    inputError,
    setMinMaxError,
    minMaxError
  } = useValidationStateManagement();

  const { modalState, modalSetState } = useModalStateManagement();
  const { isInputDialogOpen } = modalState;

  const { setIsInputDialogOpen } = modalSetState;
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const queryParamsData = useAppSelector(state => state.queryParams);

  let [
    triggerProductCountApi,
    { isLoading: isLoadingProductApi, isFetching: isFetchingProductApi }
  ] = useLazyGetProductCountQuery();
  let [
    triggerMatchingPairCountApi,
    { isLoading: isLoadingMatchPairApi, isFetching: isFetchingMatchPairApi }
  ] = useLazyGetMatchingPairCountQuery();
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

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (isAllowedToUnloadRef.current && startTime && !endTime) {
        const dropEndTime = new Date().toISOString();
        dispatch(setEndTime(dropEndTime));
        dispatch(setIsSuccess(false));
        try {
          await sharePageEvent({
            startTime,
            endTime: dropEndTime,
            page: 'search',
            is_success: false
          });

          dispatch(resetTimeTracking());
        } catch (error) {
          console.log(`Error logging time on drop-off: ${error}`);
        }
      }
    };

    return () => {
      handleBeforeUnload();
    };
  }, [startTime]);

  useEffect(() => {
    if (subRoute === SubRoutes.NEW_ARRIVAL) {
      const query = parseQueryString(searchUrl);

      const filteredData =
        newArrivalFilterData?.bidData &&
        filterBidData(newArrivalFilterData?.bidData, query);

      setData({
        count: filteredData.length,
        products: filteredData
      });

      setError('');
    } else if (subRoute === SubRoutes.BID_TO_BUY) {
      const query = parseQueryString(searchUrl);

      const filteredData =
        bidToBuyFilterData?.bidData &&
        filterBidData(bidToBuyFilterData?.bidData, query);

      setData({
        count: filteredData.length,
        products: filteredData
      });

      setError('');
    } else if (isTurkey) {
      setErrorText('');
      setIsLoading(true);
      triggerProductCountApi({ searchUrl: `${searchUrl}&turkey_event=true` })
        .unwrap()
        .then((response: any) => {
          setData(response), setError(''), setIsLoading(false);
        })
        .catch(e => {
          setError(e), setIsLoading(false);
        });
    } else if (searchUrl.length > 0) {
      setErrorText('');
      setIsLoading(true);
      isMatchingPair
        ? triggerMatchingPairCountApi({ searchUrl })
            .unwrap()
            .then((response: any) => {
              setData(response), setError(''), setIsLoading(false);
            })
            .catch(e => {
              setError(e), setIsLoading(false);
            })
        : triggerProductCountApi({ searchUrl })
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
          (isMatchingPair
            ? data?.count > MAX_SEARCH_FORM_COUNT / 2
            : data?.count > MAX_SEARCH_FORM_COUNT) &&
          data?.count > MIN_SEARCH_FORM_COUNT
        ) {
          setIsError(true);
          setErrorText(
            isMatchingPair ? EXCEEDS_LIMITS_MATCHING_PAIR : EXCEEDS_LIMITS
          );
          setMessageColor('dangerMain');
        } else if (data?.count === MIN_SEARCH_FORM_COUNT) {
          setIsError(true);
          setErrorText(
            isMatchingPair ? NO_MATCHING_PAIRS_FOUND : NO_STONE_FOUND
          );
          setMessageColor('dangerMain');
        } else if (data?.count !== MIN_SEARCH_FORM_COUNT) {
          setMessageColor('successMain');
          setIsError(true);
          data?.count &&
            setErrorText(
              `${data?.count} ${
                isMatchingPair ? 'matching pairs' : 'stones'
              } found`
            );
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
    let modifySearchResult = JSON.parse(
      isMatchingPair
        ? localStorage.getItem('MatchingPair')!
        : localStorage.getItem('Search')!
    );

    let modifysavedSearchData = savedSearch?.savedSearch?.meta_data;
    let newArrivalBidDataQuery = newArrivalFilterData.queryParams;
    let bidToBuyBidDataQuery = bidToBuyFilterData.queryParams;
    setSelectedCaratRange([]);

    if (subRoute === SubRoutes.NEW_ARRIVAL && newArrivalBidDataQuery) {
      setModifySearch(newArrivalBidDataQuery, setState);
    } else if (subRoute === SubRoutes.BID_TO_BUY && bidToBuyBidDataQuery) {
      setModifySearch(bidToBuyBidDataQuery, setState);
    } else if (
      modifySearchFrom === `${SubRoutes.SAVED_SEARCH}` &&
      modifysavedSearchData
    ) {
      setModifySearch(modifysavedSearchData, setState);
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
        setState
      );
    }
  }, [modifySearchFrom]);

  useEffect(() => {
    let data: ISavedSearch[] | [] =
      JSON.parse(
        isMatchingPair
          ? localStorage.getItem('MatchingPair')!
          : localStorage.getItem('Search')!
      ) || [];
    if (data?.length > 0 && data[data?.length - 1] && setAddSearches) {
      setAddSearches(data);
    }
  }, []);

  // useEffect(()=>{
  //   if (
  //     caratMin ||
  //     caratMax
  //   ) {
  //     const caratFrom = parseFloat((caratMin&&caratMin >= 0.15 )? caratMin:0.15).toFixed(2);
  //     const caratTo = parseFloat((caratMax&& caratMax <= 50)? caratMax : 50).toFixed(2);
  //     setCaratRangeSelection([
  //       ...caratRangeSelection,
  //       `${caratFrom}-${caratTo}`
  //     ]);
  //     // setSelectedCaratRange([
  //     //   ...selectedCaratRange,
  //     //   `${caratFrom}-${caratTo}`
  //     // ]);
  //   }
  // },[caratMin,caratMax])

  // Reset form when a new search is initiated
  useEffect(() => {
    if (
      subRoute === SubRoutes.NEW_SEARCH ||
      (subRoute === SubRoutes.NEW_ARRIVAL &&
        !newArrivalFilterData.queryParams) ||
      (subRoute === SubRoutes.BID_TO_BUY && !bidToBuyFilterData.queryParams)
    ) {
      handleFormReset();
    }
  }, [subRoute]);

  useEffect(() => {
    if (isTurkey) {
      let queryData = constructUrlParams(queryParamsData.queryParams);
      setModifySearch(queryParamsData.queryParams, setState);
      setSearchUrl(queryData);
    }
  }, [queryParamsData]);
  const handleFormSearch = async (
    isSavedParams: boolean = false,
    id?: string,
    formIdentifier = 'Search'
  ) => {
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
    if (subRoute === SubRoutes.NEW_ARRIVAL) {
      const queryParams = generateQueryParams(state);

      dispatch(
        filterFunction({
          queryParams,
          bidData: newArrivalFilterData.bidData,
          bidFilterData: data?.products
        })
      );
      router.push(`/v2/new-arrivals`);
      setSearchUrl('');
    } else if (subRoute === SubRoutes.BID_TO_BUY) {
      const queryParams = generateQueryParams(state);

      dispatch(
        filterBidToBuyFunction({
          queryParams,
          bidData: bidToBuyFilterData.bidData,
          bidFilterData: data?.products
        })
      );
      router.push(`/v2/bid-2-buy`);
      setSearchUrl('');
    } else if (isTurkey) {
      dispatch(
        queryParamsFunction({
          queryParams: generateQueryParams(state)
        })
      );
      router.push(`/v2/turkey`);
    } else if (
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
        (formIdentifier === 'MatchingPair'
          ? data?.count < MAX_SEARCH_FORM_COUNT / 2
          : data?.count < MAX_SEARCH_FORM_COUNT) &&
        data?.count > MIN_SEARCH_FORM_COUNT
      ) {
        const queryParams = generateQueryParams(state);
        setCaratMax('');
        setCaratMin('');

        if (
          modifySearchFrom === `${SubRoutes.SAVED_SEARCH}` ||
          modifySearchFrom === `${MatchSubRoutes.SAVED_SEARCH}`
        ) {
          if (savedSearch?.savedSearch?.meta_data) {
            let updatedMeta = queryParams;

            let updateSavedSearchData = {
              id: savedSearch.savedSearch.id,
              meta_data: updatedMeta,
              diamond_count: parseInt(data?.count),
              is_matching_pair: isMatchingPair
            };

            updateSavedSearch(updateSavedSearchData).then(() => {
              let setDataOnLocalStorage = {
                id: savedSearch?.savedSearch.id,
                saveSearchName: savedSearch?.savedSearch?.name,
                searchId: data?.search_id,
                isSavedSearch: true,
                queryParams
              };
              let localStorageData = JSON.parse(
                localStorage.getItem(formIdentifier)!
              );

              let isAlreadyOpenIndex = isSearchAlreadyExist(
                localStorageData,
                savedSearch?.savedSearch?.name
              );

              if (isAlreadyOpenIndex >= 0 && isAlreadyOpenIndex !== null) {
                formIdentifier === 'MatchingPair'
                  ? router.push(
                      `${Routes.MATCHING_PAIR}?active-tab=${SubRoutes.RESULT}-${
                        isAlreadyOpenIndex + 1
                      }`
                    )
                  : router.push(
                      `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                        isAlreadyOpenIndex + 1
                      }`
                    );
              } else {
                localStorage.setItem(
                  formIdentifier,
                  JSON.stringify([...addSearches, setDataOnLocalStorage])
                );
                formIdentifier === 'MatchingPair'
                  ? router.push(
                      `/v2/matching-pair?active-tab=${MatchSubRoutes.RESULT}-${
                        JSON.parse(localStorage.getItem(formIdentifier)!).length
                      }`
                    )
                  : router.push(
                      `/v2/search?active-tab=${SubRoutes.RESULT}-${
                        JSON.parse(localStorage.getItem(formIdentifier)!).length
                      }`
                    );
              }
            });
          }
        } else if (
          modifySearchFrom === `${SubRoutes.RESULT}` ||
          modifySearchFrom === `${MatchSubRoutes.RESULT}`
        ) {
          let modifySearchResult = JSON.parse(
            localStorage.getItem(formIdentifier)!
          );
          let setDataOnLocalStorage = {
            id: modifySearchResult[activeTab - 1]?.id || id,
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
            localStorage.setItem(formIdentifier, JSON.stringify(updatedData));
          }
          formIdentifier === 'MatchingPair'
            ? router.push(
                `/v2/matching-pair?active-tab=${MatchSubRoutes.RESULT}-${activeTab}`
              )
            : router.push(
                `/v2/search?active-tab=${SubRoutes.RESULT}-${activeTab}`
              );
        } else {
          setIsAllowedToUnload(false);
          let setDataOnLocalStorage = {
            id: id,
            saveSearchName: saveSearchName,
            searchId: data?.search_id,
            isSavedSearch: isSavedParams,
            queryParams
          };

          if (startTime && !endTime) {
            const endTime = new Date().toISOString();
            dispatch(setEndTime(endTime));
            dispatch(setIsSuccess(true));
            await sharePageEvent({
              startTime,
              endTime,
              page: 'search',
              is_success: true
            });

            dispatch(resetTimeTracking());
          }

          localStorage.setItem(
            formIdentifier,
            JSON.stringify([...addSearches, setDataOnLocalStorage])
          );
          formIdentifier === 'MatchingPair'
            ? router.push(
                `/v2/matching-pair?active-tab=${MatchSubRoutes.RESULT}-${
                  JSON.parse(localStorage.getItem(formIdentifier)!).length
                }`
              )
            : router.push(
                `/v2/search?active-tab=${SubRoutes.RESULT}-${
                  JSON.parse(localStorage.getItem(formIdentifier)!).length
                }`
              );
        }
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
  const handleMatchingPairSearch = () => {
    handleFormSearch(false, '', 'MatchingPair');
  };
  // Function: Save and search
  const handleSaveAndSearch: any = async (formIdentifier = 'Search') => {
    if (
      JSON.parse(localStorage.getItem(formIdentifier)!)?.length >=
        MAX_SEARCH_TAB_LIMIT &&
      modifySearchFrom !== `${ManageLocales('app.search.resultRoute')}` &&
      modifySearchFrom !== `${SubRoutes.SAVED_SEARCH}`
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
                setIsDialogOpen(false);

                formIdentifier === 'MatchingPair'
                  ? router.push(
                      `/v2/matching-pair?active-tab=${SubRoutes.RESULT}-1`
                    )
                  : router.push(`/v2/search?active-tab=${SubRoutes.RESULT}-1`);
              },
              customStyle: 'flex-1 h-10'
            }
          ]}
        />
      );
      setIsDialogOpen(true);
    } else if (searchUrl && data?.count > MIN_SEARCH_FORM_COUNT) {
      if (
        (formIdentifier === 'MatchingPair'
          ? data?.count < MAX_SEARCH_FORM_COUNT / 2
          : data?.count < MAX_SEARCH_FORM_COUNT) &&
        data?.count > MIN_SEARCH_FORM_COUNT
      ) {
        const queryParams = generateQueryParams(state);

        const activeSearch: number =
          addSearches[activeTab - 1]?.saveSearchName.length;

        if (modifySearchFrom === `${SubRoutes.SAVED_SEARCH}`) {
          if (savedSearch?.savedSearch?.meta_data) {
            let updatedMeta = queryParams;
            let updateSavedData = {
              id: savedSearch.savedSearch.id,
              meta_data: updatedMeta,
              diamond_count: parseInt(data?.count),
              is_matching_pair: isMatchingPair
            };
            updateSavedSearch(updateSavedData);

            let localStorageData = JSON.parse(
              isMatchingPair
                ? localStorage.getItem('MatchingPair')!
                : localStorage.getItem('Search')!
            );

            let isAlreadyOpenIndex = isSearchAlreadyExist(
              localStorageData,
              savedSearch?.savedSearch?.name
            );

            if (isAlreadyOpenIndex >= 0 && isAlreadyOpenIndex !== null) {
              let setDataOnLocalStorage = {
                id: savedSearch.savedSearch.id,
                queryParams: updatedMeta,
                saveSearchName: savedSearch?.savedSearch?.name,
                searchId: data?.search_id,
                isSavedSearch: true
              };

              const updatedData = [...localStorageData];
              updatedData[isAlreadyOpenIndex] = setDataOnLocalStorage;
              localStorage.setItem(formIdentifier, JSON.stringify(updatedData));
            }
            formIdentifier === 'MatchingPair'
              ? router.push(
                  `${Routes.MATCHING_PAIR}?active-tab=${SubRoutes.SAVED_SEARCH}`
                )
              : router.push(
                  `${Routes.SEARCH}?active-tab=${SubRoutes.SAVED_SEARCH}`
                );
          }
        } else if (activeSearch) {
          const updatedMeta = addSearches;
          updatedMeta[activeTab - 1].queryParams = queryParams;
          let updateSaveSearchData = {
            id: updatedMeta[activeTab - 1].id,
            meta_data: updatedMeta[activeTab - 1].queryParams,
            diamond_count: parseInt(data?.count),
            is_matching_pair: isMatchingPair
          };
          updateSavedSearch(updateSaveSearchData)
            .unwrap()
            .then(() => {
              isMatchingPair
                ? handleFormSearch(true, '', 'MatchingPair')
                : handleFormSearch(true);
            })
            .catch((error: any) => {
              console.log(error);
            });
        } else {
          await addSavedSearch({
            name: saveSearchName,
            diamond_count: parseInt(data?.count),
            meta_data: queryParams,
            is_deleted: false,
            is_matching_pair: isMatchingPair
          })
            .unwrap()
            .then((res: any) => {
              isMatchingPair
                ? handleFormSearch(true, res.id, 'MatchingPair')
                : handleFormSearch(true, res.id);
            })
            .catch((error: any) => {
              setInputError(error.data.message);
            });
        }
      } else {
        setIsError(true);
        setErrorText(SELECT_SOME_PARAM);
      }
    } else {
      setIsError(true);
      setErrorText(SELECT_SOME_PARAM);
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
  };

  const handleAddDemand = () => {
    setIsLoading(true);
    setIsAddDemand(true);
    const queryParams = generateQueryParams(state);
    addDemandApi(queryParams)
      .then(_res => {
        setIsLoading(false);

        setIsDialogOpen(true);
        setDialogContent(
          <>
            {' '}
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={confirmIcon} alt="confirmIcon" />
            </div>
            <div className="absolute bottom-[20px] flex flex-col gap-[15px] w-[352px]">
              <div>
                <h1 className="text-headingS text-neutral900 font-medium">
                  {' '}
                  Thank you for submitting your demand! Your request has been
                  successfully received by our sales team.
                </h1>
              </div>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: 'Okay',
                    handler: () => {
                      handleFormReset();
                      setIsAddDemand(false);

                      setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 h-10'
                  }
                ]}
              />
            </div>
          </>
        );
      })
      .catch(_err => setIsLoading(false));
  };
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);

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
      handler: handleFormReset
    },

    {
      variant: 'secondary',
      label: `${ManageLocales('app.advanceSearch.saveSearch')}`,
      isDisable: !searchUrl.length,
      handler: () => {
        if (searchUrl) {
          if (
            (isMatchingPair
              ? data?.count < MAX_SEARCH_FORM_COUNT / 2
              : data?.count < MAX_SEARCH_FORM_COUNT) &&
            data?.count > MIN_SEARCH_FORM_COUNT
          ) {
            if (activeTab !== undefined) {
              const isSearchName: number =
                addSearches[activeTab - 1]?.saveSearchName.length;

              const isSaved: boolean =
                addSearches[activeTab - 1]?.isSavedSearch;
              // Check if the active search is not null and isSavedSearch is true
              if (modifySearchFrom === `${SubRoutes.SAVED_SEARCH}`) {
                handleSaveAndSearch(isMatchingPair && 'MatchingPair');
              } else if (isSaved) {
                handleSaveAndSearch(isMatchingPair && 'MatchingPair');
              } else if (!isSaved && isSearchName) {
                handleSaveAndSearch(isMatchingPair && 'MatchingPair');
              } else {
                searchUrl && setIsInputDialogOpen(true);
              }
            }
          } else {
            setIsError(true);
            // setErrorText(EXCEEDS_LIMITS);
          }
        } else {
          setIsError(true);
          setErrorText(SELECT_SOME_PARAM);
        }
      },

      isHidden:
        subRoute === SubRoutes.NEW_ARRIVAL ||
        subRoute === SubRoutes.BID_TO_BUY ||
        isTurkey
    },
    {
      variant: 'primary',
      label:
        // 'Search',
        `${
          isMatchingPair
            ? 'Search'
            : !isLoadingProductApi &&
              !isLoadingMatchPairApi &&
              !isFetchingMatchPairApi &&
              !isLoading &&
              !isFetchingProductApi &&
              minMaxError.length === 0 &&
              validationError.length === 0 &&
              errorText === NO_STONE_FOUND &&
              isKycVerified?.customer?.kyc?.status === kycStatus.APPROVED
            ? 'Add Demand'
            : 'Search'
        } `,
      handler:
        // errorText === NO_STONE_FOUND ? () => {} : handleFormSearch
        isMatchingPair
          ? minMaxError.length === 0 &&
            errorText === NO_MATCHING_PAIRS_FOUND &&
            isKycVerified?.customer?.kyc?.status === kycStatus.APPROVED
            ? () => {}
            : handleMatchingPairSearch
          : !isLoadingProductApi &&
            !isLoadingMatchPairApi &&
            !isFetchingMatchPairApi &&
            !isLoading &&
            !isFetchingProductApi &&
            minMaxError.length === 0 &&
            validationError.length === 0 &&
            errorText === NO_STONE_FOUND &&
            isKycVerified?.customer?.kyc?.status === kycStatus.APPROVED
          ? handleAddDemand
          : handleFormSearch,

      isDisable:
        !searchUrl.length ||
        minMaxError.length > 0 ||
        validationError.length > 0
          ? true
          : false ||
            (!(
              isLoading ||
              isLoadingProductApi ||
              isLoadingMatchPairApi ||
              isFetchingMatchPairApi ||
              isFetchingProductApi
            ) &&
              (isMatchingPair
                ? data?.count > MAX_SEARCH_FORM_COUNT / 2
                : data?.count > MAX_SEARCH_FORM_COUNT) &&
              data?.count > MIN_SEARCH_FORM_COUNT),

      isLoading:
        isLoading ||
        isLoadingProductApi ||
        isLoadingMatchPairApi ||
        isFetchingMatchPairApi ||
        isFetchingProductApi
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError('');
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setSaveSearchName(inputValue);
    } else {
      setSaveSearchName(inputValue.slice(0, 20));
      setInputError('Input cannot exceed 20 characters');
    }
  };

  const renderContentWithInput = () => {
    return (
      <>
        {' '}
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={bookmarkIcon} alt="bookmarkIcon" />
        </div>
        <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
          <div>
            <h1 className="text-headingS text-neutral900">
              {' '}
              {ManageLocales('app.advanceSearch.savedSearch.input.header')}
            </h1>
            <p className="text-neutral600 text-mRegular">
              {ManageLocales('app.advanceSearch.savedSearch.input.content')}
            </p>
          </div>
          <div>
            <InputField
              type="text"
              value={saveSearchName}
              name={'savedSearch'}
              placeholder={'Search Name'}
              onChange={handleInputChange}
              styles={{
                inputMain: 'w-full',
                input: `h-[40px] p-2 flex-grow block w-[100%] !text-primaryMain min-w-0 rounded-r-sm text-mRegular shadow-[var(--input-shadow)] border-[1px] border-neutral200 rounded-r-[4px]
                ${inputError ? 'border-dangerMain' : 'border-neutral200'}`
              }}
            />

            <div className=" text-dangerMain text-sRegular font-regular flex text-left h-[5px]">
              {inputError ?? ''}
            </div>
          </div>

          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: ManageLocales('app.modal.cancel'),
                handler: () => {
                  setSaveSearchName('');
                  setInputError('');
                  setIsInputDialogOpen(false);
                },
                customStyle: 'flex-1 h-10'
              },
              {
                variant: 'primary',
                label: ManageLocales('app.modal.save'),
                isDisable: !saveSearchName.length,
                handler: () => {
                  if (!saveSearchName.length) {
                    setInputError('Please enter name');
                  } else {
                    !inputError.length &&
                      handleSaveAndSearch(isMatchingPair && 'MatchingPair');
                  }
                },
                customStyle: 'flex-1 h-10'
              }
            ]}
          />
        </div>
      </>
    );
  };
  return (
    <div className=" flex flex-col gap-[24px]">
      <InputDialogComponent
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />
      <div>
        <div className="py-2">
          <span className="text-neutral900 text-lRegular font-medium grid gap-[24px]">
            Search for{' '}
            {subRoute === SubRoutes.NEW_ARRIVAL
              ? 'New Arrivals'
              : subRoute === SubRoutes.BID_TO_BUY
              ? 'Bid To Buy'
              : isMatchingPair
              ? 'Match Pair'
              : 'Diamonds'}
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
                  isMatchingPair={isMatchingPair}
                />
              </div>
              <div className="pr-[2px] flex gap-[12px]  justify-end flex-wrap">
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
          {isKycVerified?.customer?.kyc?.status === kycStatus.PENDING ||
          isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED ? (
            <></>
          ) : (
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
          )}

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
                {isLoadingProductApi ||
                isLoadingMatchPairApi ||
                isFetchingMatchPairApi ||
                isLoading ||
                isFetchingProductApi
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
