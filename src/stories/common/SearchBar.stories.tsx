import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { IHeaderSearchBarProps } from '@/app/v2/your-orders/interface';
import { HeaderSearchBar } from '@/app/v2/your-orders/components/search-bar';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';
const store = setupStore();

// Mock functions for the component props
const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log('Search Input Changed:', e.target.value);
};

const handleClearInput = () => {
  console.log('Clear Input');
};

const handleGoSearch = () => {
  console.log('Go Search');
};

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  console.log('Key Pressed:', e.key);
};

const setShowSuggestions = (value: boolean) => {
  console.log('Set Show Suggestions:', value);
};

// Default export for the story
export default {
  title: 'Modules/YourOrder/SearchBar',
  component: HeaderSearchBar,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    )
  ],
  argTypes: {
    activeTab: {
      control: {
        type: 'select',
        options: ['PENDING', 'OTHER_TAB']
      }
    }
  }
} as Meta;

// Template for the component stories
const Template: Story<IHeaderSearchBarProps> = args => (
  <HeaderSearchBar {...args} />
);

export const Docs = () => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="font-sans mx-8 my-5 leading-7">
      <h1 className="text-2xl text-gray-800">Search Bar Component</h1>
      <p className="text-base text-gray-600">
        The <code className="bg-gray-200 p-1 rounded">SearchBar</code> component
        provides a dynamic search input field tailored for different use cases
        depending on the active tab. It includes features like real-time search
        suggestions, custom styling, and search action handling.
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
          {`<SearchBar
            activeTab={mockActiveTab}
            handleSearch={mockHandleSearch}
            search={mockSearch}
            handleClearInput={mockHandleClearInput}
            setShowSuggestions={mockSetShowSuggestions}
            showSuggestions={mockShowSuggestions}
            handleGoSearch={mockHandleGoSearch}
            handleKeyDown={mockHandleKeyDown}
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
            <td className="p-3 border text-gray-700">activeTab</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Determines the active tab and adjusts placeholder text accordingly
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">handleSearch</td>
            <td className="p-3 border text-gray-700">
              (e: React.ChangeEvent&lt;HTMLInputElement&gt;) =&gt; void
            </td>
            <td className="p-3 border text-gray-700">
              Function to handle input changes in the search field
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">search</td>
            <td className="p-3 border text-gray-700">string</td>
            <td className="p-3 border text-gray-700">
              Current value of the search input
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">handleClearInput</td>
            <td className="p-3 border text-gray-700">() =&gt; void</td>
            <td className="p-3 border text-gray-700">
              Function to clear the search input
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">setShowSuggestions</td>
            <td className="p-3 border text-gray-700">
              (value: boolean) =&gt; void
            </td>
            <td className="p-3 border text-gray-700">
              Function to control the visibility of search suggestions
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">showSuggestions</td>
            <td className="p-3 border text-gray-700">boolean</td>
            <td className="p-3 border text-gray-700">
              Indicates whether search suggestions should be displayed
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">handleGoSearch</td>
            <td className="p-3 border text-gray-700">() =&gt; void</td>
            <td className="p-3 border text-gray-700">
              Function to initiate a search when the search button is clicked
            </td>
          </tr>
          <tr>
            <td className="p-3 border text-gray-700">handleKeyDown</td>
            <td className="p-3 border text-gray-700">
              (e: React.KeyboardEvent&lt;HTMLInputElement&gt;) =&gt; void
            </td>
            <td className="p-3 border text-gray-700">
              Function to handle keydown events in the search input
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Default story for the HeaderSearchBar
export const Default = Template.bind({});
Default.args = {
  activeTab: 'PENDING',
  search: '',
  handleSearch,
  handleClearInput,
  setShowSuggestions,
  showSuggestions: false,
  handleGoSearch,
  handleKeyDown
};

// Story with search input filled
export const WithSearchInput = Template.bind({});
WithSearchInput.args = {
  ...Default.args,
  search: 'Example search',
  showSuggestions: true
};

// Story for the component when on a different tab
export const OtherTab = Template.bind({});
OtherTab.args = {
  ...Default.args,
  activeTab: 'OTHER_TAB'
};
