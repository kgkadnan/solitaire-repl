'use client';

import DashboardCarousel from '@/components/v2/common/carousel';
import KAMCard from '@/components/v2/common/kam-card';
import styles from './search/saved-search/saved-search.module.scss';
import ArrivalIcon from '@public/v2/assets/icons/sidebar-icons/new-arrivals.svg?url';
import CartIcon from '@public/v2/assets/icons/sidebar-icons/cart.svg?url';
import AppointmentIcon from '@public/v2/assets/icons/sidebar-icons/appointment.svg?url';
import BidToBuyIcon from '@public/v2/assets/icons/sidebar-icons/bid-to-buy.svg?url';
import { useRouter } from 'next/navigation';
import { useGetCustomerQuery } from '@/features/api/dashboard';
import { useCallback, useEffect, useMemo, useState } from 'react';
import searchIcon from '@public/v2/assets/icons/data-table/search-icon.svg';
import micIcon from '@public/v2/assets/icons/dashboard/mic.svg';
import editIcon from '@public/v2/assets/icons/saved-search/edit-button.svg';
import threeDotsSvg from '@public/v2/assets/icons/threedots.svg';

import Image from 'next/image';
import { handleCardClick } from './search/saved-search/helpers/handle-card-click';
import {
  useConfirmProductMutation,
  useGetProductByIdMutation,
  useLazyGetProductCountQuery
} from '@/features/api/product';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import { formatCreatedAt } from '@/utils/format-date';
import { DisplayTable } from '@/components/v2/common/display-table';
import { Routes, SubRoutes } from '@/constants/v2/enums/routes';
import { modifySavedSearch } from '@/features/saved-search/saved-search';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { formatNumberWithLeadingZeros } from '@/utils/format-number-withLeadingZeros';
import arrow from '@public/v2/assets/icons/my-diamonds/Arrow.svg';
import icon from '@public/v2/assets/icons/my-diamonds/avatar.svg';
import { kycStatus } from '@/constants/enums/kyc';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { Dropdown } from '@/components/v2/common/dropdown-menu';
import { statusCode } from '@/constants/enums/status-code';
import errorSvg from '@public/v2/assets/icons/modal/error.svg';
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';
import { useAddCartMutation } from '@/features/api/cart';
import { DialogComponent } from '@/components/v2/common/dialog';
import { handleConfirmStone } from './search/result/helpers/handle-confirm-stone';
import { IManageListingSequenceResponse, IProduct } from './search/interface';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import ConfirmStone from './search/result/components';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { AddCommentDialog } from '@/components/v2/common/comment-dialog';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import { handleComment } from './search/result/helpers/handle-comment';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { FILE_URLS } from '@/constants/v2/detail-page';
import { getShapeDisplayName } from '@/utils/v2/detail-page';

// import useUser from '@/lib/use-auth';

