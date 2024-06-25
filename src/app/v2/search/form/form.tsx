'use client';

import AnchorLinkNavigation from '@/components/v2/common/anchor-tag-navigation';
import { anchor } from '@/constants/v2/form';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
  NO_STONE_FOUND,
  SELECT_SOME_PARAM,
  SOMETHING_WENT_WRONG
} from '@/constants/error-messages/form';
import { useRouter, useSearchParams } from 'next/navigation';
import { setModifySearch } from './helpers/modify-search';
import { useAppSelector } from '@/hooks/hook';
import logger from 'logging/log-util';
import {
  useAddSavedSearchMutation,
  useUpdateSavedSearchMutation
} from '@/features/api/saved-searches';
import Breadcrum from '@/components/v2/common/search-breadcrum/breadcrum';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
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
  setIsAddDemand
}: {
  searchUrl: String;
  setSearchUrl: Dispatch<SetStateAction<string>>;
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
  searchParameters: any;
  handleCloseAllTabs: () => void;
  handleCloseSpecificTab: (_id: number) => void;
  state: any;
  setState: any;
  carat: any;
  errorState: any;
  errorSetState: any;
  setIsDialogOpen: any;
  setDialogContent: any;
  addSearches: any;
  setAddSearches: any;
  setIsLoading: any;
  setIsAddDemand: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subRoute = useSearchParams().get('active-tab');

  const modifySearchFrom = searchParams.get('edit');
  const savedSearch: any = useAppSelector(
    (store: { savedSearch: any }) => store.savedSearch
  );

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
    selectionChecked
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
    setSelectionChecked
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
  let [triggerProductCountApi] = useLazyGetProductCountQuery();
  // const { errorState, errorSetState } = useNumericFieldValidation();

  const { caratError, discountError, pricePerCaratError, amountRangeError } =
    errorState;
  const {
    setCaratError,
    setDiscountError,
    setPricePerCaratError,
    setAmountRangeError
  } = errorSetState;

  useEffect(() => {
    if (searchUrl.length > 0) {
      setIsLoading(true);
      triggerProductCountApi({ searchUrl })
        .unwrap()
        .then((response: any) => {
          setData(response), setError(''), setIsLoading(false);
        })
        .catch(e => {
          setError(e), setIsLoading(false);
        });
    }
  }, [searchUrl]);

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
          setErrorText(EXCEEDS_LIMITS);
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
    setIsLoading(false);
    let modifySearchResult = JSON.parse(localStorage.getItem('Search')!);

    let modifysavedSearchData = savedSearch?.savedSearch?.meta_data;
    setSelectedCaratRange([]);
    if (
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
      JSON.parse(localStorage.getItem('Search')!) || [];
    if (data?.length > 0 && data[data?.length - 1]) {
      setAddSearches(data);
    }
  }, []);

  // Reset form when a new search is initiated
  useEffect(() => {
    if (subRoute === SubRoutes.NEW_SEARCH) {
      handleFormReset();
    }
  }, [subRoute]);

  const handleFormSearch = async (
    isSavedParams: boolean = false,
    id?: string
  ) => {
    if (
      JSON.parse(localStorage.getItem('Search')!)?.length >=
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
                router.push(`/v2/search?active-tab=${SubRoutes.RESULT}-1`);
                setIsDialogOpen(false);
              },
              customStyle: 'flex-1 h-10'
            }
          ]}
        />
      );

      setIsDialogOpen(true);
    } else if (
      searchUrl &&
      data?.count > MIN_SEARCH_FORM_COUNT &&
      minMaxError.length === 0
    ) {
      if (
        data?.count < MAX_SEARCH_FORM_COUNT &&
        data?.count > MIN_SEARCH_FORM_COUNT
      ) {
        const queryParams = generateQueryParams(state);

        if (modifySearchFrom === `${SubRoutes.SAVED_SEARCH}`) {
          if (savedSearch?.savedSearch?.meta_data) {
            let updatedMeta = queryParams;

            let updateSavedSearchData = {
              id: savedSearch.savedSearch.id,
              meta_data: updatedMeta,
              diamond_count: parseInt(data?.count)
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
                localStorage.getItem('Search')!
              );

              let isAlreadyOpenIndex = isSearchAlreadyExist(
                localStorageData,
                savedSearch?.savedSearch?.name
              );

              if (isAlreadyOpenIndex >= 0 && isAlreadyOpenIndex !== null) {
                router.push(
                  `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                    isAlreadyOpenIndex + 1
                  }`
                );
              } else {
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
            });
          }
        } else if (modifySearchFrom === `${SubRoutes.RESULT}`) {
          let modifySearchResult = JSON.parse(localStorage.getItem('Search')!);
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
            localStorage.setItem('Search', JSON.stringify(updatedData));
          }
          router.push(`/v2/search?active-tab=${SubRoutes.RESULT}-${activeTab}`);
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
      } else {
        setIsError(true);
      }
    } else {
      setIsError(true);
      setErrorText(SELECT_SOME_PARAM);
    }
  };

  // Function: Save and search
  const handleSaveAndSearch: any = async () => {
    if (
      JSON.parse(localStorage.getItem('Search')!)?.length >=
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
                router.push(`/v2/search?active-tab=${SubRoutes.RESULT}-1`);
                setIsDialogOpen(false);
              },
              customStyle: 'flex-1 h-10'
            }
          ]}
        />
      );
      setIsDialogOpen(true);
    } else if (searchUrl && data?.count > MIN_SEARCH_FORM_COUNT) {
      if (
        data?.count < MAX_SEARCH_FORM_COUNT &&
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
              diamond_count: parseInt(data?.count)
            };
            updateSavedSearch(updateSavedData);

            let localStorageData = JSON.parse(localStorage.getItem('Search')!);

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
              localStorage.setItem('Search', JSON.stringify(updatedData));
            }

            router.push(
              `${Routes.SEARCH}?active-tab=${SubRoutes.SAVED_SEARCH}`
            );
          }
        } else if (activeSearch) {
          const updatedMeta = addSearches;
          updatedMeta[activeTab - 1].queryParams = queryParams;
          let updateSaveSearchData = {
            id: updatedMeta[activeTab - 1].id,
            meta_data: updatedMeta[activeTab - 1].queryParams,
            diamond_count: parseInt(data?.count)
          };
          updateSavedSearch(updateSaveSearchData)
            .unwrap()
            .then(() => {
              handleFormSearch(true);
            })
            .catch((error: any) => {
              logger.error(error);
            });
        } else {
          await addSavedSearch({
            name: saveSearchName,
            diamond_count: parseInt(data?.count),
            meta_data: queryParams,
            is_deleted: false
          })
            .unwrap()
            .then((res: any) => {
              handleFormSearch(true, res.id);
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
      handler: () => {
        if (searchUrl) {
          if (
            data?.count < MAX_SEARCH_FORM_COUNT &&
            data?.count > MIN_SEARCH_FORM_COUNT
          ) {
            if (activeTab !== undefined) {
              const isSearchName: number =
                addSearches[activeTab - 1]?.saveSearchName.length;

              const isSaved: boolean =
                addSearches[activeTab - 1]?.isSavedSearch;
              // Check if the active search is not null and isSavedSearch is true
              if (modifySearchFrom === `${SubRoutes.SAVED_SEARCH}`) {
                handleSaveAndSearch();
              } else if (isSaved) {
                handleSaveAndSearch();
              } else if (!isSaved && isSearchName) {
                handleSaveAndSearch();
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
      }
    },
    {
      variant: 'primary',
      label:
        // 'Search',
        `${
          minMaxError.length === 0 &&
          errorText === NO_STONE_FOUND &&
          isKycVerified?.customer?.kyc?.status === kycStatus.APPROVED
            ? 'Add Demand'
            : 'Search'
        } `,
      handler:
        // errorText === NO_STONE_FOUND ? () => {} : handleFormSearch

        minMaxError.length === 0 &&
        errorText === NO_STONE_FOUND &&
        isKycVerified?.customer?.kyc?.status === kycStatus.APPROVED
          ? handleAddDemand
          : handleFormSearch
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
                handler: () => {
                  if (!saveSearchName.length) {
                    setInputError('Please enter name');
                  } else {
                    !inputError.length && handleSaveAndSearch();
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
            Search for Diamonds
          </span>
        </div>
        <div className="flex flex-col gap-[16px]">
          {searchParameters.length > 0 ? (
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
            isError || minMaxError ? 'justify-between' : 'justify-end'
          } `}
        >
          {(isError || minMaxError.length > 0) && (
            <div>
              <span className="hidden  text-successMain" />
              <span
                className={`text-mRegular font-medium text-${
                  minMaxError.length > 0 ? 'dangerMain' : messageColor
                } pl-[8px]`}
              >
                {minMaxError.length
                  ? minMaxError
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
