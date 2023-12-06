import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CustomCheckBox } from '@components/common/checkbox';

test('renders custom checkbox correctly', () => {
  //mock props
  const mockProps = {
    data: '1',
    onClick: jest.fn(),
    isChecked: ['1'],
    style: 'bg-solitaireQuaternary'
  };

  const { getByTestId } = render(<CustomCheckBox {...mockProps} />);
  //getting element with test-id
  const checkboxElement = getByTestId('custom-checkbox-1');
  //checking class
  expect(checkboxElement).toHaveClass('bg-solitaireQuaternary');
  // Check checked status
  expect(checkboxElement).toBeChecked();
});

test('handles checkbox click', () => {
  //mock props
  const mockProps = {
    data: '2',
    onClick: jest.fn(),
    isChecked: ['Option 1'],
    style: 'bg-solitaireQuaternary'
  };

  const { getByTestId } = render(<CustomCheckBox {...mockProps} />);

  //getting element with test-id
  const checkboxElement = getByTestId('custom-checkbox-2');

  fireEvent.click(checkboxElement);

  expect(mockProps.onClick).toHaveBeenCalled();
  expect(mockProps.onClick).toHaveBeenCalledWith(expect.any(Object));
});
