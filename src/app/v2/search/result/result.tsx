import React, {
  useEffect,
  useMemo,
  useState,
  SetStateAction,
  Dispatch
} from 'react';
import DataTable from '@/components/v2/common/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
import {
  HOLD_STATUS,
  LISTING_PAGE_DATA_LIMIT,
  MEMO_STATUS
} from '@/constants/business-logic';
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';

import { constructUrlParams } from '@/utils/v2/construct-url-params';
import { useRouter, useSearchParams } from 'next/navigation';
import { ManageLocales } from '@/utils/v2/translate';
import ActionButton from '@/components/v2/common/action-button';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import Tooltip from '@/components/v2/common/tooltip';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
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
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';
import {
  useConfirmProductMutation,
  useLazyGetAllProductQuery
} from '@/features/api/product';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { MRT_RowSelectionState } from 'material-react-table';
import { notificationBadge } from '@/features/notification/notification-slice';
import { useAddCartMutation } from '@/features/api/cart';
import { useAppDispatch } from '@/hooks/hook';
import Image from 'next/image';
import bookmarkIcon from '@public/v2/assets/icons/modal/bookmark.svg';
import errorSvg from '@public/v2/assets/icons/modal/error.svg';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { DialogComponent } from '@/components/v2/common/dialog';
import {
  clarity,
  fluorescenceSortOrder,
  sideBlackSortOrder,
  tableBlackSortOrder,
  tableInclusionSortOrder
} from '@/constants/v2/form';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { SOME_STONES_ARE_ON_HOLD_MODIFY_SEARCH } from '@/constants/error-messages/confirm-stone';
import { NOT_MORE_THAN_300 } from '@/constants/error-messages/search';
import { NO_STONES_AVAILABLE } from '@/constants/error-messages/compare-stone';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import { InputField } from '@/components/v2/common/input-field';
import { handleSaveSearch } from './helpers/handle-save-search';
import {
  useAddSavedSearchMutation,
  useGetSavedSearchListQuery
} from '@/features/api/saved-searches';
import { ISavedSearch } from '../form/form';
import ConfirmStone from './components';
import { handleConfirmStone } from './helpers/handle-confirm-stone';
import { AddCommentDialog } from '@/components/v2/common/comment-dialog';
import { handleComment } from './helpers/handle-comment';
import { useDownloadExcelMutation } from '@/features/api/download-excel';

import threeDotsSvg from '@public/v2/assets/icons/threedots.svg';
import { Dropdown } from '@/components/v2/common/dropdown-menu';
import { IItem } from '../saved-search/saved-search';
import { IManageListingSequenceResponse, IProduct } from '../interface';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { Toast } from '@/components/v2/common/copy-and-share/toast';

// Column mapper outside the component to avoid re-creation on each render

