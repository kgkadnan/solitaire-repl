/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import LinkSvg from '@public/v2/assets/icons/detail-page/link.svg?url';
import ExportExcel from '@public/v2/assets/icons/detail-page/export-excel.svg?url';
import NoImageFound from '@public/v2/assets/icons/compare-stone/fallback.svg';
import styles from '../../search/result/components/compare.module.scss';
import CloseButton from '@public/v2/assets/icons/close.svg';

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

import { HOLD_STATUS, MEMO_STATUS } from '@/constants/business-logic';
// import ShowPopups from './components/popup';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
import { kycStatus } from '@/constants/enums/kyc';
import { formatNumber } from '@/utils/fix-two-digit-number';

import { Skeleton } from '@mui/material';
import { useLazyTrackCopyUrlEventQuery } from '@/features/api/track-public-url-copy';

import { useRouter } from 'next/navigation';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import ResponsiveTable from '@/components/v2/common/detail-page/components/CommonTable';
import { IImagesType } from '@/components/v2/common/detail-page/interface';
import Share from '@/components/v2/common/copy-and-share/share';
import Tooltip from '@/components/v2/common/tooltip';
import ImagePreview from '@/components/v2/common/detail-page/components/image-preiview';
import DetailPageTabs from '@/components/v2/common/detail-page/components/tabs';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import {
  IManageListingSequenceResponse,
  IProduct
} from '../../search/interface';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import CheckboxComponent from '@/components/v2/common/checkbox';
import { useCheckboxStateManagement } from '@/components/v2/common/checkbox/hooks/checkbox-state-management';
import { MINIMUM_STONES } from '@/constants/error-messages/compare-stone';
import Media from '@public/v2/assets/icons/data-table/Media.svg';

