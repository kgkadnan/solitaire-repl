'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BidToBuyDataTable from './components/data-table';
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
  RenderNewArrivalPricePerCarat,
  RenderCartLotId,
  RenderBidDate,
  DiscountWithCross,
  RenderNumericFields
} from '@/components/v2/common/data-table/helpers/render-cell';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import Tooltip from '@/components/v2/common/tooltip';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { columnHeaders } from './constant';
import { SocketManager, useSocket } from '@/hooks/v2/socket-manager';
import CountdownTimer from '@components/v2/common/timer/index';
import { useLazyGetBidToBuyHistoryQuery } from '@/features/api/dashboard';

import { DialogComponent } from '@/components/v2/common/dialog';
import ActionButton from '@/components/v2/common/action-button';
import {
  MRT_RowSelectionState,
  MRT_SortingState,
  MRT_TablePagination
} from 'material-react-table';
import useUser from '@/lib/use-auth';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { useRouter, useSearchParams } from 'next/navigation';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import CommonPoppup from '../login/component/common-poppup';
import BiddingSkeleton from '@/components/v2/skeleton/bidding';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { filterBidData } from '../search/form/helpers/filter-bid-data';
import { filterBidToBuyFunction } from '@/features/filter-bid-to-buy/filter-bid-to-buy-slice';
import useValidationStateManagement from '../search/hooks/validation-state-management';
import useFormStateManagement from '../search/form/hooks/form-state';
import Form from '../search/form/form';
import { SubRoutes } from '@/constants/v2/enums/routes';
import useNumericFieldValidation from '../search/form/hooks/numeric-field-validation-management';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import pako from 'pako';
import {
  useDeleteBidMutation,
  useLazyGetAllBidStonesQuery
} from '@/features/api/product';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';

