import React, { useEffect, useState } from 'react';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import Image from 'next/image';
import { Avatar } from '@/components/v2/ui/avatar';
import locationSvg from '@public/v2/assets/icons/my-appointments/location.svg';
import {
  IRescheduleAppointmentData,
  IAppointmentPayload,
  ISlots
} from '../../page';
import { BOOK_APPOINTMENT_COMMENT_MAX_CHARACTERS } from '@/constants/business-logic';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import {
  useAddMyAppointmentMutation,
  useRescheduleMyAppointmentMutation
} from '@/features/api/my-appointments';
import { PLEASE_SELECT_A_TIME_SLOT } from '@/constants/error-messages/search';
import CommonPoppup from '@/app/v2/login/component/common-poppup';
import BookAppointmentSkeleton from '@/components/v2/skeleton/book-appointment';
import { Skeleton } from '@mui/material';

export interface IModalSetState {
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInputDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function getInitials(name: string | null | undefined): string {
  if (!name) {
    return '';
  }

  const salutations = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];
  const initials = name
    .split(' ')
    .filter(word => !salutations.includes(word)) // Exclude salutations
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  return initials;
}
interface IBookAppointment {
  goBackToListView: () => void;
  breadCrumLabel: string;
  appointmentPayload: IAppointmentPayload;
  modalSetState: IModalSetState;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getAppointment?: () => void;
  rescheduleAppointmentData?: IRescheduleAppointmentData;
  lotIds?: string[];
  setRowSelection?: React.Dispatch<React.SetStateAction<{}>>;
  errorSetState: any;
}

interface IKam {
  kam_name: string;
  image: string | null;
}

interface IDates {
  date: string;
  day: string;
}

