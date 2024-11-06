/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import ExportExcel from '@public/v2/assets/icons/detail-page/export-excel.svg?url';
import NoImageFound from '@public/v2/assets/icons/compare-stone/fallback.svg';
import styles from '../../search/result/components/compare.module.scss';
import CloseButton from '@public/v2/assets/icons/close.svg';
import Image from 'next/image';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { HOLD_STATUS, MEMO_STATUS } from '@/constants/business-logic';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
// import { kycStatus } from '@/constants/enums/kyc';

import { Skeleton } from '@mui/material';

import { useRouter } from 'next/navigation';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import Share from '@/components/v2/common/copy-and-share/share';
import Tooltip from '@/components/v2/common/tooltip';
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
import Media from '@public/v2/assets/icons/detail-page/expand.svg?url';
import DownloadImg from '@public/v2/assets/icons/detail-page/download.svg?url';
import forwardArrow from '@public/v2/assets/icons/arrow-forward.svg';
import backwardArrow from '@public/v2/assets/icons/arrow-backword.svg';
import backWardArrowDisable from '@public/v2/assets/icons/detail-page/back-ward-arrow-disable.svg';
import forWardAarrowDisable from '@public/v2/assets/icons/detail-page/forward-arrow-disable.svg';
import { handleDownloadImage } from '@/utils/v2/detail-page';
import { useLazyGetSimilarMatchingPairQuery } from '@/features/api/match-pair';
// import logger from 'logging/log-util';
import { formatNumber } from '@/utils/fix-two-digit-number';
import MatchPairDnaSkeleton from '@/components/v2/skeleton/match-pair/match-pair-dna-page';
import { RednderLocation } from '@/components/v2/common/data-table/helpers/render-cell';
import { SELECT_STONES } from '@/constants/error-messages/cart';

export interface ITableColumn {
  key: string;
  label: string;
  hiddenBelow1024?: boolean;
  hiddenAbove1024?: boolean;
}

