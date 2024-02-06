import { IconButton, Stack } from '@mui/material';
import {
  MRT_ExpandButton,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import warningIcon from '@public/v2/assets/icons/modal/warning.svg';
import Image from 'next/image';

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

const DataTable = ({ rows, columns, setRowSelection, rowSelection }: any) => {
  const getShapeDisplayName = ({ value }: { value: string }) => {
    switch (value) {
      case 'EM':
        return 'Emerald';
      case 'BR':
        return 'Round';
      case 'PR':
        return 'Pear';
      case 'PS':
        return 'Princess';
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

    displayColumnDefOptions: {
      'mrt-row-expand': {
        size: 110,

        muiTableHeadCellProps: {
          sx: {
            display: 'none'
          }
        },
        // muiTableBodyCellProps: ({ row }) => {
        //   console.log('celll', row);
        //   return {};
        // },
        muiTableBodyCellProps: ({ cell }) => {
          return {
            sx: {
              display: !cell.id.includes('shape') ? 'none' : 'flex'
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
        },

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
        left: ['mrt-row-select', 'lot_id']
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
        },
        '&.MuiButtonBase-root-MuiCheckbox-root.Mui-checked, .MuiCheckbox-indeterminate':
          {
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
    },
    renderToolbarInternalActions: ({ table }) => (
      <>
      {/* <div>hello</div>
      <div><img src={warningIcon}></img></div>
      <IconButton onClick={() => {}}>
        hello
      </IconButton> */}
      {/* <div><Image src={warningIcon} alt="warningIcon" /></div> */}
        {/* add your own custom print button or something */}
        {/* <IconButton onClick={() =>{}}>
        <Image src={warningIcon} alt="warningIcon" />

        </IconButton>
        <Image src={warningIcon} alt="warningIcon" />
hello
        {/* built-in buttons (must pass in table prop for them to work!) */}
        <MRT_ToggleFullScreenButton table={table} /> 
      </>
    ),
  });

  return (
    <form autoComplete="off">
      <ThemeProvider theme={theme}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
    </form>
  );
};

export default DataTable;
