import { Box, Stack } from '@mui/material';
import {
  MRT_ExpandButton,
  MRT_GlobalFilterTextField,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import expandIcon from '@public/v2/assets/icons/expand-icon.svg';
import collapsIcon from '@public/v2/assets/icons/collapse-icon.svg';
import downloadIcon from '@public/v2/assets/icons/data-table/download.svg';
import Image from 'next/image';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';

// theme.js
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useEffect, useState } from 'react';
import DisableDecrementIcon from '@public/v2/assets/icons/new-arrivals/disable-decrement.svg?url';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
import Share from '@/components/v2/common/copy-and-share/share';
import ActionButton from '@/components/v2/common/action-button';
import Bid2BuyCalculatedField from '../bid-2-buy-calculated-field';
import Tab from '../tabs';
import { InputField } from '@/components/v2/common/input-field';
import DecrementIcon from '@public/v2/assets/icons/new-arrivals/decrement.svg?url';
import IncrementIcon from '@public/v2/assets/icons/new-arrivals/increment.svg?url';
import empty from '@public/v2/assets/icons/data-table/empty-bid-to-buy.svg';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { RenderNewArrivalLotIdColor } from '@/components/v2/common/data-table/helpers/render-cell';
import Tooltip from '@/components/v2/common/tooltip';
import { kycStatus } from '@/constants/enums/kyc';
import { formatNumber } from '@/utils/fix-two-digit-number';

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
            visibility: 'hidden'
          },
          // Hover state for the cell
          '&:hover .MuiBadge-root': {
            visibility: 'visible'
          },
          '&.Mui-TableBodyCell-DetailPanel': {
            borderBottom: 'none' // Customize the border as needed
          }
        }
        // '&:hover':{
        //   background:"red !important"
        // }
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
    }
  }
});