export function MatchPairDetails({
  data,
  filterData,
  goBackToListView,
  breadCrumLabel,
  modalSetState,
  setIsLoading,
  handleDetailImage,
  setRowSelection,
  setSimilarData,
  similarData,
  rowSelection,
  setActivePreviewTab,
  activePreviewTab,
  setImageIndex,
  imageIndex,
  setIsDiamondDetailLoading,
  activeTab
}: {
  data: any;
  filterData: any;
  goBackToListView: any;
  breadCrumLabel: string;
  modalSetState?: any;
  setIsLoading?: any;
  handleDetailImage: any;
  setRowSelection: any;
  setSimilarData: any;
  similarData: any;
  rowSelection: any;
  setActivePreviewTab: any;
  activePreviewTab: any;
  setImageIndex: any;
  imageIndex: any;
  activeTab: any;
  setIsDiamondDetailLoading?: any;
}) {
  const router = useRouter();

  // const [currentIndex, setCurrentIndex] = useState(0);
  const [validImages, setValidImages] = useState<any>([]);
  const { errorState, errorSetState } = useErrorStateManagement();

  const { setIsError, setErrorText } = errorSetState;
  const { errorText } = errorState;

  const [showToast, setShowToast] = useState(false);
  const [downloadExcel] = useDownloadExcelMutation();
  const [originalData, setOriginalData] = useState<any>([]);
  const [mappingColumn, setMappingColumn] = useState<any>({});
  const [, setZoomLevel] = useState(1);
  const [, setZoomPosition] = useState({ x: 0, y: 0 });
  const [breadCrumMatchPair, setBreadCrumMatchPair] = useState('');
  const [viewSimilar, setViewSimilar] = useState<boolean>(false);
  // const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageLoadingStatus, setImageLoadingStatus] = useState<any>([]);

  const [triggerColumn] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
  const [triggerSimilarMatchingPairApi] = useLazyGetSimilarMatchingPairQuery();
  useEffect(() => {
    const fetchData = async () => {
      const response = await triggerColumn({});
      updateState(response?.data);
    };
    fetchData();
    setRowSelection({});
  }, []);

  useEffect(() => {
    if (originalData.length > 0 && originalData.length < 2) {
      setImageLoadingStatus(new Array(originalData.length).fill(true));
    }
  }, [originalData]);

  // useEffect(() => {
  //   // Check if all images are loaded
  //   if (imageLoadingStatus.every((status: any) => !status)) {
  //     setIsImageLoading(false);
  //   }
  // }, [imageLoadingStatus]);

  const handleImageLoad = (index: number) => {
    // Set the specific image as loaded
    setImageLoadingStatus((prevState: any) => {
      const newStatus = [...prevState];
      newStatus[index] = false;
      return newStatus;
    });
  };

  useEffect(() => {
    let showOnlyWithVideo = JSON.parse(localStorage.getItem('MatchingPair')!);

    if (originalData.length >= 2) {
      triggerSimilarMatchingPairApi({
        product_id: originalData[0].id,
        matching_product_id: originalData[1].id,
        show_only_with_video:
          showOnlyWithVideo[activeTab - 1]?.queryParams?.all_asset_required
      })
        .unwrap()
        .then(res => setSimilarData(res))
        .catch(e => console.log(e));
    }
    if (originalData.length === 2) {
      setBreadCrumMatchPair(
        originalData.map((data: any) => data.lot_id).join(' & ')
      );
    }
  }, [originalData]);
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
    if (viewSimilar === false) {
      const result = data.filter((subArray: any) =>
        subArray.some((obj: any) => obj.lot_id === filterData.lot_id)
      );
      setOriginalData(result[0]);
    }
  }, [viewSimilar, data]);

  useEffect(() => {
    showToast &&
      setTimeout(() => {
        setShowToast(false); // Hide the toast notification after some time
      }, 4000);
  }, [showToast]);

  const filterImageUrl = (tableData: any) => [
    {
      name: getShapeDisplayName(tableData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.IMG.replace('***', tableData?.lot_id ?? '')}`,
      category: 'Image',
      id: tableData?.id
    },
    {
      name: 'Certificate',
      url: `${FILE_URLS.CERT_FILE.replace(
        '***',
        tableData?.certificate_number ?? ''
      )}`,
      category: 'Certificate',
      downloadUrl: tableData?.assets_pre_check?.CERT_FILE
        ? tableData?.certificate_url
        : '',
      url_check: tableData?.assets_pre_check?.CERT_IMG,
      id: tableData?.id
    },
    {
      name: 'Video',
      url: `${FILE_URLS.B2B.replace('***', tableData?.lot_id ?? '')}`,
      url_check: tableData?.assets_pre_check?.B2B_CHECK,
      category: 'Video'
    },
    {
      name: 'Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace('***', tableData?.lot_id ?? '')}`,
      url_check: tableData?.assets_pre_check?.B2B_SPARKLE_CHECK,
      category: 'Sparkle'
    },

    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.HEART.replace('***', tableData?.lot_id ?? '')}`,
      category: 'Image',
      id: tableData?.id
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.ARROW.replace('***', tableData?.lot_id ?? '')}`,
      category: 'Image',
      id: tableData?.id
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.ASET.replace('***', tableData?.lot_id ?? '')}`,
      category: 'Image',
      id: tableData?.id
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.IDEAL.replace('***', tableData?.lot_id ?? '')}`,
      category: 'Image',
      id: tableData?.id
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace('***', tableData?.lot_id ?? '')}`,
      downloadUrl: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        tableData?.lot_id ?? ''
      )}`,
      category: 'Image',
      id: tableData?.id
    }
  ];
  useEffect(() => {
    let allImagesData = originalData.map((data: any) => filterImageUrl(data));
    if (allImagesData.length > 0)
      loadImages(allImagesData, setValidImages, checkImage, true);
  }, [originalData]);

  // useEffect(() => {
  //   if (
  //     !validImages.length
  //     // && filteredImages[0][0].name.length
  //   ) {
  //     setValidImages([
  //       [{
  //         name: 'No Data Found',
  //         url: ''
  //       }]
  //     ]);
  //   }
  // }, [validImages]);

  const handleDownloadExcel = () => {
    if (Object.keys(rowSelection).length > 0) {
      downloadExcelHandler({
        products: Object.keys(rowSelection),
        downloadExcelApi: downloadExcel,
        modalSetState,
        router,
        setIsLoading: setIsLoading,
        page: 'DNA_Page'
        // fromMatchingPair: true
      });
    } else {
      setShowToast(true);
    }
  };
  const handleImageError = (event: any) => {
    event.target.src = NoImageFound.src; //30et the fallback image when the original image fails to load
    event.target.height =
      originalData.length > 2
        ? 320
        : // (originalData.length > 5 ? 175 : 320)
          400;
    event.target.width =
      originalData.length > 2
        ? 290
        : // (originalData.length > 5 ? 185 : 290)
          350;
  };
  const handleClick = (id: string) => {
    let updatedIsCheck = [...Object.keys(rowSelection)];

    if (updatedIsCheck.includes(id)) {
      updatedIsCheck = updatedIsCheck.filter(item => item !== id);
    } else {
      updatedIsCheck.push(id);
    }
    setRowSelection(
      updatedIsCheck.reduce((acc: any, item: any) => {
        acc[item] = true;
        return acc;
      }, {})
    );
    setIsError(false);
  };
  type HandleCloseType = (_event: React.MouseEvent, _id: string) => void;

  const handleClose: HandleCloseType = (event, id) => {
    const filterData = originalData.filter((item: IProduct) => item.id !== id);
    setOriginalData(filterData);
  };

  const dataFormatting = (diamond: any, key: string) => {
    switch (key) {
      case 'location':
        return (
          <div className="flex gap-1 items-center">
            {RednderLocation({
              renderedCellValue: diamond.location
            })}

            {diamond.location}
          </div>
        );
      case 'amount':
        return diamond.variants[0].prices[0].amount
          ? `$${formatNumberWithCommas(diamond.variants[0].prices[0].amount)}`
          : '-';
      case 'measurements':
        return `${diamond?.length ?? 0}*${diamond?.width ?? 0}*${
          diamond?.depth ?? 0
        }`;

      case 'rap':
      case 'rap_value':
        return diamond[key] ? `$${formatNumberWithCommas(diamond[key])}` : '-';
      case 'price_per_carat':
        return diamond[key] !== undefined || diamond[key] !== null
          ? `$${formatNumberWithCommas(diamond[key])}`
          : '-';
      case 'table_percentage':
      case 'carats':
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
        return diamond[key] ? `${formatNumber(diamond[key])}` : '-';
      case 'discount':
        return diamond[key] ? `${formatNumber(diamond[key])}%` : '-';

      case 'key_to_symbol':
      case 'report_comments':
        return diamond[key].length > 0 ? diamond[key] : '-';
      default:
        return diamond[key] || '-';
    }
  };

  const renderLotId = (row: any) => {
    let statusClass = '';
    let borderClass = '';

    if (row?.in_cart && Object.keys(row.in_cart).length) {
      statusClass = 'bg-legendInCartFill text-legendInCart';
      borderClass = 'border-lengendInCardBorder border-[1px] px-[8px]';
    } else if (row.diamond_status === MEMO_STATUS) {
      statusClass = 'bg-legendMemoFill text-legendMemo';
      borderClass = 'border-lengendMemoBorder border-[1px] px-[8px]';
    } else if (row.diamond_status === HOLD_STATUS) {
      statusClass = 'bg-legendHoldFill  text-legendHold';
      borderClass = 'border-lengendHoldBorder border-[1px] px-[8px]';
    }
    return (
      <>
        <span
          className={`rounded-[4px] ${statusClass}   py-[3px] ${borderClass} `}
        >
          {row.lot_id}
        </span>
      </>
    );
  };

  // let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  // const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  let allImages = originalData.map((data: any) => filterImageUrl(data));

  const filteredImages = allImages.map((data: any) =>
    data.filter((image: any) => {
      if (activePreviewTab === 'Video' && image.category === 'Video')
        return true;
      if (
        activePreviewTab === 'Certificate' &&
        image.category === 'Certificate'
      )
        return true;
      if (activePreviewTab === 'Sparkle' && image.category === 'Sparkle')
        return true;
      if (activePreviewTab === 'Image' && image.category === 'Image')
        return true;
      return false;
    })
  );

  const updateDataAsPerSimilarData = (
    originalData: any,
    similarData: any,
    imageLoadingStatus: boolean[]
  ) => {
    const originalLotIds = new Set(
      originalData.map((product: any) => product.lot_id)
    );

    const newProducts = (similarData?.products || []).filter(
      (product: any) => !originalLotIds.has(product.lot_id)
    );

    // Combine original data and new products
    const updatedData = [...originalData, ...newProducts];

    // Update the image loading status array to account for new products
    const updatedImageLoadingStatus = [
      ...imageLoadingStatus,
      ...new Array(newProducts.length).fill(true)
    ];

    return { updatedData, updatedImageLoadingStatus };
  };

  useEffect(() => {
    if (validImages.length > 0) {
      setIsDiamondDetailLoading && setIsDiamondDetailLoading(false);
    }
  }, [validImages]);

  return (
    <div className="text-black bg-neutral25 rounded-[8px] w-[calc(100vw-116px)] h-[calc(100vh-140px)]">
      <Toast
        show={showToast}
        message={
          errorText !== ''
            ? errorText
            : 'Please select a stone to perform action.'
        }
        isSuccess={false}
      />

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
          {validImages.length > 0 ? (
            <button
              className="text-neutral600 text-sMedium font-regular cursor-pointer"
              onClick={() => {
                setValidImages([]);
                setOriginalData([]);
                goBackToListView!();
              }}
            >
              {breadCrumLabel}
            </button>
          ) : (
            <Skeleton
              width={60}
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={18}
              variant="rectangular"
              animation="wave"
              className="rounded-[4px]"
            />
          )}
          <span className="text-neutral600">/</span>

          {validImages.length > 0 ? (
            <p className="text-neutral700 p-[8px] bg-neutral100 rounded-[4px] text-sMedium font-medium">
              Stock No: {breadCrumMatchPair}
            </p>
          ) : (
            <Skeleton
              width={220}
              sx={{ bgcolor: 'var(--neutral-200)' }}
              height={34}
              variant="rectangular"
              animation="wave"
              className="rounded-[4px]"
            />
          )}
        </div>
      </div>

      {validImages.length > 0 ? (
        <>
          <div className=" py-[16px]">
            <div className={`flex justify-between`}>
              <div className={`mr-5 flex flex-col gap-[16px]`}>
                <DetailPageTabs
                  validImages={validImages}
                  setActivePreviewTab={setActivePreviewTab}
                  activePreviewTab={activePreviewTab}
                  setImageIndex={setImageIndex}
                  isMatchingPair={true}
                  // setIsImageLoading={setIsImageLoading}
                  setImageLoadingStatus={setImageLoadingStatus}
                  originalDataFromMatchPair={originalData}
                />
              </div>
              <div className="flex  justify-center xl:justify-end mr-[10px] items-center">
                <div className="flex gap-3 items-center">
                  {
                    <div
                      className={` flex items-center gap-1 border-[1px] h-[40px] border-[#E4E7EC] rounded-[4px] px-4 py-2 cursor-pointer ${
                        similarData &&
                        similarData?.count === 0 &&
                        '!cursor-not-allowed bg-neutral100'
                      }`}
                      style={{ boxShadow: 'var(--input-shadow)' }}
                      onClick={() => {
                        if (similarData && similarData?.count > 0) {
                          if (!viewSimilar) {
                            const { updatedData, updatedImageLoadingStatus } =
                              updateDataAsPerSimilarData(
                                originalData,
                                similarData,
                                imageLoadingStatus
                              );

                            setOriginalData(updatedData);
                            setImageLoadingStatus(updatedImageLoadingStatus);
                          }

                          setViewSimilar(!viewSimilar);
                        }
                      }}
                    >
                      <p
                        className={`text-mMedium text-neutral900 font-medium ${
                          similarData &&
                          similarData?.count === 0 &&
                          '!text-neutral400'
                        }`}
                      >
                        {viewSimilar ? 'Hide' : 'View'} similar
                      </p>
                      <div
                        className={`bg-primaryMain border-[2px] border-primaryBorder text-white text-mMedium px-[6px] py-[1px] rounded-[4px] h-[25px]  ${
                          similarData &&
                          similarData?.count === 0 &&
                          '!bg-neutral400'
                        }`}
                      >
                        +{similarData?.count}
                      </div>
                    </div>
                  }
                  {filteredImages.length > 0 ? (
                    <div className="flex gap-6">
                      {filteredImages.length > 0 &&
                        filteredImages[0][imageIndex].category === 'Image' &&
                        !(
                          activePreviewTab === 'Video' ||
                          activePreviewTab === 'Sparkle' ||
                          activePreviewTab === 'Certificate'
                        ) && (
                          <>
                            <div className="flex gap-2">
                              <Tooltip
                                tooltipTrigger={
                                  <button
                                    onClick={() => {
                                      // setIsImageLoading(true);
                                      setImageLoadingStatus(
                                        new Array(originalData.length).fill(
                                          true
                                        )
                                      );
                                      setZoomPosition({ x: 0, y: 0 });
                                      setZoomLevel(1);
                                      setImageIndex(imageIndex - 1);
                                    }}
                                    disabled={!(imageIndex > 0)}
                                    className={` rounded-[4px]  hover:bg-neutral50 w-[37px] h-[37px] text-center px-2 border-[1px] border-solid border-neutral200 shadow-sm ${
                                      imageIndex <= 0
                                        ? '!bg-neutral100 cursor-not-allowed'
                                        : 'bg-neutral0'
                                    }`}
                                  >
                                    <Image
                                      src={
                                        !(imageIndex > 0)
                                          ? backWardArrowDisable
                                          : backwardArrow
                                      }
                                      alt={
                                        !(imageIndex > 0)
                                          ? 'backWardArrowDisable'
                                          : 'backwardArrow'
                                      }
                                    />
                                  </button>
                                }
                                tooltipContent={'Previous Image'}
                                tooltipContentStyles={'z-[1000]'}
                              />

                              <Tooltip
                                tooltipTrigger={
                                  <button
                                    onClick={() => {
                                      // setIsImageLoading(true);
                                      setImageLoadingStatus(
                                        new Array(originalData.length).fill(
                                          true
                                        )
                                      );
                                      setZoomPosition({ x: 0, y: 0 });
                                      setZoomLevel(1);
                                      setImageIndex(imageIndex + 1);
                                    }}
                                    disabled={
                                      !(
                                        imageIndex <
                                        filteredImages[0].length - 1
                                      )
                                    }
                                    className={`rounded-[4px] hover:bg-neutral50 w-[37px] h-[37px] text-center px-2 border-[1px] border-solid border-neutral200 shadow-sm ${
                                      imageIndex >= filteredImages[0].length - 1
                                        ? '!bg-neutral100 cursor-not-allowed'
                                        : 'bg-neutral0'
                                    }`}
                                  >
                                    <Image
                                      src={
                                        !(
                                          imageIndex <
                                          filteredImages[0].length - 1
                                        )
                                          ? forWardAarrowDisable
                                          : forwardArrow
                                      }
                                      alt={
                                        !(
                                          imageIndex <
                                          filteredImages[0].length - 1
                                        )
                                          ? 'forWardAarrowDisable'
                                          : 'forwardArrow'
                                      }
                                    />
                                  </button>
                                }
                                tooltipContent={'Next Image'}
                                tooltipContentStyles={'z-[1000]'}
                              />
                            </div>
                            <div className="border-r-[1px] h-[40px] border-neutral200"></div>
                          </>
                        )}
                      <div className="flex gap-2">
                        {!(
                          activePreviewTab === 'Video' ||
                          activePreviewTab === 'Sparkle'
                        ) && (
                          <Tooltip
                            tooltipTrigger={
                              <button
                                onClick={() => {
                                  filteredImages.forEach((images: any) => {
                                    if (Object.keys(rowSelection).length > 0) {
                                      Object.keys(rowSelection).includes(
                                        images[imageIndex].id
                                      ) &&
                                        handleDownloadImage(
                                          images[imageIndex].downloadUrl || '',
                                          images[imageIndex].name,
                                          setIsLoading
                                        );
                                    } else {
                                      setShowToast(true);
                                    }
                                  });
                                }}
                                disabled={
                                  !filteredImages[0][imageIndex].downloadUrl
                                    ?.length
                                }
                                className={`rounded-[4px] bg-neutral0 disabled:!bg-neutral100 disabled:cursor-not-allowed hover:bg-neutral50 flex items-center justify-center w-[37px] h-[37px] text-center  border-[1px] border-solid border-neutral200 shadow-sm`}
                              >
                                <DownloadImg
                                  className={`stroke-[1.5] ${
                                    filteredImages[0][imageIndex].downloadUrl
                                      ?.length
                                      ? 'stroke-neutral900'
                                      : 'stroke-neutral400'
                                  }`}
                                />
                              </button>
                            }
                            tooltipContent={
                              activePreviewTab === 'Certificate'
                                ? 'Download Certificate'
                                : 'Download Image'
                            }
                            tooltipContentStyles={'z-[1000]'}
                          />
                        )}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
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
                  <div className="w-[38px] h-[38px]">
                    <Share
                      rows={originalData}
                      selectedProducts={Object.keys(rowSelection).reduce(
                        (acc: any, item: any) => {
                          acc[item] = true;
                          return acc;
                        },
                        {}
                      )}
                      setIsError={setShowToast}
                      setErrorText={setErrorText}
                      identifier={breadCrumLabel}
                      shareTrackIdentifier="Match Pair Details"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex  h-[calc(100%-110px)] overflow-auto  border-neutral200">
            <div className="flex ">
              <div
                className="sticky left-0  min-h-[2080px] text-neutral700 text-mMedium font-medium w-[200px] !z-5"
                style={{ zIndex: 5 }}
              >
                <div
                  className={`${
                    originalData.length > 2
                      ? // ? originalData.length > 5
                        'h-[370px] '
                      : // : 'h-[370px]  '
                        'h-[420px]'
                  }  items-center flex px-4 border-[0.5px] border-neutral200 bg-neutral50`}
                >
                  Media
                </div>
                <div className=" flex flex-col">
                  {Object.keys(mappingColumn).map(
                    key =>
                      key !== 'details' &&
                      key !== 'id' && (
                        <div
                          key={key}
                          className="py-2 px-4 border-[1px] border-neutral200 h-[38px] bg-neutral50"
                        >
                          {mappingColumn[key]}
                        </div>
                      )
                  )}
                </div>
              </div>
              {/* sticky top-0 */}
              <div className=" bg-neutral0 text-neutral900 text-mMedium font-medium min-h-[2080px] !z-2">
                <div
                  className={`flex ${
                    originalData.length > 2
                      ? // originalData.length > 5
                        //   ? 'h-[360px] '
                        //   :
                        'h-[370px] '
                      : 'h-[420px]'
                  } `}
                >
                  {originalData !== undefined &&
                    originalData.length > 0 &&
                    originalData.map((items: IProduct, index: number) => (
                      <div
                        key={items.id}
                        className={`${
                          originalData.length > 2
                            ? // originalData.length > 5
                              //   ? 'w-[250px]'
                              //   :
                              'w-[350px]'
                            : 'w-[460px]'
                        }`}
                      >
                        <div
                          className={`${
                            originalData.length > 2
                              ? // originalData.length > 5
                                //   ? 'h-[360px]'
                                //   :
                                'h-[370px]'
                              : 'h-[420px]'
                          } flex flex-col justify-between border-[0.5px]  border-neutral200 bg-neutral0 p-2 ${
                            originalData.length > 2 ? 'gap-[4px]' : 'gap-[6px]'
                          } `}
                        >
                          <div className="flex justify-around relative">
                            {imageLoadingStatus[index] && (
                              <div
                                className={` ${
                                  originalData.length > 2
                                    ? 'w-[310px] h-[226px]'
                                    : 'w-[370px] h-[290px]'
                                } absolute z-[2]  bg-[#F2F4F7]  flex flex-col gap-[6px] items-center justify-center`}
                              >
                                <div role="status">
                                  <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 text-neutral200 animate-spin fill-primaryMain"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                      fill="currentFill"
                                    />
                                  </svg>
                                  <span className="sr-only">Loading...</span>
                                </div>
                                <div className="text-neutral900 font-medium text-sMedium">
                                  Loading{' '}
                                  {filteredImages[index][imageIndex]?.name ===
                                  'Video'
                                    ? ''
                                    : filteredImages[index][imageIndex]
                                        ?.name}{' '}
                                  {filteredImages[index][imageIndex]
                                    ?.category === 'Video' ||
                                  filteredImages[index][imageIndex]
                                    ?.category === 'Sparkle'
                                    ? 'Video...'
                                    : 'Image...'}
                                </div>
                              </div>
                            )}
                            {activePreviewTab === 'Video' ||
                            activePreviewTab === 'Sparkle' ? (
                              allImages[index].filter(
                                (data: any) =>
                                  data.category === activePreviewTab
                              )[0].url_check ? (
                                <iframe
                                  src={
                                    allImages[index].filter(
                                      (data: any) =>
                                        data.category === activePreviewTab
                                    )[0].url
                                  }
                                  onLoad={() => {
                                    handleImageLoad(index);
                                  }}
                                  className={`${'w-[300px] h-[330px]'} `}
                                />
                              ) : (
                                <img
                                  key={activePreviewTab}
                                  src={NoImageFound}
                                  alt={activePreviewTab}
                                  width={
                                    originalData.length > 2
                                      ? // originalData.length > 5
                                        //   ? 185
                                        //   :
                                        290
                                      : 350
                                  }
                                  onLoad={() => {
                                    handleImageLoad(index);
                                  }}
                                  height={
                                    originalData.length > 2
                                      ? // originalData.length > 5
                                        //   ? 175
                                        //   :
                                        320
                                      : 400
                                  }
                                  className={` object-contain ${
                                    originalData.length > 2
                                      ? 'h-[226px]'
                                      : 'h-[290px]'
                                  }`}
                                  onError={e => {
                                    handleImageLoad(index);
                                    handleImageError(e);
                                  }}
                                />
                              )
                            ) : activePreviewTab === 'Certificate' ? (
                              <img
                                key={activePreviewTab}
                                src={filteredImages[index][imageIndex].url}
                                alt={filteredImages[index][imageIndex].name}
                                width={
                                  originalData.length > 2
                                    ? // originalData.length > 5
                                      //   ? 200
                                      //   :
                                      290
                                    : 370
                                }
                                onLoad={() => {
                                  handleImageLoad(index);
                                }}
                                height={
                                  originalData.length > 2
                                    ? // originalData.length > 5
                                      //   ? 140
                                      //   :
                                      320
                                    : 400
                                }
                                className={` object-contain ${
                                  originalData.length > 2
                                    ? 'h-[226px]'
                                    : 'h-[290px]'
                                }`}
                                onError={e => {
                                  handleImageError(e);
                                  handleImageLoad(index);
                                }}
                              />
                            ) : (
                              <img
                                key={activePreviewTab}
                                src={filteredImages[index][imageIndex].url}
                                alt={filteredImages[index][imageIndex].name}
                                width={
                                  originalData.length > 2
                                    ? // originalData.length > 5
                                      //   ? 185
                                      //   :
                                      290
                                    : 370
                                }
                                onLoad={() => {
                                  handleImageLoad(index);
                                }}
                                height={
                                  originalData.length > 2
                                    ? // originalData.length > 5
                                      //   ? 175
                                      //   :
                                      320
                                    : 400
                                }
                                className={`${
                                  originalData.length > 2
                                    ? 'h-[226px]'
                                    : 'h-[290px]'
                                }`}
                                onError={e => {
                                  handleImageError(e);
                                  handleImageLoad(index);
                                }}
                              />
                            )}
                          </div>
                          <div className="flex justify-center items-center">
                            {!imageLoadingStatus[index] ? (
                              <div className="text-mRegular font-medium text-neutral900">
                                {filteredImages[index][imageIndex].name ?? '-'}
                              </div>
                            ) : (
                              <div>
                                <Skeleton
                                  width={88}
                                  variant="rectangular"
                                  height={20}
                                  animation="wave"
                                  sx={{ bgcolor: 'var(--neutral-200)' }}
                                />
                              </div>
                            )}
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <CheckboxComponent
                                onClick={() => handleClick(items.id)}
                                data-testid={'compare stone checkbox'}
                                isChecked={
                                  Object.keys(rowSelection).includes(
                                    items.id
                                  ) || false
                                }
                              />
                            </div>
                            <div>
                              <button
                                onClick={e => {
                                  e.stopPropagation();
                                  handleDetailImage({
                                    row: items,
                                    activePreviewTab
                                  });
                                }}
                              >
                                <Media
                                  className={`stroke-[1.5] stroke-neutral900
                           `}
                                />
                              </button>
                            </div>
                            <div
                              className={`${styles.closeButton} cursor-pointer`}
                              data-testid={'Remove Stone'}
                              onClick={event =>
                                originalData.length > 2
                                  ? handleClose(event, items.id)
                                  : (setShowToast(true),
                                    setErrorText(SELECT_STONES))
                              }
                            >
                              <Image
                                src={CloseButton}
                                alt="Preview"
                                height={24}
                                width={24}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className={`flex `}>
                  {originalData.length > 0 &&
                    originalData.map((diamond: any) => (
                      <div
                        className={`${
                          originalData.length > 2
                            ? // originalData.length > 5
                              //   ? 'w-[250px]'
                              //   :
                              'w-[350px]'
                            : 'w-[460px]'
                        }`}
                        key={diamond.id}
                      >
                        {Object.keys(mappingColumn).map(
                          key =>
                            key !== 'details' &&
                            key !== 'id' &&
                            (key === 'lot_id' ? (
                              <div
                                key={key}
                                className="py-2 px-4 border-[1px] border-neutral200 h-[38px] whitespace-nowrap overflow-hidden overflow-ellipsis  bg-neutral0"
                              >
                                {renderLotId(diamond)}
                              </div>
                            ) : (
                              <div
                                key={key}
                                className="py-2 px-4 border-[1px] border-neutral200 h-[38px] whitespace-nowrap overflow-hidden overflow-ellipsis  bg-neutral0"
                              >
                                {dataFormatting(diamond, key)}
                              </div>
                            ))
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <MatchPairDnaSkeleton />
      )}
    </div>
  );
}
