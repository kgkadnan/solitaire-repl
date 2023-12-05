import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CustomInputField } from '@components/common/input-field';

const mockProps = {
  type: 'text',
  value: 'Hello',
  name: 'inputName',
  onChange: jest.fn(),
  placeholder: 'Enter value'
};

describe('Render Input Field Component', () => {
  // Test case to render the input field correctly
  test('renders input field correctly', () => {
    // Mock props for the input field component

    // Render the component with the mock props
    const { getByTestId } = render(<CustomInputField {...mockProps} />);

    // Get the input element by its test ID
    const inputElement = getByTestId('custom-input');

    // Assert that the input element is in the document and has the expected value
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Hello');
  });

  // Test case to test input change handling
  test('handles input change', () => {
    // Render the component with the mock props
    const { getByTestId } = render(<CustomInputField {...mockProps} />);

    // Get the input element by its test ID
    const inputElement = getByTestId('custom-input');

    // Simulate input change
    fireEvent.change(inputElement, { target: { value: 'New value' } });

    // Assert that the onChange function was called and received the expected argument
    expect(mockProps.onChange).toHaveBeenCalled();
    expect(mockProps.onChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