export function MatchPairDetails({
  data,
  filterData,
  goBackToListView,
  // handleDetailPage,
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
  const router = useRouter();

  const [tableData, setTableData] = useState<any>([]);
  const [activePreviewTab, setActivePreviewTab] = useState('Image');
  const [imageIndex, setImageIndex] = useState<number>(0);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [validImages, setValidImages] = useState<IImagesType[]>([]);
  const { errorSetState } = useErrorStateManagement();

  const { setIsError, setErrorText } = errorSetState;

  const [showToast, setShowToast] = useState(false);
  const [downloadExcel] = useDownloadExcelMutation();
  const [trackCopyUrlEvent] = useLazyTrackCopyUrlEventQuery({});
  const [originalData, setOriginalData] = useState([]);
  const [mappingColumn, setMappingColumn] = useState<any>({});
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { selectedCheckboxes } = checkboxState;
  const { setSelectedCheckboxes } = checkboxSetState;
  const [triggerColumn] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await triggerColumn({});
      console.log(response, 'columnData');
      updateState(response);
    };
    fetchData();
  }, []);
  function updateState(column: any) {
    const updatedObj: any = { ...mappingColumn }; // Create a copy of newObj
    column?.forEach((obj: any) => {
      // Check if the key already exists in updatedObj
      if (!(obj.accessor in updatedObj)) {
        updatedObj[obj.accessor] = obj.short_label; // Use the dynamic key to update the object
      }
    });
    setMappingColumn(updatedObj); // Update the state with the updated object
  }
  useEffect(() => {
    const result = data.filter((subArray: any) =>
      subArray.some((obj: any) => obj.lot_id === filterData.lot_id)
    );
    console.log('------------', result);
    setOriginalData(result);
  }, [filterData, data]);
  useEffect(() => {
    let copyData = filterData ? { ...filterData } : {};

    if (copyData) {
      copyData['measurement'] = `${copyData?.length ?? 0}*${
        copyData?.width ?? 0
      }*${copyData?.depth ?? 0}`;
      copyData['shape'] = getShapeDisplayName(copyData?.shape ?? '');
    }

    setTableData(copyData);
  }, [filterData, data]);

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
      url: `${FILE_URLS.IMG.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.IMG.replace('***', tableData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'GIA Certificate',
      url: `${FILE_URLS.CERT_FILE.replace(
        '***',
        tableData?.certificate_number ?? ''
      )}`,
      category: 'Certificate',
      downloadUrl: tableData?.assets_pre_check?.CERT_FILE
        ? tableData?.certificate_url
        : '',
      url_check: tableData?.assets_pre_check?.CERT_IMG
    },
    {
      name: 'Video',
      url: `${FILE_URLS.B2B.replace('***', tableData?.lot_id ?? '')}`,
      url_check: tableData?.assets_pre_check?.B2B_CHECK,
      category: 'Video'
    },
    {
      name: 'B2B Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace('***', tableData?.lot_id ?? '')}`,
      url_check: tableData?.assets_pre_check?.B2B_SPARKLE_CHECK,
      category: 'B2B Sparkle'
    },

    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.HEART.replace('***', tableData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.ARROW.replace('***', tableData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.ASET.replace('***', tableData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.IDEAL.replace('***', tableData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        tableData?.lot_id ?? ''
      )}`,
      category: 'Image'
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
          url: ''
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
    trackCopyUrlEvent({ url: filterData?.public_url.split('/').pop() });
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
      router,
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
  const handleImageError = (event: any) => {
    event.target.src = NoImageFound.src; // Set the fallback image when the original image fails to load
  };
  const handleClick = (id: string) => {
    let updatedIsCheck = [...selectedCheckboxes];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter(item => item !== id);
    } else {
      updatedIsCheck.push(id);
    }
    setSelectedCheckboxes(updatedIsCheck);
    setIsError(false);
  };
  type HandleCloseType = (_event: React.MouseEvent, _id: string) => void;

  const handleClose: HandleCloseType = (event, id) => {
    const filterData = originalData.filter((item: IProduct) => item.id !== id);
    // setCompareStoneData(filterData);
    console.log(filterData, 'filterData');
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
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={34}
              variant="rectangular"
              animation="wave"
              className="rounded-[4px]"
            />
          )}
        </div>
      </div>
      <div className="xl:flex pt-[16px] pl-[16px]">
        <div className={`flex xl:w-[40%] `}>
          <div className={`mr-5 flex flex-col gap-[16px]`}>
            <DetailPageTabs
              validImages={validImages}
              setActivePreviewTab={setActivePreviewTab}
              activePreviewTab={activePreviewTab}
              setImageIndex={setImageIndex}
            />
            <div
              className={`xl:overflow-y-auto ${
                isNudge &&
                (isKycVerified?.customer?.kyc?.status ===
                  kycStatus.INPROGRESS ||
                  isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
                  ? 'xl:h-[calc(65vh-60px)]'
                  : 'xl:h-[65vh]'
              }`}
            >
              <ImagePreview
                imageIndex={imageIndex}
                setImageIndex={setImageIndex}
                images={validImages}
                setIsLoading={setIsLoading}
                activePreviewTab={activePreviewTab}
              />
            </div>
          </div>
        </div>

        <div
          className={`xl:w-[60%]  mb-[12px] scroll-adjust-custom xl:overflow-y-scroll ${
            isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
              ? 'xl:h-[calc(70vh-60px)]'
              : 'xl:h-[70vh]'
          }`}
        >
          <div className="flex xl:justify-start  xl:justify-between mt-4 xl:mt-0 xl:w-full">
            {validImages.length > 0 ? (
              <p
                className="text-[28px] text-[#344054] font-medium mr-5 "
                style={{ alignSelf: 'center' }}
              >
                Stock No: {tableData?.lot_id ?? '-'}
              </p>
            ) : (
              <Skeleton
                width={284}
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={42}
                variant="rectangular"
                animation="wave"
                className="rounded-[4px]"
              />
            )}

            <div className="flex w-[22%] xl:w-[40%] justify-center xl:justify-end mr-[10px] items-center">
              <div className="flex gap-3 items-center">
                <Tooltip
                  tooltipTrigger={
                    <button
                      onClick={handleDownloadExcel}
                      className={`rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm ${'bg-neutral0'}`}
                    >
                      <ExportExcel className={`${'stroke-neutral900'}`} />
                    </button>
                  }
                  tooltipContent={'Download Excel'}
                  tooltipContentStyles={'z-[1000]'}
                />

                <Tooltip
                  tooltipTrigger={
                    <button
                      onClick={copyLink}
                      className={`rounded-[4px] hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm ${'bg-neutral0'}`}
                    >
                      <LinkSvg
                        className={`${'stroke-neutral900 stroke-[1.5]'}`}
                      />
                    </button>
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
                    shareTrackIdentifier="Details"
                  />
                </div>
              </div>
              {/* <div className="border-r-[1px] h-[40px] border-neutral200"></div> */}
              {/* <div className="flex gap-3 items-center relative justify-center"> */}
              {/* Backward Arrow */}
              {/* <button
                  className={`relative group  h-[35px] w-[37px] shadow-sm flex items-center justify-center rounded-[4px] hover:bg-neutral50 border-[1px] border-neutral-200 ${
                    currentIndex <= 0 ? 'bg-neutral50' : 'bg-neutral0 '
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

                  {currentIndex > 0 && (
                    <ShowPopups
                      data={data}
                      currentIndex={currentIndex - 1}
                      fromBid={fromBid}
                    />
                  )}
                </button> */}

              {/* Forward Arrow */}
              {/* <button
                  className={`relative group  h-[35px] w-[37px] shadow-sm flex items-center justify-center rounded-[4px] hover:bg-neutral50 border-[1px] border-neutral200 ${
                    currentIndex >= data.length - 1
                      ? 'bg-neutral50'
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


                  {currentIndex < data.length - 1 && (
                    <ShowPopups
                      data={data}
                      currentIndex={currentIndex + 1}
                      fromBid={fromBid}
                    />
                  )}
                </button> */}
              {/* </div> */}
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
                            formatNumberWithCommas(
                              tableData?.variants[0]?.prices[0]?.amount
                            ) ?? ''
                          }`
                        : ''
                      : tableData?.amount
                      ? `$${formatNumberWithCommas(tableData?.amount) ?? ''}`
                      : ''}
                  </div>
                  <p
                    className={`text-successMain text-mMedium px-[8px] py-[2px] rounded-[4px]`}
                  >
                    {fromBid
                      ? tableData.original_discount !== null &&
                        tableData.original_discount !== undefined
                        ? tableData.original_discount === 0
                          ? '0.00%'
                          : formatNumber(tableData.original_discount) + '%'
                        : ''
                      : tableData.discount !== null &&
                        tableData.discount !== undefined
                      ? tableData.discount === 0
                        ? '0.00%'
                        : formatNumber(tableData.discount) + '%'
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
                sx={{ bgcolor: 'var(--neutral-200)' }}
                className="rounded-[4px]"
                variant="rectangular"
                animation="wave"
              />
            )}
          </div>
          <div className="pt-8 max-w-[100%] pr-[10px]">
            {validImages.length > 0 ? (
              <div className="sm:text-[14px] xl:text-[16px] text-[#344054]  font-medium">
                Price Details
              </div>
            ) : (
              <Skeleton
                width={100}
                sx={{ bgcolor: 'var(--neutral-200)' }}
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
              <div className="sm:text-[14px] xl:text-[16px] text-[#344054]  font-medium">
                Basic Details
              </div>
            ) : (
              <Skeleton
                width={100}
                sx={{ bgcolor: 'var(--neutral-200)' }}
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
              <div className="sm:text-[14px] xl:text-[16px]  font-medium text-[#344054]">
                Measurements
              </div>
            ) : (
              <Skeleton
                width={100}
                height={25}
                sx={{ bgcolor: 'var(--neutral-200)' }}
                className="rounded-[4px]"
                variant="rectangular"
                animation="wave"
              />
            )}

            {displayTable(mesurementsDetails)}
          </div>

          <div className="mt-6 max-w-[100%] pr-[10px]">
            {validImages.length > 0 ? (
              <div className="sm:text-[14px] xl:text-[16px] font-medium text-[#344054]">
                Inclusion Details
              </div>
            ) : (
              <Skeleton
                width={100}
                height={25}
                sx={{ bgcolor: 'var(--neutral-200)' }}
                className="rounded-[4px]"
                variant="rectangular"
                animation="wave"
              />
            )}

            {displayTable(inclusionDetails)}
          </div>

          <div className="mt-6 max-w-[100%] pr-[10px] mb-5">
            {validImages.length > 0 ? (
              <div className="sm:text-[14px] xl:text-[16px] font-medium text-[#344054]">
                Other Information
              </div>
            ) : (
              <Skeleton
                width={100}
                height={25}
                sx={{ bgcolor: 'var(--neutral-200)' }}
                className="rounded-[4px]"
                variant="rectangular"
                animation="wave"
              />
            )}

            {displayTable(otherInformationDetails)}
          </div>
        </div>
      </div>
      <div className="flex  h-[calc(100%-120px)] overflow-auto border-t-[1px] border-b-[1px] border-neutral200">
        <div className="flex ">
          <div
            className="sticky left-0  min-h-[2080px] text-neutral700 text-mMedium font-medium w-[150px] !z-5"
            style={{ zIndex: 5 }}
          >
            <div className="h-[234px] sticky top-0  items-center flex px-4 border-[0.5px] border-neutral200 bg-neutral50">
              Media
            </div>
            <div className=" flex flex-col">
              {Object.keys(mappingColumn).map(key => (
                <div
                  key={key}
                  className="py-2 px-4 border-[1px] border-neutral200 h-[38px] bg-neutral50"
                >
                  {key !== 'id' && mappingColumn[key]}
                </div>
              ))}
            </div>
          </div>
          <div className=" bg-neutral0 text-neutral900 text-mMedium font-medium min-h-[2080px] !z-2">
            <div className="flex h-[234px] sticky top-0 ">
              {originalData !== undefined &&
                originalData.length > 0 &&
                originalData.map((items: IProduct) => (
                  <div key={items.id} className="w-[198px]">
                    <div
                      className={`h-[234px] flex flex-col border-[0.5px] border-neutral200 bg-neutral0 p-2 gap-[10px]`}
                    >
                      <div className="w-[180px] h-[175px]">
                        <img
                          // className="!h-[175px] !w-[180px]"
                          src={`${FILE_URLS.IMG.replace(
                            '***',
                            items?.lot_id ?? ''
                          )}`}
                          alt="Diamond Image"
                          width={180}
                          height={175}
                          onClick={
                            () => {}
                            // handleCheckboxClick(items.id)
                          }
                          onError={e => {
                            handleImageError(e);
                          }}
                        />
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <CheckboxComponent
                            onClick={() => handleClick(items.id)}
                            data-testid={'compare stone checkbox'}
                            isChecked={
                              selectedCheckboxes.includes(items.id) || false
                            }
                          />
                        </div>
                        <div>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              // handleDetailImage({ row: items });
                            }}
                          >
                            <Image src={Media} alt="Media" />
                          </button>
                        </div>
                        <div
                          className={`${styles.closeButton} cursor-pointer`}
                          data-testid={'Remove Stone'}
                          onClick={event =>
                            originalData.length > 2
                              ? handleClose(event, items.id)
                              : (setIsError(true), setErrorText(MINIMUM_STONES))
                          }
                        >
                          <Image
                            src={CloseButton}
                            alt="Preview"
                            height={24}
                            width={24}
                          />

                          {/* <CloseButton /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={`flex `}>
              {originalData.map((diamond: any) => (
                <div className={`w-[198px] `} key={diamond.id}>
                  {Object.keys(mappingColumn).map(key => (
                    <div
                      key={key}
                      className="py-2 px-4 border-[1px] border-neutral200 h-[38px] whitespace-nowrap overflow-hidden overflow-ellipsis  bg-neutral0"
                    >
                      {key !== 'id' ? diamond[key] || '-' : ''}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
