'use client';
import ActionButton from '@/components/v2/common/action-button';
import {
  UPCOMING_APPOINTMENTS,
  PAST_APPOINTMENTS
} from '@/constants/business-logic';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useState } from 'react';
import bookAppointment from '@public/v2/assets/icons/my-appointments/book-appointments.svg';
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';
import errorSvg from '@public/v2/assets/icons/modal/error.svg';
import {
  useDeleteMyAppointmentMutation,
  useLazyGetMyAppointmentCreatePayloadQuery,
  useLazyGetMyAppointmentQuery
} from '@/features/api/my-appointments';
import styles from './my-appointments.module.scss';
import editAppointmentSvg from '@public/v2/assets/icons/my-appointments/edit-appointment.svg';
import Image from 'next/image';
import { kycStatus } from '@/constants/enums/kyc';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import emptyAppointmentSvg from '@public/v2/assets/icons/my-appointments/empty-appointment.svg';
import warningIcon from '@public/v2/assets/icons/modal/warning.svg';
import {
  formatDate,
  formatDateForMonth,
  formatDateString,
  getTimeRange
} from './helpers/data-formatters';
import { DialogComponent } from '@/components/v2/common/dialog';
import { useModalStateManagement } from '@/hooks/v2/modal-state.management';
import BinIcon from '@public/v2/assets/icons/bin.svg';
import { ITabsData } from './interface';
import BookAppointment from './components/book-appointment/book-appointment';
export interface ISlot {
  datetimeString: string;
  isAvailable: boolean;
}

export interface ISlots {
  [index: string]: any;
}

export interface IAppointmentPayload {
  kam: {
    kam_name: string;
  };
  storeAddresses: string[];
  timeSlots: {
    dates: { date: string; day: string }[];
    slots: ISlots;
  };
}

