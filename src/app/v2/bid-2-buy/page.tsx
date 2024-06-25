'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import BidToByDataTable from './components/data-table';
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
  DiscountWithCross
} from '@/components/v2/common/data-table/helpers/render-cell';
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
  MRT_TablePagination
} from 'material-react-table';
import useUser from '@/lib/use-auth';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { useRouter, useSearchParams } from 'next/navigation';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import CommonPoppup from '../login/component/common-poppup';
import BiddingSkeleton from '@/components/v2/skeleton/bidding';

const BidToBuy = () => {
  const router = useRouter();

  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [validImages, setValidImages] = useState<any>([]);
  const pathName = useSearchParams().get('path');
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [checkStatus, setCheckStatus] = useState(false);

  const handleDetailPage = ({ row }: { row: any }) => {
    setIsDetailPage(true);
    setDetailPageData(row);
  };

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };

  const [bidHistory, setBidHistory] = useState<any>({});

  const [triggerBidToBuyHistory, { data: historyData }] =
    useLazyGetBidToBuyHistoryQuery({});
  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      .map(({ accessor, short_label, label }: any) => {
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
          enableGrouping: accessor === 'shape',
          enableSorting: false,
          minSize: 5,
          maxSize: accessor === 'details' ? 100 : 200,
          size: 5,
          Header: ({ column }: any) => (
            <Tooltip
              tooltipTrigger={<span>{column.columnDef.header}</span>}
              tooltipContent={label}
              tooltipContentStyles={'z-[1000]'}
            />
          )
        };

        switch (accessor) {
          case 'amount':
            return { ...commonProps, Cell: RenderNewArrivalPrice };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
          case 'shape_full':
            return { ...commonProps, Cell: RenderShape };
          case 'carats':
          case 'rap':
          case 'rap_value':
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

  const getBidToBuyHistoryData = () => {
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
    if (activeTab === 2) {
      getBidToBuyHistoryData();
    }
  }, [activeTab]);

  useEffect(() => {
    getBidToBuyHistoryData();
  }, []);

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
  const { authToken } = useUser();
  const socketManager = useMemo(() => new SocketManager(), []);
  useEffect(() => {
    if (authToken) useSocket(socketManager, authToken);
  }, [authToken]);
  const handleBidStones = useCallback((data: any) => {
    setCheckStatus(true);
    setActiveBid(data.activeStone);
    setBid(data.bidStone);
    setTime(data.endTime);
    if (data.activeStone) {
      data.activeStone.map((row: any) => {
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
    // Set other related state here
  }, []);
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
      socketManager.emit('get_bidtobuy_stones');
    };
    socketManager.on('bidtobuy_stones', handleBidStones);
    socketManager.on('error', handleError);
    socketManager.on('place_bidtobuy', handleBidPlaced);
    socketManager.on('cancel_bidtobuy', handleBidCanceled);

    // Setting up the event listener for "request_get_bid_stones"
    socketManager.on('request_get_bidtobuy_stones', handleRequestGetBidStones);

    // Return a cleanup function to remove the listeners
    return () => {
      socketManager.off('bidtobuy_stones', handleBidStones);
      socketManager.off('error', handleError);
      socketManager.off(
        'request_get_bidtobuy_stones',
        handleRequestGetBidStones
      );
    };
  }, [socketManager, handleBidStones, handleError, authToken]);

  const memoizedColumns = useMemo(
    () => mapColumns(columnHeaders),
    [columnHeaders]
  );
  const { modalState, modalSetState } = useModalStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const { setIsError, setErrorText } = errorSetState;
  const { isError, errorText } = errorState;

  const [downloadExcel] = useDownloadExcelMutation();

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
                              socketManager.emit('cancel_bidtobuy', {
                                product_ids: Object.keys(rowSelection)
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
      name: 'GIA Certificate',
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
      name: 'B2B Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      url_check: detailImageData?.assets_pre_check?.B2B_SPARKLE_CHECK,
      category: 'B2B Sparkle'
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
      loadImages(images, setValidImages, checkImage);
  }, [detailImageData]);

  useEffect(() => {
    if (!validImages.length && images[0].name.length) {
      setValidImages([
        {
          name: 'No Data Found',
          url: ''
        }
      ]);
    }
  }, [validImages]);

  return (
    <div className="mb-[4px] relative">
      {isLoading && <CustomKGKLoader />}
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}
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
      />

      {isDetailPage ? (
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
            fromBid={true}
            breadCrumLabel={'Bid to Buy'}
            modalSetState={modalSetState}
            setIsLoading={setIsLoading}
            activeTab={activeTab}
          />
        </>
      ) : bid === undefined ||
        historyData === undefined ||
        activeBid === undefined ? (
        <BiddingSkeleton />
      ) : (
        <>
          <div className="flex  py-[4px] items-center justify-between">
            <div className="flex gap-3 items-center">
              <p className="text-lMedium font-medium text-neutral900">
                Bid to Buy
              </p>
              {checkStatus ? (
                time && time?.length ? (
                  <div className="text-successMain text-lMedium font-medium">
                    ACTIVE
                  </div>
                ) : (
                  <div className="text-visRed text-lMedium font-medium">
                    INACTIVE
                  </div>
                )
              ) : (
                ''
              )}
            </div>

            <div className="h-[38px]">
              {timeDifference !== null && timeDifference >= 0 && (
                <CountdownTimer
                  initialHours={Math.floor(timeDifference / (1000 * 60 * 60))}
                  initialMinutes={Math.floor(
                    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
                  )}
                  initialSeconds={Math.floor(
                    (timeDifference % (1000 * 60)) / 1000
                  )}
                />
              )}
            </div>
          </div>
          <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
            <div className="border-b-[1px] border-neutral200">
              {
                <BidToByDataTable
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
                  historyCount={bidHistory?.data?.length}
                  socketManager={socketManager}
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                  setIsLoading={setIsLoading}
                  renderFooter={renderFooter}
                  router={router}
                />
              }
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default BidToBuy;
