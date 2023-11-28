import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomInputDialog } from '@/components/common/input-dialog';

describe('CustomInputDialog', () => {
  let handleClose = jest.fn();
  const customInputDialogData = {
    isOpens: true,
    setIsOpen: jest.fn(),
    label: 'Input Label',
    name: 'inputName',
    inputValue: 'Initial Value',
    setInputvalue: jest.fn(),
    displayButtonLabel2: 'Submit',
    displayButtonFunction: jest.fn(),
  };

  test('renders CustomInputDialog component', () => {
    render(<CustomInputDialog customInputDialogData={customInputDialogData} />);

    // Check if the input label is rendered
    expect(screen.getByText('Input Label')).toBeInTheDocument();

    // Check if the input field is rendered with the initial value
    expect(screen.getByDisplayValue('Initial Value')).toBeInTheDocument();

    // Check if the Cancel and Submit buttons are rendered
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('handles Cancel button click', () => {
    render(
      <CustomInputDialog
        customInputDialogData={customInputDialogData}
        handleClose={handleClose}
      />
    );

    // Simulate a click on the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Check if handleClose is called
    expect(handleClose).toHaveBeenCalled();
  });

  test('handles Submit button click when inputValue is not empty', () => {
    render(<CustomInputDialog customInputDialogData={customInputDialogData} />);

    // Simulate a click on the Submit button
    fireEvent.click(screen.getByText('Submit'));

    // Check if displayButtonFunction is called
    expect(customInputDialogData.displayButtonFunction).toHaveBeenCalled();
  });

  test('does not handle Submit button click when inputValue is empty', () => {
    const mockCustomInputDialogDataEmpty = {
      ...customInputDialogData,
      inputValue: '',
    };
    render(
      <CustomInputDialog
        customInputDialogData={mockCustomInputDialogDataEmpty}
      />
    );

    // Simulate a click on the Submit button
    fireEvent.click(screen.getByText('Submit'));

    // Check if displayButtonFunction is not called
    expect(
      mockCustomInputDialogDataEmpty.displayButtonFunction
    ).not.toHaveBeenCalled();
  });
});
