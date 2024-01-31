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
    enableRowSelection: true,
    enableFilters: true,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableStickyHeader: true,
    enableBottomToolbar: false,

    initialState: {
      showGlobalFilter: true,

      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select', 'lot_id'],
        right: ['mrt-row-actions']
      }
    },

    positionGlobalFilter: 'left',
    //styling

    muiTableContainerProps: {
      sx: {
        minHeight: '10vh',
        height: '60vh'
      }
    },
    muiTableHeadRowProps: {
      sx: {
        backgroundColor: 'var(--neutral-50)'
      }
    },

    muiTableBodyCellProps: {
      sx: {
        color: 'var(--neutral-900)',
        '&.MuiTableCell-root': {
          padding: '4px 8px'
        }
      }
    },
    muiTableHeadCellProps: {
      sx: {
        color: 'var(--neutral-700)',
        '&.MuiTableCell-root': {
          padding: '4px 8px'
        }
      }
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
    }
  });

  return (
    <form autoComplete="off">
      <MaterialReactTable table={table} />
    </form>
  );
};

export default DataTable;