interface ITabs {
  label: string;
  link: string;
  data: any;
}
const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: customerData, refetch: refetchCustomerData } =
    useGetCustomerQuery({});

  const [activeTab, setActiveTab] = useState<string>('');
  const [tabs, setTabs] = useState<ITabs[]>([]);
  const optionsClasses = [
    'linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 30%, #FFF4E3 100%)',
    'linear-gradient(90deg, #FFF4E3 0%, #E8E8FF 50%, #DBF2FC 100%)',
    'linear-gradient(90deg, #E1F6F1 0%, #FFF4E3 50%, #EFEFFD 100%)',
    'linear-gradient(90deg, #DBF2FC 0%, #E8E8FF 100%)'
  ];
  const [stoneId, setStoneId] = useState();
  const [searchData, setSearchData] = useState<any>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [breadCrumLabel, setBreadCrumLabel] = useState('');
  const [isConfirmStone, setIsConfirmStone] = useState(false);
  const [confirmStoneData, setConfirmStoneData] = useState<IProduct[]>([]);
  const [isAddCommentDialogOpen, setIsAddCommentDialogOpen] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [commentValue, setCommentValue] = useState('');
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDetailPage, setIsDetailPage] = useState(false);

  const { errorSetState } = useErrorStateManagement();
  const { setIsError, setErrorText } = errorSetState;

  const options = [
    {
      label: 'New Arrivals',
      icon: <ArrivalIcon stroke="#101828" />,
      color: optionsClasses[0],
      count: customerData?.customer.new_arrivals_count ?? 0,
      isAvailable: true,
      link: '/v2/new-arrivals'
    },
    {
      label: 'My Cart',
      icon: <CartIcon />,
      color: optionsClasses[1],
      count: customerData?.customer?.cart?.items.length ?? 0,
      isAvailable: true,
      link: '/v2/my-cart'
    },
    {
      label: 'Bid to Buy',
      icon: <BidToBuyIcon />,
      color: optionsClasses[2],
      count: 0,
      isAvailable: false,
      link: '/v2/my-cart'
    },
    {
      label: 'My Appointments',
      icon: <AppointmentIcon />,
      color: optionsClasses[3],
      count: 0,
      isAvailable: false,
      link: '/v2/my-cart'
    }
  ];
  const handleTabs = ({ tab }: { tab: string }) => {
    setActiveTab(tab);
  };
  let [triggerProductCountApi] = useLazyGetProductCountQuery();
  const { modalState, modalSetState } = useModalStateManagement();
  const { isDialogOpen, dialogContent } = modalState;

  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const gradientClasses = [
    styles.gradient1,
    styles.gradient2,
    styles.gradient3,
    styles.gradient4
  ];

  const handleEdit = (stone: string) => {
    let savedSearchEditData = customerData?.customer.saved_searches.filter(
      (items: any) => {
        return items.id === stone;
      }
    );

    dispatch(modifySavedSearch({ savedSearch: savedSearchEditData[0] }));

    router.push(
      `${Routes.SEARCH}?active-tab=${SubRoutes.SAVED_SEARCH}&edit=${SubRoutes.SAVED_SEARCH}`
    );
  };

  const column = [
    {
      accessor: 'lab',
      label: 'Lab',
      sequence: 1,
      short_label: 'lab'
    },
    {
      accessor: 'shape',
      label: 'Shape',
      sequence: 2,
      short_label: 'Shape'
    },
    {
      accessor: 'carats',
      label: 'Carats',
      sequence: 3,
      short_label: 'carats'
    },
    {
      accessor: 'color',
      label: 'Color',
      sequence: 4,
      short_label: 'Color'
    },
    {
      accessor: 'clarity',
      label: 'Clarity',
      sequence: 5,
      short_label: 'Clarity'
    },
    {
      accessor: 'cut',
      label: 'Cut',
      sequence: 6,
      short_label: 'Cut'
    },
    {
      accessor: 'polish',
      label: 'Polish',
      sequence: 7,
      short_label: 'Polish'
    },
    {
      accessor: 'symmetry',
      label: 'Symmetry',
      sequence: 8,
      short_label: 'Symmetry'
    }
  ];
  useEffect(() => {
    refetchCustomerData();
  }, []);
  useEffect(() => {
    if (customerData) {
      const tabsCopy: ITabs[] = []; // Make a copy of the current tabs
      // const tabsCopy = [...tabs]; // Make a copy of the current tabs

      // Check if there are saved searches and add the "Saved Search" tab
      if (customerData.customer.saved_searches.length > 0) {
        tabsCopy.push({
          label: 'Saved Search',
          link: '/v2/search?active-tab=saved-search',
          data: customerData.customer.saved_searches.slice(0, 5)
        });
      } else {
        // Remove the "Saved Search" tab if there are no saved searches
        const index = tabsCopy?.findIndex(tab => tab.label === 'Saved Search');
        if (index !== -1) {
          tabsCopy?.splice(index, 1);
        }
      }

      // Update the tabs state
      setTabs(tabsCopy);
      setActiveTab(tabsCopy[0]?.label);

      // Check for pending and active invoices
      if (customerData.customer.orders.length > 0) {
        const pendingInvoices = customerData.customer.orders
          .filter((item: any) => item.invoice_id === null)
          .slice(0, 5);

        const activeInvoices = customerData.customer.orders
          .filter(
            (item: any) => item.invoice_id !== null && item.status === 'pending'
          )
          .slice(0, 5);

        // Update or add "Pending Invoice" tab
        const pendingTab = tabsCopy.find(
          tab => tab.label === 'Pending Invoice'
        );
        if (pendingInvoices.length > 0) {
          if (pendingTab) {
            pendingTab.data = pendingInvoices;
          } else {
            tabsCopy.push({
              label: 'Pending Invoice',
              link: '/v2/your-orders',
              data: pendingInvoices
            });
          }
        } else {
          // Remove "Pending Invoice" tab if there are no pending invoices
          const index = tabsCopy.findIndex(
            tab => tab.label === 'Pending Invoice'
          );
          if (index !== -1) {
            tabsCopy.splice(index, 1);
          }
        }

        // Update or add "Active Invoice" tab
        const activeTab = tabsCopy.find(tab => tab.label === 'Active Invoice');
        if (activeInvoices.length > 0) {
          if (activeTab) {
            activeTab.data = activeInvoices;
          } else {
            tabsCopy.push({
              label: 'Active Invoice',
              link: '/v2/your-orders',
              data: activeInvoices
            });
          }
        } else {
          // Remove "Active Invoice" tab if there are no active invoices
          const index = tabsCopy.findIndex(
            tab => tab.label === 'Active Invoice'
          );
          if (index !== -1) {
            tabsCopy.splice(index, 1);
          }
        }
        // Update the tabs state
        setTabs(tabsCopy);
        setActiveTab(tabsCopy[0].label);
      }
    }
  }, [customerData]);

  useEffect(() => {
    if (tabs.length > 0) {
      if (activeTab === '') {
        setActiveTab(tabs[0].label);
      }
    }
  }, [tabs]);

  const tabsData: any = {
    pendingInvoice: {
      keys: [
        { label: 'Order ID', accessor: 'display_id' },
        { label: 'Confirmation Date', accessor: 'created_at' },
        { label: 'Details', accessor: 'details' }
      ],
      data: tabs.find(tab => tab.label === activeTab)?.data
    },
    activeInvoice: {
      keys: [
        { label: 'Invoice Number', accessor: 'invoice_id' },
        { label: 'Invoice Date', accessor: 'created_at' },
        // { label: 'Tracking Details', accessor: 'delivery' },
        { label: 'Details', accessor: 'details' }
        // { label: 'Download Invoice', accessor: 'download_invoice' }
      ],
      data: tabs.find(tab => tab.label === activeTab)?.data
    }
  };

  // Get the keys and data for the active tab
  const { keys, data } = tabsData[
    activeTab === 'Active Invoice'
      ? 'activeInvoice'
      : activeTab === 'Pending Invoice'
      ? 'pendingInvoice'
      : ''
  ] || { keys: [], data: [] };

  const redirectLink = () => {
    let link = '/';
    if (activeTab === 'Saved Search') {
      return (link = 'v2/search?active-tab=saved-search');
    } else if (activeTab === 'Active Invoice') {
      return (link = '/v2/your-orders?path=active');
    } else if (activeTab === 'Pending Invoice') {
      return (link = '/v2/your-orders');
    }
    return link;
  };

  const renderCellContent = (accessor: string, value: any) => {
    switch (accessor) {
      case 'display_id':
        return (
          <>
            <Image src={icon} alt="icon" />
            <span>{formatNumberWithLeadingZeros(value[accessor])}</span>
          </>
        );
      // case 'delivery':
      //   return (
      //     <Link
      //       href={value[accessor]?.link}
      //       target="_blank"
      //       className="pl-1 text-infoMain cursor-pointer"
      //     >
      //       Track Order
      //     </Link>
      //   );
      case 'invoice_id':
        return (
          <>
            <Image src={icon} alt="icon" />
            <span>{value[accessor]}</span>
          </>
        );
      case 'created_at':
        return <span>{formatCreatedAt(value[accessor])}</span>;
      case 'details':
        return (
          <button
            className="flex items-center cursor-pointer"
            // onClick={() => handleShowDetails(value?.id)}
          >
            <span>Show Details</span>
            <Image src={arrow} alt="arrow" />
          </button>
        );
      // case 'download_invoice':
      //   return (
      //     <button
      //       className="flex items-center cursor-pointer"
      //       onClick={() => handleDownloadInvoice(value?.invoice_id)}
      //     >
      //       <Image src={downloadIcon} alt="downloadExcelIcon" />
      //     </button>
      //   );
      default:
        return <span>{value[accessor]}</span>;
    }
  };
  // const [triggerDownloadInvoice] = useLazyDonwloadInvoiceQuery();

  // const handleDownloadInvoice = (downloadInvoiceId: string) => {
  //   triggerDownloadInvoice({ invoiceId: downloadInvoiceId })
  //     .then((res: any) => {
  //       const { data, fileName } = res?.data || {};
  //       downloadPdfFromBase64(data, fileName, {
  //         onSave: () => {
  //           // Handle any post-download actions here
  //           if (modalSetState.setIsDialogOpen)
  //             modalSetState.setIsDialogOpen(true);

  //           if (modalSetState.setDialogContent) {
  //             modalSetState.setDialogContent(
  //               <>
  //                 <div className="absolute left-[-84px] top-[-84px]">
  //                   <Image src={confirmIcon} alt="confirmIcon" />
  //                 </div>
  //                 <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
  //                   <h1 className="text-headingS text-neutral900">
  //                     Download Invoice Successfully
  //                   </h1>
  //                   <ActionButton
  //                     actionButtonData={[
  //                       {
  //                         variant: 'primary',
  //                         label: ManageLocales('app.modal.okay'),
  //                         handler: () => modalSetState.setIsDialogOpen(false),
  //                         customStyle: 'flex-1 w-full h-10'
  //                       }
  //                     ]}
  //                   />
  //                 </div>
  //               </>
  //             );
  //           }
  //         }
  //       });
  //     })
  //     .catch((error: any) => {
  //       if (modalSetState.setIsDialogOpen) modalSetState.setIsDialogOpen(true);
  //       if (modalSetState.setDialogContent) {
  //         modalSetState.setDialogContent(
  //           <>
  //             <div className="absolute left-[-84px] top-[-84px]">
  //               <Image src={errorIcon} alt="errorIcon" />
  //             </div>
  //             <h1 className="text-headingS text-neutral900">
  //               {error?.data?.message}
  //             </h1>
  //             <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
  //               <ActionButton
  //                 actionButtonData={[
  //                   {
  //                     variant: 'primary',
  //                     label: ManageLocales('app.modal.okay'),
  //                     handler: () => modalSetState.setIsDialogOpen(false),
  //                     customStyle: 'flex-1 w-full h-10'
  //                   }
  //                 ]}
  //               />
  //             </div>
  //           </>
  //         );
  //       }
  //     });
  // };

  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  const [getProductById] = useGetProductByIdMutation();
  const [addCart] = useAddCartMutation();
  const [confirmProduct] = useConfirmProductMutation();

  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
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

        // const updatedColumns = [...response.data, additionalColumn];
        // dataTableSetState.setColumns(updatedColumns);
      }
    };

    fetchColumns();
  }, []);

  const handleStoneId = (e: any) => {
    setStoneId(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsLoading(true);
      getProductById({
        search_keyword: stoneId
      })
        .then((res: any) => {
          setIsLoading(false);
          if (res?.error?.status === statusCode.NOT_FOUND) {
            setError(`We couldn't find any results for this search`);
          } else {
            setSearchData(res?.data);
            setError('');
            setIsDetailPage(true);
          }
        })
        .catch((e: any) => {
          setIsLoading(false);
          setError('Something went wrong');
        });
    }
  };
  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(''); // Hide the toast notification after some time
      }, 2000);
  }, [error]);

  const goBack = () => {
    setBreadCrumLabel('');
    setSearchData({});
  };

  const handleAddToCartDetailPage = () => {
    setIsLoading(true);
    // Extract variant IDs for selected stones
    const variantIds = [searchData?.id]
      ?.map((id: string) => {
        if (searchData && 'variants' in searchData) {
          return searchData.variants[0]?.id;
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
                        setSearchData({});
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
          setError('');
        })
        .catch((error: any) => {
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
    }
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

  const handleDetailPage = ({ row }: { row: any }) => {
    if (isConfirmStone) {
      setBreadCrumLabel('Confirm Stone');
    }
    setIsDetailPage(true);
    setIsError(false);
    setError('');
    setDetailPageData(row);
  };

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
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

            // setRowSelection({});
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
  return (
    <>
      {error !== '' && (
        <Toast show={error !== ''} message={error} isSuccess={false} />
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
      />
      {isLoading && <CustomKGKLoader />}
      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={renderAddCommentDialogs}
      />

      {isDetailPage && searchData && Object.keys(searchData).length > 0 ? (
        <div className="mb-[10px]">
          <DiamondDetailsComponent
            data={[searchData]}
            filterData={searchData}
            goBackToListView={goBack}
            handleDetailPage={handleDetailPage}
            breadCrumLabel={'Dashboard'}
            modalSetState={modalSetState}
            setIsLoading={setIsLoading}
          />
          <div className="p-[16px] flex justify-end items-center border-t-[1px] border-l-[1px] border-neutral-200 gap-3 rounded-b-[8px] shadow-inputShadow ">
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
                    const selectedRows = { [searchData.id]: true };
                    handleConfirmStone({
                      selectedRows: selectedRows,
                      rows: [searchData],
                      setIsError,
                      setErrorText: setError,
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
        </div>
      ) : isConfirmStone ? (
        <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow mt-[16px]">
          <ConfirmStone
            rows={confirmStoneData}
            columns={columnData}
            goBackToListView={goBackToListView}
            // activeTab={activeTab}
            isFrom={'Dashboard'}
            handleDetailImage={handleDetailImage}
            handleDetailPage={handleDetailPage}
            identifier="Dashboard"
          />
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
                  label: ManageLocales('app.confirmStone.footer.confirmStone'),
                  handler: () => confirmStoneApiCall()
                }
              ]}
            />
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col gap-4 ${
            isNudge &&
            (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
              isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
              ? 'h-[87vh]'
              : 'h-[calc(87vh - 61px)]'
          } `}
        >
          {' '}
          <div className="flex flex-col gap-4 mb-[20px]">
            <div
              className={`bg-cover bg-no-repeat flex justify-center flex-col items-center h-[220px] gap-5`}
              style={{
                backgroundImage: 'url(/gradient.png)'
              }}
            >
              <p className="text-headingM medium text-neutral900">
                Hello, {customerData?.customer.first_name}
              </p>
              <div className="flex items-center bg-neutral0 rounded-[4px] overflow-hidden border-[1px] border-primaryBorder w-[720px] px-4 py-2">
                <div className="relative flex-grow items-center">
                  <input
                    className="px-10 py-2 w-full text-gray-600 rounded-lg focus:outline-none"
                    type="number"
                    placeholder="Search by stone id or certificate number"
                    onChange={handleStoneId}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="absolute left-0 top-[5px]">
                    <Image src={searchIcon} alt={'searchIcon'} />
                  </div>
                  {/* <div className="absolute right-0 top-[5px]">
            <Image src={micIcon} alt={'micIcon'} />
          </div> */}
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-4">
              {options.map(data => {
                return (
                  <div
                    className={`border-[1px] border-neutral200 p-[24px] flex rounded-[8px] w-full gap-4 hover:border-accentTeal shadow-sm ${
                      data.isAvailable ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    key={data.label}
                    onClick={
                      data.isAvailable
                        ? () => {
                            router.push(data.link);
                          }
                        : () => {}
                    }
                  >
                    <div
                      style={{ background: data.color }}
                      className={`${data.color} p-3 rounded-[4px] h-[48px]`}
                    >
                      {' '}
                      {data.icon}{' '}
                    </div>
                    <div>
                      <p className="text-neutral600 text-mRegular">
                        {data.label}
                      </p>
                      <p className={`text-neutral900 text-headingS medium `}>
                        {data.isAvailable
                          ? data.count === 0
                            ? '-'
                            : data.count
                          : 'Coming Soon'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex w-full gap-4 h-[400px]">
              {' '}
              {/* Ensure the container takes up full width */}
              {/* Carousel Container - Allow it to shrink if necessary but also give it an initial width */}
              <div className="flex-1 flex-shrink min-w-0 border-[1px] border-neutral50">
                <DashboardCarousel
                  images={customerData?.customer.carousel_items}
                />
              </div>
              {/* KAMCard Container - Prevent it from shrinking and assign a max width */}
              <div className="flex-shrink-0 w-[300px] max-w-full">
                <KAMCard
                  name={customerData?.customer.kam?.kam_name ?? '-'}
                  role={
                    customerData?.customer.kam?.post ?? 'Key Account Manager'
                  }
                  phoneNumber={customerData?.customer.kam?.phone ?? '-'}
                  email={customerData?.customer.kam?.email ?? '-'}
                />
              </div>
            </div>
            {tabs.length > 0 && (
              <div className="w-full border-[1px] border-neutral200 rounded-[8px]">
                <div className="border-b-[1px] border-neutral200 p-4">
                  <div className="flex border-b border-neutral200 w-full ml-3 text-mMedium font-medium justify-between pr-4">
                    <div>
                      {tabs.map(({ label }: any) => {
                        return (
                          <button
                            className={`p-2 ${
                              activeTab === label
                                ? 'text-neutral900 border-b-[2px] border-primaryMain'
                                : 'text-neutral600 '
                            }`}
                            key={label}
                            onClick={() => handleTabs({ tab: label })}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                    <Link
                      href={redirectLink()}
                      className="cursor-pointer text-infoMain text-sRegular flex items-center"
                    >
                      View All
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  {activeTab === 'Saved Search' &&
                    tabs
                      .find(tab => tab.label === activeTab)
                      ?.data?.map((searchData: any, index: number) => {
                        const gradientIndex = index % gradientClasses.length;
                        // Get the gradient class for the calculated index
                        const gradientClass = gradientClasses[gradientIndex];
                        return (
                          <div
                            className="p-[16px] flex flex-col md:flex-row w-full border-b-[1px] border-neutral200 cursor-pointer group hover:bg-neutral50"
                            key={searchData?.id}
                            onClick={() =>
                              handleCardClick({
                                id: searchData.id,
                                savedSearchData: tabs.find(
                                  tab => tab.label === activeTab
                                )?.data,
                                router,
                                triggerProductCountApi,
                                setDialogContent,
                                setIsDialogOpen
                              })
                            }
                          >
                            <div className="flex items-center gap-[18px] md:w-[40%]">
                              <div
                                className={` ${gradientClass} text-headingM w-[69px] h-[69px] text-neutral700 uppercase p-[14px] rounded-[4px] font-medium text-center`}
                              >
                                {searchData.name
                                  ?.split(' ') // Split the name into words
                                  .map((word: string) => word.charAt(0)) // Extract the first character of each word
                                  .join('')}
                              </div>
                              <div className="flex flex-col gap-[18px]">
                                <h1 className="text-neutral900 font-medium text-mMedium capitalize">
                                  {searchData.name}
                                </h1>
                                <div className="text-neutral700 font-regular text-sMedium">
                                  {formatCreatedAt(searchData.created_at)}
                                </div>
                              </div>
                            </div>
                            <div className="w-full md:w-[50%] mt-4 md:mt-0">
                              <DisplayTable
                                column={column}
                                row={[searchData.meta_data]}
                              />
                            </div>
                            <button
                              className="w-full md:w-[10%] flex justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              onClick={e => {
                                e.stopPropagation();
                                handleEdit(searchData.id);
                              }}
                            >
                              <Image src={editIcon} alt="editIcon" />
                            </button>
                          </div>
                        );
                      })}
                  {(activeTab === 'Active Invoice' ||
                    activeTab === 'Pending Invoice') && (
                    <div className="max-w-full overflow-x-auto">
                      {/* header */}
                      <div className="grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] text-mMedium h-[47px] border-b border-neutral-200 bg-neutral-50 text-neutral700">
                        {keys?.map(({ label }: any) => (
                          <div
                            key={label}
                            className="p-4 text-left font-medium"
                          >
                            {label}
                          </div>
                        ))}
                      </div>
                      {/* rows */}
                      <div className="">
                        {data?.length > 0 ? (
                          data?.map((items: any) => (
                            <div
                              key={items.order_id}
                              onClick={() => {
                                if (activeTab === 'Active Invoice') {
                                  router.push(
                                    `/v2/your-orders?path=active&id=${items?.id}`
                                  );
                                } else {
                                  router.push(
                                    `/v2/your-orders?id=${items?.id}`
                                  );
                                }
                                //  handleShowDetails(items?.id);
                              }}
                              className="cursor-pointer grid grid-cols-[repeat(auto-fit,_minmax(0,_1fr))] bg-neutral0 border-b border-neutral-200 hover:bg-neutral-50"
                            >
                              {keys?.map(({ accessor }: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center text-lRegular space-x-2 py-3 pr-3 pl-4 text-left text-gray-800"
                                >
                                  {renderCellContent(accessor, items)}
                                </div>
                              ))}
                            </div>
                          ))
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className="border-t-[1px] border-l-[1px] border-r-[1px] rounded-[8px] p-4 flex justify-between border-neutral200 text-lRegular 
mt-auto"
          >
            {/* for fixed footer */}
            {/* fixed bottom-0 left-[84px] right-0 bg-white  */}
            <div className="text-infoMain  flex gap-6 cursor-pointer">
              <p
                onClick={() =>
                  router.push('/v2/my-account?path=terms-and-conditions')
                }
              >
                Terms & Conditions
              </p>
              <p
                onClick={() =>
                  router.push('/v2/my-account?path=privacy-policy')
                }
              >
                Privacy Policy
              </p>
            </div>
            <p className="text-neutral500">
              Copyright © {new Date().getFullYear()} KGK Live. All rights
              reserved.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
