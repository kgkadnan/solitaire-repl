import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import BidToBuy from '@/app/v2/bid-2-buy/page';

const store = setupStore();

export default {
  title: 'Modules/BidToBuy/BidToBuy',
  component: BidToBuy,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ]
} as ComponentMeta<typeof BidToBuy>;

const Template: ComponentStory<typeof BidToBuy> = args => (
  <BidToBuy {...args} />
);

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">BidToBuy Component</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">BidToBuy</code> component
        allows users to place bids on items they wish to purchase. It includes
        features for viewing item details, placing bids, and managing bid
        status, such as pending, accepted, or rejected.
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
            {`<BidToBuy
              itemData={{
                itemId: 123,
                itemName: 'Sample Item',
                bids: []
              }}
              isLoading={false}
              isError={false}
              errorText=""
              onBid={handleBid}
            />`}
          </pre>
        </div>
      )}
      <h2 className="text-xl text-gray-800 mt-5">Props</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="bg-gray-100 text-gray-800 p-3 border text-left">
              Prop
            </th>
            <th className="bg-gray-100 text-gray-800 p-3 border text-left">
              Type
            </th>
            <th className="bg-gray-100 text-gray-800 p-3 border text-left">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3 border text-gray-700">itemData</td>
            <td className="p-3 border text-gray-700">object</td>
            <td className="p-3 border text-gray-700">
              Contains the item ID, name, and current bids.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">isLoading</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Indicates if the item data is currently loading.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">isError</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Indicates if there was an error loading the item data.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">errorText</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              The error message to display if there is an error.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">onBid</td>
            <td className="p-3 border text-gray-700">function</td>
            <td className="p-3 border text-gray-700">
              Function to call when a bid is placed.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const BidToBuyComponent = Template.bind({});
BidToBuyComponent.args = {};
