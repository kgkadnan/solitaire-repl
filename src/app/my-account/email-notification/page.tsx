'use client';
import { CustomCheckBox } from '@/components/common/checkbox';
import { CustomFooter } from '@/components/common/footer';
import { ManageLocales } from '@/utils/translate';
import React from 'react';
import styles from './email-notification.module.scss';

let EmailNotificationData = [
  {
    id: '1',
    notificationName: ManageLocales(
      'app.myaccount.emailNotification.newArrival'
    ),
  },
  {
    id: '2',
    notificationName: ManageLocales('app.myaccount.emailNotification.bidToBuy'),
  },
  {
    id: '3',
    notificationName: ManageLocales('app.myaccount.emailNotification.forYou'),
  },
  {
    id: '4',
    notificationName: ManageLocales(
      'app.myaccount.emailNotification.newsletter'
    ),
  },
];

const EmailNotification = () => {
  const handleSave = () => {};
  const handleCancel = () => {};

  //checkbox function
  const handleCheckbox = (e: any) => {};

  const footerButtonData = [
    {
      id: 1,
      displayButtonLabel: ManageLocales(
        'app.myaccount.emailNotification.footer.save'
      ),
      style: styles.transparent,
      fn: handleSave,
    },
    {
      id: 1,
      displayButtonLabel: ManageLocales(
        'app.myaccount.emailNotification.footer.cancel'
      ),
      style: styles.filled,
      fn: handleCancel,
    },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <div className="grow">
        <p className="w-full">
          Select subject and subscribe to get the latest updates and
          notifications on email
        </p>
        <div className="mt-[20px] w-[15%]">
          {EmailNotificationData.map(({ id, notificationName }) => {
            return (
              <div key={id} className="flex w-full justify-between mt-[30px]">
                <p className="text-solitaireTertiary text-base  font-thin">
                  {id}. {notificationName}
                </p>
                {/* <CustomCheckBox
                  data={id}
                  isChecked={isCheck}
                  setIsCheck={setIsCheck}
                  setIsCheckAll={setIsCheckAll}
                  isCheckAll={isCheckAll}
                  row={tableRows}
                  setIsError={setIsError}
                /> */}
              </div>
            );
          })}
        </div>
        <hr className="mt-6 border-1 border-solitaireSenary" />
      </div>

      <div className="sticky bottom-0 bg-solitairePrimary mt-3">
        <CustomFooter footerButtonData={footerButtonData} />
      </div>
    </div>
  );
};

export default EmailNotification;
