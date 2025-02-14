'use client';
import React, { useEffect, useState } from 'react';
import scanBarcodeImg from '@public/v2/assets/icons/scan-barcode.svg';
import Image from 'next/image';
import CryptoJS, { AES } from 'crypto-js';
import { useVerifyLoginMutation } from '@/features/api/login';
import { ManageLocales } from '@/utils/v2/translate';
import CommonPoppup from '../login/component/common-poppup';
import { DialogComponent } from '@/components/v2/common/dialog';
import useUser from '@/lib/use-auth';
import { useRouter } from 'next/navigation';
const ScanBarcode = () => {
  const router = useRouter();
  const { userLoggedIn } = useUser();
  const [loginKey, setLoginKey] = useState('');

  const [dialogContent, setDialogContent] = useState(<></>);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [verifyLogin] = useVerifyLoginMutation();

  function decrypt(data: string, secretKey = 'KGKBarcode') {
    const base64Decoded = decodeURIComponent(data);
    const encrypted = atob(base64Decoded); // Decode from Base64
    const decrypted = AES.decrypt(encrypted, secretKey).toString(
      CryptoJS.enc.Utf8
    );
    return decrypted;
  }

  useEffect(() => {
    // let stringifyData = {
    //   email: 'amaresh.parida@kgkmail.com',
    //   password: 'abc123',
    //   markup: 4
    // };
    // let encryptValue = encrypt(JSON.stringify(stringifyData));
    // console.log('encryptValue', encryptValue);
    // userLoggedIn(
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzYWxlc3BlcnNvbl9pZCI6MSwiZG9tYWluIjoic3RvcmUiLCJzYWxlc3BlcnNvbl9lbWFpbCI6ImFtYXJlc2gucGFyaWRhQGtna21haWwuY29tIiwibWFya3VwIjoiMTAiLCJpYXQiOjE3Mzk1MTk4OTcsImV4cCI6MTczOTUyMzQ5N30.wWXMDqkaYnGCQDKvd158KfaBCCosaDhXxo5ExmEcIyY'
    // );
    let scanTimeout: NodeJS.Timeout;

    let barcode = '';

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        barcode += event.key; // Directly modify the variable
      }

      clearTimeout(scanTimeout);
      scanTimeout = setTimeout(async () => {
        if (barcode) {
          console.log('Scanned Barcode:', barcode);

          let decryptedValue = decrypt(barcode);
          console.log('Decrypted Data:', decryptedValue);

          try {
            let parsedData = JSON.parse(decryptedValue);
            const { email, password, markup } = parsedData;

            if (!email || !password || markup === undefined) {
              setIsDialogOpen(true);
              setDialogContent(
                <CommonPoppup
                  content={''}
                  customPoppupBodyStyle="mt-[70px]"
                  header={'Invalid data extracted from barcode'}
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
              return;
            }

            setLoginKey(decryptedValue);

            let res: any = await verifyLogin({
              body: { email, password },
              markup: markup
            });

            userLoggedIn(res.data.access_token);

            router.push('/v2/search-type');
            console.log('Login Response:', res);
          } catch (error) {
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="mt-[70px]"
                header={'Error parsing decrypted data'}
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
            console.error('Error parsing decrypted data:', error);
          }

          barcode = ''; // Reset barcode after processing
        }
      }, 300);
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [verifyLogin, decrypt, setLoginKey]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen">
      <DialogComponent dialogContent={dialogContent} isOpens={isDialogOpen} />
      <Image src={scanBarcodeImg} alt={'empty'} />

      <div className="flex flex-col gap-2">
        <h1 className="text-headingL text-neutral900">Welcome to KGK</h1>
        <p className="text-headingM text-neutral900">
          Scan the Barcode below to continue
        </p>
      </div>
    </div>
  );
};

export default ScanBarcode;
