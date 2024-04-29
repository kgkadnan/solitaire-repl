'use client';
import ActionButton from '@/components/v2/common/action-button';
import {
  UPCOMMING_APPOINTMENTS,
  PAST_APPOINTMENTS
} from '@/constants/business-logic';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useState } from 'react';
import bookAppointment from '@public/v2/assets/icons/my-appointments/book-appointments.svg';
import {
  useDeleteMyAppointmentMutation,
  useLazyGetmyAppointmentQuery
} from '@/features/api/my-appointments';
import styles from './my-appointments.module.scss';
import deleteAppointmentSvg from '@public/v2/assets/icons/my-appointments/delete-appointment.svg';
import editAppointmentSvg from '@public/v2/assets/icons/my-appointments/edit-appointment.svg';
import Image from 'next/image';
import Tooltip from '@/components/v2/common/tooltip';
import { kycStatus } from '@/constants/enums/kyc';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import emptyAppointmentSvg from '@public/v2/assets/icons/my-appointments/empty-appointment.svg';
import {
  formatDate,
  formatDateForMonth,
  formatDateString,
  getTimeRange
} from './helpers/data-formatters';

const MyAppointments = () => {
  const [triggerMyAppointment] = useLazyGetmyAppointmentQuery({});
  const [deleteMyAppointment] = useDeleteMyAppointmentMutation({});
  const [pastAppointments, setPastAppointments] = useState([]);
  const [upcommingAppointments, setUpcommingAppointments] = useState([
    {
      appointment_type: 'In-Person Appointment',
      customer_id: 'cus_01HSDKR5Q404QPZCDYCPM60N2C',
      stones: ['438967092', '441680704'],
      reason: null,
      address:
        'DE 4011 - 4016, Tower D, Bharat Diamond Bourse, G Block BKC, Mumbai.',
      appointment_at: '2024-05-02T07:00:00.000Z',
      status: 'Active',
      id: 'CA_01HWD4MXDJ7HKRME6AT29GMH6J',
      created_at: '2024-04-26T12:03:58.616Z',
      updated_at: '2024-04-26T12:03:58.616Z'
    },
    {
      appointment_type: 'In-Person Appointment',
      customer_id: 'cus_01HSDKR5Q404QPZCDYCPM60N2C',
      stones: ['438967092', '441680704'],
      reason: 'fasfasdasd',
      address:
        'DE 4011 - 4016, Tower D, Bharat Diamond Bourse, G Block BKC, Mumbai.',
      appointment_at: '2024-05-02T07:00:00.000Z',
      status: 'Active',
      id: 'CA_01HWD4MXDJ7HKRME6AT29GMH6J',
      created_at: '2024-04-26T12:03:58.616Z',
      updated_at: '2024-04-26T12:03:58.616Z'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(UPCOMMING_APPOINTMENTS);

  // useEffect(() => {
  //   setIsLoading(true);
  //   triggerMyAppointment({}).then(res => {
  //     setIsLoading(false);
  //     console.log(res);
  //     let { history, upcoming } = res.data.data;
  //     setUpcommingAppointments(upcoming);
  //     setPastAppointments(history);
  //   });
  // }, []);

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

  const handleDeleteAppointment = ({
    appointmentId
  }: {
    appointmentId: string;
  }) => {
    deleteMyAppointment(appointmentId)
      .unwrap()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const tabsData: any = {
    upcommingAppointments: {
      keys: [
        { label: 'Date', accessor: 'updated_at' },
        { label: 'Time Slot', accessor: 'appointment_at' },
        { label: 'Location', accessor: 'address' },
        { label: 'Comment', accessor: 'reason' },
        { label: 'Action', accessor: 'action' }
      ],
      data: upcommingAppointments
    },
    pastAppointments: {
      keys: [
        { label: 'Date', accessor: 'updated_at' },
        { label: 'Time Slot', accessor: 'appointment_at' },
        { label: 'Location', accessor: 'address' },
        { label: 'Comment', accessor: 'reason' }
      ],
      data: pastAppointments
    }
  };

  // Get the keys and data for the active tab
  const { keys, data } = tabsData[activeTab] || { keys: [], data: [] };

  const renderCellContent = (accessor: string, value: any) => {
    switch (accessor) {
      case 'updated_at':
        return (
          <div className="flex items-center gap-3">
            <div
              className={` ${styles.gradient} w-[64px] h-[64px] text-neutral700 p-[14px] rounded-[4px] font-medium text-center`}
            >
              <div>
                <p className="text-sMedium font-normal ">
                  {formatDateForMonth(value[accessor])}
                </p>
                <p className="text-headingS font-medium">
                  {formatDate(value[accessor])}
                </p>
              </div>
            </div>
            <div>
              <p className="text-lRegular text-neutral-900 font-normal">
                {formatDateString(value[accessor])}
              </p>
            </div>
          </div>
        );

      case 'appointment_at':
        return (
          <span className="text-lRegular text-neutral-900 font-normal">
            {getTimeRange(value[accessor])}
          </span>
        );
      case 'address':
        return (
          <span className="text-lRegular text-neutral-900 font-normal">
            {value[accessor]}
          </span>
        );

      case 'action':
        return (
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Tooltip
              tooltipTrigger={
                <div className="cursor-pointer">
                  <Image src={editAppointmentSvg} alt={'editAppointmentSvg'} />
                </div>
              }
              tooltipContent={ManageLocales('app.myAppointments.reschedule')}
              tooltipContentStyles={'z-[1000]'}
            />
            <Tooltip
              tooltipTrigger={
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setIsLoading(true);
                    handleDeleteAppointment({ appointmentId: value.id });
                  }}
                >
                  <Image
                    src={deleteAppointmentSvg}
                    alt={'deleteAppointmentSvg'}
                  />
                </div>
              }
              tooltipContent={ManageLocales('app.myAppointments.cancel')}
              tooltipContentStyles={'z-[1000]'}
            />
          </div>
        );
      default:
        return (
          <span className="text-lRegular text-neutral-900 font-normal">
            {value[accessor] ?? '-'}
          </span>
        );
    }
  };

  const renderContent = () => {
    return (
      <>
        <div className="flex p-[16px] bg-neutral0 justify-between items-center border-b-[1px] border-neutral200 rounded-t-[8px] ">
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
        {data?.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="text-mMedium h-[47px] border-b  border-neutral-200 bg-neutral-50 text-neutral700">
                {keys?.map(({ label }: any) => (
                  <td key={label} className="p-4 text-left font-medium">
                    {label}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {data?.map((items: any, index: number) => {
                return (
                  <tr
                    key={items.id}
                    className={`bg-neutral0 group  border-neutral-200 hover:bg-neutral-50 ${
                      index >= data.length - 1 ? 'rounded-[8px]' : 'border-b'
                    }`}
                  >
                    {keys?.map(({ accessor }: any, index: number) => {
                      return (
                        <td
                          key={accessor}
                          className={` ${
                            accessor === 'address' || accessor === 'reason'
                              ? 'w-[25%]'
                              : 'w-[15%]'
                          } text-lRegular rounded-b-[8px] space-x-2 p-[16px] text-left text-gray-800`}
                        >
                          {renderCellContent(accessor, items)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          !isLoading && (
            <div
              className={`flex flex-col items-center justify-center h-[73vh] gap-5 `}
            >
              <Image src={emptyAppointmentSvg} alt={'emptyAppointmentSvg'} />
              <p className="text-neutral900  w-[320px] text-center ">
                No Appointment yet!
              </p>
            </div>
          )
        )}
      </>
    );
  };

  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);

  return (
    <div
      className={`relative mb-[20px] ${
        isNudge &&
        (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
          ? 'h-[calc(100vh-144px)]'
          : 'h-[calc(100vh-84px)]'
      }`}
    >
      {isLoading && <CustomKGKLoader />}
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
