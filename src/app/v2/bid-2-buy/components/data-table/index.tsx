import { Box, Stack } from '@mui/material';
import {
  MRT_ExpandButton,
  MRT_GlobalFilterTextField,
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import ExpandImg from '@public/v2/assets/icons/detail-page/expand.svg?url';
import CollapsIcon from '@public/v2/assets/icons/collapse-icon.svg?url';
import ExportExcel from '@public/v2/assets/icons/detail-page/export-excel.svg?url';
import Image from 'next/image';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';
import FilterIcon from '@public/v2/assets/icons/new-arrivals/filter-icon.svg?url';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { faSort, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import DisableDecrementIcon from '@public/v2/assets/icons/new-arrivals/disable-decrement.svg?url';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
import Share from '@/components/v2/common/copy-and-share/share';
import ActionButton from '@/components/v2/common/action-button';
import Bid2BuyCalculatedField from '@app/v2/new-arrivals/components/new-arrival-calculated-field';
import Tab from '@components/v2/common/bid-tabs/index';
import { InputField } from '@/components/v2/common/input-field';
import DecrementIcon from '@public/v2/assets/icons/new-arrivals/decrement.svg?url';
import IncrementIcon from '@public/v2/assets/icons/new-arrivals/increment.svg?url';
import empty from '@public/v2/assets/icons/data-table/empty-bid-to-buy.svg';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import Tooltip from '@/components/v2/common/tooltip';
import { kycStatus } from '@/constants/enums/kyc';
import { formatNumber } from '@/utils/fix-two-digit-number';
import { handleDecrementDiscount } from '@/utils/v2/handle-decrement-discount';
import { handleIncrementDiscount } from '@/utils/v2/handle-increment-discount';
import { RenderBidToBuyLotIdColor } from '@/components/v2/common/data-table/helpers/render-cell';
import infoIcon from '@public/v2/assets/icons/new-arrivals/info-icon.svg';
import { SubRoutes } from '@/constants/v2/enums/routes';
import infoHover from '@public/v2/assets/icons/info.svg';
import { ManageLocales } from '@/utils/v2/translate';
import BiddingSkeleton from '@/components/v2/skeleton/bidding';
import SearchInputField from '@/components/v2/common/search-input/search-input';
// import debounce from 'lodash.debounce';
import ClearIcon from '@public/v2/assets/icons/close-outline.svg?url';
import {
  useAddBidMutation,
  useLazyGetAllBidStonesQuery
} from '@/features/api/product';
import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { useAppSelector } from '@/hooks/hook';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
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
          },
          '&.Mui-TableBodyCell-DetailPanel': {
            backgroundColor: 'var(--neutral-25) !important',
            borderBottom: '1px solid var(--neutral-50)' // Customize the border as needed
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
            fontWeight: 500,
            borderTop: 'none'
          }
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
    MuiTypography: {
      styleOverrides: {
        root: {
          fontStyle: 'normal !important'
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

const BidToBuyDataTable = ({
  columns,
  modalSetState,
  downloadExcel,
  setErrorText,
  setIsError,
  tabLabels,
  activeTab,
  handleTabClick,
  rows = [],
  activeCount,
  bidCount,
  historyCount,
  rowSelection,
  setRowSelection,
  setIsLoading,
  renderFooter,
  router,
  filterData,
  setSorting,
  sorting,
  setBid,
  isSkeletonLoading,
  setIsSkeletonLoading,
  isTabSwitch,
  setIsTabSwitch,
  setBidValues,
  bidValues,
  setActiveBid, // searchUrl
  isInActive
}: any) => {
  // Fetching saved search data
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [bidError, setBidError] = useState<{
    [key: string]: string;
  }>({});
  const [hoveredRowId, setHoveredRowId] = useState('');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: parseInt(localStorage.getItem('pageSize') ?? '20') //customize the default page size
  });
  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const [searchableId, setSearchableId] = useState('');

  const handleFilterSearch = () => {
    // Trim the searchableId to remove any extra spaces
    let trimmedSearchableId = searchableId.trim();

    // Filter the rows based on the trimmed searchableId
    let searchData = rows.filter(
      (data: any) => data.lot_id === trimmedSearchableId
    );

    // Update the paginated data state
    setPaginatedData(searchData);
  };
  const filterDataState: any = useAppSelector(state => state.filterBidToBuy);

  const handleGlobalFilter = () => {
    if (globalFilter !== '') {
      setRowSelection({});
      // Remove all whitespace characters from globalFilter
      const trimmedFilter = globalFilter.replace(/\s+/g, '');
      let data = rows.filter(
        (data: any) => data?.lot_id?.startsWith(trimmedFilter)
      );
      // const startIndex = pagination.pageIndex * pagination.pageSize;
      // const endIndex = startIndex + pagination.pageSize;
      // Slice the data to get the current page's data
      // const newData = data.slice(startIndex, endIndex);
      // Update the paginated data state
      setPaginatedData(data);
      setIsSkeletonLoading(false);
    } else {
      // Apply the sorting logic to the full dataset
      const sortedFullData = sortData(rows, sorting);

      // Pagination logic
      const startIndex = pagination.pageIndex * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      const newData = sortedFullData.slice(startIndex, endIndex);

      // Update the paginated data state
      setPaginatedData(newData);
      setIsSkeletonLoading(false);
    }
  };
  useEffect(() => {
    handleGlobalFilter();
  }, [globalFilter]);
  useEffect(() => {
    if ((activeTab === 0 && searchableId === '') || activeTab === 1) {
      // Calculate the start and end indices for the current page
      const startIndex = pagination.pageIndex * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      // Slice the data to get the current page's data
      const newData = rows.slice(startIndex, endIndex);
      // Update the paginated data state
      setPaginatedData(newData);
      setIsSkeletonLoading(false);
    } else if (activeTab === 2) {
      setPaginatedData(rows);
      setIsSkeletonLoading(false);
    }
  }, [
    rows,
    pagination.pageIndex, //re-fetch when page index changes
    pagination.pageSize, //re-fetch when page size changes
    activeTab,
    searchableId
  ]);

  useEffect(() => {
    setIsTabSwitch(false);
  }, [paginatedData]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
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

  const handleDownloadExcel = () => {
    let selectedIds = Object.keys(rowSelection);

    const allProductIds = rows.map(({ id }: { id: string }) => {
      return id;
    });

    downloadExcelHandler({
      products: selectedIds.length > 0 ? selectedIds : allProductIds,
      downloadExcelApi: downloadExcel,
      modalSetState,
      setRowSelection,
      setIsLoading: setIsLoading,
      router,
      [activeTab === 2 ? 'fromBidToBuyHistory' : 'fromBidToBuy']: true,
      page: 'Bid_To_Buy'
    });
  };

  const [columnOrder] = useState(
    [
      'mrt-row-select',
      'lot_id',
      'last_bid_date',
      'details',
      'location',
      'lab',
      'shape',
      'shape_full',
      'carats',
      'color',
      'clarity',
      'cut',
      'polish',
      'symmetry',
      'fluorescence',
      'rap_value',
      'discount',
      'my_current_bid',
      ...columns.map((c: any) => c.accessorKey)
    ] //array of column ids (Initializing is optional as of v2.10.0)
  );

  const renderTopToolbar = ({ table }: any) => (
    <div>
      <div className={`border-neutral200 border-b-[1px] `}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px'
          }}
        >
          <div className="w-[450px]">
            <Tab
              labels={tabLabels}
              activeIndex={activeTab}
              onTabClick={id => {
                // if(id===0){
                //   router.push(`/v2/bid-2-buy?active-tab=bid_to_bid`);
                // }
                // else{
                handleTabClick(id), setSearchableId('');

                // }
              }}
              activeCount={activeCount}
              bidCount={bidCount}
              historyCount={historyCount}
            />
          </div>
          <div className="flex gap-[12px]" style={{ alignItems: 'inherit' }}>
            {activeTab === 0 && isInActive !== 'INACTIVE_BID_TO_BUY' && (
              <div className="">
                <button
                  onClick={() => {
                    router.push(
                      `/v2/bid-2-buy?active-tab=${SubRoutes.BID_TO_BUY}`
                    );
                  }}
                  className={`flex w-full shadow-sm justify-center py-[8px] h-[39px] px-[16px]  items-center font-medium  rounded-[4px] gap-1  border-[1px]  border-solid border-neutral200 text-mMedium  cursor-pointer  ${'bg-primaryMain text-neutral0 hover:bg-primaryHover'}`}
                >
                  <FilterIcon
                    stroke={`${'var(--neutral-0)'}`}
                    fill={`${'var(--neutral-0)'}`}
                  />

                  <p className="w-[80%]">{ManageLocales('app.modifyFilter')}</p>
                </button>
              </div>
            )}
            {activeTab === 0 ? (
              <div className="flex relative">
                <SearchInputField
                  type="text"
                  name="Search"
                  value={searchableId}
                  onChange={e => {
                    setSearchableId(e.target.value);
                  }}
                  placeholder={'Search by stone id'}
                  customStyle={`${searchableId && '!pr-[110px]'} !w-[250px]`}
                />
                {searchableId && (
                  <>
                    <ActionButton
                      actionButtonData={[
                        {
                          variant: 'primary',
                          label: 'Search',
                          handler: handleFilterSearch,
                          customCtaStyle: '!h-[30px] !text-[12px]',

                          customStyle:
                            'flex-1 w-[60px] h-[30px] absolute top-[6px] right-[32px]'
                        }
                      ]}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-1">
                      <ClearIcon
                        className="stroke-neutral900 cursor-pointer"
                        onClick={() => {
                          setSearchableId('');
                          const startIndex =
                            pagination.pageIndex * pagination.pageSize;
                          const endIndex = startIndex + pagination.pageSize;
                          // Slice the data to get the current page's data
                          const newData = rows.slice(startIndex, endIndex);
                          // Update the paginated data state
                          setPaginatedData(newData);
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <MRT_GlobalFilterTextField
                table={table}
                autoComplete="false"
                placeholder="Search by stone id"
                className="max-[1092px]:w-[110px]   max-[1160px]:w-[180px] max-xl:w-auto"
                sx={{
                  boxShadow: 'var(--input-shadow) inset',
                  border: 'none',
                  color: 'var(--neutral-400)',
                  borderRadius: '4px',

                  '& .MuiOutlinedInput-input': {
                    color: 'var(--neutral-900)',
                    fontSize: '14px !important',
                    paddingTop: '10px'
                  },
                  ':hover': {
                    border: 'none'
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
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    handleGlobalFilter();
                  }
                }}
              />
            )}

            <div
              className=" rounded-[4px] cursor-pointer"
              onClick={handleDownloadExcel}
            >
              <Tooltip
                tooltipTrigger={
                  <button
                    disabled={!rows.length}
                    className={` disabled:!bg-neutral100 disabled:cursor-not-allowed disabled:text-neutral400 rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm ${'bg-neutral0'}`}
                  >
                    <ExportExcel
                      className={`${
                        !rows.length ? 'stroke-neutral400' : 'stroke-neutral900'
                      }`}
                    />
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

            <div className="flex rounded-[4px] cursor-pointer">
              <Share
                rows={rows}
                selectedProducts={rowSelection}
                setErrorText={setErrorText}
                setIsError={setIsError}
                identifier={'Bid to Buy'}
                activeTab={activeTab}
                shareTrackIdentifier={'Bid to Buy'}
              />
            </div>
          </div>
        </Box>
      </div>

      {rows.length > 0 && (
        <Bid2BuyCalculatedField
          rows={rows}
          selectedProducts={rowSelection}
          showMyCurrentBid={activeTab === 1}
        />
      )}
    </div>
  );
  const renderBottomToolbar = ({ table }: any) => {
    if (!paginatedData.length) {
      return null;
    } else {
      return renderFooter(table);
    }
  };

  const NoResultsComponent = () => {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-5 ${
          isFullScreen ? 'h-[69vh]' : !rows.length ? 'h-[55vh]' : 'h-[60vh]'
        }   mt-[50px] ${!paginatedData.length && '!h-[47vh]  !mt-[20px]'}`}
      >
        {(activeTab === 1 && activeCount === 0) ||
        (activeTab === 0 && bidCount === 0) ||
        (activeTab === 2 && historyCount === 0) ||
        rows.length === 0 ? (
          <>
            <Image src={empty} alt={'empty'} />
            <p className="text-neutral900  w-[350px] text-center ">
              Every month we provide an extra discount on a few stones which you
              can bid to buy. Stay tuned.
            </p>
          </>
        ) : !paginatedData.length && searchableId.length ? (
          <div className="text-center">
            <Image src={empty} alt="empty" />
            <p className="text-neutral900 w-[220px] mx-auto">
              No matching stones found.
            </p>
          </div>
        ) : rows.length ? (
          ''
        ) : (
          <CustomKGKLoader />
        )}
      </div>
    );
  };
  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  // const handleGlobalFilterChange = debounce((value: any) => {
  //   setGlobalFilter(value);
  // }, 300);
  //pass table options to useMaterialReactTable

  const [addBid] = useAddBidMutation();
  let [
    triggerBidToBuyApi
    // { isLoading: isLoadingBidToBuyApi, isFetching: isFetchingBidToBuyApi }
  ] = useLazyGetAllBidStonesQuery();

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
  const nonSortableAccessors = ['shape_full', 'details', 'fire_icon'];
  const sortData = (data: any, sorting: any) => {
    if (!sorting.length) return data; // If no sorting is applied, return the data as-is
    const sortedData = [...data].sort((rowA, rowB) => {
      for (let sort of sorting) {
        const columnId = sort.id;
        const isDesc = sort.desc;
        // Skip sorting for non-sortable accessors
        if (nonSortableAccessors.includes(columnId)) {
          continue; // Move to the next sorting criteria or return unsorted data
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
            const amountA = rowA.original?.price ?? 0;
            const amountB = rowB.original?.price ?? 0;
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
    return sortedData;
  };
  // Handle sorting and pagination
  useEffect(() => {
    // Apply the sorting logic to the full dataset
    const sortedFullData = sortData(rows, sorting);
    // Pagination logic
    const startIndex = pagination.pageIndex * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const newData = sortedFullData.slice(startIndex, endIndex);
    // Update the paginated data state
    setPaginatedData(newData);
    // Optional skeleton loading logic

    setIsSkeletonLoading(false);
  }, [
    rows,
    sorting, // Trigger sorting when sorting state changes
    pagination.pageIndex, // Re-fetch when page index changes
    pagination.pageSize // Re-fetch when page size changes
  ]);

  const table = useMaterialReactTable({
    columns: paginatedData.length ? columns : [],
    data: isTabSwitch ? [] : paginatedData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    //state
    getRowId: originalRow => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: {
      columnOrder,
      rowSelection,
      isFullScreen: isFullScreen,
      pagination,

      globalFilter
    },
    //filters

    positionToolbarAlertBanner: 'none',
    enableColumnActions: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    // enablePagination: activeTab !== 2,
    enableStickyHeader: true,
    enableGrouping: false,
    enableExpandAll: false,
    enableColumnDragging: false,
    groupedColumnMode: 'remove',
    enableRowSelection: true,
    enableToolbarInternalActions: true,
    globalFilterFn: 'startsWith',
    selectAllMode: 'page',
    renderTopToolbar,
    enablePagination: !paginatedData.length ? false : true,
    renderBottomToolbar,
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
    manualSorting: true, // Enable manual sorting
    onSortingChange: handleSortingChange, // Handle sorting change
    icons: {
      SearchIcon: () => (
        <Image src={searchIcon} alt={'searchIcon'} className="mr-[6px]" />
      ),

      SortIcon: () => null,
      SyncAltIcon: () => null,
      ArrowDownwardIcon: () => null
    },

    // selectAllMode: undefined,

    muiTableBodyRowProps: ({ row }) => {
      const isHighlightBackground =
        activeTab === 2 && RenderBidToBuyLotIdColor({ row });
      return {
        onClick: row.id.includes('shape')
          ? row.getToggleExpandedHandler()
          : row.getToggleSelectedHandler(),
        sx: {
          cursor: 'pointer',

          '&.MuiTableRow-root': {
            // Define styles for the ::after pseudo-element of each cell within a hovered row
            '& .MuiTableCell-root::after': {
              // Maintain the default background color for non-lot_id columns
              backgroundColor: row.getIsSelected()
                ? 'var(--neutral-100)  !important'
                : 'var(--neutral-50) !important'
            },

            '& .MuiTableCell-root[data-index="1"]::after': {
              // Change the background color to red if isHighlightBackground is true, otherwise maintain the default hover color
              backgroundColor: isHighlightBackground
                ? `${isHighlightBackground.background} !important`
                : 'var(--neutral-50)'
            }
          },
          '&.MuiTableRow-root .MuiTableCell-root::after': {
            backgroundColor: 'var(--neutral-25)'
          },
          '&.MuiTableRow-root.Mui-selected': {
            backgroundColor: 'var(--neutral-100) !important'
          },
          '& .Mui-selected': {
            backgroundColor: 'red !important'
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
                border: 'none',
                background: 'red'
              },
              '::after': {
                border: 'none',
                background: 'red'
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
        left: ['mrt-row-select', 'lot_id', 'mrt-row-expand']
      },
      pagination: pagination,
      sorting: sorting
    },

    positionGlobalFilter: 'left',
    //styling

    muiTableContainerProps: {
      sx: {
        height: isFullScreen ? '70vh' : 'calc(100vh - 399px)',
        minHeight: isFullScreen
          ? activeTab === 2
            ? 'calc(100vh - 123px)'
            : 'calc(100vh - 175px)'
          : activeTab === 2
          ? isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
            ? 'calc(100vh - 254px)'
            : 'calc(100vh - 260px)'
          : isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
          ? 'calc(100vh - 254px)'
          : !rows.length
          ? 'calc(100vh - 260px)'
          : !rows.length
          ? 'calc(100vh - 260px)'
          : 'calc(100vh - 255px)',
        maxHeight: isFullScreen
          ? activeTab === 2
            ? 'calc(100vh - 123px)'
            : 'calc(100vh - 175px)'
          : activeTab === 2
          ? isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
            ? 'calc(100vh - 362px)'
            : 'calc(100vh - 260px)'
          : isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
          ? 'calc(100vh - 362px)'
          : 'calc(100vh - 260px)'
      }
    },
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: 'var(--neutral-50)',
        boxShadow: 'none'
      }
    },

    muiTableBodyCellProps: ({ cell, row }) => {
      const isHighlightBackground =
        activeTab === 2 &&
        cell.column.id === 'lot_id' &&
        RenderBidToBuyLotIdColor({ row });
      return {
        sx: {
          color: 'var(--neutral-900)',
          '&.MuiTableCell-root': {
            padding: ['discount', 'price_per_carat', 'rap'].includes(
              cell.column.id
            )
              ? '0px 6px'
              : '0px 2px',
            textAlign:
              cell.column.id === 'girdle_percentage'
                ? 'center !important'
                : 'left',

            height: '20px !important',
            fontSize: '12px !important',
            fontWeight: rowSelection[row.id] ? 500 : 400,
            background: isHighlightBackground
              ? `${isHighlightBackground.background} !important `
              : 'White',
            color: isHighlightBackground && isHighlightBackground.text,
            opacity: 1,
            '&:hover': {
              background: isHighlightBackground
                ? isHighlightBackground.background
                : 'White'
            },
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
          // '&.MuiTableCell-root[data-index="1"] ':{
          //   display:'none'
          // },
          whiteSpace: 'nowrap',
          borderBottom: '1px solid var(--neutral-50)'
        }
      };
    },

    muiTableHeadCellProps: ({ column }) => {
      return {
        sx: {
          color: 'var(--neutral-700)',
          '&.MuiTableCell-root': {
            padding: ['discount', 'price_per_carat', 'rap'].includes(column.id)
              ? '0px 6px'
              : '0px 2px',
            background: 'var(--neutral-50)',
            opacity: 1,
            borderTop: '1px solid var(--neutral-200)',
            fontSize: '12px !important',
            fontWeight: 500,
            textAlign:
              column.id === 'girdle_percentage' ? 'center !important' : 'left',
            paddingRight: ['shape_full', 'details'].includes(column.id)
              ? '12px'
              : '0px'
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
    muiTableHeadProps: rows?.length === 0 ? { style: { display: 'none' } } : {},

    renderDetailPanel: ({ row }) => {
      // Check if the current row's ID is in the rowSelection state
      if (
        activeTab !== 2 &&
        rowSelection[row.id] &&
        !(isKycVerified?.customer?.kyc?.status !== kycStatus.APPROVED)
      ) {
        const bidValue =
          bidValues[row.id] !== undefined
            ? bidValues[row.id]
            : activeTab === 1
            ? parseFloat(row.original.my_current_bid).toFixed(2)
            : parseFloat(row.original.discount).toFixed(2);

        // If the row is selected, return the detail panel content
        return (
          <div>
            <div
              className="flex gap-6"
              onClick={event => event.stopPropagation()}
            >
              <div className="w-[110px] ml-7">
                <div className="text-sRegular text-neutral700">Bid Pr/Ct</div>

                <InputField
                  // label={'Bid Pr/Ct'}
                  type="text"
                  value={
                    bidValues[row.id] !== undefined
                      ? !bidValue ||
                        bidValue <=
                          (activeTab === 1
                            ? row.original.my_current_bid
                            : row.original.discount)
                        ? formatNumber(row.original.price_per_carat)
                        : formatNumber(
                            row.original.rap * (1 + bidValues[row.id] / 100)
                          )
                      : formatNumber(row.original.price_per_carat)
                  }
                  styles={{
                    inputMain: 'h-[30px]',
                    input:
                      '!bg-neutral100 !border-neutral200 !text-neutral700 !h-[30px]  text-sMedium'
                  }}
                  disabled
                />
              </div>
              <div className="w-[110px]">
                <div className="text-sRegular text-neutral700">Bid Amt $</div>

                <InputField
                  type="text"
                  styles={{
                    inputMain: 'h-[30px]',
                    input:
                      '!bg-neutral100 !border-neutral200 !text-neutral700 !h-[30px]  text-sMedium'
                  }}
                  value={
                    bidValues[row.id] !== undefined
                      ? !bidValue ||
                        bidValue <=
                          (activeTab === 1
                            ? row.original.my_current_bid
                            : row.original.discount)
                        ? formatNumber(row.original.price)
                        : formatNumber(
                            row.original.rap *
                              (1 + bidValues[row.id] / 100) *
                              row.original.carats
                          )
                      : formatNumber(row.original.price)
                  }
                  disabled
                />
              </div>
              <div className="">
                <div className="text-sRegular text-neutral700">Bid Disc%</div>
                <div className="gap-6 flex">
                  <div className="h-[30px] flex gap-1">
                    {bidValue <=
                    (activeTab === 1
                      ? row.original.my_current_bid
                      : row.original.discount) ? (
                      <div className="cursor-not-allowed">
                        <DisableDecrementIcon />
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          handleDecrementDiscount(
                            row.id,
                            activeTab === 1
                              ? row.original.my_current_bid
                              : row.original.discount,
                            setBidError,
                            setBidValues
                          )
                        }
                      >
                        <DecrementIcon />
                      </div>
                    )}

                    <div className="w-[110px]">
                      <InputField
                        type="number"
                        styles={{
                          inputMain: 'h-[54px]',
                          input: '!h-[30px]  text-sMedium'
                        }}
                        value={bidValue}
                        onChange={e => {
                          const newValue = e.target.value;

                          let discount =
                            activeTab === 1
                              ? row.original.my_current_bid
                              : row.original.discount;
                          if (newValue < discount) {
                            setBidError(prevError => {
                              return {
                                ...prevError,
                                [row.id]:
                                  'Bid value cannot be less than maximum discount.'
                              };
                            });
                            setBidValues((prevValues: any) => {
                              // If there's already a bid value for this row, increment it
                              return {
                                ...prevValues,
                                [row.id]: newValue
                              };
                            });
                          } else {
                            setBidError(prevError => {
                              return {
                                ...prevError,
                                [row.id]: ''
                              };
                            });

                            setBidValues((prevValues: any) => {
                              // If there's already a bid value for this row, increment it
                              return {
                                ...prevValues,
                                [row.id]: newValue
                              };
                            });
                          }
                        }}
                      />
                    </div>
                    <div
                      onClick={() =>
                        handleIncrementDiscount(
                          row.id,
                          activeTab === 1
                            ? row.original.my_current_bid
                            : row.original.discount,
                          setBidError,
                          setBidValues
                        )
                      }
                    >
                      <IncrementIcon />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ActionButton
                      actionButtonData={[
                        {
                          variant:
                            bidValue <=
                            (activeTab === 1
                              ? row.original.my_current_bid
                              : row.original.discount)
                              ? 'disable'
                              : 'primary',
                          label: activeTab === 0 ? 'Add Bid' : 'Update Bid',
                          handler: () => {
                            if (!bidError[row.id]) {
                              if (
                                bidValue <
                                (activeTab === 1
                                  ? row.original.my_current_bid
                                  : row.original.discount)
                              ) {
                                setBidError(prevError => {
                                  return {
                                    ...prevError,
                                    [row.id]:
                                      'Bid value cannot be less than maximum discount.'
                                  };
                                });
                                return; // Exit early, do not update bidValues
                              }
                              addBid({
                                product_id: row.id,
                                bid_value: Number(bidValues[row.id])
                              })
                                .unwrap()
                                .then(res => {
                                  // if (res?.status === 200) {
                                  modalSetState.setIsDialogOpen(true);
                                  modalSetState.setDialogContent(
                                    <CommonPoppup
                                      content=""
                                      header={'Bid Placed Successfully'}
                                      handleClick={() =>
                                        modalSetState.setIsDialogOpen(false)
                                      }
                                      buttonText="Okay"
                                      status="success"
                                    />
                                  );

                                  triggerBidToBuyApi({
                                    searchUrl: constructUrlParams(
                                      JSON.parse(localStorage.getItem('bid')!)
                                    ),
                                    limit: 300
                                  })
                                    .unwrap()
                                    .then((response: any) => {
                                      setBid(response?.bidStone);
                                      setActiveBid(response?.activeStone);
                                      setIsLoading(false);

                                      const storedValue = JSON.parse(
                                        localStorage.getItem('user_bid_states')!
                                      );
                                      const userData = JSON.parse(
                                        localStorage.getItem('user')!
                                      );

                                      if (!storedValue) {
                                        // If the user doesn't exist, add the new user
                                        const newUser = [
                                          {
                                            phone: userData.customer.phone
                                          }
                                        ];

                                        localStorage.setItem(
                                          'user_bid_states',
                                          JSON.stringify(newUser)
                                        );
                                      } else {
                                        // Check if the user already exists
                                        const isUserAlreadyExist =
                                          storedValue?.find(
                                            (user: any) =>
                                              user?.phone ===
                                              userData.customer.phone
                                          );

                                        if (isUserAlreadyExist) return;

                                        // If the user doesn't exist, add the new user
                                        const newUser = {
                                          phone: userData.customer.phone
                                        };
                                        const updatedUserBidStates = [
                                          ...storedValue,
                                          newUser
                                        ];

                                        localStorage.setItem(
                                          'user_bid_states',
                                          JSON.stringify(updatedUserBidStates)
                                        );
                                      }
                                    })
                                    .catch(e => {
                                      setIsLoading(false);
                                    });
                                })
                                .catch(e => {
                                  setBidValues((prevValues: any) => {
                                    // Create a new object excluding keys in rowSelection
                                    const updatedValues = { ...prevValues };
                                    delete updatedValues[row.id]; // Remove the key from the state

                                    return updatedValues;
                                  });
                                  modalSetState.setIsDialogOpen(true);
                                  modalSetState.setDialogContent(
                                    <CommonPoppup
                                      header={e?.data?.message}
                                      content={''}
                                      handleClick={() =>
                                        modalSetState.setIsDialogOpen(false)
                                      }
                                      buttonText="Okay"
                                      // status="success"
                                    />
                                  );
                                  // }
                                });

                              // socketManager.emit('place_bidtobuy', {
                              //   product_id: row.id,
                              //   bid_value: bidValues[row.id]
                              // });
                              activeTab === 0 &&
                                setRowSelection((prev: any) => {
                                  let prevRows = { ...prev };
                                  delete prevRows[row.id];
                                  return prevRows;
                                });
                              setBidError(prevError => {
                                return {
                                  ...prevError,
                                  [row.id]: ''
                                };
                              });
                            }
                          },
                          isDisable:
                            bidValue <=
                              (activeTab === 1
                                ? row.original.my_current_bid
                                : row.original.discount) || !bidValue,
                          customCtaStyle: '!h-[30px] !text-[12px]',

                          customStyle: 'flex-1 w-full h-[30px]'
                        }
                      ]}
                    />

                    <div className="relative">
                      <Image
                        onMouseEnter={() => setHoveredRowId(row.id)}
                        onMouseLeave={() => setHoveredRowId('')}
                        src={infoIcon}
                        alt="order meta data"
                      />
                      {hoveredRowId === row.id && (
                        <div className="absolute z-[999] bg-[#ECF2FC] w-[320px] border-[1px] border-[#B6CFF3] rounded-[8px] p-4 text-[#475467] left-0  gap-2 right-[0px] ">
                          <div className="flex flex-col gap-2">
                            <div className="flex gap-1 items-center">
                              <Image src={infoHover} alt="your orders" />{' '}
                              <p className="text-neutral900 font-medium text-mMedium">
                                Bid Cancellation Policy
                              </p>
                            </div>
                            <p className="text-neutral600 text-[14px]">
                              You can only increase your bid percentage after
                              placing it. Canceling or lowering a bid is
                              restricted.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" text-dangerMain text-sRegular">
                  {bidError[row.id]}
                </div>
              </div>
            </div>
            {/* <div className="pl-10 text-dangerMain text-mRegular">
              {bidError}
            </div> */}
          </div>
        );
      }
      return null;
    }
  });
  return (
    <>
      {isSkeletonLoading ? (
        !Object?.keys(localStorage.getItem('bid') ?? {}).length ? (
          <></>
        ) : (
          <BiddingSkeleton />
        )
      ) : (
        <ThemeProvider theme={theme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      )}
    </>
  );
};

export default BidToBuyDataTable;
