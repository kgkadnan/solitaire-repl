import { Box, Stack } from '@mui/material';
import styles from './data-table.module.scss';
import {
  MRT_ExpandButton,
  MRT_GlobalFilterTextField,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';

import downloadIcon from '@public/v2/assets/icons/data-table/download.svg';
import downloadExcelIcon from '@public/v2/assets/icons/modal/download.svg';
import saveIcon from '@public/v2/assets/icons/data-table/bookmark.svg';
import BinIcon from '@public/v2/assets/icons/bin.svg';
import NewSearchIcon from '@public/v2/assets/icons/new-search.svg';
// import shareButtonSvg from '@public/v2/assets/icons/data-table/share-button.svg';
import chevronDown from '@public/v2/assets/icons/save-search-dropdown/chevronDown.svg';
import Image from 'next/image';
import warningIcon from '@public/v2/assets/icons/modal/warning.svg';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';

// theme.js
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CalculatedField from '../calculated-field';
import ActionButton from '../action-button';
import { ManageLocales } from '@/utils/v2/translate';
import Breadcrum from '../search-breadcrum/breadcrum';
import {
  useLazyGetAllSavedSearchesQuery,
  useUpdateSavedSearchMutation
} from '@/features/api/saved-searches';
import { useState } from 'react';
import SavedSearchDropDown from '../saved-search-dropdown';
import { useLazyGetProductCountQuery } from '@/features/api/product';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import {
  MAX_SAVED_SEARCH_COUNT,
  MAX_SEARCH_TAB_LIMIT
} from '@/constants/business-logic';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { useRouter } from 'next/navigation';
import { MODIFY_SEARCH_STONES_EXCEEDS_LIMIT } from '@/constants/error-messages/saved';
import { isSearchAlreadyExist } from '@/app/v2/search/saved-search/helpers/handle-card-click';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
import Share from '../copy-and-share/share';

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

const DataTable = ({
  rows,
  columns,
  setRowSelection,
  rowSelection,
  showCalculatedField = false,
  isResult = false,
  myCart = false,
  activeTab,
  searchParameters,
  setActiveTab,
  handleCloseAllTabs,
  handleCloseSpecificTab,
  handleNewSearch,
  setSearchParameters,
  modalSetState,
  downloadExcel,
  data,
  setErrorText,
  setIsError,
  searchList
}: any) => {
  // Fetching saved search data
  const router = useRouter();

  const [triggerSavedSearch] = useLazyGetAllSavedSearchesQuery({});
  let [triggerProductCountApi] = useLazyGetProductCountQuery();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const handleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const onDropDownClick = (data: any) => {
    setIsDropDownOpen(false);
    triggerSavedSearch({
      searchByName: data.value
    }).then(res => {
      let metaData = res.data.savedSearches[0].meta_data;
      const searchUrl = constructUrlParams(metaData);
      triggerProductCountApi({ searchUrl }).then(response => {
        if (response?.data?.count > MAX_SAVED_SEARCH_COUNT) {
          modalSetState.setIsDialogOpen(true);
          modalSetState.setDialogContent(
            <>
              {' '}
              <div className="absolute left-[-84px] top-[-84px]">
                <Image src={warningIcon} alt="warningIcon" />
              </div>
              <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                <div>
                  <h1 className="text-headingS text-neutral900">
                    {MODIFY_SEARCH_STONES_EXCEEDS_LIMIT}
                  </h1>
                </div>
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: ManageLocales('app.modal.okay'),
                      handler: () => {
                        modalSetState.setIsDialogOpen(false);
                      },
                      customStyle: 'flex-1'
                    }
                  ]}
                />
              </div>
            </>
          );
        } else {
          const data: any = JSON.parse(localStorage.getItem('Search')!);

          if (data?.length) {
            let isAlreadyOpenIndex = isSearchAlreadyExist(
              data,
              res.data.savedSearches[0].name
            );
            if (isAlreadyOpenIndex) {
              router.push(
                `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                  isAlreadyOpenIndex + 1
                }`
              );
            } else if (data?.length >= MAX_SEARCH_TAB_LIMIT) {
              modalSetState.setDialogContent(
                <>
                  <div className="absolute left-[-84px] top-[-84px]">
                    <Image src={warningIcon} alt="warningIcon" />
                  </div>
                  <div className="absolute bottom-[20px] flex flex-col gap-[15px] w-[352px]">
                    <div>
                      <h1 className="text-headingS text-neutral900">
                        {' '}
                        {ManageLocales('app.savedSearch.maxTabReached')}
                      </h1>
                      <p className="text-neutral600 text-mRegular">
                        {ManageLocales('app.savedSearch.maxTabReached.content')}
                      </p>
                    </div>
                    <ActionButton
                      actionButtonData={[
                        {
                          variant: 'secondary',
                          label: ManageLocales('app.modal.cancel'),
                          handler: () => {
                            modalSetState.setIsDialogOpen(false);
                          },
                          customStyle: 'flex-1'
                        },
                        {
                          variant: 'primary',
                          label: ManageLocales('app.modal.manageTabs'),
                          handler: () => {
                            router.push(
                              `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-1`
                            );
                            modalSetState.setIsDialogOpen(false);
                          },
                          customStyle: 'flex-1'
                        }
                      ]}
                    />
                  </div>
                </>
              );
              modalSetState.setIsDialogOpen(true);
            } else {
              const localStorageData = [
                ...data,
                {
                  saveSearchName: res.data.savedSearches[0].name,
                  isSavedSearch: true,
                  searchId: response?.data?.search_id,
                  queryParams: res.data.savedSearches[0].meta_data,
                  id: res.data.savedSearches[0].id
                }
              ];

              localStorage.setItem('Search', JSON.stringify(localStorageData));
              router.push(
                `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                  data.length + 1
                }`
              );
            }
          }
        }
      });
    });
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

  const [updateSavedSearch] = useUpdateSavedSearchMutation();

  const handleUpdateSaveSearch = () => {
    const yourSelection = JSON.parse(localStorage.getItem('Search')!);

    const updateSaveSearchData = {
      id: yourSelection[activeTab - 1]?.id,
      meta_data: yourSelection[activeTab - 1]?.queryParams,
      diamond_count: parseInt(data?.count)
    };

    yourSelection[activeTab - 1] = {
      id: yourSelection[activeTab - 1]?.id,
      saveSearchName: yourSelection[activeTab - 1]?.saveSearchName,
      searchId: data?.search_id,
      isSavedSearch: true,
      queryParams: yourSelection[activeTab - 1].queryParams
    };
    localStorage.setItem('Search', JSON.stringify(yourSelection));
    setSearchParameters(yourSelection);
    updateSavedSearch(updateSaveSearchData);
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
        minHeight: isFullScreen
          ? myCart
            ? showCalculatedField
              ? 'calc(100vh - 130px)'
              : 'calc(100vh - 90px)'
            : 'calc(100vh - 200px)'
          : myCart
          ? showCalculatedField
            ? 'calc(100vh - 415px)'
            : 'calc(100vh - 375px)'
          : 'calc(100vh - 399px)',
        maxHeight: isFullScreen
          ? myCart
            ? showCalculatedField
              ? 'calc(100vh - 130px)'
              : 'calc(100vh - 90px)'
            : 'calc(100vh - 200px)'
          : myCart
          ? showCalculatedField
            ? 'calc(100vh - 415px)'
            : 'calc(100vh - 375px)'
          : 'calc(100vh - 399px)'
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
        {isResult && (
          <div className=" min-h-[55px] items-start justify-between border-b-[1px] border-neutral200 flex px-[16px] py-[12px] items-center">
            <div className="flex lg-w-[calc(100%-500px)] gap-[12px] flex-wrap">
              <Breadcrum
                searchParameters={searchParameters}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleCloseSpecificTab={handleCloseSpecificTab}
              />
            </div>
            <div className="pr-[2px] flex gap-[12px] w-[500px]  justify-end flex-wrap relative">
              <button
                onClick={handleDropdown}
                className={`flex items-center px-[16px] py-[8px] text-mMedium font-medium text-neutral-900 ${styles.ctaStyle} ${styles.ctaSecondaryStyle}`}
              >
                {ManageLocales('app.search.savedSearch')}
                <Image src={chevronDown} alt="chevronDown" />
              </button>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    svg: NewSearchIcon,
                    label: ManageLocales('app.search.newSearch'),
                    handler: () => {
                      handleNewSearch();
                    }
                  },
                  {
                    variant: 'secondary',
                    svg: BinIcon,
                    handler: handleCloseAllTabs
                  }
                ]}
                containerStyle="flex gap-[12px]!important"
              />
              <SavedSearchDropDown
                handleClose={handleDropdown}
                isOpen={isDropDownOpen}
                options={searchList}
                onDropDownClick={onDropDownClick}
              />
            </div>
          </div>
        )}
        {showCalculatedField && (
          <CalculatedField rows={rows} selectedProducts={rowSelection} />
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px'
          }}
        >
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
            {/* <StylesSearchBar table={table} autoComplete="false" /> */}
          </div>

          <div className="flex gap-[12px]" style={{ alignItems: 'inherit' }}>
            {isResult &&
              (searchParameters &&
              !searchParameters[activeTab - 1]?.isSavedSearch ? (
                <button
                  className=" flex border-[1px] border-neutral200 rounded-[4px] px-2 py-1 bg-neutral0 items-center cursor-pointer"
                  onClick={() => {
                    searchParameters[activeTab - 1].saveSearchName.length
                      ? handleUpdateSaveSearch()
                      : modalSetState.setIsInputDialogOpen(true);
                  }}
                >
                  <Image src={saveIcon} alt={'save search'} />
                  <p className="pl-1 text-mMedium font-medium text-primaryMain">
                    Save Search
                  </p>
                </button>
              ) : (
                ''
              ))}

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
    )
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export default DataTable;
