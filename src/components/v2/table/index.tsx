import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_RowData,
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';
// theme.js
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from 'next/image';
import { ManageLocales } from '@/utils/v2/translate';
import { kycStatus } from '@/constants/enums/kyc';

interface ITable {
  rows: MRT_ColumnDef<MRT_RowData, any>[];
  columns: MRT_ColumnDef<MRT_RowData, any>[];
  setRowSelection?: any;
  rowSelection?: any;
  isRowSelectionNeeded?: boolean;
  isEnableTopToolBar?: boolean;
  showGloablFilter?: boolean;
  goBackToListView?: () => void;
  breadCrumLabel?: string;
  isOrderDetail?: boolean;
  identifier?: string;
  isMatchingPair?: boolean;
}

const Table = ({
  rows,
  columns,
  setRowSelection,
  rowSelection,
  isRowSelectionNeeded = true,
  isEnableTopToolBar = false,
  showGloablFilter = false,
  goBackToListView,
  breadCrumLabel,
  isOrderDetail = false,
  identifier,
  isMatchingPair = false
}: ITable) => {
  // Fetching saved search data

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
      MuiButtonBase: {
        defaultProps: {
          // The props to apply
          disableRipple: true // No more ripple, on the whole application 💣!
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
      }
    }
  });

  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: rows, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    getRowId: originalRow => originalRow?.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    positionToolbarAlertBanner: 'none',
    enableFilters: showGloablFilter,
    enableColumnActions: false,
    enableSorting: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableStickyHeader: true,
    enableBottomToolbar: false,
    enableTopToolbar: isEnableTopToolBar,
    enableRowSelection: isRowSelectionNeeded,
    enableToolbarInternalActions: false,

    icons: {
      SearchIcon: () => (
        <Image src={searchIcon} alt={'searchIcon'} className="mr-[6px]" />
      )
    },
    muiTablePaperProps: {
      elevation: 0, //change the mui box shadow

      sx: {
        borderRadius: '8px 8px 0px 0px ',
        border: 'none'
      }
    },
    displayColumnDefOptions: {
      'mrt-row-select': {
        size: 40,
        minSize: 40,
        maxSize: 40
      }
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: row.getToggleSelectedHandler(),
      sx: {
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
    }),

    initialState: {
      showGlobalFilter: showGloablFilter,
      columnPinning: {
        left: ['mrt-row-select', 'lot_id']
      }
    },

    muiTableContainerProps: {
      sx: {
        minHeight:
          isNudge &&
          (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
            isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
            ? isOrderDetail
              ? 'calc(100vh - 550px)'
              : 'calc(100vh - 315px)'
            : isOrderDetail
            ? 'calc(100vh - 390px)'
            : identifier === 'result'
            ? 'calc(100vh - 240px)'
            : identifier === 'Dashboard'
            ? 'calc(100vh - 220px)'
            : identifier === 'myCart'
            ? 'calc(100vh - 266px)'
            : isMatchingPair
            ? 'calc(100vh - 240px)'
            : identifier === 'Event'
            ? 'calc(100vh - 200px)'
            : 'calc(100vh - 310px)',
        maxHeight:
          isNudge &&
          (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
            isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
            ? isOrderDetail
              ? 'calc(100vh - 550px)'
              : 'calc(100vh - 315px)'
            : isOrderDetail
            ? 'calc(100vh - 390px)'
            : identifier === 'result'
            ? 'calc(100vh - 240px)'
            : identifier === 'Dashboard'
            ? 'calc(100vh - 220px)'
            : identifier === 'Event'
            ? 'calc(100vh - 200px)'
            : 'calc(100vh - 310px)'
      }
    },
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: 'var(--neutral-50)',
        boxShadow: 'none'
      }
    },
    muiTableBodyCellProps: ({ row }) => {
      return {
        sx: {
          color: 'var(--neutral-900)',
          '&.MuiTableCell-root': {
            padding: '0px 4px'
          },
          whiteSpace: 'nowrap',
          borderBottom: '1px solid var(--neutral-50)',
          fontSize: '12px !important',
          fontWeight: rowSelection[row.id] ? 500 : 400
        }
      };
    },
    muiTableHeadCellProps: () => {
      return {
        sx: {
          color: 'var(--neutral-700)',
          '&.MuiTableCell-root': {
            background: 'var(--neutral-50)',
            opacity: 1,
            borderTop: '1px solid var(--neutral-200)',
            padding: '0px 4px',
            height: '20px',
            fontSize: '12px !important',
            fontWeight: 500
            // textAlign:column.id==='girdle_percentage' ? 'center !important':'left',
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

    renderTopToolbar: ({ table }) => (
      <div>
        {isEnableTopToolBar && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px'
            }}
          >
            <div className="flex items-center">
              <Image
                src={backWardArrow}
                alt="backWardArrow"
                onClick={() => {
                  goBackToListView!();
                }}
                className="cursor-pointer"
              />
              <div className="flex gap-[8px] items-center">
                <button
                  className="text-neutral600 text-sMedium font-regular cursor-pointer"
                  onClick={() => {
                    goBackToListView!();
                  }}
                >
                  {breadCrumLabel}
                </button>
                <span className="text-neutral600">/</span>
                <p className="text-neutral700 p-[8px] bg-neutral100 rounded-[4px] text-sMedium font-medium">
                  {ManageLocales('app.confirmStone')}
                </p>
              </div>
            </div>
            <div>
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
            </div>
          </Box>
        )}
      </div>
    )
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export default Table;
