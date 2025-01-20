import React, { useCallback, useEffect, useState } from 'react';
import { get } from 'lodash';
import Image from 'next/image';
import { Avatar } from '../../ui/avatar';
import { kycStatus } from '@/constants/enums/kyc';
import { usePathname, useRouter } from 'next/navigation';
import ActionButton from '../action-button';
import { v2Routes } from '@/constants/routes';
import searchIcon from '@public/v2/assets/icons/dashboard/search-icon.svg';
import searchIconWhite from '@public/v2/assets/icons/dashboard/search-icon-white.svg';
import debounce from 'lodash.debounce';
import { Toast } from '@/components/v2/common/copy-and-share/toast';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@radix-ui/react-popover';
import MyAccountIcon from '@public/v2/assets/icons/topbar-icons/searchIcon.svg?url';
import logoutIcon from '@public/v2/assets/icons/topbar-icons/logout-icon.svg';
import Link from 'next/link';
import useUser from '@/lib/use-auth';
import Notification from './components/notification/notification';
import { useLazyGetProfilePhotoQuery } from '@/features/api/my-profile';
import { useAppSelector } from '@/hooks/hook';
import {
  useGetCustomerQuery,
  useLazyGetLogoutAllQuery,
  useLazyGetLogoutQuery
} from '@/features/api/dashboard';
import { DialogComponent } from '../dialog';
import logoutConfirmIcon from '@public/v2/assets/icons/modal/logout.svg';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import { Skeleton } from '@mui/material';
import {
  Tracking_Dashboard,
  Tracking_Dashboard_Destination_Page,
  Tracking_KYC,
  Tracking_KYC_Entry_Point,
  Tracking_Search_By_Text
} from '@/constants/funnel-tracking';
import { trackEvent } from '@/utils/ga';
import customerSupportSvg from '@public/v2/assets/icons/dashboard/customer-support.svg';
import WhatsappSvg from '@public/v2/assets/icons/dashboard/whatsapp.svg?url';
import PhoneSvg from '@public/v2/assets/icons/dashboard/phone.svg?url';
import { useNotifySalesMutation } from '@/features/api/notify-sales';
import CommonPoppup from '@/app/v2/login/component/common-poppup';
import { RadioButton } from '../radio';
import { useGetProductByIdMutation } from '@/features/api/product';
import { Routes } from '@/constants/v2/enums/routes';
import { dashboardResultPage } from '@/features/dashboard/dashboard-slice';
import { useDispatch } from 'react-redux';
import { statusCode } from '@/constants/enums/status-code';
import { filterFunction } from '@/features/filter-new-arrival/filter-new-arrival-slice';

