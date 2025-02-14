import { Box, Stack } from '@mui/material';
import {
  MRT_ExpandButton,
  MRT_GlobalFilterTextField,
  MRT_TablePagination,
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import Select from 'react-select';
import empty from '@public/v2/assets/icons/data-table/empty-table.svg';
import ExpandImg from '@public/v2/assets/icons/detail-page/expand.svg?url';
import lightBulb from '@public/v2/assets/icons/light-bulb-svgrepo-com.svg';
import CollapsIcon from '@public/v2/assets/icons/collapse-icon.svg?url';
import ExportExcel from '@public/v2/assets/icons/detail-page/export-excel.svg?url';
import ExportEmailViaEmail from '@public/v2/assets/icons/excel-via-email-icon.svg?url';
import BinIcon from '@public/v2/assets/icons/bin.svg';
import NewSearchIcon from '@public/v2/assets/icons/new-search.svg';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';
import Image from 'next/image';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CalculatedField from '../calculated-field';
import ActionButton from '../action-button';
import { ManageLocales } from '@/utils/v2/translate';
import Breadcrum from '../search-breadcrum/breadcrum';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
import {
  clarity,
  fluorescenceSortOrder,
  sideBlackSortOrder,
  tableBlackSortOrder,
  tableInclusionSortOrder
} from '@/constants/v2/form';
import Tooltip from '../tooltip';
import DataTableSkeleton from '../../skeleton/data-table';
import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { colourStyles } from '../input-field/dynamic-mobile/country-select';
import { STONE_LOCATION_SPACE_CODE } from '@/constants/v2/enums/location';

// import { Switch } from '../../ui/switch';

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

const DataTable = ({
  rows,
  columns,
  setRowSelection,
  rowSelection,
  showCalculatedField = false,
  isResult = false,
  barcodeScan = false,
  activeTab,
  dataTableSetState,
  searchParameters,
  setActiveTab,
  handleCloseAllTabs,
  handleCloseSpecificTab,
  handleNewSearch,
  modalSetState,
  downloadExcel,
  setIsError,
  setSorting,
  selectedOption,
  sorting,
  setErrorText,
  setIsLoading,

  isDashboard,

  setIsSkeletonLoading,
  isSkeletonLoading,
  handleStateChange,
  showEmptyState
}: any) => {
  const userStates = JSON.parse(localStorage.getItem('user')!)?.salesperson
    ?.inventories_access;
  console.log('userStates', userStates);
  const options = [
    { value: 'All', label: 'All' },
    ...userStates.map((state: string) => ({ value: state, label: state }))
  ];

  console.log('options', options);

  // Fetching saved search data
  const router = useRouter();

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
  const [globalFilter, setGlobalFilter] = useState('');

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
    } else {
      // Apply the sorting logic to the full dataset
      const sortedFullData = sortData(rows, sorting);

      // Pagination logic
      const startIndex = pagination.pageIndex * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      const newData = sortedFullData.slice(startIndex, endIndex);

      // Update the paginated data state
      setPaginatedData(newData);
    }
  };

  useEffect(() => {
    handleGlobalFilter();
  }, [globalFilter]);

  useEffect(() => {
    // Calculate the start and end indices for the current page
    const startIndex = pagination.pageIndex * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    // Slice the data to get the current page's data
    const newData = rows.slice(startIndex, endIndex);
    // Update the paginated data state
    setPaginatedData(newData);
    if (
      (isResult || isDashboard) &&
      setIsSkeletonLoading &&
      newData.length > 0
    ) {
      setIsSkeletonLoading(false);
    } else if (barcodeScan && setIsSkeletonLoading) {
      setIsSkeletonLoading(false);
    }
  }, [
    rows,
    pagination.pageIndex, //re-fetch when page index changes
    pagination.pageSize //re-fetch when page size changes
  ]);

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
    if (isResult && setIsSkeletonLoading && newData.length > 0) {
      setIsSkeletonLoading(false);
    } else if (barcodeScan && setIsSkeletonLoading) {
      setIsSkeletonLoading(false);
    }
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
      page: 'Normal_Search'
    });
  };

  const handleSpaceCode = async () => {
    if (Object.keys(rowSelection).length === 0) {
      setIsError(true);
      setErrorText('Please pick a stone.');
      console.log('hererer');
      return; // Exit if no selection is made
    }

    let selectedRows = Object.keys(rowSelection).map(id =>
      rows.find((row: any) => row.id === id)
    ); // Get each selected row

    let selectedIds = selectedRows
      .map(row => row?.rfid) // Get rfid for each selected row
      .filter((rfid): rfid is string => rfid !== undefined && rfid !== null); // Filter out nulls and ensure uniqueness

    if (selectedIds.length === 0) {
      setIsError(true);
      setErrorText('No RFID found for the selected stones.');
      return; // Exit if all RFID values are empty
    }

    const token = JSON.parse(localStorage.getItem('user')!)?.salesperson
      ?.rfid_smartdrawer_token;
    const firstName = JSON.parse(localStorage.getItem('user')!)?.salesperson
      ?.firstName;
    const lastName = JSON.parse(localStorage.getItem('user')!)?.salesperson
      ?.lastName;

    if (!token) {
      setIsError(true);
      setErrorText('Token not found in localStorage.');
      return; // Exit if token is not found
    }

    // Check if all selected stones have the same location
    const locations = selectedRows.map(row => row?.location);
    const uniqueLocations = new Set(locations);

    if (uniqueLocations.size > 1) {
      setIsError(true);
      setErrorText('All selected stones must be from the same location.');
      return; // Exit if locations are different
    }

    const location = locations[0] as keyof typeof STONE_LOCATION_SPACE_CODE;
    const payload = {
      display_name: `${firstName} ${lastName}`,
      rfid_list: selectedIds,
      location: STONE_LOCATION_SPACE_CODE[location] // Use the location of the first stone
    };

    try {
      const response = await fetch(
        'http://20.244.26.74:9898/api/spacecode/smartdrawer-light',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setIsError(true);
        setErrorText(data.message || 'Failed to send data to the API.');
        return; // Exit if the API call fails
      }

      modalSetState.setIsDialogOpen(true);
      modalSetState.setDialogContent(
        <CommonPoppup
          status="success"
          content={''}
          customPoppupBodyStyle="!mt-[70px]"
          header={'Succesfull'}
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
      console.log('API response:', data);
    } catch (error) {
      setIsError(true);
      console.error('Error during API call:', error);
      setErrorText('An error occurred while making the API call.');
    }

    console.log('selectedIds', selectedIds);
  };

  const NoResultsComponent = () => {
    if (showEmptyState) {
      return (
        <div
          className={`flex flex-col items-center justify-center gap-5 ${
            isFullScreen ? 'h-[69vh]' : 'h-[60vh]'
          }   mt-[50px] ${
            barcodeScan ? '!h-[62vh]' : '!h-[47vh]'
          } ${'  !mt-[20px]'}`}
        >
          <div className="text-center">
            <Image src={empty} alt="empty" />
            <p className="text-neutral900 w-[220px] mx-auto">
              No matches found for your search.
            </p>
          </div>
        </div>
      );
    } else {
      if (!paginatedData.length && globalFilter.length) {
        return (
          <div
            className={`flex flex-col items-center justify-center gap-5 ${
              isFullScreen ? 'h-[69vh]' : !rows.length ? 'h-[55vh]' : 'h-[60vh]'
            }  `}
          >
            <div className="text-center">
              <Image src={empty} alt="empty" />
              <p className="text-neutral900 text-lMedium w-[220px] mx-auto">
                No matching stones found.
              </p>
            </div>
          </div>
        );
      } else {
        return <></>;
      }
    }
  };
  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns: showEmptyState || !paginatedData.length ? [] : columns,
    data: showEmptyState ? [] : paginatedData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    getRowId: originalRow => originalRow?.id,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      isFullScreen: JSON.parse(localStorage.getItem('isFullScreen')!),
      pagination,
      globalFilter
    },

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
    enableRowSelection: true,
    enableToolbarInternalActions: true,
    globalFilterFn: 'startsWith',
    selectAllMode: 'page',
    renderEmptyRowsFallback: NoResultsComponent,
    manualPagination: showEmptyState || !paginatedData.length ? false : true,
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
      // SortIcon: (props: any) => (
      //   <FontAwesomeIcon icon={faSort} width={8} height={8} {...props} />
      // ), //best practice
      // SyncAltIcon: (props: any) => (
      //   <FontAwesomeIcon
      //     icon={faSort}
      //     {...props}
      //     // width={8} height={8}
      //     style={{ color: 'neutral400' }}
      //     className="transform !rotate-0 !pl-1"
      //   />
      // ),
      // ArrowDownwardIcon: (props: any) => (
      //   <FontAwesomeIcon icon={faSortDown} {...props} width={8} height={8} />
      // )
    },
    // headerSortico
    muiTableBodyRowProps: ({ row }) => {
      return {
        onClick: row.id.includes('shape')
          ? row.getToggleExpandedHandler()
          : row.getToggleSelectedHandler(),

        sx: {
          height: '20px',
          cursor: 'pointer',
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

    // sortDescFirst: false,
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

    muiTableContainerProps: {
      sx: {
        height: isFullScreen ? '70vh' : 'calc(100vh - 300px)',
        minHeight: isFullScreen
          ? barcodeScan
            ? showCalculatedField
              ? 'calc(100vh - 130px)'
              : 'calc(100vh - 90px)'
            : isDashboard
            ? 'calc(100vh - 180px)'
            : 'calc(100vh - 230px)'
          : barcodeScan
          ? showCalculatedField
            ? 'calc(100vh - 212px)'
            : 'calc(100vh - 303px)'
          : 'calc(100vh - 300px)',
        maxHeight: isFullScreen
          ? barcodeScan
            ? showCalculatedField
              ? 'calc(100vh - 130px)'
              : 'calc(100vh - 90px)'
            : isDashboard
            ? 'calc(100vh - 180px)'
            : 'calc(100vh - 230px)'
          : barcodeScan
          ? showCalculatedField
            ? 'calc(100vh - 212px)'
            : 'calc(100vh - 303px)'
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
          borderBottom: '1px solid var(--neutral-50)'
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
            paddingRight: ['shape_full', 'details'].includes(column.id)
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
        {isResult && (
          <div className="flex min-h-[55px] items-center justify-between border-b-[1px] border-neutral200 px-[16px] py-[8px]">
            <div className="flex lg-w-[calc(100%-500px)] gap-[12px] flex-wrap">
              <Breadcrum
                searchParameters={searchParameters}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleCloseSpecificTab={handleCloseSpecificTab}
                setIsLoading={setIsLoading}
                setGlobalFilter={setGlobalFilter}
              />
            </div>
            <div className="pr-[2px] flex gap-[12px] w-[500px]  justify-end flex-wrap relative">
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
                    svg: BinIcon,
                    handler: handleCloseAllTabs,
                    customStyle: 'w-[40px] h-[40px]',
                    tooltip: 'Close all tabs'
                  }
                ]}
                containerStyle="flex gap-[12px]!important"
              />
            </div>
          </div>
        )}
        {showCalculatedField && (
          <CalculatedField rows={rows} selectedProducts={rowSelection} />
        )}
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
              placeholder="Search by Stone ID"
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
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  handleGlobalFilter();
                }
              }}
            />
          </div>

          <div className="flex gap-[12px]" style={{ alignItems: 'inherit' }}>
            {barcodeScan && (
              <Select
                options={options}
                defaultValue={options[0]} // Set default to 'All'
                onChange={handleStateChange}
                value={selectedOption}
                styles={colourStyles()}
              />
            )}

            <div className="flex gap-[12px]">
              {barcodeScan && (
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'secondary',
                      label: 'Delete Row',
                      handler: () => {
                        const selectedIds = Object.keys(rowSelection); // Get the array of selected IDs
                        const updatedRows = rows.filter(
                          (row: any) => !selectedIds.includes(row.id)
                        ); // Filter out selected rows using the selected IDs
                        dataTableSetState.setRows(updatedRows); // Update the state with the filtered rows
                      },
                      isDisable: showEmptyState,
                      customStyle: 'flex-1 h-10'
                    }
                  ]}
                />
              )}
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: 'Space code',
                    handler: () => {
                      handleSpaceCode();
                    },
                    customStyle: 'flex-1 h-10',
                    svg: lightBulb,
                    isDisable: showEmptyState
                  }
                ]}
              />
            </div>

            <div
              className=" rounded-[4px] cursor-pointer"
              onClick={showEmptyState ? () => {} : handleDownloadExcel}
            >
              <Tooltip
                tooltipTrigger={
                  <button
                    disabled={showEmptyState}
                    className={`disabled:!bg-neutral100 disabled:cursor-not-allowed disabled:text-neutral400 rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm ${'bg-neutral0'}`}
                  >
                    <ExportExcel
                      className={`${
                        showEmptyState
                          ? 'stroke-neutral400'
                          : 'stroke-neutral900'
                      }`}
                    />
                  </button>
                }
                tooltipContent={'Download Excel'}
                tooltipContentStyles={'z-[1000]'}
              />
            </div>
            <div
              className=" rounded-[4px] cursor-pointer"
              onClick={
                showEmptyState
                  ? () => {}
                  : () => {
                      console.log('herere i');
                      modalSetState.setIsInputDialogOpen(true);
                    }
              }
            >
              <Tooltip
                tooltipTrigger={
                  <button
                    disabled={showEmptyState}
                    className={`disabled:!bg-neutral100 disabled:cursor-not-allowed disabled:text-neutral400 rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm ${'bg-neutral0'}`}
                  >
                    <ExportEmailViaEmail
                      className={`${
                        showEmptyState
                          ? 'stroke-neutral400'
                          : 'stroke-neutral900'
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

            <div className="flex  rounded-[4px] cursor-pointer">
              {/* <Share
                rows={rows}
                selectedProducts={rowSelection}
                setErrorText={setErrorText}
                setIsError={setIsError}
                shareTrackIdentifier={
                  barcodeScan ? 'Cart' : isDashboard ? 'Dashboard' : 'Search Results'
                }
                dynamicTrackIdentifier={isDashboard && 'dashboardSearchResult'}
                isDisable={showEmptyState}
              /> */}
            </div>
          </div>
        </Box>
      </div>
    ),
    renderBottomToolbar: ({ table }) => {
      if (showEmptyState) {
        return <></>;
      } else {
        return (
          <div
            className={`px-[16px] flex items-center justify-center border-t-[1px] border-neutral200 ${
              isDashboard && 'border-b-[1px]'
            }`}
          >
            <div className="flex items-center justify-center">
              <MRT_TablePagination table={table} />
            </div>
          </div>
        );
      }
    }
  });

  return (
    <>
      {isSkeletonLoading ? (
        <DataTableSkeleton />
      ) : (
        <ThemeProvider theme={theme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      )}
    </>
  );
};

export default DataTable;
