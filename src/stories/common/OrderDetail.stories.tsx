import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import OrderDetail from '@/app/v2/your-orders/components/order-detail';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
const store = setupStore();

// Mocked data
const mockProductDetailData = {
  id: '12345',
  display_id: '000001',
  invoice_id: 'INV-000001',
  created_at: '2024-07-01T12:00:00Z',
  items: [
    { product: { id: 'p1', name: 'Diamond 1' } },
    { product: { id: 'p2', name: 'Diamond 2' } }
  ],
  total: 1500,
  comments: 'This is a comment'
};

const Template: Story<any> = args => <OrderDetail {...args} />;

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">OrderDetail Component</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">OrderDetail</code>{' '}
        Component is used to display detailed information about a specific
        order. It includes various features like displaying product details,
        handling image modals, downloading data as Excel files, and navigating
        between different views.
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
          {`<OrderDetail
              goBackToListView={mockGoBackToListView}
              productDetailData={mockProductDetailData}
              breadCrumLabel="Order Details"
              modalSetState={mockModalSetState}
              setIsLoading={mockSetIsLoading}
              router={mockRouter}
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
            <td className="p-3 border text-gray-700">goBackToListView</td>
            <td className="p-3 border text-gray-700">() =&gt ;void</td>
            <td className="p-3 border text-gray-700">
              Function to navigate back to the list view.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">productDetailData</td>
            <td className="p-3 border text-gray-700">any</td>
            <td className="p-3 border text-gray-700">
              Data object containing details of the product to be displayed.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">breadCrumLabel</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Label used in the breadcrumb navigation.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">modalSetState</td>
            <td className="p-3 border text-gray-700">any</td>
            <td className="p-3 border text-gray-700">
              State setter function for the modal's state.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setIsLoading</td>
            <td className="p-3 border text-gray-700">
              (value: boolean) =&gt ;void
            </td>
            <td className="p-3 border text-gray-700">
              Function to set the loading state.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">router</td>
            <td className="p-3 border text-gray-700">any</td>
            <td className="p-3 border text-gray-700">
              Router object used for navigation.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default {
  title: 'Modules/YourOrder/OrderDetail',
  component: OrderDetail,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ],
  argTypes: {
    goBackToListView: { action: 'goBackToListView' },
    modalSetState: { action: 'modalSetState' },
    setIsLoading: { action: 'setIsLoading' },
    router: { action: 'router' }
  }
} as Meta;

export const OrderDetailComponent = Template.bind({});
OrderDetailComponent.args = {
  productDetailData: mockProductDetailData,
  breadCrumLabel: 'Order Details',
  goBackToListView: () => {},
  modalSetState: () => {},
  setIsLoading: () => {},
  router: {}
};
