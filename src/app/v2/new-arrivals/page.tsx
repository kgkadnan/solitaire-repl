'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import NewArrivalDataTable from './components/data-table';
import {
  RenderCarat,
  RenderDiscount,
  RenderDetails,
  RenderLab,
  RednderLocation,
  RenderShape,
  RenderMeasurements,
  RenderTracerId,
  RenderNewArrivalPrice,
  RenderNewArrivalBidDiscount,
  RenderNewArrivalPricePerCarat,
  RenderCartLotId,
  RenderBidDate,
  RenderNumericFields
} from '@/components/v2/common/data-table/helpers/render-cell';
import Tooltip from '@/components/v2/common/tooltip';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { columnHeaders } from './constant';
import { SocketManager, useSocket } from '@/hooks/v2/socket-manager';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import CountdownTimer from '@components/v2/common/timer/index';
import { useGetBidHistoryQuery } from '@/features/api/dashboard';
import CommonPoppup from '../login/component/common-poppup';
import { DialogComponent } from '@/components/v2/common/dialog';
import ActionButton from '@/components/v2/common/action-button';
import {
  MRT_RowSelectionState,
  MRT_SortingState,
  MRT_TablePagination
} from 'material-react-table';
import Image from 'next/image';
import useUser from '@/lib/use-auth';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import { Dropdown } from '@/components/v2/common/dropdown-menu';
import threeDotsSvg from '@public/v2/assets/icons/threedots.svg';
import { ManageLocales } from '@/utils/v2/translate';
import { IAppointmentPayload } from '../my-appointments/page';
import { useLazyGetAvailableMyAppointmentSlotsQuery } from '@/features/api/my-appointments';
import {
  SELECT_STONE_TO_PERFORM_ACTION,
  SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH,
  STONE_NOT_AVAILABLE_MODIFY_SEARCH
} from '@/constants/error-messages/confirm-stone';
import BookAppointment from '../my-appointments/components/book-appointment/book-appointment';
import {
  AVAILABLE_STATUS,
  HOLD_STATUS,
  MEMO_STATUS
} from '@/constants/business-logic';
import { kycStatus } from '@/constants/enums/kyc';
import BiddingSkeleton from '@/components/v2/skeleton/bidding';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { filterBidData } from '../search/form/helpers/filter-bid-data';
import { filterFunction } from '@/features/filter-new-arrival/filter-new-arrival-slice';
import Form from '../search/form/form';
import useValidationStateManagement from '../search/hooks/validation-state-management';
import useFormStateManagement from '../search/form/hooks/form-state';
import useNumericFieldValidation from '../search/form/hooks/numeric-field-validation-management';
import { SubRoutes } from '@/constants/v2/enums/routes';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import pako from 'pako';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';
import GemTracPage from '@/components/v2/common/gem-trac';
import { useLazyGetGemTracQuery } from '@/features/api/gem-trac';

