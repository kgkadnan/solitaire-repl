'use client';
import { CustomInputField } from '@/components/common/input-field';
import React, { useState } from 'react';
import style from './change-password.module.scss';
import EyeSlash from '@public/assets/icons/eye-off-outline.svg?url';
import Eye from '@public/assets/icons/eye-outline.svg?url';
import validatePassword from '@/utils/validate-password';
import { ManageLocales } from '@/utils/translate';
import { CustomFooter } from '@/components/common/footer';
import { useChangePasswordMutation } from '@/features/api/change-password';
const ChangePassword = () => {
  // State variables for password visibility and input values
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(true);
  const [newPasswordVisible, setNewPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [newPasswordError, setNewPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [currentPasswordError, setCurrentPasswordError] = useState<string>('');

  // Handle cancel button click
  const handleCancel = () => {
    // Clear input values and error messages
    setNewPassword('');
    setConfirmPassword('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    setCurrentPassword('');
    setCurrentPasswordVisible(true);
    setNewPasswordVisible(true);
    setConfirmPasswordVisible(true);
  };

  // Use the ChangePassword mutation hook
  const [ChangePassword] = useChangePasswordMutation();

  // Handle change password button click
  const handleChangePassword = async () => {
    // Call the ChangePassword mutation
    await ChangePassword({
      new_password: newPassword,
      confirm_password: confirmPassword,
      password: currentPassword
    });
    // Clear input values and error messages
    setCurrentPassword('');
    setCurrentPasswordError('');
    setCurrentPasswordVisible(true);
    setNewPassword('');
    setNewPasswordError('');
    setNewPasswordVisible(true);
    setConfirmPassword('');
    setConfirmPasswordError('');
    setConfirmPasswordVisible(true);
  };

  return (
    <>
      <div className={style.changePassword}>
        <div className={style.changePasswordContainer}>
          {/* Input for current password */}
          <div className={style.passwordInputWrapper}>
            <CustomInputField
              type={`${currentPasswordVisible ? 'text' : 'password'}`}
              name={'current password'}
              placeholder="Current Password"
              style={{
                inputMain: style.inputContainerStyles,
                input: style.inputStyles
              }}
              value={currentPassword}
              onChange={e => {
                setCurrentPassword(e.target.value);
                // Validate the current password
                !validatePassword(e.target.value)
                  ? setCurrentPasswordError('invalid new password')
                  : setCurrentPasswordError('');
              }}
            />
            {/* Toggle visibility icon for current password */}
            <div
              className={style.togglePassword}
              onClick={() => setCurrentPasswordVisible(!currentPasswordVisible)}
            >
              {currentPasswordVisible ? <Eye /> : <EyeSlash />}
            </div>
          </div>
          {/* Display error message for current password */}
          <p className={style.errorMessage}>{currentPasswordError}</p>

          {/* Input for new password */}
          <div className={style.passwordInputWrapper}>
            <CustomInputField
              type={`${newPasswordVisible ? 'text' : 'password'}`}
              name={'new password'}
              placeholder="New Password"
              style={{
                inputMain: style.inputContainerStyles,
                input: style.inputStyles
              }}
              onChange={e => {
                setNewPassword(e.target.value);
                !validatePassword(e.target.value)
                  ? setNewPasswordError('invalid new password')
                  : setNewPasswordError('');
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
                input: style.inputStyles
              }}
              onChange={e => {
                setConfirmPassword(e.target.value);
                !validatePassword(e.target.value)
                  ? setConfirmPasswordError('invalid confirm password')
                  : setConfirmPasswordError('');
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
              fn: handleChangePassword
            },
            {
              id: 2,
              displayButtonLabel: ManageLocales('app.changePassword.cancel'),
              style: style.transparent,
              fn: handleCancel
            }
          ]}
        />
      </div>
    </>
  );
};

export default ChangePassword;
