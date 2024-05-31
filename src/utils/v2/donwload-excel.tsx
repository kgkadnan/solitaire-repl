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
  fromNewArrivalBid?: boolean;
  fromNewArrivalBidHistory?: boolean;
  fromBidToBuyHistory?: boolean;
  fromBidToBuy?: boolean;
}

export const downloadExcelHandler = async ({
  products,
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
  fromBidToBuy
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
    from_bid_to_buy: fromBidToBuy
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
                  header={'Download Excel Successfully'}
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
        if (error.data.type === 'not_allowed') {
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
              header={error?.data?.message}
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
