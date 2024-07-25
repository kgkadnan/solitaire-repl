import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import ForgotPassword from '@/app/v2/forgot-password/page';

const store = setupStore();

export default {
  title: 'Modules/Auth/ForgotPassword',
  component: ForgotPassword,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof ForgotPassword>;

const Template: ComponentStory<typeof ForgotPassword> = (args) => <ForgotPassword />;
export const Docs = () => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">Forgot Password Component</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">ForgotPassword</code> component allows users to reset their password by entering their registered email address. The component will handle form validation and display appropriate messages.
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
          {`<ForgotPassword />`}
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
            <td className="p-3 border text-gray-700">None</td>
            <td className="p-3 border text-gray-700">N/A</td>
            <td className="p-3 border text-gray-700">This component does not require any props.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {};
