import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';
import warningIcon from '@public/v2/assets/icons/modal/warning.svg';
import { downloadExcelFromBase64 } from '../download-excel-from-base64';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '../v2/translate';
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
}

export const downloadExcelHandler = async ({
  products,
  previousSearch,
  downloadExcelApi,
  modalSetState,
  setRowSelection,
  setIsError
}: IDownloadExcelFunctionProps) => {
  // Explicitly type res to include unwrap method
  downloadExcelApi({
    products: products,
    previous_searchs: previousSearch
  })
    .unwrap()
    .then((res: IDownloadExcelApiResponse) => {
      const { data, fileName } = res;

      if (data && modalSetState.setDialogContent) {
        downloadExcelFromBase64(data, fileName);

        if (modalSetState.setIsDialogOpen) modalSetState.setIsDialogOpen(true);
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
    })
    .catch((error: any) => {
      console.log('error', error);
      if (modalSetState.setIsDialogOpen) modalSetState.setIsDialogOpen(true);
      if (modalSetState.setDialogContent) {
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
                  {error?.data?.response}
                </p>
              </div>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.search.okay'),
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
      }
    });
};
