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
  AVAILABLE_STATUS,
  HOLD_STATUS,
  LISTING_PAGE_DATA_LIMIT,
  MEMO_STATUS
} from '@/constants/business-logic';
import noImageFound from '@public/v2/assets/icons/detail-page/fall-back-img.svg';
import unAuthorizedSvg from '@public/v2/assets/icons/data-table/unauthorized.svg';
import { constructUrlParams } from '@/utils/v2/construct-url-params';
import { useRouter, useSearchParams } from 'next/navigation';
import { ManageLocales } from '@/utils/v2/translate';
import ActionButton from '@/components/v2/common/action-button';
import { MatchRoutes, Routes, SubRoutes } from '@/constants/v2/enums/routes';
import Tooltip from '@/components/v2/common/tooltip';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import contactIcon from '@public/v2/assets/icons/modal/contact-sale.svg';
import chevronDown from '@public/v2/assets/icons/dashboard/chevron-down.svg';
import chevronUp from '@public/v2/assets/icons/dashboard/chevron-up.svg';
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
  useCheckProductAvailabilityMutation,
  useConfirmProductMutation,
  useLazyGetAllProductQuery
} from '@/features/api/product';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { MRT_RowSelectionState, MRT_SortingState } from 'material-react-table';
import { notificationBadge } from '@/features/notification/notification-slice';
import { useAddCartMutation } from '@/features/api/cart';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import Image from 'next/image';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { DialogComponent } from '@/components/v2/common/dialog';

import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import {
  SELECT_STONE_TO_PERFORM_ACTION,
  SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH,
  STONE_NOT_AVAILABLE_MODIFY_SEARCH
} from '@/constants/error-messages/confirm-stone';
import { NOT_MORE_THAN_300 } from '@/constants/error-messages/search';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import { useGetSavedSearchListQuery } from '@/features/api/saved-searches';
import { ISavedSearch } from '../form/form';
import ConfirmStone from './components';
import { handleConfirmStone } from './helpers/handle-confirm-stone';
import { AddCommentDialog } from '@/components/v2/common/comment-dialog';
import { handleComment } from './helpers/handle-comment';
import { useDownloadExcelMutation } from '@/features/api/download-excel';
import fireSvg from '@public/v2/assets/icons/data-table/fire-icon.svg';
import { IItem } from '../saved-search/saved-search';
import { IManageListingSequenceResponse, IProduct } from '../interface';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { getShapeDisplayName } from '@/utils/v2/detail-page';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import CompareStone from './components/compare-stone';
import { statusCode } from '@/constants/enums/status-code';
import { loadImages } from '@/components/v2/common/detail-page/helpers/load-images';
import { checkImage } from '@/components/v2/common/detail-page/helpers/check-image';
import { useLazyGetAvailableMyAppointmentSlotsQuery } from '@/features/api/my-appointments';
import { IAppointmentPayload } from '../../my-appointments/page';
import BookAppointment from '../../my-appointments/components/book-appointment/book-appointment';
import styles from './style.module.scss';
import DataTableSkeleton from '@/components/v2/skeleton/data-table';
import { Skeleton } from '@mui/material';
import CommonPoppup from '../../login/component/common-poppup';
import EmptyScreen from '@/components/v2/common/empty-screen';
import { formatNumberWithCommas } from '@/utils/format-number-with-comma';
import { setConfirmStoneTrack } from '@/features/confirm-stone-track/confirm-stone-track-slice';
import { useLazyGetCustomerQuery } from '@/features/api/dashboard';
import { kamLocationAction } from '@/features/kam-location/kam-location';
import { STONE_LOCATION } from '@/constants/v2/enums/location';
import { handleCompareStone } from './helpers/handle-compare-stone';
import { NO_PRODUCT_FOUND } from '@/constants/error-messages/saved';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortDown,
  faSortUp
} from '@fortawesome/free-solid-svg-icons';

