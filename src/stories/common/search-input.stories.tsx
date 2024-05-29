// src/components/SearchInputField/SearchInputField.stories.tsx

import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import SearchInputField, {
  ISearchInputProps
} from '@/components/v2/common/search-input/search-input';

export default {
  title: 'Components/SearchInputField',
  component: SearchInputField,
  argTypes: {
    type: { control: 'text' },
    value: { control: 'text' },
    name: { control: 'text' },
    placeholder: { control: 'text' },
    suggestions: { control: 'array' },
    showSuggestions: { control: 'boolean' }
  }
} as Meta;

const Template: Story<ISearchInputProps> = args => {
  const [value, setValue] = useState(args.value || '');
  const [showSuggestions, setShowSuggestions] = useState(
    args.showSuggestions || false
  );
  const [suggestions] = useState(args.suggestions || []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    args.onChange?.(event);
    // Add logic to filter suggestions based on input value
    // setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setShowSuggestions(false);
    args.handleSuggestionClick?.(suggestion);
  };

  return (
    <SearchInputField
      {...args}
      value={value}
      onChange={handleInputChange}
      suggestions={suggestions}
      handleSuggestionClick={handleSuggestionClick}
      setShowSuggestions={setShowSuggestions}
      showSuggestions={showSuggestions}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  name: 'search',
  placeholder: 'Search...',
  suggestions: ['Apple', 'Banana', 'Cherry'],
  showSuggestions: false
};

export const WithSuggestions = Template.bind({});
WithSuggestions.args = {
  type: 'text',
  name: 'search',
  placeholder: 'Search...',
  suggestions: ['Apple', 'Banana', 'Cherry'],
  showSuggestions: true
};

export const NoSuggestions = Template.bind({});
NoSuggestions.args = {
  type: 'text',
  name: 'search',
  placeholder: 'Search...',
  suggestions: [],
  showSuggestions: false
};

export const CustomSuggestions = Template.bind({});
CustomSuggestions.args = {
  type: 'text',
  name: 'search',
  placeholder: 'Search for fruits...',
  suggestions: ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape'],
  showSuggestions: true
};
