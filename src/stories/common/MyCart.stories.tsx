import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import MyCart from '@/app/v2/my-cart/page';
import { setupStore } from '@/store';

// Mock data for testing purposes
const mockData = {
  rows: [
    { id: '1', lot_id: '12345', carats: 1.5, price_per_carat: 5000 },
    { id: '2', lot_id: '67890', carats: 2.0, price_per_carat: 6000 },
  ],
  columns: [
    { accessor: 'lot_id', label: 'Lot ID', short_label: 'Lot ID', sequence: 1 },
    { accessor: 'carats', label: 'Carats', short_label: 'Carats', sequence: 2 },
    { accessor: 'price_per_carat', label: 'Price/C', short_label: 'Price/C', sequence: 3 },
  ],
};

export default {
  title: 'Modules/MyCart/MyCart',
  component: MyCart,
  decorators: [
    Story => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    )
  ],
} as ComponentMeta;

const Template: ComponentStory = (args) => <MyCart {...args} />;

export const Docs = () => {
    const [showCode, setShowCode] = useState(false);
  
    return (
      <div className="font-sans mx-8 my-5 leading-7">
        <h1 className="text-2xl text-gray-800">MyCart Component</h1>
        <p className="text-base text-gray-600">
          The <code className="bg-gray-200 p-1 rounded">MyCart</code> component
          displays a list of items in the user's shopping cart. It includes
          features for handling item details, appointment booking, and error
          management.
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
              {`<MyCart
                dataTableState={{ rows: [], columns: [] }}
                isLoading={false}
                isError={false}
                errorText=""
                cartItems={[]}
                cartdata={[]}
                images={[]}
                validImages={[]}
                rowSelection={{}}
                confirmStoneData={[]}
                appointmentPayload={[]}
                lotIds={[]}
                isDetailPage={false}
                showAppointmentForm={false}
                isConfirmStone={false}
                isDialogOpen={false}
                isAddCommentDialogOpen={false}
                activeTab="active"
            />`}
            </pre>
          </div>
        )}
        <h2 className="text-xl text-gray-800 mt-5">Props</h2>
        <table className="w-full border-collapse mt-5">
          <thead>
            <tr>
              <th className="bg-gray-100 text-gray-800 p-3 border text-left">Prop</th>
              <th className="bg-gray-100 text-gray-800 p-3 border text-left">Type</th>
              <th className="bg-gray-100 text-gray-800 p-3 border text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border text-gray-700">dataTableState</td>
              <td className="p-3 border text-gray-700">object</td>
              <td className="p-3 border text-gray-700">
                Contains the rows and columns for the data table.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">isLoading</td>
              <td className="p-3 border text-gray-700">boolean</td>
              <td className="p-3 border text-gray-700">
                Indicates if the data is currently loading.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">isError</td>
              <td className="p-3 border text-gray-700">boolean</td>
              <td className="p-3 border text-gray-700">
                Indicates if there is an error.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">errorText</td>
              <td className="p-3 border text-gray-700">string</td>
              <td className="p-3 border text-gray-700">
                Error message to be displayed if there is an error.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">cartItems</td>
              <td className="p-3 border text-gray-700">array</td>
              <td className="p-3 border text-gray-700">
                Array of items in the cart.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">cartdata</td>
              <td className="p-3 border text-gray-700">array</td>
              <td className="p-3 border text-gray-700">
                Data related to the cart items.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">images</td>
              <td className="p-3 border text-gray-700">array</td>
              <td className="p-3 border text-gray-700">
                Array of image objects for the items.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">validImages</td>
              <td className="p-3 border text-gray-700">array</td>
              <td className="p-3 border text-gray-700">
                Array of valid images to be displayed in the modal.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">rowSelection</td>
              <td className="p-3 border text-gray-700">object</td>
              <td className="p-3 border text-gray-700">
                Object containing selected rows.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">confirmStoneData</td>
              <td className="p-3 border text-gray-700">array</td>
              <td className="p-3 border text-gray-700">
                Data for confirming stone actions.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">appointmentPayload</td>
              <td className="p-3 border text-gray-700">array</td>
              <td className="p-3 border text-gray-700">
                Data for appointment bookings.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">lotIds</td>
              <td className="p-3 border text-gray-700">array</td>
              <td className="p-3 border text-gray-700">
                Array of lot IDs for the items.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">isDetailPage</td>
              <td className="p-3 border text-gray-700">boolean</td>
              <td className="p-3 border text-gray-700">
                Indicates if the detail page is being displayed.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">showAppointmentForm</td>
              <td className="p-3 border text-gray-700">boolean</td>
              <td className="p-3 border text-gray-700">
                Indicates if the appointment form is shown.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">isConfirmStone</td>
              <td className="p-3 border text-gray-700">boolean</td>
              <td className="p-3 border text-gray-700">
                Indicates if the confirm stone view is shown.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">isDialogOpen</td>
              <td className="p-3 border text-gray-700">boolean</td>
              <td className="p-3 border text-gray-700">
                Indicates if the dialog is open.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">isAddCommentDialogOpen</td>
              <td className="p-3 border text-gray-700">boolean</td>
              <td className="p-3 border text-gray-700">
                Indicates if the add comment dialog is open.
              </td>
            </tr>
            <tr>
              <td className="p-3 border text-gray-700">activeTab</td>
              <td className="p-3 border text-gray-700">string</td>
              <td className="p-3 border text-gray-700">
                The currently active tab status.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
};

export const Default = Template.bind({});
Default.args = {
  dataTableState: {
    rows: mockData.rows,
    columns: mockData.columns,
  },
  isLoading: false,
  isError: false,
  errorText: '',
  cartItems: mockData.rows,
  cartdata: mockData.rows,
  images: [],
  validImages: [],
  rowSelection: {},
  confirmStoneData: [],
  appointmentPayload: [],
  lotIds: [],
  isDetailPage: false,
  showAppointmentForm: false,
  isConfirmStone: false,
  isDialogOpen: false,
  isAddCommentDialogOpen: false,
  activeTab: 'active',
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  isError: true,
  errorText: 'Something went wrong!',
};

export const DetailView = Template.bind({});
DetailView.args = {
  ...Default.args,
  isDetailPage: true,
  detailPageData: { id: '1', lot_id: '12345', carats: 1.5, price_per_carat: 5000 },
};

export const WithImages = Template.bind({});
WithImages.args = {
  ...Default.args,
  images: [
    { name: 'diamond1.jpg', url: 'https://example.com/diamond1.jpg', category: 'Diamond' },
  ],
  validImages: [
    { name: 'diamond1.jpg', url: 'https://example.com/diamond1.jpg', category: 'Diamond' },
  ],
  isModalOpen: true,
};

export const EmptyCart = Template.bind({});
EmptyCart.args = {
  ...Default.args,
  dataTableState: { rows: [], columns: mockData.columns },
  cartItems: undefined,
  cartdata: undefined,
};