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
    // enableRowSelection: true,
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
    groupedColumnMode: false,

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
    enableRowSelection: true,

    displayColumnDefOptions: {
      'mrt-row-expand': {
        // muiTableHeadCellProps: {
        //   sx: {
        //     display: 'none'
        //   }
        // },
        // muiTableBodyCellProps: ({ row }) => {
        //   console.log('celll', row);
        //   return {};
        // },
        // muiTableBodyCellProps: ({ cell }) => ({
        //   sx: {
        //     display: !cell.id.includes('shape') ? 'none' : 'flex'
        //   }
        // }),
        // Cell: ({ row, table }) => {
        //   return (
        //     <>
        //       <MRT_ExpandButton row={row} table={table} />
        //       {/*custom content*/}
        //     </>
        //   );
        // },
        GroupedCell: ({ row, table }) => {
          const { grouping } = table.getState();
          return row.original[grouping[0]];
        }
      }
    },
    sortDescFirst: false,
    initialState: {
      showGlobalFilter: true,

      expanded: true,
      grouping: ['shape'],
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select', 'lot_id'],
        right: ['mrt-row-actions']
      }
    },

    positionGlobalFilter: 'left',
    //styling

    muiTableContainerProps: {
      sx: {
        minHeight: 'calc(100vh - 420px)',
        maxHeight: 'calc(100vh - 420px)'
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

        // '&.MuiTableCell-root :hover': {
        //   opacity: 1
        // }
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
        '& .MuiCheckbox-indeterminate': {
          display: 'none'
        },
        '&.Mui-checked': {
          color: 'var(--primary-main)'
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
