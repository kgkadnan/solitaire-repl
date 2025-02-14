'use client';
import React, {
  useEffect,
  useMemo,
  useState,
  SetStateAction,
  Dispatch,
  useRef
} from 'react';
import DataTable from '@/components/v2/common/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
import { LISTING_PAGE_DATA_LIMIT } from '@/constants/business-logic';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import { useRouter, useSearchParams } from 'next/navigation';
import { ManageLocales } from '@/utils/v2/translate';
import Tooltip from '@/components/v2/common/tooltip';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import bookmarkIcon from '@public/v2/assets/icons/modal/bookmark.svg';
import { InputField } from '@/components/v2/common/input-field';

import {
  RenderCarat,
  RenderDiscount,
  RenderDetails,
  RenderLab,
  RenderLotId,
  RednderLocation,
  RenderAmount,
  RenderShape,
  RenderMeasurements,
  RenderTracerId,
  RenderNumericFields,
  RenderPricePerCarat
} from '@/components/v2/common/data-table/helpers/render-cell';
import {
  useLazyGetAllProductQuery,
  useLazyGetProductByScanningBarcodeQuery
} from '@/features/api/product';
import { MRT_RowSelectionState, MRT_SortingState } from 'material-react-table';

import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { DialogComponent } from '@/components/v2/common/dialog';

import { useErrorStateManagement } from '@/hooks/v2/error-state-management';

import {
  useDownloadExcelMutation,
  useEmailExcelMutation
} from '@/features/api/download-excel';

import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import { statusCode } from '@/constants/enums/status-code';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';

import DataTableSkeleton from '@/components/v2/skeleton/data-table';
import { Skeleton } from '@mui/material';

import { NO_PRODUCT_FOUND } from '@/constants/error-messages/saved';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';

import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';

import Image from 'next/image';
import ActionButton from '@/components/v2/common/action-button';
import { isEmailValid } from '@/utils/validate-email';
import { INVALID_EMAIL_FORMAT } from '@/constants/error-messages/register';
import CommonPoppup from '../login/component/common-poppup';
import { columns } from '../search/constant/column';
import useValidationStateManagement from '../search/hooks/validation-state-management';
import { ISavedSearch } from '../search/form/form';

// Column mapper outside the component to avoid re-creation on each render

