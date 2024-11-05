import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  IRegisterSetState,
  IRegisterState
  // IToken
} from '@/app/v2/register/interface';
// import { IOtp } from '@/components/v2/common/otp-verication';
import RegisterComponent from '@/app/v2/register/component/register';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';

const store = setupStore();

// Mock implementations for required props
const mockRegisterSetState: IRegisterSetState = {
  setRegisterFormState: () => {},
  setRegisterFormErrors: () => {}
};

const mockRegisterState: IRegisterState = {
  registerFormState: {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    countryCode: '',
    iso: '',
    referralName: ''
  },
  registerFormErrors: {
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    countryCode: '',
    iso: '',
    referralName: ''
  }
};

const mockSetState = (_value: any) => {};
const mockSetDialogContent = (_value: any) => {};
// const mockSetToken = (_value: IToken) => {};
// const mockSetOTPVerificationFormState = (_value: IOtp) => {};
const mockSetIsLoading = (_value: boolean) => {};

export default {
  title: 'Modules/Auth/RegisterComponent',
  component: RegisterComponent,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ]
} as ComponentMeta<typeof RegisterComponent>;

const Template: ComponentStory<typeof RegisterComponent> = args => (
  <RegisterComponent {...args} />
);

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">Register Component</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">Register Component</code>{' '}
        allows users to register using either their phone number or email. It
        includes form validation and error handling.
      </p>
      <h2 className="text-xl text-gray-800 mt-5">Usage</h2>
      <button
        className="bg-blue-500 text-white border-none py-1 px-2 rounded cursor-pointer mt-2"
        onClick={() => setShowCode(!showCode)}
      >
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>
      {showCode && (
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto mt-5">
          {`<RegisterComponent
            registerSetState={mockRegisterSetState}
            registerState={mockRegisterState}
            register={() => {}}
            setCurrentState={mockSetState}
            setRole={mockSetState}
            setToken={mockSetToken}
            setIsDialogOpen={mockSetState}
            setDialogContent={mockSetDialogContent}
            setOTPVerificationFormState={mockSetOTPVerificationFormState}
            setIsLoading={mockSetIsLoading}
          />`}
        </pre>
      )}
      <h2 className="text-xl text-gray-800 mt-5">Props</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="bg-gray-100 text-gray-800 p-3 border">Prop</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">Type</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border text-gray-700">registerSetState</td>
            <td className="p-3 border text-gray-700">IRegisterSetState</td>
            <td className="p-3 border text-gray-700">
              Functions to update the registration form state and errors
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">registerState</td>
            <td className="p-3 border text-gray-700">IRegisterState</td>
            <td className="p-3 border text-gray-700">
              Current state of the registration form and associated errors
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">register</td>
            <td className="p-3 border text-gray-700">() =&gt ;void</td>
            <td className="p-3 border text-gray-700">
              Function to handle the registration process
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setCurrentState</td>
            <td className="p-3 border text-gray-700">(value: any) = void</td>
            <td className="p-3 border text-gray-700">
              Function to update the current state
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setRole</td>
            <td className="p-3 border text-gray-700">
              (value: any) =&gt ;void
            </td>
            <td className="p-3 border text-gray-700">
              Function to update the user role
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setToken</td>
            <td className="p-3 border text-gray-700">
              (value: IToken) =&gt ;void
            </td>
            <td className="p-3 border text-gray-700">
              Function to set the authentication token
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setIsDialogOpen</td>
            <td className="p-3 border text-gray-700">
              (value: any) =&gt ;void
            </td>
            <td className="p-3 border text-gray-700">
              Function to set the dialog's open state
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setDialogContent</td>
            <td className="p-3 border text-gray-700">
              (value: any) =&gt ;void
            </td>
            <td className="p-3 border text-gray-700">
              Function to set the content of the dialog
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">
              setOTPVerificationFormState
            </td>
            <td className="p-3 border text-gray-700">
              (value: IOtp) =&gt ;void
            </td>
            <td className="p-3 border text-gray-700">
              Function to set the OTP verification form state
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setIsLoading</td>
            <td className="p-3 border text-gray-700">
              (value: boolean) =&gt ;void
            </td>
            <td className="p-3 border text-gray-700">
              Function to set the loading state
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const Register = Template.bind({});
Register.args = {
  registerSetState: mockRegisterSetState,
  registerState: mockRegisterState,
  register: () => {},
  setCurrentState: mockSetState,
  setRole: mockSetState,
  // setToken: mockSetToken,
  setIsDialogOpen: mockSetState,
  setDialogContent: mockSetDialogContent,
  // setOTPVerificationFormState: mockSetOTPVerificationFormState,
  setIsLoading: mockSetIsLoading
};
