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
import crossIcon from '@public/v2/assets/icons/new-arrivals/cross-icon.svg';
import Image from 'next/image';
import DisableDecrementIcon from '@public/v2/assets/icons/new-arrivals/disable-decrement.svg?url';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';
import { faSort, faSortDown } from '@fortawesome/free-solid-svg-icons';
// theme.js
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FilterIcon from '@public/v2/assets/icons/new-arrivals/filter-icon.svg?url';
import { useEffect, useState } from 'react';

import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
import Share from '@/components/v2/common/copy-and-share/share';
import ActionButton from '@/components/v2/common/action-button';
import NewArrivalCalculatedField from '../new-arrival-calculated-field';
import Tab from '@components/v2/common/bid-tabs/index';
import { InputField } from '@/components/v2/common/input-field';
import DecrementIcon from '@public/v2/assets/icons/new-arrivals/decrement.svg?url';
import IncrementIcon from '@public/v2/assets/icons/new-arrivals/increment.svg?url';
import empty from '@public/v2/assets/icons/data-table/empty-new-arrivals.svg';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { RenderNewArrivalLotIdColor } from '@/components/v2/common/data-table/helpers/render-cell';
import Tooltip from '@/components/v2/common/tooltip';
import { kycStatus } from '@/constants/enums/kyc';
import { formatNumber } from '@/utils/fix-two-digit-number';
import { handleIncrementDiscount } from '@/utils/v2/handle-increment-discount';
import { handleDecrementDiscount } from '@/utils/v2/handle-decrement-discount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ManageLocales } from '@/utils/v2/translate';
import { SubRoutes } from '@/constants/v2/enums/routes';
import { filterFunction } from '@/features/filter-new-arrival/filter-new-arrival-slice';

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
          // Default state for the badge inside the cell
          '& .MuiBadge-root': {
            visibility: 'hidden',
            width: '15px !important',
            marginLeft: '-3px'
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
    }
  }
});

