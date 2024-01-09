import Image from 'next/image';
import { ReactNode, Dispatch, SetStateAction } from 'react';
import { downloadExcelFromBase64 } from './download-excel-from-base64';
import confirmImage from '@public/assets/icons/confirmation.svg';
import { CustomDisplayButton } from '@/components/common/buttons/display-button';
import ErrorImage from '@public/assets/icons/error.svg';
interface IDownloadExcelApiResponse {
  fileName: string;
  data: string;
}

interface IDownloadExcelFunctionProps {
  products?: string[];
  previousSearch?: string[];
  downloadExcelApi: any;
  setDialogContent?: Dispatch<SetStateAction<ReactNode>>;
  setIsDialogOpen?: Dispatch<SetStateAction<boolean>>;
  setIsCheck?: Dispatch<SetStateAction<string[]>>;
  setIsCheckAll?: Dispatch<SetStateAction<boolean>>;
  setIsError?: Dispatch<SetStateAction<boolean>>;
}

export const performDownloadExcel = async ({
  products,
  previousSearch,
  downloadExcelApi,
  setDialogContent,
  setIsDialogOpen,
  setIsCheck,
  setIsCheckAll,
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

      if (data && setDialogContent) {
        downloadExcelFromBase64(data, fileName);

        if (setIsDialogOpen) setIsDialogOpen(true);
        if (setIsCheck) setIsCheck([]);
        if (setIsCheckAll) setIsCheckAll(false);
        if (setIsError) setIsError(false);

        if (setDialogContent) {
          setDialogContent(
            <>
              <div className="max-w-[380px] flex justify-center align-middle">
                <Image src={confirmImage} alt="vector image" />
              </div>
              <div className="max-w-[380px] flex justify-center align-middle text-solitaireTertiary">
                Download Excel Successfully
              </div>
            </>
          );
        }
      }
    })
    .catch((e: any) => {
      if (setIsDialogOpen) setIsDialogOpen(true);
      if (setDialogContent) {
        setDialogContent(
          <div className="flex gap-[20px] flex-col items-center justify-center">
            <div className="flex">
              <Image src={ErrorImage} alt="Error Image" />
              <p className="text-[20px] text-[#C51A2D] ml-[8px]">Error</p>
            </div>
            <div className="text-[16px] text-solitaireTertiary">
              <p>{e?.data?.message}</p>
            </div>
            <CustomDisplayButton
              displayButtonAllStyle={{
                displayButtonStyle: 'bg-solitaireQuaternary w-[150px] h-[36px]',
                displayLabelStyle:
                  'text-solitaireTertiary text-[16px] font-medium'
              }}
              displayButtonLabel="Okay!"
              handleClick={() => {
                if (setIsDialogOpen) setIsDialogOpen(false);
              }}
            />
          </div>
        );
      }
    });
};
