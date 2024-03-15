import ActionButton from '@/components/v2/common/action-button';
import { RadioButton } from '@/components/v2/common/radio';
import {
  useLazyGetSubscriptionQuery,
  useManageSubscriptionMutation
} from '@/features/api/manage-subscription';
import { ManageLocales } from '@/utils/v2/translate';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import warningIcon from 'public/v2/assets/icons/modal/warning.svg';

const NotificationPrefrences = ({ modalSetState }: any) => {
  const [triggerGetSubscription, { data }] = useLazyGetSubscriptionQuery({});
  const [manageSubscription] = useManageSubscriptionMutation({});

  const { setDialogContent, setIsDialogOpen } = modalSetState;

  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  const [allNotification, setAllNotification] = useState('');

  const handleRadioChange = (value: string) => {
    if (!selectedOptions.includes(value)) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      if (value.includes('Email')) {
        setIsDialogOpen(true);
        setDialogContent(
          <div className="h-[270px]">
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={warningIcon} alt="warningIcon" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <div>
                <h1 className="text-headingS text-neutral900">Warning</h1>
                <p className="text-neutral600 text-mRegular">
                  Disabling email notifications may result in missed updates.
                  Consider selecting &ldquo;Important Only&ldquo; notifications
                  to continue receiving critical information on the platform.
                  Are you sure you want to turn off all email notifications?
                </p>
              </div>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.no'),
                    handler: () => {
                      setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 w-full h-10'
                  },
                  {
                    variant: 'primary',
                    label: ManageLocales('app.modal.yes'),
                    handler: () => {
                      setSelectedOptions(
                        selectedOptions.filter(
                          (option: any) => option !== value
                        )
                      );
                      setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            </div>
          </div>
        );
      } else {
        setSelectedOptions(
          selectedOptions.filter((option: any) => option !== value)
        );
      }
    }
  };

  useEffect(() => {
    const call = async () => {
      await triggerGetSubscription({})
        .unwrap()
        .then(res => {
          setSelectedOptions(res.platforms);
          setAllNotification(res.type);
        });
    };

    call();
  }, []);

  const notificationsRadio = [
    {
      name: 'notifications',
      id: '1',
      value: 'All',
      label: 'All Notifications',
      checked: allNotification.includes('All')
    },
    {
      name: 'notifications',
      id: '2',
      value: 'Important',
      label: 'Important Only',
      checked: allNotification.includes('Important')
    }
  ];

  const webRadio = [
    {
      name: 'web',
      id: '1',
      value: 'Web',
      label: 'On',
      checked: selectedOptions.includes('Web')
    },
    {
      name: 'web',
      id: '2',
      value: 'Web',
      label: 'Off',
      checked: !selectedOptions.includes('Web')
    }
  ];

  const mobileRadio = [
    {
      name: 'mobile',
      id: '1',
      value: 'Mobile',
      label: 'On',
      checked: selectedOptions.includes('Mobile')
    },
    {
      name: 'mobile',
      id: '2',
      value: 'Mobile',
      label: 'Off',
      checked: !selectedOptions.includes('Mobile')
    }
  ];

  const emailRadio = [
    {
      name: 'email',
      id: '1',
      value: 'Email',
      label: 'On',
      checked: selectedOptions.includes('Email')
    },
    {
      name: 'email',
      id: '2',
      value: 'Email',
      label: 'Off',
      checked: !selectedOptions.includes('Email')
    }
  ];

  const handleUpdateNotification = async () => {
    await manageSubscription({
      type: allNotification,
      platforms: [
        {
          Email: selectedOptions.includes('Email')
        },
        {
          Mobile: selectedOptions.includes('Mobile')
        },
        {
          Web: selectedOptions.includes('Web')
        }
      ]
    })
      .unwrap()
      .then(res => {
        console.log('res', res);
      })
      .catch(e => {
        console.log('eeeee', e);
      });
  };

  const handleNotification = ({ value }: { value: string }) => {
    if (value.includes('Important')) {
      setIsDialogOpen(true);
      setDialogContent(
        <div className="h-[210px]">
          <div className="absolute left-[-84px] top-[-84px]">
            <Image src={warningIcon} alt="warningIcon" />
          </div>
          <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
            <div>
              <h1 className="text-headingS text-neutral900">Are you sure?</h1>
              <p className="text-neutral600 text-mRegular">
                Are you sure you want to turn off the “Important Only”
                notifications as you might miss some important notifications
              </p>
            </div>
            <ActionButton
              actionButtonData={[
                {
                  variant: 'secondary',
                  label: ManageLocales('app.modal.no'),
                  handler: () => {
                    setIsDialogOpen(false);
                  },
                  customStyle: 'flex-1 w-full h-10'
                },
                {
                  variant: 'primary',
                  label: ManageLocales('app.modal.yes'),
                  handler: () => {
                    setAllNotification(value);
                    setIsDialogOpen(false);
                  },
                  customStyle: 'flex-1 w-full h-10'
                }
              ]}
            />
          </div>
        </div>
      );
    } else {
      setAllNotification(value);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-[16px] ">
      <div className="w-[760px] flex flex-col gap-[16px]">
        <h1 className="text-neutral-900 text-headingS font-medium">
          Notification Preferences
        </h1>

        {selectedOptions?.length > 0 && allNotification?.length > 0 && (
          <div className="bg-neutral0 flex flex-col gap-[12px]  px-[24px] py-[24px]  rounded-[8px] border-solid border-[1px] border-neutral-200 shadow-sm">
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[16px]">
                <div>
                  <h1 className="text-headingS font-medium text-neutral-900">
                    Notifications
                  </h1>
                </div>
                <div>
                  {notificationsRadio?.map((radioData: any) => (
                    <div className="mb-3" key={radioData.id}>
                      <RadioButton
                        radioMetaData={radioData}
                        onChange={(value: string) => {
                          handleNotification({ value });
                        }}
                        customStyle={{
                          radio: '!text-mMedium !text-neutral900'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[24px]">
              <div className="">
                <div className="flex flex-col gap-[16px]">
                  <h1 className="text-headingS font-medium text-neutral-900">
                    Web
                  </h1>

                  <div className="flex gap-6">
                    {webRadio?.map((radioData: any) => (
                      <div className="mb-3" key={radioData.id}>
                        <RadioButton
                          radioMetaData={radioData}
                          onChange={(value: any) => handleRadioChange(value)}
                          customStyle={{
                            radio: '!text-mMedium !text-neutral900'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <p className=" mb-2 text-neutral-900 font-normal text-mRegular">
                  Never miss a moment on the web! Get notifications for updates
                  you might have missed.
                </p>
                <hr className="border-neutral200" />
              </div>
            </div>
            <div className="flex flex-col gap-[24px]">
              <div className="">
                <div className="flex flex-col gap-[16px]">
                  <h1 className="text-headingS font-medium text-neutral-900">
                    Mobile
                  </h1>

                  <div className="flex gap-6">
                    {mobileRadio?.map((radioData: any) => (
                      <div className="mb-3" key={radioData.id}>
                        <RadioButton
                          radioMetaData={radioData}
                          onChange={(value: any) => handleRadioChange(value)}
                          customStyle={{
                            radio: '!text-mMedium !text-neutral900'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <p className=" mb-2 text-neutral-900 font-normal text-mRegular">
                  Stay connected on the go! Receive notifications for mobile
                  updates you may have missed
                </p>
                <hr className="border-neutral200" />
              </div>
            </div>
            <div className="flex flex-col gap-[24px]">
              <div className="">
                <div className="flex flex-col gap-[16px]">
                  <h1 className="text-headingS font-medium text-neutral-900">
                    Email
                  </h1>

                  <div className="flex gap-6">
                    {emailRadio?.map((radioData: any) => (
                      <div className="mb-3" key={radioData.id}>
                        <RadioButton
                          radioMetaData={radioData}
                          onChange={(value: any) => handleRadioChange(value)}
                          customStyle={{
                            radio: '!text-mMedium !text-neutral900'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <p className=" mb-2 text-neutral-900 font-normal text-mRegular">
                  Don&apos;t miss out on important updates! Opt-in for email
                  notifications and stay in the loop
                </p>
                <hr className="border-neutral200" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="h-[72px] mt-[18px] w-[1136px] bg-neutral0 border-[1px] border-solid border-neutral200 rounded-t-[8px] p-[16px]">
        {' '}
        <ActionButton
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.myAccount.footer.cancel'),
              handler: () => {
                setSelectedOptions(data.platforms);
                setAllNotification(data.type);
              }
            },
            {
              variant: 'primary',
              label: ManageLocales('app.myAccount.footer.update'),
              handler: () => handleUpdateNotification()
            }
          ]}
        />
      </div>
    </div>
  );
};

export default NotificationPrefrences;