interface IBidValues {
  [key: string]: number;
}
const NewArrivalDataTable = ({
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
  socketManager,
  rowSelection,
  setRowSelection,
  setIsLoading,
  renderFooter,
  router,
  filterData,
  setBid,
  dispatch
}: any) => {
  // Fetching saved search data

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [bidError, setBidError] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20 //customize the default page size
  });

  const [paginatedData, setPaginatedData] = useState<any>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  useEffect(() => {
    if (globalFilter !== '') {
      let data = rows.filter(
        (data: any) => data?.lot_id?.startsWith(globalFilter)
      );
      const startIndex = pagination.pageIndex * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      // Slice the data to get the current page's data
      const newData = data.slice(startIndex, endIndex);
      // Update the paginated data state
      setPaginatedData(newData);
    } else {
      setPaginatedData(rows);
    }
  }, [globalFilter]);
  useEffect(() => {
    if (activeTab !== 2) {
      // Calculate the start and end indices for the current page
      const startIndex = pagination.pageIndex * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      // Slice the data to get the current page's data
      const newData = rows.slice(startIndex, endIndex);
      // Update the paginated data state
      setPaginatedData(newData);
    } else {
      setPaginatedData(rows);
    }
  }, [
    rows,
    pagination.pageIndex, //re-fetch when page index changes
    pagination.pageSize, //re-fetch when page size changes
    activeTab
  ]);
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
      router,
      setIsLoading: setIsLoading,
      [activeTab === 2 ? 'fromNewArrivalBidHistory' : 'fromNewArrivalBid']: true
    });
  };

  const [bidValues, setBidValues] = useState<IBidValues>({});
  const [columnOrder] = useState(
    [
      'mrt-row-select',
      'lot_id',
      'last_bid_date',
      ...columns.map((c: any) => c.accessorKey)
    ] //array of column ids (Initializing is optional as of v2.10.0)
  );

  const renderTopToolbar = ({ table }: any) => (
    <div>
      <div
        className={` border-neutral200 ${
          (activeTab !== 2 || (activeTab === 2 && historyCount === 0)) &&
          'border-b-[1px]'
        }`}
      >
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
              onTabClick={handleTabClick}
              activeCount={activeCount}
              bidCount={bidCount}
              historyCount={historyCount}
            />
          </div>

          <div className="flex gap-[12px]" style={{ alignItems: 'inherit' }}>
            {activeTab === 0 && (
              <div className="">
                {filterData?.bidFilterData?.length > 0 ? (
                  <button
                    onClick={() => {
                      router.push(
                        `/v2/new-arrivals?active-tab=${SubRoutes.NEW_ARRIVAL}`
                      );
                    }}
                    className={`flex w-full  shadow-sm justify-center py-[8px] h-[39px] px-[16px]  items-center font-medium  rounded-[4px] gap-1  border-[1px]  border-solid border-neutral200 text-mMedium  cursor-pointer  ${'bg-primaryMain text-neutral0 hover:bg-primaryHover'}`}
                  >
                    <FilterIcon stroke={`${'var(--neutral-0)'}`} />

                    <p className="w-[60%]">
                      {ManageLocales('app.modifyFilter')}
                    </p>
                    <div
                      className="w-[17%] cursor-pointer"
                      onClick={e => {
                        e.stopPropagation();
                        setBid(filterData.bidData);
                        dispatch(filterFunction({}));
                      }}
                    >
                      <Image src={crossIcon} alt="crossIcon" />
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      dispatch(
                        filterFunction({
                          bidData: rows
                        })
                      );
                      router.push(
                        `/v2/new-arrivals?active-tab=${SubRoutes.NEW_ARRIVAL}`
                      );
                    }}
                    className={`flex justify-center  shadow-sm py-[8px] h-[39px] px-[16px] items-center font-medium  rounded-[4px] gap-1  border-[1px]  border-solid border-neutral200 text-mMedium  cursor-pointer  ${'text-neutral900 bg-neutral0 hover:bg-neutral50'}`}
                  >
                    <FilterIcon stroke={`${'var(--neutral-900)'}`} />

                    <p>{ManageLocales('app.applyFilter')}</p>
                  </button>
                )}
              </div>
            )}

            <MRT_GlobalFilterTextField
              table={table}
              autoComplete="false"
              className="max-[1092px]:w-[110px]   max-[1160px]:w-[180px] max-xl:w-auto"
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
            <div
              className=" rounded-[4px] cursor-pointer"
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

            <div className="flex rounded-[4px] cursor-pointer">
              <Share
                rows={rows}
                selectedProducts={rowSelection}
                setErrorText={setErrorText}
                setIsError={setIsError}
                identifier={'New Arrival'}
                activeTab={activeTab}
                shareTrackIdentifier={'New Arrival'}
              />
            </div>
          </div>
        </Box>
      </div>

      {rows.length > 0 && activeTab !== 2 && (
        <NewArrivalCalculatedField
          rows={rows}
          selectedProducts={rowSelection}
        />
      )}
    </div>
  );
  const renderBottomToolbar = ({ table }: any) => renderFooter(table);
  const NoResultsComponent = () => (
    <div
      className={`flex flex-col items-center justify-center gap-5 ${
        isFullScreen ? 'h-[69vh]' : !rows.length ? 'h-[55vh]' : 'h-[60vh]'
      }  mt-[50px]`}
    >
      {(activeTab === 1 && activeCount === 0) ||
      (activeTab === 0 && bidCount === 0) ||
      (activeTab === 2 && historyCount === 0) ||
      rows.length === 0 ? (
        <>
          <Image src={empty} alt={'empty'} />
          <p className="text-neutral900  w-[320px] text-center ">
            Our diamond collection awaits new arrivals. Stay tuned for dazzling
            additions soon.
          </p>
        </>
      ) : rows.length ? (
        ''
      ) : (
        <CustomKGKLoader />
      )}
    </div>
  );
  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: paginatedData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    getRowId: originalRow => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: {
      columnOrder,
      rowSelection,
      isFullScreen: isFullScreen,
      pagination,
      globalFilter
    },
    positionToolbarAlertBanner: 'none',
    // enableFilters: true,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    enableStickyHeader: true,
    enableGrouping: true,
    enableExpandAll: false,
    enableColumnDragging: false,
    groupedColumnMode: 'remove',
    enableRowSelection: true,
    enableToolbarInternalActions: true,
    globalFilterFn: 'startsWith',
    selectAllMode: 'page',
    renderTopToolbar,
    renderBottomToolbar,
    renderEmptyRowsFallback: NoResultsComponent,
    manualPagination: true,
    rowCount: rows.length,
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    manualFiltering: true,
    onGlobalFilterChange: setGlobalFilter,
    // enableFilterMatchHighlighting:true,
    icons: {
      SearchIcon: () => (
        <Image src={searchIcon} alt={'searchIcon'} className="mr-[6px]" />
      ),
      ArrowDownwardIcon: (props: any) => (
        <FontAwesomeIcon icon={faSortDown} {...props} width={8} height={8} />
      ),

      SyncAltIcon: (props: any) => (
        <FontAwesomeIcon
          icon={faSort}
          {...props}
          style={{ color: 'var(--neutral-400)' }}
          className="transform !rotate-0 !pl-1"
        />
      ),

      SortIcon: (props: any) => (
        <FontAwesomeIcon icon={faSort} width={8} height={8} {...props} />
      )
    },

    muiTableBodyRowProps: ({ row }) => {
      const isHighlightBackground =
        activeTab !== 0 && RenderNewArrivalLotIdColor({ row });

      return {
        onClick: row.id.includes('shape')
          ? row.getToggleExpandedHandler()
          : row.getToggleSelectedHandler(),
        sx: {
          cursor: 'pointer',
          // height: '20px',
          '&.MuiTableRow-root': {
            // Define styles for the ::after pseudo-element of each cell within a hovered row
            '& .MuiTableCell-root::after': {
              // Maintain the default background color for non-lot_id columns
              backgroundColor: 'var(--neutral-50) !important'
            },
            // Target the specific cell that matches the lot_id column within a hovered row
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
        // muitablerow
        muiTableBodyCellProps: ({ cell }) => {
          return {
            sx: {
              display: !cell.id.includes('shape') ? 'none' : 'flex',
              // marginLeft:!cell.id.includes('shape') && '-12px',
              borderBottom: '1px solid var(--neutral-50)',
              padding: '0px',
              // padding: ['discount', 'price_per_carat', 'rap'].includes(
              //   cell.column.id
              // )
              //   ? '0px 6px'
              //   : '0px 2px',
              // height: '20px !important',
              // fontSize: '12px !important',
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
      // globalFilter,
      showGlobalFilter: true,
      expanded: true,
      grouping: ['shape'],
      columnPinning: {
        left: ['mrt-row-select', 'lot_id', 'mrt-row-expand']
      },
      pagination: pagination
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
        activeTab !== 0 &&
        cell.column.id === 'lot_id' &&
        RenderNewArrivalLotIdColor({ row });
      return {
        sx: {
          color: 'var(--neutral-900)',
          '&.MuiTableCell-root': {
            padding: ['discount', 'price_per_carat', 'rap', 'amount'].includes(
              cell.column.id
            )
              ? '0px 6px'
              : '0px 2px',
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
              : '0px 2px',
            height: '20px',
            background: 'var(--neutral-50)',
            opacity: 1,
            borderTop: '1px solid var(--neutral-200)',
            fontSize: '12px !important',
            fontWeight: 500,
            textAlign:
              column.id === 'girdle_percentage' ? 'center !important' : 'left',
            paddingRight: ['shape_full', 'location', 'details', 'lab'].includes(
              column.id
            )
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
          fontSize: '26px !important'
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
          fontSize: '26px !important',
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
        !(
          isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED
        )
      ) {
        const bidValue =
          bidValues[row.id] !== undefined
            ? bidValues[row.id]
            : row.original.current_max_bid;

        // If the row is selected, return the detail panel content
        return (
          <div>
            <div
              className="flex gap-6"
              onClick={event => event.stopPropagation()}
            >
              <div className="w-[110px] ml-7">
                <div className="text-sRegular text-neutral700">
                  Current Max Bid%
                </div>

                <InputField
                  type="text"
                  styles={{
                    inputMain: 'h-[30px]',
                    input:
                      '!bg-infoSurface !border-infoBorder !text-infoMain !h-[30px]  text-sMedium'
                  }}
                  value={`${formatNumber(row.original.current_max_bid)}%`}
                  disabled
                />
              </div>
              <div className="w-[110px]">
                <div className="text-sRegular text-neutral700">Bid Pr/Ct</div>

                <InputField
                  type="text"
                  value={
                    bidValues[row.id] !== undefined
                      ? formatNumber(
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
                    inputMain: '!h-[30px]  text-sMedium',
                    input:
                      '!bg-neutral100 !border-neutral200 !text-neutral700 !h-[30px]  text-sMedium'
                  }}
                  value={
                    bidValues[row.id] !== undefined
                      ? formatNumber(
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
                    {bidValue <= row.original.current_max_bid ? (
                      <div className="cursor-not-allowed">
                        <DisableDecrementIcon />
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          handleDecrementDiscount(
                            row.id,
                            row.original.current_max_bid,
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
                        value={formatNumber(bidValue)}
                        onChange={e => {
                          const newValue = e.target.value;
                          if (newValue < row.original.current_max_bid) {
                            setBidError(
                              'Bid value cannot be less than current maximum bid.'
                            );
                            setBidValues((prevValues: any) => {
                              // If there's already a bid value for this row, increment it
                              return {
                                ...prevValues,
                                [row.id]: newValue
                              };
                            });
                          } else {
                            setBidError('');
                            setBidValues((prevValues: any) => {
                              // If there's already a bid value for this row, increment it
                              return {
                                ...prevValues,
                                [row.id]: newValue
                              };
                            });
                          }
                        }}
                        // onChange={e => {
                        //   setBidValues((prevValues: any) => {
                        //     // If there's already a bid value for this row, increment it
                        //     return {
                        //       ...prevValues,
                        //       [row.id]: e.target.value
                        //     };

                        //     // If no bid value for this row yet, start from current_max_bid and add 0.5
                        //   });
                        // }}
                      />
                    </div>
                    <div
                      onClick={() =>
                        handleIncrementDiscount(
                          row.id,
                          row.original.current_max_bid,
                          setBidError,
                          setBidValues
                        )
                      }
                    >
                      <IncrementIcon />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <ActionButton
                      actionButtonData={[
                        {
                          variant:
                            bidValue <= row.original.current_max_bid
                              ? 'disable'
                              : 'primary',

                          label: activeTab === 0 ? 'Add Bid' : 'Update Bid',
                          handler: () => {
                            if (!bidError) {
                              if (bidValue < row.original.current_max_bid) {
                                setBidError(
                                  'Bid value cannot be less than current maximum bid.'
                                );
                                return; // Exit early, do not update bidValues
                              }

                              socketManager.emit('place_bid', {
                                product_id: row.id,
                                bid_value: bidValues[row.id]
                              });

                              activeTab === 0 &&
                                setRowSelection((prev: any) => {
                                  let prevRows = { ...prev };
                                  delete prevRows[row.id];
                                  return prevRows;
                                });
                              setBidError('');
                            }
                          },
                          isDisable: bidValue <= row.original.current_max_bid,
                          customStyle: 'flex-1 w-full h-[30px] text-sMedium',
                          customCtaStyle: '!h-[30px] !text-[12px]'
                        }
                      ]}
                    />
                  </div>
                </div>
                <div className=" text-dangerMain text-sRegular">{bidError}</div>
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
    <ThemeProvider theme={theme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export default NewArrivalDataTable;
