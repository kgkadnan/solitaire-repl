'use client';
import { DiamondDetailsComponent } from '@/components/v2/common/detail-page';
import GemTracPage from '@/components/v2/common/gem-trac';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyGetGemTracQuery } from '@/features/api/gem-trac';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import {
  useGetBidHistoryQuery,
  useGetCustomerQuery
} from '@/features/api/dashboard';
import useUser from '@/lib/use-auth';
import { SocketManager, useSocket } from '@/hooks/v2/socket-manager';
import CommonPoppup from '../login/component/common-poppup';
import pako from 'pako';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MatchRoutes, Routes, SubRoutes } from '@/constants/v2/enums/routes';
import {
  useConfirmProductMutation,
  useFetchProductByIdsMutation
} from '@/features/api/product';
import { statusCode } from '@/constants/enums/status-code';
import { Skeleton } from '@mui/material';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { handleConfirmStone } from '../search/result/helpers/handle-confirm-stone';
import { IManageListingSequenceResponse, IProduct } from '../search/interface';
import { useAddCartMutation } from '@/features/api/cart';
import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import {
  useCheckProductAvailabilityMutation,
  useLazyGetAllProductQuery
} from '@/features/api/product';
import { notificationBadge } from '@/features/notification/notification-slice';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { DialogComponent } from '@/components/v2/common/dialog';
import ConfirmStone from '../search/result/components';
import { useLazyGetManageListingSequenceQuery } from '@/features/api/manage-listing-sequence';
import { MRT_RowSelectionState, MRT_SortingState } from 'material-react-table';