interface BidValues {
  [key: string]: number;
}
const BidToByDataTable = ({
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
  renderFooter
}: any) => {
  // Fetching saved search data

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [bidError, setBidError] = useState('');

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
      [activeTab === 2 ? 'fromBid2BuyHistory' : 'fromBid2Buy']: true
    });
  };

  const [bidValues, setBidValues] = useState<BidValues>({});
  const [columnOrder, setColumnOrder] = useState(
    [
      'mrt-row-select',
      'lot_id',
      'last_bid_date',
      ...columns.map((c: any) => c.accessorKey)
    ] //array of column ids (Initializing is optional as of v2.10.0)
  );

  const handleIncrement = (rowId: string, currentMaxBid: any) => {
    // Retrieve the discount for the row from the rows data
    setBidError('');
    setBidValues(prevValues => {
      const currentBidValue = prevValues[rowId];
      // If there's already a bid value for this row, increment it
      if (currentBidValue !== undefined) {
        return {
          ...prevValues,
          [rowId]: Number(currentBidValue) + 0.5
        };
      }
      // If no bid value for this row yet, start from discount and add 0.5
      else {
        return {
          ...prevValues,
          [rowId]: Number(currentMaxBid) + 0.5
        };
      }
    });
  };

  const handleDecrement = (rowId: string, currentMaxBid: any) => {
    setBidValues(prevValues => {
      const currentBidValue = prevValues[rowId];
      // Calculate the new bid value
      const newBidValue =
        currentBidValue !== undefined
          ? Number(currentBidValue) - 0.5
          : Number(currentMaxBid) - 0.5;

      // Check if the new bid value is less than or equal to currentMaxBid
      if (newBidValue >= currentMaxBid) {
        setBidError('');
        // Update the bid value
        return {
          ...prevValues,
          [rowId]: newBidValue
        };
      } else {
        // Set error because attempting to decrement below currentMaxBid
        setBidError('Bid value cannot be less than maximum discount.');
        return prevValues; // Return previous values without modification
      }
    });
  };

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
            <MRT_GlobalFilterTextField
              table={table}
              autoComplete="false"
              sx={{
                boxShadow: 'var(--input-shadow) inset',
                border: 'none',
                borderRadius: '4px',
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
            />
            <div
              className=" rounded-[4px] cursor-pointer"
              onClick={handleDownloadExcel}
            >
              <Tooltip
                tooltipTrigger={
                  <Image
                    src={downloadIcon}
                    alt={'download'}
                    width={38}
                    height={38}
                  />
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
                      <Image
                        src={collapsIcon}
                        alt={'collapsIcon'}
                        width={39}
                        height={39}
                      />
                    ) : (
                      <Image
                        src={expandIcon}
                        alt={'expandIcon'}
                        width={39}
                        height={39}
                      />
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
                isNewArrival={true}
                activeTab={activeTab}
              />
            </div>
          </div>
        </Box>
      </div>

      {rows.length > 0 && activeTab !== 2 && (
        <Bid2BuyCalculatedField rows={rows} selectedProducts={rowSelection} />
      )}
    </div>
  );
  const renderBottomToolbar = ({ table }: any) => renderFooter(table);
  const NoResultsComponent = () => (
    <div className="flex flex-col items-center justify-center gap-5 h-[60vh] mt-[50px]">
      {(activeTab === 1 && activeCount === 0) ||
      (activeTab === 0 && bidCount === 0) ||
      (activeTab === 2 && historyCount === 0) ? (
        <>
          <Image src={empty} alt={'empty'} />
          <p className="text-neutral900  w-[320px] text-center ">
            Every month we provide an extra discount on a few stones which you
            can bid to buy. Stay tuned.
          </p>
        </>
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
    data: rows, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    //state
    getRowId: originalRow => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { columnOrder, rowSelection, isFullScreen: isFullScreen },
    //filters

    positionToolbarAlertBanner: 'none',
    enableFilters: true,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    enablePagination: true,
    enableStickyHeader: true,
    // enableBottomToolbar: false,
    // enableRowVirtualization:true,
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
    // renderFallbackComponent: NoResultsComponent,
    // enableExpanding: true,

    icons: {
      SearchIcon: () => (
        <Image src={searchIcon} alt={'searchIcon'} className="mr-[6px]" />
      )
    },

    // selectAllMode: undefined,

    muiTableBodyRowProps: ({ row }) => {
      // const isHighlightBackground =
      //   activeTab !== 0 && RenderNewArrivalLotIdColor({ row });

      return {
        onClick: row.id.includes('shape')
          ? row.getToggleExpandedHandler()
          : row.getToggleSelectedHandler(),
        sx: {
          cursor: 'pointer',
          // '&.MuiTableRow-root:hover .MuiTableCell-root::after': {
          //   backgroundColor: isHighlightBackground
          //     ? isHighlightBackground.background
          //     : 'var(--neutral-50)'
          //     // backgroundColor: 'var(--neutral-50)'
          // },
          '&.MuiTableRow-root': {
            // Define styles for the ::after pseudo-element of each cell within a hovered row
            '& .MuiTableCell-root::after': {
              // Maintain the default background color for non-lot_id columns
              backgroundColor: 'var(--neutral-50) !important'
            },
            // Target the specific cell that matches the lot_id column within a hovered row
            '& .MuiTableCell-root[data-index="1"]::after': {
              // Change the background color to red if isHighlightBackground is true, otherwise maintain the default hover color
              // backgroundColor: isHighlightBackground
              //   ? `${isHighlightBackground.background} !important`
              //   : 'var(--neutral-50)'
              backgroundColor: 'var(--neutral-50)'
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
        size: 110,

        muiTableHeadCellProps: {
          sx: {
            display: 'none',
            whiteSpace: 'nowrap'
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
            <div className="flex items-center">
              <MRT_ExpandButton row={row} table={table} />
              <Stack>
                {getShapeDisplayName({ value: row.original.shape })}
              </Stack>
            </div>
          );
        }
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
      pagination: { pageSize: 20, pageIndex: 0 }
    },

    // renderEmptyRowsFallback: () => {
    //   return <>no result</>;
    // },
    positionGlobalFilter: 'left',
    //styling

    muiTableContainerProps: {
      sx: {
        // minHeight: 'calc(100vh - 399px)',
        // maxHeight: 'calc(100vh - 399px)'
        height: isFullScreen ? '70vh' : 'calc(100vh - 399px)',
        minHeight: isFullScreen
          ? activeTab === 2
            ? 'calc(100vh - 125px)'
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
          : 'calc(100vh - 295px)',
        maxHeight: isFullScreen
          ? activeTab === 2
            ? 'calc(100vh - 125px)'
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
          : 'calc(100vh - 295px)'
      }
    },
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: 'var(--neutral-50)',
        boxShadow: 'none'
      }
    },
    // muiTableBodyCellProps: ({ cell }) => {
    muiTableBodyCellProps: ({ cell, row }) => {
      // const isHighlightBackground =
      //   activeTab !== 0 &&
      //   cell.column.id === 'lot_id' &&
      //   RenderNewArrivalLotIdColor({ row });
      return {
        sx: {
          color: 'var(--neutral-900)',
          '&.MuiTableCell-root': {
            padding: '4px 8px',
            // background: isHighlightBackground
            //   ? `${isHighlightBackground.background} !important `
            //   : 'White',
            background: 'White',
            // color: isHighlightBackground && isHighlightBackground.text,
            opacity: 1,
            // '&:hover': {
            //   background: isHighlightBackground
            //     ? isHighlightBackground.background
            //     : 'White'
            // },
            '&:hover': {
              background: 'White'
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

    muiTableHeadCellProps: () => {
      return {
        sx: {
          color: 'var(--neutral-700)',
          '&.MuiTableCell-root': {
            padding: '4px 8px',
            background: 'var(--neutral-50)',
            opacity: 1,
            borderTop: '1px solid var(--neutral-200)'
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
          // fill: 'var(--neutral-200)'
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
    // muiTableBodyProps: rows?.length === 0 ? { style: { display: 'none' } } : {},
    muiTableHeadProps: rows?.length === 0 ? { style: { display: 'none' } } : {},

    renderDetailPanel: ({ row }) => {
      // Check if the current row's ID is in the rowSelection state
      if (activeTab !== 2 && rowSelection[row.id]) {
        const bidValue =
          bidValues[row.id] !== undefined
            ? bidValues[row.id]
            : row.original.discount;

        // If the row is selected, return the detail panel content
        return (
          <div>
            <div
              className="flex gap-6"
              onClick={event => event.stopPropagation()}
            >
              {/* <div className="w-[120px] ml-10">
                <div className="text-mRegular text-neutral700">
                  Current Max Bid%
                </div>

                <InputField
                  // label={'Current Max Bid%'}
                  type="text"
                  styles={{
                    inputMain: 'h-[40px]',
                    input: '!bg-infoSurface !border-infoBorder !text-infoMain'
                  }}
                  value={`${row.original.discount}%`}
                  disabled
                />
              </div> */}
              <div className="w-[120px] ml-10">
                <div className="!text-mRegular !text-neutral500">Bid Pr/Ct</div>

                <InputField
                  // label={'Bid Pr/Ct'}
                  type="text"
                  value={
                    bidValues[row.id] !== undefined
                      ? formatNumber(
                          row.original.rap * (1 + bidValues[row.id] / 100)
                        )
                      : formatNumber(row.original.price_per_carat)
                  }
                  styles={{
                    inputMain: 'h-[40px]',
                    input: '!bg-neutral100 !border-neutral200 !text-neutral700'
                  }}
                  disabled
                />
              </div>
              <div className="w-[120px]">
                <div className="!text-mRegular !text-neutral700">Bid Amt $</div>

                <InputField
                  // label={'Bid Amt $'}
                  type="text"
                  styles={{
                    inputMain: 'h-[40px]',
                    input: '!bg-neutral100 !border-neutral200 !text-neutral700'
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
                <div className="text-mRegular text-neutral700">Bid Disc%</div>
                <div className="gap-6 flex">
                  <div className="h-[40px] flex gap-1">
                    {bidValue <= row.original.discount ? (
                      <DisableDecrementIcon />
                    ) : (
                      <div
                        onClick={() =>
                          handleDecrement(row.id, row.original.discount)
                        }
                      >
                        <DecrementIcon />
                      </div>
                    )}

                    <div className="w-[120px]">
                      <InputField
                        // label={'Bid Amt $'}
                        type="number"
                        styles={{ inputMain: 'h-[64px]' }}
                        value={
                          bidValue
                          // row.original.my_current_bid ??
                          // row.original.discount - 0.5
                        }
                        onChange={e => {
                          setBidError('');
                          setBidValues((prevValues: any) => {
                            // If there's already a bid value for this row, increment it
                            return {
                              ...prevValues,
                              [row.id]: e.target.value
                            };

                            // If no bid value for this row yet, start from discount and add 0.5
                          });
                        }}
                      />
                    </div>
                    <div
                      onClick={() =>
                        handleIncrement(row.id, row.original.discount)
                      }
                    >
                      <IncrementIcon />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <ActionButton
                      actionButtonData={[
                        {
                          variant: 'primary',
                          label: activeTab === 0 ? 'Add Bid' : 'Update Bid',
                          handler: () => {
                            if (!bidError) {
                              if (bidValue < row.original.discount) {
                                setBidError(
                                  'Bid value cannot be less than maximum discount.'
                                );
                                return; // Exit early, do not update bidValues
                              }
                              socketManager.emit('place_bidtobuy', {
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
                          customStyle: 'flex-1 w-full h-10'
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

export default BidToByDataTable;
