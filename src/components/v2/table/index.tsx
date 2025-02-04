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
import { useEffect, useState } from 'react';
import {
  clarity,
  fluorescenceSortOrder,
  sideBlackSortOrder,
  tableBlackSortOrder,
  tableInclusionSortOrder
} from '@/constants/v2/form';

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
  setSorting?: any;
  sorting?: any;
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
  isMatchingPair = false,
  setSorting,
  sorting
}: ITable) => {
  // Fetching saved search data

  const [paginatedData, setPaginatedData] = useState<any>([]);

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
              width: '0px !important',
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

    // Update the paginated data state
    setPaginatedData(sortedFullData);
  }, [
    rows,
    sorting // Trigger sorting when sorting state changes
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
    columns,
    data: paginatedData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    getRowId: originalRow => originalRow?.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    positionToolbarAlertBanner: 'none',
    enableFilters: showGloablFilter,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableStickyHeader: true,
    enableBottomToolbar: false,
    onSortingChange: handleSortingChange, // Handle sorting change
    enableTopToolbar: isEnableTopToolBar,
    enableRowSelection: isRowSelectionNeeded,
    enableToolbarInternalActions: false,

    icons: {
      SearchIcon: () => (
        <Image src={searchIcon} alt={'searchIcon'} className="mr-[6px]" />
      ),
      SortIcon: () => null,
      SyncAltIcon: () => null,
      ArrowDownwardIcon: () => null
    },
    muiTablePaperProps: {
      elevation: 0, //change the mui box shadow

      sx: {
        borderRadius: '8px 8px 0px 0px ',
        border: 'none'
      }
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
        }
      },
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
      },
      sorting: sorting
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
    muiTableBodyCellProps: ({ cell, row }) => {
      return {
        sx: {
          color: 'var(--neutral-900)',
          padding: ['discount', 'price_per_carat', 'rap', 'amount'].includes(
            cell.column.id
          )
            ? '0px 6px'
            : '0px 1px',
          whiteSpace: 'nowrap',
          borderBottom: '1px solid var(--neutral-50)',
          fontSize: '12px !important',
          fontWeight: rowSelection[row.id] ? 500 : 400
        }
      };
    },
    muiTableHeadCellProps: ({ column }) => {
      return {
        sx: {
          color: 'var(--neutral-700)',
          '&.MuiTableCell-root': {
            background: 'var(--neutral-50)',
            opacity: 1,
            borderTop: '1px solid var(--neutral-200)',
            padding: ['discount', 'price_per_carat', 'rap', 'amount'].includes(
              column.id
            )
              ? '0px 6px'
              : '0px 1px',
            paddingRight: ['shape_full', 'details'].includes(column.id)
              ? '12px'
              : '0px',
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
                placeholder="Search by Stone ID"
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
