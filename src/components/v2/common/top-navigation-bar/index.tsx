import React, { useEffect, useState } from 'react';

import ActionButton from '../action-button';

import { Toast } from '@/components/v2/common/copy-and-share/toast';

import useUser from '@/lib/use-auth';

import { useRouter } from 'next/navigation';

export interface IUserAccountInfo {
  customer: {
    billing_address_id: string | null;
    cart_id: string;
    company_name: string | null;
    country_code: string | null;
    created_at: string;
    deleted_at: string | null;
    email: string;
    kyc: string | null;
    kam: {
      image: string;
      kam_name: string;
      post: string;
      phone: string;
    };
    id: string;
    last_name: string;
    metadata: string | null;
    orders: any;
    shipping_addresses: any;
    phone: string | null;
    first_name: string | null;
    updated_at: string | null;
    has_account: boolean;
    is_email_verified: boolean;
    is_phone_verified: boolean;
  };
}
const TopNavigationBar = ({
  isInMaintenanceMode
}: {
  isInMaintenanceMode: boolean;
}) => {
  const router = useRouter();

  const { userLoggedOut } = useUser();

  const [error, setError] = useState('');

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError(''); // Hide the toast notification after some time
      }, 4000);
  }, [error]);

  const handleLogout = () => {
    userLoggedOut();
    router.push('/v2/scanner');
  };

  return (
    <div className="min-h-[60px] border-b-[1px] border-neutral200 sticky top-0 left-[116px] bg-neutral0 z-[55] flex flex-col justify-end w-[calc(100vw-85px)]">
      {error !== '' && (
        <Toast show={error !== ''} message={error} isSuccess={false} />
      )}

      <div className="flex px-[32px] py-[10px] z-[55] justify-between items-center">
        {/* Left section (empty for now, but can add other content if needed) */}
        <div className="flex"></div>

        {/* Middle section (Search Field) */}

        <div className="flex gap-[16px] items-center justify-end ">
          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                label: 'Log out',
                handler: () => {
                  handleLogout();
                },
                customStyle: 'flex-1 w-full h-10'
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default TopNavigationBar;
