import { CustomInputlabel } from '@/components/common/input-label';
import { ManageLocales } from '@/utils/translate';
import React from 'react';
import style from './summary.module.scss';
import User from '@public/assets/icons/user.svg?url';
import Phone from '@public/assets/icons/phone-call.svg?url';
import WhatsApp from '@public/assets/icons/whatsapp-icon.svg?url';
import Email from '@public/assets/icons/gmail.svg?url';

const Summary = () => {
  const keyManagerAccounts = [
    {
      name: 'Mr. Rajeev Sinha',
      designation: 'Sr. Sales Representative',
      address: 'KGK Group, Bharat Diamond Bourse, BKC D block, 2nd floor 207',
      contactNo: '+919108766432',
      whatsAppNo: '+919108766432',
      email: 'rajeevsinha@mail.com'
    },
    {
      name: 'Mr. Rajeev Sinha',
      designation: 'Sr. Sales Representative',
      address: 'KGK Group, Bharat Diamond Bourse, BKC D block, 2nd floor 207',
      contactNo: '+919108766432',
      whatsAppNo: '+919108766432',
      email: 'rajeevsinha@mail.com'
    }
  ];
  return (
    <>
      <div className={style.summaryContainer}>
        <CustomInputlabel
          htmlfor={''}
          label={ManageLocales('app.myaccount.summary.personalInformation')}
        />
        <div className={style.personalCard}>
          <div className={style.personalCardHeader}>Aman</div>
          <div>
            <p className={style.personalCardData}>
              {ManageLocales('app.myaccount.summary.contactNo')} : +919108766432
            </p>
            <p className={style.personalCardData}>
              {ManageLocales('app.myaccount.summary.emailID')} :
              amanwilson@mail.com
            </p>
          </div>
        </div>

        <hr className={style.dividerLine} />

        <CustomInputlabel
          htmlfor={''}
          label={ManageLocales('app.myaccount.summary.account')}
        />
        <div className={style.keyAccount}>Key Account Manager</div>
        <div className={style.keyAccountManagerCardContainer}>
          {keyManagerAccounts.map(manager => {
            return (
              <div
                className={`${style.personalCard} ${style.keyAccountManagerCard}`}
                key={manager.email} // add a unique key prop
              >
                <div className={style.userHeader}>
                  <div className={style.iconSpace}>
                    <User alt="User" />
                  </div>
                  {manager.name}
                </div>
                <div>
                  <p>{manager.designation}</p>
                  <p>{manager.address}</p>
                </div>
                <div className={style.keyAccountManagerSocials}>
                  <a
                    href={`tel:${manager.contactNo}`}
                    className={style.socials}
                  >
                    {' '}
                    <div className={style.iconSpace}>
                      <Phone alt="Phone" />
                    </div>{' '}
                    {manager.contactNo}
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${manager.whatsAppNo}`}
                    className={style.socials}
                    target="blank"
                  >
                    {' '}
                    <div className={style.iconSpace}>
                      <WhatsApp alt="WhatsApp" />
                    </div>
                    {manager.whatsAppNo}
                  </a>
                  <a href={`mailto:${manager.email}`} className={style.socials}>
                    {' '}
                    <div className={style.iconSpace}>
                      <Email alt="Email" />
                    </div>
                    {manager.email}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <hr className={style.dividerLine} />
      </div>
    </>
  );
};

export default Summary;
