'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Timer from './components/timer';
import NewArrivalDataTable from './components/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
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
  RenderNewArrivalBidDiscount
} from '@/components/v2/common/data-table/helpers/render-cell';
import Tooltip from '@/components/v2/common/tooltip';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { columnHeaders } from './constant';
import { SocketManager, useSocket } from '@/hooks/v2/socket-manager';
import CountdownTimer from './components/timer';

const NewArrivals = () => {
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
            return { ...commonProps, Cell: RenderLotId };

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
    // Handle error here
  }, []);

  console.log('000000000000000000', bid);
  useEffect(() => {
    socketManager.on('bid_stones', handleBidStones);
    socketManager.on('error', handleError);

    // Return a cleanup function to remove the listeners
    return () => {
      socketManager.off('bid_stones', handleBidStones);
      socketManager.off('error', handleError);
    };
  }, [socketManager, handleBidStones, handleError]);

  const memoizedColumns = useMemo(
    () => mapColumns(columnHeaders),
    [columnHeaders]
  );
  const { modalSetState } = useModalStateManagement();
  const { errorSetState } = useErrorStateManagement();

  const { setIsError, setErrorText, setInputError } = errorSetState;
  const [downloadExcel] = useDownloadExcelMutation();

  return (
    <div className="mb-[20px] relative">
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
              rows={bid ?? []}
            />
          }
        </div>
        {/* {activeTab!==2 && activeTab===0 ? rows?.bidStone.length>0 :  rows?.activeStone.length>0 && <p>lll</p>} */}
      </div>
    </div>
  );
};
export default NewArrivals;
