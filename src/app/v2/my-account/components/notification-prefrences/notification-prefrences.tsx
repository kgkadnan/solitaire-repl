import ActionButton from '@/components/v2/common/action-button';
import { RadioButton } from '@/components/v2/common/radio';
import { useLazyGetSubscriptionQuery } from '@/features/api/manage-subscription';
import { ManageLocales } from '@/utils/v2/translate';
import React, { useEffect } from 'react';

const NotificationPrefrences = () => {
  const [triggerGetSubscription] = useLazyGetSubscriptionQuery({});

  useEffect(() => {
    triggerGetSubscription({})
      .unwrap()
      .then(res => {
        console.log(res);
      });
  }, []);

  const notificationsRadio = [
    {
      name: 'notifications',
      id: '1',
      value: '7',
      label: 'All Notifications'
      // checked: false
    },
    {
      name: 'notifications',
      id: '2',
      value: '30',
      label: 'Important Only'
      // checked: false
    }
  ];

  const webRadio = [
    {
      name: 'web',
      id: '1',
      value: '7',
      label: 'On'
      // checked: false
    },
    {
      name: 'web',
      id: '2',
      value: '30',
      label: 'Off'
      // checked: false
    }
  ];

  const mobileRadio = [
    {
      name: 'mobile',
      id: '1',
      value: '7',
      label: 'On'
      // checked: false
    },
    {
      name: 'mobile',
      id: '2',
      value: '30',
      label: 'Off'
      // checked: false
    }
  ];

  const emailRadio = [
    {
      name: 'email',
      id: '1',
      value: '7',
      label: 'On'
      // checked: false
    },
    {
      name: 'email',
      id: '2',
      value: '30',
      label: 'Off'
      // checked: false
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center mt-[16px]  min-h-[71vh]">
      <div className="w-[760px] flex flex-col gap-[16px]">
        <h1 className="text-neutral-900 text-headingS font-medium">
          Notification Preferences
        </h1>
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
                      onChange={() => {}}
                      customStyle={{ radio: '!text-mMedium !text-neutral900' }}
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
                        onChange={() => {}}
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
                        onChange={() => {}}
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
                        onChange={() => {}}
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
      </div>
      <div className="h-[72px] w-[1136px] bg-neutral0 border-[1px] border-solid border-neutral200  sticky bottom-0 rounded-t-[8px] mt-auto p-[16px]">
        {' '}
        <ActionButton
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.myAccount.footer.cancel'),
              handler: () => {}
            },
            {
              variant: 'primary',
              label: ManageLocales('app.myAccount.footer.update'),
              handler: () => {}
            }
          ]}
        />
      </div>
    </div>
  );
};

export default NotificationPrefrences;
