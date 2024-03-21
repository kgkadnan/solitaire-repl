'use client';
import CheckboxComponent from '@/components/v2/common/checkbox';
import { DialogComponent } from '@/components/v2/common/dialog';
import {
  useDeleteSavedSearchMutation,
  useGetAllSavedSearchesQuery,
  useGetSavedSearchListQuery,
  useLazyGetAllSavedSearchesQuery
} from '@/features/api/saved-searches';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useCallback, useEffect, useState } from 'react';
import { useSavedSearchStateManagement } from './hooks/saved-search-state-management';
import { DisplayTable } from '@/components/v2/common/display-table';
import ActionButton from '@/components/v2/common/action-button';
import BinIcon from '@public/v2/assets/icons/bin.svg';
import { formatCreatedAt } from '@/utils/format-date';
import styles from './saved-search.module.scss';
import empty from '@public/v2/assets/icons/saved-search/empty-screen-saved-search.svg';

export interface ISavedSearches {
  diamond_count: string;
  name: string;
  customer_id: string;
  meta_data: {
    [key: string]: string | string[];
  };
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: string | null;
}

export interface IItem {
  name: string;
}

import editIcon from '@public/v2/assets/icons/saved-search/edit-button.svg';
import Image from 'next/image';
import { useCheckboxStateManagement } from '@/components/v2/common/checkbox/hooks/checkbox-state-management';
import { handleSelectAll } from '@/components/v2/common/checkbox/helpers/handle-select-all-checkbox';
import { handleCheckbox } from '@/components/v2/common/checkbox/helpers/handle-checkbox';
import { deleteSavedSearchHandler } from './helpers/delete-saved-search-handler';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { handleDelete } from './helpers/handle-delete';
import SearchInputField from '@/components/v2/common/search-input/search-input';
import { handleSearch } from './helpers/debounce';
import { useRouter } from 'next/navigation';
import { useLazyGetProductCountQuery } from '@/features/api/product';
import { handleCardClick } from './helpers/handle-card-click';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { useAppDispatch } from '@/hooks/hook';
import { modifySavedSearch } from '@/features/saved-search/saved-search';
import EmptyScreen from '@/components/v2/common/empty-screen';
import { kycStatus } from '@/constants/enums/kyc';

