import {
  MRT_ColumnDef,
  MRT_GlobalFilterTextField,
  MRT_RowData,
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';

// theme.js
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from 'next/image';
import { ManageLocales } from '@/utils/v2/translate';

const theme = createTheme({
  typography: {
    fontFamily: ['inherit'].join(','),
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
    // You can also customize other typography aspects here
  }
});

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
  breadCrumLabel
}: ITable) => {
  // Fetching saved search data

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: rows, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    //state
    getRowId: originalRow => originalRow?.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
    //filters
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

    //styling

    muiTableContainerProps: {
      sx: {
        minHeight: 'calc(100vh - 275px)',
        maxHeight: 'calc(100vh - 440px)'
      }
    },
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: 'var(--neutral-50)',
        '& .MuiTableSortLabel-root': {
          color: 'red'
        }
      }
    },

    muiTableBodyCellProps: {
      sx: {
        color: 'var(--neutral-900)',
        '&.MuiTableCell-root': {
          padding: '4px 8px'
        },
        whiteSpace: 'nowrap',
        borderBottom: '1px solid var(--neutral-50)'
      }
    },

    muiTableHeadCellProps: () => {
      return {
        sx: {
          color: 'var(--neutral-700)',
          '&.MuiTableCell-root': {
            padding: '4px 8px'
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
        borderRadius: '0',
        border: '1px solid var(--neutral-50)'
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
                style={{
                  boxShadow: 'var(--input-shadow) inset',
                  borderColor: 'var(--neutral-200) !important',
                  outline: 'none'
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