const BookAppointment: React.FC<IBookAppointment> = ({
  breadCrumLabel,
  goBackToListView,
  appointmentPayload,
  setIsLoading,
  modalSetState,
  getAppointment,
  rescheduleAppointmentData,
  lotIds,
  setRowSelection,
  errorSetState
}) => {
  const [addMyAppointment] = useAddMyAppointmentMutation();
  const [rescheduleMyAppointment] = useRescheduleMyAppointmentMutation();
  const [kam, setKam] = useState<IKam>({ kam_name: '', image: '' });
  const [location, setLocation] = useState<string[]>([]);
  const [dates, setDates] = useState<IDates[]>([{ date: '', day: '' }]);
  const [slots, setSlots] = useState<ISlots>({});
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [comment, setComment] = useState('');
  const [stones, setStones] = useState<string[]>([]);
  const { setIsError, setErrorText } = errorSetState;

  const hasDataOnRescheduleAppointment = () => {
    return rescheduleAppointmentData
      ? Object.keys(rescheduleAppointmentData).length > 0
      : false;
  };

  function removeCountryFromLotIds(lotIdsWithCountry: string[]): string[] {
    return lotIdsWithCountry.map(item => {
      const match = item.match(/^(\w+)\(/);
      return match ? match[1] : '';
    });
  }

  useEffect(() => {
    let { kam, storeAddresses, timeSlots } = appointmentPayload;

    if (lotIds?.length) {
      setStones(removeCountryFromLotIds(lotIds));
      let createComment = `I want to know more about ${lotIds.join(', ')}`;
      setComment(createComment);
      setSelectedDate(Number(timeSlots.dates[0].date));
      setLocation(storeAddresses);
    } else if (hasDataOnRescheduleAppointment() && rescheduleAppointmentData) {
      setSelectedDate(rescheduleAppointmentData.selectedDate);
      setSelectedSlot(rescheduleAppointmentData.selectedSlot);
      setComment(rescheduleAppointmentData.comment);
      setLocation([rescheduleAppointmentData.location]);
      setStones(rescheduleAppointmentData.stones);
    } else {
      setSelectedDate(Number(timeSlots.dates[0].date));
      setLocation(storeAddresses);
    }
    setKam({ kam_name: kam?.kam_name, image: kam?.image });
    setDates(timeSlots.dates);
    setSlots(timeSlots.slots);
  }, [appointmentPayload]);

  const handleSelectData = ({ date }: { date: string }) => {
    if (Number(date) !== selectedDate) {
      setSelectedDate(Number(date));
      setSelectedSlot('');
    }
  };

  const handleSelectSlot = ({ slot }: { slot: string }) => {
    setSelectedSlot(prevSlot => (prevSlot === slot ? '' : slot));
  };

  const handleComment = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    setCommentValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const inputValue = event.target.value;
    if (inputValue.length <= BOOK_APPOINTMENT_COMMENT_MAX_CHARACTERS) {
      setCommentValue(inputValue);
    }
  };

  const handleAddMyAppointment = () => {
    if (selectedSlot.length) {
      setIsLoading(true);
      addMyAppointment({
        stones: stones,
        appointment_at: selectedSlot,
        reason: comment,
        address: location[0]
      })
        .unwrap()
        .then(() => {
          setIsLoading(false);
          goBackToListView();
          if (getAppointment) getAppointment!();
          modalSetState.setIsDialogOpen(true);
          modalSetState.setDialogContent(
            <CommonPoppup
              content=""
              status="success"
              customPoppupBodyStyle="!mt-[70px]"
              header={'Your appointment has been booked successfully'}
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

          setRowSelection && setRowSelection({});
        })
        .catch(error => {
          setIsLoading(false);
          goBackToListView();
          modalSetState.setIsDialogOpen(true);
          modalSetState.setDialogContent(
            <CommonPoppup
              content={''}
              status={error.status === 400 ? 'warning' : ''}
              customPoppupBodyStyle="!mt-[70px]"
              header={error?.data?.message}
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
          );

          setRowSelection && setRowSelection({});
        });
    } else {
      setErrorText(PLEASE_SELECT_A_TIME_SLOT);
      setIsError(true);
    }
  };

  const handleRescheduleAppointment = () => {
    if (selectedSlot.length) {
      setIsLoading(true);
      rescheduleMyAppointment({
        appointmentId: rescheduleAppointmentData?.appointmentId,
        data: {
          stones: stones,
          appointment_at: selectedSlot,
          reason: comment,
          address: location[0]
        }
      })
        .unwrap()
        .then(() => {
          setIsLoading(false);
          goBackToListView();
          getAppointment!();
          modalSetState.setIsDialogOpen(true);
          modalSetState.setDialogContent(
            <CommonPoppup
              content={''}
              status={'success'}
              customPoppupBodyStyle="!mt-[70px]"
              header={'Your appointment has been successfully rescheduled'}
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
          );
        })
        .catch(error => {
          setIsLoading(false);
          goBackToListView();
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
                  handler: () => {
                    modalSetState.setIsDialogOpen(false);
                  },
                  customStyle: 'flex-1 w-full h-10'
                }
              ]}
            />
          );
        });
    } else {
      setErrorText(PLEASE_SELECT_A_TIME_SLOT);
      setIsError(true);
    }
  };

  return (
    <>
      <div className="bg-neutral0 border-b-[1px] rounded-t-[8px] border-solid border-neutral200">
        <div className="flex items-center p-[16px] ">
          <Image
            src={backWardArrow}
            alt="backWardArrow"
            onClick={() => {
              goBackToListView();
            }}
            className="cursor-pointer"
          />
          <div className="flex gap-[8px] items-center">
            {Object.keys(appointmentPayload.timeSlots.slots).length <= 0 ? (
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={'16px'}
                width={'99px'}
                animation="wave"
                className=""
              />
            ) : (
              <button
                className="text-neutral600 text-sMedium font-regular cursor-pointer"
                onClick={() => {
                  goBackToListView();
                }}
              >
                {breadCrumLabel}
              </button>
            )}

            <span className="text-neutral600">/</span>
            {Object.keys(appointmentPayload.timeSlots.slots).length <= 0 ? (
              <Skeleton
                variant="rectangular"
                sx={{ bgcolor: 'var(--neutral-200)' }}
                height={'32px'}
                width={'110px'}
                animation="wave"
                className="rounded-[4px]"
              />
            ) : (
              <p className="text-neutral700 p-[8px] bg-neutral100 rounded-[4px] text-sMedium font-medium">
                {hasDataOnRescheduleAppointment()
                  ? ManageLocales('app.myAppointments.rescheduleAppointments')
                  : 'Book Appointment'}
              </p>
            )}
          </div>
        </div>
      </div>

      {Object.keys(appointmentPayload.timeSlots.slots).length <= 0 ? (
        <BookAppointmentSkeleton />
      ) : (
        <div className="flex justify-center mt-[16px]">
          <div className="rounded-[4px] w-[571px]">
            {/* kam and location  */}
            <div className="flex bg-neutral50 py-[8px] px-[16px] rounded-[4px] gap-4">
              {/* Contact & Mode */}
              <div className="flex flex-col gap-1 w-[250px] ">
                <h3 className="text-sMedium text-neutral900 font-medium">
                  Contact & Mode
                </h3>
                <div className="flex items-center bg-neutral0 h-[72px] gap-3 border-solid border-[1px] p-[16px] border-neutral200 rounded-[4px] shadow-sm">
                  <Avatar className="flex items-center justify-center text-center bg-primaryMain text-mRegular text-neutral0">
                    {kam?.image ? (
                      <div
                        className="h-10 10 relative"
                        style={{ width: '40px', height: '40px' }}
                      >
                        <Image
                          src={kam?.image}
                          alt="kam image"
                          className="object-cover "
                          layout="fill"
                        />
                      </div>
                    ) : (
                      getInitials(kam?.kam_name)
                    )}
                  </Avatar>
                  <div className=" text-sRegular font-normal">
                    <h4 className="text-neutral900">
                      {kam?.kam_name ?? '-'} (KAM)
                    </h4>
                    <p className="text-neutral600">In-Person meeting</p>
                  </div>
                </div>
              </div>
              {/* Location */}
              <div className="flex flex-col gap-1 w-[350px] ">
                <h3 className="text-sMedium text-neutral900 font-medium">
                  Location
                </h3>
                <div className="flex items-center bg-neutral0 h-[72px] gap-3 border-solid border-[1px] p-[16px] border-neutral200 rounded-[4px] shadow-sm">
                  <Image src={locationSvg} alt="locationSvg" />
                  <div className="text-neutral900 text-sRegular font-normal">
                    {location[0] ?? '-'}
                  </div>
                </div>
              </div>
            </div>
            {/* select data */}
            <div className=" p-[16px]">
              <div className="text-sMedium text-neutral900 font-medium">
                Select date*
              </div>
              <div className="flex justify-between bg-neutral0 p-[8px] rounded-[4px]">
                {dates.map(date => {
                  return (
                    <button
                      onClick={() => {
                        handleSelectData({ date: date.date });
                      }}
                      key={date.date}
                      className={`flex flex-col cursor-pointer  items-center p-[20px]  w-[76px] rounded-[4px]
                        ${
                          selectedDate === Number(date.date)
                            ? 'bg-primaryMain text-neutral0'
                            : 'bg-neutral50 text-neutral700'
                        }
                    `}
                    >
                      <div className="text-sRegular font-normal">
                        {date.day}
                      </div>
                      <p className="text-mMedium font-medium ">{date.date}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Select Time Slot */}
            <div className="px-[16px] flex flex-col gap-1 w-full">
              <div className="text-sMedium text-neutral900 font-medium">
                Select time slot*
              </div>
              <div className="flex justify-between gap-[49px]">
                {slots &&
                  slots[Number(selectedDate)] &&
                  Object.keys(slots[Number(selectedDate)]).map(key => {
                    let keys = Object.keys(slots[selectedDate][key]);
                    let values: {
                      datetimeString: string;
                      isAvailable: boolean;
                    }[] = Object.values(slots[selectedDate][key]);

                    return (
                      <div
                        key={key}
                        className={`flex flex-col gap-[4px] font-normal ${
                          key === 'Morning' ? 'w-[40%]' : 'w-[60%]'
                        }`}
                      >
                        <div className="text-sMobileRegular font-medium text-neutral800 capitalize">
                          {key}
                        </div>
                        <div className="flex flex-wrap gap-2 bg-neutral0 rounded-[4px] p-[8px]">
                          {keys.map((timeSlot, index) => {
                            return (
                              <button
                                key={timeSlot}
                                disabled={!values[index].isAvailable}
                                className={` w-[86px] text-sMobileRegular  rounded-[4px] p-[8px]
                              ${
                                selectedSlot === values[index].datetimeString
                                  ? 'bg-primaryMain text-neutral0'
                                  : !values[index].isAvailable
                                    ? 'bg-neutral100 text-neutral400 cursor-not-allowed'
                                    : 'bg-neutral50 text-neutral700'
                              }`}
                                onClick={() => {
                                  handleSelectSlot({
                                    slot: values[index].datetimeString
                                  });
                                }}
                              >
                                {timeSlot}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* Add Comment */}
            <div className="px-[16px] py-[8px]">
              <div className="text-sMedium text-neutral900 font-medium">
                Add comment
              </div>
              <div>
                <textarea
                  value={comment}
                  name="textarea"
                  placeholder="Enter comment"
                  className="w-full h-[40px] bg-infoSurface text-neutral500 rounded-[4px] text-sMobileRegular font-normal resize-none focus:outline-none p-[11px] border-infoBorder border-[1px] mt-2"
                  onChange={e => handleComment(e, setComment)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="border-solid border-t-[1px] border-neutral200 p-[8px] rounded-b-[8px] h-[60px] bg-neutral0">
        <ActionButton
          actionButtonData={[
            {
              variant: 'primary',
              label: hasDataOnRescheduleAppointment()
                ? ManageLocales('app.myAppointments.rescheduleAppointments')
                : ManageLocales('app.myAppointments.confirmAppointments'),
              handler: () => {
                hasDataOnRescheduleAppointment()
                  ? handleRescheduleAppointment()
                  : handleAddMyAppointment();
              },
              isDisable:
                !selectedSlot.length ||
                (hasDataOnRescheduleAppointment() &&
                  selectedSlot === rescheduleAppointmentData?.selectedSlot)
            }
          ]}
        />
      </div>
    </>
  );
};

export default BookAppointment;
