import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
const store = setupStore();
import MyAppointments from '@/app/v2/my-appointments/page';

const meta: Meta = {
  title: 'Modules/MyAppointments/MyAppointments',
  component: MyAppointments,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

const Template: Story = (args) => <MyAppointments {...args} />;

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">My Appointments Component</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">MyAppointments</code> component
        displays a list of the user's appointments. It includes features for handling 
        appointment details, booking new appointments, and managing appointment states 
        like loading, error, and different appointment views.
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
            {`<MyAppointments
              myAppointmentData={{
                data: {
                  history: [],
                  upcoming: []
                }
              }}
              isLoading={false}
              isError={false}
              errorText=""
              showAppointmentForm={false}
              appointmentPayload={{}}
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
            <td className="p-3 border text-gray-700">myAppointmentData</td>
            <td className="p-3 border text-gray-700">object</td>
            <td className="p-3 border text-gray-700">
              Contains the history and upcoming appointment data.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">isLoading</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Indicates if the appointment data is currently loading.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">isError</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Indicates if there is an error fetching appointment data.
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
            <td className="p-3 border text-gray-700">showAppointmentForm</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Indicates if the appointment form is shown.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">appointmentPayload</td>
            <td className="p-3 border text-gray-700">object</td>
            <td className="p-3 border text-gray-700">
              Data for creating or modifying an appointment.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  // Mock props to simulate loading state if necessary
};

export const NoAppointments = Template.bind({});
NoAppointments.args = {
  myAppointmentData: {
    data: {
      history: [],
      upcoming: [],
    },
  },
  isLoading: false,
  showAppointmentForm: false,
};

export const UpcomingAppointments = Template.bind({});
UpcomingAppointments.args = {
  myAppointmentData: {
    data: {
      history: [],
      upcoming: [
        {
          id: '1',
          appointment_at: '2024-08-15T10:00:00Z',
          address: '123 Main St',
          reason: 'Routine check-up',
        },
      ],
    },
  },
  isLoading: false,
  showAppointmentForm: false,
};

export const PastAppointments = Template.bind({});
PastAppointments.args = {
  myAppointmentData: {
    data: {
      history: [
        {
          id: '1',
          appointment_at: '2024-07-15T10:00:00Z',
          address: '123 Main St',
          reason: 'Routine check-up',
        },
      ],
      upcoming: [],
    },
  },
  isLoading: false,
  showAppointmentForm: false,
};

export const AppointmentFormView = Template.bind({});
AppointmentFormView.args = {
  myAppointmentData: {
    data: {
      history: [],
      upcoming: [],
    },
  },
  isLoading: false,
  showAppointmentForm: true,
  appointmentPayload: {
    kam: { kam_name: 'John Doe', image: 'image_url' },
    storeAddresses: ['123 Main St'],
    timeSlots: {
      dates: [{ date: '2024-08-15', day: 'Monday' }],
      slots: {},
    },
  },
};