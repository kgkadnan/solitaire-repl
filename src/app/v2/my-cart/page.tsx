'use client';
import DataTable from '@/components/v2/common/data-table';
import { useDataTableStateManagement } from '@/components/v2/common/data-table/hooks/data-table-state-management';
import {
  AVAILABLE_STATUS,
  BID_TO_BUY_STATUS,
  HOLD_STATUS,
  MEMO_STATUS,
  SOLD_STATUS
} from '@/constants/business-logic';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { ManageLocales } from '@/utils/v2/translate';
import { MRT_RowSelectionState, MRT_SortingState } from 'material-react-table';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import contactIcon from '@public/v2/assets/icons/modal/contact-sale.svg';
import Image from 'next/image';
import Tooltip from '@/components/v2/common/tooltip';
import React, { useEffect, useState } from 'react';
import {
  useDeleteCartMutation,
  useLazyGetCartQuery
} from '@/features/api/cart';
import ActionButton from '@/components/v2/common/action-button';
import EmptyScreen from '@/components/v2/common/empty-screen';
import empty from '@public/v2/assets/icons/my-cart/empty-cart.svg';
import { DialogComponent } from '@/components/v2/common/dialog';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import deleteIcon from '@public/v2/assets/icons/modal/bin.svg';

import {
  RednderLocation,
  RenderAmount,
  RenderCarat,
  RenderCartLotId,
  RenderDetails,
  RenderDiscount,
  RenderLab,
  RenderMeasurements,
  RenderNumericFields,
  RenderPricePerCarat,
  RenderShape,
  RenderTracerId
} from '@/components/v2/common/data-table/helpers/render-cell';

import {
  clarity,
  fluorescenceSortOrder,
  sideBlackSortOrder,
  tableBlackSortOrder,
  tableInclusionSortOrder
} from '@/constants/v2/form';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import { handleConfirmStone } from '../search/result/helpers/handle-confirm-stone';
import ConfirmStone from '../search/result/components';
import { AddCommentDialog } from '@/components/v2/common/comment-dialog';
import { handleComment } from '../search/result/helpers/handle-comment';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  useCheckProductAvailabilityMutation,
  useConfirmProductMutation
} from '@/features/api/product';
import { IProduct, IProductItem } from '../search/interface';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import { FILE_URLS } from '@/constants/v2/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { MatchRoutes, SubRoutes } from '@/constants/v2/enums/routes';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import { kycStatus } from '@/constants/enums/kyc';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import { IAppointmentPayload } from '../my-appointments/page';
import { useLazyGetAvailableMyAppointmentSlotsQuery } from '@/features/api/my-appointments';
import { SELECT_STONE_TO_PERFORM_ACTION } from '@/constants/error-messages/confirm-stone';
import BookAppointment from '../my-appointments/components/book-appointment/book-appointment';
import CommonPoppup from '../login/component/common-poppup';
import DataTableSkeleton from '@/components/v2/skeleton/data-table';
import { Skeleton } from '@mui/material';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { setConfirmStoneTrack } from '@/features/confirm-stone-track/confirm-stone-track-slice';
import { useLazyGetCustomerQuery } from '@/features/api/dashboard';
import { STONE_LOCATION } from '@/constants/v2/enums/location';
import { kamLocationAction } from '@/features/kam-location/kam-location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';
import GemTracPage from '@/components/v2/common/gem-trac';
import { useLazyGetGemTracQuery } from '@/features/api/gem-trac';
import { handleContactSaleTeam } from '../search/result/helpers/sale-team';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import {
  useLazyGetRequestCallBackTimeSlotsQuery,
  useReuestCallBackMutation
} from '@/features/api/request-call-back';
import chevronDown from '@public/v2/assets/icons/dashboard/chevron-down.svg';
import chevronUp from '@public/v2/assets/icons/dashboard/chevron-up.svg';

