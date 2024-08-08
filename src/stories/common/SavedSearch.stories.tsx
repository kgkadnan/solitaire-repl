import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import SavedSearch from '@/app/v2/search/saved-search/saved-search';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';

export default {
  title: 'Modules/Search/SavedSearch',
  decorators: [
    Story => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    )
  ],
  component: SavedSearch,
  args: {}
} as Meta;

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">SavedSearchComponent</h1>
      <p className="text-base text-gray-600">
        The{' '}
        <code className="bg-gray-200 p-1 rounded">SavedSearchComponent</code>{' '}
        allows users to save their search criteria. It includes a dialog for
        confirming saved searches and error handling.
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
    <SavedSearch
      isDialogOpen={false}
      isError={false}
      setIsDialogOpen={() => {}}
      setIsError={() => {}}
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
            <td className="p-3 border text-gray-700">isDialogOpen</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Controls whether the dialog is open or not.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">isError</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Indicates if there is an error state.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setIsDialogOpen</td>
            <td className="p-3 border text-gray-700">function</td>
            <td className="p-3 border text-gray-700">
              Function to set the dialog open state.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setIsError</td>
            <td className="p-3 border text-gray-700">function</td>
            <td className="p-3 border text-gray-700">
              Function to set the error state.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Template: Story<any> = args => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <SavedSearch
      {...args}
      isDialogOpen={isDialogOpen}
      isError={isError}
      setIsDialogOpen={setIsDialogOpen}
      setIsError={setIsError}
    />
  );
};

export const SavedSearchComponent = Template.bind({});
SavedSearchComponent.args = {};
