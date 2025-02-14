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

          const [loginKey, markup] = barcode.split('-'); // Extract loginKey and markup from barcode

          if (!loginKey || markup === undefined) {
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

          setLoginKey(loginKey); // Set loginKey from barcode

          try {
            let res: any = await verifyLogin({
              body: { login_key: loginKey }, // Use loginKey in payload
              markup: markup
            });

            userLoggedIn(res.data.access_token);
            router.push('/v2/search-type');
            console.log('Login Response:', res);
          } catch (error) {
            console.error('Login error:', error);
            setIsDialogOpen(true);
            setDialogContent(
              <CommonPoppup
                content={''}
                customPoppupBodyStyle="mt-[70px]"
                header={'Login failed. Please try again.'}
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
