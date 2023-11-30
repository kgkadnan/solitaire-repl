import Image from 'next/image';
import { ReactNode, Dispatch, SetStateAction } from 'react';
import { downloadExcelFromBase64 } from './download-excel-from-base64';
import confirmImage from '@public/assets/icons/confirmation.svg';

interface DownloadExcelApiResponse {
  data: {
    fileName: string;
    data: string;
  };
}

interface DownloadExcelApiResult {
  (args: { productIds: string[] }): Promise<DownloadExcelApiResponse>;
  unwrap(): Promise<DownloadExcelApiResponse>;
}

interface DownloadExcelFunctionProps {
  productIds: string[];
  downloadExcelApi: any;
  setDialogContent?: Dispatch<SetStateAction<ReactNode>> | null;
  setIsDialogOpen?: Dispatch<SetStateAction<boolean>> | null;
  setIsCheck?: Dispatch<SetStateAction<any[]>> | null;
  setIsCheckAll?: Dispatch<SetStateAction<boolean>> | null;
  setIsError?: Dispatch<SetStateAction<boolean>> | null;
}

export const performDownloadExcel = async ({
  productIds,
  downloadExcelApi,
  setDialogContent,
  setIsDialogOpen,
  setIsCheck,
  setIsCheckAll,
  setIsError,
}: DownloadExcelFunctionProps) => {
  try {
    // Explicitly type res to include unwrap method
    const res: DownloadExcelApiResponse = await downloadExcelApi({
      productIds,
    });

    const { data, fileName } = res.data;

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
  } catch (error) {
    console.log('error', error);
  }
};
