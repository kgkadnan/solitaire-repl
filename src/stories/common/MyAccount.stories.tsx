import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import MyAccount from '@/app/v2/my-account/page';
import { setupStore } from '@/store';

export default {
  title: 'Modules/Auth/MyAccount',
  component: MyAccount,
  decorators: [
    Story => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    )
  ],
} as ComponentMeta<typeof MyAccount>;

// Template for the component
const Template: ComponentStory<typeof MyAccount> = (args) => <MyAccount {...args} />;

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">My Account</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">My Account</code> 
        component allows users to view and manage their account information, including personal details, KYC status, and preferences. 
        It supports functionalities such as uploading profile photos, changing passwords, managing notification preferences, and reviewing privacy policies and terms and conditions.
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
          {`<MyAccount
            userAccountInfo={mockUserAccountInfo}
            activeTab="TABLE_PREFRENCES"
            imageUrl="https://example.com/photo.jpg"
          />`}
        </pre>
      )}
      <h2 className="text-xl text-gray-800 mt-5">Props</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="bg-gray-100 text-gray-800 p-3 border">Prop</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">Type</th>
            <th className="bg-gray-100 text-gray-800 p-3 border">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border text-gray-700">userAccountInfo</td>
            <td className="p-3 border text-gray-700">IUserAccountInfo</td>
            <td className="p-3 border text-gray-700">
              The user's account information, including personal details (first name, last name, email, phone), KYC status, and account metadata.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">activeTab</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              The currently active tab in the component. Possible values include 'TABLE_PREFRENCES', 'CHANGE_PASSWORD', 'NOTIFICATION_PREFRENCES', 'TERM_AND_CONDITION', 'PRIVACY_POLICY', and 'PROFILE_UPDATE'.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">imageUrl</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              The URL of the user's profile photo. If not provided, a default image is shown. This is useful for scenarios where users may upload or change their profile picture.
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="text-xl text-gray-800 mt-5">Tabs Overview</h2>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">My Account</code> component contains the following tabs:
      </p>
      <ul className="list-disc ml-5 mt-2">
        <li><strong>Table Preferences:</strong> Manage table preferences and settings.</li>
        <li><strong>Change Password:</strong> Update the account password.</li>
        <li><strong>Notifications Preferences:</strong> Configure notification settings.</li>
        <li><strong>Privacy Policy:</strong> View and manage privacy policy settings.</li>
        <li><strong>Terms and Conditions:</strong> Review terms and conditions.</li>
        <li><strong>Profile Update:</strong> Update profile details and upload a new profile photo.</li>
      </ul>
    </div>
  );
};

// Default story with no user data
export const Default = Template.bind({});
Default.args = {};

// Story with user data and KYC status pending
export const KycPending = Template.bind({});
KycPending.args = {
  userAccountInfo: {
    customer: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      kyc: { status: 'PENDING' },
    },
  },
};

// Story with user data and KYC status approved
export const KycApproved = Template.bind({});
KycApproved.args = {
  userAccountInfo: {
    customer: {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      phone: '098-765-4321',
      kyc: { status: 'APPROVED' },
    },
  },
};

// Story with user data and KYC status rejected
export const KycRejected = Template.bind({});
KycRejected.args = {
  userAccountInfo: {
    customer: {
      first_name: 'Alice',
      last_name: 'Johnson',
      email: 'alice.johnson@example.com',
      phone: '555-555-5555',
      kyc: { status: 'REJECTED' },
    },
  },
};

// Story with profile update tab active
export const ProfileUpdateTab = Template.bind({});
ProfileUpdateTab.args = {
  activeTab: 'PROFILE_UPDATE',
  imageUrl: '',
};

// Story showing the table preferences tab
export const TablePreferencesTab = Template.bind({});
TablePreferencesTab.args = {
  activeTab: 'TABLE_PREFRENCES',
};

// Story showing the change password tab
export const ChangePasswordTab = Template.bind({});
ChangePasswordTab.args = {
  activeTab: 'CHANGE_PASSWORD',
};

// Story showing the notifications preferences tab
export const NotificationsPreferencesTab = Template.bind({});
NotificationsPreferencesTab.args = {
  activeTab: 'NOTIFICATION_PREFRENCES',
};

// Story showing the terms and conditions tab
export const TermsAndConditionsTab = Template.bind({});
TermsAndConditionsTab.args = {
  activeTab: 'TERM_AND_CONDITION',
};

// Story showing the privacy policy tab
export const PrivacyPolicyTab = Template.bind({});
PrivacyPolicyTab.args = {
  activeTab: 'PRIVACY_POLICY',
};