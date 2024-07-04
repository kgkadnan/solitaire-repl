/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import ExportExcel from '@public/v2/assets/icons/detail-page/export-excel.svg?url';
import NoImageFound from '@public/v2/assets/icons/detail-page/matching-pair-fallback.svg';
import styles from '../../search/result/components/compare.module.scss';
import CloseButton from '@public/v2/assets/icons/close.svg';
import Image from 'next/image';
import { FILE_URLS } from '@/constants/v2/detail-page';
// import { HOLD_STATUS, MEMO_STATUS } from '@/constants/business-logic';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
// import { kycStatus } from '@/constants/enums/kyc';
// import { formatNumber } from '@/utils/fix-two-digit-number';

import { Skeleton } from '@mui/material';

import { useRouter } from 'next/navigation';
// import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import { IImagesType } from '@/components/v2/common/detail-page/interface';
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
import { useCheckboxStateManagement } from '@/components/v2/common/checkbox/hooks/checkbox-state-management';
import Media from '@public/v2/assets/icons/detail-page/expand.svg?url';
import DownloadImg from '@public/v2/assets/icons/detail-page/download.svg?url';
import forwardArrow from '@public/v2/assets/icons/arrow-forward.svg';
import backwardArrow from '@public/v2/assets/icons/arrow-backword.svg';
import backWardArrowDisable from '@public/v2/assets/icons/detail-page/back-ward-arrow-disable.svg';
import forWardAarrowDisable from '@public/v2/assets/icons/detail-page/forward-arrow-disable.svg';
import { handleDownloadImage } from '@/utils/v2/detail-page';
import { useLazyGetSimilarMatchingPairQuery } from '@/features/api/match-pair';
import logger from 'logging/log-util';

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
  setRowSelection
}: {
  data: any;
  filterData: any;
  goBackToListView: any;
  breadCrumLabel: string;
  modalSetState?: any;
  setIsLoading?: any;
  handleDetailImage: any;
  setRowSelection: any;
}) {
  const router = useRouter();

  const [activePreviewTab, setActivePreviewTab] = useState('Image');
  const [imageIndex, setImageIndex] = useState<number>(0);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [validImages, setValidImages] = useState<IImagesType[]>([]);
  const { errorState, errorSetState } = useErrorStateManagement();

  const { setIsError, setErrorText } = errorSetState;
  const { errorText } = errorState;

  const [showToast, setShowToast] = useState(false);
  const [downloadExcel] = useDownloadExcelMutation();
  const [originalData, setOriginalData] = useState<any>([]);
  const [mappingColumn, setMappingColumn] = useState<any>({});
  const [, setZoomLevel] = useState(1);
  const [, setZoomPosition] = useState({ x: 0, y: 0 });

  const [viewSimilar, setViewSimilar] = useState<boolean>(false);
  const [similarData, setSimilarData] = useState<any>();
  const { checkboxState, checkboxSetState } = useCheckboxStateManagement();
  const { selectedCheckboxes } = checkboxState;
  const { setSelectedCheckboxes } = checkboxSetState;
  const [triggerColumn] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
  const [triggerSimilarMatchingPairApi] = useLazyGetSimilarMatchingPairQuery();
  useEffect(() => {
    const fetchData = async () => {
      const response = await triggerColumn({});
      updateState(response?.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (originalData.length >= 2) {
      triggerSimilarMatchingPairApi({
        product_id: originalData[0].id,
        matching_product_id: originalData[1].id
      })
        .unwrap()
        .then(res => setSimilarData(res))
        .catch(e => logger.error(e));
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
  }, [viewSimilar]);

  const filterImageUrl = (tableData: any) => [
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
    if (allImages.length > 0 && allImages[0].length > 0)
      loadImages(allImages[0], setValidImages, checkImage);
  }, [originalData]);
  useEffect(() => {
    if (
      !validImages.length
      // && filteredImages[0][0].name.length
    ) {
      setValidImages([
        {
          name: 'No Data Found',
          url: ''
        }
      ]);
    }
  }, [validImages]);

  const handleDownloadExcel = () => {
    if (selectedCheckboxes.length > 0) {
      downloadExcelHandler({
        products: selectedCheckboxes,
        downloadExcelApi: downloadExcel,
        modalSetState,
        router,
        setIsLoading: setIsLoading,
        fromMatchingPair: true
      });
    } else {
      setShowToast(true);
    }
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
    // console.log(filterData, 'filterData');
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
      if (
        activePreviewTab === 'B2B Sparkle' &&
        image.category === 'B2B Sparkle'
      )
        return true;
      if (activePreviewTab === 'Image' && image.category === 'Image')
        return true;
      return false;
    })
  );
  console.log(selectedCheckboxes, '----------------------->>>>>>>>>>>');

  return (
    <div className="text-black bg-white rounded-[8px] w-[calc(100vw-116px)] h-[calc(100vh-140px)]">
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
              Stock No:
              {viewSimilar
                ? `Compare Stone ${similarData?.count}`
                : originalData.map((data: any) => data.lot_id).join(' & ')}
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
      <div className=" py-[16px]">
        <div className={`flex justify-between`}>
          <div className={`mr-5 flex flex-col gap-[16px]`}>
            <DetailPageTabs
              validImages={validImages}
              setActivePreviewTab={setActivePreviewTab}
              activePreviewTab={activePreviewTab}
              setImageIndex={setImageIndex}
            />
          </div>
          <div className="flex  justify-center xl:justify-end mr-[10px] items-center">
            <div className="flex gap-3 items-center">
              {similarData && similarData?.count > 0 && (
                <div
                  className=" flex gap-1 border-[1px] h-[40px] border-[#E4E7EC] rounded-[4px] px-4 py-2 cursor-pointer"
                  onClick={() => {
                    !viewSimilar && setOriginalData(similarData?.products),
                      setViewSimilar(!viewSimilar);
                  }}
                >
                  <p className="text-mMedium text-neutral900 font-medium">
                    {viewSimilar ? 'Hide' : 'View'} similar
                  </p>
                  <div className=" bg-primaryMain border-[2px] border-primaryBorder text-white text-mMedium px-[6px] py-[1px] rounded-[4px]">
                    +{similarData?.count}
                  </div>
                </div>
              )}
              {filteredImages.length > 0 ? (
                <div className="flex gap-6">
                  {filteredImages.length > 0 &&
                    filteredImages[0][imageIndex].category === 'Image' &&
                    !(
                      activePreviewTab === 'Video' ||
                      activePreviewTab === 'B2B Sparkle' ||
                      activePreviewTab === 'Certificate'
                    ) && (
                      <>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
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
                          <button
                            onClick={() => {
                              setZoomPosition({ x: 0, y: 0 });
                              setZoomLevel(1);
                              setImageIndex(imageIndex + 1);
                            }}
                            disabled={
                              !(imageIndex < filteredImages[0].length - 1)
                            }
                            className={`rounded-[4px] hover:bg-neutral50 w-[37px] h-[37px] text-center px-2 border-[1px] border-solid border-neutral200 shadow-sm ${
                              imageIndex >= filteredImages[0].length - 1
                                ? '!bg-neutral100 cursor-not-allowed'
                                : 'bg-neutral0'
                            }`}
                          >
                            <Image
                              src={
                                !(imageIndex < filteredImages[0].length - 1)
                                  ? forWardAarrowDisable
                                  : forwardArrow
                              }
                              alt={
                                !(imageIndex < filteredImages[0].length - 1)
                                  ? 'forWardAarrowDisable'
                                  : 'forwardArrow'
                              }
                            />
                          </button>
                        </div>
                        <div className="border-r-[1px] h-[40px] border-neutral200"></div>
                      </>
                    )}
                  <div className="flex gap-2">
                    {!(
                      activePreviewTab === 'Video' ||
                      activePreviewTab === 'B2B Sparkle'
                    ) && (
                      <Tooltip
                        tooltipTrigger={
                          <button
                            onClick={() => {
                              filteredImages.map((images: any) => {
                                handleDownloadImage(
                                  images[imageIndex].downloadUrl || '',
                                  images[imageIndex].name,
                                  setIsLoading
                                );
                              });
                            }}
                            disabled={
                              !filteredImages[0][imageIndex].downloadUrl?.length
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
                  selectedProducts={selectedCheckboxes.reduce(
                    (acc: any, item: any) => {
                      acc[item] = true;
                      return acc;
                    },
                    {}
                  )}
                  setIsError={setShowToast}
                  setErrorText={setErrorText}
                  identifier={breadCrumLabel}
                  shareTrackIdentifier="Matching Pair Details"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  h-[calc(100%-110px)] overflow-auto  border-neutral200">
        <div className="flex ">
          <div
            className="sticky left-0  min-h-[2080px] text-neutral700 text-mMedium font-medium w-[150px] !z-5"
            style={{ zIndex: 5 }}
          >
            <div
              className={`${
                viewSimilar ? 'h-[234px]  sticky top-0 ' : 'h-[420px]'
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
                viewSimilar ? 'h-[234px]  sticky top-0 ' : 'h-[420px]'
              } `}
            >
              {originalData !== undefined &&
                originalData.length > 0 &&
                originalData.map((items: IProduct, index: number) => (
                  <div
                    key={items.id}
                    className={`${viewSimilar ? 'w-[150px]' : 'w-[460px]'}`}
                  >
                    <div
                      className={`${
                        viewSimilar ? 'h-[234px]' : 'h-[420px]'
                      } flex flex-col border-[0.5px]  border-neutral200 bg-neutral0 p-2 gap-[10px]`}
                    >
                      <div className="flex justify-around">
                        {activePreviewTab === 'Video' ||
                        activePreviewTab === 'B2B Sparkle' ? (
                          <iframe
                            src={
                              allImages[index].filter(
                                (data: any) =>
                                  data.category === activePreviewTab
                              )[0].url
                            }
                            className={`${
                              viewSimilar
                                ? 'w-[180px] h-[175px]'
                                : 'w-[370px] h-[370px]'
                            } `}
                          />
                        ) : (
                          // console.log(allImages[index].filter((data:any)=>data.category===activePreviewTab))
                          <img
                            src={filteredImages[index][imageIndex].url}
                            alt={filteredImages[index][imageIndex].name}
                            width={viewSimilar ? 185 : 440}
                            height={viewSimilar ? 175 : 440}
                            onClick={
                              () => {}
                              // handleCheckboxClick(items.id)
                            }
                            onError={e => {
                              handleImageError(e);
                            }}
                          />
                        )}
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
                              handleDetailImage({ row: items });
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
                                setErrorText(
                                  'Matching Pair requires atleast 2 stones'
                                ))
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
                    className={`${viewSimilar ? 'w-[150px]' : 'w-[460px]'} `}
                    key={diamond.id}
                  >
                    {Object.keys(mappingColumn).map(
                      key =>
                        key !== 'details' &&
                        key !== 'id' && (
                          <div
                            key={key}
                            className="py-2 px-4 border-[1px] border-neutral200 h-[38px] whitespace-nowrap overflow-hidden overflow-ellipsis  bg-neutral0"
                          >
                            {diamond[key] || '-'}
                          </div>
                        )
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
