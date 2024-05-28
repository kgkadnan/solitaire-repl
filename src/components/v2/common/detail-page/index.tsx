/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import linkSvg from '@public/v2/assets/icons/detail-page/link.svg';
import downloadImg from '@public/v2/assets/icons/detail-page/download.svg';
import forwardArrow from '@public/v2/assets/icons/detail-page/forward-arrow.svg';
import backwardArrow from '@public/v2/assets/icons/detail-page/back-ward-arrow.svg';

export interface ITableColumn {
  key: string;
  label: string;
  hiddenBelow1024?: boolean;
  hiddenAbove1024?: boolean;
}

import Image from 'next/image';

import {
  FILE_URLS,
  basicDetails,
  inclusionDetails,
  mesurementsDetails,
  otherInformationDetails,
  priceDetails,
  priceDetailsForBid
} from '@/constants/v2/detail-page';
import { Toast } from '../copy-and-share/toast';
import Tooltip from '../tooltip';
import ImageSlider from './components/image-slider';
import ImageList from './components/image-list';
import ImagePreview from './components/image-preiview';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import ResponsiveTable from './components/CommonTable';
import { HOLD_STATUS, MEMO_STATUS } from '@/constants/business-logic';
import ShowPopups from './components/popup';
import Share from '../copy-and-share/share';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
import { kycStatus } from '@/constants/enums/kyc';
import { formatNumber } from '@/utils/fix-two-digit-number';
import { loadImages } from './helpers/load-images';
import { checkImage } from './helpers/check-image';
import { IImagesType } from './interface';
import fallbackImage from '@public/v2/assets/icons/not-found.svg';
import { Skeleton } from '@mui/material';

