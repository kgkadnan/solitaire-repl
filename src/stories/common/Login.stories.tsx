import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import LoginComponent from '@/app/v2/login/component/login';
import { setupStore } from '@/store';

export default {
  title: 'Modules/Auth/LoginComponent',
  component: LoginComponent,
  decorators: [
    Story => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    )
  ],
  argTypes: {
    setPhoneNumber: { action: 'setPhoneNumber' },
    setPhoneErrorText: { action: 'setPhoneErrorText' },
    setPasswordErrorText: { action: 'setPasswordErrorText' },
    setPassword: { action: 'setPassword' },
    handleKeyDown: { action: 'handleKeyDown' },
    handleLogin: { action: 'handleLogin' },
    setEmail: { action: 'setEmail' },
    setEmailErrorText: { action: 'setEmailErrorText' },
    setLoginByEmail: { action: 'setLoginByEmail' }
  }
} as Meta;

const Template: Story = args => <LoginComponent {...args} />;

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">LoginComponent</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">LoginComponent</code>{' '}
        allows users to log in using either their phone number or email. It
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
        <div className="flex bg-gray-100 flex-row mt-5">
          <pre className="p-3 rounded overflow-x-auto w-1/2">
            {`<LoginComponent
              phoneNumber={{ mobileNumber: '' }}
              phoneErrorText=""
              password=""
              passwordErrorText=""
              currentCountryCode={{ country_calling_code: '+91' }}
              email=""
              emailErrorText=""
              loginByEmail={false}
            />`}
          </pre>
        </div>
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
            <td className="p-3 border text-gray-700">phoneNumber</td>
            <td className="p-3 border text-gray-700">object</td>
            <td className="p-3 border text-gray-700">
              The phone number object containing the mobile number
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">phoneErrorText</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Error text for phone number validation
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">password</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              The password entered by the user
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">passwordErrorText</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Error text for password validation
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">currentCountryCode</td>
            <td className="p-3 border text-gray-700">object</td>
            <td className="p-3 border text-gray-700">
              The current country code object
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">email</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              The email address entered by the user
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">emailErrorText</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Error text for email validation
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">loginByEmail</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Flag to indicate if the user is logging in by email
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const byMobile = Template.bind({});
byMobile.args = {
  phoneNumber: { mobileNumber: '' },
  phoneErrorText: '',
  password: '',
  passwordErrorText: '',
  currentCountryCode: { country_calling_code: '+91' },
  email: '',
  emailErrorText: '',
  loginByEmail: false
};
export const byEmail = Template.bind({});
byEmail.args = {
  phoneNumber: { mobileNumber: '' },
  phoneErrorText: '',
  password: '',
  passwordErrorText: '',
  currentCountryCode: { country_calling_code: '+91' },
  email: '',
  emailErrorText: '',
  loginByEmail: true
};