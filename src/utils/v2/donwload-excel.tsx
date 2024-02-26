import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';
import warningIcon from '@public/v2/assets/icons/modal/warning.svg';
import { downloadExcelFromBase64 } from '../download-excel-from-base64';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '../v2/translate';
import errorIcon from '@public/v2/assets/icons/modal/error.svg';
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
}

export const downloadExcelHandler = async ({
  products,
  previousSearch,
  downloadExcelApi,
  modalSetState,
  setRowSelection,
  setIsError,
  orderId
}: IDownloadExcelFunctionProps) => {
  // Explicitly type res to include unwrap method
  downloadExcelApi({
    products: products,
    previous_searchs: previousSearch,
    order_id: orderId
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

            if (modalSetState.setDialogContent) {
              modalSetState.setDialogContent(
                <>
                  <div className="absolute left-[-84px] top-[-84px]">
                    <Image src={confirmIcon} alt="confirmIcon" />
                  </div>
                  <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                    <h1 className="text-headingS text-neutral900">
                      Download Excel Successfully
                    </h1>
                    <ActionButton
                      actionButtonData={[
                        {
                          variant: 'primary',
                          label: ManageLocales('app.modal.okay'),
                          handler: () => modalSetState.setIsDialogOpen(false),
                          customStyle: 'flex-1 w-full'
                        }
                      ]}
                    />
                  </div>
                </>
              );
            }
          }
        });
      }
    })
    .catch((error: any) => {
      if (modalSetState.setIsDialogOpen) modalSetState.setIsDialogOpen(true);
      if (modalSetState.setDialogContent) {
        if (error.data.type === 'not_allowed') {
          modalSetState.setDialogContent(
            <>
              {' '}
              <div className="absolute left-[-84px] top-[-84px]">
                <Image src={warningIcon} alt="warningIcon" />
              </div>
              <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                <div>
                  <h1 className="text-headingS text-neutral900">
                    {' '}
                    Maximum Download Limit
                  </h1>
                  <p className="text-neutral600 text-mRegular">
                    {error?.data?.message}
                  </p>
                </div>
                <ActionButton
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
              </div>
            </>
          );
        } else {
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
                      customStyle: 'flex-1 w-full'
                    }
                  ]}
                />
              </div>
            </>
          );
        }
      }
    });
};