export function DiamondDetailsComponent({
  data,
  filterData,
  goBackToListView,
  handleDetailPage,
  breadCrumLabel,
  modalSetState,
  setIsLoading,
  activeTab,
  fromBid
}: {
  data: any;
  filterData: any;
  goBackToListView: any;
  handleDetailPage: any;
  breadCrumLabel: string;
  modalSetState?: any;
  setIsLoading?: any;
  activeTab?: number;
  fromBid?: boolean;
}) {
  const [tableData, setTableData] = useState<any>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [validImages, setValidImages] = useState<IImagesType[]>([]);
  const { errorSetState } = useErrorStateManagement();

  const { setIsError, setErrorText } = errorSetState;

  const [showToast, setShowToast] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [downloadExcel] = useDownloadExcelMutation();

  useEffect(() => {
    let copyData = filterData ? { ...filterData } : {};

    if (copyData) {
      copyData['measurement'] = `${copyData?.length ?? 0}*${
        copyData?.width ?? 0
      }*${copyData?.height ?? 0}`;
      copyData['shape'] = getShapeDisplayName(copyData?.shape ?? '');
    }

    setTableData(copyData);
  }, [filterData, data]);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const displayTable = (tableHeadArray: any) => {
    return (
      <div>
        {tableHeadArray.map((item: ITableColumn[], index: any) => (
          <div key={`item-${index}`} className="mt-4">
            <ResponsiveTable
              tableHead={item}
              tableData={[tableData]}
              validImages={validImages}
            />
          </div>
        ))}
      </div>
    );
  };
  const images = [
    {
      name: getShapeDisplayName(tableData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace('***', tableData?.lot_id ?? '')}`
    },
    {
      name: 'GIA Certificate',
      url: `${tableData?.certificate_url}`,
      showDivider: true
    },
    {
      name: 'B2B',
      url: `${FILE_URLS.B2B.replace('***', tableData?.lot_id ?? '')}`,
      url_check: `${FILE_URLS.B2B_CHECK.replace(
        '***',
        tableData?.lot_id ?? ''
      )}`
    },
    {
      name: 'B2B Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace('***', tableData?.lot_id ?? '')}`,
      url_check: `${FILE_URLS.B2B_SPARKLE_CHECK.replace(
        '***',
        tableData?.lot_id ?? ''
      )}`,
      showDivider: true
    },

    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace('***', tableData?.lot_id ?? '')}`
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace('***', tableData?.lot_id ?? '')}`
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace('***', tableData?.lot_id ?? '')}`
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace('***', tableData?.lot_id ?? '')}`
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace('***', tableData?.lot_id ?? '')}`,
      showDivider: true
    }
  ];

  useEffect(() => {
    if (images.length > 0 && images[0].name.length)
      loadImages(images, setValidImages, checkImage);
  }, [tableData?.lot_id, tableData?.certificate_url]);

  useEffect(() => {
    if (!validImages.length && images[0].name.length) {
      setValidImages([
        {
          name: 'No Data Found',
          url: fallbackImage,
          showDivider: true
        }
      ]);
    }
  }, [validImages]);

  const copyLink = () => {
    const link = `${process.env.NEXT_PUBLIC_DNA_URL}${filterData?.public_url
      .split('/')
      .pop()}`;
    navigator.clipboard.writeText(link).then(() => {
      setShowToast(true); // Show the toast notification
      setTimeout(() => {
        setShowToast(false); // Hide the toast notification after some time
      }, 4000);
    });
  };
  let statusValue = '';
  const RenderNewArrivalLotId = ({ tableData }: any) => {
    let statusClass = '';
    let borderClass = '';

    if (tableData.diamond_status === MEMO_STATUS) {
      statusClass = 'bg-legendMemoFill text-legendMemo';
      borderClass = 'border-lengendMemoBorder';
      statusValue = 'Memo';
    } else if (tableData.diamond_status === HOLD_STATUS) {
      statusClass = 'bg-legendHoldFill  text-legendHold';

      borderClass = 'border-lengendHoldBorder';
      statusValue = 'Hold';
    } else if (tableData?.in_cart && Object.keys(tableData.in_cart).length) {
      statusClass = 'bg-legendInCartFill text-legendInCart';
      borderClass = 'border-lengendInCardBorder';
      statusValue = 'InCart';
    }
    return (
      <>
        {statusValue.length > 0 && (
          <span
            className={`rounded-[4px] ${statusClass} border-[1px] px-[8px] py-[3px] ${borderClass}`}
          >
            {statusValue}
          </span>
        )}
      </>
    );
  };
  const handleDownloadExcel = () => {
    downloadExcelHandler({
      products: [filterData.id],
      downloadExcelApi: downloadExcel,
      modalSetState,
      setIsLoading: setIsLoading,
      [activeTab === 2
        ? breadCrumLabel === 'Bid to Buy'
          ? 'fromBidToBuyHistory'
          : breadCrumLabel === 'New Arrival'
          ? 'fromNewArrivalBidHistory'
          : ''
        : breadCrumLabel === 'Bid to Buy'
        ? 'fromBidToBuy'
        : breadCrumLabel === 'New Arrival'
        ? 'fromNewArrivalBid'
        : '']: true
    });
  };
  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  return (
    <div className="text-black bg-white rounded-[8px]">
      <Toast show={showToast} message="Copied Successfully" />
      <div className="flex items-center">
        <Image
          src={backWardArrow}
          alt="backWardArrow"
          onClick={() => {
            goBackToListView!();
          }}
          className="cursor-pointer"
        />
        <div className="flex gap-[8px] items-center">
          <button
            className="text-neutral600 text-sMedium font-regular cursor-pointer"
            onClick={() => {
              goBackToListView!();
            }}
          >
            {breadCrumLabel}
          </button>
          <span className="text-neutral600">/</span>

          {validImages.length > 0 ? (
            <p className="text-neutral700 p-[8px] bg-neutral100 rounded-[4px] text-sMedium font-medium">
              Stock No:{tableData.lot_id}
            </p>
          ) : (
            <Skeleton
              width={134}
              height={34}
              variant="rectangular"
              animation="wave"
              className="rounded-[4px]"
            />
          )}
        </div>
      </div>
      <div className="2xl:flex pt-5">
        <div
          className={`flex ${
            isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
              ? '2xl:h-[calc(70vh-60px)]'
              : '2xl:h-[70vh]'
          }`}
        >
          <div className="w-full 2xl:hidden">
            <ImageSlider images={validImages} setIsLoading={setIsLoading} />
          </div>
          <div
            className={`hidden 2xl:block mr-5 ${
              isNudge &&
              (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
                isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
                ? 'h-[calc(70vh-60px)]'
                : 'h-[70vh]'
            } overflow-y-scroll`}
          >
            <ImageList
              images={validImages}
              selectedImageIndex={selectedImageIndex}
              onImageClick={handleImageClick}
            />
          </div>
          <div className="hidden 2xl:block">
            <ImagePreview
              images={validImages}
              selectedImageIndex={selectedImageIndex}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
        <div
          className={`2xl:w-2/3 2xl:ml-10 mb-[12px] scroll-adjust-custom 2xl:overflow-y-scroll ${
            isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
              ? '2xl:h-[calc(70vh-60px)]'
              : '2xl:h-[70vh]'
          }`}
        >
          <div className="flex 2xl:justify-start  2xl:justify-between mt-4 2xl:mt-0 2xl:w-full">
            {validImages.length > 0 ? (
              <p
                className="sm:text-[22px] 2xl:text-[28px] text-[#344054] font-medium mr-5 "
                style={{ alignSelf: 'center' }}
              >
                Stock No: {tableData?.lot_id ?? '-'}
              </p>
            ) : (
              <Skeleton
                width={284}
                height={42}
                variant="rectangular"
                animation="wave"
                className="rounded-[4px]"
              />
            )}

            <div className="flex lg:w-[30%]  2xl:w-[40%] justify-around items-center">
              <div className="flex gap-3 items-center">
                <Tooltip
                  tooltipTrigger={
                    <Image
                      className="cursor-pointer"
                      src={downloadImg}
                      alt={'Download'}
                      height={40}
                      width={40}
                      onClick={handleDownloadExcel}
                    />
                  }
                  tooltipContent={'Download Excel'}
                  tooltipContentStyles={'z-[1000]'}
                />

                <Tooltip
                  tooltipTrigger={
                    <Image
                      className="cursor-pointer"
                      src={linkSvg}
                      alt={'media'}
                      height={40}
                      width={40}
                      onClick={copyLink}
                    />
                  }
                  tooltipContent={'Media Link'}
                  tooltipContentStyles={'z-[1000]'}
                />

                <div className="w-[38px] h-[38px]">
                  <Share
                    rows={data}
                    selectedProducts={{ [filterData.id]: true }}
                    setIsError={setIsError}
                    setErrorText={setErrorText}
                    activeTab={activeTab}
                    identifier={breadCrumLabel}
                  />
                </div>
              </div>
              <div className="border-r-[1px] h-[40px] border-neutral-200"></div>
              <div className="flex gap-3 items-center relative justify-center">
                {/* Backward Arrow */}
                <button
                  className={`relative group  h-[35px] w-[37px] shadow-sm flex items-center justify-center rounded-[4px] hover:bg-neutral-50 border-[1px] border-neutral-200 ${
                    currentIndex <= 0 ? 'bg-neutral-50' : 'bg-neutral0 '
                  } `}
                  disabled={currentIndex <= 0}
                  onClick={() => {
                    setCurrentIndex(prev => prev - 1);
                    handleDetailPage({ row: data[currentIndex - 1] });
                  }}
                >
                  <Image
                    className="cursor-pointer"
                    src={backwardArrow}
                    alt={'backWardArrow'}
                  />

                  {/* Additional content for backward arrow */}
                  {currentIndex > 0 && (
                    <ShowPopups
                      data={data}
                      currentIndex={currentIndex - 1}
                      fromBid={fromBid}
                    />
                  )}
                </button>

                {/* Forward Arrow */}
                <button
                  className={`relative group  h-[35px] w-[37px] shadow-sm flex items-center justify-center rounded-[4px] hover:bg-neutral-50 border-[1px] border-neutral-200 ${
                    currentIndex >= data.length - 1
                      ? 'bg-neutral-50'
                      : 'bg-neutral0'
                  }`}
                  disabled={currentIndex >= data.length - 1}
                  onClick={() => {
                    setCurrentIndex(prev => prev + 1);
                    handleDetailPage({ row: data[currentIndex + 1] });
                  }}
                >
                  <Image
                    className="cursor-pointer"
                    src={forwardArrow}
                    alt={'forwardArrow'}
                  />

                  {/* Additional content for forward arrow */}

                  {currentIndex < data.length - 1 && (
                    <ShowPopups
                      data={data}
                      currentIndex={currentIndex + 1}
                      fromBid={fromBid}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4">
            {validImages.length > 0 ? (
              <>
                <div className="flex items-center">
                  <div className="text-headingS font-medium text-neutral-900 ">
                    {tableData?.variants?.length > 0
                      ? tableData?.variants[0]?.prices[0]?.amount
                        ? `$${
                            formatNumber(
                              tableData?.variants[0]?.prices[0]?.amount
                            ) ?? ''
                          }`
                        : ''
                      : tableData?.amount
                      ? `$${formatNumber(tableData?.amount) ?? ''}`
                      : ''}
                  </div>
                  <p
                    className={`text-successMain text-mMedium px-[8px] py-[2px] rounded-[4px]`}
                  >
                    {fromBid
                      ? tableData.length > 0 &&
                        tableData.original_discount + '%'
                      : tableData?.variants?.length > 0
                      ? tableData?.variants[0]?.prices[0]?.amount
                        ? tableData.length > 0 && tableData.discount + '%'
                        : ''
                      : ''}
                  </p>
                </div>
                {statusValue.length > 0 && (
                  <div className="border-r-[1px] border-neutral-200 h-[20px]"></div>
                )}
                {RenderNewArrivalLotId({ tableData })}
              </>
            ) : (
              <Skeleton
                width={150}
                height={30}
                className="rounded-[4px]"
                variant="rectangular"
                animation="wave"
              />
            )}
          </div>
          <div className="pt-8 max-w-[100%] pr-[10px]">
            {validImages.length > 0 ? (
              <div className="sm:text-[14px] 2xl:text-[16px] text-[#344054]  font-medium">
                Price Details
              </div>
            ) : (
              <Skeleton
                width={100}
                height={25}
                className="rounded-[4px]"
                variant="rectangular"
                animation="wave"
              />
            )}

            {displayTable(fromBid ? priceDetailsForBid : priceDetails)}
          </div>
          <div className="pt-8 max-w-[100%] pr-[10px]">
            {validImages.length > 0 ? (
              <div className="sm:text-[14px] 2xl:text-[16px] text-[#344054]  font-medium">
                Basic Details
              </div>
            ) : (
              <Skeleton
                width={100}
                height={25}
                className="rounded-[4px]"
                variant="rectangular"
                animation="wave"
              />
            )}

            {displayTable(basicDetails)}
          </div>

          <div className="mt-6 max-w-[100%] pr-[10px]">
            {validImages.length > 0 ? (
              <div className="sm:text-[14px] 2xl:text-[16px]  font-medium text-[#344054]">
                Measurements
              </div>
            ) : (
              <Skeleton
                width={100}
                height={25}
                className="rounded-[4px]"
                variant="rectangular"
                animation="wave"
              />
            )}

            {displayTable(mesurementsDetails)}
          </div>

          <div className="mt-6 max-w-[100%] pr-[10px]">
            {validImages.length > 0 ? (
              <div className="sm:text-[14px] 2xl:text-[16px] font-medium text-[#344054]">
                Inclusion Details
              </div>
            ) : (
              <Skeleton
                width={100}
                height={25}
                className="rounded-[4px]"
                variant="rectangular"
                animation="wave"
              />
            )}

            {displayTable(inclusionDetails)}
          </div>

          <div className="mt-6 max-w-[100%] pr-[10px] mb-5">
            {validImages.length > 0 ? (
              <div className="sm:text-[14px] 2xl:text-[16px] font-medium text-[#344054]">
                Other Information
              </div>
            ) : (
              <Skeleton
                width={100}
                height={25}
                className="rounded-[4px]"
                variant="rectangular"
                animation="wave"
              />
            )}

            {displayTable(otherInformationDetails)}
          </div>
        </div>
      </div>
    </div>
  );
}
