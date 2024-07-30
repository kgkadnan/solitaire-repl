import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FilterByDays } from '@/app/v2/your-orders/components/filter-by-days';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
const store = setupStore();

export default {
  title: 'Modules/YourOrder/FilterByDays',
  component: FilterByDays,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ],
  argTypes: {
    filterFunction: { action: 'filterFunction' },
    radioState: { control: 'text' }
  }
} as ComponentMeta<typeof FilterByDays>;

const Template: ComponentStory<typeof FilterByDays> = args => {
  const [selectedRadio, setSelectedRadio] = useState<string>(
    args.radioState || ''
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(event.target.value);
    args.filterFunction(event);
  };

  return (
    <FilterByDays
      {...args}
      radioState={selectedRadio}
      filterFunction={handleFilterChange}
    />
  );
};

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">FilterByDays Component</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">FilterByDays</code>{' '}
        Component allows users to filter data by selecting a predefined time
        range. It displays options like "Last Week", "Last Month", and "Last 3
        Months" using radio buttons within a popover.
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
          {`<FilterByDays
            filterFunction={mockFilterFunction}
            radioState="7days"
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
            <td className="p-3 border text-gray-700">filterFunction</td>
            <td className="p-3 border text-gray-700">
              (event: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void
            </td>
            <td className="p-3 border text-gray-700">
              Function called when a radio button is selected. It receives the
              change event as an argument.
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">radioState</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              The current selected radio button value, which can be '7days',
              '30days', or '90days'.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const FilterByDayComponent = Template.bind({});
FilterByDayComponent.args = {
  radioState: '7days',
  filterFunction: (event: React.ChangeEvent<HTMLInputElement>) =>
    console.log('Filter changed:', event.target.value)
};