import { trackEvent } from '@/utils/ga';
import { Tracking_Search_By_Text } from '@/constants/funnel-tracking';
import { STONE_LOCATION } from '@/constants/v2/enums/location';
import { setConfirmStoneTrack } from '@/features/confirm-stone-track/confirm-stone-track-slice';
import { kamLocationAction } from '@/features/kam-location/kam-location';
import ImageModal from '@/components/v2/common/detail-page/components/image-modal';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import { AddCommentDialog } from '@/components/v2/common/comment-dialog';
import Image from 'next/image';
import crossIcon from '@public/v2/assets/icons/modal/cross.svg';
import { handleComment } from '../search/result/helpers/handle-comment';
import { MatchPairDetails } from '../matching-pair/components/details';
import { NOT_MORE_THAN_300 } from '@/constants/error-messages/search';
import { NO_STONES_SELECTED } from '@/constants/error-messages/cart';
import { IN_TRANSIT, PAST, PENDING } from '@/constants/business-logic';
export default function page() {
  const router = useRouter();
  const mainPathName = usePathname(); // Get the current path (excluding query params)
  const lot_id_with_Location = useSearchParams().get('stoneid');
  const path = useSearchParams().get('path');
  const activeTabPath: any = useSearchParams().get('activeTab');
  const { authToken } = useUser();
  const [activeTab, setActiveTab] = useState(0);
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);
  useEffect(() => {
    if (!isKycVerified) {
      let activeTabData =
        !!activeTabPath && path == MatchRoutes.YOUR_ORDERS
          ? `&activeTab=${activeTabPath}`
          : '';
      const redirectUrl = `${mainPathName}?path=${path}${activeTabData}&stoneid=${lot_id_with_Location}`;
      localStorage.setItem('redirectUrl', redirectUrl);
    } else {
      setActiveTab(parseInt(activeTabPath));
    }
  }, []);
  useEffect(() => {
    if (authToken) {
      useSocket(socketManager, authToken);
    }
  }, [authToken]);
  const [similarData, setSimilarData] = useState<any>();
  const [activePreviewTab, setActivePreviewTab] = useState('Image');
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [detailPageData, setDetailPageData] = useState<any>({});
  const [isGemTrac, setIsGemTrac] = useState(false);
  const [isMatchpair, setIsMatchpair] = useState(false);
  const [gemTracData, setGemTracData] = useState([]);
  const [triggerGemTracApi] = useLazyGetGemTracQuery({});
  const { modalState, modalSetState } = useModalStateManagement();
  const [isLoading, setIsLoading] = useState(false);
  const [bid, setBid] = useState<any>();
  const [searchData, setSearchData] = useState([]);
  const [activeBid, setActiveBid] = useState<any>();
  const { data: bidHistory } = useGetBidHistoryQuery({});

  const [fetchProductByIds] = useFetchProductByIdsMutation();
  const socketManager = useMemo(() => new SocketManager(), []);
  const [error, setError] = useState('');
  const [breadCrumLabel, setBreadCrumLabel] = useState('');
  const [isDiamondDetailLoading, setIsDiamondDetailLoading] = useState(false);
  const [isConfirmStone, setIsConfirmStone] = useState(false);
  const [confirmStoneData, setConfirmStoneData] = useState<IProduct[]>([]);
  const { isDialogOpen, dialogContent } = modalState;
  const [confirmProduct] = useConfirmProductMutation();
  const [isResultPageDetails, setIsResultPageDetails] = useState(false);
  const [validImages, setValidImages] = useState<any>([]);
  const [searchColumn, setSearchColumn] = useState<any>();
  const [triggerColumn, { data: columnData }] =
    useLazyGetManageListingSequenceQuery<IManageListingSequenceResponse>();
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
  const [isCompareStone, setIsCompareStone] = useState(false);
  const [customerMobileNumber, setCustomerMobileNumber] = useState('');
  const [showAddToCartButton, setShowAddToCartButton] = useState(false);
  const [showConfirmStoneButton, setShowConfirmStoneButton] = useState(false);

  useEffect(() => {
    const fetchColumns = async () => {
      const response = await triggerColumn({});
    };

    fetchColumns();
  }, []);

  useEffect(() => {
    if (path === MatchRoutes.NEW_ARRIVAL) {
      const handleRequestGetBidStones = (_data: any) => {
        socketManager.emit('get_bid_stones');
      };
      socketManager.on('bid_stones', handleBidStones);
      socketManager.on('error', handleError);
      socketManager.on('request_get_bid_stones', handleRequestGetBidStones);
      // Return a cleanup function to remove the listeners
      return () => {
        socketManager.off('bid_stones', handleBidStones);
        socketManager.off('error', handleError);
        socketManager.off('request_get_bid_stones', handleRequestGetBidStones);
      };
    }
  }, [socketManager, authToken]);

  useEffect(() => {
    if (path !== MatchRoutes.NEW_ARRIVAL) {
      let stonesData: any = lot_id_with_Location?.split(',');
      const stoneIds = stonesData?.map((item: any) => item?.split('-')[0]);
      setIsLoading(true);
      fetchProductByIds({
        stones: stoneIds
      })
        .unwrap()
        .then((res: any) => {
          setIsLoading(false);
          setError('');
          const searchData: any = Array.isArray(res?.products)
            ? res?.products
            : [];
          const filteredData = searchData.filter(
            (item: any) =>
              stoneIds.includes(item?.lot_id) &&
              stonesData.some((stone: any) =>
                stone.includes(
                  item?.lot_id?.toString() + '-' + item?.location?.toString()
                )
              )
          );
          setBid(filteredData);
          setSearchData(filteredData);
          setDetailPageData(filteredData[0]);
          setIsDetailPage(true);
          if (path == MatchRoutes.MATCHING_PAIR) {
            let matchPairData: any = [];
            matchPairData.push(filteredData);
            setSearchData(matchPairData);
            setIsMatchpair(true);
          }
        })
        .catch((_e: any) => {
          setIsLoading(false);
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
    }
  }, []);

  useEffect(() => {
    const breadCrumLabelPath =
      path == MatchRoutes.NEW_ARRIVAL
        ? 'New Arrival'
        : path == MatchRoutes.BID_TO_BUY
        ? 'Bid to Buy'
        : path == MatchRoutes.MY_CART
        ? 'My Cart'
        : path == MatchRoutes.MATCHING_PAIR
        ? 'Match Pair'
        : 'Search Results';
    setBreadCrumLabel(breadCrumLabelPath);
    if (path == MatchRoutes.MY_CART) {
      //setIsDiamondDetailLoading(true);
      setShowConfirmStoneButton(true);
    }
    if (path == MatchRoutes.SEARCH || path == MatchRoutes.DASHBOARD) {
      setIsDiamondDetailLoading(true);
      setShowAddToCartButton(true);
      setShowConfirmStoneButton(true);
    }
  }, []);

  useEffect(() => {
    if (customerData) {
      setCustomerMobileNumber(
        `+${customerData.customer.country_code}${customerData.customer.phone}`
      );
    }
  }, []);
  const confirmTrack = useAppSelector(state => state.setConfirmStoneTrack);
  const receivedPartsMapBidToBuy: any = {};
  const totalPartsMapBidToBuy: any = {};
  const handleBidStones = useCallback(
    async ({ part, total_parts, message_id, data }: any) => {
      try {
        const decompressedPart = await decompressData(data);
        if (!receivedPartsMapBidToBuy[message_id]) {
          receivedPartsMapBidToBuy[message_id] = [];
          totalPartsMapBidToBuy[message_id] = total_parts;
        }
        receivedPartsMapBidToBuy[message_id].push(decompressedPart);
        if (part === total_parts) {
          const allProducts = await mergeParts(
            receivedPartsMapBidToBuy[message_id]
          );

          // Optionally update UI or process allProducts here
          let productData = [
            ...allProducts.bidStone,
            ...allProducts.activeStone
          ];
          let stonesData: any = lot_id_with_Location?.split('-');
          let filteredData = productData.filter(
            (x: any) => x.lot_id == stonesData[0] && x.location == stonesData[1]
          );
          setBid(productData);
          setDetailPageData(filteredData[0]);
          setIsDetailPage(true);
        }
      } catch (error) {
        console.error(
          `Failed to decompress part ${part} of message ${message_id}:`,
          error
        );
      }
    },
    []
  );
  async function decompressData<T = unknown>(
    compressedData: Uint8Array | ArrayBuffer | any
  ): Promise<T> {
    try {
      // Ensure compressedData is a Uint8Array
      const uint8Array: Uint8Array =
        compressedData instanceof Uint8Array
          ? compressedData
          : new Uint8Array(compressedData);

      // Decompress the data using pako
      const decompressed: string = await new Promise<string>(
        (resolve, reject) => {
          try {
            const result = pako.ungzip(uint8Array, { to: 'string' });
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      );

      // Parse the decompressed string into JSON
      const data: T = JSON.parse(decompressed);
      return data;
    } catch (err: unknown) {
      // Ensure we have proper type checking for error
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Decompression failed: ${errorMessage}`);
      throw err;
    }
  }
  type Part = {
    endTime: string | null;
    bidStone: any[]; // Use the actual type if you know it
    activeStone: any[]; // Use the actual type if you know it
  };
  async function mergeParts(parts: Part[]) {
    const mergedProductData = {
      endTime: parts[0]?.endTime ?? null,
      bidStone: [] as any[], // Define the type of bidStone properly
      activeStone: [] as any[] // Define the type of activeStone properly
    };
    for (const part of parts) {
      mergedProductData.bidStone.push(...(part.bidStone ?? []));
      part.activeStone.length &&
        mergedProductData.activeStone.push(...(part.activeStone ?? []));
    }

    return mergedProductData;
  }
  const goBack = () => {
    setIsDetailPage(false);
    setDetailPageData({});
    let queryPath = '';
    if (path == MatchRoutes.SEARCH || path == MatchRoutes.MATCHING_PAIR) {
      queryPath = !!activeTab
        ? path + '?active-tab=' + SubRoutes.RESULT + '-' + activeTab
        : path + '?active-tab=new-search';
    }
    const routePath =
      path == MatchRoutes.SEARCH || path == MatchRoutes.MATCHING_PAIR
        ? queryPath
        : path;
    if (path == MatchRoutes.DASHBOARD) {
      router.push(`/v2`);
    } else {
      router.push(`/v2/${routePath}`);
    }
    setConfirmStoneData([]);
  };
  const goBackToListView = (isFrom?: string) => {
    // if (isFrom === 'Detail Page') {
    //   setIsDiamondDetail(true);
    //   setBreadCrumLabel('');
    // }
    setRowSelection({});
    setIsDetailPage(true);

    setIsConfirmStone(false);
    setConfirmStoneData([]);

    const breadCrumLabelPath =
      path == MatchRoutes.NEW_ARRIVAL
        ? 'New Arrival'
        : path == MatchRoutes.BID_TO_BUY
        ? 'Bid to Buy'
        : path == MatchRoutes.MY_CART
        ? 'My Cart'
        : path == MatchRoutes.MATCHING_PAIR
        ? 'Match Pair'
        : 'Search Results';
    setBreadCrumLabel(breadCrumLabelPath);
    if (path == MatchRoutes.MY_CART) {
      setIsDiamondDetailLoading(true);
      setShowConfirmStoneButton(true);
    } else if (path == MatchRoutes.SEARCH || path == MatchRoutes.DASHBOARD) {
      setIsDiamondDetailLoading(true);
      setShowAddToCartButton(true);
      setShowConfirmStoneButton(true);
    } else if (path == MatchRoutes.MATCHING_PAIR) {
      setIsDiamondDetailLoading(true);
    }
  };
  const handleError = useCallback((data: any) => {
    if (data) {
      modalSetState.setIsDialogOpen(true);
      modalSetState.setDialogContent(
        <CommonPoppup
          content=""
          header={data}
          handleClick={() => modalSetState.setIsDialogOpen(false)}
          buttonText="Okay"
        />
      );
      // setIsLoading(false)
    }
  }, []);
  const handleDetailPage = ({ row }: { row: any }) => {
    if (isConfirmStone) {
      setBreadCrumLabel('Confirm Stone');
    }

    setIsDetailPage(true);
    setIsError(false);
    setError('');
    setDetailPageData(row);

    trackEvent({
      action: Tracking_Search_By_Text.click_stone_dna_page,
      category: 'SearchByText',
      mobile_number: customerMobileNumber
    });
  };
  // useEffect(() => {
  //   isError &&
  //     setTimeout(() => {
  //       setIsError(false); // Hide the toast notification after some time
  //     }, 4000);
  // }, [isError]);
  const [addCart] = useAddCartMutation();
  const [isAddCommentDialogOpen, setIsAddCommentDialogOpen] = useState(false);
  const { setIsDialogOpen, setDialogContent } = modalSetState;
  const { errorState, errorSetState } = useErrorStateManagement();
  const { setIsError, setErrorText } = errorSetState;
  const { isError, errorText } = errorState;
  const [searchUrl, setSearchUrl] = useState('');
  const dispatch = useAppDispatch();
  const [triggerProductApi, { data: productData }] =
    useLazyGetAllProductQuery();
  const [commentValue, setCommentValue] = useState('');
  const [checkProductAvailability] = useCheckProductAvailabilityMutation({});
  const [detailImageData, setDetailImageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: customerData } = useGetCustomerQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const handleAddToCartDetailPage = () => {
    setIsLoading(true);
    // Extract variant IDs for selected stones
    const variantIds = [detailPageData?.id]
      ?.map((_id: string) => {
        if (detailPageData && 'variants' in detailPageData) {
          return detailPageData.variants[0]?.id;
        }
        return '';
      })
      ?.filter(Boolean);
    // If there are variant IDs, add to the cart
    if (variantIds.length) {
      trackEvent({
        action: Tracking_Search_By_Text.click_add_to_cart_dna_page,
        category: 'SearchByText',
        mobile_number: customerMobileNumber
      });
      addCart({
        variants: variantIds
      })
        .unwrap()
        .then((res: any) => {
          setIsLoading(false);
          setIsDialogOpen(true);
          setDialogContent(
            <CommonPoppup
              content=""
              status="success"
              customPoppupBodyStyle="mt-[70px]"
              header={res?.message}
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.modal.continue'),
                  handler: () => {
                    setIsDialogOpen(false);
                    setIsDetailPage(true);
                    // setSearchData({});
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
          setError('');
        })
        .catch((error: any) => {
          // On error, set error state and error message
          setIsLoading(false);
          setIsDialogOpen(true);
          setDialogContent(
            <CommonPoppup
              content=""
              customPoppupBodyStyle="mt-[70px]"
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
    }
  };

  const handleDetailImage = ({ row }: any) => {
    setDetailImageData(row);
    setIsModalOpen(true);
  };
  const handleDetailImageWithTrack = ({ row }: any) => {
    trackEvent({
      action: Tracking_Search_By_Text.click_stone_assets_result_page,
      category: 'SearchByText',
      mobile_number: customerMobileNumber
    });
    setIsResultPageDetails(true);
    setDetailImageData(row);
    setIsModalOpen(true);
  };

  const confirmStoneApiCall = ({ variantIds }: { variantIds: string[] }) => {
    if (variantIds.length) {
      setIsLoading(true);
      confirmProduct({
        variants: variantIds,
        comments: commentValue,
        identifier: confirmTrack.confirmStoneTrack
          ? confirmTrack.confirmStoneTrack
          : 'Dashboard'
      })
        .unwrap()
        .then(res => {
          if (res) {
            setIsLoading(false);
            dispatch(setConfirmStoneTrack(''));

            setCommentValue('');
            setIsDialogOpen(true);
            const formatMessage = (message: string) => {
              return message.split('\n').map((line: string, index: number) => (
                <span key={index}>
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                  <br />
                </span>
              ));
            };

            trackEvent({
              action: Tracking_Search_By_Text.order_executed_pop_up,
              category: 'SearchByText',
              mobile_number: customerMobileNumber,
              status:
                res.status === 'success'
                  ? 'Success'
                  : res.status === 'processing'
                  ? 'Processing'
                  : ''
            });

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
                      trackEvent({
                        action:
                          Tracking_Search_By_Text.click_continue_order_executed_pop_up,
                        category: 'SearchByText',
                        mobile_number: customerMobileNumber
                      });
                      goBackToListView();
                      setIsDetailPage(false);
                      setRowSelection({});
                      setError('');
                      setIsAddCommentDialogOpen(false);
                      setIsDialogOpen(false);
                      router.push('/v2');
                    },
                    customStyle: 'flex-1 w-full h-10'
                  },
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.goToYourOrder'),
                    handler: () => {
                      trackEvent({
                        action:
                          Tracking_Search_By_Text.click_go_to_your_order_order_executed_pop_up,
                        category: 'SearchByText',
                        mobile_number: customerMobileNumber
                      });
                      router.push('/v2/your-orders');
                    },
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            );
            setCommentValue('');
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
                content="To confirm a stone or make a purchase, KYC verification is
                  mandatory. Without verification, access to certain
                  features is restricted."
                customPoppupStyle="!h-[220px]"
                customPoppupBodyStyle="!mt-[62px]"
                header={'Important KYC Verification Required!'}
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
                content={''}
                customPoppupBodyStyle="mt-[70px]"
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
      trackEvent({
        action: Tracking_Search_By_Text.disclaimer_pop_up_opens,
        category: 'SearchByText',
        mobile_number: customerMobileNumber
      });
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
                trackEvent({
                  action:
                    Tracking_Search_By_Text.click_confirm_order_disclaimer_pop_up,
                  category: 'SearchByText',
                  mobile_number: customerMobileNumber
                });
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

    trackEvent({
      action: Tracking_Search_By_Text.click_confirm_stone_confirm_page,
      category: 'SearchByText',
      mobile_number: customerMobileNumber
    });

    confirmStoneData.forEach((ids: any) => {
      variantIds.push(ids.variants[0].id);
    });

    checkLocation({
      kamLocation: customerData.customer.kam.location,
      variantIds
    });
    dispatch(kamLocationAction(customerData.customer.kam.location));
  };
  const isIProduct = (obj: any): obj is IProduct => {
    return 'variants' in obj && Array.isArray(obj.variants);
  };
  const handleAddToCart = (similarData = []) => {
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
            [...searchData[0], ...similarData].find((row: IProduct) => {
              return row?.id === id;
            }) ?? {};
          if (isIProduct(myCartCheck)) {
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
  const [textAreaValue, setTextAreaValue] = useState('');
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
                  setIsAddCommentDialogOpen(false), confirmStone();
                },

                customStyle: 'flex-1'
              }
            ]}
          />
        </div>
      </>
    );
  };
  return (
    <>
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}
      {error !== '' && (
        <Toast show={error !== ''} message={error} isSuccess={false} />
      )}

      <ImageModal
        setIsLoading={setIsLoading}
        isOpen={isModalOpen}
        stockNumber={detailImageData?.lot_id ?? ''}
        trackIdentifier={isResultPageDetails ? 'resultPageDetails' : ''}
        customerMobileNumber={customerMobileNumber}
        onClose={() => {
          setValidImages([]);
          setDetailImageData({});
          setIsModalOpen(!isModalOpen);
          setIsResultPageDetails(false);
        }}
        images={validImages}
        activeTab={activePreviewTab}
        selectedImageIndex={imageIndex}
      />
      <DialogComponent dialogContent={dialogContent} isOpens={isDialogOpen} />
      {isLoading && <CustomKGKLoader />}
      <AddCommentDialog
        isOpen={isAddCommentDialogOpen}
        onClose={() => setIsAddCommentDialogOpen(false)}
        renderContent={renderAddCommentDialogs}
      />
      {isDetailPage ? (
        <div className="mt-[16px]">
          {!!activeTabPath ? (
            <div className="flex  py-[8px] items-center">
              <p className="text-lMedium font-medium text-neutral900">
                {activeTabPath === PENDING
                  ? ManageLocales('app.yourOrder.header.pendingInvoiceDetails')
                  : activeTabPath === IN_TRANSIT
                  ? ManageLocales('app.yourOrder.header.activeInvoiceDetails')
                  : activeTabPath === PAST &&
                    ManageLocales('app.yourOrder.header.pastInvoicesDetails')}
              </p>
            </div>
          ) : (
            ''
          )}
          {isGemTrac ? (
            <GemTracPage
              breadCrumLabel={breadCrumLabel}
              setIsGemTrac={setIsGemTrac}
              setGemTracData={setGemTracData}
              gemTracData={gemTracData}
              goBackToListView={goBack}
            />
          ) : isMatchpair ? (
            <>
              <MatchPairDetails
                data={searchData}
                filterData={detailPageData}
                goBackToListView={goBack}
                breadCrumLabel={
                  breadCrumLabel.length ? breadCrumLabel : 'Match Pair'
                }
                modalSetState={modalSetState}
                setIsLoading={setIsLoading}
                handleDetailImage={handleDetailImage}
                setRowSelection={setRowSelection}
                setSimilarData={setSimilarData}
                similarData={similarData}
                rowSelection={rowSelection}
                setActivePreviewTab={setActivePreviewTab}
                activePreviewTab={activePreviewTab}
                setImageIndex={setImageIndex}
                imageIndex={imageIndex}
                setIsDiamondDetailLoading={setIsDiamondDetailLoading}
                activeTab={activeTab}
                setIsGemTrac={setIsGemTrac}
                setGemTracData={setGemTracData}
                triggerGemTracApi={triggerGemTracApi}
              />
              <div className="p-[8px] flex justify-between items-center border-t-[1px] border-l-[1px] border-neutral-200 gap-3 rounded-b-[8px] shadow-inputShadow mb-1">
                <div className="flex gap-4 h-[30px]">
                  {isDiamondDetailLoading ? (
                    <>
                      {' '}
                      <Skeleton
                        width={60}
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                        height={30}
                        variant="rectangular"
                        animation="wave"
                        className="rounded-[4px]"
                      />{' '}
                      <Skeleton
                        width={60}
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                        height={30}
                        variant="rectangular"
                        animation="wave"
                        className="rounded-[4px]"
                      />
                      <Skeleton
                        width={60}
                        sx={{ bgcolor: 'var(--neutral-200)' }}
                        height={30}
                        variant="rectangular"
                        animation="wave"
                        className="rounded-[4px]"
                      />
                    </>
                  ) : (
                    <>
                      <div className=" border-[1px] border-lengendInCardBorder rounded-[4px] bg-legendInCartFill text-legendInCart">
                        <p className="text-mMedium font-medium px-[6px] py-[4px]">
                          In Cart
                        </p>
                      </div>
                      <div className=" border-[1px] border-lengendHoldBorder rounded-[4px] bg-legendHoldFill text-legendHold">
                        <p className="text-mMedium font-medium px-[6px] py-[4px]">
                          {' '}
                          Hold
                        </p>
                      </div>
                      <div className="border-[1px] border-lengendMemoBorder rounded-[4px] bg-legendMemoFill text-legendMemo">
                        <p className="text-mMedium font-medium px-[6px] py-[4px]">
                          {' '}
                          Memo
                        </p>
                      </div>
                    </>
                  )}
                </div>
                {isDiamondDetailLoading ? (
                  <>
                    <div className="flex gap-3">
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
                    </div>
                  </>
                ) : (
                  <ActionButton
                    actionButtonData={[
                      {
                        variant: isConfirmStone ? 'primary' : 'secondary',
                        label: ManageLocales('app.searchResult.addToCart'),
                        handler: () => {
                          handleAddToCart(similarData?.products || []);
                        }
                      },

                      {
                        variant: 'primary',
                        label: ManageLocales('app.searchResult.confirmStone'),
                        isHidden: isConfirmStone,
                        handler: () => {
                          setBreadCrumLabel('Detail Page');

                          handleConfirmStone({
                            selectedRows: rowSelection,
                            rows: searchData[0],
                            setIsError,
                            setErrorText,
                            setIsConfirmStone,
                            setConfirmStoneData,
                            setIsDetailPage,
                            identifier: 'match-pair-detail',
                            confirmStoneTrack: 'Matching-Pair-Details',
                            dispatch,
                            router,
                            modalSetState,
                            checkProductAvailability,
                            setIsLoading
                            // refreshSearchResults
                          });
                        }
                      }
                    ]}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <DiamondDetailsComponent
                data={bid}
                identifier={path == MatchRoutes.DASHBOARD ? 'Dashboard' : ''}
                filterData={detailPageData}
                goBackToListView={goBack}
                handleDetailPage={handleDetailPage}
                fromBid={path == MatchRoutes.BID_TO_BUY ? true : false}
                breadCrumLabel={breadCrumLabel}
                modalSetState={modalSetState}
                setIsDiamondDetailLoading={setIsDiamondDetailLoading}
                customerMobileNumber={customerMobileNumber}
                setIsLoading={setIsLoading}
                activeTab={activeTab}
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
                ) : showAddToCartButton && showConfirmStoneButton ? (
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
                            rows: searchData,
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
                ) : showConfirmStoneButton ? (
                  <ActionButton
                    actionButtonData={[
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
                            rows: searchData,
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
                ) : (
                  ''
                )}
              </div>
            </>
          )}
        </div>
      ) : isConfirmStone ? (
        <div className="border-[1px] border-neutral200 rounded-[8px] shadow-inputShadow mt-[16px]">
          <ConfirmStone
            rows={confirmStoneData}
            columns={columnData}
            goBackToListView={goBackToListView}
            // activeTab={activeTab}
            isFrom={
              detailPageData?.length
                ? 'Detail Page'
                : isCompareStone
                ? 'Compare Stone'
                : 'Search Results'
            }
            handleDetailImage={handleDetailImage}
            handleDetailPage={handleDetailPage}
            identifier="Dashboard"
            customerMobileNumber={customerMobileNumber}
          />
          <div className="px-4 py-2">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.confirmStone.footer.back'),
                  handler: () => {
                    trackEvent({
                      action: Tracking_Search_By_Text.click_back_confirm_page,
                      category: 'SearchByText',
                      mobile_number: customerMobileNumber
                    });

                    goBackToListView(
                      detailPageData?.length
                        ? 'Detail Page'
                        : isCompareStone
                        ? 'Compare Stone'
                        : 'Dashboard'
                    );
                  }
                },

                {
                  variant: 'secondary',
                  label: ManageLocales('app.confirmStone.footer.addComment'),
                  handler: () => {
                    trackEvent({
                      action:
                        Tracking_Search_By_Text.click_add_comment_confirm_page,
                      category: 'SearchByText',
                      mobile_number: customerMobileNumber
                    });
                    setCommentValue('');
                    setIsAddCommentDialogOpen(true);
                  }
                },

                {
                  variant: 'primary',
                  label: ManageLocales('app.confirmStone.footer.confirmStone'),
                  handler: () => confirmStone()
                }
              ]}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
