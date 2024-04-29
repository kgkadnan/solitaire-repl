'use client';
import ActionButton from '@/components/v2/common/action-button';
import {
  UPCOMMING_APPOINTMENTS,
  PAST_APPOINTMENTS
} from '@/constants/business-logic';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useState } from 'react';
import bookAppointment from '@public/v2/assets/icons/my-appointments/book-appointments.svg';

const MyAppointments = () => {
  const [activeTab, setActiveTab] = useState(UPCOMMING_APPOINTMENTS);

  const MyAppointmentsTabs = [
    {
      label: ManageLocales('app.myAppointments.upcommingAppointments'),
      status: UPCOMMING_APPOINTMENTS
    },
    {
      label: ManageLocales('app.myAppointments.pastAppointments'),
      status: PAST_APPOINTMENTS
    }
  ];

  const handleTabs = ({ tab }: { tab: string }) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    return (
      <div className="flex p-[16px] bg-neutral0 justify-between items-center border-b-[1px] border-neutral200 rounded-[8px]">
        <div className="flex  w-[50%]  text-mMedium font-medium h-[40px] ">
          {MyAppointmentsTabs.map(({ label, status }, index) => {
            return (
              <button
                className={`border-[1px] border-neutral200 px-[16px] py-[8px] ${
                  activeTab === status
                    ? 'bg-primaryMain text-neutral25 border-primaryMain'
                    : 'bg-neutral0 text-neutral900 '
                } ${index === 0 && 'rounded-l-[8px]'}
                ${
                  index === MyAppointmentsTabs.length - 1 && 'rounded-r-[8px]'
                }`}
                key={label}
                onClick={() => handleTabs({ tab: status })}
              >
                {label}
              </button>
            );
          })}
        </div>
        <ActionButton
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.myAppointments.bookAppointment'),
              handler: () => {},
              customStyle: 'flex-1 w-full h-10',
              svg: bookAppointment
            }
          ]}
        />
      </div>
    );
  };

  return (
    <div className="relative mb-[20px]">
      <div className="flex  py-[8px] items-center">
        <p className="text-lMedium font-medium text-neutral900">
          {ManageLocales('app.myAppointments.myAppointments')}
        </p>
      </div>
      <div className="border-[1px] border-neutral200 rounded-[8px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default MyAppointments;
