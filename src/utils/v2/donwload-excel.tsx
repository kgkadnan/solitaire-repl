import { Dispatch, SetStateAction } from 'react';
import { downloadExcelFromBase64 } from '../download-excel-from-base64';
import { ManageLocales } from '../v2/translate';
import CommonPoppup from '@/app/v2/login/component/common-poppup';

interface IDownloadExcelApiResponse {
  fileName: string;
  data: string;
}

interface IDownloadExcelFunctionProps {
  products?: string[];
  previousSearch?: string[];
  downloadExcelApi: any;
  modalSetState: any;
  setRowSelection?: Dispatch<SetStateAction<{}>>;
  setIsError?: Dispatch<SetStateAction<boolean>>;
  orderId?: string;
  setIsLoading?: any;
  router: any;
  fromNewArrivalBid?: boolean;
  fromNewArrivalBidHistory?: boolean;
  fromBidToBuyHistory?: boolean;
  fromBidToBuy?: boolean;
  fromMatchingPair?: boolean;
  page?: string;
}

export const downloadExcelHandler = async ({
  products,
  router,
  previousSearch,
  downloadExcelApi,
  modalSetState,
  setRowSelection,
  setIsError,
  orderId,
  setIsLoading,
  fromNewArrivalBid,
  fromNewArrivalBidHistory,
  fromBidToBuyHistory,
  fromBidToBuy,
  fromMatchingPair,
  page
}: IDownloadExcelFunctionProps) => {
  setIsLoading(true);
  // Explicitly type res to include unwrap method
  downloadExcelApi({
    products: products,
    previous_searchs: previousSearch,
    order_id: orderId,
    from_new_arrival_bid: fromNewArrivalBid,
    from_new_arrival_bid_history: fromNewArrivalBidHistory,
    from_bid_to_buy_history: fromBidToBuyHistory,
    from_bid_to_buy: fromBidToBuy,
    from_matching_pair: fromMatchingPair,
    page: page
  })
    .unwrap()
    .then((res: IDownloadExcelApiResponse) => {
      const { data, fileName } = res;

      if (data && modalSetState.setDialogContent) {
        downloadExcelFromBase64(data, fileName, {
          onSave: () => {
            // Handle any post-download actions here
            if (modalSetState.setIsDialogOpen)
              modalSetState.setIsDialogOpen(true);
            if (setRowSelection) setRowSelection({});
            if (setIsError) setIsError(false);
            setIsLoading(false);
            if (modalSetState.setDialogContent) {
              modalSetState.setDialogContent(
                <CommonPoppup
                  content={''}
                  status="success"
                  customPoppupBodyStyle="!mt-[70px]"
                  header={'Excel Downloaded Successfully'}
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
