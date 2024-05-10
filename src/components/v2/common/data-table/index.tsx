import { Box, Stack } from '@mui/material';
import styles from './data-table.module.scss';
import {
  MRT_ExpandButton,
  MRT_GlobalFilterTextField,
  MRT_TablePagination,
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import expandIcon from '@public/v2/assets/icons/expand-icon.svg';
import collapsIcon from '@public/v2/assets/icons/collapse-icon.svg';
import downloadIcon from '@public/v2/assets/icons/data-table/download.svg';
import saveIcon from '@public/v2/assets/icons/data-table/bookmark.svg';
import BinIcon from '@public/v2/assets/icons/bin.svg';
import DownloadAllIcon from '@public/v2/assets/icons/download-all.svg';
import NewSearchIcon from '@public/v2/assets/icons/new-search.svg';
// import shareButtonSvg from '@public/v2/assets/icons/data-table/share-button.svg';
import chevronDown from '@public/v2/assets/icons/save-search-dropdown/chevronDown.svg';
import Image from 'next/image';
import warningIcon from '@public/v2/assets/icons/modal/warning.svg';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';
import threeDotsSvg from '@public/v2/assets/icons/threedots.svg';

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
import { useEffect, useState } from 'react';
import SavedSearchDropDown from '../saved-search-dropdown';
import { useLazyGetProductCountQuery } from '@/features/api/product';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import {
  AVAILABLE_STATUS,
  MAX_SAVED_SEARCH_COUNT,
  MAX_SEARCH_TAB_LIMIT,
  SOLD_STATUS
} from '@/constants/business-logic';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { useRouter } from 'next/navigation';
import { MODIFY_SEARCH_STONES_EXCEEDS_LIMIT } from '@/constants/error-messages/saved';
import { isSearchAlreadyExist } from '@/app/v2/search/saved-search/helpers/handle-card-click';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
import Share from '../copy-and-share/share';
import Tooltip from '../tooltip';
import { Dropdown } from '../dropdown-menu';
import { kycStatus } from '@/constants/enums/kyc';
import { handleConfirmStone } from '@app/v2/search/result/helpers/handle-confirm-stone';
import { handleCompareStone } from '@/app/v2/search/result/helpers/handle-compare-stone';

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
    },
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true // No more ripple, on the whole application 💣!
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'var(--neutral-100)'
          },
          '&.Mui-selected': {
            backgroundColor: 'var(--neutral-100) !important'
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'var(--neutral-100) !important'
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            background: 'none'
          }
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
  searchList,
  setIsLoading,
  handleAddToCart,
  // handleConfirmStone,
  setIsConfirmStone,
  setConfirmStoneData,
  deleteCartHandler,
  activeCartTab,
  setIsCompareStone,
  setCompareStoneData,
  setIsInputDialogOpen,
  isDashboard,
  setIsDetailPage,
  handleCreateAppointment
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
    localStorage.setItem('isFullScreen', JSON.stringify(!isFullScreen));
    setIsFullScreen(!isFullScreen);
  };

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20 //customize the default page size
  });

  const [paginatedData, setPaginatedData] = useState<any>([]);

  useEffect(() => {
    // Calculate the start and end indices for the current page
    const startIndex = pagination.pageIndex * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    // Slice the data to get the current page's data
    const newData = rows.slice(startIndex, endIndex);
    // Update the paginated data state
    setPaginatedData(newData);
  }, [
    rows,
    pagination.pageIndex, //re-fetch when page index changes
    pagination.pageSize //re-fetch when page size changes
  ]);

  useEffect(() => {
    let isFullScreen = JSON.parse(localStorage.getItem('isFullScreen')!);

    setIsFullScreen(isFullScreen);
  }, []);
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Escape') {
        setIsFullScreen(false);
        localStorage.setItem('isFullScreen', JSON.stringify(false));
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const onDropDownClick = (value: any) => {
    setIsLoading(true);
    setIsDropDownOpen(false);

    triggerSavedSearch({
      searchByName: value.value
    })
      .then(res => {
        let searchData: any;

        if (res.data.savedSearches.length > 1) {
          let savedSearchData = res.data.savedSearches;

          let filteredData = savedSearchData.filter((savedSearch: any) => {
            return savedSearch.name.toLowerCase() === value.value.toLowerCase();
          })[0];
          searchData = filteredData;
        } else {
          searchData = res.data.savedSearches[0];
        }

        const searchUrl = constructUrlParams(searchData.meta_data);
        setIsLoading(false);
        triggerProductCountApi({ searchUrl })
          .then(response => {
            if (response?.data?.count > MAX_SAVED_SEARCH_COUNT) {
              setIsLoading(false);
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
                  searchData.name
                );

                if (isAlreadyOpenIndex >= 0 && isAlreadyOpenIndex !== null) {
                  router.push(
                    `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                      isAlreadyOpenIndex + 1
                    }`
                  );
                  return;
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
                            {ManageLocales(
                              'app.savedSearch.maxTabReached.content'
                            )}
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

                  localStorage.setItem(
                    'Search',
                    JSON.stringify(localStorageData)
                  );
                  router.push(
                    `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${
                      data.length + 1
                    }`
                  );
                }
              }
              setIsLoading(false);
            }
          })
          .catch(() => {
            setIsLoading(false);
          });
      })
      .catch(() => {
        setIsLoading(false);
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
    const allProductIds = rows.map(({ id }: { id: string }) => {
      return id;
    });

    downloadExcelHandler({
      products: selectedIds.length > 0 ? selectedIds : allProductIds,
      downloadExcelApi: downloadExcel,
      modalSetState,
      setRowSelection,
      setIsLoading: setIsLoading
    });
  };

  const downloadAllSearchTabsExcelHandler = () => {
    const searchTabsData = JSON.parse(localStorage.getItem('Search')!);
    const allTabsIds = searchTabsData.map((tab: any) => tab.searchId);
    downloadExcelHandler({
      previousSearch: allTabsIds,
      downloadExcelApi: downloadExcel,
      modalSetState,
      setRowSelection,
      setIsLoading: setIsLoading
    });
  };

  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  const NoResultsComponent = () => <></>;
  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data: paginatedData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    //state
    getRowId: originalRow => originalRow?.id,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      isFullScreen: JSON.parse(localStorage.getItem('isFullScreen')!),
      pagination
    },
    //filters
    positionToolbarAlertBanner: 'none',
    enableFilters: true,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableColumnFilters: false,
    // enablePagination: true,
    enableStickyHeader: true,
    enableBottomToolbar: true,
    enableGrouping: true,
    enableExpandAll: false,
    enableColumnDragging: false,
    groupedColumnMode: 'remove',
    enableRowSelection: true,
    enableToolbarInternalActions: true,
    globalFilterFn: 'startsWith',
    selectAllMode: 'page',
    renderEmptyRowsFallback: NoResultsComponent,
    manualPagination: true,
    rowCount: rows.length,
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
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
          '&.MuiTableRow-root .MuiTableCell-root': {
            backgroundColor: row.id.includes('shape')
              ? 'var(--neutral-25)'
              : 'var(--neutral-0)'
          },
          '&.MuiTableRow-root:active .MuiTableCell-root::after': {
            backgroundColor: 'var(--neutral-100)'
          }
          // '&.MuiTableCell-root[data-index="1"] ':{
          //     display: 'none'
          //   },
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
      },
      pagination: pagination
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
        height: isFullScreen ? '70vh' : 'calc(100vh - 330px)',
        minHeight: isFullScreen
          ? myCart
            ? showCalculatedField
              ? 'calc(100vh - 130px)'
              : 'calc(100vh - 90px)'
            : isDashboard
            ? 'calc(100vh - 180px)'
            : 'calc(100vh - 230px)'
          : myCart
          ? showCalculatedField
            ? isNudge &&
              (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
                isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
              ? 'calc(100vh - 440px)'
              : 'calc(100vh - 363px)'
            : isNudge &&
              (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
                isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
            ? 'calc(100vh - 380px)'
            : 'calc(100vh - 303px)'
          : isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
          ? 'calc(100vh - 405px)'
          : 'calc(100vh - 330px)',
        maxHeight: isFullScreen
          ? myCart
            ? showCalculatedField
              ? 'calc(100vh - 130px)'
              : 'calc(100vh - 90px)'
            : isDashboard
            ? 'calc(100vh - 180px)'
            : 'calc(100vh - 230px)'
          : myCart
          ? showCalculatedField
            ? isNudge &&
              (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
                isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
              ? 'calc(100vh - 440px)'
              : 'calc(100vh - 363px)'
            : isNudge &&
              (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
                isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
            ? 'calc(100vh - 380px)'
            : 'calc(100vh - 303px)'
          : isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
          ? 'calc(100vh - 405px)'
          : 'calc(100vh - 330px)'
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
                cell.id === 'shape:PS-RS_lot_id' ||
                cell.id === 'shape:SPL_lot_id' ||
                cell.id === 'shape:RC_lot_id' ||
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
                cell.id === 'shape:SCU_lot_id' ||
                cell.id === 'shape:RX_lot_id' ||
                cell.id === 'shape:TR_lot_id' ||
                cell.id === 'shape:PS-RS_lot_id' ||
                cell.id === 'shape:SPL_lot_id' ||
                cell.id === 'shape:RC_lot_id' ||
                cell.id === 'shape:RMB_lot_id') &&
              'none'
          },
          //      '&.MuiTableCell-root[data-index="1"] ':{
          //   display:'none'
          // },
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
        borderRadius: '8px',
        border: 'none'
      }
    },
    renderTopToolbar: ({ table }) => (
      <div>
        {isResult && (
          <div className=" min-h-[55px] items-start justify-between border-b-[1px] border-neutral200 flex px-[16px] py-[8px]">
            <div className="flex lg-w-[calc(100%-500px)] gap-[12px] flex-wrap">
              <Breadcrum
                searchParameters={searchParameters}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleCloseSpecificTab={handleCloseSpecificTab}
                setIsLoading={setIsLoading}
              />
            </div>
            <div className="pr-[2px] flex gap-[12px] w-[500px]  justify-end flex-wrap relative">
              <button
                onClick={handleDropdown}
                className={`flex items-center px-[16px] py-[8px] text-mMedium font-medium text-neutral900 !h-[40px] ${styles.ctaStyle} ${styles.ctaSecondaryStyle}`}
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
                      setIsLoading(true);
                      handleNewSearch();
                    }
                  },
                  {
                    variant: 'secondary',
                    svg: DownloadAllIcon,
                    handler: downloadAllSearchTabsExcelHandler,
                    customStyle: 'w-[40px] h-[40px]',
                    tooltip: 'Download all search results'
                  },
                  {
                    variant: 'secondary',
                    svg: BinIcon,
                    handler: handleCloseAllTabs,
                    customStyle: 'w-[40px] h-[40px]',
                    tooltip: 'Close all tabs'
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
            padding: '8px 16px'
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
                  className=" flex border-[1px] border-neutral200 rounded-[4px] px-2 py-1 shadow-sm bg-neutral0 items-center cursor-pointer h-[37px]"
                  onClick={() => {
                    searchParameters[activeTab - 1].saveSearchName.length
                      ? handleUpdateSaveSearch()
                      : setIsInputDialogOpen(true);
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
              className=" rounded-[4px] cursor-pointer"
              onClick={handleDownloadExcel}
            >
              <Tooltip
                tooltipTrigger={
                  <Image
                    src={downloadIcon}
                    alt={'download'}
                    width={39}
                    height={39}
                  />
                }
                tooltipContent={'Download Excel'}
                tooltipContentStyles={'z-[1000]'}
              />
            </div>

            <div className=" rounded-[4px] cursor-pointer">
              <Tooltip
                tooltipTrigger={
                  <div onClick={toggleFullScreen}>
                    {/* <StyledToggleFullScreenButton table={table} title="" />{' '} */}
                    {isFullScreen ? (
                      <Image
                        src={collapsIcon}
                        alt={'collapsIcon'}
                        width={39}
                        height={39}
                      />
                    ) : (
                      <Image
                        src={expandIcon}
                        alt={'expandIcon'}
                        width={39}
                        height={39}
                      />
                    )}
                  </div>
                }
                tooltipContent={
                  isFullScreen ? 'Exit Full Screen' : 'Full Screen'
                }
                tooltipContentStyles={'z-[1000]'}
              />
            </div>

            <div className="flex  rounded-[4px] cursor-pointer">
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
    ),
    renderBottomToolbar: ({ table }) => (
      <div
        className={`px-[16px] border-t-[1px] border-neutral200 ${
          isDashboard && 'border-b-[1px]'
        }`}
      >
        {(isResult || isDashboard) && (
          <div className="flex items-center justify-between">
            <div className="flex gap-4 h-[30px]">
              <div className=" border-[1px] border-lengendInCardBorder rounded-[4px] bg-legendInCartFill text-legendInCart">
                <p className="text-mMedium font-medium px-[6px] py-[4px]">
                  In Cart
                </p>
              </div>
              <div className=" border-[1px] border-lengendHoldBorder rounded-[4px] bg-legendHoldFill text-legendHold">
                <p className="text-mMedium font-medium px-[6px] py-[4px]">
                  {' '}
                  Hold
                </p>
              </div>
              <div className="border-[1px] border-lengendMemoBorder rounded-[4px] bg-legendMemoFill text-legendMemo">
                <p className="text-mMedium font-medium px-[6px] py-[4px]">
                  {' '}
                  Memo
                </p>
              </div>
            </div>
            <MRT_TablePagination table={table} />
            <div className="flex items-center gap-3">
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.searchResult.addToCart'),
                    handler: () => handleAddToCart()
                  },

                  {
                    variant: 'primary',
                    label: ManageLocales('app.searchResult.confirmStone'),
                    handler: () => {
                      isDashboard
                        ? handleConfirmStone({
                            selectedRows: rowSelection,
                            rows: rows,
                            setIsError,
                            setErrorText,
                            setIsConfirmStone,
                            setConfirmStoneData,
                            setIsDetailPage
                          })
                        : handleConfirmStone({
                            selectedRows: rowSelection,
                            rows: rows,
                            setIsError,
                            setErrorText,
                            setIsConfirmStone,
                            setConfirmStoneData
                          });
                    }
                  }
                ]}
              />
              <Dropdown
                dropdownTrigger={
                  <Image
                    src={threeDotsSvg}
                    alt="threeDotsSvg"
                    width={43}
                    height={43}
                  />
                }
                dropdownMenu={[
                  {
                    label: ManageLocales(
                      'app.search.actionButton.bookAppointment'
                    ),
                    handler: () => {
                      handleCreateAppointment();
                    },
                    commingSoon:
                      isKycVerified?.customer?.kyc?.status ===
                        kycStatus.INPROGRESS ||
                      isKycVerified?.customer?.kyc?.status ===
                        kycStatus.REJECTED
                  },

                  {
                    label: ManageLocales(
                      'app.search.actionButton.findMatchingPair'
                    ),
                    handler: () => {},
                    commingSoon: true
                  },
                  {
                    label: 'Compare Stone',
                    handler: () =>
                      handleCompareStone({
                        isCheck: rowSelection,
                        setIsError,
                        setErrorText,
                        activeCartRows: rows,
                        setIsCompareStone,
                        setCompareStoneData
                      })
                  }
                ]}
                isDisable={true}
              />
            </div>
          </div>
        )}
        {myCart && (
          <div className="flex items-center  justify-between">
            <div className=""></div>
            <MRT_TablePagination table={table} />
            <div className="flex gap-2">
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.myCart.actionButton.delete'),
                    handler: deleteCartHandler
                  },

                  {
                    variant: 'primary',
                    label: ManageLocales(
                      'app.myCart.actionButton.confirmStone'
                    ),
                    handler: () => {
                      handleConfirmStone({
                        selectedRows: rowSelection,
                        rows: rows,
                        setIsError,
                        setErrorText,
                        setIsConfirmStone,
                        setConfirmStoneData
                      });
                    },
                    isHidden: activeCartTab !== AVAILABLE_STATUS
                  }
                ]}
              />
              <Dropdown
                dropdownTrigger={
                  <Image
                    src={threeDotsSvg}
                    alt="threeDotsSvg"
                    width={43}
                    height={43}
                  />
                }
                dropdownMenu={[
                  // {
                  //   label: ManageLocales(
                  //     'app.myCart.actionButton.compareStone'
                  //   ),
                  //   handler: () => {},
                  //   isHidden: activeTab === SOLD_STATUS
                  // },
                  {
                    label: ManageLocales(
                      'app.myCart.actionButton.findMatchingPair'
                    ),
                    handler: () => {},
                    isHidden: activeCartTab !== AVAILABLE_STATUS,
                    commingSoon: true
                  },
                  {
                    label: ManageLocales(
                      'app.myCart.actionButton.bookAppointment'
                    ),
                    handler: () => {
                      handleCreateAppointment();
                    },
                    commingSoon:
                      isKycVerified?.customer?.kyc?.status ===
                        kycStatus.INPROGRESS ||
                      isKycVerified?.customer?.kyc?.status ===
                        kycStatus.REJECTED,
                    isHidden: activeCartTab !== AVAILABLE_STATUS
                  },
                  {
                    label: ManageLocales(
                      'app.myCart.actionButton.viewSimilarStone'
                    ),
                    handler: () => {},
                    isHidden: activeCartTab === AVAILABLE_STATUS,
                    commingSoon: true
                  }
                ]}
                isDisable={true}
              />
            </div>
          </div>
        )}
      </div>
    )
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
    </>
  );
};

export default DataTable;