const DiamondBarcodeScanner = () => {
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [detailImageData, setDetailImageData] = useState<any>({});
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsError, setErrorText } = errorSetState;
  const { isError, errorText } = errorState;
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const [emailExcel] = useEmailExcelMutation();
  const { isInputDialogOpen } = modalState;
  const { setSaveSearchName, saveSearchName, setInputError, inputError } =
    useValidationStateManagement();

  const [triggerBarcodeScanApi] = useLazyGetProductByScanningBarcodeQuery({});

  const [showEmptyState, setShowEmptyState] = useState(false);

  const [validImages, setValidImages] = useState<any>([]);
  const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const locationRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    locationRef.current = selectedOption?.value;
  }, [selectedOption]); // Update when selectedOption changes

  const [isSkeletonLoading, setIsSkeletonLoading] = useState<boolean>(true);

  const editRoute = useSearchParams().get('edit');
  const router = useRouter();

  const [downloadExcel] = useDownloadExcelMutation();

  // Fetch Products

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };

  const handleStateChange = (selectedOption: {
    value: string;
    label: string;
  }) => {
    // Handle the state change logic here
    console.log('Selected state:', selectedOption);
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    let scanTimeout: NodeJS.Timeout;

    let barcode = '';
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        barcode += event.key; // Directly modify the variable
      }

      clearTimeout(scanTimeout);
      scanTimeout = setTimeout(async () => {
        if (barcode) {
          console.log('Scanned Barcode:', barcode, locationRef);
          triggerBarcodeScanApi({
            barcode,
            location: locationRef.current
          })
            .unwrap()
            .then(res => {
              const newData = res?.products || [];
              console.log('newData', newData);
              const existingRows = dataTableState.rows || [];

              // Create a map to track existing rows by id and location
              const existingMap = new Map(
                existingRows.map(row => [`${row.id}-${row.location}`, row])
              );

              // Update existing rows or add new ones
              newData.forEach((newRow: any) => {
                const key = `${newRow.id}-${newRow.location}`;
                existingMap.set(key, { ...existingMap.get(key), ...newRow }); // Update existing row or add new one
              });

              // Convert the map back to an array
              const updatedRows = Array.from(existingMap.values());
              console.log('updatedRows', updatedRows);
              // If there is no data to show, set showEmptyState to true
              if (updatedRows.length === 0) {
                setShowEmptyState(true);
              } else {
                // Set the updated rows
                dataTableSetState.setRows(updatedRows);
              }
            })
            .catch(error => {
              modalSetState.setIsDialogOpen(true);
              modalSetState.setDialogContent(
                <CommonPoppup
                  content={''}
                  customPoppupBodyStyle="mt-[70px]"
                  header={error?.data?.message}
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: ManageLocales('app.modal.okay'),
                      handler: () => {
                        modalSetState.setIsDialogOpen(false);
                      },
                      customStyle: 'flex-1 w-full h-10'
                    }
                  ]}
                />
              );
            });

          barcode = ''; // Reset barcode after processing
        } else {
          setShowEmptyState(true);
        }
      }, 300);
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    if (!dataTableState?.rows.length) {
      setShowEmptyState(true);
    } else {
      setShowEmptyState(false);
    }
  }, [dataTableState.rows]);

  const mapColumns = (columns: any) =>
    columns
      ?.filter(({ is_disabled }: any) => !is_disabled)
      ?.sort(({ sequence: a }: any, { sequence: b }: any) => a - b)
      .map(({ accessor, short_label, label }: any) => {
        const currentSort = sorting.find(sort => sort.id === accessor);
        const nonSortableAccessors = ['shape_full', 'details'];

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
          case 'table_inclusion':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-'
            };
          case 'table_black':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-'
            };

          case 'side_black':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-'
            };

          case 'fluorescence':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-'
            };
          case 'amount':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderAmount({
                  row
                });
              }
            };

          case 'rap':
          case 'rap_value':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => {
                return RenderNumericFields({
                  renderedCellValue
                });
              }
            };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
          case 'shape_full':
            return { ...commonProps, Cell: RenderShape };
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
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => {
                return RenderDiscount({
                  renderedCellValue
                });
              }
            };
          case 'details':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderDetails({ row, handleDetailImage });
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
          case 'price_per_carat':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderPricePerCarat({
                  renderedCellValue
                });
              }
            };
          case 'lab':
            return { ...commonProps, Cell: RenderLab };
          case 'location':
            return { ...commonProps, Cell: RednderLocation };
          case 'lot_id':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue, row }: any) => {
                return RenderLotId({
                  renderedCellValue,
                  row
                });
              }
            };

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

  useEffect(() => {
    setErrorText('');
    setIsError(false);
  }, [rowSelection]);

  // Fetch Columns
  useEffect(() => {
    const fetchColumns = async () => {
      const shapeColumn = columns?.find(
        (column: any) => column.accessor === 'shape'
      );

      if (columns?.length) {
        let additionalColumn = {
          accessor: 'shape_full',
          id: shapeColumn?.id,
          is_disabled: shapeColumn?.is_disabled,
          is_fixed: shapeColumn?.is_fixed,
          label: shapeColumn?.label,
          sequence: shapeColumn?.sequence,
          short_label: shapeColumn?.short_label
        };

        const updatedColumns = [...columns, additionalColumn];

        dataTableSetState.setColumns(updatedColumns);
      }
    };

    fetchColumns();
  }, [dataTableState.rows]);

  console.log('inputDialog Op', isInputDialogOpen);

  const images = [
    {
      name: getShapeDisplayName(detailImageData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace(
        '***',
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.IMG.replace(
        '***',
        detailImageData.location === 'USA-BD'
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
        ? `${FILE_URLS.CERT_PDF_DOWNLOAD_URL.replace(
            '***',
            detailImageData?.certificate_number ?? ''
          )}`
        : '',
      url_check: detailImageData?.assets_pre_check?.CERT_IMG
    },

    {
      name: 'Video',
      url: `${FILE_URLS.B2B.replace(
        '***',
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.B2B_DOWNLOAD_URL.replace(
        '***',
        detailImageData.location === 'USA-BD'
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
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.B2B_SPARKLE_DOWNLOAD_URL.replace(
        '***',
        detailImageData.location === 'USA-BD'
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
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.HEART.replace(
        '***',
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace(
        '***',
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.ARROW.replace(
        '***',
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace(
        '***',
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.ASET.replace(
        '***',
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace(
        '***',
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.IDEAL.replace(
        '***',
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      category: 'Image'
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData.location === 'USA-BD'
          ? detailImageData.memo_out_barcode ?? ''
          : detailImageData?.lot_id ?? ''
      )}`,
      downloadUrl: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData.location === 'USA-BD'
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

  const memoizedRows = useMemo(() => {
    return Array.isArray(dataTableState.rows) ? dataTableState.rows : [];
  }, [dataTableState.rows]);
  const memoizedColumns = useMemo(
    () => mapColumns(dataTableState.columns),
    [dataTableState.columns, sorting]
  );

  useEffect(() => {
    isError &&
      setTimeout(() => {
        setIsError(false); // Hide the toast notification after some time
      }, 4000);
  }, [isError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError('');
    const inputValue = e.target.value;

    setSaveSearchName(inputValue);
  };

  const renderContentWithInput = () => {
    return (
      <>
        {' '}
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={bookmarkIcon} alt="bookmarkIcon" />
        </div>
        <div className="absolute bottom-[30px] flex flex-col gap-[5px] w-[352px]">
          <div>
            <h1 className="text-headingS text-neutral900">
              {' '}
              Export Excel Via Email
            </h1>
          </div>
          <div>
            <InputField
              type="text"
              value={saveSearchName}
              name={'savedSearch'}
              placeholder={'Email'}
              onChange={handleInputChange}
              styles={{
                inputMain: 'w-full',
                input: `h-[40px] p-2 flex-grow block w-[100%] !text-primaryMain min-w-0 rounded-r-sm text-mRegular shadow-[var(--input-shadow)] border-[1px] border-neutral200 rounded-r-[4px]
                  ${inputError ? 'border-dangerMain' : 'border-neutral200'}`
              }}
            />

            <div className=" text-dangerMain text-sRegular font-regular flex text-left  h-[10px]">
              {inputError ?? ''}
            </div>
          </div>

          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: ManageLocales('app.modal.cancel'),
                handler: () => {
                  setSaveSearchName('');
                  setInputError('');
                  modalSetState.setIsInputDialogOpen(false);
                },
                customStyle: 'flex-1 h-10'
              },
              {
                variant: 'primary',
                label: 'Sent Excel',
                isDisable: !saveSearchName.length,
                handler: () => {
                  if (!saveSearchName.length) {
                    setInputError('Please enter your email');
                  } else if (
                    isEmailValid(saveSearchName) &&
                    saveSearchName.length
                  ) {
                    handleExportExcelViaEmail(saveSearchName);
                  } else {
                    setInputError(INVALID_EMAIL_FORMAT);
                  }
                },
                customStyle: 'flex-1 h-10'
              }
            ]}
          />
        </div>
      </>
    );
  };

  const handleExportExcelViaEmail = (saveSearchName: string) => {
    let selectedIds = Object.keys(rowSelection);
    const allProductIds = memoizedRows.map(({ id }: { id: string }) => {
      return id;
    });

    setIsLoading(true);
    // Explicitly type res to include unwrap method
    emailExcel({
      products: selectedIds.length > 0 ? selectedIds : allProductIds,
      page: 'Normal_Search',
      email: saveSearchName
    })
      .unwrap()
      .then((res: any) => {
        const { message } = res;
        console.log('data', data);
        if (message && modalSetState.setDialogContent) {
          modalSetState.setIsInputDialogOpen(false);
          // Handle any post-download actions here
          if (modalSetState.setIsDialogOpen)
            modalSetState.setIsDialogOpen(true);
          if (setRowSelection) setRowSelection({});

          setIsLoading(false);
          if (modalSetState.setDialogContent) {
            modalSetState.setDialogContent(
              <CommonPoppup
                content={''}
                status="success"
                customPoppupBodyStyle="!mt-[70px]"
                header={'Excel Sent Successfully'}
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => modalSetState.setIsDialogOpen(false),
                    customStyle: 'flex-1 w-full'
                  }
                ]}
              />
            );
          }
        }
      })
      .catch((error: any) => {
        setIsLoading(false);
        if (modalSetState.setIsDialogOpen) modalSetState.setIsDialogOpen(true);
        if (modalSetState.setDialogContent) {
          if (error.data?.type === 'unauthorized') {
            modalSetState.setDialogContent(
              <CommonPoppup
                content={
                  'To download excel, KYC verification is mandatory. Without verification, access to certain features is restricted.'
                }
                customPoppupStyle="!h-[220px]"
                customPoppupBodyStyle="!mt-[62px]"
                header={`Important KYC Verification Required!`}
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.cancel'),
                    handler: () => modalSetState.setIsDialogOpen(false),
                    customStyle: 'w-full flex-1'
                  },
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.verifyMyKYCNow'),
                    handler: () => {
                      router.push('/v2/kyc');
                    },
                    customStyle: 'w-full flex-1'
                  }
                ]}
              />
            );
          } else if (error.data?.type === 'not_allowed') {
            modalSetState.setDialogContent(
              <CommonPoppup
                content={error?.data?.message}
                status="warning"
                customPoppupBodyStyle="!mt-[70px]"
                header={'Maximum Download Limit'}
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      modalSetState.setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1'
                  }
                ]}
              />
            );
          } else {
            modalSetState.setDialogContent(
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="!mt-[70px]"
                header={error?.data?.message ?? 'Something went wrong'}
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => modalSetState.setIsDialogOpen(false),
                    customStyle: 'flex-1 w-full'
                  }
                ]}
              />
            );
          }
        }
      });
  };

  return (
    <div className="relative">
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}

      <InputDialogComponent
        isOpen={isInputDialogOpen}
        onClose={() => modalSetState.setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
        dialogStyle={'!min-h-[277px]'}
      />
      <ImageModal
        setIsLoading={setIsLoading}
        isOpen={isModalOpen}
        stockNumber={detailImageData?.lot_id ?? ''}
        onClose={() => {
          setValidImages([]);
          setDetailImageData({});
          setIsModalOpen(!isModalOpen);
        }}
        images={validImages}
      />

      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        // dialogStyle={{
        //   dialogContent: isConfirmStone ? 'h-[480px] min-h-[480px]' : ''
        // }}
      />

      <div className="flex py-[8px] items-center">
        <p className="text-lMedium font-medium text-neutral900">
          {editRoute ? (
            ManageLocales('app.result.headerEdit')
          ) : isSkeletonLoading ? (
            <Skeleton
              variant="rectangular"
              height={'24px'}
              width={'336px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
            />
          ) : (
            ManageLocales('app.result.headerResult')
          )}
        </p>
      </div>

      <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
        <div className="">
          <DataTable
            rows={memoizedRows}
            columns={memoizedColumns}
            setRowSelection={setRowSelection}
            rowSelection={rowSelection}
            showCalculatedField={true}
            modalSetState={modalSetState}
            downloadExcel={downloadExcel}
            dataTableSetState={dataTableSetState}
            barcodeScan={true}
            setIsError={setIsError}
            setErrorText={setErrorText}
            setIsLoading={setIsLoading}
            setSorting={setSorting}
            sorting={sorting}
            setIsSkeletonLoading={setIsSkeletonLoading}
            isSkeletonLoading={isSkeletonLoading}
            showEmptyState={showEmptyState}
            handleStateChange={handleStateChange}
            selectedOption={selectedOption}
          />
        </div>
      </div>
    </div>
  );
};
export default DiamondBarcodeScanner;
