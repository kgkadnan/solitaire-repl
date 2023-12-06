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


interface DownloadExcelFunctionProps {
  productIds: string[];
  downloadExcelApi: any;
  setDialogContent?: Dispatch<SetStateAction<ReactNode>>;
  setIsDialogOpen?: Dispatch<SetStateAction<boolean>>;
  setIsCheck?: Dispatch<SetStateAction<string[]>>;
  setIsCheckAll?: Dispatch<SetStateAction<boolean>>;
  setIsError?: Dispatch<SetStateAction<boolean>>;
}

export const performDownloadExcel = async ({
  productIds,
  downloadExcelApi,
  setDialogContent,
  setIsDialogOpen,
  setIsCheck,
  setIsCheckAll,
  setIsError
}: DownloadExcelFunctionProps) => {
  try {
    // Explicitly type res to include unwrap method
    const res: DownloadExcelApiResponse = await downloadExcelApi({
      productIds
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
