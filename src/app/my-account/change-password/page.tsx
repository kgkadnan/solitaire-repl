"use client"
import { CustomInputField } from '@/components/common/input-field';
import React, { useState } from 'react';
import style from './change-password.module.scss';
const ChangePassword = () => {
  const [currentPasswordVisible,setCurrentPasswordVisible] =useState(true)
  const [newPasswordVisible,setNewPasswordVisible] =useState(false)
  const [confirmPasswordVisible,setConfirmPasswordVisible] =useState(false)
  return (
    <div className={style.changePassword}>
      <div className={style.changePasswordContainer}>
        <CustomInputField
           type={`${currentPasswordVisible? 'text':'password'}`}
          name={'current password'}
          placeholder="Current Password"
          style={{
            inputMain: style.inputContainerStyles,
            input: style.inputStyles,
          }}
        />
        <CustomInputField
          type={`${newPasswordVisible? 'text':'password'}`}
          name={'new password'}
          placeholder="New Password"
          style={{
            inputMain: style.inputContainerStyles,
            input: style.inputStyles,
          }}
        />
        <CustomInputField
           type={`${confirmPasswordVisible? 'text':'password'}`}
          name={'confirm password'}
          placeholder="Confirm Password"
          style={{
            inputMain: style.inputContainerStyles,
            input: style.inputStyles,
          }}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
