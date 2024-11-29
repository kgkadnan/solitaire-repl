import Tooltip from '@/components/v2/common/tooltip';
import Table from '@/components/v2/table';
import {
  RenderAmount,
  RednderLocation,
  RenderCarat,
  RenderDetails,
  RenderDiscount,
  RenderLab,
  RenderCartLotId
} from '@/components/v2/table/helpers/render-cell';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { formatCreatedAt } from '@/utils/format-date';
import { formatNumberWithLeadingZeros } from '@/utils/format-number-withLeadingZeros';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useMemo, useState } from 'react';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import Image from 'next/image';
import {
  PAST_INVOICE_BREADCRUMB_LABEL,
  PENING_INVOICE_BREADCRUMB_LABEL
} from '@/constants/business-logic';
import ActionButton from '@/components/v2/common/action-button';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import infoIcon from '@public/v2/assets/icons/info-icon.svg';
import {
  RenderMeasurements,
  RenderNumericFields,
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';
import { IManageListingSequenceResponse } from '../../search/interface';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import GemTracPage from '@/components/v2/common/gem-trac';
import { useLazyGetGemTracQuery } from '@/features/api/gem-trac';

interface IOrderDetail {
  productDetailData: any;
  goBackToListView: () => void;
  breadCrumLabel: string;
  modalSetState: any;
  setIsLoading: any;
  router: any;
  identifier?: string;
}

const OrderDetail: React.FC<IOrderDetail> = ({
  goBackToListView,
  productDetailData,
  breadCrumLabel,
  modalSetState,
  setIsLoading,
  router,
  identifier
}) => {
  const [triggerColumn] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();

  const [downloadExcel] = useDownloadExcelMutation();
  const [validImages, setValidImages] = useState<any>([]);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [tooltip, setTooltip] = useState({
    show: false,
    content: '',
    position: { left: 0 }
  });
  const [detailImageData, setDetailImageData] = useState<any>({});

  const [isGemTrac, setIsGemTrac] = useState(false);
  const [gemTracData, setGemTracData] = useState([]);
  const [triggerGemTracApi] = useLazyGetGemTracQuery({});

  const handleDetailPage = ({ row }: { row: any }) => {
    setIsDetailPage(true);
    setDetailPageData(row);
  };

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };

  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      ?.sort(({ sequence: a }: any, { sequence: b }: any) => a - b)
      .map(({ accessor, short_label, label }: any) => {
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          minSize: 5,
          maxSize: accessor === 'details' ? 100 : 200,
          size: accessor === 'measurements' ? 183 : 5,
          Header: ({ column }: any) => (
            <Tooltip
              tooltipTrigger={<span>{column.columnDef.header}</span>}
              tooltipContent={label}
              tooltipContentStyles={'z-[1000]'}
            />
          )
        };

        switch (accessor) {
          case 'rap':
          case 'rap_value':
            return { ...commonProps, Cell: RenderNumericFields };
          case 'amount':
            return { ...commonProps, Cell: RenderAmount };
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
          case 'details':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderDetails({ row, handleDetailImage });
              }
            };
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

          case 'lab':
            return { ...commonProps, Cell: RenderLab };
          case 'location':
            return { ...commonProps, Cell: RednderLocation };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };

          case 'tracr_id':
            return { ...commonProps, Cell: RenderTracerId };
          case 'price_per_carat':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
                <span>{`${
                  renderedCellValue === null || renderedCellValue === undefined
                    ? '-'
                    : `$${formatNumberWithCommas(renderedCellValue)}`
                }`}</span>
              )
            };
          default:
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
                <span>{renderedCellValue ?? '-'}</span>
              )
            };
        }
      });

  const [rowSelection, setRowSelection] = useState({});
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(productDetailData?.items?.map((items: any) => items.product) || []);
  }, [productDetailData]);

  // Fetch Columns
  useEffect(() => {
    const fetchColumns = async () => {
      const response = await triggerColumn({});
      if (response.data) {
        setColumns(response.data);
      }
    };

    fetchColumns();
  }, []);

  const memoizedColumns = useMemo(() => mapColumns(columns), [columns]);

  const handleDownloadExcel = () => {
    let selectedIds = Object.keys(rowSelection);
    const allProductIds = rows.map(({ id }: { id: string }) => {
      return id;
    });

    downloadExcelHandler({
      products: selectedIds.length > 0 ? selectedIds : allProductIds,
      orderId: productDetailData.id,
      downloadExcelApi: downloadExcel,
      modalSetState,
      setRowSelection,
      router,
      setIsLoading: setIsLoading,
      page: 'Your_Orders'
    });
  };

  const goBack = () => {
    setIsDetailPage(false);
    setDetailPageData({});
  };

  const images = [
    {
      name: getShapeDisplayName(detailImageData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.IMG.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
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
      url: `${FILE_URLS.B2B.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.B2B_DOWNLOAD_URL.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      url_check: detailImageData?.assets_pre_check?.B2B_CHECK,
      category: 'Video'
    },
    {
      name: 'Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.B2B_SPARKLE_DOWNLOAD_URL.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      url_check: detailImageData?.assets_pre_check?.B2B_SPARKLE_CHECK,
      category: 'Sparkle'
    },

    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.HEART.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.ARROW.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.ASET.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.IDEAL.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData.location === 'USA'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    }
  ];
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
    <>
      <ImageModal
        isOpen={isModalOpen}
        stockNumber={detailImageData?.lot_id ?? ''}
        onClose={() => {
          setValidImages([]);
          setDetailImageData({});
          setIsModalOpen(!isModalOpen);
        }}
        images={validImages}
        setIsLoading={setIsLoading}
      />{' '}
      {productDetailData && Object.keys(productDetailData).length > 0 && (
        <div>
          {isDetailPage && detailPageData?.length ? (
            <>
              {' '}
              {isGemTrac ? (
                <GemTracPage
                  breadCrumLabel={'Search Results'}
                  setIsGemTrac={setIsGemTrac}
                  setGemTracData={setGemTracData}
                  gemTracData={gemTracData}
                  goBackToListView={goBack}
                />
              ) : (
                <>
                  <DiamondDetailsComponent
                    data={rows}
                    filterData={detailPageData}
                    goBackToListView={goBack}
                    handleDetailPage={handleDetailPage}
                    breadCrumLabel={'Search Results'}
                    modalSetState={modalSetState}
                    setIsLoading={setIsLoading}
                    setIsGemTrac={setIsGemTrac}
                    setGemTracData={setGemTracData}
                    triggerGemTracApi={triggerGemTracApi}
                  />
                </>
              )}
            </>
          ) : (
            <div>
              <div className="bg-neutral0 border-b-[1px] rounded-t-[8px] border-solid border-neutral200">
                <div className="flex items-center p-[16px] ">
                  <Image
                    src={backWardArrow}
                    alt="backWardArrow"
                    onClick={() => {
                      goBackToListView();
                    }}
                    className="cursor-pointer"
                  />
                  <div className="flex gap-[8px] items-center">
                    <button
                      className="text-neutral600 text-sMedium font-regular cursor-pointer"
                      onClick={() => {
                        goBackToListView();
                      }}
                    >
                      {breadCrumLabel}
                    </button>
                    <span className="text-neutral600">/</span>
                    <p className="text-neutral700 p-[8px] bg-neutral100 rounded-[4px] text-sMedium font-medium">
                      {formatNumberWithLeadingZeros(
                        productDetailData?.display_id
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex p-[16px] pr-[35px] gap-[35px]">
                <div className="">
                  <div className=" flex items-center justify-between">
                    <div className="flex gap-[8px] ">
                      {' '}
                      <p className="text-neutral600 text-mMedium font-regular">
                        {ManageLocales('app.yourOrder.description.dataAndTime')}
                        :{' '}
                      </p>
                      <span className="text-neutral900 text-mRegular font-medium">
                        {' '}
                        {formatCreatedAt(productDetailData?.created_at)}
                      </span>
                    </div>

                    {identifier === PENING_INVOICE_BREADCRUMB_LABEL && (
                      <div className="flex items-center gap-1 relative">
                        <div className="flex items-center">
                          <div className="text-neutral900 text-mRegular font-medium">
                            Status
                          </div>

                          <button
                            onMouseEnter={e => {
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              setTooltip({
                                show: true,
                                content:
                                  'This status shows whether your order request is successful or failed.',
                                position: {
                                  left:
                                    rect.left +
                                    window.scrollX +
                                    rect.width / 300 // Adjust left position to center above the element
                                }
                              });
                            }}
                            onMouseLeave={() => {
                              setTooltip({
                                show: false,
                                content: '',
                                position: { left: 0 }
                              });
                            }}
                          >
                            <Image src={infoIcon} alt="infoIcon" />
                          </button>
                          <span>:</span>
                        </div>

                        {tooltip.show && (
                          <div
                            className={`absolute bg-[#ECF2FC] w-[320px] border-[1px] border-[#B6CFF3] rounded-[8px] p-4 text-[#475467] top-[35px] gap-2 `}
                            style={{
                              top: '-105px',
                              left: `${tooltip.position.left}px`,

                              transform: 'translateX(-115%)' // Center the tooltip above the element
                            }}
                          >
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-1">
                                <Image
                                  src={infoIcon}
                                  alt="volume discount info"
                                />{' '}
                                <p className="text-neutral900 font-medium text-mMedium">
                                  Information
                                </p>
                              </div>
                              <p>{tooltip.content}</p>
                            </div>
                          </div>
                        )}
                        {productDetailData?.status === 'pending' ? (
                          <div className="text-mRegular px-[6px] py-[4px] rounded-[4px] border-successBorder  bg-successSurface text-successMain border-solid border-[1px] ">
                            Success
                          </div>
                        ) : productDetailData?.status === 'canceled' ? (
                          <div className="text-mRegular px-[6px] py-[4px] rounded-[4px] border-dangerBorder bg-dangerSurface text-dangerMain border-solid border-[1px] ">
                            Failed
                          </div>
                        ) : productDetailData?.status === 'requires_action' ? (
                          <div className="text-mRegular px-[6px] py-[4px] rounded-[4px]  border-lengendMemoBorder bg-legendMemoFill text-legendMemo border-solid border-[1px] ">
                            Processing
                          </div>
                        ) : (
                          productDetailData?.status
                        )}
                      </div>
                    )}
                    {/* {breadCrumLabel === ACTIVE_INVOICE_BREADCRUMB_LABEL && (
                      <div className="mr-3">
                        {' '}
                        <Link
                          href={productDetailData?.delivery?.link}
                          target="_blank"
                          className="text-infoMain cursor-pointer"
                        >
                          Track order
                        </Link>
                      </div>
                    )} */}
                  </div>
                  <div className="bg-neutral25 flex gap-[16px] py-[8px]">
                    <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px] shadow-sm">
                      <div className="flex flex-col p-[16px]">
                        <p className="text-neutral600 text-mRegular font-regular">
                          {ManageLocales('app.yourOrder.description.orderId')}
                        </p>
                        <span className="text-neutral900 text-mMedium font-medium">
                          {formatNumberWithLeadingZeros(
                            productDetailData?.display_id
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px] shadow-sm">
                      <div className="flex flex-col p-[16px]">
                        <p className="text-neutral600 text-mRegular font-regular">
                          {ManageLocales(
                            'app.yourOrder.description.noOfStones'
                          )}
                        </p>
                        <span className="text-neutral900 text-mMedium font-medium">
                          {productDetailData?.items?.length}
                        </span>
                      </div>
                    </div>
                    <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px] shadow-sm">
                      <div className="flex flex-col p-[16px]">
                        <p className="text-neutral600 text-mRegular font-regular">
                          {identifier === PAST_INVOICE_BREADCRUMB_LABEL
                            ? ManageLocales(
                                'app.yourOrder.description.paidAmount'
                              )
                            : ManageLocales(
                                'app.yourOrder.description.payableAmount'
                              )}
                        </p>
                        <span className="text-neutral900 text-mMedium font-medium">
                          {`$ ${formatNumberWithCommas(
                            productDetailData?.total
                          )}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {identifier === PENING_INVOICE_BREADCRUMB_LABEL && (
                  <div className="flex flex-col pt-1">
                    <p className="text-neutral600 text-mRegular font-regular">
                      {ManageLocales('app.yourOrder.description.comments')}
                    </p>
                    <span className="text-neutral900 text-mRegular font-medium pt-[13px]">
                      {productDetailData?.comments?.length
                        ? productDetailData?.comments
                        : '-'}
                    </span>
                  </div>
                )}
              </div>
              <Table
                rows={rows}
                columns={memoizedColumns}
                setRowSelection={setRowSelection}
                rowSelection={rowSelection}
                isOrderDetail={true}
              />
              <div className="px-[16px] py-2">
                <ActionButton
                  actionButtonData={
                    identifier === PENING_INVOICE_BREADCRUMB_LABEL
                      ? [
                          {
                            variant: 'secondary',
                            label: ManageLocales(
                              'app.yourOrder.description.donwloadExcel'
                            ),
                            handler: () => handleDownloadExcel()
                          }
                        ]
                      : [
                          {
                            variant: 'secondary',
                            label: ManageLocales(
                              'app.yourOrder.description.donwloadExcel'
                            ),
                            handler: () => handleDownloadExcel()
                          }
                        ]
                  }
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderDetail;
