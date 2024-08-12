import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import NewArrivalCalculatedField from '@/app/v2/new-arrivals/components/new-arrival-calculated-field';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';

export default {
  title: 'Modules/NewArrival/NewArrivalCalculatedField',
  component: NewArrivalCalculatedField,
  decorators: [
    Story => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    )
  ]
} as Meta;

const rows = [
  { id: '1', price: 100, carats: 2.5, rap_value: 80 },
  { id: '2', price: 150, carats: 3.0, rap_value: 100 },
  { id: '3', price: 200, carats: 2.0, rap_value: 90 }
];

const selectedProducts = {
  '1': true,
  '2': false,
  '3': true
};

const Template: Story<any> = (args: any) => (
  <NewArrivalCalculatedField {...args} />
);

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">NewArrivalCalculatedField</h1>
      <p className="text-base text-gray-600">
        The{' '}
        <code className="bg-gray-200 p-1 rounded">
          NewArrivalCalculatedField
        </code>{' '}
        component displays calculated fields for new arrivals.
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
          {`<NewArrivalCalculatedField
  rows={rows}
  selectedProducts={selectedProducts}
  showMyCurrentBid={false}
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
            <td className="p-3 border text-gray-700">rows</td>
            <td className="p-3 border text-gray-700">Array</td>
            <td className="p-3 border text-gray-700">
              Array of row objects with id, price, carats, and rap_value.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">selectedProducts</td>
            <td className="p-3 border text-gray-700">Object</td>
            <td className="p-3 border text-gray-700">
              Object containing selected product ids.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">showMyCurrentBid</td>
            <td className="p-3 border text-gray-700">Boolean</td>
            <td className="p-3 border text-gray-700">
              Flag to show or hide the current bid.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  rows,
  selectedProducts,
  showMyCurrentBid: false
};

export const WithCurrentBid = Template.bind({});
WithCurrentBid.args = {
  rows,
  selectedProducts,
  showMyCurrentBid: true
};

export const EmptySelection = Template.bind({});
EmptySelection.args = {
  rows,
  selectedProducts: {},
  showMyCurrentBid: false
};

export const NoRows = Template.bind({});
NoRows.args = {
  rows: [],
  selectedProducts: {},
  showMyCurrentBid: false
};