const MyCart = () => {
  const dispatch = useAppDispatch();

  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const confirmTrack = useAppSelector(state => state.setConfirmStoneTrack);
  const kamLocation = useAppSelector(state => state.kamLocation);
  const [triggerGetCustomer] = useLazyGetCustomerQuery({});
  const [checkProductAvailability] = useCheckProductAvailabilityMutation({});
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const { errorState, errorSetState } = useErrorStateManagement();
  const { isError, errorText } = errorState;
  const { setErrorText, setIsError } = errorSetState;
  const { rows } = dataTableState;
  const { setRows } = dataTableSetState;
  const [activeTab, setActiveTab] = useState<string>(AVAILABLE_STATUS);
  const [isAddCommentDialogOpen, setIsAddCommentDialogOpen] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [downloadExcel] = useDownloadExcelMutation();
  const [cartItems, setCartItems] = useState<any>(undefined);
  const [isConfirmStone, setIsConfirmStone] = useState(false);
  const [confirmStoneData, setConfirmStoneData] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDiamondDetailLoading, setIsDiamondDetailLoading] = useState(true); //
  const [validImages, setValidImages] = useState<any>([]);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailImageData, setDetailImageData] = useState<any>({});

  const [isSkeletonLoading, setIsSkeletonLoading] = useState<boolean>(true);

  const [isGemTrac, setIsGemTrac] = useState(false);
  const [gemTracData, setGemTracData] = useState([]);
  const [triggerGemTracApi] = useLazyGetGemTracQuery({});

  const [contactSaleTeamInputValue, setContactSaleTeamInputValue] =
    useState('');

  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentPayload, setAppointmentPayload] =
    useState<IAppointmentPayload>({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });

  const [triggerAvailableSlots] = useLazyGetAvailableMyAppointmentSlotsQuery(
    {}
  );
  const [lotIds, setLotIds] = useState<string[]>([]);

  const [diamondStatusCounts, setDiamondStatusCounts] = useState({
    Available: 0,
    Memo: 0,
    Hold: 0,
    Sold: 0,
    BidToBuy: 0
  });
  const [tiggerCart, { data: cartdata }] = useLazyGetCartQuery();
  const subRoute = useSearchParams().get('path');
  // Mutation for deleting items from the cart
  const [deleteCart] = useDeleteCartMutation();
  const [confirmProduct] = useConfirmProductMutation();
  const router = useRouter();
  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<any>();

  const [requestCallTimeSlots, setRequestCallTimeSlots] = useState<any>({});

  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleSelectData = ({ date }: { date: string }) => {
    if (Number(date) !== selectedDate) {
      setSelectedDate(Number(date));
      setSelectedSlot('');
    }
  };

  const handleSelectSlot = ({ slot }: { slot: string }) => {
    setSelectedSlot(prevSlot => (prevSlot === slot ? '' : slot));
  };
  const [reuestCallBack] = useReuestCallBackMutation({});

  const [triggerRequestCallTimeSlots] = useLazyGetRequestCallBackTimeSlotsQuery(
    {}
  );

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };
  const renderRequestCallTimeSlot = () => {
    return (
      <div className="">
        {' '}
        <div className="flex flex-col gap-[8px]">
          <div className="flex justify-between items-center">
            <div className="text-headingS text-neutral900 font-medium">
              Schedule Callback
            </div>
            <div
              className=" cursor-pointer "
              onClick={() => {
                modalSetState.setIsInputDialogOpen(false);
                setRequestCallTimeSlots({});
              }}
            >
              <Image src={crossIcon} alt="crossIcon" />
            </div>
          </div>
          <div>
            If you're currently busy and unable to take a call, you can schedule
            a more convenient time for our sales team to reach out to you.
          </div>
        </div>
        <div className="flex flex-col gap-[15px] pt-[12px] w-[330px]">
          {/* select data */}
          <div className="">
            <div className="text-sMedium text-neutral900 font-[500]">
              Select date*
            </div>
            <div className="flex justify-between bg-neutral0 border-solid border-[1px] border-neutral200 p-[8px] rounded-[4px]">
              {requestCallTimeSlots?.timeSlots?.dates?.map((date: any) => {
                return (
                  <button
                    onClick={() => {
                      handleSelectData({ date: date.date });
                    }}
                    key={date.date}
                    className={`flex flex-col cursor-pointer  items-center p-[20px]  w-[44px] rounded-[4px]
                          ${
                            selectedDate === Number(date.date)
                              ? 'bg-primaryMain text-neutral0'
                              : 'bg-neutral50 text-neutral700'
                          }
                      `}
                  >
                    <div className="text-sRegular font-normal">{date.day}</div>
                    <p className="text-mMedium font-medium ">{date.date}</p>
                  </button>
                );
              })}
            </div>
          </div>
          {/* Select Time Slot */}
          <div className="flex flex-col gap-1 w-full">
            {/* Title */}
            <div className="text-sMedium text-neutral900 font-[500]">
              Select time slot*
            </div>
            <div className="flex flex-col gap-[8px]">
              {requestCallTimeSlots?.timeSlots?.slots &&
                requestCallTimeSlots?.timeSlots?.slots[Number(selectedDate)] &&
                Object.keys(
                  requestCallTimeSlots?.timeSlots?.slots[Number(selectedDate)]
                ).map(key => {
                  const keys = Object.keys(
                    requestCallTimeSlots?.timeSlots?.slots[selectedDate][key]
                  );
                  const values: {
                    datetimeString: string;
                    isAvailable: boolean;
                  }[] = Object.values(
                    requestCallTimeSlots?.timeSlots?.slots[selectedDate][key]
                  );

                  return (
                    <div
                      key={key}
                      className="flex flex-col gap-[4px] font-normal"
                    >
                      {/* Section Header */}
                      <div
                        className="text-sMobileRegular font-medium text-neutral800 capitalize flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection(key)}
                      >
                        {key}
                        {key === 'Afternoon' && (
                          <Image
                            src={openSection === key ? chevronUp : chevronDown}
                            alt="Chevron"
                          />
                        )}
                      </div>

                      {/* Time Slots */}
                      {(key !== 'Afternoon' || openSection === key) && (
                        <div className="flex flex-wrap gap-x-[14px] gap-y-2 bg-neutral0 rounded-[4px] p-[8px] border-solid border-[1px] border-neutral200">
                          {keys.map((timeSlot, index) => (
                            <button
                              key={timeSlot}
                              disabled={!values[index].isAvailable}
                              className={`w-[94px] text-sMobileRegular rounded-[4px] p-[8px]
                            ${
                              selectedSlot === values[index].datetimeString
                                ? 'bg-primaryMain text-neutral0'
                                : !values[index].isAvailable
                                ? 'bg-neutral100 text-neutral400 cursor-not-allowed'
                                : 'bg-neutral50 text-neutral700'
                            }`}
                              onClick={() =>
                                handleSelectSlot({
                                  slot: values[index].datetimeString
                                })
                              }
                            >
                              {timeSlot}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          <ActionButton
            actionButtonData={[
              {
                variant: 'primary',
                label: 'Request Callback',
                handler: () => {
                  reuestCallBack({
                    callback_at: selectedSlot
                  })
                    .unwrap()
                    .then(() => {
                      modalSetState.setIsInputDialogOpen(false);
                      setRequestCallTimeSlots({});
                      setRowSelection({});
                    })
                    .catch(() => {});
                },
                customStyle: 'flex-1 w-full',
                isDisable: !selectedSlot.length
              }
            ]}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (subRoute?.length) {
      setActiveTab(subRoute);
    }
  }, []);
  useEffect(() => {
    isError &&
      setTimeout(() => {
        setIsError(false); // Hide the toast notification after some time
      }, 4000);
  }, [isError]);
  const processCartItems = ({
    cartItems,
    activeTab
  }: {
    cartItems: any;
    activeTab: string;
  }) => {
    const counts = {
      Available: 0,
      Memo: 0,
      Hold: 0,
      Sold: 0,
      BidToBuy: 0
    };

    const filteredRows = cartItems.filter((item: IProductItem) => {
      counts[item?.product?.diamond_status]++;
      if (activeTab === AVAILABLE_STATUS) {
        return (
          item?.product?.diamond_status === BID_TO_BUY_STATUS ||
          item?.product?.diamond_status === AVAILABLE_STATUS
        );
      } else {
        return item?.product?.diamond_status === activeTab;
      }
    });

    const mappedRows = filteredRows.map((row: any) => row?.product);
    setRows(mappedRows);
    return { filteredRows, counts };
  };

  useEffect(() => {
    const fetchMyAPI = async () => {
      await tiggerCart({})
        .then((response: any) => {
          const { filteredRows, counts } = processCartItems({
            cartItems: response.data.cart.items,
            activeTab
          });

          setCartItems(filteredRows);
          setDiamondStatusCounts(counts);
          setRowSelection({});
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          error?.data?.message && setIsDialogOpen(true);
          error?.data?.message &&
            setDialogContent(
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="mt-[70px]"
                header={error?.data?.message}
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => setIsDialogOpen(false),
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            );
        });
    };

    fetchMyAPI();
  }, [activeTab]);

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
        dataTableSetState.setColumns(mapColumns(updatedColumns));
      }
    };

    fetchColumns();
  }, [sorting]);

  const myCartTabs = [
    {
      label: 'Active',
      status: AVAILABLE_STATUS,
      count: diamondStatusCounts.Available + diamondStatusCounts.BidToBuy
    },
    {
      label: 'Memo',
      status: MEMO_STATUS,
      count: diamondStatusCounts.Memo
    },
    {
      label: 'Hold',
      status: HOLD_STATUS,
      count: diamondStatusCounts.Hold
    },
    {
      label: 'Sold',
      status: SOLD_STATUS,
      count: diamondStatusCounts.Sold
    }
  ];

  const goBackToListView = () => {
    setIsConfirmStone(false);
    setIsDetailPage(false);
    setConfirmStoneData([]);
    setShowAppointmentForm(false);
    setRowSelection({});
    setAppointmentPayload({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });
  };

  const handleTabs = ({ tab }: { tab: string }) => {
    setErrorText('');
    setIsError(false);
    setActiveTab(tab);
  };

  const handleDelete = ({ selectedIds }: { selectedIds: string[] }) => {
    const deleteCartIds = selectedIds
      ?.map((id: string) => {
        const selectedRow: any =
          cartItems.find((row: IProductItem) => {
            return row?.product.id === id;
          }) ?? {};
        if (selectedRow) {
          return selectedRow?.id;
        }
        return '';
      })
      .filter(Boolean);

    setIsLoading(true);
    deleteCart({
      items: deleteCartIds
    })
      .unwrap()
      .then(res => {
        setIsLoading(false);
        const { filteredRows, counts } = processCartItems({
          cartItems: res.cart.items,
          activeTab
        });
        setIsDialogOpen(true);
        setDialogContent(
          <CommonPoppup
            content={''}
            status="success"
            customPoppupBodyStyle="mt-[70px]"
            header={`${deleteCartIds.length} ${
              deleteCartIds.length === 1 ? 'stone' : 'stones'
            } successfully deleted from “My Cart”`}
            actionButtonData={[
              {
                variant: 'primary',
                label: ManageLocales('app.modal.okay'),
                handler: () => setIsDialogOpen(false),
                customStyle: 'flex-1 w-full h-10'
              }
            ]}
          />
        );

        setCartItems(filteredRows);
        setDiamondStatusCounts(counts);
        setRowSelection({});
      })
      .catch(error => {
        setIsLoading(false);
        setIsDialogOpen(true);
        setDialogContent(
          <CommonPoppup
            content={''}
            customPoppupBodyStyle="mt-[70px]"
            header={error?.data?.message}
            actionButtonData={[
              {
                variant: 'primary',
                label: ManageLocales('app.modal.okay'),
                handler: () => setIsDialogOpen(false),
                customStyle: 'flex-1 w-full h-10'
              }
            ]}
          />
        );
      });
  };

  // Handle the actual deletion of stones
  const deleteCartHandler = () => {
    let selectedIds = Object.keys(rowSelection);
    if (selectedIds?.length) {
      setIsError(false);
      setDialogContent(
        <>
          {' '}
          <div className="absolute left-[-84px] top-[-84px]">
            <Image src={deleteIcon} alt="deleteIcon" />
          </div>
          <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
            <div>
              <h1 className="text-headingS text-neutral900">Are you sure?</h1>
              <p className="text-neutral600 text-mRegular">
                Do you want to delete the selected stones?
              </p>
            </div>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.modal.no'),
                  handler: () => setIsDialogOpen(false),
                  customStyle: 'flex-1 h-10'
                },
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.yes'),
                  handler: () => {
                    handleDelete({ selectedIds });
                    setIsDialogOpen(false);
                  },
                  customStyle: 'flex-1 h-10'
                }
              ]}
            />
          </div>
        </>
      );
      setIsDialogOpen(true);
    } else {
      setIsError(true);
      setErrorText(NO_STONES_SELECTED);
    }
  };

  const rederAddCommentDialogs = () => {
    return (
      <>
        {' '}
        <div className="flex flex-col gap-[15px] p-[24px]">
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
          <div className="pt-[12px]">
            <textarea
              value={textAreaValue}
              name="textarea"
              rows={10}
              className="w-full bg-neutral0 text-neutral900 rounded-xl resize-none focus:outline-none p-2 border-neutral-200 border-[1px] mt-2"
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
                label: ManageLocales('app.modal.addComment.saveComment'),
                handler: () => {
                  setCommentValue(textAreaValue);
                  setIsAddCommentDialogOpen(false);
                },
                customStyle: 'flex-1'
              },
              {
                variant: 'primary',
                label: 'Confirm Stone',
                handler: () => {
                  setIsAddCommentDialogOpen(false);
                  confirmStone();
                },
                customStyle: 'flex-1'
              }
            ]}
          />
        </div>
      </>
    );
  };

  const confirmStoneApiCall = ({ variantIds }: { variantIds: string[] }) => {
    if (variantIds.length) {
      setIsLoading(true);
      confirmProduct({
        variants: variantIds,
        comments: commentValue,
        identifier: confirmTrack.confirmStoneTrack
          ? confirmTrack.confirmStoneTrack
          : 'My-Cart'
      })
        .unwrap()
        .then(res => {
          if (res) {
            setCommentValue('');
            setIsDialogOpen(true);
            dispatch(setConfirmStoneTrack(''));
            setIsLoading(false);
            const formatMessage = (message: string) => {
              return message.split('\n').map((line: string, index: number) => (
                <span key={index}>
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                  <br />
                </span>
              ));
            };
            setRowSelection({});
            setDialogContent(
              <CommonPoppup
                content={<div>{formatMessage(res.message)}</div>}
                status={
                  res.status === 'success'
                    ? 'success'
                    : res.status === 'processing'
                    ? 'info'
                    : ''
                }
                customPoppupBodyStyle="!mt-[70px]"
                header={res.title}
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
            );
            setCommentValue('');

            tiggerCart({}).then((response: any) => {
              const { filteredRows, counts } = processCartItems({
                cartItems: response.data.cart.items,
                activeTab
              });

              setCartItems(filteredRows);
              setDiamondStatusCounts(counts);
              setRowSelection({});
            });
          }
        })
        .catch(e => {
          setIsLoading(false);

          setCommentValue('');
          dispatch(setConfirmStoneTrack(''));

          if (e.data.type === 'unauthorized') {
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={
                  'To confirm a stone or make a purchase, KYC verification is mandatory. Without verification, access to certain features is restricted.'
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
          } else {
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="!mt-[70px]"
                header={e?.data?.message}
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
            );
          }
        });
    }
  };

  const checkLocation = ({
    kamLocation,
    variantIds
  }: {
    kamLocation: string;
    variantIds: string[];
  }) => {
    // Compare Stone locations with KAM location
    let locationMismatch = false;
    confirmStoneData.forEach((stones: any) => {
      const location = stones.location as keyof typeof STONE_LOCATION;
      if (
        STONE_LOCATION[location].toLowerCase() !== kamLocation.toLowerCase()
      ) {
        locationMismatch = true;
      }
    });
    if (locationMismatch) {
      setIsDialogOpen(true);
      setDialogContent(
        <CommonPoppup
          content={
            <div className="flex flex-col gap-1">
              <div>
                You are trying to confirm some of the stones from another
                region. This might lead to additional charges. By confirming
                your order, you acknowledge and agree to the following:
              </div>

              <div>
                <p>
                  {' '}
                  &#8226; Customs Duties and Taxes: You are responsible for
                  paying any applicable customs duties, taxes, and other charges
                  that may be incurred when importing stones from outside your
                  location.
                </p>

                <p>
                  {' '}
                  &#8226; Import Regulations: Ensure you are aware of and comply
                  with all relevant import regulations and requirements for your
                  region.
                </p>
                <p>
                  {' '}
                  &#8226; Delivery Times: Delivery times may vary due to customs
                  clearance procedures.
                </p>
              </div>
            </div>
          }
          status="warning"
          customPoppupStyle="!h-[475px]"
          customPoppupBodyStyle="!mt-[70px]"
          header={'Disclaimer'}
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.modal.cancel'),
              handler: () => setIsDialogOpen(false),
              customStyle: 'flex-1 w-full h-10'
            },
            {
              variant: 'primary',
              label: 'Confirm Order',
              handler: () => {
                setIsDialogOpen(false);
                confirmStoneApiCall({ variantIds });
              },
              customStyle: 'flex-1 w-full h-10'
            }
          ]}
        />
      );
    } else {
      confirmStoneApiCall({ variantIds });
    }
  };

  const confirmStone = () => {
    const variantIds: string[] = [];

    confirmStoneData.forEach((ids: any) => {
      variantIds.push(ids.variants[0].id);
    });

    if (!kamLocation.location) {
      triggerGetCustomer({}).then(res => {
        let kamLocation = res.data.customer.kam.location;
        dispatch(kamLocationAction(kamLocation));
        checkLocation({ kamLocation, variantIds });
      });
    } else {
      checkLocation({ kamLocation: kamLocation.location, variantIds });
    }
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

  const handleDetailPage = ({ row }: { row: any }) => {
    if(isConfirmStone) {
      setIsDetailPage(true);
      setIsError(false);
      setErrorText('');
      setDetailPageData(row);
    } else {
      router.push(
        `/v2/${SubRoutes.Diamond_Detail}?path=${MatchRoutes.MY_CART}&stoneid=${row?.lot_id}-${row?.location}`
      );
    }
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
        const currentSort = sorting.find(sort => sort.id === accessor);
        const nonSortableAccessors = ['shape_full', 'details', 'fire_icon'];

        // Check if sorting should be disabled for the column's accessor
        const isSortable = !nonSortableAccessors.includes(accessor);
        const commonProps = {
          accessorKey: accessor,
          header: short_label,
          enableGlobalFilter: accessor === 'lot_id',

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

          case 'rap':
          case 'rap_value':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => {
                return RenderNumericFields({
                  renderedCellValue,
                  modalSetState,
                  setContactSaleTeamInputValue
                });
              }
            };
          case 'amount':
            return {
              ...commonProps,
              Cell: ({ row }: any) => {
                return RenderAmount({
                  row,
                  modalSetState,
                  setContactSaleTeamInputValue
                });
              }
            };
          case 'measurements':
            return { ...commonProps, Cell: RenderMeasurements };
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
          case 'shape_full':
            return { ...commonProps, Cell: RenderShape };
          case 'discount':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => {
                return RenderDiscount({
                  renderedCellValue,
                  modalSetState,
                  setContactSaleTeamInputValue
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

          case 'price_per_carat':
            return {
              ...commonProps,
              Cell: ({ renderedCellValue }: any) => {
                return RenderPricePerCarat({
                  renderedCellValue,
                  modalSetState,
                  setContactSaleTeamInputValue
                });
              }
            };
          case 'lab':
            return { ...commonProps, Cell: RenderLab };
          case 'location':
            return { ...commonProps, Cell: RednderLocation };
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

  const handleCreateAppointment = () => {
    let selectedIds = Object.keys(rowSelection);

    if (selectedIds.length > 0) {
      setShowAppointmentForm(true);
      triggerAvailableSlots({}).then(payload => {
        let { data } = payload.data;
        setAppointmentPayload(data);
      });

      const lotIdsWithCountry = selectedIds?.map((id: string) => {
        const foundProduct: any =
          dataTableState.rows.find((row: IProduct) => {
            return row?.id === id;
          }) ?? {};

        if (foundProduct) {
          const lotId = foundProduct?.lot_id;
          const country = foundProduct?.location; // assuming country is a property in foundProduct
          return `${lotId}(${country})`;
        }
        return '';
      });
      setLotIds(lotIdsWithCountry);
    } else {
      setIsError(true);
      setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
    }
  };

  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);

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

  const renderContactSalesTeamContent = () => {
    return (
      <>
        {' '}
        <div className="absolute left-[-84px] top-[-84px]">
          <Image src={contactIcon} alt="contactIcon" />
        </div>
        <div
          className="absolute cursor-pointer left-[400px] top-[39px]"
          onClick={() => {
            modalSetState.setIsInputDialogOpen(false);
          }}
        >
          <Image src={crossIcon} alt="crossIcon" />
        </div>
        <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[400px]">
          <div>
            <h1 className="text-headingS text-neutral900">
              {' '}
              {ManageLocales('app.contactSaleTeam.header')}
            </h1>
            <p className="text-neutral600 text-mRegular">
              {ManageLocales('app.contactSaleTeam.subHeader')}
            </p>
          </div>
          <div>
            <textarea
              value={contactSaleTeamInputValue}
              name="textarea"
              rows={5}
              className="w-full bg-neutral0 text-visRed rounded-[4px] resize-none focus:outline-none p-2 border-neutral-200 border-[1px] mt-2"
              style={{ boxShadow: 'var(--input-shadow) inset' }}
              onChange={e =>
                handleContactSaleTeam(e, setContactSaleTeamInputValue)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: 'Email',
                  handler: () => {
                    const customerDetail = JSON.parse(
                      localStorage.getItem('user')!
                    );
                    // Email subject and body
                    const emailSubject = 'Completing KYC to Access Pricing';
                    const emailBody = contactSaleTeamInputValue;

                    // Create mailto URL
                    const mailtoURL = `mailto:${encodeURIComponent(
                      customerDetail?.customer?.kam?.email
                    )}?cc=${encodeURIComponent(
                      'shashank.giri@kgkmail.com'
                    )}&subject=${encodeURIComponent(
                      emailSubject
                    )}&body=${encodeURIComponent(emailBody)}`;

                    // Open the user's default email client
                    window.location.href = mailtoURL;
                  },
                  isDisable: !contactSaleTeamInputValue.length,
                  customStyle: 'flex-1'
                },
                {
                  variant: 'primary',
                  label: 'WhatsApp',
                  isDisable: !contactSaleTeamInputValue.length,
                  handler: () => {
                    const encodedMessage = encodeURIComponent(
                      contactSaleTeamInputValue
                    );

                    // WhatsApp URL with all links
                    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

                    // Open WhatsApp in a new tab or window
                    window.open(whatsappURL, '_blank');
                  },
                  customStyle: 'flex-1'
                }
              ]}
            />
            <div>Or</div>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: 'Request Callback',
                  handler: () => {},
                  customStyle: 'flex-1 w-full'
                }
              ]}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="relative">
      {isLoading && <CustomKGKLoader />}
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}
      <InputDialogComponent
        isOpen={modalState.isInputDialogOpen}
        onClose={() => modalSetState.setIsInputDialogOpen(false)}
        renderContent={
          Object.keys(requestCallTimeSlots)?.length > 0
            ? renderRequestCallTimeSlot
            : renderContactSalesTeamContent
        }
        dialogStyle={
          Object.keys(requestCallTimeSlots)?.length > 0
            ? '!max-w-[376px]'
            : '!min-h-[470px] !max-w-[450px]'
        }
      />
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
      />
      <DialogComponent dialogContent={dialogContent} isOpens={isDialogOpen} />
      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={rederAddCommentDialogs}
      />

      <div className="flex  py-[8px] items-center ">
        <p className="text-lMedium font-medium text-neutral900">
          {showAppointmentForm ? (
            ManageLocales('app.myAppointment.header')
          ) : isConfirmStone ? (
            ''
          ) : isDetailPage ? (
            ''
          ) : cartItems === undefined || cartdata === undefined ? (
            <Skeleton
              variant="rectangular"
              height={'21px'}
              width={'61px'}
              animation="wave"
              sx={{ bgcolor: 'var(--neutral-200)' }}
            />
          ) : (
            ManageLocales('app.myCart.mycart')
          )}
        </p>
      </div>

      {isDetailPage && detailPageData?.length ? (
        <>
          {' '}
          {isGemTrac ? (
            <GemTracPage
              breadCrumLabel={'My Cart'}
              setIsGemTrac={setIsGemTrac}
              setGemTracData={setGemTracData}
              gemTracData={gemTracData}
              goBackToListView={goBack}
            />
          ) : (
            <>
              <DiamondDetailsComponent
                data={dataTableState.rows}
                filterData={detailPageData}
                goBackToListView={goBack}
                handleDetailPage={handleDetailPage}
                breadCrumLabel={'My Cart'}
                modalSetState={modalSetState}
                setIsDiamondDetailLoading={setIsDiamondDetailLoading}
                setIsLoading={setIsLoading}
                setIsGemTrac={setIsGemTrac}
                setGemTracData={setGemTracData}
                triggerGemTracApi={triggerGemTracApi}
              />
              <div className="p-[8px] flex justify-end items-center border-t-[1px] border-l-[1px] border-neutral-200 gap-3 rounded-b-[8px] shadow-inputShadow ">
                {isDiamondDetailLoading ? (
                  <>
                    {' '}
                    <Skeleton
                      width={128}
                      sx={{ bgcolor: 'var(--neutral-200)' }}
                      height={40}
                      variant="rectangular"
                      animation="wave"
                      className="rounded-[4px]"
                    />{' '}
                  </>
                ) : (
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: 'primary',
                        label: ManageLocales('app.searchResult.confirmStone'),
                        isHidden: isConfirmStone,
                        handler: () => {
                          const { id } = detailPageData;
                          const selectedRows = { [id]: true };
                          handleConfirmStone({
                            selectedRows: selectedRows,
                            rows: dataTableState.rows,
                            setIsError,
                            setErrorText,
                            setIsConfirmStone,
                            setConfirmStoneData,
                            setIsDetailPage,
                            identifier: 'detailPage',
                            confirmStoneTrack: 'DNA',
                            dispatch,
                            router,
                            modalSetState,
                            checkProductAvailability,
                            setIsLoading
                          });
                        }
                      }
                    ]}
                  />
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <div
          className={`border-[1px] border-neutral200 rounded-[8px] ${
            showAppointmentForm && 'mb-[30px]'
          } ${
            isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
              ? showAppointmentForm
                ? 'h-[calc(100vh-113px)]'
                : isConfirmStone
                ? 'h-[calc(100vh-184px)]'
                : 'h-[calc(100vh-210px)]'
              : showAppointmentForm
              ? 'h-[calc(100vh-43px)]'
              : 'h-[calc(100vh-132px)]'
          }  shadow-inputShadow`}
        >
          {isConfirmStone ? (
            <>
              <ConfirmStone
                rows={confirmStoneData}
                columns={columnData}
                goBackToListView={goBackToListView}
                isFrom={'My Cart'}
                handleDetailImage={handleDetailImage}
                handleDetailPage={handleDetailPage}
                identifier={'myCart'}
              />
              {rows.length > 0 ? (
                <div className="flex gap-3 justify-end items-center px-4 py-2">
                  {isConfirmStone && (
                    <>
                      <ActionButton
                        actionButtonData={[
                          {
                            variant: 'secondary',
                            label: ManageLocales(
                              'app.confirmStone.footer.back'
                            ),
                            handler: () => {
                              goBackToListView();
                            }
                          },

                          {
                            variant: 'secondary',
                            label: ManageLocales(
                              'app.confirmStone.footer.addComment'
                            ),
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
                            handler: () => confirmStone()
                          }
                        ]}
                      />
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
            </>
          ) : showAppointmentForm ? (
            <BookAppointment
              breadCrumLabel={ManageLocales(
                'app.myAppointments.myAppointments'
              )}
              goBackToListView={goBackToListView}
              appointmentPayload={appointmentPayload}
              setIsLoading={setIsLoading}
              modalSetState={modalSetState}
              lotIds={lotIds}
              setRowSelection={setRowSelection}
              errorSetState={errorSetState}
            />
          ) : cartItems === undefined || cartdata === undefined ? (
            <DataTableSkeleton identifier="myCart" />
          ) : (
            <>
              <div className="flex h-[72px] items-center border-b-[1px] border-neutral200">
                <div className="flex border-b border-neutral200 w-full ml-3 text-mMedium font-medium">
                  {myCartTabs.map(({ label, status, count }) => {
                    return (
                      <button
                        className={`px-[16px] py-[8px] ${
                          activeTab === status
                            ? 'text-neutral900 border-b-[2px] border-primaryMain'
                            : 'text-neutral600'
                        }`}
                        key={label}
                        onClick={() => handleTabs({ tab: status })}
                      >
                        {label} {count > 0 && `(${count})`}
                      </button>
                    );
                  })}
                </div>
              </div>
              {!rows.length ? (
                <EmptyScreen
                  label={ManageLocales(
                    'app.emptyCart.actionButton.searchDiamonds'
                  )}
                  contentReactNode={
                    <p className="text-neutral900  w-[17%] text-center">
                      No diamonds in your cart yet. Let’s change that!
                    </p>
                  }
                  onClickHandler={() =>
                    router.push(`/v2/search?active-tab=${SubRoutes.NEW_SEARCH}`)
                  }
                  imageSrc={empty}
                />
              ) : (
                dataTableState.columns.length > 0 && (
                  <DataTable
                    rows={rows}
                    columns={dataTableState.columns}
                    setRowSelection={setRowSelection}
                    rowSelection={rowSelection}
                    showCalculatedField={activeTab !== SOLD_STATUS}
                    modalSetState={modalSetState}
                    downloadExcel={downloadExcel}
                    myCart={true}
                    setIsError={setIsError}
                    setErrorText={setErrorText}
                    setIsLoading={setIsLoading}
                    deleteCartHandler={deleteCartHandler}
                    activeCartTab={activeTab}
                    setSorting={setSorting}
                    sorting={sorting}
                    setIsConfirmStone={setIsConfirmStone}
                    setConfirmStoneData={setConfirmStoneData}
                    handleCreateAppointment={handleCreateAppointment}
                    setIsSkeletonLoading={setIsSkeletonLoading}
                    isSkeletonLoading={isSkeletonLoading}
                  />
                )
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCart;