export interface IUserAccountInfo {
  customer: {
    billing_address_id: string | null;
    cart_id: string;
    company_name: string | null;
    country_code: string | null;
    created_at: string;
    deleted_at: string | null;
    email: string;
    kyc: string | null;
    kam: {
      image: string;
      kam_name: string;
      post: string;
      phone: string;
    };
    id: string;
    last_name: string;
    metadata: string | null;
    orders: any;
    shipping_addresses: any;
    phone: string | null;
    first_name: string | null;
    updated_at: string | null;
    has_account: boolean;
    is_email_verified: boolean;
    is_phone_verified: boolean;
  };
}
const TopNavigationBar = ({
  isInMaintenanceMode
}: {
  isInMaintenanceMode: boolean;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentPath = usePathname();
  const [showNudge, setShowNudge] = useState(
    localStorage.getItem('show-nudge')
  );
  const { data: customerData } = useGetCustomerQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const dashboardResultPageData = useAppSelector(
    state => state.dashboardResultPage
  );
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [triggerGetProfilePhoto, { isSuccess }] = useLazyGetProfilePhotoQuery(
    {}
  );

  const [notifySales] = useNotifySalesMutation();
  const [triggerLogout] = useLazyGetLogoutQuery({});
  const [triggerLogoutAll] = useLazyGetLogoutAllQuery({});
  const { userLoggedOut } = useUser();
  const [getProductById] = useGetProductByIdMutation();
  const [modalContent, setModalContent] = useState<any>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userAccountInfo, setUserAccountInfo] = useState<IUserAccountInfo>();
  const [imageUrl, setImageUrl] = useState('');
  const [isImageApiLoaded, setIsImageApiLoaded] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRadios, setShowRadios] = useState(false);
  const [error, setError] = useState('');

  const [lastEventTime, setLastEventTime] = useState<number | null>(null);

  // Options for Radio Buttons
  const radioOptions = [
    {
      label: 'Stock Search',
      value: 'normal',
      name: 'searchFrom',
      disable: false
    },
    {
      label: 'New Arrivals',
      value: 'NewArrivals',
      name: 'searchFrom',
      disable: !customerData?.customer?.new_arrivals_count
    },
    {
      label: 'Bid to Buy',
      value: 'BidToBuy',
      name: 'searchFrom',
      disable:
        (customerData?.customer?.bid_to_buy?.starts_at &&
          customerData?.customer?.bid_to_buy?.count) ||
        (customerData?.customer?.bid_to_buy?.starts_at &&
          !customerData?.customer?.bid_to_buy?.count)
    }
  ];
  const handleRadioChange = (value: string) => {
    dispatch(
      dashboardResultPage({
        searchType: value
      })
    );
  };

  // Check if 10 minutes have passed since the last event
  const canTrackEvent = useCallback(() => {
    if (!lastEventTime) return true;
    return Date.now() - lastEventTime >= 10 * 60 * 1000; // 10 minutes in ms
  }, [lastEventTime]);

  const handleStoneId = (e: any) => {
    if (e.target.value.length >= 1 && canTrackEvent()) {
      setLastEventTime(Date.now()); // Update the timestamp in state
      trackEvent({
        action: Tracking_Search_By_Text.search_by_text_initiated,
        category: 'SearchByText',
        mobile_number: `+${customerData.customer.country_code}${customerData.customer.phone}`
      });
    }

    dispatch(
      dashboardResultPage({
        stoneId: e.target.value
      })
    );
  };

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(''); // Hide the toast notification after some time
      }, 4000);
  }, [error]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsLoading(true);
      if (dashboardResultPageData.searchType !== 'NewArrivals') {
        getProductById({
          search_keyword: dashboardResultPageData.stoneId,
          search_type: dashboardResultPageData.searchType
        })
          .unwrap()
          .then((res: any) => {
            setIsLoading(false);
            // setSearchData(res);
            // setIsDetailPage(true);

            setError('');
            setLastEventTime(null);
            trackEvent({
              action: Tracking_Search_By_Text.search_by_text_executed,
              category: 'SearchByText',
              mobile_number: `+${customerData.customer.country_code}${customerData.customer.phone}`,
              status: 'Success'
            });

            if (currentPath === '/v2' || currentPath === '/') {
              if (window?.dataLayer) {
                window.dataLayer.push({
                  event: Tracking_Dashboard.click_enter_search_by_text,
                  source_page: 'dashboard',
                  user_id: customerData?.customer?.id,
                  destination_page:
                    dashboardResultPageData.searchType === 'normal'
                      ? Tracking_Dashboard_Destination_Page.search_form_results
                      : Tracking_Dashboard_Destination_Page.bid_to_buy,
                  stone_count: res?.foundProducts?.length,
                  search_result: 'success'
                });
              }
            }

            if (dashboardResultPageData.searchType === 'normal') {
              dispatch(
                dashboardResultPage({
                  resultPageData: res
                })
              );
              router.push(`${Routes.STOCK_SEARCH}?path=${currentPath}`);
            } else if (dashboardResultPageData.searchType === 'BidToBuy') {
              console.log('res', res);
              dispatch(
                dashboardResultPage({
                  resultPageData: res,
                  stoneId: dashboardResultPageData.stoneId,
                  textSearchReportId: res.textSearchReportId
                })
              );
              router.push(Routes.BID_TO_BUY);
            }
          })
          .catch((_e: any) => {
            setIsLoading(false);
            setLastEventTime(null);

            if (currentPath === '/v2' || currentPath === '/') {
              if (window?.dataLayer) {
                window.dataLayer.push({
                  event: Tracking_Dashboard.click_enter_search_by_text,
                  source_page: 'dashboard',
                  user_id: customerData?.customer?.id,
                  destination_page:
                    dashboardResultPageData.searchType === 'normal'
                      ? Tracking_Dashboard_Destination_Page.search_form_results
                      : Tracking_Dashboard_Destination_Page.bid_to_buy,
                  stone_count: 0,
                  search_result: 'fail'
                });
              }
            }

            trackEvent({
              action: Tracking_Search_By_Text.search_by_text_executed,
              category: 'SearchByText',
              mobile_number: `+${customerData.customer.country_code}${customerData.customer.phone}`,
              status: 'Fail'
            });
            if (
              _e?.status === statusCode.NOT_FOUND ||
              _e?.status === statusCode.INVALID_DATA
            ) {
              setError(`We couldn't find any results for this search`);
            } else if (_e?.status === statusCode.UNAUTHORIZED) {
              setError(_e?.data?.message?.message);
            } else {
              setError('Something went wrong');
            }
          });
      } else {
        router.push(Routes.NEW_ARRIVAL);
        dispatch(
          dashboardResultPage({
            isNewArrival: !dashboardResultPageData.isNewArrival
          })
        );
        setIsLoading(false);
      }
    }
  };
  const handleInputSearch = () => {
    if (dashboardResultPageData.stoneId.length > 0) {
      setIsLoading(true);
      if (dashboardResultPageData.searchType !== 'NewArrivals') {
        getProductById({
          search_keyword: dashboardResultPageData.stoneId,
          search_type: dashboardResultPageData.searchType
        })
          .unwrap()
          .then((res: any) => {
            setIsLoading(false);
            // setSearchData(res);
            // setIsDetailPage(true);

            setError('');
            setLastEventTime(null);
            trackEvent({
              action: Tracking_Search_By_Text.search_by_text_executed,
              category: 'SearchByText',
              mobile_number: `+${customerData.customer.country_code}${customerData.customer.phone}`,
              status: 'Success'
            });

            if (currentPath === '/v2' || currentPath === '/') {
              if (window?.dataLayer) {
                window.dataLayer.push({
                  event: Tracking_Dashboard.click_enter_search_by_text,
                  source_page: 'dashboard',
                  user_id: customerData?.customer?.id,
                  destination_page:
                    dashboardResultPageData.searchType === 'normal'
                      ? Tracking_Dashboard_Destination_Page.search_form_results
                      : Tracking_Dashboard_Destination_Page.bid_to_buy,
                  stone_count: res?.foundProducts?.length,
                  search_result: 'success'
                });
              }
            }

            if (dashboardResultPageData.searchType === 'normal') {
              dispatch(
                dashboardResultPage({
                  resultPageData: res
                })
              );
              router.push(`${Routes.STOCK_SEARCH}?path=${Routes.DASHBOARD}`);
            } else if (dashboardResultPageData.searchType === 'BidToBuy') {
              dispatch(
                dashboardResultPage({
                  resultPageData: res,
                  stoneId: dashboardResultPageData.stoneId,
                  textSearchReportId: res.textSearchReportId
                })
              );
              router.push(Routes.BID_TO_BUY);
            }
          })
          .catch((_e: any) => {
            setIsLoading(false);
            setLastEventTime(null);
            trackEvent({
              action: Tracking_Search_By_Text.search_by_text_executed,
              category: 'SearchByText',
              mobile_number: `+${customerData.customer.country_code}${customerData.customer.phone}`,
              status: 'Fail'
            });

            if (currentPath === '/v2' || currentPath === '/') {
              if (window?.dataLayer) {
                window.dataLayer.push({
                  event: Tracking_Dashboard.click_enter_search_by_text,
                  source_page: 'dashboard',
                  user_id: customerData?.customer?.id,
                  destination_page:
                    dashboardResultPageData.searchType === 'normal'
                      ? Tracking_Dashboard_Destination_Page.search_form_results
                      : Tracking_Dashboard_Destination_Page.bid_to_buy,
                  stone_count: 0,
                  search_result: 'fail'
                });
              }
            }
            if (
              _e?.status === statusCode.NOT_FOUND ||
              _e?.status === statusCode.INVALID_DATA
            ) {
              setError(`We couldn't find any results for this search`);
            } else if (_e?.status === statusCode.UNAUTHORIZED) {
              setError(_e?.data?.message?.message);
            } else {
              setError('Something went wrong');
            }
          });
      } else {
        router.push(Routes.NEW_ARRIVAL);
        dispatch(
          dashboardResultPage({
            isNewArrival: !dashboardResultPageData.isNewArrival
          })
        );
        setIsLoading(false);
      }
    } else {
      setError('Please enter stone id or certificate number');
    }
  };

  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  useEffect(() => {
    const fetchMyAPI = async () => {
      const data = localStorage.getItem('show-nudge');

      if (data === 'MINI') {
        setShowNudge(data);
      }
    };

    fetchMyAPI();
  }, [localStorage.getItem('show-nudge')]);

  const updatePhoto: any = useAppSelector((store: any) => store.profileUpdate);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUserAccountInfo(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    setImageUrl('');
  }, [updatePhoto?.deleteStatus]);

  useEffect(() => {
    const getPhoto = async () => {
      await triggerGetProfilePhoto({ size: 32 })
        .unwrap()
        .then((res: any) => {
          setImageUrl(res);
          setIsImageApiLoaded(true);
        })
        .catch(e => {
          setIsImageApiLoaded(true);
        });
    };
    getPhoto();
  }, [updatePhoto?.status]);

  const handleLogoutAll = () => {
    triggerLogoutAll({})
      .then(_res => {
        userLoggedOut();
        setIsLogout(false);
        router.push('/v2/login');
      })
      .catch(_err => console.log('error'));
  };

  const handleNotifySales = () => {
    notifySales({})
      .unwrap()
      .then(res => {
        setIsNotified(true);

        setIsDialogOpen(true);

        setModalContent(
          <CommonPoppup
            status="success"
            content={
              'Your request has been successfully submitted. Our sales team will review your account details and activate it shortly. You will be notified once the activation is complete'
            }
            customPoppupBodyStyle="!mt-[70px]"
            header={'Thank You for Notifying Sales!'}
            actionButtonData={[
              {
                variant: 'primary',
                label: 'Okay',
                handler: () => {
                  setIsDialogOpen(false);
                  setModalContent(<></>);
                },
                customStyle: 'flex-1 w-full'
              }
            ]}
          />
        );
      })
      .catch(e => {});
  };

  const handleLogout = () => {
    triggerLogout({})
      .then(_res => {
        userLoggedOut();
        router.push('/v2/login');
        setIsLogout(false);
      })
      .catch(_err => console.log('error'));
  };

  // const getInitials = (obj: any, path: string) => {
  //   const name = get(obj, path, ''); // Get the name string or default to an empty string
  //   return (
  //     name
  //       ?.split(' ') // Split the name into words
  //       ?.map((word: any) => word[0]?.toUpperCase()) // Get the first letter of each word and uppercase it
  //       ?.join('') || ''
  //   ); // Join the initials or return an empty string
  // };
  const [inputWidth, setInputWidth] = useState(650); // Starting width, e.g., 450px.

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = window.scrollY;

      // Adjust search visibility based on scroll position
      if (scrollTop >= 50) {
        setIsSearchVisible(true);
      } else {
        setShowRadios(false);
        setIsSearchVisible(false);
      }

      // Dynamically adjust width
      const newWidth = Math.max(430, 650 - scrollTop); // Decrease width, but not below 398px.
      setInputWidth(newWidth);
    }, 1); // Debounce delay

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderSearchField = () => {
    return (
      <div className="relative ml-[74px] h-[40px] transition-all duration-300 ease-in-out">
        {/* Overlay Background */}
        {showRadios && (
          <div
            className="fixed inset-0 bg-[#101828] opacity-40 z-[100]"
            onClick={() => setShowRadios(false)} // Close overlay when clicking outside
          ></div>
        )}

        {showRadios && (
          <div
            style={{
              width:
                currentPath === '/v2'
                  ? isSearchVisible
                    ? `${inputWidth + 7}px`
                    : '' // Dynamic width applied here.
                  : '437px',
              transition: 'width 0.3s ease' // Smooth transition for width change.
            }}
            className="absolute bg-white  z-[100] h-[105px]  top-[-5px] right-[-3px] rounded-[4px]"
            onClick={() => setShowRadios(false)} // Close overlay when clicking outside
          ></div>
        )}

        <div
          className={`relative z-[110] flex flex-col items-start bg-neutral0 rounded-[4px] overflow-hidden border-[1px] border-primaryBorder  px-[12px] py-[5px]`}
          style={{
            width:
              currentPath === '/v2' || currentPath === '/'
                ? isSearchVisible
                  ? `${inputWidth}px`
                  : '' // Dynamic width applied here.
                : '430px',
            transition: 'width 0.3s ease', // Smooth transition for width change.
            boxShadow: 'var(--input-shadow) inset'
          }}
        >
          {/* Input Box */}
          <div className="relative flex w-full items-center ">
            <input
              className="pr-[77px] py-1 w-full text-neutral900 rounded-lg focus:outline-none"
              type="text"
              placeholder="Search by stone id or certificate number"
              onClick={() => {
                if (currentPath === '/v2' || currentPath === '/') {
                  window.dataLayer.push({
                    event: Tracking_Dashboard.click_search_by_text,
                    source_page: 'dashboard',
                    user_id: customerData?.customer?.id
                  });
                }
                setShowRadios(!showRadios);
              }} // Show radios on input click
              onChange={handleStoneId}
              onKeyDown={handleKeyDown}
              value={dashboardResultPageData.stoneId}
            />
            {dashboardResultPageData?.stoneId?.length ? (
              <>
                <div
                  className="absolute flex items-center right-[42px] cursor-pointer rounded-[4px]"
                  onClick={() => {
                    dispatch(
                      dashboardResultPage({
                        stoneId: '',
                        isNewArrival: !dashboardResultPageData.isNewArrival
                      })
                    );
                  }}
                >
                  <Image src={crossIcon} alt="crossIcon" className="mr-1" />
                  <hr className="h-[24px] w-[1px] bg-neutral200 border-0" />
                </div>
              </>
            ) : (
              ''
            )}

            <div
              className="absolute right-0 cursor-pointer rounded-[4px]"
              onClick={handleInputSearch}
            >
              <Image
                src={!showRadios ? searchIconWhite : searchIcon}
                alt="searchIcon"
              />
            </div>
          </div>
        </div>
        {/* Custom Radio Buttons */}
        {showRadios && (
          <>
            {/* Absolute Radio Buttons */}
            <div className="absolute left-0 w-full bg-white shadow-lg z-[110] rounded-b-[4px] px-1 py-[7px]">
              <div className="text-neutral400 text-sRegular pb-[4px]">
                Search From
              </div>
              <div className="flex gap-4">
                {radioOptions.map(option => (
                  <RadioButton
                    key={option.value}
                    radioMetaData={{
                      label: option.label,
                      value: option.value,
                      name: option.name,
                      checked:
                        dashboardResultPageData.searchType === option.value,
                      disabled: option.disable
                    }}
                    onChange={handleRadioChange}
                    customStyle={{
                      radio: '!text-mMedium !text-neutral900'
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const pushToDataLayer = (
    event: string,
    destinationPage: string | undefined
  ) => {
    if (window?.dataLayer) {
      window.dataLayer.push({
        event,
        source_page: 'dashboard',
        user_id: isKycVerified?.customer?.id,
        destination_page: destinationPage
      });
      sessionStorage.removeItem('source_page');
      sessionStorage.removeItem('is_side_navigation_bar');
    } else {
      console.error('DataLayer is not defined.');
    }
  };

  return (
    <div className="min-h-[60px] border-b-[1px] border-neutral200 sticky top-0 left-[116px] bg-neutral0 z-[55] flex flex-col justify-end w-[calc(100vw-85px)]">
      <DialogComponent
        dialogContent={modalContent}
        isOpens={isLogout || isDialogOpen}
      />
      {error !== '' && (
        <Toast show={error !== ''} message={error} isSuccess={false} />
      )}
      {showNudge === 'MINI' &&
        (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED) &&
        currentPath !== '/v2/kyc' &&
        v2Routes.includes(currentPath) && (
          <div
            className={`bg-infoSurface pr-[32px] flex justify-between px-[14px] py-[8px] transition ease-in-out duration-500 items-center ${
              showNudge === 'MINI' ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="flex">
              <div className="w-[84px]"></div>
              <div>
                <p className="text-neutral900 font-normal text-mRegular">
                  As a first-time account user, please complete your KYC to
                  access exclusive features and services.
                </p>
                <p className="text-neutral900 font-normal text-mRegular">
                  If you're an existing customer, kindly notify our sales team
                  for quicker account activation.
                </p>
              </div>
            </div>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label:
                    customerData?.customer?.notifySales !== 'Available' ||
                    isNotified
                      ? 'Notified Sales'
                      : 'Notify Sales',
                  handler: () => {
                    if (
                      window?.dataLayer &&
                      (currentPath === '/v2' || currentPath === '/')
                    ) {
                      pushToDataLayer(
                        Tracking_Dashboard.click_notify_sales,
                        undefined
                      );
                    }
                    handleNotifySales();
                  },
                  isDisable:
                    customerData?.customer?.notifySales !== 'Available' ||
                    isNotified,
                  customStyle: ''
                },
                {
                  variant: 'primary',
                  label: 'Complete KYC Now',
                  handler: () => {
                    localStorage.setItem(
                      'kyc_entryPoint',
                      Tracking_KYC_Entry_Point.KYC_Top_Button
                    ),
                      trackEvent({
                        action: Tracking_KYC.Click_KYC,
                        entry_point:
                          localStorage.getItem('kyc_entryPoint') || '',
                        category: 'KYC'
                      });
                    router.push('/v2/kyc');

                    if (
                      window?.dataLayer &&
                      (currentPath === '/v2' || currentPath === '/')
                    ) {
                      pushToDataLayer(
                        Tracking_Dashboard.click_complete_kyc,
                        Tracking_Dashboard_Destination_Page.kyc
                      );
                    }
                  },
                  customStyle: ''
                }
              ]}
            />
          </div>
        )}

      <div className="flex px-[32px] py-[10px] z-[55] justify-between items-center">
        {/* Left section (empty for now, but can add other content if needed) */}
        <div className="flex"></div>

        {/* Middle section (Search Field) */}
        <div className="flex-grow flex justify-center">
          {currentPath === '/v2'
            ? isSearchVisible && renderSearchField()
            : renderSearchField()}
        </div>
        <div className="flex gap-[16px] items-center justify-end ">
          <Popover>
            <PopoverTrigger
              className="flex justify-center"
              onClick={() => {
                if (
                  window?.dataLayer &&
                  (currentPath === '/v2' || currentPath === '/')
                ) {
                  pushToDataLayer(
                    Tracking_Dashboard.click_support_icon,
                    undefined
                  );
                }
              }}
            >
              <Image src={customerSupportSvg} alt="profile" />
            </PopoverTrigger>
            {/* Popover content with radio buttons */}
            <PopoverContent className="z-[999] relative h-[150px]">
              <div className="bg-neutral25 border-[1px] border-solid border-primaryBorder shadow-popupsShadow  rounded-[8px] relative top-[10px] right-[39%]">
                {/* Add the triangular tip above the card */}
                <div className="absolute w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-neutral200 top-[-10px] right-[15px] before:absolute before:content-[''] before:w-0 before:h-0 before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent before:border-b-[9px] before:border-b-white before:top-[2px] before:left-[-9px]"></div>{' '}
                <div className="flex items-center  px-[16px] py-[14px] gap-[8px]">
                  <Avatar className="bg-primaryMain flex items-center justify-center">
                    {userAccountInfo?.customer?.kam?.image ? (
                      <img
                        src={userAccountInfo?.customer?.kam?.image}
                        alt="profile"
                        className="w-[40px] h-[40px] rounded-full object-cover border-none"
                      />
                    ) : (
                      <p className="text-center text-mRegular text-neutral0 leading-[10]">
                        {`${
                          userAccountInfo?.customer?.kam?.kam_name
                            ?.split(' ') // Split the string into words
                            ?.map(word => word[0]?.toUpperCase()) // Get the first letter of each word and uppercase it
                            ?.join('') || ''
                        }
                     `}
                      </p>
                    )}
                  </Avatar>

                  <div>
                    <h1 className="text-lRegular font-regular text-neutral-900">
                      {' '}
                      {`${userAccountInfo?.customer?.kam?.kam_name ?? '-'}`}
                    </h1>
                    <p className="text-mRegular font-regular text-neutral-600">
                      {' '}
                      {userAccountInfo?.customer?.kam?.post ?? '-'}
                    </p>
                  </div>
                </div>
                <hr className="border-[1px] border-solid border-primaryBorder w-[80%] ml-[20px]" />
                <div
                  className={`flex items-center py-[5px]  px-[16px] gap-[2px]    ${
                    isInMaintenanceMode
                      ? 'cursor-not-allowed bg-neutral100'
                      : 'cursor-pointer hover:bg-slate-50'
                  }`}
                >
                  <PhoneSvg />
                  <p
                    className={`text-mRegular font-regular ${
                      isInMaintenanceMode
                        ? 'text-neutral400'
                        : 'text-neutral900'
                    }`}
                  >
                    {userAccountInfo?.customer?.kam?.phone ?? '-'}
                  </p>
                </div>
                <Link
                  className={`flex items-center py-[5px]  px-[16px] gap-[2px]    ${
                    isInMaintenanceMode
                      ? 'cursor-not-allowed bg-neutral100'
                      : 'cursor-pointer hover:bg-slate-50'
                  }`}
                  href={`https://wa.me/${
                    userAccountInfo?.customer?.kam?.phone?.replace(
                      /\s+/g,
                      ''
                    ) || ''
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsappSvg />
                  <p
                    className={`text-mRegular font-regular ${
                      isInMaintenanceMode
                        ? 'text-neutral400'
                        : 'text-neutral900'
                    }`}
                  >
                    {userAccountInfo?.customer?.kam?.phone ?? '-'}
                  </p>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
          <Notification
            isInMaintenanceMode={isInMaintenanceMode}
            pushToDataLayer={pushToDataLayer}
          />

          <Popover>
            <PopoverTrigger
              className="flex justify-center"
              onClick={() => {
                if (
                  window?.dataLayer &&
                  (currentPath === '/v2' || currentPath === '/')
                ) {
                  pushToDataLayer(
                    Tracking_Dashboard.click_top_right_navigation,
                    undefined
                  );
                }
              }}
            >
              {isImageApiLoaded ? (
                <Avatar
                  className={`${
                    imageUrl.length <= 0 && 'bg-primaryMain'
                  } flex items-center justify-center`}
                >
                  {imageUrl?.length ? (
                    <img
                      src={imageUrl}
                      alt="profile"
                      className="w-[40px] h-[40px] rounded-full object-cover border-none"
                    />
                  ) : (
                    <p className="text-center text-mRegular text-neutral0">
                      {`${userAccountInfo?.customer?.first_name
                        ?.charAt(0)
                        .toUpperCase()}${userAccountInfo?.customer?.last_name
                        ?.charAt(0)
                        .toUpperCase()}`}
                    </p>
                  )}
                </Avatar>
              ) : (
                <Skeleton
                  width={40}
                  sx={{ bgcolor: 'var(--neutral-200)' }}
                  height={40}
                  variant="rectangular"
                  animation="wave"
                  className="rounded-[50%]"
                />
              )}
            </PopoverTrigger>
            {/* Popover content with radio buttons */}
            <PopoverContent className="z-[999]">
              <div className="bg-neutral25 border-[1px] border-solid border-primaryBorder shadow-popupsShadow  rounded-[8px] relative top-[5px] right-[13%]">
                <div className="flex items-center border-b-[1px] border-solid border-primaryBorder p-[16px] gap-[8px]">
                  <Avatar className="bg-primaryMain flex items-center justify-center">
                    {imageUrl.length ? (
                      <img
                        src={imageUrl}
                        alt="profile"
                        className="w-[40px] h-[40px] rounded-full object-cover border-none"
                      />
                    ) : (
                      <p className="text-center text-mRegular text-neutral0">
                        {`${userAccountInfo?.customer?.first_name
                          ?.charAt(0)
                          .toUpperCase()}${userAccountInfo?.customer?.last_name
                          ?.charAt(0)
                          .toUpperCase()}`}
                      </p>
                    )}
                  </Avatar>
                  <div>
                    <h1 className="text-lRegular font-regular text-neutral-900">
                      {' '}
                      {`${userAccountInfo?.customer?.first_name} ${userAccountInfo?.customer?.last_name}`}
                    </h1>
                    <p className="text-mRegular font-regular text-neutral-600">
                      {' '}
                      {userAccountInfo?.customer?.email ?? '-'}
                    </p>
                  </div>
                </div>

                <Link
                  className={`flex items-center border-b-[1px] border-solid border-primaryBorder p-[16px] gap-[8px]    ${
                    isInMaintenanceMode
                      ? 'cursor-not-allowed bg-neutral100'
                      : 'cursor-pointer hover:bg-slate-50'
                  }`}
                  onClick={() => {
                    dispatch(
                      dashboardResultPage({
                        isResultPage: false,
                        resultPageData: {
                          foundKeywords: [],
                          foundProducts: [],
                          notFoundKeywords: []
                        },
                        stoneId: '',
                        columnData: [],
                        searchType: 'normal',
                        textSearchReportId: null
                      })
                    );
                    if (
                      !isInMaintenanceMode &&
                      window?.dataLayer &&
                      (currentPath === '/v2' || currentPath === '/')
                    ) {
                      pushToDataLayer(
                        Tracking_Dashboard.click_on_my_account,
                        Tracking_Dashboard_Destination_Page.my_account
                      );
                    }
                    localStorage.removeItem('bid');
                    dispatch(filterFunction({}));
                  }}
                  href={isInMaintenanceMode ? '' : '/v2/my-account'}
                >
                  <MyAccountIcon
                    className={`${
                      isInMaintenanceMode
                        ? 'stroke-neutral400'
                        : 'stroke-neutral900'
                    }`}
                  />
                  <p
                    className={`text-mRegular font-regular ${
                      isInMaintenanceMode
                        ? 'text-neutral400'
                        : 'text-neutral900'
                    }`}
                  >
                    {' '}
                    My Account
                  </p>
                </Link>
                <button
                  className="flex w-full items-center border-b-[1px] border-solid border-primaryBorder p-[16px] gap-[8px] cursor-pointer hover:bg-slate-50 "
                  onClick={() => {
                    setIsLogout(true);
                    setModalContent(
                      <>
                        <div className="absolute left-[-84px] top-[-84px]">
                          <Image
                            src={logoutConfirmIcon}
                            alt="logoutConfirmIcon"
                          />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setIsLogout(false);
                          }}
                        >
                          {' '}
                          <Image
                            src={crossIcon}
                            alt="crossIcon"
                            className="absolute left-[360px] top-[15px]"
                          />
                        </div>

                        <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                          <h1 className="text-headingS text-neutral900 !font-medium	">
                            Do you want to log out from all devices?
                          </h1>
                          <ActionButton
                            actionButtonData={[
                              {
                                variant: 'secondary',
                                label: 'Log out this device',
                                handler: () => {
                                  if (
                                    window?.dataLayer &&
                                    (currentPath === '/v2' ||
                                      currentPath === '/')
                                  ) {
                                    pushToDataLayer(
                                      Tracking_Dashboard.click_on_logout,
                                      Tracking_Dashboard_Destination_Page.login
                                    );
                                  }
                                  dispatch(
                                    dashboardResultPage({
                                      isResultPage: false,
                                      resultPageData: {
                                        foundKeywords: [],
                                        foundProducts: [],
                                        notFoundKeywords: []
                                      },
                                      stoneId: '',
                                      columnData: [],
                                      searchType: 'normal',
                                      textSearchReportId: null
                                    })
                                  );
                                  localStorage.removeItem('bid');
                                  dispatch(filterFunction({}));
                                  handleLogout();
                                },
                                customStyle: 'flex-1 w-full h-10'
                              },
                              {
                                variant: 'primary',
                                label: 'Log out all devices',
                                handler: () => {
                                  if (
                                    window?.dataLayer &&
                                    (currentPath === '/v2' ||
                                      currentPath === '/')
                                  ) {
                                    pushToDataLayer(
                                      Tracking_Dashboard.click_on_logout,
                                      Tracking_Dashboard_Destination_Page.login
                                    );
                                  }
                                  dispatch(
                                    dashboardResultPage({
                                      isResultPage: false,
                                      resultPageData: {
                                        foundKeywords: [],
                                        foundProducts: [],
                                        notFoundKeywords: []
                                      },
                                      stoneId: '',
                                      columnData: [],
                                      searchType: 'normal',
                                      textSearchReportId: null
                                    })
                                  );
                                  localStorage.removeItem('bid');
                                  dispatch(filterFunction({}));
                                  handleLogoutAll();
                                },
                                customStyle: 'flex-1 w-full h-10'
                              }
                            ]}
                          />
                        </div>
                      </>
                    );
                  }}
                >
                  <Image src={logoutIcon} alt="logoutIcon" />
                  <p className="text-mRegular font-regular text-neutral-900">
                    {' '}
                    Logout
                  </p>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default TopNavigationBar;
