import { Box, Stack } from '@mui/material';
import {
  MRT_ExpandButton,
  MRT_GlobalFilterTextField,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';

import downloadIcon from '@public/v2/assets/icons/data-table/download.svg';
import downloadExcelIcon from '@public/v2/assets/icons/modal/download.svg';
import Image from 'next/image';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';

// theme.js
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { ManageLocales } from '@/utils/v2/translate';

import { useEffect, useState } from 'react';

import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
import Share from '@/components/v2/common/copy-and-share/share';
import ActionButton from '@/components/v2/common/action-button';
import NewArrivalCalculatedField from '../new-arrival-calculated-field';
import Tab from '../tabs';
import { SocketManager, useSocket } from '@/hooks/v2/socket-manager';

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
    }
  }
});

const NewArrivalDataTable = ({
  rows,
  columns,
  setRowSelection,
  rowSelection,
  modalSetState,
  downloadExcel,
  setErrorText,
  setIsError
}: any) => {
  // Fetching saved search data

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const [activeTab, setActiveTab] = useState(0);
  const tabLabels = ['Bid Stone (100)', 'Active Bid (3)', 'Bid History (3)'];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const socketManager = new SocketManager();

  useSocket(socketManager);

  useEffect(() => {
    socketManager.on('bid_stones', data => _handleBidStones(data));
    socketManager.on('error', data => _handleError(data));
    // socketManager.on('bid_placed', data => _handleBidPlaced(data));
    // socketManager.on('bid_canceled', data => _handleBidCanceled(data));
    // socketManager.on('request_get_bid_stones', () =>
    //   socketManager.emit('get_bid_stones')
    // );

    // Cleanup on component unmount
    return () => {
      socketManager.disconnect();
    };
  }, []);

  const _handleBidStones = (data: any) => {
    console.log(data, 'pooooooooooooooooooooooooo');
  };

  const _handleError = (data: any) => {
    // setState with error
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

  const handleDownloadExcel = () => {
    let selectedIds = Object.keys(rowSelection);
    if (selectedIds.length > 0) {
      modalSetState.setIsDialogOpen(true);
      modalSetState.setDialogContent(
        <>
          <div className="absolute left-[-84px] top-[-84px]">
            <Image src={downloadExcelIcon} alt="downloadExcelIcon" />
          </div>
          <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[357px]">
            <h1 className="text-headingS text-neutral900">
              Do you want to download “Selected Stones” or “Entire Search
              Results” ?
            </h1>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.selectedStones'),
                  handler: () => {
                    downloadExcelHandler({
                      products: selectedIds,
                      downloadExcelApi: downloadExcel,
                      modalSetState,
                      setRowSelection
                    });
                  },
                  customStyle: 'flex-1 w-full'
                },
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.entireSearchResult'),
                  handler: () => {
                    const allProductIds = rows.map(({ id }: { id: string }) => {
                      return id;
                    });

                    downloadExcelHandler({
                      products: allProductIds,
                      downloadExcelApi: downloadExcel,
                      modalSetState,
                      setRowSelection
                    });
                  },
                  customStyle: 'flex-1 w-full'
                }
              ]}
            />
          </div>
        </>
      );
    } else {
      const allProductIds = rows.map(({ id }: { id: string }) => {
        return id;
      });

      downloadExcelHandler({
        products: allProductIds,
        downloadExcelApi: downloadExcel,
        modalSetState,
        setRowSelection
      });
    }
  };

  const StyledToggleFullScreenButton = styled(MRT_ToggleFullScreenButton)(
    () => ({
      border: `1px solid #E4E7EC`,
      background: 'var(--neutral-0)',
      padding: '4px',
      width: '35px',
      height: '35px',
      borderRadius: '4px',
      boxShadow: '0px 1px 0px 0px hsla(220, 43%, 11%, 0.12)',
      ':hover': {
        backgroundColor: 'var(--neutral-0) !important'
      }
    })
  );
  const [detailPanelValues, setDetailPanelValues] = useState({});

  // Function to handle input changes in detail panels
  const handleDetailPanelInputChange = (rowId: any, value: any) => {
    setDetailPanelValues(prevValues => ({
      ...prevValues,
      [rowId]: value
    }));
  };
  const DetailPanelInput = ({ value, onChange }: any) => {
    return (
      <input
        // variant="outlined"
        value={value}
        onChange={e => onChange(e.target.value)}
        // sx={{ margin: '8px' }} // Add some margin for visual separation
      />
    );
  };

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: rows, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    //state
    getRowId: originalRow => originalRow.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    //filters
    positionToolbarAlertBanner: 'none',
    enableFilters: true,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableStickyHeader: true,
    enableBottomToolbar: false,
    enableGrouping: true,
    enableExpandAll: false,
    enableColumnDragging: false,
    groupedColumnMode: 'remove',
    enableRowSelection: true,
    enableToolbarInternalActions: true,
    globalFilterFn: 'startsWith',
    selectAllMode: 'page',
    // enableExpanding: true,

    icons: {
      SearchIcon: () => (
        <Image src={searchIcon} alt={'searchIcon'} className="mr-[6px]" />
      )
    },

    // selectAllMode: undefined,

    muiTableBodyRowProps: ({ row }) => {
      return {
        onClick: row.id.includes('shape')
          ? row.getToggleExpandedHandler()
          : row.getToggleSelectedHandler(),
        sx: {
          cursor: 'pointer',
          '&.MuiTableRow-root:hover .MuiTableCell-root::after': {
            backgroundColor: 'var(--neutral-50)'
          },
          '&.MuiTableRow-root .MuiTableCell-root::after': {
            backgroundColor: 'var(--neutral-25)'
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
                border: 'none'
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
      }
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
        minHeight: isFullScreen ? 'calc(100vh - 200px)' : 'calc(100vh - 399px)',
        maxHeight: isFullScreen ? 'calc(100vh - 200px)' : 'calc(100vh - 399px)'
      }
    },
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: 'var(--neutral-50)',
        boxShadow: 'none'
      }
    },
    // muiTableBodyCellProps: ({ cell }) => {
    muiTableBodyCellProps: ({ cell }) => {
      return {
        sx: {
          color: 'var(--neutral-900)',
          '&.MuiTableCell-root': {
            padding: '4px 8px',
            background: 'White',
            opacity: 1,
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
                cell.id === 'shape:RMB_lot_id') &&
              'none'
          },
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
        borderRadius: '8px 8px 0px 0px',
        border: 'none'
      }
    },
    renderTopToolbar: ({ table }) => (
      <div>
      <div>
  
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px'
          }}
        >
          <div className='w-[450px]'>
          <Tab
            labels={tabLabels}
            activeIndex={activeTab}
            onTabClick={handleTabClick}
          />
            {/* <StylesSearchBar table={table} autoComplete="false" /> */}
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
              className="p-[4px] rounded-[4px] cursor-pointer"
              onClick={handleDownloadExcel}
            >
              <Image
                src={downloadIcon}
                alt={'download'}
                width={38}
                height={38}
              />
            </div>

            <div onClick={toggleFullScreen}>
              <StyledToggleFullScreenButton table={table} />{' '}
            </div>

            <div className="flex p-[4px] rounded-[4px] cursor-pointer">
              <Share
                rows={rows}
                selectedProducts={rowSelection}
                setErrorText={setErrorText}
                setIsError={setIsError}
              />
            </div>
          </div>
        </Box>
        </div>
        <NewArrivalCalculatedField
          rows={rows}
          selectedProducts={rowSelection}
        />
      </div>
    ),
    renderDetailPanel: ({ row }) => {
      return (
        <div>hee</div>
        //   <DetailPanelInput
        //     value={detailPanelValues![row.id] || ''}
        //     onChange={(value:any) => handleDetailPanelInputChange(row.id, value)}
        //   />
      );
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export default NewArrivalDataTable;
