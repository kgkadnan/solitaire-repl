import { Box, Stack } from '@mui/material';
import styles from '../../../../components/v2/common/data-table/data-table.module.scss';

import {
  MRT_ExpandButton,
  MRT_GlobalFilterTextField,
  MRT_TablePagination,
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import ExpandImg from '@public/v2/assets/icons/detail-page/expand.svg?url';
import CollapsIcon from '@public/v2/assets/icons/collapse-icon.svg?url';
import ExportExcel from '@public/v2/assets/icons/detail-page/export-excel.svg?url';
import Setting from '@public/v2/assets/icons/match-pair-setting.svg?url';

import saveIcon from '@public/v2/assets/icons/data-table/bookmark.svg';
import BinIcon from '@public/v2/assets/icons/bin.svg';
import DownloadAllIcon from '@public/v2/assets/icons/download-all.svg';
import NewSearchIcon from '@public/v2/assets/icons/new-search.svg';
import chevronDown from '@public/v2/assets/icons/save-search-dropdown/chevronDown.svg';
import Image from 'next/image';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';
import threeDotsSvg from '@public/v2/assets/icons/threedots.svg';
import Cross from '@public/v2/assets/icons/cross.svg?url';
import Drag from '@public/v2/assets/icons/drag.svg';
import NoDataSvg from '@public/v2/assets/icons/no-matching-pair.svg';

// theme.js
import { ThemeProvider, createTheme } from '@mui/material/styles';

import {
  useLazyGetAllSavedSearchesQuery,
  useUpdateSavedSearchMutation
} from '@/features/api/saved-searches';
import { useEffect, useState } from 'react';
import { useCheckProductAvailabilityMutation } from '@/features/api/product';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import {
  MAX_SAVED_SEARCH_COUNT,
  MAX_SEARCH_TAB_LIMIT,
  MIN_SAVED_SEARCH_COUNT
} from '@/constants/business-logic';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  MODIFY_SEARCH_STONES_EXCEEDS_LIMIT,
  NO_PRODUCT_FOUND
} from '@/constants/error-messages/saved';
import { isSearchAlreadyExist } from '@/app/v2/search/saved-search/helpers/handle-card-click';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';

import { kycStatus } from '@/constants/enums/kyc';
import { handleConfirmStone } from '@app/v2/search/result/helpers/handle-confirm-stone';
import { handleCompareStone } from '@/app/v2/search/result/helpers/handle-compare-stone';
import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { ManageLocales } from '@/utils/v2/translate';
import ActionButton from '@/components/v2/common/action-button';
import CalculatedField from '@/components/v2/common/calculated-field';
import SavedSearchDropDown from '@/components/v2/common/saved-search-dropdown';
import Breadcrum from '@/components/v2/common/search-breadcrum/breadcrum';
import Tooltip from '@/components/v2/common/tooltip';
import { Dropdown } from '@/components/v2/common/dropdown-menu';
import Share from '@/components/v2/common/copy-and-share/share';
import MathPairSkeleton from '@/components/v2/skeleton/match-pair';
import { useLazyGetMatchingPairCountQuery } from '@/features/api/match-pair';
import {
  clarity,
  fluorescenceSortOrder,
  sideBlackSortOrder,
  tableBlackSortOrder,
  tableInclusionSortOrder
} from '@/constants/v2/form';

const theme = createTheme({
  typography: {
    fontFamily: ['inherit'].join(','),
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  },

  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          // Default state for the badge inside the cell - sorting icon not visible by default
          '& .MuiBadge-root': {
            width: '0px !important',
            // marginLeft: '-3px',
            visibility: 'hidden'
          },
          // Hover state for the cell
          '&:hover .MuiBadge-root': {
            visibility: 'visible'
          }
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .Mui-TableHeadCell-Content-Wrapper': {
            whiteSpace: 'nowrap',
            color: 'var(--neutral-700)',
            fontWeight: 500
          },
          '& .Mui-active': {
            color: 'var(--neutral-400) !important' // Change this to your desired color
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontStyle: 'normal !important'
        }
      }
    },

    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true // No more ripple, on the whole application 💣!
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          height: '30px !important',
          '&:hover': {
            background: 'none'
          }
        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&:hover': {
            background: 'none'
          }
        }
      }
    },
    MuiStack: {
      styleOverrides: {
        root: {
          fontSize: '12px !important'
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'var(--neutral-100)'
          },
          '&.Mui-selected': {
            backgroundColor: 'var(--neutral-100) !important'
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'var(--neutral-100) !important'
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            background: 'none'
          }
        }
      }
    }
  }
});