const NewArrivals = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const filterData = useAppSelector(state => state.filterNewArrival);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const subRoute = useSearchParams().get('active-tab');
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [validImages, setValidImages] = useState<any>([]);
  const pathName = useSearchParams().get('path');
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [isTabSwitch, setIsTabSwitch] = useState(false); // State to track
  const [searchLoading, setSearchLoading] = useState(false);

  const [isGemTrac, setIsGemTrac] = useState(false);
  const [gemTracData, setGemTracData] = useState([]);
  const [triggerGemTracApi] = useLazyGetGemTracQuery({});

  const isKycVerified = JSON.parse(localStorage.getItem('user')!);

  const { setSearchUrl, searchUrl } = useValidationStateManagement();
  const { state, setState, carat } = useFormStateManagement();
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [isAddDemand, setIsAddDemand] = useState(false);

  const handleDetailPage = ({ row }: { row: any }) => {
    setIsDetailPage(true);
    setDetailPageData(row);
  };

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };

  const { data: bidHistory } = useGetBidHistoryQuery({});
  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      .map(({ accessor, short_label, label }: any) => {
        const currentSort = sorting.find(sort => sort.id === accessor);
        const nonSortableAccessors = ['shape_full', 'details', 'fire_icon'];
        // Check if sorting should be disabled for the column's accessor
        const isSortable = !nonSortableAccessors.includes(accessor);
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
          // enableGrouping: accessor === 'shape',
          // enableSorting:
          //   accessor !== 'shape_full' &&
          //   accessor !== 'details' &&
          //   accessor !== 'fire_icon',
          minSize: 0,
          maxSize: 0,
          size: 0,
          Header: ({ column }: any) => (
            <div className="flex items-center group">
              <Tooltip
                tooltipTrigger={<span>{column.columnDef.header}</span>}
                tooltipContent={label}
                tooltipContentStyles={'z-[1000]'}
              />
              {isSortable &&
                (currentSort ? (
                  <FontAwesomeIcon
                    icon={currentSort.desc ? faSortDown : faSortUp}
                    width={8}
                    height={8}
                    style={{ marginLeft: '2px' }} // Optional styling for spacing
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faSort} // Default icon when not sorted
                    width={8}
                    height={8}
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" // Show on hover
                    style={{ marginLeft: '2px' }}
                  />
                ))}
            </div>
          )
        };

        switch (accessor) {
          case 'rap':
          case 'rap_value':
            return { ...commonProps, Cell: RenderNumericFields };
          case 'amount':
            return { ...commonProps, Cell: RenderNewArrivalPrice };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
          case 'shape_full':
            return { ...commonProps, Cell: RenderShape };
          case 'carats':
          case 'table_percentage':
          case 'depth_percentage':
          case 'ratio':
          case 'length':
          case 'width':
          case 'depth':
          case 'crown_angle':
          case 'crown_height':
          case 'girdle_percentage':
          case 'pavilion_angle':
          case 'pavilion_height':
          case 'lower_half':
          case 'star_length':
            return { ...commonProps, Cell: RenderCarat };
          case 'discount':
            return { ...commonProps, Cell: RenderDiscount };
          case 'current_max_bid':
            return { ...commonProps, Cell: RenderNewArrivalBidDiscount };
          case 'last_bid_date':
            return { ...commonProps, Cell: RenderBidDate };

          case 'lot_id':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderCartLotId({
                  renderedCellValue,
                  row,
                  handleDetailPage
                });
              }
            };
          case 'key_to_symbol':
          case 'report_comments':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
                <span>{`${
                  renderedCellValue?.length > 0
                    ? renderedCellValue?.toString()
                    : '-'
                }`}</span>
              )
            };
          case 'details':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderDetails({ row, handleDetailImage });
              }
            };
          case 'lab':
            return { ...commonProps, Cell: RenderLab };
          case 'location':
            return { ...commonProps, Cell: RednderLocation };

          case 'price_per_carat':
            return { ...commonProps, Cell: RenderNewArrivalPricePerCarat };

          case 'tracr_id':
            return { ...commonProps, Cell: RenderTracerId };
          default:
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
                <span>{renderedCellValue ?? '-'}</span>
              )
            };
        }
      });
  const [activeTab, setActiveTab] = useState(0);
  const tabLabels = ['Bid Stone', 'Active Bid', 'Bid History'];
  const [timeDifference, setTimeDifference] = useState(null);

  useEffect(() => {
    if (pathName === 'bidHistory') {
      setActiveTab(2);
    } else if (pathName === 'bidStone') {
      setActiveTab(0);
    } else if (pathName === 'activeBid') {
      setActiveTab(1);
    }
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (index !== activeTab) {
      // setIsLoading(true);
      setIsTabSwitch(true);
    }

    setRowSelection({});
    if (index === 1 && activeBid.length > 0) {
      activeBid.map((row: any) => {
        if (row.current_max_bid > row.my_current_bid) {
          setRowSelection(prev => {
            return { ...prev, [row.id]: true };
          });
        } else {
          setRowSelection((prev: any) => {
            let prevRows = { ...prev };
            delete prevRows[row.id];
            return prevRows;
          });
        }
      });
    }
  };
  const [activeBid, setActiveBid] = useState<any>();
  const [bid, setBid] = useState<any>();
  const [time, setTime] = useState<any>();
  useEffect(() => {
    const currentTime: any = new Date();
    const targetTime: any = new Date(time!);
    const timeDiff: any = targetTime - currentTime;

    setTimeDifference(timeDiff);
  }, [time]);
  const { authToken } = useUser();

  const socketManager = useMemo(() => new SocketManager(), []);
  useEffect(() => {
    if (authToken) useSocket(socketManager, authToken);
  }, [authToken]);

  useEffect(() => {
    if (filterData?.bidFilterData?.length > 0) {
      setBid(filterData.bidFilterData);
    }
  }, [filterData]);

  async function decompressData<T = unknown>(
    compressedData: Uint8Array | ArrayBuffer | any
  ): Promise<T> {
    try {
      // Ensure compressedData is a Uint8Array
      const uint8Array: Uint8Array =
        compressedData instanceof Uint8Array
          ? compressedData
          : new Uint8Array(compressedData);

      // Decompress the data using pako
      const decompressed: string = await new Promise<string>(
        (resolve, reject) => {
          try {
            const result = pako.ungzip(uint8Array, { to: 'string' });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      );

      // Parse the decompressed string into JSON
      const data: T = JSON.parse(decompressed);
      return data;
    } catch (err: unknown) {
      // Ensure we have proper type checking for error
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Decompression failed: ${errorMessage}`);
      throw err;
    }
  }

  type Part = {
    endTime: string | null;
    bidStone: any[]; // Use the actual type if you know it
    activeStone: any[]; // Use the actual type if you know it
  };

  async function mergeParts(parts: Part[]) {
    const mergedProductData = {
      endTime: parts[0]?.endTime ?? null,
      bidStone: [] as any[], // Define the type of bidStone properly
      activeStone: [] as any[] // Define the type of activeStone properly
    };
    for (const part of parts) {
      mergedProductData.bidStone.push(...(part.bidStone ?? []));
      part.activeStone.length &&
        mergedProductData.activeStone.push(...(part.activeStone ?? []));
    }

    return mergedProductData;
  }

  const receivedPartsMapBidToBuy: any = {};
  const totalPartsMapBidToBuy: any = {};
  const handleBidStones = useCallback(
    async ({ part, total_parts, message_id, data }: any) => {
      try {
        const decompressedPart = await decompressData(data);

        if (!receivedPartsMapBidToBuy[message_id]) {
          receivedPartsMapBidToBuy[message_id] = [];
          totalPartsMapBidToBuy[message_id] = total_parts;
        }
        receivedPartsMapBidToBuy[message_id].push(decompressedPart);
        if (part === total_parts) {
          const allProducts = await mergeParts(
            receivedPartsMapBidToBuy[message_id]
          );

          // Optionally update UI or process allProducts here

          setActiveBid(allProducts.activeStone);

          if (filterData?.queryParams) {
            const filteredData =
              filterData?.bidFilterData?.length > 0
                ? filterData?.bidFilterData
                : filterBidData(allProducts.bidStone, filterData.queryParams);

            dispatch(
              filterFunction({
                bidData: allProducts.bidStone,
                queryParams: filterData.queryParams,
                bidFilterData: filteredData
              })
            );

            setBid(filteredData);
          } else {
            setBid(allProducts.bidStone);
          }

          setTime(allProducts?.endTime ?? undefined);
          if (allProducts.activeStone) {
            allProducts.activeStone.map((row: any) => {
              if (row.current_max_bid > row.my_current_bid) {
                setRowSelection(prev => {
                  return { ...prev, [row.id]: true };
                });
              } else {
                setRowSelection((prev: any) => {
                  let prevRows = { ...prev };
                  delete prevRows[row.id];
                  return prevRows;
                });
              }
            });
          }
          // Set other related state here

          // Clean up
          delete receivedPartsMapBidToBuy[message_id];
          delete totalPartsMapBidToBuy[message_id];
        }
      } catch (error) {
        console.error(
          `Failed to decompress part ${part} of message ${message_id}:`,
          error
        );
      }
    },
    []
  );

  // const handleBidStones = useCallback((data: any) => {
  //   setActiveBid(data.activeStone);

  //   if (filterData?.queryParams) {
  //     const filteredData =
  //       filterData?.bidFilterData?.length > 0
  //         ? filterData?.bidFilterData
  //         : filterBidData(data.bidStone, filterData.queryParams);

  //     dispatch(
  //       filterFunction({
  //         bidData: data.bidStone,
  //         queryParams: filterData.queryParams,
  //         bidFilterData: filteredData
  //       })
  //     );

  //     setBid(filteredData);
  //   } else {
  //     setBid(data.bidStone);
  //   }

  //   setTime(data.endTime);
  //   if (data.activeStone) {
  //     data.activeStone.map((row: any) => {
  //       if (row.current_max_bid > row.my_current_bid) {
  //         setRowSelection(prev => {
  //           return { ...prev, [row.id]: true };
  //         });
  //       } else {
  //         setRowSelection((prev: any) => {
  //           let prevRows = { ...prev };
  //           delete prevRows[row.id];
  //           return prevRows;
  //         });
  //       }
  //     });
  //   }
  //   // Set other related state here
  // }, []);
  const handleError = useCallback((data: any) => {
    if (data) {
      modalSetState.setIsDialogOpen(true);
      modalSetState.setDialogContent(
        <CommonPoppup
          content=""
          header={data}
          handleClick={() => modalSetState.setIsDialogOpen(false)}
          buttonText="Okay"
        />
      );
      // setIsLoading(false)
    }
  }, []);

  const handleBidPlaced = useCallback((data: any) => {
    if (data && data['status'] === 'success') {
      modalSetState.setIsDialogOpen(true);
      modalSetState.setDialogContent(
        <CommonPoppup
          content=""
          header={'Bid Placed Successfully'}
          handleClick={() => modalSetState.setIsDialogOpen(false)}
          buttonText="Okay"
          status="success"
        />
      );
    }
  }, []);
  const handleBidCanceled = useCallback((data: any) => {
    if (data && data['status'] === 'success') {
      modalSetState.setIsDialogOpen(true);
      modalSetState.setDialogContent(
        <CommonPoppup
          content=""
          header={'Bid Canceled Successfully'}
          handleClick={() => modalSetState.setIsDialogOpen(false)}
          buttonText="Okay"
          status="success"
        />
      );
    }
  }, []);

  useEffect(() => {
    const handleRequestGetBidStones = (_data: any) => {
      socketManager.emit('get_bid_stones');
    };
    socketManager.on('bid_stones', handleBidStones);
    socketManager.on('error', handleError);
    socketManager.on('bid_placed', handleBidPlaced);
    socketManager.on('bid_canceled', handleBidCanceled);

    // Setting up the event listener for "request_get_bid_stones"
    socketManager.on('request_get_bid_stones', handleRequestGetBidStones);

    // Return a cleanup function to remove the listeners
    return () => {
      socketManager.off('bid_stones', handleBidStones);
      socketManager.off('error', handleError);
      socketManager.off('request_get_bid_stones', handleRequestGetBidStones);
    };
  }, [socketManager, authToken]);

  const memoizedColumns = useMemo(
    () => mapColumns(columnHeaders),
    [columnHeaders, sorting]
  );
  const { modalState, modalSetState } = useModalStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();
  const formErrorState = useNumericFieldValidation();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentPayload, setAppointmentPayload] =
    useState<IAppointmentPayload>({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });

  const [triggerAvailableSlots] = useLazyGetAvailableMyAppointmentSlotsQuery(
    {}
  );
  const [lotIds, setLotIds] = useState<string[]>([]);

  const { setIsError, setErrorText } = errorSetState;
  const { isError, errorText } = errorState;

  const [downloadExcel] = useDownloadExcelMutation();

  const handleCreateAppointment = () => {
    let selectedIds = Object.keys(rowSelection);

    let data: any;
    if (activeTab === 1) {
      data = activeBid;
    } else if (activeTab === 0) {
      data = bid;
    }

    if (selectedIds.length > 0) {
      const hasMemoOut = selectedIds?.some((id: string) => {
        const stone = data.find((row: any) => row?.id === id);
        return stone?.diamond_status === MEMO_STATUS;
      });

      const hasHold = selectedIds?.some((id: string) => {
        const stone = data.find((row: any) => row?.id === id);
        return stone?.diamond_status === HOLD_STATUS;
      });

      setShowAppointmentForm(true);
      triggerAvailableSlots({}).then(payload => {
        let { data } = payload.data;
        setAppointmentPayload(data);
      });

      // Check for stones with AVAILABLE_STATUS
      const hasAvailable = selectedIds?.some((id: string) => {
        const stone = data.find((row: any) => row?.id === id);
        return stone?.diamond_status === AVAILABLE_STATUS;
      });

      if ((hasHold && hasAvailable) || (hasMemoOut && hasAvailable)) {
        setErrorText(SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH);
        setIsError(true);
      } else if (hasMemoOut) {
        setErrorText(STONE_NOT_AVAILABLE_MODIFY_SEARCH);
        setIsError(true);
      } else if (hasHold) {
        setErrorText(STONE_NOT_AVAILABLE_MODIFY_SEARCH);
        setIsError(true);
      } else {
        const lotIdsWithCountry = selectedIds?.map((id: string) => {
          const foundProduct: any =
            data.find((row: any) => {
              return row?.id === id;
            }) ?? {};

          if (foundProduct) {
            const lotId = foundProduct?.lot_id;
            const country = foundProduct?.location; // assuming country is a property in foundProduct
            return `${lotId}(${country})`;
          }
          return '';
        });
        setLotIds(lotIdsWithCountry);
      }
    } else {
      setIsError(true);
      setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
    }
  };

  const renderFooter = (table: any) => {
    if (activeTab === 0 && bid?.length > 0) {
      return (
        <div className="flex items-center justify-between px-4 py-0">
          <div></div>
          <MRT_TablePagination table={table} />
          <div className="flex items-center gap-3">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: 'Clear All',
                  handler: () => {
                    setRowSelection({});
                  },
                  isDisable: !Object.keys(rowSelection).length
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
                  isDisable: !Object.keys(rowSelection).length,
                  commingSoon:
                    isKycVerified?.customer?.kyc?.status !== kycStatus.APPROVED
                }
              ]}
            />
          </div>
        </div>
      );
    } else if (activeTab === 1 && activeBid?.length > 0) {
      return (
        <div className="flex items-center justify-between px-4 py-0">
          <div className="flex gap-4">
            <div className=" border-[1px] border-successBorder rounded-[4px] bg-successSurface text-successMain">
              <p className="text-mMedium font-medium px-[6px] py-[4px]">
                Winning
              </p>
            </div>
            <div className=" border-[1px] border-dangerBorder rounded-[4px] bg-dangerSurface text-dangerMain">
              <p className="text-mMedium font-medium px-[6px] py-[4px]">
                {' '}
                Losing
              </p>
            </div>
          </div>
          <MRT_TablePagination table={table} />
          <div className="flex items-center gap-3">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: 'Clear All',
                  handler: () => {
                    setRowSelection({});
                  },
                  isDisable: !Object.keys(rowSelection).length
                },
                {
                  variant: 'primary',
                  label: 'Cancel Bid',
                  handler: () => {
                    modalSetState.setIsDialogOpen(true);
                    modalSetState.setDialogContent(
                      <CommonPoppup
                        content={''}
                        status="warning"
                        customPoppupBodyStyle="mt-[70px]"
                        header={`Are you sure you want to cancel this bid?`}
                        actionButtonData={[
                          {
                            variant: 'secondary',
                            label: 'Go Back',
                            handler: () => {
                              modalSetState.setIsDialogOpen(false);
                            },
                            customStyle: 'flex-1 w-full'
                          },
                          {
                            variant: 'primary',
                            label: 'Cancel Bid',
                            handler: () => {
                              socketManager.emit('cancel_bid', {
                                product_ids: Object.keys(rowSelection)
                              });
                            },
                            customStyle: 'flex-1 w-full'
                          }
                        ]}
                      />
                    );
                  },
                  isDisable: !Object.keys(rowSelection).length
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
                    isKycVerified?.customer?.kyc?.status !== kycStatus.APPROVED
                }
              ]}
            />
          </div>
        </div>
      );
    } else if (activeTab === 2 && bidHistory?.data?.length > 0) {
      return (
        <div className="flex items-center justify-between px-4 py-0">
          <div className="flex gap-4 py-2">
            <div className=" border-[1px] border-successBorder rounded-[4px] bg-successSurface text-successMain">
              <p className="text-mMedium font-medium px-[6px] py-[4px]">Won</p>
            </div>
            <div className=" border-[1px] border-dangerBorder rounded-[4px] bg-dangerSurface text-dangerMain">
              <p className="text-mMedium font-medium px-[6px] py-[4px]">
                {' '}
                Lost
              </p>
            </div>
          </div>
          {/* <MRT_TablePagination table={table} /> */}
          <div></div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const images = [
    {
      name: getShapeDisplayName(detailImageData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace('***', detailImageData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.IMG.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Certificate',
      url: `${FILE_URLS.CERT_FILE.replace(
        '***',
        detailImageData?.certificate_number ?? ''
      )}`,
      category: 'Certificate',
      downloadUrl: detailImageData?.assets_pre_check?.CERT_FILE
        ? detailImageData?.certificate_url
        : '',
      url_check: detailImageData?.assets_pre_check?.CERT_IMG
    },

    {
      name: 'Video',
      url: `${FILE_URLS.B2B.replace('***', detailImageData?.lot_id ?? '')}`,
      url_check: detailImageData?.assets_pre_check?.B2B_CHECK,
      category: 'Video'
    },
    {
      name: 'Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      url_check: detailImageData?.assets_pre_check?.B2B_SPARKLE_CHECK,
      category: 'Sparkle'
    },

    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace('***', detailImageData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.HEART.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace('***', detailImageData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.ARROW.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace('***', detailImageData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.ASET.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace('***', detailImageData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.IDEAL.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    }
  ];

  const goBack = () => {
    setIsDetailPage(false);
    setDetailPageData({});
    setShowAppointmentForm(false);
    setAppointmentPayload({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });
  };
  useEffect(() => {
    isError &&
      setTimeout(() => {
        setIsError(false); // Hide the toast notification after some time
      }, 4000);
  }, [isError]);

  useEffect(() => {
    if (images.length > 0 && images[0].name.length)
      loadImages(images, setValidImages, checkImage, false);
  }, [detailImageData]);

  useEffect(() => {
    if (!validImages.length && isModalOpen) {
      setValidImages([
        {
          name: '',
          url: noImageFound,
          category: 'NoDataFound'
        }
      ]);
    }
  }, [validImages]);
  return (
    <div className="mb-[4px] relative">
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}
      {(isLoading || isTabSwitch) && <CustomKGKLoader />}

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => {
          setValidImages([]);
          setDetailImageData({});
          setIsModalOpen(!isModalOpen);
        }}
        images={validImages}
        setIsLoading={setIsLoading}
      />
      <DialogComponent
        dialogContent={modalState.dialogContent}
        isOpens={modalState.isDialogOpen}
        dialogStyle={{ dialogContent: isAddDemand ? 'min-h-[280px]' : '' }}
      />

      {isDetailPage ? (
        <div className="mt-[16px]">
          {isGemTrac ? (
            <GemTracPage
              breadCrumLabel={'New Arrival'}
              setIsGemTrac={setIsGemTrac}
              setGemTracData={setGemTracData}
              gemTracData={gemTracData}
              goBackToListView={goBack}
            />
          ) : (
            <>
              <DiamondDetailsComponent
                data={
                  activeTab === 0
                    ? bid
                    : activeTab === 1
                    ? activeBid
                    : bidHistory?.data
                }
                filterData={detailPageData}
                goBackToListView={goBack}
                handleDetailPage={handleDetailPage}
                breadCrumLabel={'New Arrival'}
                modalSetState={modalSetState}
                setIsLoading={setIsLoading}
                activeTab={activeTab}
                setIsGemTrac={setIsGemTrac}
                setGemTracData={setGemTracData}
                triggerGemTracApi={triggerGemTracApi}
              />
            </>
          )}
        </div>
      ) : showAppointmentForm ? (
        <>
          <div className="flex  py-[12px] items-center justify-between">
            <p className="text-lMedium font-medium text-neutral900">
              {ManageLocales('app.myAppointment.header')}
            </p>
          </div>
          <div className="border-[1px] border-neutral200 rounded-[8px]">
            <BookAppointment
              breadCrumLabel={ManageLocales(
                'app.myAppointments.myAppointments'
              )}
              goBackToListView={goBack}
              appointmentPayload={appointmentPayload}
              setIsLoading={setIsLoading}
              modalSetState={modalSetState}
              lotIds={lotIds}
              setRowSelection={setRowSelection}
              errorSetState={errorSetState}
            />
          </div>
        </>
      ) : bid === undefined ||
        bidHistory === undefined ||
        activeBid === undefined ? (
        <BiddingSkeleton />
      ) : (
        <>
          {subRoute === SubRoutes.NEW_ARRIVAL ? (
            <Form
              searchUrl={searchUrl}
              setSearchUrl={setSearchUrl}
              state={state}
              setState={setState}
              carat={carat}
              handleCloseAllTabs={() => {}}
              handleCloseSpecificTab={() => {}}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              errorState={formErrorState.errorState}
              errorSetState={formErrorState.errorSetState}
              setIsDialogOpen={modalSetState.setIsDialogOpen}
              setDialogContent={modalSetState.setDialogContent}
              setIsLoading={setSearchLoading}
              setIsAddDemand={setIsAddDemand}
              setIsCommonLoading={setIsLoading}
              isMatchingPair={false}
              isLoading={searchLoading}
            />
          ) : (
            <>
              {isSkeletonLoading ? (
                ''
              ) : (
                <div className="flex py-[4px] items-center justify-between">
                  <>
                    {' '}
                    <p className="text-lMedium font-medium text-neutral900">
                      New Arrivals
                    </p>
                    <div className="h-[40px]">
                      {timeDifference !== null && timeDifference >= 0 && (
                        <CountdownTimer
                          initialHours={Math.floor(
                            timeDifference / (1000 * 60 * 60)
                          )}
                          initialMinutes={Math.floor(
                            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                          )}
                          initialSeconds={Math.floor(
                            (timeDifference % (1000 * 60)) / 1000
                          )}
                        />
                      )}
                    </div>
                  </>
                </div>
              )}
              <div
                className={`${
                  isSkeletonLoading
                    ? ' '
                    : 'border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow'
                } `}
              >
                <div>
                  <NewArrivalDataTable
                    dispatch={dispatch}
                    filterData={filterData}
                    columns={
                      activeTab === 2
                        ? memoizedColumns.filter(
                            (data: any) =>
                              data.accessorKey !== 'current_max_bid' &&
                              data.accessorKey !== 'shape'
                          ) // Filter out data with accessor key 'current_max_bid'
                        : activeTab === 1
                        ? memoizedColumns.filter(
                            (data: any) =>
                              data.accessorKey !== 'last_bid_date' &&
                              data.accessorKey !== 'shape'
                          )
                        : memoizedColumns.filter(
                            (data: any) => data.accessorKey !== 'last_bid_date'
                          )
                    }
                    isTabSwitch={isTabSwitch}
                    setIsTabSwitch={setIsTabSwitch}
                    modalSetState={modalSetState}
                    setErrorText={setErrorText}
                    downloadExcel={downloadExcel}
                    setIsError={setIsError}
                    tabLabels={tabLabels}
                    activeTab={activeTab}
                    handleTabClick={handleTabClick}
                    rows={
                      activeTab === 0
                        ? bid
                        : activeTab === 1
                        ? activeBid
                        : bidHistory?.data
                    }
                    isSkeletonLoading={isSkeletonLoading}
                    setIsSkeletonLoading={setIsSkeletonLoading}
                    activeCount={activeBid?.length}
                    setBid={setBid}
                    setSorting={setSorting}
                    sorting={sorting}
                    bidCount={bid?.length}
                    historyCount={bidHistory?.data?.length}
                    socketManager={socketManager}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                    setIsLoading={setIsLoading}
                    renderFooter={renderFooter}
                    router={router}
                  />
                </div>
                {/* {renderFooter()} */}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default NewArrivals;
