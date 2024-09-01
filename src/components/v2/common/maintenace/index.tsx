import React, { useState } from 'react';
import maintenanceSvg from '@public/v2/assets/icons/maintenance/maintenance.svg';
import Image from 'next/image';
import Phone from '@public/v2/assets/icons/dashboard/phone.svg?url';
import WhatsApp from '@public/v2/assets/icons/dashboard/whatsapp.svg?url';
import Mail from '@public/v2/assets/icons/dashboard/mail.svg?url';
import Copy from '@public/v2/assets/icons/dashboard/copy.svg?url';
import { Toast } from '../copy-and-share/toast';

interface IKAMCardProps {
  name: string;
  role: string;
  phoneNumber: string;
  email: string;
  maintenanceEndData: string;
}

const MaintenanceMode = ({
  name,
  role,
  phoneNumber,
  email,
  maintenanceEndData
}: IKAMCardProps) => {
  const [showToast, setShowToast] = useState(false);
  const handleCopy = (email: string) => {
    navigator.clipboard.writeText(email);
    setShowToast(true); // Show the toast notification
    setTimeout(() => {
      setShowToast(false); // Hide the toast notification after some time
    }, 4000);
  };

  return (
    <>
      <Toast show={showToast} message="Copied Successfully" />
      <div className="flex flex-col gap-[16px] justify-between h-[91.5vh]">
        <div className="flex flex-col gap-[16px] items-center justify-center">
          {/* Maintenance Image */}
          <div>
            <Image src={maintenanceSvg} alt="maintenanceSvg" height={265} />
          </div>
          {/* Maintenance Content */}
          <div className="w-[701px] flex flex-col gap-[16px]">
            <p className="text-lRegular text-neutral600 font-normal text-center">
              This page is under maintenance until {maintenanceEndData}. We
              apologize for any inconvenience and appreciate your patience. For
              immediate assistance, please contact your Key Account Manager
              directly. Thank you for your cooperation and understanding.
            </p>
            {/* kam Card */}
            <div className="flex flex-col justify-center items-center gap-[16px] py-[16px] bg-neutral0 border-solid border-neutral200 border-[1px] rounded-[8px]">
              <div className="flex flex-col gap-[12px] justify-center items-center">
                <div className="text-headingS text-neutral900 font-medium">
                  {name}
                </div>
                <div className="text-lRegular text-neutral700 font-normal">
                  {role}
                </div>
              </div>
              <hr className="border-neutral200 w-[265px] text-center" />
              <div className="flex flex-col gap-[12px] justify-center items-center">
                <div className="flex items-center gap-2 cursor-pointer">
                  <a href={`tel:${phoneNumber}`}>
                    {' '}
                    <Phone />
                  </a>

                  <a
                    aria-label="Chat on WhatsApp"
                    href={`https://wa.me/${phoneNumber}`}
                    target="_blank"
                  >
                    {' '}
                    <WhatsApp />
                  </a>
                  <span className="text-mRegular font-normal text-neutral600">
                    {phoneNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2  cursor-pointer">
                  <a
                    href={`mailto:${email}`}
                    className="flex gap-2 items-center"
                  >
                    {' '}
                    <Mail />{' '}
                    <span className="text-mRegular font-normal text-neutral600">
                      {email}
                    </span>{' '}
                  </a>
                  <div onClick={() => handleCopy(email)}>
                    {' '}
                    <Copy />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-[1px] mt-auto border-l-[1px] border-r-[1px] w-full rounded-[8px] p-4 flex justify-between border-neutral200 text-lRegular">
          {/* for fixed footer */}
          {/* fixed bottom-0 left-[84px] right-0 bg-white  */}
          <div className="text-neutral400  flex gap-6 ">
            <p className="cursor-not-allowed">Terms & Conditions</p>
            <p className="cursor-not-allowed">Privacy Policy</p>
          </div>
          <p className="text-neutral500">
            Copyright © {new Date().getFullYear()} KGK Diamonds. All rights
            reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default MaintenanceMode;
