import { Box, IconButton, Stack } from '@mui/material';
import {
  MRT_ExpandButton,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import shareIcon from '@public/v2/assets/png/data-table/share.png';
import downloadIcon from '@public/v2/assets/png/data-table/download.png';
import saveIcon from '@public/v2/assets/png/data-table/save.png';
import BinIcon from '@public/v2/assets/icons/bin.svg';
import NewSearchIcon from '@public/v2/assets/icons/new-search.svg';

import Image from 'next/image';

// theme.js
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CalculatedField from '../calculated-field';
import ActionButton from '../action-button';
import { ManageLocales } from '@/utils/v2/translate';
import Breadcrum from '../search-breadcrum/breadcrum';

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

const DataTable = ({
  rows,
  columns,
  setRowSelection,
  rowSelection,
  isResult = false,
  activeTab,
  searchParameters,
  setActiveTab,
  handleCloseAllTabs,
  handleCloseSpecificTab,
  handleNewSearch,
  hideCalculatedField = false
}: any) => {
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

  const StyledToggleFullScreenButton = styled(MRT_ToggleFullScreenButton)(
    () => ({
      border: `1px solid #E4E7EC`,
      background: 'neutral-0',
      padding: '4px',
      width: '35px',
      height: '35px',
      borderRadius: '4px'
    })
  );

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
              display: !cell.id.includes('shape') ? 'none' : 'flex',
              borderBottom: '1px solid var(--neutral-50)',
              left: '-120px',
              zIndex: 99
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

        GroupedCell: ({ row }) => {
          return row.original['shape'];
        }
      }
    },

    sortDescFirst: false,
    initialState: {
      showGlobalFilter: true,

      expanded: true,
      grouping: ['shape_full'],
      columnPinning: {
        left: ['mrt-row-select', 'lot_id']
      }
    },

    positionGlobalFilter: 'left',
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
    },
    renderTopToolbar: ({ table }) => (
      <div>
        {isResult && (
          <div className=" min-h-[72px] items-center justify-between border-b-[1px] border-neutral200 flex p-[16px]">
            <div className="flex lg-w-[calc(100%-400px)] gap-[12px] flex-wrap">
              <Breadcrum
                searchParameters={searchParameters}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleCloseSpecificTab={handleCloseSpecificTab}
              />
            </div>
            <div className="pr-[2px] flex gap-[12px]  justify-end flex-wrap">
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.search.saveSearch'),
                    handler: handleNewSearch
                  },
                  {
                    variant: 'secondary',
                    svg: NewSearchIcon,
                    label: ManageLocales('app.search.newSearch'),
                    handler: handleNewSearch
                  },
                  {
                    variant: 'secondary',
                    svg: BinIcon,
                    handler: handleCloseAllTabs
                  }
                ]}
              />
            </div>
          </div>
        )}
        {hideCalculatedField && (
          <CalculatedField rows={rows} selectedProducts={rowSelection} />
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>Search field</div>
          <div className="flex gap-[4px]" style={{ alignItems: 'inherit' }}>
            {isResult && (
              <div className=" flex border-[1px] border-neutral200 rounded-[4px] px-2 py-1 bg-neutral0 items-center cursor-pointer">
                <Image src={saveIcon} alt={'save search'} />
                <p className="pl-1 text-mMedium font-medium">Save Search</p>
              </div>
            )}
            <IconButton onClick={() => {}}>
              <div className="p-[4px] rounded-[4px] border-[1px] border-neutral200 bg-neutral0">
                <Image src={downloadIcon} alt={'download'} />
              </div>
            </IconButton>
            <StyledToggleFullScreenButton table={table} />
            <IconButton onClick={() => {}}>
              <div className="flex p-[4px] rounded-[4px] border-[1px] border-neutral200 bg-neutral0">
                <Image src={shareIcon} alt={'share'} />
              </div>
            </IconButton>
          </div>
        </Box>
      </div>
    )
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
