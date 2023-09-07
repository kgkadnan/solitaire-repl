import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CustomSearchInputField } from '@/components/common/search-input';

const mockProps = {
  type: 'text',
  value: 'Hello',
  name: 'inputName',
  onChange: jest.fn(),
  placeholder: 'Enter value',
  suggestions: ['suggestion1', 'suggestion2', 'suggestion3'],
  handleSuggestionClick: jest.fn(),
};

describe('Render Input Field Component', () => {
  // Test case to render the input field correctly
  test('renders input field correctly', () => {
    // Mock props for the input field component

    // Render the component with the mock props
    const { getByTestId } = render(<CustomSearchInputField {...mockProps} />);

    // Get the input element by its test ID
    const inputElement = getByTestId('custom-search-input');

    // Assert that the input element is in the document and has the expected value
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Hello');
  });

  // Test case to test input change handling
  test('handles input change', () => {
    // Render the component with the mock props
    const { getByTestId } = render(<CustomSearchInputField {...mockProps} />);

    // Get the input element by its test ID
    const inputElement = getByTestId('custom-search-input');

    // Simulate input change
    fireEvent.change(inputElement, { target: { value: 'New value' } });

    // Assert that the onChange function was called and received the expected argument
    expect(mockProps.onChange).toHaveBeenCalled();
    expect(mockProps.onChange).toHaveBeenCalledWith(expect.any(Object));
  });

  test('displays suggestions dropdown when focused and handles suggestion click', () => {
    const { getByTestId, getByText } = render(
      <CustomSearchInputField {...mockProps} />
    );

    const inputField = getByTestId('custom-search-input');

    // Focus on the input field
    fireEvent.focus(inputField);

    // Check if suggestions dropdown is displayed
    mockProps.suggestions.forEach((suggestion) => {
      expect(getByText(suggestion)).toBeInTheDocument();
    });

    // Click on a suggestion
    fireEvent.click(getByText('suggestion1'));

    // Check if the handleSuggestionClick function was called
    expect(mockProps.handleSuggestionClick).toHaveBeenCalledWith('suggestion1');
  });

  test('handles no suggestions gracefully', () => {
    const { getByTestId, queryByText } = render(
      <CustomSearchInputField {...mockProps} suggestions={null} />
    );

    const inputField = getByTestId('custom-search-input');

    // Focus on the input field
    fireEvent.focus(inputField);

    // Ensure no suggestions are displayed
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('Hello');
    expect(queryByText('suggestion1')).toBeNull();
  });

  test('displays placeholder text when not focused and empty', () => {
    const { getByTestId } = render(
      <CustomSearchInputField {...mockProps} value="" />
    );

    const inputField = getByTestId('custom-search-input');

    // Ensure placeholder text is displayed
    expect(inputField).toHaveAttribute('placeholder', 'Enter value');
  });
  test('handles ArrowDown key press', () => {
    const { getByTestId } = render(
      <CustomSearchInputField {...mockProps} value="" />
    );
    const inputElement = getByTestId('custom-search-input');

    // Focus on the input field
    fireEvent.focus(inputElement);

    // Press ArrowDown key
    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });

    // Expect that setSelectedSuggestionIndex was called
    expect(mockProps.handleSuggestionClick).not.toHaveBeenCalled();
    expect(inputElement).toHaveValue('');
    // Add your specific expectations for the changed state here
  });
});
