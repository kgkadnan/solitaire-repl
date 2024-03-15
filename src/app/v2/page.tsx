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

import Image from 'next/image';
import { handleCardClick } from './search/saved-search/helpers/handle-card-click';
import { useLazyGetProductCountQuery } from '@/features/api/product';
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
import downloadIcon from '@public/v2/assets/icons/download.svg';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import errorIcon from '@public/v2/assets/icons/modal/error.svg';
import { useLazyDonwloadInvoiceQuery } from '@/features/api/download-invoice';
import { downloadPdfFromBase64 } from '@/utils/download-invoice-from-base-64';
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';
import { SocketManager, useSocket } from '@/hooks/v2/socket-manager';
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
  // const [options, setOptions] = useState();
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
      count: customerData?.customer.cart.items.length ?? 0,
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
  const { modalSetState } = useModalStateManagement();

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
        { label: 'Tracking Details', accessor: 'delivery' },
        { label: 'Details', accessor: 'details' },
        { label: 'Download Invoice', accessor: 'download_invoice' }
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
      case 'delivery':
        return (
          <Link
            href={value[accessor]?.link}
            target="_blank"
            className="pl-1 text-infoMain cursor-pointer"
          >
            Track Order
          </Link>
        );
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
      case 'download_invoice':
        return (
          <button
            className="flex items-center cursor-pointer"
            onClick={() => handleDownloadInvoice(value?.invoice_id)}
          >
            <Image src={downloadIcon} alt="downloadExcelIcon" />
          </button>
        );
      default:
        return <span>{value[accessor]}</span>;
    }
  };
  const [triggerDownloadInvoice] = useLazyDonwloadInvoiceQuery();

  const handleDownloadInvoice = (downloadInvoiceId: string) => {
    triggerDownloadInvoice({ invoiceId: downloadInvoiceId })
      .then((res: any) => {
        const { data, fileName } = res?.data || {};
        downloadPdfFromBase64(data, fileName, {
          onSave: () => {
            // Handle any post-download actions here
            if (modalSetState.setIsDialogOpen)
              modalSetState.setIsDialogOpen(true);

            if (modalSetState.setDialogContent) {
              modalSetState.setDialogContent(
                <>
                  <div className="absolute left-[-84px] top-[-84px]">
                    <Image src={confirmIcon} alt="confirmIcon" />
                  </div>
                  <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                    <h1 className="text-headingS text-neutral900">
                      Download Invoice Successfully
                    </h1>
                    <ActionButton
                      actionButtonData={[
                        {
                          variant: 'primary',
                          label: ManageLocales('app.modal.okay'),
                          handler: () => modalSetState.setIsDialogOpen(false),
                          customStyle: 'flex-1 w-full h-10'
                        }
                      ]}
                    />
                  </div>
                </>
              );
            }
          }
        });
      })
      .catch((error: any) => {
        if (modalSetState.setIsDialogOpen) modalSetState.setIsDialogOpen(true);
        if (modalSetState.setDialogContent) {
          modalSetState.setDialogContent(
            <>
              <div className="absolute left-[-84px] top-[-84px]">
                <Image src={errorIcon} alt="errorIcon" />
              </div>
              <h1 className="text-headingS text-neutral900">
                {error?.data?.message}
              </h1>
              <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                <ActionButton
                  actionButtonData={[
                    {
                      variant: 'primary',
                      label: ManageLocales('app.modal.okay'),
                      handler: () => modalSetState.setIsDialogOpen(false),
                      customStyle: 'flex-1 w-full h-10'
                    }
                  ]}
                />
              </div>
            </>
          );
        }
      });
  };

  return (
    <>
      <div className="flex flex-col gap-4 ">
        {' '}
        <div
          className={`bg-cover bg-no-repeat flex justify-center flex-col items-center h-[220px] gap-5`}
          style={{
            backgroundImage: 'url(/gradient.png)'
            //         background: `
            //   linear-gradient(90deg, #DBF2FC 30%, #E8E8FF 100%)
            // `
          }}
        >
          <p className="text-headingM medium text-neutral900">
            Hello, {customerData?.customer.first_name}
          </p>
          <div className="flex items-center bg-neutral0 rounded-[4px] overflow-hidden border-[1px] border-primaryBorder w-[720px] px-4 py-2">
            <div className="relative flex-grow items-center">
              <input
                className="px-10 py-2 w-full text-gray-600 rounded-lg focus:outline-none"
                type="text"
                placeholder="Search for Diamonds"
              />
              <div className="absolute left-0 top-[5px]">
                <Image src={searchIcon} alt={'searchIcon'} />
              </div>
              <div className="absolute right-0 top-[5px]">
                <Image src={micIcon} alt={'micIcon'} />
              </div>
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
                  className={`${data.color} p-3 rounded-[4px]`}
                >
                  {' '}
                  {data.icon}{' '}
                </div>
                <div>
                  <p className="text-neutral600 text-mRegular">{data.label}</p>
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
            <DashboardCarousel images={customerData?.customer.carousel_items} />
          </div>
          {/* KAMCard Container - Prevent it from shrinking and assign a max width */}
          <div className="flex-shrink-0 w-[300px] max-w-full">
            <KAMCard
              name={customerData?.customer.kam?.kam_name ?? '-'}
              role={customerData?.customer.kam?.post ?? 'Key Account Manager'}
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
                      <div key={label} className="p-4 text-left font-medium">
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
                              router.push(`/v2/your-orders?id=${items?.id}`);
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
        <div
          className="border-t-[1px] border-l-[1px] border-r-[1px] rounded-[8px] p-4 flex justify-between border-neutral200 text-lRegular 
     mt-[20px]"
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
              onClick={() => router.push('/v2/my-account?path=privacy-policy')}
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
    </>
  );
};

export default Dashboard;
