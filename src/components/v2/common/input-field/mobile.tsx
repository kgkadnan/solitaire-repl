import React from 'react';
import { InputField } from '../input-field';

export const MobileInput = ({ errorText }: any) => {
  return (
    <>
      <div className={`flex ${errorText ? 'mb-[5px]' : 'mb-[16px]'}`}>
        <div className="flex items-center">
          <div className="">
            <div>hi</div>
          </div>
          <InputField
            label={'kkk'}
            onChange={
              () => {}
              // event =>
              //   handleRegisterChange({
              //     event,
              //     setRegisterFormState,
              //     setRegisterFormErrors,
              //     registerFormState
              //   })
            }
            type="number"
            name="mobileNumber"
            value={'registerFormState.mobileNumber'}
            errorText={'registerFormErrors.mobileNumber'}
          />
        </div>
      </div>
      {errorText && (
        <p className="text-dangerMain text-sRegular font-regular mb-[5px]">
          {errorText}
        </p>
      )}
    </>
  );
};
