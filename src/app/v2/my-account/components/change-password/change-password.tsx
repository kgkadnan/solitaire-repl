import ActionButton from '@/components/v2/common/action-button';
import { PasswordField } from '@/components/v2/common/input-field/password';
import {
  PASSWORD_NOT_MATCH,
  MINIMUM_CHAR_PASSWORD,
  REQUIRED_FIELD
} from '@/constants/error-messages/change-password';
import { PASSWORD_REGEX } from '@/constants/validation-regex/regex';
import { useChangePasswordMutation } from '@/features/api/change-password';
import { ManageLocales } from '@/utils/v2/translate';
import Image from 'next/image';
import React, { useState } from 'react';
import confirmIcon from '@public/v2/assets/icons/modal/confirm.svg';
import useUser from '@/lib/use-auth';
import { useRouter } from 'next/navigation';
import errorSvg from '@public/v2/assets/icons/modal/error.svg';
const initialFormState = {
  password: '',
  newPassword: '',
  confirmPassword: ''
};

export interface IChangePassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
const ChangePassword = ({ modalSetState }: any) => {
  const [changePasswordState, setChangePasswordState] =
    useState(initialFormState);
  const [changePasswordFormErrors, setChangePasswordFormErrors] =
    useState(initialFormState);

  const { setDialogContent, setIsDialogOpen } = modalSetState;

  // Use the ChangePassword mutation hook
  const [ChangePassword] = useChangePasswordMutation();

  const validateField = ({ name, value, setFormErrors, formState }: any) => {
    let error = '';

    // Validation logic
    if (value.trim() === '') {
      error = REQUIRED_FIELD;
    } else {
      switch (name) {
        // Inside your form validation logic
        case 'newPassword':
          if (!PASSWORD_REGEX.test(value)) {
            error = MINIMUM_CHAR_PASSWORD;
          }
          // Clear confirmPassword error if it was set
          setFormErrors((prev: any) => ({
            ...prev,
            confirmPassword: ''
          }));
          if (
            formState.confirmPassword &&
            value !== formState.confirmPassword
          ) {
            error = PASSWORD_NOT_MATCH;
            // Set confirmPassword error
            setFormErrors((prev: any) => ({
              ...prev,
              confirmPassword: PASSWORD_NOT_MATCH
            }));
          }
          break;

        case 'confirmPassword':
          if (!PASSWORD_REGEX.test(value)) {
            error = MINIMUM_CHAR_PASSWORD;
          }
          // Clear password error if it was set
          setFormErrors((prev: any) => ({
            ...prev,
            newPassword: ''
          }));
          if (value !== formState.newPassword) {
            error = PASSWORD_NOT_MATCH;
            // Set newPassword error
            setFormErrors((prev: any) => ({
              ...prev,
              newPassword: PASSWORD_NOT_MATCH
            }));
          }
          break;

        default:
          break;
      }
    }

    setFormErrors((prevErrors: any) => ({ ...prevErrors, [name]: error }));
    return error;
  };

  const handleChangePassword = ({
    event,
    setChangePasswordFormErrors,
    setChangePasswordState
  }: any) => {
    const { name, value } = event.target;
    setChangePasswordState((prev: any) => ({ ...prev, [name]: value }));
    setChangePasswordFormErrors((prev: any) => ({ ...prev, [name]: '' }));
  };

  const { userLoggedOut } = useUser();
  const router = useRouter();

  const validateAllFields = ({ formState, setFormErrors }: any) => {
    let errors: IChangePassword = { ...initialFormState };
    let isValid = true;

    // Validate each field
    Object.keys(formState).forEach(key => {
      const fieldError = validateField({
        name: key,
        value: formState[key as keyof IChangePassword],
        setFormErrors,
        formState
      });

      if (fieldError) {
        isValid = false;
        errors = { ...errors, [key]: fieldError };
      }
    });

    setFormErrors(errors);
    return isValid;
  };

  const handleUpdatePassword = async () => {
    const isFormValid = validateAllFields({
      formState: changePasswordState,
      setFormErrors: setChangePasswordFormErrors
    }); // Validate all fields

    if (!isFormValid) return;
    await ChangePassword({
      new_password: changePasswordState.newPassword,
      confirm_password: changePasswordState.confirmPassword,
      password: changePasswordState.password
    })
      .unwrap()
      .then(() => {
        userLoggedOut();
        setIsDialogOpen(true);
        setDialogContent(
          <>
            <div className="absolute left-[-84px] top-[-84px]">
              <Image src={confirmIcon} alt="confirmIcon" />
            </div>
            <div className="absolute bottom-[30px] flex flex-col gap-[15px] w-[352px]">
              <div>
                <h1 className="text-headingS text-neutral900">
                  Your password has been changed successfully
                </h1>
              </div>
              <ActionButton
                actionButtonData={[
                  {
                    variant: 'secondary',
                    label: ManageLocales('app.modal.login'),
                    handler: () => {
                      router.push('/v2/login');
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
        setIsDialogOpen(true); // Show error dialog
        setDialogContent(
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
                    variant: 'secondary',
                    label: ManageLocales('app.modal.okay'),
                    handler: () => {
                      setIsDialogOpen(false);
                    },
                    customStyle: 'flex-1 w-full h-10'
                  }
                ]}
              />
            </div>
          </>
        );
      });
    setChangePasswordState(initialFormState);
    setChangePasswordFormErrors(initialFormState);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-[16px] ">
      <div className="w-[760px] flex flex-col gap-[16px]">
        <h1 className="text-neutral-900 text-headingS font-medium">
          Change Password
        </h1>
        <div className="bg-neutral0 flex flex-col justify-center px-[194px] py-[24px] items-center rounded-[8px] border-solid border-[1px] border-neutral-200 shadow-sm">
          <div className="w-[374px] flex flex-col gap-[24px]">
            <PasswordField
              label={'Current Password'}
              onChange={event =>
                handleChangePassword({
                  event,
                  setChangePasswordState,
                  setChangePasswordFormErrors
                })
              }
              name="password"
              isConfirmPassword={true}
              value={changePasswordState.password}
              errorText={changePasswordFormErrors.password}
              placeholder={'Enter Current password'}
            />
            {/* <div> */}
            <PasswordField
              label={'New Password'}
              onChange={event =>
                handleChangePassword({
                  event,
                  setChangePasswordState,
                  setChangePasswordFormErrors
                })
              }
              name="newPassword"
              value={changePasswordState.newPassword}
              errorText={changePasswordFormErrors.newPassword}
              isFromChangePassword={true}
              placeholder={'Enter new password'}
            />
            {/* Input field for confirm password */}
            <PasswordField
              label={'Confirm password'}
              onChange={event =>
                handleChangePassword({
                  event,
                  setChangePasswordState,
                  setChangePasswordFormErrors
                })
              }
              name="confirmPassword"
              value={changePasswordState.confirmPassword}
              errorText={changePasswordFormErrors.confirmPassword}
              placeholder={'Confirm your password'}
              isConfirmPassword={true}
            />
          </div>
        </div>
      </div>
      <div className="h-[72px] w-[1136px]  bg-neutral0 border-[1px] border-solid border-neutral200 bottom-[-57%] absolute   rounded-t-[8px] p-[16px]">
        {' '}
        <ActionButton
          actionButtonData={[
            {
              variant: 'secondary',
              label: ManageLocales('app.myAccount.footer.cancel'),
              handler: () => {
                setChangePasswordState(initialFormState);
                setChangePasswordFormErrors(initialFormState);
              }
            },
            {
              variant: 'primary',
              label: ManageLocales('app.myAccount.footer.updatePassword'),
              handler: () => handleUpdatePassword()
            }
          ]}
        />
      </div>
    </div>
  );
};

export default ChangePassword;
