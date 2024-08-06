import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BookAppointment from '@/app/v2/my-appointments/components/book-appointment/book-appointment';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';

// Mock data for stories
const appointmentPayload = {
  kam: {
    kam_name: 'John Doe',
    image: ''
  },
  storeAddresses: ['123 Main St, Cityville'],
  timeSlots: {
    dates: [
      { date: '1', day: 'Mon' },
      { date: '2', day: 'Tue' },
      { date: '3', day: 'Wed' }
    ],
    slots: {
      1: {
        Morning: {
          '08:00': {
            datetimeString: '2023-08-01T08:00:00Z',
            isAvailable: true
          },
          '09:00': {
            datetimeString: '2023-08-01T09:00:00Z',
            isAvailable: false
          }
        },
        Afternoon: {
          '12:00': {
            datetimeString: '2023-08-01T12:00:00Z',
            isAvailable: true
          },
          '13:00': { datetimeString: '2023-08-01T13:00:00Z', isAvailable: true }
        }
      },
      2: {
        Morning: {
          '08:00': {
            datetimeString: '2023-08-02T08:00:00Z',
            isAvailable: true
          },
          '09:00': {
            datetimeString: '2023-08-02T09:00:00Z',
            isAvailable: false
          }
        },
        Afternoon: {
          '12:00': {
            datetimeString: '2023-08-02T12:00:00Z',
            isAvailable: true
          },
          '13:00': { datetimeString: '2023-08-02T13:00:00Z', isAvailable: true }
        }
      }
    }
  }
};

const modalSetState = {
  setDialogContent: () => {},
  setIsDialogOpen: () => {},
  setIsInputDialogOpen: () => {}
};

const errorSetState = {
  setIsError: () => {},
  setErrorText: () => {}
};

export default {
  title: 'Modules/NewArrival/BookAppointment',
  component: BookAppointment,
  decorators: [
    Story => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    )
  ],
  argTypes: {
    goBackToListView: { action: 'goBackToListView' },
    setIsLoading: { action: 'setIsLoading' },
    getAppointment: { action: 'getAppointment' },
    setRowSelection: { action: 'setRowSelection' }
  }
} as ComponentMeta<typeof BookAppointment>;

const Template: ComponentStory<typeof BookAppointment> = args => (
  <BookAppointment {...args} />
);

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">BookAppointment Component</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">BookAppointment</code>{' '}
        Component is used to facilitate the booking or rescheduling of
        appointments. It includes various features like selecting dates, time
        slots, adding comments, and confirming appointments.
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
          {`<BookAppointment
            goBackToListView={mockGoBackToListView}
            breadCrumLabel="Book Appointment"
            appointmentPayload={mockAppointmentPayload}
            setIsLoading={mockSetIsLoading}
            modalSetState={mockModalSetState}
            getAppointment={mockGetAppointment}
            rescheduleAppointmentData={null}
            lotIds={['123', '456']}
            setRowSelection={() => {}}
            errorSetState={mockErrorSetState}
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
            <td className="p-3 border text-gray-700">() {`=>`} void</td>
            <td className="p-3 border text-gray-700">
              Function to navigate back to the list view.
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
            <td className="p-3 border text-gray-700">appointmentPayload</td>
            <td className="p-3 border text-gray-700">IAppointmentPayload</td>
            <td className="p-3 border text-gray-700">
              Data object containing details for the appointment.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setIsLoading</td>
            <td className="p-3 border text-gray-700">
              (value: boolean) {`=>`} void
            </td>
            <td className="p-3 border text-gray-700">
              Function to set the loading state.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">modalSetState</td>
            <td className="p-3 border text-gray-700">IModalSetState</td>
            <td className="p-3 border text-gray-700">
              State setter function for the modal's state.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">getAppointment</td>
            <td className="p-3 border text-gray-700">() {`=>`} void</td>
            <td className="p-3 border text-gray-700">
              Function to get the appointment data.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">
              rescheduleAppointmentData
            </td>
            <td className="p-3 border text-gray-700">
              IRescheduleAppointmentData
            </td>
            <td className="p-3 border text-gray-700">
              Data object containing details for rescheduling the appointment.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">lotIds</td>
            <td className="p-3 border text-gray-700">string[]</td>
            <td className="p-3 border text-gray-700">
              Array of IDs for the lots involved in the appointment.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setRowSelection</td>
            <td className="p-3 border text-gray-700">
              (value: {}) {`=>`} void
            </td>
            <td className="p-3 border text-gray-700">
              Function to set the row selection state.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">errorSetState</td>
            <td className="p-3 border text-gray-700">any</td>
            <td className="p-3 border text-gray-700">
              Object containing error state setters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  breadCrumLabel: 'My Appointments',
  goBackToListView: () => {},
  appointmentPayload,
  modalSetState,
  setIsLoading: () => {},
  errorSetState
};

export const WithRescheduleData = Template.bind({});
WithRescheduleData.args = {
  breadCrumLabel: 'Reschedule Appointment',
  goBackToListView: () => {},
  appointmentPayload,
  modalSetState,
  setIsLoading: () => {},
  rescheduleAppointmentData: {
    appointmentId: '12345',
    selectedDate: 2,
    selectedSlot: '2023-08-02T08:00:00Z',
    comment: 'Need to reschedule',
    location: '123 Main St, Cityville',
    stones: ['Stone1', 'Stone2']
  },
  errorSetState
};
