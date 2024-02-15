import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';

// theme.js
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

const Table = ({ rows, columns, setRowSelection, rowSelection }: any) => {
  // Fetching saved search data

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
    enableFilters: false,
    enableColumnActions: false,
    enableSorting: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableStickyHeader: true,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableRowSelection: true,
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
      showGlobalFilter: false,
      columnPinning: {
        left: ['mrt-row-select', 'lot_id']
      }
    },

    //styling

    muiTableContainerProps: {
      sx: {
        minHeight: 'calc(100vh - 399px)',
        maxHeight: 'calc(100vh - 399px)'
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
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export default Table;
