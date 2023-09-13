'use client';
import { CustomInputField } from '@/components/common/input-field';
import React, { useState } from 'react';
import style from './change-password.module.scss';
import EyeSlash from '@public/assets/icons/eye-off-outline.svg?url';
import Eye from '@public/assets/icons/eye-outline.svg?url';
import validatePassword from '@/utils/validate-password';
import { ManageLocales } from '@/utils/translate';
import { CustomFooter } from '@/components/common/footer';
const ChangePassword = () => {
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  const [currentPassword] = useState<string>('test');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [newPasswordError, setNewPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const handleCancel = () => {
    setNewPassword('');
    setConfirmPassword('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    setCurrentPasswordVisible(false);
    setNewPasswordVisible(true);
    setConfirmPasswordVisible(true);
  };
  return (
    <>
      <div className={style.changePassword}>
        <div className={style.changePasswordContainer}>
          <div className={style.passwordInputWrapper}>
            <CustomInputField
              type={`${currentPasswordVisible ? 'text' : 'password'}`}
              name={'current password'}
              placeholder="Current Password"
              style={{
                inputMain: style.inputContainerStyles,
                input: style.inputStyles,
              }}
              value={currentPassword}
              disable={true}
            />
            <div
              className={style.togglePassword}
              onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
            >
              {currentPasswordVisible ? <Eye /> : <EyeSlash />}
            </div>
          </div>

          <div className={style.passwordInputWrapper}>
            <CustomInputField
              type={`${newPasswordVisible ? 'text' : 'password'}`}
              name={'new password'}
              placeholder="New Password"
              style={{
                inputMain: style.inputContainerStyles,
                input: style.inputStyles,
              }}
              onChange={(e) => {
                setNewPassword(e.target.value);
                !validatePassword(e.target.value) ?
                  setNewPasswordError('invalid new password'):setNewPasswordError('')
              }}
              value={newPassword}
            />
            <div
              className={style.togglePassword}
              onClick={() => setNewPasswordVisible(!newPasswordVisible)}
            >
              {newPasswordVisible ? <Eye /> : <EyeSlash />}
            </div>
          </div>
          <p className={style.errorMessage}>{newPasswordError}</p>
          <div className={style.passwordInputWrapper}>
            <CustomInputField
              type={`${confirmPasswordVisible ? 'text' : 'password'}`}
              name={'confirm password'}
              placeholder="Confirm Password"
              style={{
                inputMain: style.inputContainerStyles,
                input: style.inputStyles,
              }}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                !validatePassword(e.target.value) ?
                  setConfirmPasswordError('invalid confirm password') :setConfirmPasswordError('')
              }}
              value={confirmPassword}
            />
            <div
              className={style.togglePassword}
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <Eye /> : <EyeSlash />}
            </div>
          </div>
          <p className={style.errorMessage}>{confirmPasswordError}</p>
        </div>
      </div>
      <div className="sticky bottom-0 bg-solitairePrimary mt-3">
        <CustomFooter
          footerButtonData={[
            {
              id: 1,
              displayButtonLabel: ManageLocales('app.changePassword'),
              style: style.filled,
              // fn: handleCancel,
            },
            {
              id: 2,
              displayButtonLabel: ManageLocales('app.changePassword.cancel'),
              style: style.transparent,
              fn: handleCancel,
            },
          ]}
        />
      </div>
    </>
  );
};

export default ChangePassword;
