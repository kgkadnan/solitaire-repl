// components/OfflineIndicator.js
import Image from 'next/image';
import { useEffect, useState } from 'react';
import noNetworkImg from '@public/v2/assets/icons/no-internet.svg';
import ActionButton from '../action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { Toast } from '@/components/v2/common/copy-and-share/toast';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState('');

  const handleOnline = () => setIsOnline(true);
  const handleOffline = () => setIsOnline(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(''); // Hide the toast notification after some time
      }, 4000);
  }, [error]);

  return (
    <>
      {error !== '' && (
        <Toast show={error !== ''} message={error} isSuccess={false} />
      )}

      {!isOnline && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg flex flex-col items-center justify-center gap-5 max-w-md w-full mx-4">
            <Image src={noNetworkImg} alt={'noNetworkImg'} />

            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col gap-[4px] text-center">
                <h3 className="text-mMedium text-neutral600 font-medium">
                  No internet connection
                </h3>
                <p className="text-neutral400 text-sRegular">
                  Try these steps to get back online:
                </p>
              </div>
              <div className="text-neutral400 text-sRegular">
                <ul className="list-disc pl-4">
                  <li>Check your modem & router.</li>
                  <li>Reconnect to Wi-Fi.</li>
                </ul>
              </div>
            </div>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'primary',
                  label: ManageLocales('app.noNetwork.reloadPage'),
                  handler: () => {
                    // First check if we have internet connection back
                    if (navigator.onLine) {
                      // If online, reload the page
                      window.location.reload();
                    } else {
                      setError(
                        'No internet connection. Please check your network and try again.'
                      );
                    }
                  }
                }
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OfflineIndicator;
