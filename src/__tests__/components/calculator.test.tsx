import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CustomCalculator } from '@/components/caclulator/calculator';

describe('CustomCalculator Component', () => {
  // Mock click handler
  let onItemClick = jest.fn();

  // Common test setup
  beforeEach(() => {
    render(<CustomCalculator />);
  });

  test('renders without errors', () => {
    expect(screen.getByText('Your Diamond')).toBeInTheDocument();
  });

  // test('updates the count when the up/down icons are clicked', () => {
  //   const upIcon = screen.getByTestId('up-icon');
  //   const downIcon = screen.getByTestId('down-icon');
  //   const countValue = screen.getByTestId('countValue');

  //   // Check if the initial count value is 0
  //   expect(countValue).toHaveValue('0');

  //   // Simulate a click on the Up icon
  //   fireEvent.click(upIcon);

  //   // Check if the count value is updated to 1
  //   expect(countValue).toHaveValue('1');

  //   // Simulate a click on the Down icon
  //   fireEvent.click(downIcon);

  //   // Check if the count value is updated back to 0
  //   expect(countValue).toHaveValue('0');
  // });

  test('handles input changes', () => {
    const input = screen.getByPlaceholderText('99.99');

    fireEvent.change(input, { target: { value: '123.45' } });
    expect(input).toHaveValue('123.45');
  });
});
