import React, { useEffect, useState } from 'react';
import backWardArrow from '@public/v2/assets/icons/my-diamonds/backwardArrow.svg';
import Image from 'next/image';
import { Avatar } from '@/components/v2/ui/avatar';
import avatar from '@public/v2/assets/icons/my-appointments/Avatar.svg';
import locationSvg from '@public/v2/assets/icons/my-appointments/location.svg';
import { IAppointmentPayload, ISlots } from '../../page';
import { BOOK_APPOINTMENT_COMMENT_MAX_CHARACTERS } from '@/constants/business-logic';
import ActionButton from '@/components/v2/common/action-button';
import { ManageLocales } from '@/utils/v2/translate';
import { useAddMyAppointmentMutation } from '@/features/api/my-appointments';
import errorSvg from '@public/v2/assets/icons/modal/error.svg';
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';
import warningIcon from '@public/v2/assets/icons/modal/warning.svg';

export interface IModalSetState {
  setDialogContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInputDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IBookAppointment {
  goBackToListView: () => void;
  breadCrumLabel: string;
  appointmentPayload: IAppointmentPayload;
  modalSetState: IModalSetState;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getAppointment?: () => void;
}

interface IKam {
  kam_name: string;
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
  getAppointment
}) => {
  const [addMyAppointment] = useAddMyAppointmentMutation();
  const [kam, setKam] = useState<IKam>({ kam_name: '' });
  const [location, setLocation] = useState<string[]>([]);
  const [dates, setDates] = useState<IDates[]>([{ date: '', day: '' }]);
  const [slots, setSlots] = useState<ISlots>({});
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');

  useEffect(() => {
    let { kam, storeAddresses, timeSlots } = appointmentPayload;
    setSelectedDate(Number(timeSlots.dates[0].date));
    setKam(kam);
    setLocation(storeAddresses);
    setDates(timeSlots.dates);
    setSlots(timeSlots.slots);
  }, [appointmentPayload]);

  const handleSelectData = ({ date }: { date: string }) => {
    setSelectedDate(Number(date));
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
    setIsLoading(true);
    addMyAppointment({
      appointment_at: selectedSlot,
      reason: textAreaValue,
      address: location[0]
    })
      .unwrap()
      .then(() => {
        setIsLoading(false);
        goBackToListView();
        getAppointment!();
        modalSetState.setIsDialogOpen(true);
        modalSetState.setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={confirmIcon} alt="confirmIcon" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <div>
                <h1 className="text-headingS text-neutral900">
                  Your appointment has been booked successfully
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
      })
      .catch(error => {
        setIsLoading(false);
        goBackToListView();
        if (error.status === 400) {
          modalSetState.setIsDialogOpen(true);
          modalSetState.setDialogContent(
            <>
              <div className="absolute left-[-84px] top-[-84px]">
                <Image src={warningIcon} alt="warningIcon" />
              </div>
              <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
                <p className="text-neutral900 text-headingS font-normal">
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
        } else {
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
        }
      });
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
            <button
              className="text-neutral600 text-sMedium font-regular cursor-pointer"
              onClick={() => {
                goBackToListView();
              }}
            >
              {breadCrumLabel}
            </button>
            <span className="text-neutral600">/</span>
            <p className="text-neutral700 p-[8px] bg-neutral100 rounded-[4px] text-sMedium font-medium">
              Book Appointment
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[16px]">
        <div className="rounded-[4px] w-[571px]">
          {/* kam and location  */}
          <div className="flex bg-neutral50 p-[16px] rounded-[4px] gap-4">
            {/* Contact & Mode */}
            <div className="flex flex-col gap-1 w-[250px]">
              <h3 className="text-sMedium text-neutral900 font-medium">
                Contact & Mode
              </h3>
              <div className="flex items-center h-[72px] gap-3 border-solid border-[1px] p-[16px] border-neutral200 rounded-[4px] shadow-sm">
                <Avatar>
                  <Image src={avatar} alt="avatar" />
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
            <div className="flex flex-col gap-1 w-[350px]">
              <h3 className="text-sMedium text-neutral900 font-medium">
                Location
              </h3>
              <div className="flex items-center h-[72px] gap-3 border-solid border-[1px] p-[16px] border-neutral200 rounded-[4px] shadow-sm">
                <Image src={locationSvg} alt="locationSvg" />
                <div className="text-neutral900 text-sRegular font-normal">
                  {location[0] ?? '-'}
                </div>
              </div>
            </div>
          </div>
          {/* select data */}
          <div className="text-neutral900 p-[16px] font-normal text-sMedium">
            <div>Select date</div>
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
                    <div className="text-sRegular font-normal">{date.day}</div>
                    <p className="text-mMedium font-medium ">{date.date}</p>
                  </button>
                );
              })}
            </div>
          </div>
          {/* Select Time Slot */}
          <div className="p-[16px] flex flex-col gap-1 w-full">
            <div className="text-neutral900  font-normal text-sMedium">
              Select Time Slot
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
                      <div className="text-sMobileRegular text-neutral800 capitalize">
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
                                values[index].isAvailable
                                  ? selectedSlot ===
                                    values[index].datetimeString
                                    ? 'bg-primaryMain text-neutral0'
                                    : 'bg-neutral50 text-neutral700'
                                  : 'bg-neutral100 text-neutral400 cursor-not-allowed'
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
          <div className="p-[16px]">
            <div className="text-neutral900  font-normal text-sMedium">
              Add Comment
            </div>
            <div>
              <textarea
                value={textAreaValue}
                name="textarea"
                placeholder="Enter comment"
                className="w-full h-[40px] bg-infoSurface text-neutral500 rounded-[4px] text-sMobileRegular font-normal resize-none focus:outline-none p-[11px] border-infoBorder border-[1px] mt-2"
                onChange={e => handleComment(e, setTextAreaValue)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-solid border-t-[1px] border-neutral200 p-[8px] rounded-b-[8px] h-[60px] bg-neutral0">
        <ActionButton
          actionButtonData={[
            {
              variant: 'primary',
              label: ManageLocales('app.myAppointments.confirmAppointments'),
              handler: () => {
                selectedSlot.length && handleAddMyAppointment();
              }
            }
          ]}
        />
      </div>
    </>
  );
};

export default BookAppointment;
