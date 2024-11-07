'use client';
import ActionButton from '@/components/v2/common/action-button';
import {
  UPCOMING_APPOINTMENTS,
  PAST_APPOINTMENTS
} from '@/constants/business-logic';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect, useState } from 'react';
import bookAppointment from '@public/v2/assets/icons/my-appointments/book-appointments.svg';
import {
  useDeleteMyAppointmentMutation,
  useLazyGetAvailableMyAppointmentSlotsQuery,
  useLazyGetMyAppointmentQuery
} from '@/features/api/my-appointments';
import styles from './my-appointments.module.scss';
import rescheduleAppointmentSvg from '@public/v2/assets/icons/my-appointments/edit-appointment.svg';
import Image from 'next/image';
import { kycStatus } from '@/constants/enums/kyc';
import CustomKGKLoader from '@/components/v2/common/custom-kgk-loader';
import emptyAppointmentSvg from '@public/v2/assets/icons/my-appointments/empty-appointment.svg';
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

import { useErrorStateManagement } from '@/hooks/v2/error-state-management';
import { Toast } from '@/components/v2/common/copy-and-share/toast';
import BookAppointment from './components/book-appointment/book-appointment';
import CommonPoppup from '../login/component/common-poppup';
import MyAppointmentSkeleton from '@/components/v2/skeleton/my-appointment';
import { Skeleton } from '@mui/material';

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
    image: string;
  };
  storeAddresses: string[];
  timeSlots: {
    dates: { date: string; day: string }[];
    slots: ISlots;
  };
}

export interface IRescheduleAppointmentData {
  selectedDate: number;
  selectedSlot: string;
  comment: string;
  location: string;
  appointmentId: string;
  stones: string[];
}