const MatchPairTable = ({
  rows,
  columns,
  setRowSelection,
  rowSelection,
  isProductFetching,
  // showCalculatedField = false,
  // isResult = false,
  myCart = false,
  activeTab,
  searchParameters,
  setActiveTab,
  handleCloseAllTabs,
  handleCloseSpecificTab,
  handleNewSearch,
  setSearchParameters,
  modalSetState,
  downloadExcel,
  matchingPairData,
  setSorting,
  sorting,
  setErrorText,
  setIsError,
  searchList,
  setIsLoading,
  handleAddToCart,
  setIsConfirmStone,
  setConfirmStoneData,
  setIsCompareStone,
  setCompareStoneData,
  setIsInputDialogOpen,
  handleCreateAppointment,
  originalData,
  setIsSkeletonLoading,
  isSkeletonLoading,
  mps,
  setMps,
  setSettingApplied,
  isLoading,
  countLimitReached,
  settingApplied,
  setIsMPSOpen,
  isFetchingMatchPairData,
  globalFilterActive,
  setGlobalFilterActive,
  setGlobalFilter,
  globalFilter
}: any) => {
  // Fetching saved search data
  const router = useRouter();
  const [triggerSavedSearch] = useLazyGetAllSavedSearchesQuery({});
  const [checkProductAvailability] = useCheckProductAvailabilityMutation({});

  let [triggerMatchingPairCountApi] = useLazyGetMatchingPairCountQuery();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    localStorage.setItem('isFullScreen', JSON.stringify(!isFullScreen));
    setIsFullScreen(!isFullScreen);
  };

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: parseInt(localStorage.getItem('pageSize') ?? '20') //customize the default page size
  });

  const [paginatedData, setPaginatedData] = useState<any>([]);

  const path = useSearchParams().get('active-tab');

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (globalFilter !== '') {
      // Remove all whitespace characters from globalFilter
      const trimmedFilter = globalFilter.replace(/\s+/g, '');

      // Filter the originalData array of arrays
      let filteredData = originalData.filter((innerArray: any[]) =>
        innerArray.some((data: any) => data?.lot_id?.startsWith(trimmedFilter))
      );

      // Flatten the filtered data to work with pagination
      let flattenedData = filteredData.flat();

      const startIndex = pagination.pageIndex * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      // Slice the data to get the current page's data
      const newData = flattenedData.slice(startIndex, endIndex);
      // Update the paginated data state
      setPaginatedData(newData);
    } else {
      setPaginatedData(rows);
    }
  }, [globalFilter]);

  useEffect(() => {
    // Calculate the start and end indices for the current page
    const startIndex = pagination.pageIndex * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    // Slice the data to get the current page's data
    const newData = rows.slice(startIndex, endIndex);
    // Update the paginated data state
    setPaginatedData(newData);

    // if (newData.length > 0 && setIsSkeletonLoading) {
    //   setIsSkeletonLoading(false);
    // }
  }, [
    rows,
    pagination.pageIndex, //re-fetch when page index changes
    pagination.pageSize //re-fetch when page size changes
  ]);

  useEffect(() => {
    let isFullScreen = JSON.parse(localStorage.getItem('isFullScreen')!);

    setIsFullScreen(isFullScreen);
  }, []);
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Escape') {
        setIsFullScreen(false);
        localStorage.setItem('isFullScreen', JSON.stringify(false));
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const onDropDownClick = (value: any) => {
    setIsDropDownOpen(false);

    triggerSavedSearch({
      searchByName: value.value
    })
      .then(res => {
        let searchData: any;

        if (res.data.savedSearches.length > 1) {
          let savedSearchData = res.data.savedSearches;

          let filteredData = savedSearchData.filter((savedSearch: any) => {
            return savedSearch.name.toLowerCase() === value.value.toLowerCase();
          })[0];
          searchData = filteredData;
        } else {
          searchData = res.data.savedSearches[0];
        }

        const searchUrl = constructUrlParams(searchData.meta_data);

        triggerMatchingPairCountApi({
          searchUrl: `${searchUrl}`
        })
          .then(response => {
            if (response?.data?.count > MAX_SAVED_SEARCH_COUNT) {
              setIsLoading(false);
              modalSetState.setIsDialogOpen(true);
              modalSetState.setDialogContent(
                <CommonPoppup
                  content={''}
                  status="warning"
                  customPoppupBodyStyle="!mt-[70px]"
                  header={MODIFY_SEARCH_STONES_EXCEEDS_LIMIT}
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: ManageLocales('app.modal.okay'),
                      handler: () => {
                        modalSetState.setIsDialogOpen(false);
                      },
                      customStyle: 'flex-1'
                    }
                  ]}
                />
              );
            } else if (response?.data?.count === MIN_SAVED_SEARCH_COUNT) {
              setIsLoading(false);
              modalSetState.setIsDialogOpen(true);
              modalSetState.setDialogContent(
                <CommonPoppup
                  status="warning"
                  content={''}
                  customPoppupBodyStyle="!mt-[70px]"
                  header={NO_PRODUCT_FOUND}
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: ManageLocales('app.modal.okay'),
                      handler: () => {
                        modalSetState.setIsDialogOpen(false);
                      },
                      customStyle: 'flex-1 h-10'
                    }
                  ]}
                />
              );
            } else {
              const data: any = JSON.parse(
                localStorage.getItem('MatchingPair')!
              );

              if (data?.length) {
                let isAlreadyOpenIndex = isSearchAlreadyExist(
                  data,
                  searchData.name
                );

                if (isAlreadyOpenIndex >= 0 && isAlreadyOpenIndex !== null) {
                  if (
                    isAlreadyOpenIndex + 1 ===
                    Number((path?.match(/result-(\d+)/) || [])[1])
                  ) {
                    setIsLoading(false);
                  } else {
                    router.push(
                      `${Routes.MATCHING_PAIR}?active-tab=${SubRoutes.RESULT}-${
                        isAlreadyOpenIndex + 1
                      }`
                    );
                  }
                  return;
                } else if (data?.length >= MAX_SEARCH_TAB_LIMIT) {
                  modalSetState.setDialogContent(
                    <CommonPoppup
                      content={ManageLocales(
                        'app.savedSearch.maxTabReached.content'
                      )}
                      status="warning"
                      customPoppupBodyStyle="!mt-[70px]"
                      header={ManageLocales('app.savedSearch.maxTabReached')}
                      actionButtonData={[
                        {
                          variant: 'secondary',
                          label: ManageLocales('app.modal.cancel'),
                          handler: () => {
                            modalSetState.setIsDialogOpen(false);
                          },
                          customStyle: 'flex-1'
                        },
                        {
                          variant: 'primary',
                          label: ManageLocales('app.modal.manageTabs'),
                          handler: () => {
                            router.push(
                              `${Routes.MATCHING_PAIR}?active-tab=${SubRoutes.RESULT}-1`
                            );
                            modalSetState.setIsDialogOpen(false);
                          },
                          customStyle: 'flex-1'
                        }
                      ]}
                    />
                  );
                  modalSetState.setIsDialogOpen(true);
                } else {
                  const localStorageData = [
                    ...data,
                    {
                      saveSearchName: searchData.name,
                      isSavedSearch: true,
                      searchId: response?.data?.search_id,
                      queryParams: searchData.meta_data,
                      id: searchData.id,
                      label:
                        searchData?.name?.replace(/\s+/g, '') +
                        ' ' +
                        (data.length + 1)
                    }
                  ];

                  localStorage.setItem(
                    'MatchingPair',
                    JSON.stringify(localStorageData)
                  );
                  router.push(
                    `${Routes.MATCHING_PAIR}?active-tab=${SubRoutes.RESULT}-${
                      data.length + 1
                    }`
                  );
                }
              }
              setIsLoading(false);
            }
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const getShapeDisplayName = ({ value }: { value: string }) => {
    switch (value) {
      case 'EM':
        return 'Emerald';
      case 'BR':
        return 'Round';
      case 'PR':
        return 'Princess';
      case 'PS':
        return 'Pear';
      case 'AS':
        return 'Asscher';
      case 'RAD':
        return 'Radiant';
      case 'OV':
        return 'Oval';
      case 'CU':
        return 'Cushion';
      case 'MQ':
        return 'Marquise';
      case 'HS':
        return 'Heart';
      default:
        return value;
    }
  };

  const [updateSavedSearch] = useUpdateSavedSearchMutation();

  const handleUpdateSaveSearch = () => {
    const yourSelection = JSON.parse(localStorage.getItem('MatchingPair')!);
    const updateSaveSearchData = {
      id: yourSelection[activeTab - 1]?.id,
      meta_data: yourSelection[activeTab - 1]?.queryParams,
      diamond_count: parseInt(matchingPairData?.count),
      is_matching_pair: true
    };

    yourSelection[activeTab - 1] = {
      id: yourSelection[activeTab - 1]?.id,
      saveSearchName: yourSelection[activeTab - 1]?.saveSearchName,
      searchId: yourSelection[activeTab - 1]?.searchId,
      isSavedSearch: true,
      queryParams: yourSelection[activeTab - 1].queryParams
    };
    localStorage.setItem('MatchingPair', JSON.stringify(yourSelection));
    setSearchParameters(yourSelection);
    updateSavedSearch(updateSaveSearchData);
  };

  const handleDownloadExcel = () => {
    let selectedIds = Object.keys(rowSelection);
    let result: any = [];

    selectedIds.map(selectedId =>
      result.push(
        ...originalData.filter((subArray: any) =>
          subArray.some((obj: any) => obj.id === selectedId)
        )[0]
      )
    );
    const allProductIds = rows.map(({ id }: { id: string }) => {
      return id;
    });
    const pairedIds = result.map(({ id }: { id: string }) => {
      return id;
    });
    downloadExcelHandler({
      products: selectedIds.length > 0 ? pairedIds : allProductIds,
      downloadExcelApi: downloadExcel,
      modalSetState,
      setRowSelection,
      setIsLoading: setIsLoading,
      router,
      fromMatchingPair: true,
      page: 'Match_Pair'
    });
  };

  const downloadAllSearchTabsExcelHandler = () => {
    const searchTabsData = JSON.parse(localStorage.getItem('MatchingPair')!);
    const allTabsIds = searchTabsData.map((tab: any) => tab.searchId);
    downloadExcelHandler({
      previousSearch: allTabsIds,
      downloadExcelApi: downloadExcel,
      modalSetState,
      setRowSelection,
      router,
      fromMatchingPair: true,
      setIsLoading: setIsLoading,
      page: 'Match_Pair'
    });
  };

  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  const NoResultsComponent = () => (
    <>
      {' '}
      {isLoaded && !(isProductFetching || isLoading) && !isSkeletonLoading && (
        <div className="flex justify-center mt-[50px]">
          <div>
            <div className="w-[350px] flex justify-center">
              <Image src={NoDataSvg} alt={'empty'} />
            </div>
            <div className="flex flex-col justify-center items-center w-[350px]">
              <h1 className="text-neutral600 font-medium text-[16px] w-[340px] text-center mb-[10px]">
                {globalFilter.length || globalFilterActive
                  ? 'No matching stones found'
                  : countLimitReached
                  ? `Your selection has more than 150 matching pairs. Please modify the filters or adjust the match pair settings to reduce the selection to fewer than 150 matching pairs.`
                  : !globalFilterActive &&
                    `We don't have any stones according to your selection. Please
                modify the filters or change the match pair settings.`}
              </h1>

              {!globalFilter.length && !globalFilterActive && (
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'secondary',
                      label: 'Edit Filter',
                      handler: () => {
                        router.push(
                          `/v2/matching-pair?active-tab=${path}&edit=result`
                        );
                      }
                    },

                    {
                      variant: 'primary',
                      label: 'Edit Match Pair Settings',
                      handler: () => setIsMPSOpen(true)
                    }
                  ]}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
  const nonSortableAccessors = ['shape_full', 'details', 'fire_icon'];
  const sortData = (data: any[][], sorting: any) => {
    if (!data) return [];
    if (!sorting.length) return data?.flat(); // If no sorting is applied, flatten and return data as-is

    // Sort based on the first item of each sub-array
    const sortedData = [...data].sort((groupA, groupB) => {
      const rowA = groupA[0]; // Take the first item of groupA
      const rowB = groupB[0]; // Take the first item of groupB

      for (let sort of sorting) {
        const columnId = sort.id;
        const isDesc = sort.desc;

        // Skip sorting for non-sortable accessors
        if (nonSortableAccessors.includes(columnId)) {
          continue;
        }

        const valueA = rowA[columnId];
        const valueB = rowB[columnId];
        let compareValue = 0;

        switch (columnId) {
          case 'clarity':
            compareValue = clarity.indexOf(valueA) - clarity.indexOf(valueB);
            break;
          case 'table_inclusion':
            compareValue =
              tableInclusionSortOrder.indexOf(valueA) -
              tableInclusionSortOrder.indexOf(valueB);
            break;
          case 'table_black':
            compareValue =
              tableBlackSortOrder.indexOf(valueA) -
              tableBlackSortOrder.indexOf(valueB);
            break;
          case 'side_black':
            compareValue =
              sideBlackSortOrder.indexOf(valueA) -
              sideBlackSortOrder.indexOf(valueB);
            break;
          case 'fluorescence':
            compareValue =
              fluorescenceSortOrder.indexOf(valueA) -
              fluorescenceSortOrder.indexOf(valueB);
            break;
          case 'amount':
            const amountA = rowA.variants?.[0]?.prices?.[0]?.amount ?? 0;
            const amountB = rowB.variants?.[0]?.prices?.[0]?.amount ?? 0;
            compareValue = amountA - amountB;
            break;
          default:
            // Fallback to default comparison for other columns (numbers or strings)
            if (valueA == null && valueB == null) {
              compareValue = 0; // Both are null, considered equal
            } else if (valueA == null) {
              compareValue = -1; // Place null values before non-null values
            } else if (valueB == null) {
              compareValue = 1; // Place non-null values before null values
            } else if (
              typeof valueA === 'string' &&
              typeof valueB === 'string'
            ) {
              compareValue = valueA.localeCompare(valueB, undefined, {
                sensitivity: 'base'
              });
            } else {
              compareValue = valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
            }
        }

        // Handle cases where the value might not be found in the custom array (indexOf returns -1)
        if (compareValue === 0) {
          continue; // If equal, move to the next sorting condition
        }

        // Apply sorting direction (ascending or descending)
        return isDesc ? -compareValue : compareValue;
      }
      return 0;
    });

    // Flatten the sorted data before returning
    return sortedData.flat();
  };

  // Handle sorting and pagination
  useEffect(() => {
    // Apply the sorting logic to the full dataset
    const sortedFullData = sortData(originalData, sorting);
    // Pagination logic
    const startIndex = pagination.pageIndex * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const newData = sortedFullData.slice(startIndex, endIndex);
    // Update the paginated data state
    setPaginatedData(newData);
  }, [
    rows,
    sorting, // Trigger sorting when sorting state changes
    pagination.pageIndex, // Re-fetch when page index changes
    pagination.pageSize // Re-fetch when page size changes
  ]);
  const handleSortingChange = (newSorting: any) => {
    setSorting((currentSorting: any) => {
      const existingSort = currentSorting.find(
        (sort: any) => sort.id === newSorting()[0].id
      );
      if (existingSort) {
        // If the current sort is ascending, change it to descending
        if (!existingSort.desc) {
          return currentSorting.map((sort: any) =>
            sort.id === newSorting()[0].id ? { ...sort, desc: true } : sort
          );
        }
        // If the current sort is descending, remove the sorting
        else {
          return currentSorting.filter(
            (sort: any) => sort.id !== newSorting()[0].id
          );
        }
      } else {
        // If no sorting exists for the column, set sorting to ascending (default)
        return [...currentSorting, { id: newSorting()[0].id, desc: false }];
      }
    });
  };
  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns: paginatedData.length ? columns : [],
    data: paginatedData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    getRowId: originalRow => originalRow?.id,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      isFullScreen: JSON.parse(localStorage.getItem('isFullScreen')!),
      pagination,
      globalFilter
    },

    enablePagination: paginatedData.length ? true : false,
    positionToolbarAlertBanner: 'none',
    enableColumnActions: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    enableStickyHeader: true,
    enableBottomToolbar: true,
    enableGrouping: false,
    enableExpandAll: false,
    enableColumnDragging: false,
    groupedColumnMode: 'remove',
    enableSorting: true,
    enableRowSelection: true,
    enableToolbarInternalActions: true,
    globalFilterFn: 'startsWith',
    selectAllMode: 'page',

    manualSorting: true, // Enable manual sorting
    onSortingChange: handleSortingChange, // Handle sorting change
    renderEmptyRowsFallback: NoResultsComponent,
    manualPagination: true,
    rowCount: rows.length,
    onPaginationChange: updater => {
      setPagination(prevState => {
        const newState =
          typeof updater === 'function' ? updater(prevState) : updater;
        localStorage.setItem('pageSize', JSON.stringify(newState.pageSize));
        return newState;
      });
    }, //hoist pagination state to your state when it changes internally
    manualFiltering: true,
    onGlobalFilterChange: setGlobalFilter,
    icons: {
      SearchIcon: () => (
        <Image src={searchIcon} alt={'searchIcon'} className="mr-[6px]" />
      ),
      SortIcon: () => null,
      SyncAltIcon: () => null,
      ArrowDownwardIcon: () => null
    },
    muiTableBodyRowProps: ({ row }) => {
      return {
        onClick: row.id.includes('shape')
          ? row.getToggleExpandedHandler()
          : row.getToggleSelectedHandler(),

        sx: {
          height: '20px',
          cursor: 'pointer',
          // border:"1px solid red !important",
          '&.MuiTableRow-root:hover .MuiTableCell-root::after': {
            backgroundColor: 'var(--neutral-50)'
          },
          '&.MuiTableRow-root .MuiTableCell-root::after': {
            backgroundColor: 'var(--neutral-25)'
          },
          '&.MuiTableRow-root .MuiTableCell-root': {
            backgroundColor: row.id.includes('shape')
              ? 'var(--neutral-25)'
              : 'var(--neutral-0)'
          },
          '&.MuiTableRow-root:active .MuiTableCell-root::after': {
            backgroundColor: 'var(--neutral-100)'
          }
        }
      };
    },

    displayColumnDefOptions: {
      'mrt-row-expand': {
        size: 100,

        muiTableHeadCellProps: {
          sx: {
            display: 'none',
            whiteSpace: 'nowrap',
            fontSize: '12px'
          }
        },

        muiTableBodyCellProps: ({ cell }) => {
          return {
            sx: {
              display: !cell.id.includes('shape') ? 'none' : 'flex',
              borderBottom: '1px solid var(--neutral-50)',
              padding: '0px',
              ':hover': {
                border: 'none'
              }
            }
          };
        },

        Cell: ({ row, table }) => {
          return (
            <div className="flex items-center ml-[-10px]">
              <MRT_ExpandButton row={row} table={table} />
              <Stack>
                {getShapeDisplayName({ value: row.original.shape })}
              </Stack>
            </div>
          );
        }
      },
      'mrt-row-select': {
        size: 40,
        minSize: 40,
        maxSize: 40
      }
    },

    sortDescFirst: false,
    initialState: {
      showGlobalFilter: true,
      expanded: true,
      grouping: ['shape'],
      columnPinning: {
        left: ['mrt-row-select', 'fire_icon', 'lot_id', 'mrt-row-expand']
      },
      pagination: pagination,
      sorting: sorting
    },

    positionGlobalFilter: 'left',

    muiTableContainerProps: {
      sx: {
        height: isFullScreen ? '70vh' : 'calc(100vh - 300px)',
        minHeight: isFullScreen
          ? myCart
            ? 'calc(100vh - 130px)'
            : 'calc(100vh - 230px)'
          : myCart
          ? isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
            ? 'calc(100vh - 420px)'
            : 'calc(100vh - 343px)'
          : isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
          ? 'calc(100vh - 405px)'
          : 'calc(100vh - 300px)',
        maxHeight: isFullScreen
          ? myCart
            ? 'calc(100vh - 130px)'
            : 'calc(100vh - 230px)'
          : myCart
          ? isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
            ? 'calc(100vh - 420px)'
            : 'calc(100vh - 343px)'
          : isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
          ? 'calc(100vh - 405px)'
          : 'calc(100vh - 300px)'
      }
    },
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: 'var(--neutral-50)',
        boxShadow: 'none'
      }
    },
    muiTableBodyCellProps: ({ cell, row }) => {
      return {
        sx: {
          color: 'var(--neutral-900)',
          '&.MuiTableCell-root': {
            padding: ['discount', 'price_per_carat', 'rap', 'amount'].includes(
              cell.column.id
            )
              ? '0px 6px'
              : '0px 1px',
            textAlign:
              cell.column.id === 'girdle_percentage'
                ? 'center !important'
                : 'left',
            height: '20px !important',
            background: 'White',
            opacity: 1,
            fontSize: '12px !important',
            fontWeight: rowSelection[row.id] ? 500 : 400,
            visibility:
              (cell.id === 'shape:RAD_lot_id' ||
                cell.id === 'shape:EM_lot_id' ||
                cell.id === 'shape:BR_lot_id' ||
                cell.id === 'shape:PR_lot_id' ||
                cell.id === 'shape:PS_lot_id' ||
                cell.id === 'shape:AS_lot_id' ||
                cell.id === 'shape:OV_lot_id' ||
                cell.id === 'shape:CU_lot_id' ||
                cell.id === 'shape:MQ_lot_id' ||
                cell.id === 'shape:HS_lot_id' ||
                cell.id === 'shape:PS-RS_lot_id' ||
                cell.id === 'shape:SPL_lot_id' ||
                cell.id === 'shape:RC_lot_id' ||
                cell.id === 'shape:RMB_lot_id') &&
              'hidden',
            display:
              (cell.id === 'shape:RAD_lot_id' ||
                cell.id === 'shape:EM_lot_id' ||
                cell.id === 'shape:BR_lot_id' ||
                cell.id === 'shape:PR_lot_id' ||
                cell.id === 'shape:PS_lot_id' ||
                cell.id === 'shape:AS_lot_id' ||
                cell.id === 'shape:OV_lot_id' ||
                cell.id === 'shape:CU_lot_id' ||
                cell.id === 'shape:MQ_lot_id' ||
                cell.id === 'shape:HS_lot_id' ||
                cell.id === 'shape:SCU_lot_id' ||
                cell.id === 'shape:RX_lot_id' ||
                cell.id === 'shape:TR_lot_id' ||
                cell.id === 'shape:PS-RS_lot_id' ||
                cell.id === 'shape:SPL_lot_id' ||
                cell.id === 'shape:RC_lot_id' ||
                cell.id === 'shape:RMB_lot_id') &&
              'none'
          },

          whiteSpace: 'nowrap',
          borderBottom: originalData.some(
            (subArray: any) => subArray[1].id === row.id
          )
            ? '4px solid var(--primary-border) !important'
            : '1px solid var(--neutral-50)' //'1px solid var(--neutral-50)'
        }
      };
    },

    muiTableHeadCellProps: ({ column }) => {
      return {
        sx: {
          color: 'var(--neutral-700)',
          '&.MuiTableCell-root': {
            padding: ['discount', 'price_per_carat', 'rap', 'amount'].includes(
              column.id
            )
              ? '0px 6px'
              : '0px 1px',
            height: '20px',
            background: 'var(--neutral-50)',
            opacity: 1,
            borderTop: '1px solid var(--neutral-200)',
            fontSize: '12px !important',
            fontWeight: 500,
            paddingRight: ['location', 'details'].includes(column.id)
              ? '12px'
              : '0px',
            textAlign:
              column.id === 'girdle_percentage' ? 'center !important' : 'left'
          }
        }
      };
    },
    muiSelectAllCheckboxProps: {
      sx: {
        color: 'var(--neutral-200)',
        '& .MuiSvgIcon-root': {
          fontWeight: 100,
          fontSize: '26px'
        },
        '&.Mui-checked': {
          color: 'var(--primary-main)'
        },
        '&.MuiButtonBase-root.MuiCheckbox-root.MuiCheckbox-indeterminate': {
          /* Your styles for the element */
          color: 'var(--primary-main)'
        },
        '&.MuiCheckbox-indeterminate': {
          color: 'var(--primary-main)'
        }
      }
    },

    muiSelectCheckboxProps: {
      sx: {
        color: 'var(--neutral-200)',

        '& .MuiSvgIcon-root': {
          fontSize: '26px',
          fontWeight: 100
        },
        '& .MuiCheckbox-indeterminate': {
          display: 'none'
        },
        '&.Mui-checked': {
          color: 'var(--primary-main)'
        },
        '&.MuiCheckbox-indeterminate': {
          color: 'var(--primary-main)'
        }
      }
    },

    muiTablePaperProps: {
      elevation: 0, //change the mui box shadow
      //customize paper styles

      sx: {
        borderRadius: '8px',
        border: 'none'
      }
    },
    renderTopToolbar: ({ table }) => (
      <div>
        {
          <div className="flex min-h-[55px] items-center justify-between border-b-[1px] border-neutral200 flex px-[16px] py-[8px]">
            <div className="flex lg-w-[calc(100%-500px)] gap-[12px] flex-wrap">
              <Breadcrum
                searchParameters={searchParameters}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleCloseSpecificTab={handleCloseSpecificTab}
                setIsLoading={setIsLoading}
                isMatchingPair={true}
              />
            </div>
            <div className="pr-[2px] flex gap-[12px] w-[500px]  justify-end flex-wrap relative">
              <button
                onClick={handleDropdown}
                className={`flex items-center px-[16px] py-[8px] text-mMedium font-medium text-neutral900 !h-[40px] ${styles.ctaStyle} ${styles.ctaSecondaryStyle}`}
              >
                {ManageLocales('app.search.savedSearch')}
                <Image src={chevronDown} alt="chevronDown" />
              </button>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    svg: NewSearchIcon,
                    label: ManageLocales('app.search.newSearch'),
                    handler: () => {
                      setIsLoading(true);
                      handleNewSearch();
                    }
                  },
                  {
                    variant: 'secondary',
                    svg: DownloadAllIcon,
                    handler: downloadAllSearchTabsExcelHandler,
                    customStyle: 'w-[40px] h-[40px]',
                    tooltip: 'Download all search results'
                  },
                  {
                    variant: 'secondary',
                    svg: BinIcon,
                    handler: handleCloseAllTabs,
                    customStyle: 'w-[40px] h-[40px]',
                    tooltip: 'Close all tabs'
                  }
                ]}
                containerStyle="flex gap-[12px]!important"
              />
              <SavedSearchDropDown
                handleClose={handleDropdown}
                isOpen={isDropDownOpen}
                options={searchList?.filter(
                  (item: any) => item.is_matching_pair !== false
                )}
                onDropDownClick={onDropDownClick}
              />
            </div>
          </div>
        }
        <CalculatedField rows={rows} selectedProducts={rowSelection} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px'
          }}
        >
          <div>
            <MRT_GlobalFilterTextField
              table={table}
              onFocus={() => {
                setGlobalFilterActive(true);
              }}
              onBlur={() => {
                setGlobalFilterActive(false);
              }}
              autoComplete="false"
              sx={{
                boxShadow: 'var(--input-shadow) inset',
                border: 'none',
                borderRadius: '4px',
                ':hover': {
                  border: 'none'
                },
                '& .MuiOutlinedInput-input': {
                  color: 'var(--neutral-900)',
                  fontSize: '14px !important',
                  paddingTop: '10px'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--neutral-200) !important'
                },

                '& :hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--neutral-200) !important'
                },

                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--neutral-200) !important'
                },
                '& :focus .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--neutral-200) !important'
                },

                '& .MuiOutlinedInput-notchedOutline:hover': {
                  borderColor: 'var(--neutral-200) !important'
                },
                '& .MuiInputAdornment-root': {
                  display: 'none'
                }
              }}
            />
            {/* <StylesSearchBar table={table} autoComplete="false" /> */}
          </div>

          <div className="flex gap-[12px]" style={{ alignItems: 'inherit' }}>
            {
              // isResult &&
              searchParameters &&
              !searchParameters[activeTab - 1]?.isSavedSearch ? (
                <button
                  className=" flex border-[1px] border-neutral200 rounded-[4px] px-2 py-1 shadow-sm bg-neutral0 items-center cursor-pointer h-[37px]"
                  onClick={() => {
                    searchParameters[activeTab - 1].saveSearchName.length
                      ? handleUpdateSaveSearch()
                      : setIsInputDialogOpen(true);
                  }}
                >
                  <Image src={saveIcon} alt={'save search'} />
                  <p className="pl-1 text-mMedium font-medium text-primaryMain">
                    Save Search
                  </p>
                </button>
              ) : (
                ''
              )
            }
            <div className="h-[37px] mr-[-8px]">
              <p
                className={`bg-infoMain rounded-[12px] px-[6px] py-[1px]  text-neutral0 text-[10px] ${styles.pulse}`}
              >
                New
              </p>
            </div>

            <div
              className=" rounded-[4px] cursor-pointer"
              onClick={() => {
                setIsMPSOpen(true);
              }}
            >
              <Tooltip
                tooltipTrigger={
                  <button
                    className={`rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm ${'bg-neutral0'}`}
                  >
                    <Setting className={`${'stroke-neutral900'}`} />
                  </button>
                }
                tooltipContent={'Match Pair Setting'}
                tooltipContentStyles={'z-[1000]'}
              />
            </div>

            <div
              className="rounded-[4px] cursor-pointer"
              onClick={handleDownloadExcel}
            >
              <Tooltip
                tooltipTrigger={
                  <button
                    className={`rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm ${'bg-neutral0'}`}
                  >
                    <ExportExcel className={`${'stroke-neutral900'}`} />
                  </button>
                }
                tooltipContent={'Download Excel'}
                tooltipContentStyles={'z-[1000]'}
              />
            </div>

            <div className=" rounded-[4px] cursor-pointer">
              <Tooltip
                tooltipTrigger={
                  <div onClick={toggleFullScreen}>
                    {/* <StyledToggleFullScreenButton table={table} title="" />{' '} */}
                    {isFullScreen ? (
                      <button
                        className={`rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm bg-neutral0`}
                      >
                        <CollapsIcon
                          className={`stroke-[1.5] stroke-neutral900
                       `}
                        />
                      </button>
                    ) : (
                      <button
                        className={`rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm bg-neutral0`}
                      >
                        <ExpandImg
                          className={`stroke-[1.5] stroke-neutral900
                           `}
                        />
                      </button>
                    )}
                  </div>
                }
                tooltipContent={
                  isFullScreen ? 'Exit Full Screen' : 'Full Screen'
                }
                tooltipContentStyles={'z-[1000]'}
              />
            </div>

            <div className="flex  rounded-[4px] cursor-pointer">
              <Share
                rows={rows}
                selectedProducts={rowSelection}
                setErrorText={setErrorText}
                setIsError={setIsError}
                shareTrackIdentifier={'Match Pair'}
              />
            </div>
          </div>
        </Box>
      </div>
    ),
    renderBottomToolbar: ({ table }) => {
      if (!paginatedData.length) {
        return null;
      } else {
        return (
          <div className={`px-[16px] border-t-[1px] border-neutral200`}>
            {
              // (isResult || isDashboard) && (
              <div className="flex items-center justify-between">
                <div className="flex gap-4 h-[30px]">
                  <div className=" border-[1px] border-lengendInCardBorder rounded-[4px] bg-legendInCartFill text-legendInCart">
                    <p className="text-mMedium font-medium px-[6px] py-[4px]">
                      In Cart
                    </p>
                  </div>
                  <div className=" border-[1px] border-lengendHoldBorder rounded-[4px] bg-legendHoldFill text-legendHold">
                    <p className="text-mMedium font-medium px-[6px] py-[4px]">
                      {' '}
                      Hold
                    </p>
                  </div>
                  <div className="border-[1px] border-lengendMemoBorder rounded-[4px] bg-legendMemoFill text-legendMemo">
                    <p className="text-mMedium font-medium px-[6px] py-[4px]">
                      {' '}
                      Memo
                    </p>
                  </div>
                </div>
                <MRT_TablePagination table={table} />
                <div className="flex items-center gap-3">
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: 'secondary',
                        label: ManageLocales('app.searchResult.addToCart'),
                        isDisable: !Object.keys(rowSelection).length,
                        handler: () => handleAddToCart()
                      },

                      {
                        variant: 'primary',
                        label: ManageLocales('app.searchResult.confirmStone'),
                        isDisable: !Object.keys(rowSelection).length,
                        handler: () => {
                          handleConfirmStone({
                            selectedRows: rowSelection,
                            rows: rows,
                            setIsError,
                            setErrorText,
                            setIsConfirmStone,
                            setConfirmStoneData,
                            router,
                            modalSetState,
                            checkProductAvailability,
                            setIsLoading
                          });
                        }
                      }
                    ]}
                  />
                  <Dropdown
                    dropdownTrigger={
                      <Image
                        src={threeDotsSvg}
                        alt="threeDotsSvg"
                        width={43}
                        height={43}
                      />
                    }
                    dropdownMenu={[
                      {
                        label: 'Compare Stone',
                        isDisable: !Object.keys(rowSelection).length,
                        handler: () =>
                          handleCompareStone({
                            isCheck: rowSelection,
                            setIsError,
                            setErrorText,
                            activeCartRows: rows,
                            setIsCompareStone,
                            setCompareStoneData
                          })
                      },
                      {
                        label: ManageLocales(
                          'app.search.actionButton.bookAppointment'
                        ),

                        handler: () => {
                          handleCreateAppointment();
                        },

                        isDisable:
                          !Object.keys(rowSelection).length ||
                          isKycVerified?.customer?.kyc?.status !==
                            kycStatus.APPROVED
                      }
                    ]}
                  />
                </div>
              </div>
              // )
            }
          </div>
        );
      }
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true), setIsSkeletonLoading(false);
    }, 1500); // Small delay to ensure rendering phase is completed
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  useEffect(() => {
    let timer: any;

    setIsLoaded(false);
    setIsSkeletonLoading(true);

    if (isFetchingMatchPairData) {
      clearTimeout(timer);
    }
    // Set a new timer with the updated delay
    timer = setTimeout(() => {
      setIsLoaded(true);
      setIsSkeletonLoading(false);
    }, 4000);

    // Cleanup function to clear the timer on effect re-run or unmount
    return () => clearTimeout(timer);
  }, [activeTab, isFetchingMatchPairData]);

  // const handleInputBlur = (index: number, field: string) => {
  //   const endValue = mps[index].end;
  //   let value = parseFloat(mps[index][field]) || 0; // Convert to number on blur

  //   // Validate the value
  //   if (value < 0) value = 0;
  //   if (value > endValue) value = endValue;

  //   const updatedMps = [...mps];
  //   updatedMps[index] = { ...updatedMps[index], [field]: value.toString() }; // Set final validated value as string
  //   setMps(updatedMps);
  // };

  // const handleDragEnd = (result: any) => {
  //   const { destination, source } = result;

  //   if (!destination) return;

  //   const reorderedItems = Array.from(items);
  //   const [removed] = reorderedItems.splice(source.index, 1);
  //   reorderedItems.splice(destination.index, 0, removed);

  //   setItems(reorderedItems);
  // };

  return (
    <>
      {isSkeletonLoading || !isLoaded || isLoading || isProductFetching ? (
        <MathPairSkeleton />
      ) : (
        <ThemeProvider theme={theme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      )}
    </>
  );
};

export default MatchPairTable;