import GemTracPage from '@/components/v2/common/gem-trac';
import { useLazyGetGemTracQuery } from '@/features/api/gem-trac';
import { InputDialogComponent } from '@/components/v2/common/input-dialog';
import { InputField } from '@/components/v2/common/input-field';
import {
  handleContactSaleTeam,
  handleUnlockPricing
} from './helpers/sale-team';
import {
  useLazyGetRequestCallBackTimeSlotsQuery,
  useReuestCallBackMutation
} from '@/features/api/request-call-back';

// Column mapper outside the component to avoid re-creation on each render

const Result = ({
  activeTab,
  searchParameters,
  setActiveTab,
  handleCloseAllTabs,
  handleCloseSpecificTab,
  setSearchParameters,
  setIsLoading,
  setIsInputDialogOpen
}: {
  activeTab: number;
  searchParameters: any;
  setSearchParameters: Dispatch<SetStateAction<ISavedSearch[]>>;
  setActiveTab: Dispatch<SetStateAction<number>>;
  handleCloseAllTabs: () => void;
  handleCloseSpecificTab: (_id: number) => void;
  setIsLoading: any;
  setIsInputDialogOpen: any;
}) => {
  const dispatch = useAppDispatch();
  const confirmTrack = useAppSelector(state => state.setConfirmStoneTrack);
  const kamLocation = useAppSelector(state => state.kamLocation);
  const [checkProductAvailability] = useCheckProductAvailabilityMutation({});
  const [triggerAvailableSlots] = useLazyGetAvailableMyAppointmentSlotsQuery(
    {}
  );
  const [reuestCallBack] = useReuestCallBackMutation({});
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [triggerGetCustomer] = useLazyGetCustomerQuery({});
  const { data: searchList }: { data?: IItem[] } =
    useGetSavedSearchListQuery('');
  const { dataTableState, dataTableSetState } = useDataTableStateManagement();
  const { errorState, errorSetState } = useErrorStateManagement();
  const { setIsError, setErrorText } = errorSetState;
  const { isError, errorText } = errorState;
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;
  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const [isAddCommentDialogOpen, setIsAddCommentDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [validImages, setValidImages] = useState<any>([]);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [breadCrumLabel, setBreadCrumLabel] = useState('');

  const [isSkeletonLoading, setIsSkeletonLoading] = useState<boolean>(true);
  const [isDiamondDetailLoading, setIsDiamondDetailLoading] = useState(true); //

  const [isConfirmStone, setIsConfirmStone] = useState(false);
  const [isCompareStone, setIsCompareStone] = useState(false);

  const [confirmStoneData, setConfirmStoneData] = useState<IProduct[]>([]);
  const [compareStoneData, setCompareStoneData] = useState<IProduct[]>([]);

  const [commentValue, setCommentValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');

  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentPayload, setAppointmentPayload] =
    useState<IAppointmentPayload>({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });

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

  const [triggerRequestCallTimeSlots] = useLazyGetRequestCallBackTimeSlotsQuery(
    {}
  );
  const [lotIds, setLotIds] = useState<string[]>([]);
  const [hasLimitExceeded, setHasLimitExceeded] = useState(false);
  // UseMutation to add items to the cart
  const [addCart] = useAddCartMutation();

  const editRoute = useSearchParams().get('edit');
  const router = useRouter();
  const [searchUrl, setSearchUrl] = useState('');

  const [downloadExcel] = useDownloadExcelMutation();
  const [confirmProduct] = useConfirmProductMutation();

  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
  const [triggerProductApi, { data: productData }] =
    useLazyGetAllProductQuery();

  const [triggerGemTracApi] = useLazyGetGemTracQuery({});

  const [isGemTrac, setIsGemTrac] = useState(false);
  const [gemTracData, setGemTracData] = useState<string[]>([]);

  const [contactSaleTeamInputValue, setContactSaleTeamInputValue] =
    useState('');

  // Fetch Products

  const fetchProducts = async () => {
    // setIsLoading(true);
    setIsSkeletonLoading(true);
    const storedSelection = localStorage.getItem('Search');

    if (!storedSelection) return;

    if (activeTab <= 0) return;

    const selections = JSON.parse(storedSelection);

    const url = constructUrlParams(selections[activeTab - 1]?.queryParams);
    setSearchUrl(`${url}`);
    triggerProductApi({
      url: `${url}`,
      limit: LISTING_PAGE_DATA_LIMIT,
      offset: 0
    })
      .then((res: any) => {
        if (columnData?.length > 0) {
          if (res?.error?.status === statusCode.UNAUTHORIZED) {
            setHasLimitExceeded(true);
            dataTableSetState.setRows([]);
          } else {
            setHasLimitExceeded(false);
            if (res.data?.products.length > 0) {
              dataTableSetState.setRows(res.data?.products);
            } else {
              modalSetState.setIsDialogOpen(true);
              modalSetState.setDialogContent(
                <CommonPoppup
                  status="warning"
                  content={''}
                  customPoppupBodyStyle="!mt-[70px]"
                  header={NO_PRODUCT_FOUND}
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: ManageLocales('app.modal.okay'),
                      handler: () => {
                        closeSearch(
                          activeTab,
                          JSON.parse(localStorage.getItem('Search')!)
                        );

                        modalSetState.setIsDialogOpen(false);
                      },
                      customStyle: 'flex-1 h-10'
                    }
                  ]}
                />
              );
            }
            res.data?.products;
          }

          setRowSelection({});
          setErrorText('');
          setData(res.data);
          setIsLoading(false);
        }
      })
      .catch(e => setIsLoading(false));
  };

  const refreshSearchResults = () => {
    triggerProductApi({
      url: searchUrl,
      limit: LISTING_PAGE_DATA_LIMIT,
      offset: 0
    }).then(res => {
      if (res.data?.products.length > 0)
        if (res.data?.products.length > 0) {
          dataTableSetState.setRows(res.data?.products);
        } else {
          modalSetState.setIsDialogOpen(true);
          modalSetState.setDialogContent(
            <CommonPoppup
              status="warning"
              content={''}
              customPoppupBodyStyle="!mt-[70px]"
              header={NO_PRODUCT_FOUND}
              actionButtonData={[
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.okay'),
                  handler: () => {
                    closeSearch(
                      activeTab,
                      JSON.parse(localStorage.getItem('Search')!)
                    );

                    modalSetState.setIsDialogOpen(false);
                  },
                  customStyle: 'flex-1 h-10'
                }
              ]}
            />
          );
        }

      setErrorText('');
      setData(res.data);

      setIsLoading(false);
      if (isDetailPage) {
        let detailPageUpdatedData = res.data?.products.filter(
          (products: any) => {
            return products.id === detailPageData.id;
          }
        );
        handleDetailPage({ row: detailPageUpdatedData[0] });
      } else if (isCompareStone) {
        handleCompareStone({
          isCheck: rowSelection,
          setIsError,
          setErrorText,
          activeCartRows: res.data?.products,
          setIsCompareStone,
          setCompareStoneData
        });
      }

      setRowSelection({});
    });
  };

  const handleDetailPage = ({ row }: { row: any }) => {
    if (isConfirmStone) {
      setBreadCrumLabel('Confirm Stone');
      setIsDetailPage(true);
      setIsError(false);
      setErrorText('');
      setDetailPageData(row);
    } else {
      router.push(
        `/v2/${SubRoutes.Diamond_Detail}?path=${MatchRoutes.SEARCH}&activeTab=${activeTab}&stoneid=${row?.lot_id}-${row?.location}`
      );
    }
  };

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelectorAll('.blink').forEach(element => {
        element.classList.remove(styles.blink);
      });
    }, 4000);

    return () => clearTimeout(timeout);
  }, [
    isDetailPage,
    isConfirmStone,
    showAppointmentForm,
    isCompareStone,
    activeTab,
    dataTableState.rows
  ]);

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
              className="w-full bg-neutral0 text-neutral700 rounded-[4px] resize-none focus:outline-none p-2 border-neutral-200 border-[1px] mt-2"
              style={{ boxShadow: 'var(--input-shadow) inset' }}
              onChange={e =>
                handleContactSaleTeam(e, setContactSaleTeamInputValue)
              }
            />
          </div>

          <div className="flex flex-col  gap-2">
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
            <div className="text-center">Or</div>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: 'Request Callback',
                  handler: () => {
                    triggerRequestCallTimeSlots({}).then(res => {
                      let { data } = res.data;
                      console.log('data', data);
                      setRequestCallTimeSlots(data);
                      setSelectedDate(Number(data.timeSlots.dates[0].date));
                    });
                  },
                  customStyle: 'flex-1 w-full'
                }
              ]}
            />
          </div>
        </div>
      </>
    );
  };

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
                      modalSetState.setIsDialogOpen(true);
                      modalSetState.setDialogContent(
                        <CommonPoppup
                          content=""
                          status="success"
                          customPoppupBodyStyle="!mt-[70px]"
                          header={
                            'Your appointment has been booked successfully'
                          }
                          actionButtonData={[
                            {
                              variant: 'primary',
                              label: ManageLocales('app.modal.okay'),
                              handler: () =>
                                modalSetState.setIsDialogOpen(false),
                              customStyle: 'flex-1 w-full h-10'
                            }
                          ]}
                        />
                      );
                    })
                    .catch(error => {
                      modalSetState.setIsInputDialogOpen(false);
                      setRequestCallTimeSlots({});
                      setRowSelection({});
                      modalSetState.setIsDialogOpen(true);
                      modalSetState.setDialogContent(
                        <CommonPoppup
                          content=""
                          status="error"
                          customPoppupBodyStyle="!mt-[70px]"
                          header={error.data.message}
                          actionButtonData={[
                            {
                              variant: 'primary',
                              label: ManageLocales('app.modal.okay'),
                              handler: () =>
                                modalSetState.setIsDialogOpen(false),
                              customStyle: 'flex-1 w-full h-10'
                            }
                          ]}
                        />
                      );
                    });
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
          case 'fire_icon':
            return {
              enableSorting: false,
              accessorKey: 'fire_icon',
              header: '',
              minSize: 20,
              size: 20,
              maxSize: 20,
              Cell: ({ row }: { row: any }) => {
                return row.original.in_high_demand ? (
                  <Tooltip
                    tooltipTrigger={
                      <Image
                        id="blinking-image"
                        src={fireSvg}
                        alt="fireSvg"
                        className={`${styles.blink} blink`}
                      />
                    }
                    tooltipContent={'In High Demand Now!'}
                    tooltipContentStyles={'z-[1000] '}
                  />
                ) : (
                  ''
                );
              }
            };

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
                  row,
                  modalSetState,
                  setContactSaleTeamInputValue
                });
              }
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

        let addFireIconCol = {
          accessor: 'fire_icon',
          id: 'sub_col_13a',
          is_disabled: false,
          is_fixed: false,
          label: '',
          sequence: 0,
          short_label: ''
        };

        const updatedColumns = [
          ...response.data,
          additionalColumn,
          addFireIconCol
        ];

        dataTableSetState.setColumns(updatedColumns);
      }
    };

    fetchColumns();
  }, [dataTableState.rows]);

  const closeSearch = (
    removeDataIndex: number,
    yourSelection: ISavedSearch[]
  ) => {
    let closeSpecificSearch = yourSelection.filter(
      (_items: ISavedSearch, index: number) => {
        return index !== removeDataIndex - 1;
      }
    );

    if (removeDataIndex === 1) {
      setSearchParameters([]);
      // setAddSearches([]);
      // handleReset(setState, errorSetState);
      router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`);
    } else {
      setSearchParameters(closeSpecificSearch);
      // setAddSearches(closeSpecificSearch);
      setActiveTab(removeDataIndex);
      router.push(
        `${Routes.SEARCH}?active-tab=${SubRoutes.RESULT}-${removeDataIndex - 1}`
      );
    }

    localStorage.setItem('Search', JSON.stringify(closeSpecificSearch));
  };
  const memoizedRows = useMemo(() => {
    return Array.isArray(dataTableState.rows) ? dataTableState.rows : [];
  }, [dataTableState.rows]);
  const memoizedColumns = useMemo(
    () => mapColumns(dataTableState.columns),
    [dataTableState.columns, sorting]
  );
  const handleNewSearch = () => {
    router.push(`${Routes.SEARCH}?active-tab=${SubRoutes.NEW_SEARCH}`);
  };

  const handleCreateAppointment = () => {
    let selectedIds = Object.keys(rowSelection);

    if (selectedIds.length > 0) {
      const hasMemoOut = selectedIds?.some((id: string) => {
        const stone = dataTableState.rows.find(
          (row: IProduct) => row?.id === id
        );
        return stone?.diamond_status === MEMO_STATUS;
      });

      const hasHold = selectedIds?.some((id: string) => {
        const stone = dataTableState.rows.find(
          (row: IProduct) => row?.id === id
        );
        return stone?.diamond_status === HOLD_STATUS;
      });

      // Check for stones with AVAILABLE_STATUS
      const hasAvailable = selectedIds?.some((id: string) => {
        const stone = dataTableState.rows.find(
          (row: IProduct) => row?.id === id
        );
        return stone?.diamond_status === AVAILABLE_STATUS;
      });

      if ((hasHold && hasAvailable) || (hasMemoOut && hasAvailable)) {
        setErrorText(SOME_STONES_NOT_AVAILABLE_MODIFY_SEARCH);
        setIsError(true);
      } else if (hasMemoOut) {
        setErrorText(STONE_NOT_AVAILABLE_MODIFY_SEARCH);
        setIsError(true);
      } else if (hasHold) {
        setErrorText(STONE_NOT_AVAILABLE_MODIFY_SEARCH);
        setIsError(true);
      } else {
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
      }
    } else {
      setIsError(true);
      setErrorText(SELECT_STONE_TO_PERFORM_ACTION);
    }
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
              <CommonPoppup
                content={''}
                status="success"
                customPoppupBodyStyle="!mt-[70px]"
                header={res?.message}
                actionButtonData={[
                  {
                    variant: 'secondary',
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
            );
            // On success, show confirmation dialog and update badge
            setIsError(false);
            setErrorText('');
            triggerProductApi({
              url: searchUrl,
              limit: LISTING_PAGE_DATA_LIMIT,
              offset: 0
            }).then(res => {
              if (res.data?.products.length > 0) {
                dataTableSetState.setRows(res.data?.products);
              } else {
                modalSetState.setIsDialogOpen(true);
                modalSetState.setDialogContent(
                  <CommonPoppup
                    status="warning"
                    content={''}
                    customPoppupBodyStyle="!mt-[70px]"
                    header={NO_PRODUCT_FOUND}
                    actionButtonData={[
                      {
                        variant: 'primary',
                        label: ManageLocales('app.modal.okay'),
                        handler: () => {
                          closeSearch(
                            activeTab,
                            JSON.parse(localStorage.getItem('Search')!)
                          );

                          modalSetState.setIsDialogOpen(false);
                        },
                        customStyle: 'flex-1 h-10'
                      }
                    ]}
                  />
                );
              }
              res.data?.products;
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
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="!mt-[70px]"
                header={error?.data?.message}
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
          });
        // Clear the selected checkboxes
        setRowSelection({});
      }
      // }
    }
  };

  const handleAddToCartDetailPage = () => {
    setIsLoading(true);
    // Extract variant IDs for selected stones
    const variantIds = [detailPageData.id]
      ?.map((_id: string) => {
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
            <CommonPoppup
              content={''}
              status="success"
              customPoppupBodyStyle="!mt-[70px]"
              header={res?.message}
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
          );

          // On success, show confirmation dialog and update badge
          setIsError(false);
          setErrorText('');
          triggerProductApi({
            url: searchUrl,
            limit: LISTING_PAGE_DATA_LIMIT,
            offset: 0
          }).then(res => {
            if (res.data?.products.length > 0) {
              dataTableSetState.setRows(res.data?.products);
            } else {
              modalSetState.setIsDialogOpen(true);
              modalSetState.setDialogContent(
                <CommonPoppup
                  status="warning"
                  content={''}
                  customPoppupBodyStyle="!mt-[70px]"
                  header={NO_PRODUCT_FOUND}
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: ManageLocales('app.modal.okay'),
                      handler: () => {
                        closeSearch(
                          activeTab,
                          JSON.parse(localStorage.getItem('Search')!)
                        );

                        modalSetState.setIsDialogOpen(false);
                      },
                      customStyle: 'flex-1 h-10'
                    }
                  ]}
                />
              );
            }
            res.data?.products;
            setRowSelection({});
            setErrorText('');
            setData(res.data);
          });
          dispatch(notificationBadge(true));
        })
        .catch(error => {
          setIsLoading(false);
          // On error, set error state and error message

          setIsDialogOpen(true);
          setDialogContent(
            <CommonPoppup
              content={''}
              customPoppupBodyStyle="!mt-[70px]"
              header={error?.data?.message}
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
        });
      // Clear the selected checkboxes
      setRowSelection({});
    }
  };

  const goBackToListView = (isFrom?: string) => {
    if (isFrom === 'Detail Page') {
      setIsDetailPage(true);
      setBreadCrumLabel('');
    }
    setIsConfirmStone(false);
    setConfirmStoneData([]);
    setIsCompareStone(false);
    setCompareStoneData([]);
    setShowAppointmentForm(false);
    setAppointmentPayload({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });
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
        comments: textAreaValue || '',
        identifier: confirmTrack.confirmStoneTrack
          ? confirmTrack.confirmStoneTrack
          : 'Searching'
      })
        .unwrap()
        .then(res => {
          if (res) {
            setIsLoading(false);
            setCommentValue('');
            setTextAreaValue('');
            setIsDialogOpen(true);
            setRowSelection({});
            dispatch(setConfirmStoneTrack(''));

            const formatMessage = (message: string) => {
              return message.split('\n').map((line: string, index: number) => (
                <span key={index}>
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                  <br />
                </span>
              ));
            };
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

            triggerProductApi({
              url: searchUrl,
              limit: LISTING_PAGE_DATA_LIMIT,
              offset: 0
            }).then(res => {
              if (res.data?.products.length > 0) {
                dataTableSetState.setRows(res.data?.products);
              } else {
                modalSetState.setIsDialogOpen(true);
                modalSetState.setDialogContent(
                  <CommonPoppup
                    status="warning"
                    content={''}
                    customPoppupBodyStyle="!mt-[70px]"
                    header={NO_PRODUCT_FOUND}
                    actionButtonData={[
                      {
                        variant: 'primary',
                        label: ManageLocales('app.modal.okay'),
                        handler: () => {
                          closeSearch(
                            activeTab,
                            JSON.parse(localStorage.getItem('Search')!)
                          );

                          modalSetState.setIsDialogOpen(false);
                        },
                        customStyle: 'flex-1 h-10'
                      }
                    ]}
                  />
                );
              }
              res.data?.products;
              setRowSelection({});
              setErrorText('');
              setData(res.data);
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
                customPoppupStyle="h-[260px]"
                customPoppupBodyStyle="!mt-[62px]"
                header={`Important KYC Verification Required!`}
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
            );
          } else {
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={e?.data?.message}
                customPoppupBodyStyle="!mt-[70px]"
                header={``}
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
      }, 4000);
  }, [isError]);

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
    <div className="relative">
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

      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={renderAddCommentDialogs}
      />

      <div className="flex py-[8px] items-center">
        <p className="text-lMedium font-medium text-neutral900">
          {editRoute ? (
            ManageLocales('app.result.headerEdit')
          ) : isCompareStone ? (
            'Diamond Comparison Overview'
          ) : showAppointmentForm ? (
            ManageLocales('app.myAppointment.header')
          ) : isDetailPage ? (
            ''
          ) : hasLimitExceeded ? (
            ''
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

      {isDetailPage && detailPageData?.length ? (
        <>
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
                data={dataTableState.rows}
                filterData={detailPageData}
                goBackToListView={goBack}
                handleDetailPage={handleDetailPage}
                breadCrumLabel={
                  breadCrumLabel.length ? breadCrumLabel : 'Search Results'
                }
                modalSetState={modalSetState}
                setIsLoading={setIsLoading}
                setIsDiamondDetailLoading={setIsDiamondDetailLoading}
                setIsGemTrac={setIsGemTrac}
                setGemTracData={setGemTracData}
                triggerGemTracApi={triggerGemTracApi}
              />
              <div className="p-[8px] flex justify-end items-center border-t-[1px] border-l-[1px] border-neutral-200 gap-3 rounded-b-[8px] shadow-inputShadow mb-1">
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
                    <Skeleton
                      width={128}
                      sx={{ bgcolor: 'var(--neutral-200)' }}
                      height={40}
                      variant="rectangular"
                      animation="wave"
                      className="rounded-[4px]"
                    />
                  </>
                ) : (
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
                          setBreadCrumLabel('Detail Page');
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
                            setIsLoading,
                            refreshSearchResults
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
          ) : isCompareStone ? (
            <CompareStone
              rows={compareStoneData}
              columns={columnData}
              goBackToListView={goBackToListView}
              activeTab={activeTab}
              isFrom={breadCrumLabel}
              handleDetailImage={handleDetailImage}
              setCompareStoneData={setCompareStoneData}
              compareStoneData={compareStoneData}
              setIsError={setIsError}
              setErrorText={setErrorText}
              setIsLoading={setIsLoading}
              setIsDialogOpen={setIsDialogOpen}
              setDialogContent={setDialogContent}
              setIsConfirmStone={setIsConfirmStone}
              setConfirmStoneData={setConfirmStoneData}
              setIsDetailPage={setIsDetailPage}
              modalSetState={modalSetState}
              refreshCompareStone={refreshSearchResults}
            />
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
          ) : hasLimitExceeded ? (
            <div className="h-[78vh]">
              <EmptyScreen
                label={'Complete KYC Now'}
                onClickHandler={() => {
                  router.push('/v2/kyc');
                }}
                isPrimary={true}
                imageSrc={unAuthorizedSvg}
                contentReactNode={
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="text-neutral600 font-medium text-headingM">
                      Your daily limit has been exceeded.
                    </h1>
                    <p className="text-lMedium font-medium text-neutral600">
                      Please complete your KYC for unlimited searches.
                    </p>
                  </div>
                }
              />
            </div>
          ) : (
            <div className="">
              {productData === undefined &&
              !memoizedRows.length &&
              !data?.length ? (
                <DataTableSkeleton />
              ) : (
                <DataTable
                  rows={memoizedRows}
                  columns={memoizedColumns}
                  setRowSelection={setRowSelection}
                  rowSelection={rowSelection}
                  showCalculatedField={true}
                  isResult={true}
                  activeTab={activeTab}
                  setSorting={setSorting}
                  sorting={sorting}
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
                  setIsConfirmStone={setIsConfirmStone}
                  setConfirmStoneData={setConfirmStoneData}
                  setIsCompareStone={setIsCompareStone}
                  setCompareStoneData={setCompareStoneData}
                  setIsInputDialogOpen={setIsInputDialogOpen}
                  handleCreateAppointment={handleCreateAppointment}
                  setIsSkeletonLoading={setIsSkeletonLoading}
                  isSkeletonLoading={isSkeletonLoading}
                />
              )}
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
                    handler: () => confirmStone()
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
