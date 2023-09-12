import { CustomInputField } from '@/components/common/input-field'
import React from 'react'
import style from './change-password.module.scss'
const ChangePassword = () => {
  return (
    <div className={style.changePassword}>
        <div className={style.changePasswordContainer}>
          <CustomInputField type={'text'} name={'current password'} placeholder='Current Password' style={{inputMain:style.inputContainerStyles,input:style.inputStyles}}/>
          <CustomInputField type={'text'} name={'current password'} placeholder='Current Password' style={{inputMain:style.inputContainerStyles,input:style.inputStyles}}/>
          <CustomInputField type={'text'} name={'current password'} placeholder='Current Password' style={{inputMain:style.inputContainerStyles,input:style.inputStyles}}/>
        </div>
    </div>
  )
}

export default ChangePassword