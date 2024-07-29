import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
import MyDiamonds from '@/app/v2/your-orders/page';
const store = setupStore();

// Mock the data and functions used in the MyDiamonds component
const mockData = {
  orders: [
    {
      id: 1,
      display_id: '123456',
      created_at: '2024-07-29T10:00:00Z',
      invoice_id: 'INV001',
      details: 'Order details',
    },
    {
      id: 2,
      display_id: '789012',
      created_at: '2024-07-28T10:00:00Z',
      invoice_id: 'INV002',
      details: 'Order details',
    },
  ],
};

export default {
  title: 'Modules/YourOrder/YourOrder',
  component: MyDiamonds,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story = (args) => <MyDiamonds {...args} />;

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">Orders Component</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">Orders</code>{' '} Component
        is responsible for displaying and managing user orders. It provides features
        for viewing, updating, and deleting orders with proper state management and error handling.
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
          {`<OrdersComponent
            orderList={mockOrderList}
            fetchOrders={mockFetchOrders}
            updateOrder={mockUpdateOrder}
            deleteOrder={mockDeleteOrder}
            setOrderStatus={mockSetOrderStatus}
            setOrderDetails={mockSetOrderDetails}
            isLoading={mockIsLoading}
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
            <td className="p-3 border text-gray-700">orderList</td>
            <td className="p-3 border text-gray-700">IOrder[]</td>
            <td className="p-3 border text-gray-700">
              Array of orders to be displayed in the component
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">fetchOrders</td>
            <td className="p-3 border text-gray-700">() => void</td>
            <td className="p-3 border text-gray-700">
              Function to fetch orders from the server
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">updateOrder</td>
            <td className="p-3 border text-gray-700">(orderId: string, data: IOrder) => void</td>
            <td className="p-3 border text-gray-700">
              Function to update a specific order
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">deleteOrder</td>
            <td className="p-3 border text-gray-700">(orderId: string) => void</td>
            <td className="p-3 border text-gray-700">
              Function to delete a specific order
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setOrderStatus</td>
            <td className="p-3 border text-gray-700">(orderId: string, status: string) => void</td>
            <td className="p-3 border text-gray-700">
              Function to update the status of an order
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setOrderDetails</td>
            <td className="p-3 border text-gray-700">(orderId: string, details: IOrderDetails) => void</td>
            <td className="p-3 border text-gray-700">
              Function to set the details of a specific order
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">isLoading</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Indicator for whether data is being loaded
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  
};


export const Loading = Template.bind({});
Loading.args = {
  
};

export const WithData = Template.bind({});
WithData.args = {

};