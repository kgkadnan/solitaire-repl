'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import NewArrivalDataTable from './components/data-table';
import {
  RenderCarat,
  RenderDiscount,
  RenderDetails,
  RenderLab,
  RenderLotId,
  RednderLocation,
  RenderShape,
  RenderMeasurements,
  RenderTracerId,
  RenderNewArrivalPrice,
  RenderNewArrivalBidDiscount,
  RenderNewArrivalLotId
} from '@/components/v2/common/data-table/helpers/render-cell';
import Tooltip from '@/components/v2/common/tooltip';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { columnHeaders } from './constant';
import { SocketManager, useSocket } from '@/hooks/v2/socket-manager';
import CountdownTimer from './components/timer';
import { useGetBidHistoryQuery } from '@/features/api/dashboard';
import InvalidCreds from '../login/component/invalid-creds';
import { DialogComponent } from '@/components/v2/common/dialog';
import ActionButton from '@/components/v2/common/action-button';
import { MRT_RowSelectionState } from 'material-react-table';

const NewArrivals = () => {
  const { data: bidHistory } = useGetBidHistoryQuery({});
  console.log('saasas', bidHistory?.data);
  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      // ?.sort(({ sequence: a }: any, { sequence: b }: any) => a - b)
      .map(({ accessor, short_label, label }: any) => {
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',
          enableGrouping: accessor === 'shape',
          enableSorting: accessor !== 'shape_full' && accessor !== 'details',
          minSize: 5,
          maxSize: accessor === 'details' ? 100 : 200,
          size: 5,
          Header: ({ column }: any) => (
            <Tooltip
              tooltipTrigger={<span>{column.columnDef.header}</span>}
              tooltipContent={label}
              tooltipContentStyles={'z-[4]'}
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
          case 'carat':
            return { ...commonProps, Cell: RenderCarat };
          case 'discount':
            return { ...commonProps, Cell: RenderDiscount };
          case 'current_max_bid':
            return { ...commonProps, Cell: RenderNewArrivalBidDiscount };
          case 'details':
            return { ...commonProps, Cell: RenderDetails };
          case 'lab':
            return { ...commonProps, Cell: RenderLab };
          case 'location':
            return { ...commonProps, Cell: RednderLocation };
          case 'lot_id':
            return { ...commonProps, Cell: RenderNewArrivalLotId };

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

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const [rows, setRows] = useState<any>();
  const [activeBid, setActiveBid] = useState<any>();
  const [bid, setBid] = useState<any>();

  // const socketManager = new SocketManager();
  const socketManager = useMemo(() => new SocketManager(), []);

  useSocket(socketManager);

  const handleBidStones = useCallback((data: any) => {
    console.log(data, 'Bid stones data');
    setRows(data.bidStone); // Adjust according to your data structure
    setActiveBid(data.activeStone);
    setBid(data.bidStone);
    // Set other related state here
  }, []);
  const handleError = useCallback((data: any) => {
    console.log(data, 'i999');
    if (data) {
      modalSetState.setIsDialogOpen(true);
      modalSetState.setDialogContent(
        <InvalidCreds
          content={data}
          handleClick={() => modalSetState.setIsDialogOpen(false)}
          buttonText="Okay"
        />
      );
    }
  }, []);

  const handleBidPlaced = useCallback((data: any) => {
    console.log(data, 'placess');
    if (data?.status === 'success') {
      modalSetState.setIsDialogOpen(true);
      modalSetState.setDialogContent(
        <InvalidCreds
          content={data}
          handleClick={() => modalSetState.setIsDialogOpen(false)}
          buttonText="Okay"
          status="success"
        />
      );
    }
  }, []);
  const handleBidCanceled = useCallback((data: any) => {
    console.log(data, 'cancel');
    if (data?.status === 'success') {
      modalSetState.setIsDialogOpen(true);
      modalSetState.setDialogContent(
        <InvalidCreds
          content={data}
          handleClick={() => modalSetState.setIsDialogOpen(false)}
          buttonText="Okay"
          status="success"
        />
      );
    }
  }, []);
  useEffect(() => {
    socketManager.on('bid_stones', handleBidStones);
    socketManager.on('error', handleError);
    socketManager.on('bid_placed', handleBidPlaced);
    socketManager.on('bid_canceled', handleBidCanceled);

    const handleRequestGetBidStones = (data: any) => {
      console.log(data, '-----------------');
      socketManager.emit('get_bid_stones');
    };

    // Setting up the event listener for "request_get_bid_stones"
    // socketManager.on('request_get_bid_stones', handleRequestGetBidStones);
    // Return a cleanup function to remove the listeners
    return () => {
      socketManager.off('bid_stones', handleBidStones);
      socketManager.off('error', handleError);
      socketManager.off('request_get_bid_stones', handleRequestGetBidStones);
    };
  }, [socketManager, handleBidStones, handleError]);

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

  const renderFooter = () => {
    if (activeTab === 0 && bid?.length > 0) {
      return (
        <div className="flex items-center justify-end p-4">
          <div className="flex items-center gap-3">
            {isError && (
              <div>
                <span className="hidden  text-successMain" />
                <span
                  className={`text-mRegular font-medium text-dangerMain pl-[8px]`}
                >
                  {errorText}
                </span>
              </div>
            )}
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
        <div className="flex items-center justify-between p-4">
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
          <div className="flex items-center gap-3">
            {isError && (
              <div>
                <span className="hidden  text-successMain" />
                <span
                  className={`text-mRegular font-medium text-dangerMain pl-[8px]`}
                >
                  {errorText}
                </span>
              </div>
            )}
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: 'Clear All',
                  handler: () => {
                    setRowSelection({});
                  }
                },
                {
                  variant: 'primary',
                  label: 'Cancel Bid',
                  handler: () => {
                    socketManager.emit('cancel_bid', {
                      product_ids: Object.keys(rowSelection)
                    });
                  }
                }
              ]}
            />
          </div>
        </div>
      );
    } else if (activeTab === 2 && bidHistory?.data?.length > 0) {
      return (
        <div className="flex items-center justify-between p-4">
          <div className="flex gap-4">
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
          {isError && (
            <div>
              <span className="hidden  text-successMain" />
              <span
                className={`text-mRegular font-medium text-dangerMain pl-[8px]`}
              >
                {errorText}
              </span>
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="mb-[20px] relative">
      <DialogComponent
        dialogContent={modalState.dialogContent}
        isOpens={modalState.isDialogOpen}
        setIsOpen={modalSetState.setIsDialogOpen}
      />
      <div className="flex h-[81px] items-center justify-between">
        <p className="text-headingM font-medium text-neutral900">
          New Arrivals
        </p>
        <CountdownTimer
          initialHours={1}
          initialMinutes={40}
          initialSeconds={10}
        />
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
        {/* <div className="w-[450px]">
        
        </div> */}
        <div className="border-b-[1px] border-neutral200">
          {
            <NewArrivalDataTable
              columns={memoizedColumns}
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
              activeCount={activeBid?.length ?? 0}
              bidCount={bid?.length ?? 0}
              historyCount={bidHistory?.data?.length ?? 0}
              socketManager={socketManager}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
            />
          }
        </div>
        {renderFooter()}
      </div>
    </div>
  );
};
export default NewArrivals;
