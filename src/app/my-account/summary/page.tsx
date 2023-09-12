import { CustomInputlabel } from '@/components/common/input-label';
import { ManageLocales } from '@/utils/translate';
import React from 'react';
import style from './summary.module.scss'
const Summary = () => {
  return (
    <div>
    <CustomInputlabel htmlfor={''} label={ManageLocales('app.myaccount.summary.personalInformation')}/>
    <div className={style.personalCard}>
      <div className={style.personalCardHeader}>Aman</div>
      <div>
        <p className={style.personalCardData}>{ManageLocales('app.myaccount.summary.contactNo')} : +919108766432</p>
        <p className={style.personalCardData}>{ManageLocales('app.myaccount.summary.emailID')} : amanwilson@mail.com</p>
      </div>
    </div>
    </div>
  );
};

export default Summary;
