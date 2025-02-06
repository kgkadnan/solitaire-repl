import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import Result from '@/app/v2/search/result/result';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';

export default {
  title: 'Modules/Search/Result',
  component: Result,
  decorators: [
    Story => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    )
  ],
  args: {}
} as Meta;

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">ResultComponent</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">ResultComponent</code> is
        used to display search results with options for adding comments and
        confirming selections. It manages dialog states for adding comments and
        confirmation.
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
          <pre className="p-3 rounded overflow-x-auto w-full">
            {`
  <Result
    isAddCommentDialogOpen={false}
    isDialogOpen={false}
    setIsAddCommentDialogOpen={() => {}}
    setIsDialogOpen={() => {}}
    handleConfirmStone={() => {}}
    isFetchProduct={false}
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
            <td className="p-3 border text-gray-700">isAddCommentDialogOpen</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Controls whether the add comment dialog is open or not.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">isDialogOpen</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Controls whether the confirmation dialog is open or not.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">
              setIsAddCommentDialogOpen
            </td>
            <td className="p-3 border text-gray-700">function</td>
            <td className="p-3 border text-gray-700">
              Function to set the add comment dialog open state.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setIsDialogOpen</td>
            <td className="p-3 border text-gray-700">function</td>
            <td className="p-3 border text-gray-700">
              Function to set the confirmation dialog open state.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">handleConfirmStone</td>
            <td className="p-3 border text-gray-700">function</td>
            <td className="p-3 border text-gray-700">
              Function to handle the confirmation of a stone selection.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Template: Story<typeof Result> = () => {
  return (
    <Result
      activeTab={1}
      searchParameters={''}
      setActiveTab={() => ''}
      handleCloseAllTabs={() => ''}
      handleCloseSpecificTab={() => ''}
      setSearchParameters={() => {}}
      setIsLoading={() => {}}
      setIsInputDialogOpen={() => {}}
      isFetchProduct={false}
    />
  );
};

export const ResultComponent = Template.bind({});
ResultComponent.args = {};
