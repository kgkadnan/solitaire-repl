import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';

const DataTable = ({ rows, columns, setRowSelection, rowSelection }: any) => {
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
    enableRowSelection: true, //enable some features
    enableFilters: true,
    enableColumnActions: false,
    enableSorting: true,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    enablePagination: false,
    initialState: {
      showGlobalFilter: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select', 'lot_id'],
        right: ['mrt-row-actions']
      }
    },
    positionGlobalFilter: 'left',
    //styling
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: 'var(--neutral-50)',
        '&.MuiTableCell-root': {
          width: '10%',
          minWidth: '10%'
        }
      }
    },
    muiTableHeadCellProps: {
      sx: {
        width: '10%',
        minWidth: '10%'
      }
    },
    muiSelectAllCheckboxProps: {
      sx: {
        color: 'var(--neutral-200)',
        '& .MuiSvgIcon-root': {
          fontSize: '25px'
        },
        '&.Mui-checked': {
          color: 'var(--primary-main)'
        },
        '&.MuiButtonBase-root.MuiCheckbox-root.MuiCheckbox-indeterminate': {
          /* Your styles for the element */
          color: 'var(--primary-main)'
        }
      }
    },
    muiSelectCheckboxProps: {
      sx: {
        color: 'var(--neutral-200)',

        '& .MuiSvgIcon-root': {
          fontSize: '25px'
          // fill: 'var(--neutral-200)'
        },
        '&.Mui-checked': {
          color: 'var(--primary-main)'
        }
      }
    },
    muiTableBodyRowProps: {
      sx: {
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
    },

    muiTableHeadCellProps: {
      //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        color: 'var(--neutral-700)'
      }
    }
  });

  return <MaterialReactTable table={table} />;
};

export default DataTable;