const BidToBuy = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const filterData: any = useAppSelector(state => state.filterBidToBuy);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [validImages, setValidImages] = useState<any>([]);
  const pathName = useSearchParams().get('path');
  const getActiveTabParam = useSearchParams().get('active-bid-tab');
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [searchLoading, setSearchLoading] = useState(false);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [isTabSwitch, setIsTabSwitch] = useState(false); // State to track
  const [showOnlyWithVideo, setShowOnlyWithVideo] = useState(false);

  // const [checkStatus, setCheckStatus] = useState(false);

  const { setSearchUrl, searchUrl } = useValidationStateManagement();
  const { state, setState, carat } = useFormStateManagement();
  const [isAddDemand, setIsAddDemand] = useState(false);
  const formErrorState = useNumericFieldValidation();

  const subRoute = useSearchParams().get('active-tab');
  const handleDetailPage = ({ row }: { row: any }) => {
    setIsDetailPage(true);
    setDetailPageData(row);
  };

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };
  const filterDataState: any = useAppSelector(state => state.filterBidToBuy);

  const [bidHistory, setBidHistory] = useState<any>({});

  const [triggerBidToBuyHistory, { data: historyData }] =
    useLazyGetBidToBuyHistoryQuery({});
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
          case 'amount':
            return { ...commonProps, Cell: RenderNewArrivalPrice };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
          case 'shape_full':
            return { ...commonProps, Cell: RenderShape };
          case 'rap':
          case 'rap_value':
            return { ...commonProps, Cell: RenderNumericFields };
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
          case 'original_discount':
            return { ...commonProps, Cell: DiscountWithCross };
          case 'discount':
            return { ...commonProps, Cell: RenderDiscount };
          case 'my_current_bid':
            return { ...commonProps, Cell: RenderDiscount };
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
                return RenderDetails({
                  row,
                  handleDetailImage
                });
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
  const [isInActive, setIsInActive] = useState(false);
  const getBidToBuyHistoryData = () => {
    setIsLoading(true);

    triggerBidToBuyHistory({})
      .then(res => {
        setIsLoading(false);
        setBidHistory(res.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let bidLocalStorageData = JSON.parse(localStorage.getItem('bid')!);
    let queryNew = constructUrlParams(bidLocalStorageData.queryParams);
    setIsLoading(true);
    triggerBidToBuyApi({
      searchUrl: `${queryNew}&all_asset_required=${bidLocalStorageData.all_asset_required}`
    })
      .unwrap()
      .then((response: any) => {
        setIsInActive(false);

        setTime(response?.endTime),
          setBid(queryNew.length ? response?.bidStone : []);
        setActiveBid(response?.activeStone);
        setIsLoading(false);
      })
      .catch(e => {
        if (e?.data?.error === 'INACTIVE_BID_TO_BUY') {
          setIsInActive(true);
        }
        setActiveBid([]);
        setBid([]);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let bidLocalStorageData = JSON.parse(localStorage.getItem('bid')!);
    let queryNew = constructUrlParams(bidLocalStorageData.queryParams);

    setIsLoading(true);

    triggerBidToBuyApi({
      searchUrl: `${queryNew}&all_asset_required=${bidLocalStorageData.all_asset_required}`
    })
      .unwrap()
      .then((response: any) => {
        setIsInActive(false);

        setBid(queryNew.length ? response?.bidStone : []);
        setActiveBid(response?.activeStone);
        setTime(response?.endTime), setIsLoading(false);
      })
      .catch(e => {
        if (e?.data?.error === 'INACTIVE_BID_TO_BUY') {
          setIsInActive(true);
        }
        setActiveBid([]);
        setBid([]);
        setIsLoading(false);
      });
  }, [localStorage.getItem('bid')]);

  useEffect(() => {
    if (activeTab === 2) {
      getBidToBuyHistoryData();
    }
  }, [activeTab]);
  useEffect(() => {
    getBidToBuyHistoryData();
  }, []);

  useEffect(() => {
    if (
      getActiveTabParam &&
      (Number(getActiveTabParam) === 2 || Number(getActiveTabParam) === 1)
    ) {
      setActiveTab(Number(getActiveTabParam));
    } else if (pathName === 'bidHistory') {
      setActiveTab(2);
    } else if (pathName === 'bidStone') {
      setActiveTab(0);
    } else if (pathName === 'activeBid') {
      setActiveTab(1);
    }
  }, []);

  const handleTabClick = (index: number) => {
    let bidLocalStorageData = JSON.parse(localStorage.getItem('bid')!);
    let queryNew = constructUrlParams(bidLocalStorageData.queryParams);

    if (index !== activeTab) {
      if (index === 0 && !queryNew.length) {
        setIsTabSwitch(false);
      } else {
        setIsTabSwitch(true);
      }
    }
    setActiveTab(index);
    setRowSelection({});
    if (index === 1 && activeBid.length > 0) {
      activeBid.map((row: any) => {
        if (row.discount > row.my_current_bid) {
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
  const [time, setTime] = useState('');

  useEffect(() => {
    const currentTime: any = new Date();
    const targetTime: any = new Date(time!);
    const timeDiff: any = targetTime - currentTime;

    setTimeDifference(timeDiff);
  }, [time]);

  const memoizedColumns = useMemo(
    () => mapColumns(columnHeaders),
    [columnHeaders, sorting]
  );
  const { modalState, modalSetState } = useModalStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const { setIsError, setErrorText } = errorSetState;
  const { isError, errorText } = errorState;

  const [downloadExcel] = useDownloadExcelMutation();
  const [deleteBid] = useDeleteBidMutation();
  let [
    triggerBidToBuyApi,
    { isLoading: isLoadingBidToBuyApi, isFetching: isFetchingBidToBuyApi }
  ] = useLazyGetAllBidStonesQuery();

  const renderFooter = (table: any) => {
    if (activeTab === 0 && bid?.length > 0) {
      return (
        <div className="flex items-center justify-between px-4 py-0">
          <div className="flex  ml-[85px] justify-center flex-1">
            <MRT_TablePagination table={table} />
          </div>
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
          </div>
        </div>
      );
    } else if (activeTab === 1 && activeBid?.length > 0) {
      return (
        <div className="flex items-center justify-between px-4 py-0">
          <div className="flex ml-[200px] justify-center flex-1">
            {' '}
            {/* Aligns MRT_TablePagination to the middle */}
            <MRT_TablePagination table={table} />
          </div>
          <div className="flex items-center gap-3">
            {' '}
            {/* Aligns ActionButton to the end */}
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
                        content=""
                        status="warning"
                        customPoppupBodyStyle="mt-[70px]"
                        header={'Are you sure you want to cancel this bid?'}
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
                              let bidLocalStorageData = JSON.parse(
                                localStorage.getItem('bid')!
                              );
                              let queryNew = constructUrlParams(
                                bidLocalStorageData.queryParams
                              );
                              // socketManager.emit('cancel_bidtobuy', {
                              //   product_ids: Object.keys(rowSelection)
                              // });
                              deleteBid({
                                product_ids: Object.keys(rowSelection)
                              })
                                .unwrap()
                                .then(res => {
                                  modalSetState.setIsDialogOpen(true);
                                  modalSetState.setDialogContent(
                                    <CommonPoppup
                                      content=""
                                      header={'Bid Canceled Successfully'}
                                      handleClick={() =>
                                        modalSetState.setIsDialogOpen(false)
                                      }
                                      buttonText="Okay"
                                      status="success"
                                    />
                                  );
                                  triggerBidToBuyApi({
                                    searchUrl: `${queryNew}&all_asset_required=${bidLocalStorageData.all_asset_required}`,
                                    limit: 300
                                  })
                                    .unwrap()
                                    .then((response: any) => {
                                      setBid(response?.bidStone);
                                      setActiveBid(response?.activeStone);
                                      setIsLoading(false);
                                    })
                                    .catch(e => {
                                      setIsLoading(false);
                                    });
                                })
                                .catch(e => {
                                  modalSetState.setIsDialogOpen(true);
                                  modalSetState.setDialogContent(
                                    <CommonPoppup
                                      header={e?.data?.message}
                                      content={''}
                                      handleClick={() =>
                                        modalSetState.setIsDialogOpen(false)
                                      }
                                      buttonText="Okay"
                                    />
                                  );
                                });
                              modalSetState.setIsDialogOpen(false);
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
          </div>
        </div>
      );
    } else if (activeTab === 2 && bidHistory?.data?.length > 0) {
      return (
        <div className="flex items-center justify-between px-4 py-0 border-t-[1px] border-solid border-neutral200">
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
            fromBid={true}
            breadCrumLabel={'Bid to Buy'}
            modalSetState={modalSetState}
            setIsLoading={setIsLoading}
            activeTab={activeTab}
          />
        </div>
      ) : isLoading ||
        // isLoadingBidToBuyApi ||
        historyData === undefined ||
        activeBid === undefined ? (
        <BiddingSkeleton />
      ) : (
        <>
          {(!Object?.keys(localStorage.getItem('bid') ?? {}).length &&
            time &&
            activeTab === 0) ||
          subRoute === SubRoutes.BID_TO_BUY ||
          !isInActive ? (
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
              isMatchingPair={false}
              isLoading={searchLoading}
              setIsCommonLoading={setIsLoading}
              time={time}
              setRowSelection={setRowSelection}
              showOnlyWithVideo={showOnlyWithVideo}
              setShowOnlyWithVideo={setShowOnlyWithVideo}
              // setBid={setBid}
              // setActiveBid={setActiveBid}
            />
          ) : (
            <>
              {isSkeletonLoading ? (
                ''
              ) : (
                <div className="flex  py-[4px] items-center justify-between">
                  <>
                    {' '}
                    <div className="flex gap-3 items-center">
                      <p className="text-lMedium font-medium text-neutral900">
                        Bid to Buy
                      </p>
                      {time && time?.length ? (
                        <div className="text-successMain text-lMedium font-medium">
                          ACTIVE
                        </div>
                      ) : (
                        <div className="text-visRed text-lMedium font-medium">
                          INACTIVE
                        </div>
                      )}
                    </div>
                    <div className="h-[38px]">
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
                  <BidToBuyDataTable
                    dispatch={dispatch}
                    // filterData={filterData}
                    setBid={setBid}
                    setActiveBid={setActiveBid}
                    setSorting={setSorting}
                    sorting={sorting}
                    columns={
                      activeTab === 2
                        ? memoizedColumns.filter(
                            (data: any) =>
                              data.accessorKey !== 'shape' &&
                              data.accessorKey !== 'discount'
                          )
                        : activeTab === 1
                        ? memoizedColumns.filter(
                            (data: any) =>
                              data.accessorKey !== 'last_bid_date' &&
                              data.accessorKey !== 'shape' &&
                              data.accessorKey !== 'discount'
                          )
                        : memoizedColumns.filter(
                            (data: any) =>
                              data.accessorKey !== 'my_current_bid' &&
                              data.accessorKey !== 'last_bid_date'
                          )
                    }
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
                    activeCount={activeBid?.length}
                    bidCount={bid?.length}
                    isTabSwitch={isTabSwitch}
                    setIsTabSwitch={setIsTabSwitch}
                    historyCount={bidHistory?.data?.length}
                    // socketManager={socketManager}
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                    setIsLoading={setIsLoading}
                    renderFooter={renderFooter}
                    router={router}
                    isSkeletonLoading={isSkeletonLoading}
                    setIsSkeletonLoading={setIsSkeletonLoading}
                    isLoading={isLoading}
                    inActive={isInActive}
                    // searchUrl={searchUrl}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default BidToBuy;