const MyAppointments = () => {
  const [triggerMyAppointment, { data: myAppointmentData }] =
    useLazyGetMyAppointmentQuery({});
  const [deleteMyAppointment] = useDeleteMyAppointmentMutation({});
  const [triggerAvailableSlots] = useLazyGetAvailableMyAppointmentSlotsQuery(
    {}
  );
  const { modalState, modalSetState } = useModalStateManagement();
  const [pastAppointments, setPastAppointments] = useState<any>(undefined);
  const [upcomingAppointments, setUpcomingAppointments] =
    useState<any>(undefined);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointmentPayload, setAppointmentPayload] =
    useState<IAppointmentPayload>({
      kam: { kam_name: '', image: '' },
      storeAddresses: [],
      timeSlots: { dates: [{ date: '', day: '' }], slots: {} }
    });
  const [rescheduleAppointmentData, setRescheduleAppointmentData] =
    useState<IRescheduleAppointmentData>();

  const { errorState, errorSetState } = useErrorStateManagement();
  const { setIsError } = errorSetState;
  const { isError, errorText } = errorState;

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(UPCOMING_APPOINTMENTS);

  const getAppointment = () => {
    triggerMyAppointment({}).then(res => {
      setIsLoading(false);
      let { history, upcoming } = res && res.data && res.data.data;
      setUpcomingAppointments(upcoming);
      setPastAppointments(history);
    });
  };

  useEffect(() => {
    getAppointment();
  }, [myAppointmentData]);

  useEffect(() => {
    isError &&
      setTimeout(() => {
        setIsError(false); // Hide the toast notification after some time
      }, 4000);
  }, [isError]);

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
          <CommonPoppup
            content=""
            status="success"
            customPoppupBodyStyle="!mt-[70px]"
            header={'Appointment cancelled successfully'}
            actionButtonData={[
              {
                variant: 'primary',
                label: ManageLocales('app.modal.okay'),
                handler: () => modalSetState.setIsDialogOpen(false),
                customStyle: 'flex-1 w-full h-10'
              }
            ]}
          />
        );

        getAppointment();
      })
      .catch((error: any) => {
        setIsLoading(false);
        modalSetState.setIsDialogOpen(true);
        modalSetState.setDialogContent(
          <CommonPoppup
            content={''}
            customPoppupBodyStyle="!mt-[70px]"
            header={error?.data?.message}
            actionButtonData={[
              {
                variant: 'primary',
                label: ManageLocales('app.modal.okay'),
                handler: () => modalSetState.setIsDialogOpen(false),
                customStyle: 'flex-1 w-full h-10'
              }
            ]}
          />
        );
      });
  };

  const handleCreateAppointment = () => {
    setShowAppointmentForm(true);
    triggerAvailableSlots({}).then(payload => {
      let { data } = payload.data;
      setAppointmentPayload(data);
    });
  };

  const handleRescheduleAppointment = ({ rescheduleData }: any) => {
    handleCreateAppointment();
    setRescheduleAppointmentData({
      selectedDate: formatDate(rescheduleData.appointment_at),
      selectedSlot: rescheduleData.appointment_at,
      comment: rescheduleData.reason,
      location: rescheduleData.address,
      appointmentId: rescheduleData.id,
      stones: rescheduleData.stones
    });
  };

  const goBackToListView = () => {
    setRescheduleAppointmentData(undefined);
    setShowAppointmentForm(false);
  };

  // Created a copy of the array before sorting
  const sortedPastAppointmentsData = [...(pastAppointments || [])].sort(
    (a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
  );

  const tabsData: ITabsData = {
    upcomingAppointments: {
      keys: [
        { label: 'Date', accessor: 'appointment_at' },
        { label: 'Time Slot', accessor: 'appointment_at' },
        { label: 'Location', accessor: 'address' },
        { label: 'Comment', accessor: 'reason' },
        { label: 'Action', accessor: 'action' }
      ],
      data: upcomingAppointments
    },
    pastAppointments: {
      keys: [
        { label: 'Date', accessor: 'appointment_at' },
        { label: 'Time Slot', accessor: 'appointment_at' },
        { label: 'Location', accessor: 'address' },
        { label: 'Comment', accessor: 'reason' }
      ],
      data: sortedPastAppointmentsData
    }
  };

  // Get the keys and data for the active tab
  const { keys, data } = tabsData[activeTab] || { keys: [], data: [] };

  const renderCellContent = (label: string, accessor: string, value: any) => {
    if (accessor === 'appointment_at' && label === 'Date') {
      return (
        <div className="flex items-center gap-3">
          <div
            className={` ${
              activeTab === PAST_APPOINTMENTS
                ? 'bg-neutral100'
                : styles.gradient
            } w-[64px] h-[64px] text-neutral700 p-[14px] rounded-[4px] font-medium flex justify-center items-center text-center`}
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
    } else if (accessor === 'appointment_at' && label === 'Time Slot') {
      return (
        <span className="text-lRegular text-neutral900 font-normal">
          {getTimeRange(value[accessor])}
        </span>
      );
    } else if (accessor === 'address') {
      return (
        <span className="text-lRegular text-neutral900 font-normal">
          {value[accessor]}
        </span>
      );
    } else if (accessor === 'action') {
      return (
        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ActionButton
            actionButtonData={[
              {
                variant: 'secondary',
                svg: rescheduleAppointmentSvg,
                handler: () => {
                  handleRescheduleAppointment({ rescheduleData: value });
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
                    <CommonPoppup
                      content={''}
                      status="warning"
                      customPoppupBodyStyle="!mt-[70px]"
                      header={'Do you want to cancel this appointment?'}
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
                  );
                },
                customStyle: 'w-[40px] h-[40px]',
                tooltip: ManageLocales('app.myAppointments.cancel')
              }
            ]}
          />
        </div>
      );
    } else {
      return (
        <span className="text-lRegular text-neutral900 font-normal">
          {(value as any)[accessor] || '-'}
        </span>
      );
    }
  };

  const renderContent = () => {
    if (showAppointmentForm) {
      return (
        <BookAppointment
          breadCrumLabel={ManageLocales('app.myAppointments.myAppointments')}
          goBackToListView={goBackToListView}
          appointmentPayload={appointmentPayload}
          setIsLoading={setIsLoading}
          modalSetState={modalSetState}
          getAppointment={getAppointment}
          rescheduleAppointmentData={rescheduleAppointmentData}
          errorSetState={errorSetState}
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
                  svg: bookAppointment,
                  isDisable:
                    isKycVerified?.customer?.kyc?.status !== kycStatus.APPROVED
                }
              ]}
            />
          </div>
          {data?.length > 0 ? (
            <div className={'w-full'}>
              <div className="text-mMedium w-full h-[47px] border-b border-neutral200 bg-neutral50 text-neutral700 flex">
                {keys?.map(({ label, accessor }) => (
                  <div
                    key={label}
                    className={`p-4 text-left font-medium ${
                      accessor === 'address' || accessor === 'reason'
                        ? activeTab === PAST_APPOINTMENTS
                          ? 'w-[30%]'
                          : 'w-[25%]'
                        : activeTab === PAST_APPOINTMENTS
                          ? 'w-[20%]'
                          : 'w-[15%]'
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
              <div className="max-h-[calc(100vh-318px)] w-full overflow-y-auto">
                {data?.map(items => (
                  <div
                    key={items.id}
                    className="bg-neutral0 group border-solid border-neutral200 hover:bg-neutral50 border-b flex"
                  >
                    {keys?.map(({ accessor, label }) => (
                      <div
                        key={accessor}
                        className={`text-lRegular items-center rounded-b-[8px] space-x-2 p-[16px] text-left text-gray-800 flex  ${
                          accessor === 'address' || accessor === 'reason'
                            ? activeTab === PAST_APPOINTMENTS
                              ? 'w-[30%]'
                              : 'w-[25%]'
                            : activeTab === PAST_APPOINTMENTS
                              ? 'w-[20%]'
                              : 'w-[15%]'
                        }`}
                      >
                        {renderCellContent(label, accessor, items)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            !isLoading && (
              <div
                className={`flex flex-col items-center justify-center ${
                  isNudge &&
                  (isKycVerified?.customer?.kyc?.status ===
                    kycStatus.INPROGRESS ||
                    isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
                    ? 'h-[62vh]'
                    : 'h-[73vh]'
                }  gap-5 `}
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
      />
      {isError && (
        <Toast show={isError} message={errorText} isSuccess={false} />
      )}
      {isLoading && <CustomKGKLoader />}
      {!showAppointmentForm && (
        <div className="flex  py-[8px] items-center">
          {myAppointmentData !== undefined ? (
            <p className="text-lMedium font-medium text-neutral900">
              {ManageLocales('app.myAppointments.myAppointments')}
            </p>
          ) : (
            <Skeleton
              variant="rectangular"
              height={'24px'}
              sx={{ bgcolor: 'var(--neutral-200)' }}
              width={'135px'}
              animation="wave"
              className=""
            />
          )}
        </div>
      )}
      <div
        className={`relative mb-[20px]  border-[1px] border-neutral200 rounded-[8px] ${
          showAppointmentForm && 'mt-[24px]'
        }
      ${
        isNudge &&
        (isKycVerified?.customer?.kyc?.status === kycStatus.INPROGRESS ||
          isKycVerified?.customer?.kyc?.status === kycStatus.REJECTED)
          ? showAppointmentForm
            ? 'h-[calc(100vh-103px)]'
            : 'h-[calc(100vh-184px)]'
          : showAppointmentForm
            ? 'h-[calc(100vh-43px)]'
            : 'h-[calc(100vh-124px)]'
      }
      `}
      >
        {upcomingAppointments === undefined &&
        pastAppointments === undefined ? (
          <MyAppointmentSkeleton />
        ) : (
          <div className="">{renderContent()}</div>
        )}

        {upcomingAppointments !== undefined &&
          pastAppointments !== undefined &&
          data.length > 0 &&
          !showAppointmentForm && (
            <div
              className="h-[72px] border-t-[1px]  border-solid border-neutral200 bg-neutral0 rounded-b-[8px]"
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
            ></div>
          )}
      </div>
    </>
  );
};

export default MyAppointments;