const SavedSearch = ({ setIsLoading, isLoading }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { savedSearchSetState, savedSearchState } =
    useSavedSearchStateManagement();

  let [triggerProductCountApi] = useLazyGetProductCountQuery();
  // Fetching saved search data
  const { data } = useGetAllSavedSearchesQuery({
    searchByName: savedSearchState.searchByName
  });

  const [triggerSaved] = useLazyGetAllSavedSearchesQuery({});

  const { data: searchList }: { data?: IItem[] } = useGetSavedSearchListQuery(
    savedSearchState.search
  );
  // Mutation for deleting items from the saved search
  const [deleteSavedSearch] = useDeleteSavedSearchMutation();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { selectedCheckboxes, selectAllChecked } = checkboxState;
  const { setSelectedCheckboxes, setSelectAllChecked } = checkboxSetState;
  const { errorState, errorSetState } = useErrorStateManagement();
  const { setIsError, setErrorText } = errorSetState;
  const { isError, errorText } = errorState;

  const coloumn = [
    {
      accessor: 'lab',
      label: 'Lab',
      sequence: 1,
      short_label: 'lab'
    },
    {
      accessor: 'shape',
      label: 'Shape',
      sequence: 2,
      short_label: 'Shape'
    },
    {
      accessor: 'carats',
      label: 'Carats',
      sequence: 3,
      short_label: 'carats'
    },
    {
      accessor: 'color',
      label: 'Color',
      sequence: 4,
      short_label: 'Color'
    },
    {
      accessor: 'clarity',
      label: 'Clarity',
      sequence: 5,
      short_label: 'Clarity'
    },
    {
      accessor: 'cut',
      label: 'Cut',
      sequence: 6,
      short_label: 'Cut'
    },
    {
      accessor: 'polish',
      label: 'Polish',
      sequence: 7,
      short_label: 'Polish'
    },
    {
      accessor: 'symmetry',
      label: 'Symmetry',
      sequence: 8,
      short_label: 'Symmetry'
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    triggerSaved({}).then(res => {
      savedSearchSetState.setSavedSearchData(res?.data?.savedSearches);
      setIsLoading(false);
    });
  }, [data]);

  // useEffect(()=>{setIsLoading(true)},[])
  // Debounced search function
  const debouncedSave = useCallback(
    (inputValue: string) => {
      // Filter data based on input value
      const filteredSuggestions =
        searchList &&
        searchList.filter((item: IItem) =>
          item.name.toLowerCase().includes(inputValue.toLowerCase())
        );
      // Extract card titles from filtered suggestions
      const suggestionTitles =
        filteredSuggestions &&
        filteredSuggestions.map((item: IItem) => item.name);

      savedSearchSetState.setSuggestions(suggestionTitles || []);
      // Update state with an array of strings
    },
    [searchList]
  );

  // Handler for suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setSelectedCheckboxes([]);
    setSelectAllChecked(false);
    savedSearchSetState.setSearch(suggestion);
    savedSearchSetState.setSearchByName(suggestion);
    savedSearchSetState.setSuggestions([]);
  };

  const gradientClasses = [
    styles.gradient1,
    styles.gradient2,
    styles.gradient3,
    styles.gradient4
  ];

  // Function to handle edit action
  const handleEdit = (stone: string) => {
    let savedSearchEditData = savedSearchState.savedSearchData.filter(
      (items: any) => {
        return items.id === stone;
      }
    );

    dispatch(modifySavedSearch({ savedSearch: savedSearchEditData[0] }));

    router.push(
      `${Routes.SEARCH}?active-tab=${SubRoutes.SAVED_SEARCH}&edit=${SubRoutes.SAVED_SEARCH}`
    );
  };

  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);

  return (
    <div className="mb-[20px]">
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <div className="flex h-[81px] items-center">
        <p className="text-headingM font-medium text-neutral900">
          {ManageLocales('app.savedSearch.header')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
        <div className="flex items-center gap-5 rounded-t-[8px] py-[12px] bg-neutral50 border-b-[1px] border-neutral200 px-[16px]">
          <div className="flex items-center gap-3">
            <CheckboxComponent
              onClick={() => {
                handleSelectAll({
                  selectAllChecked,
                  setSelectedCheckboxes,
                  setSelectAllChecked,
                  data: savedSearchState.savedSearchData
                });
              }}
              isChecked={selectAllChecked}
            />
            <button
              className="text-lRegular text-neutral900 font-medium cursor-pointer"
              onClick={() => {
                handleSelectAll({
                  selectAllChecked,
                  setSelectedCheckboxes,
                  setSelectAllChecked,
                  data: savedSearchState.savedSearchData
                });
              }}
            >
              {ManageLocales('app.savedSearch.selectAll')}
            </button>
          </div>
          <div>
            <SearchInputField
              type="text"
              name="Search"
              value={savedSearchState.search}
              onChange={e =>
                handleSearch({
                  e,
                  setSearch: savedSearchSetState.setSearch,
                  debouncedSave,
                  setSearchByName: savedSearchSetState.setSearchByName,
                  setSelectedCheckboxes,
                  setSelectAllChecked,
                  setShowSuggestions
                })
              }
              setShowSuggestions={setShowSuggestions}
              showSuggestions={showSuggestions}
              handleSuggestionClick={handleSuggestionClick}
              suggestions={savedSearchState.suggestions}
            />
          </div>
        </div>
        <div
          className={` overflow-auto ${
            isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
              ? 'h-[calc(100vh-380px)]'
              : 'h-[calc(100vh-310px)]'
          }`}
        >
          {!savedSearchState?.savedSearchData.length
            ? !isLoading && (
                <EmptyScreen
                  label="Search Diamonds"
                  message="No saved searches so far. Let’s save some searches!"
                  onClickHandler={() =>
                    router.push(`/v2/search?active-tab=${SubRoutes.NEW_SEARCH}`)
                  }
                  imageSrc={empty}
                />
              )
            : savedSearchState?.savedSearchData?.map(
                (
                  { id, name, meta_data, created_at }: ISavedSearches,
                  index
                ) => {
                  // Calculate the gradient index based on the item's index
                  const gradientIndex = index % gradientClasses.length;
                  // Get the gradient class for the calculated index
                  const gradientClass = gradientClasses[gradientIndex];

                  return (
                    <div
                      className="p-[16px] flex flex-col md:flex-row w-full border-b-[1px] border-neutral200 cursor-pointer group hover:bg-neutral50"
                      key={id}
                      onClick={() =>
                        handleCardClick({
                          id,
                          savedSearchData: savedSearchState.savedSearchData,
                          router,
                          triggerProductCountApi,
                          setDialogContent,
                          setIsDialogOpen
                        })
                      }
                    >
                      <div className="flex items-center gap-[18px] md:w-[40%]">
                        <CheckboxComponent
                          onClick={e => {
                            e.stopPropagation();
                            handleCheckbox({
                              id,
                              selectedCheckboxes,
                              setSelectedCheckboxes,
                              setSelectAllChecked,
                              selectAllChecked,
                              data: savedSearchState.savedSearchData
                            });
                          }}
                          isChecked={selectedCheckboxes.includes(id)}
                        />
                        <div
                          className={` ${gradientClass} text-headingM w-[69px] h-[69px] text-neutral700 uppercase p-[14px] rounded-[4px] font-medium text-center`}
                        >
                          {name
                            .split(' ') // Split the name into words
                            .map(word => word.charAt(0)) // Extract the first character of each word
                            .join('')}
                        </div>
                        <div className="flex flex-col gap-[18px]">
                          <h1 className="text-neutral900 font-medium text-mMedium capitalize">
                            {name}
                          </h1>
                          <div className="text-neutral700 font-regular text-sMedium">
                            {formatCreatedAt(created_at)}
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-[50%] mt-4 md:mt-0">
                        <DisplayTable column={coloumn} row={[meta_data]} />
                      </div>
                      <button
                        className="w-full md:w-[10%] flex justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        onClick={e => {
                          e.stopPropagation();
                          handleEdit(id);
                        }}
                      >
                        <Image src={editIcon} alt="editIcon" />
                      </button>
                    </div>
                  );
                }
              )}
        </div>
        <div className="p-[16px] flex items-center justify-between border-t-[1px] border-neutral200">
          <div>
            {isError && (
              <div>
                <span className="hidden  text-successMain" />
                <span
                  className={`text-mRegular font-medium text-dangerMain pl-[8px]`}
                >
                  {errorText}
                </span>
              </div>
            )}
          </div>
          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: ManageLocales('app.savedSearch.delete'),
                svg: BinIcon,
                handler: () =>
                  deleteSavedSearchHandler({
                    selectedCheckboxes,
                    setIsError,
                    setErrorText,
                    setIsDialogOpen,
                    setDialogContent,
                    handleDelete: () =>
                      handleDelete({
                        deleteSavedSearch,
                        selectedCheckboxes,
                        setDialogContent,
                        setIsDialogOpen,
                        setSelectedCheckboxes,
                        setSelectAllChecked,
                        setIsError
                      })
                  })
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SavedSearch;
