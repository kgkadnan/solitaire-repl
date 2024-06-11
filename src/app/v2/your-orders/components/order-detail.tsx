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
import Image from 'next/image';
import {
  INVOICE_HISTORY_BREADCRUMB_LABEL,
  PENING_INVOICE_BREADCRUMB_LABEL
} from '@/constants/business-logic';
import ActionButton from '@/components/v2/common/action-button';
import { downloadExcelHandler } from '@/utils/v2/donwload-excel';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import {
  RenderMeasurements,
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';
import { IManageListingSequenceResponse } from '../../search/interface';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import { formatNumber } from '@/utils/fix-two-digit-number';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
interface IOrderDetail {
  productDetailData: any;
  goBackToListView: () => void;
  breadCrumLabel: string;
  modalSetState: any;
  setIsLoading: any;
}

const OrderDetail: React.FC<IOrderDetail> = ({
  goBackToListView,
  productDetailData,
  breadCrumLabel,
  modalSetState,
  setIsLoading
}) => {
  const [triggerColumn] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();

  const [downloadExcel] = useDownloadExcelMutation();
  const [validImages, setValidImages] = useState<any>([]);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailImageData, setDetailImageData] = useState<any>({});

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
          case 'amount':
            return { ...commonProps, Cell: RenderAmount };
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
                  renderedCellValue === 0
                    ? '0.00'
                    : formatNumber(renderedCellValue) ?? '0.00'
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
      setIsLoading: setIsLoading
    });
  };

  const goBack = () => {
    setIsDetailPage(false);
    setDetailPageData({});
  };

  const images = [
    {
      name: getShapeDisplayName(detailImageData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace('***', detailImageData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'GIA Certificate',
      url: detailImageData?.certificate_url ?? '',
      category: 'Certificate'
    },

    {
      name: 'Video',
      url: `${FILE_URLS.B2B.replace('***', detailImageData?.lot_id ?? '')}`,
      url_check: `${FILE_URLS.B2B_CHECK.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Video'
    },
    {
      name: 'B2B Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      url_check: `${FILE_URLS.B2B_SPARKLE_CHECK.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'B2B Sparkle'
    },

    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace('***', detailImageData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace('***', detailImageData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace('***', detailImageData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace('***', detailImageData?.lot_id ?? '')}`,
      category: 'Image'
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    }
  ];
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
    <>
      <ImageModal
        isOpen={isModalOpen}
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
              <DiamondDetailsComponent
                data={rows}
                filterData={detailPageData}
                goBackToListView={goBack}
                handleDetailPage={handleDetailPage}
                breadCrumLabel={'Search Results'}
                modalSetState={modalSetState}
              />
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
                      {breadCrumLabel === PENING_INVOICE_BREADCRUMB_LABEL
                        ? formatNumberWithLeadingZeros(
                            productDetailData?.display_id
                          )
                        : productDetailData?.invoice_id}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex p-[16px] pr-[35px] gap-[35px]">
                <div className="">
                  <div className="pl-[16px] flex justify-between">
                    <div className="flex gap-[10px] ">
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
                  <div className="bg-neutral25 flex gap-[8px] py-[8px]">
                    <div className="bg-neutral0 border-[1px] border-solid border-neutral200 rounded-[8px] shadow-sm">
                      <div className="flex flex-col p-[16px]">
                        <p className="text-neutral600 text-mRegular font-regular">
                          {breadCrumLabel === PENING_INVOICE_BREADCRUMB_LABEL
                            ? ManageLocales('app.yourOrder.description.orderId')
                            : ManageLocales(
                                'app.yourOrder.description.invoiceNumber'
                              )}
                        </p>
                        <span className="text-neutral900 text-mMedium font-medium">
                          {breadCrumLabel === PENING_INVOICE_BREADCRUMB_LABEL
                            ? formatNumberWithLeadingZeros(
                                productDetailData?.display_id
                              )
                            : productDetailData?.invoice_id}
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
                          {breadCrumLabel === INVOICE_HISTORY_BREADCRUMB_LABEL
                            ? ManageLocales(
                                'app.yourOrder.description.paidAmount'
                              )
                            : ManageLocales(
                                'app.yourOrder.description.payableAmount'
                              )}
                        </p>
                        <span className="text-neutral900 text-mMedium font-medium">
                          {`$ ${formatNumber(productDetailData?.total)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {breadCrumLabel === PENING_INVOICE_BREADCRUMB_LABEL && (
                  <div className="flex flex-col ">
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
                    breadCrumLabel === PENING_INVOICE_BREADCRUMB_LABEL
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