const MyAppointments = () => {
  const [triggerMyAppointment, { data: myAppointmentData }] =
    useLazyGetMyAppointmentQuery({});
  const [deleteMyAppointment] = useDeleteMyAppointmentMutation({});
  const [triggerCreatePayload] = useLazyGetMyAppointmentCreatePayloadQuery({});
  const { modalState, modalSetState } = useModalStateManagement();
  const [pastAppointments, setPastAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [showAppointment, setShowAppointment] = useState(false);
  const [appointmentPayload, setAppointmentPayload] =
    useState<IAppointmentPayload>({
      kam: { kam_name: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(UPCOMING_APPOINTMENTS);

  const getAppointment = () => {
    triggerMyAppointment({}).then(res => {
      setIsLoading(false);
      let { history, upcoming } = res.data.data;
      setUpcomingAppointments(upcoming);
      setPastAppointments(history);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getAppointment();
  }, [myAppointmentData]);

  const MyAppointmentsTabs = [
    {
      label: ManageLocales('app.myAppointments.upcomingAppointments'),
      status: UPCOMING_APPOINTMENTS
    },
    {
      label: ManageLocales('app.myAppointments.pastAppointments'),
      status: PAST_APPOINTMENTS
    }
  ];

  const switchTabs = ({ tab }: { tab: string }) => {
    setActiveTab(tab);
    let { history, upcoming } = myAppointmentData.data;
    setUpcomingAppointments(upcoming);
    setPastAppointments(history);
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
        modalSetState.setIsDialogOpen(true);
        modalSetState.setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={confirmIcon} alt="confirmIcon" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <div>
                <h1 className="text-headingS text-neutral900">
                  Appointment cancelled successfully
                </h1>
              </div>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      modalSetState.setIsDialogOpen(false);
                    },
                    customStyle: 'w-full flex-1'
                  }
                ]}
              />
            </div>
          </>
        );
        getAppointment();
      })
      .catch((error: any) => {
        setIsLoading(false);
        modalSetState.setIsDialogOpen(true);
        modalSetState.setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={errorSvg} alt="errorSvg" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <p className="text-neutral600 text-mRegular">
                {error?.data?.message}
              </p>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      modalSetState.setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            </div>
          </>
        );
      });
  };

  const handleCreateAppointment = () => {
    setShowAppointment(true);
    triggerCreatePayload({}).then(payload => {
      let { data } = payload.data;
      setAppointmentPayload(data);
    });
  };

  const goBackToListView = () => {
    setShowAppointment(false);
  };

  const tabsData: ITabsData = {
    upcomingAppointments: {
      keys: [
        { label: 'Date', accessor: 'updated_at' },
        { label: 'Time Slot', accessor: 'appointment_at' },
        { label: 'Location', accessor: 'address' },
        { label: 'Comment', accessor: 'reason' },
        { label: 'Action', accessor: 'action' }
      ],
      data: upcomingAppointments
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
              className={` ${
                activeTab === PAST_APPOINTMENTS
                  ? 'bg-neutral100'
                  : styles.gradient
              } w-[64px] h-[64px] text-neutral700 p-[14px] rounded-[4px] font-medium text-center`}
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
              <p className="text-lRegular text-neutral900 font-normal">
                {formatDateString(value[accessor])}
              </p>
            </div>
          </div>
        );

      case 'appointment_at':
        return (
          <span className="text-lRegular text-neutral900 font-normal">
            {getTimeRange(value[accessor])}
          </span>
        );
      case 'address':
        return (
          <span className="text-lRegular text-neutral900 font-normal">
            {value[accessor]}
          </span>
        );

      case 'action':
        return (
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  svg: editAppointmentSvg,
                  handler: () => {
                    setIsLoading(true);
                    setShowAppointment(true);
                  },
                  customStyle: 'w-[40px] h-[40px]',
                  tooltip: ManageLocales('app.myAppointments.reschedule')
                }
              ]}
            />
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  svg: BinIcon,
                  handler: () => {
                    modalSetState.setIsDialogOpen(true);
                    modalSetState.setDialogContent(
                      <>
                        <div className="absolute left-[-84px] top-[-84px]">
                          <Image src={warningIcon} alt="warning" />
                        </div>
                        <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[357px]">
                          <h1 className="text-headingS text-neutral900">
                            Do you want to cancel this appointment?
                          </h1>
                          <ActionButton
                            actionButtonData={[
                              {
                                variant: 'secondary',
                                label: 'No',
                                handler: () => {
                                  modalSetState.setIsDialogOpen(false);
                                },
                                customStyle: 'flex-1 w-full'
                              },
                              {
                                variant: 'primary',
                                label: 'Yes',
                                handler: () => {
                                  setIsLoading(true);
                                  modalSetState.setIsDialogOpen(false);
                                  handleDeleteAppointment({
                                    appointmentId: value.id
                                  });
                                },
                                customStyle: 'flex-1 w-full'
                              }
                            ]}
                          />
                        </div>
                      </>
                    );
                  },
                  customStyle: 'w-[40px] h-[40px]',
                  tooltip: ManageLocales('app.myAppointments.cancel')
                }
              ]}
            />
          </div>
        );
      default:
        return (
          <span className="text-lRegular text-neutral900 font-normal">
            {value[accessor] ?? '-'}
          </span>
        );
    }
  };

  const renderContent = () => {
    if (showAppointment) {
      return (
        <BookAppointment
          breadCrumLabel={ManageLocales('app.myAppointments.myAppointments')}
          goBackToListView={goBackToListView}
          appointmentPayload={appointmentPayload}
          setIsLoading={setIsLoading}
          modalSetState={modalSetState}
          getAppointment={getAppointment}
        />
      );
    } else {
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
                    onClick={() => switchTabs({ tab: status })}
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
                  handler: () => {
                    handleCreateAppointment();
                  },
                  customStyle: 'flex-1 w-full h-10',
                  svg: bookAppointment
                }
              ]}
            />
          </div>
          {data?.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="text-mMedium h-[47px] border-b  border-neutral200 bg-neutral50 text-neutral700">
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
                      className={`bg-neutral0 group  border-neutral200 hover:bg-neutral50 ${
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
    }
  };

  let isNudge = localStorage.getItem('show-nudge') === 'MINI';
  const isKycVerified = JSON.parse(localStorage.getItem('user')!);

  return (
    <>
      {' '}
      <DialogComponent
        dialogContent={modalState.dialogContent}
        isOpens={modalState.isDialogOpen}
        setIsOpen={modalSetState.setIsDialogOpen}
      />
      <div
        className={`relative mb-[20px] 
      ${
        isNudge &&
        (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
          ? showAppointment
            ? 'h-[calc(100vh-10px)]'
            : 'h-[calc(100vh-144px)]'
          : showAppointment
          ? 'h-[calc(100vh--50px)]'
          : 'h-[calc(100vh-84px)]'
      }
      `}
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
    </>
  );
};

export default MyAppointments;