const Result = ({
  activeTab,
  searchParameters,
  setActiveTab,
  handleCloseAllTabs,
  handleCloseSpecificTab,
  setSearchParameters,
  setIsLoading
}: {
  activeTab: number;
  searchParameters: any;
  setSearchParameters: Dispatch<SetStateAction<ISavedSearch[]>>;
  setActiveTab: Dispatch<SetStateAction<number>>;
  handleCloseAllTabs: () => void;
  handleCloseSpecificTab: (id: number) => void;
  setIsLoading: any;
}) => {
  const dispatch = useAppDispatch();

  const { data: searchList }: { data?: IItem[] } =
    useGetSavedSearchListQuery('');
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();
  const { setIsError, setErrorText, setInputError } = errorSetState;
  const { isError, errorText, inputError } = errorState;
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent, isInputDialogOpen } = modalState;
  const { setIsDialogOpen, setDialogContent, setIsInputDialogOpen } =
    modalSetState;
  const [isAddCommentDialogOpen, setIsAddCommentDialogOpen] = useState(false);
  const [saveSearchName, setSaveSearchName] = useState('');
  const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [breadCrumLabel, setBreadCrumLabel] = useState('');

  const [isConfirmStone, setIsConfirmStone] = useState(false);
  const [confirmStoneData, setConfirmStoneData] = useState<IProduct[]>([]);
  const [commentValue, setCommentValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');

  // UseMutation to add items to the cart
  const [addCart] = useAddCartMutation();

  const editRoute = useSearchParams().get('edit');
  const router = useRouter();
  const [searchUrl, setSearchUrl] = useState('');

  const [addSavedSearch] = useAddSavedSearchMutation();
  const [downloadExcel] = useDownloadExcelMutation();
  const [confirmProduct] = useConfirmProductMutation();

  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
  const [triggerProductApi] = useLazyGetAllProductQuery();
  // Fetch Products

  const fetchProducts = async () => {
    setIsLoading(true);
    const storedSelection = localStorage.getItem('Search');

    if (!storedSelection) return;

    if (activeTab <= 0) return;

    const selections = JSON.parse(storedSelection);

    const url = constructUrlParams(selections[activeTab - 1]?.queryParams);
    setSearchUrl(url);
    triggerProductApi({ url, limit: LISTING_PAGE_DATA_LIMIT, offset: 0 }).then(
      (res: any) => {
        if (columnData?.length > 0) {
          // let newArr: any = [];
          // res.data.products.forEach((row: any) => {
          //   let obj: any = {};
          //   columnData?.forEach(col => {
          //     if (col.accessor === 'amount') {
          //       obj[col.accessor] === row.variants[0].prices[0].amount;
          //     } else {
          //       obj[col.accessor] = row[col.accessor];
          //     }
          //   });
          //   newArr.push(obj);
          // });
          dataTableSetState.setRows(res.data.products);
          setRowSelection({});
          setErrorText('');
          setData(res.data);
          setIsLoading(false);
        }
      }
    );
  };
  const handleDetailPage = ({ row }: { row: any }) => {
    if (isConfirmStone) {
      setBreadCrumLabel('Confirm Stone');
    }
    setIsDetailPage(true);
    setIsError(false);
    setErrorText('');
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
          case 'clarity':
            return {
              ...commonProps,
              sortingFn: (rowA: any, rowB: any, columnId: string) => {
                const indexA = clarity.indexOf(rowA.original[columnId]);
                const indexB = clarity.indexOf(rowB.original[columnId]);
                return indexA - indexB;
              }
            };
          case 'table_inclusion':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-',
              sortingFn: (rowA: any, rowB: any, columnId: string) => {
                const indexA = tableInclusionSortOrder.indexOf(
                  rowA.original[columnId]
                );
                const indexB = tableInclusionSortOrder.indexOf(
                  rowB.original[columnId]
                );
                return indexA - indexB;
              }
            };
          case 'table_black':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-',
              sortingFn: (rowA: any, rowB: any, columnId: string) => {
                const indexA = tableBlackSortOrder.indexOf(
                  rowA.original[columnId]
                );
                const indexB = tableBlackSortOrder.indexOf(
                  rowB.original[columnId]
                );
                return indexA - indexB;
              }
            };

          case 'side_black':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-',
              sortingFn: (rowA: any, rowB: any, columnId: string) => {
                const indexA = sideBlackSortOrder.indexOf(
                  rowA.original[columnId]
                );
                const indexB = sideBlackSortOrder.indexOf(
                  rowB.original[columnId]
                );
                return indexA - indexB;
              }
            };

          case 'fluorescence':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => renderedCellValue ?? '-',
              sortingFn: (rowA: any, rowB: any, columnId: string) => {
                const indexA = fluorescenceSortOrder.indexOf(
                  rowA.original[columnId]
                );
                const indexB = fluorescenceSortOrder.indexOf(
                  rowB.original[columnId]
                );
                return indexA - indexB;
              }
            };
          case 'amount':
            return { ...commonProps, Cell: RenderAmount };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
          case 'shape_full':
            return { ...commonProps, Cell: RenderShape };
          case 'carat':
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
          case 'price_per_carat':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: { renderedCellValue: any }) => (
                <span>{`${
                  renderedCellValue === 0
                    ? '0.00'
                    : renderedCellValue?.toFixed(2) ?? '0.00'
                }%`}</span>
              )
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
                  row,
                  handleDetailPage
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
    // setIsLoading(true)
    fetchProducts();
  }, [activeTab, columnData]);

  useEffect(() => {
    setErrorText('');
    setIsError(false);
  }, [rowSelection]);

  // Fetch Columns
  useEffect(() => {
    const fetchColumns = async () => {
      const response = await triggerColumn({});
      const shapeColumn = response.data?.find(
        (column: any) => column.accessor === 'shape'
      );

      if (response.data?.length) {
        let additionalColumn = {
          accessor: 'shape_full',
          id: shapeColumn?.id,
          is_disabled: shapeColumn?.is_disabled,
          is_fixed: shapeColumn?.is_fixed,
          label: shapeColumn?.label,
          sequence: shapeColumn?.sequence,
          short_label: shapeColumn?.short_label
        };

        const updatedColumns = [...response.data, additionalColumn];
        dataTableSetState.setColumns(updatedColumns);
      }
    };

    fetchColumns();
  }, []);
  const memoizedRows = useMemo(() => {
    return Array.isArray(dataTableState.rows) ? dataTableState.rows : [];
  }, [dataTableState.rows]);
  const memoizedColumns = useMemo(
    () => mapColumns(dataTableState.columns),
    [dataTableState.columns]
  );
  const handleNewSearch = () => {
    router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`);
  };

  const handleAddToCart = () => {
    let selectedIds = Object.keys(rowSelection);

    if (selectedIds.length > 300) {
      setIsError(true);
      setErrorText(NOT_MORE_THAN_300);
    } else if (!selectedIds.length) {
      setIsError(true);
      setErrorText(NO_STONES_SELECTED);
    } else {
      setIsLoading(true);
      const variantIds = selectedIds
        ?.map((id: string) => {
          const myCartCheck: IProduct | object =
            dataTableState.rows.find((row: IProduct) => {
              return row?.id === id;
            }) ?? {};

          if (myCartCheck && 'variants' in myCartCheck) {
            return myCartCheck.variants[0]?.id;
          }
          return '';
        })
        .filter(Boolean);

      // If there are variant IDs, add to the cart
      if (variantIds.length) {
        addCart({
          variants: variantIds
        })
          .unwrap()
          .then((res: any) => {
            setIsLoading(false);
            setIsDialogOpen(true);
            setDialogContent(
              <>
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={confirmIcon} alt="confirmIcon" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <h1 className="text-headingS text-neutral900">
                    {res?.message}
                  </h1>
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: 'primary',
                        label: ManageLocales('app.modal.continue'),
                        handler: () => setIsDialogOpen(false),
                        customStyle: 'flex-1 w-full h-10'
                      },
                      {
                        variant: 'primary',
                        label: 'Go to "My Cart"',
                        handler: () => {
                          router.push('/v2/my-cart');
                        },
                        customStyle: 'flex-1 w-full h-10'
                      }
                    ]}
                  />
                </div>
              </>
            );
            // On success, show confirmation dialog and update badge
            setIsError(false);
            setErrorText('');
            triggerProductApi({
              url: searchUrl,
              limit: LISTING_PAGE_DATA_LIMIT,
              offset: 0
            }).then(res => {
              dataTableSetState.setRows(res.data.products);
              setRowSelection({});
              setErrorText('');
              setData(res.data);
            });
            dispatch(notificationBadge(true));

            // refetchRow();
          })
          .catch(error => {
            setIsLoading(false);
            // On error, set error state and error message

            setIsDialogOpen(true);
            setDialogContent(
              <>
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={errorSvg} alt="errorSvg" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <p className="text-neutral600 text-mRegular">
                    {error?.data?.message}
                  </p>
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: 'primary',
                        label: ManageLocales('app.modal.okay'),
                        handler: () => {
                          setIsDialogOpen(false);
                        },
                        customStyle: 'flex-1 w-full h-10'
                      }
                    ]}
                  />
                </div>
              </>
            );
          });
        // Clear the selected checkboxes
        setRowSelection({});
      }
      // }
    }
  };

  const handleAddToCartDetailPage = () => {
    const hasMemoOut = dataTableState.rows.some(
      (row: IProduct) =>
        row.id === detailPageData.id && row.diamond_status === MEMO_STATUS
    );
    const hasHold = dataTableState.rows.some(
      (row: IProduct) =>
        row.id === detailPageData.id && row.diamond_status === HOLD_STATUS
    );

    if (hasMemoOut) {
      setErrorText(NO_STONES_AVAILABLE);
      setIsError(true);
    } else if (hasHold) {
      setIsError(true);
      setErrorText(SOME_STONES_ARE_ON_HOLD_MODIFY_SEARCH);
    } else {
      setIsLoading(true);
      // Extract variant IDs for selected stones
      const variantIds = [detailPageData.id]
        ?.map((id: string) => {
          const myCartCheck: IProduct | object =
            dataTableState.rows.find((row: IProduct) => {
              return row?.id === detailPageData.id;
            }) ?? {};

          if (myCartCheck && 'variants' in myCartCheck) {
            return myCartCheck.variants[0]?.id;
          }
          return '';
        })
        .filter(Boolean);

      // If there are variant IDs, add to the cart
      if (variantIds.length) {
        addCart({
          variants: variantIds
        })
          .unwrap()
          .then((res: any) => {
            setIsLoading(false);
            setIsDialogOpen(true);
            setDialogContent(
              <>
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={confirmIcon} alt="confirmIcon" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <h1 className="text-headingS text-neutral900">
                    {res?.message}
                  </h1>
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: 'secondary',
                        label: ManageLocales('app.modal.continue'),
                        handler: () => {
                          setIsDialogOpen(false);
                          setIsDetailPage(false);
                        },
                        customStyle: 'flex-1 w-full h-10'
                      },
                      {
                        variant: 'primary',
                        label: 'Go to "My Cart"',
                        handler: () => {
                          router.push('/v2/my-cart');
                        },
                        customStyle: 'flex-1 w-full h-10'
                      }
                    ]}
                  />
                </div>
              </>
            );
            // On success, show confirmation dialog and update badge
            setIsError(false);
            setErrorText('');
            triggerProductApi({
              url: searchUrl,
              limit: LISTING_PAGE_DATA_LIMIT,
              offset: 0
            }).then(res => {
              dataTableSetState.setRows(res.data.products);
              setRowSelection({});
              setErrorText('');
              setData(res.data);
            });
            dispatch(notificationBadge(true));

            // refetchRow();
          })
          .catch(error => {
            setIsLoading(false);
            // On error, set error state and error message

            setIsDialogOpen(true);
            setDialogContent(
              <>
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={errorSvg} alt="errorSvg" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <p className="text-neutral600 text-mRegular">
                    {error?.data?.message}
                  </p>
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: 'primary',
                        label: ManageLocales('app.modal.okay'),
                        handler: () => {
                          setIsDialogOpen(false);
                        },
                        customStyle: 'flex-1 w-full h-10'
                      }
                    ]}
                  />
                </div>
              </>
            );
          });
        // Clear the selected checkboxes
        setRowSelection({});
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputError('');
    const inputValue = e.target.value;
    if (inputValue.length <= 20) {
      setSaveSearchName(inputValue);
    } else {
      setSaveSearchName(inputValue.slice(0, 20));
      setInputError('Input cannot exceed 20 characters');
    }
  };

  const renderContentWithInput = () => {
    return (
      <>
        {' '}
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={bookmarkIcon} alt="bookmarkIcon" />
        </div>
        <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px] ">
          <div>
            <h1 className="text-headingS text-neutral900">
              {' '}
              {ManageLocales('app.advanceSearch.savedSearch.input.header')}
            </h1>
            <p className="text-neutral600 text-mRegular">
              {ManageLocales('app.advanceSearch.savedSearch.input.content')}
            </p>
          </div>
          <div>
            <InputField
              type="text"
              value={saveSearchName}
              name={'savedSearch'}
              placeholder={'Search Name'}
              onChange={handleInputChange}
              styles={{
                inputMain: 'w-full',
                input: `h-[40px] p-2 flex-grow block w-[100%] !text-primaryMain min-w-0 rounded-r-sm text-mRegular shadow-[var(--input-shadow)] border-[1px] border-neutral200 rounded-r-[4px]
                ${inputError ? 'border-dangerMain' : 'border-neutral200'}`
              }}
            />

            <div className=" text-dangerMain text-sRegular font-regular flex text-left h-[5px]">
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
                  setIsInputDialogOpen(false);
                },
                customStyle: 'flex-1 h-10'
              },
              {
                variant: 'primary',
                label: ManageLocales('app.modal.save'),
                handler: () => {
                  if (!saveSearchName.length) {
                    setInputError('Please enter name');
                  } else {
                    !inputError.length &&
                      handleSaveSearch({
                        addSavedSearch,
                        saveSearchName,
                        activeTab,
                        data,
                        setIsInputDialogOpen,
                        setStoredSelection: setSearchParameters,
                        setSaveSearchName,
                        setInputError
                      });
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

  const goBackToListView = (isFrom?: string) => {
    if (isFrom === 'Detail Page') {
      setIsDetailPage(true);
      setBreadCrumLabel('');
    }
    setIsConfirmStone(false);
    setConfirmStoneData([]);
  };

  const renderAddCommentDialogs = () => {
    return (
      <>
        {' '}
        <div className="flex flex-col gap-[15px] px-[24px] pt-[24px]">
          <div>
            <div className="flex justify-between pb-[16px]">
              <h1 className="text-headingS text-neutral900">
                {' '}
                {ManageLocales('app.modal.addComment')}
              </h1>
              <button
                onClick={() => {
                  setIsAddCommentDialogOpen(false);
                }}
              >
                <Image src={crossIcon} alt="crossIcon" />
              </button>
            </div>
            <p className="text-neutral600 text-mRegular">
              {ManageLocales('app.modal.addComment.content')}
            </p>
          </div>
          <div className="pt-[4px]">
            <textarea
              value={textAreaValue}
              name="textarea"
              rows={10}
              // placeholder='Write Description'
              className="w-full bg-neutral0 text-neutral900 rounded-[4px] resize-none focus:outline-none p-2 border-neutral-200 border-[1px] mt-2"
              style={{ boxShadow: 'var(--input-shadow) inset' }}
              onChange={e => handleComment(e, setTextAreaValue)}
            />
          </div>
        </div>
        <div
          className="border-t-neutral-200 border-t-[1px] rounded-b-[8px] p-[24px]"
          style={{ background: 'var(--neutral-25)' }}
        >
          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: ManageLocales('app.modal.addComment.cancel'),
                handler: () => {
                  setIsAddCommentDialogOpen(false);
                },
                customStyle: 'flex-1'
              },
              {
                variant: 'primary',
                label: ManageLocales('app.modal.addComment.saveComment'),
                handler: () => {
                  setCommentValue(textAreaValue);
                  setIsAddCommentDialogOpen(false);
                },
                customStyle: 'flex-1'
              }
            ]}
          />
        </div>
      </>
    );
  };

  const confirmStoneApiCall = () => {
    const variantIds: string[] = [];

    confirmStoneData.forEach((ids: any) => {
      variantIds.push(ids.variants[0].id);
    });

    if (variantIds.length) {
      setIsLoading(true);
      confirmProduct({
        variants: variantIds,
        comments: commentValue
      })
        .unwrap()
        .then(res => {
          if (res) {
            setIsLoading(false);
            setCommentValue('');
            setIsDialogOpen(true);

            setRowSelection({});
            setDialogContent(
              <>
                {' '}
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={confirmIcon} alt="confirmIcon" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <h1 className="text-headingS text-neutral900">
                    {variantIds.length} stones have been successfully added to
                    &quot;My Diamond&quot;
                  </h1>
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: 'secondary',
                        label: ManageLocales('app.modal.continue'),
                        handler: () => {
                          goBackToListView();
                          setIsAddCommentDialogOpen(false);
                          setIsDialogOpen(false);
                        },
                        customStyle: 'flex-1 w-full h-10'
                      },
                      {
                        variant: 'primary',
                        label: ManageLocales('app.modal.goToYourOrder'),
                        handler: () => {
                          router.push('/v2/your-orders');
                        },
                        customStyle: 'flex-1 w-full h-10'
                      }
                    ]}
                  />
                </div>
              </>
            );
            setCommentValue('');

            triggerProductApi({
              url: searchUrl,
              limit: LISTING_PAGE_DATA_LIMIT,
              offset: 0
            }).then(res => {
              dataTableSetState.setRows(res.data.products);
              setRowSelection({});
              setErrorText('');
              setData(res.data);
            });
          }
        })
        .catch(e => {
          setIsLoading(false);
          setCommentValue('');

          if (e.data.type === 'unauthorized') {
            setIsDialogOpen(true);
            setDialogContent(
              <div className="h-[270px]">
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={errorSvg} alt="errorSvg" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <div>
                    <h1 className="text-headingS text-neutral900">
                      Important KYC Verification Required!
                    </h1>
                    <p className="text-neutral600 text-mRegular">
                      To confirm a stone or make a purchase, KYC verification is
                      mandatory. Without verification, access to certain
                      features is restricted.
                    </p>
                  </div>
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: 'secondary',
                        label: ManageLocales('app.modal.cancel'),
                        handler: () => setIsDialogOpen(false),
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
                </div>
              </div>
            );
          } else {
            setIsDialogOpen(true);
            setDialogContent(
              <>
                {' '}
                <div className="absolute left-[-84px] top-[-84px]">
                  <Image src={errorSvg} alt="errorSvg" />
                </div>
                <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                  <p className="text-neutral600 text-mRegular font-sans">
                    {e?.data?.message}
                  </p>
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: 'primary',
                        label: ManageLocales('app.modal.okay'),
                        handler: () => {
                          setIsDialogOpen(false);
                        },
                        customStyle: 'flex-1 w-full h-10'
                      }
                    ]}
                  />
                </div>
              </>
            );
          }
        });
    }
  };

  const images = [
    {
      name: getShapeDisplayName(detailImageData?.shape ?? ''),
      url: `${FILE_URLS.IMG.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'GIA Certificate',
      url: detailImageData?.certificate_url ?? '',
      isSepratorNeeded: true
    },
    {
      name: 'B2B',
      url: `${FILE_URLS.B2B.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'B2B Sparkle',
      url: `${FILE_URLS.B2B_SPARKLE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      isSepratorNeeded: true
    },

    {
      name: 'Heart',
      url: `${FILE_URLS.HEART.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'Arrow',
      url: `${FILE_URLS.ARROW.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'Aset',
      url: `${FILE_URLS.ASET.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'Ideal',
      url: `${FILE_URLS.IDEAL.replace('***', detailImageData?.lot_id ?? '')}`
    },
    {
      name: 'Fluorescence',
      url: `${FILE_URLS.FLUORESCENCE.replace(
        '***',
        detailImageData?.lot_id ?? ''
      )}`,
      isSepratorNeeded: true
    }
  ];

  const goBack = () => {
    if (breadCrumLabel === 'Confirm Stone') {
      setBreadCrumLabel('');
    }
    setIsDetailPage(false);
    setDetailPageData({});
  };
  useEffect(() => {
    isError &&
      setTimeout(() => {
        setIsError(false); // Hide the toast notification after some time
      }, 2000);
  }, [isError]);

  return (
    <div className="relative">
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}
      <ImageModal
        setIsLoading={setIsLoading}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(!isModalOpen)}
        selectedImageIndex={0}
        images={images}
      />
      <DialogComponent
        dialogContent={dialogContent}
        isOpens={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        dialogStyle={{ dialogContent: isConfirmStone ? 'h-[240px]' : '' }}
      />
      <InputDialogComponent
        isOpen={isInputDialogOpen}
        onClose={() => setIsInputDialogOpen(false)}
        renderContent={renderContentWithInput}
      />
      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={renderAddCommentDialogs}
      />
      {!isDetailPage && (
        <div className="flex py-[8px] items-center">
          <p className="text-lMedium font-medium text-neutral900">
            {editRoute
              ? ManageLocales('app.result.headerEdit')
              : ManageLocales('app.result.headerResult')}
          </p>
        </div>
      )}

      {isDetailPage && detailPageData?.length ? (
        <>
          <DiamondDetailsComponent
            data={dataTableState.rows}
            filterData={detailPageData}
            goBackToListView={goBack}
            handleDetailPage={handleDetailPage}
            breadCrumLabel={
              breadCrumLabel.length ? breadCrumLabel : 'Search Results'
            }
            modalSetState={modalSetState}
            setIsLoading={setIsLoading}
          />
          <div className="p-[16px] flex justify-end items-center border-t-[1px] border-l-[1px] border-neutral-200 gap-3 rounded-b-[8px] shadow-inputShadow ">
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
                  variant: isConfirmStone ? 'primary' : 'secondary',
                  label: ManageLocales('app.searchResult.addToCart'),
                  handler: handleAddToCartDetailPage
                },

                {
                  variant: 'primary',
                  label: ManageLocales('app.searchResult.confirmStone'),
                  isHidden: isConfirmStone,
                  handler: () => {
                    setIsDetailPage(false);
                    setBreadCrumLabel('Detail Page');
                    const { id } = detailPageData;
                    const selectedRows = { [id]: true };
                    handleConfirmStone({
                      selectedRows: selectedRows,
                      rows: dataTableState.rows,
                      setIsError,
                      setErrorText,
                      setIsConfirmStone,
                      setConfirmStoneData
                    });
                  }
                }
              ]}
            />
            <Dropdown
              dropdownTrigger={
                <Image
                  src={threeDotsSvg}
                  alt="threeDotsSvg"
                  width={4}
                  height={43}
                />
              }
              dropdownMenu={[
                {
                  label: ManageLocales(
                    'app.search.actionButton.bookAppointment'
                  ),
                  handler: () => {}
                },
                {
                  label: ManageLocales(
                    'app.search.actionButton.findMatchingPair'
                  ),
                  handler: () => {}
                }
              ]}
              isDisable={true}
            />
          </div>
        </>
      ) : (
        <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow">
          {isConfirmStone ? (
            <ConfirmStone
              rows={confirmStoneData}
              columns={columnData}
              goBackToListView={goBackToListView}
              activeTab={activeTab}
              isFrom={breadCrumLabel}
              handleDetailImage={handleDetailImage}
              handleDetailPage={handleDetailPage}
              identifier={'result'}
            />
          ) : (
            <div className="">
              <DataTable
                rows={memoizedRows}
                columns={memoizedColumns}
                setRowSelection={setRowSelection}
                rowSelection={rowSelection}
                showCalculatedField={true}
                isResult={true}
                activeTab={activeTab}
                searchParameters={searchParameters}
                setActiveTab={setActiveTab}
                handleCloseAllTabs={handleCloseAllTabs}
                handleCloseSpecificTab={handleCloseSpecificTab}
                handleNewSearch={handleNewSearch}
                setSearchParameters={setSearchParameters}
                modalSetState={modalSetState}
                data={data}
                setErrorText={setErrorText}
                downloadExcel={downloadExcel}
                setIsError={setIsError}
                searchList={searchList}
                setIsLoading={setIsLoading}
                handleAddToCart={handleAddToCart}
                handleConfirmStone={handleConfirmStone}
                setIsConfirmStone={setIsConfirmStone}
                setConfirmStoneData={setConfirmStoneData}
              />
            </div>
          )}
          {/* <div className="p-[16px] rounded-b-[8px] shadow-inputShadow "> */}
          {isConfirmStone && (
            <div className="px-4 py-2">
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.confirmStone.footer.back'),
                    handler: () => {
                      goBackToListView();
                    }
                  },

                  {
                    variant: 'secondary',
                    label: ManageLocales('app.confirmStone.footer.addComment'),
                    handler: () => {
                      setCommentValue('');
                      setIsAddCommentDialogOpen(true);
                    }
                  },

                  {
                    variant: 'primary',
                    label: ManageLocales(
                      'app.confirmStone.footer.confirmStone'
                    ),
                    handler: () => confirmStoneApiCall()
                  }
                ]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Result;
