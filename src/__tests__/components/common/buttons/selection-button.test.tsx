import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { CustomSelectionButton } from '@components/common/buttons/selection-button';

describe('CustomSelectionButton Component', () => {
  // Mock click handler
  let onItemClick = jest.fn();

  // Common test setup
  beforeEach(() => {
    render(
      <CustomSelectionButton
        selectionButtonLabel="selection Button"
        handleClick={onItemClick}
        selectionButtonAllStyles={{
          selectionButtonStyle: 'selection-button-style',
        }}
        data="data"
      />
    );
  });

  test('render custom-selection-button component correctly', () => {
    const buttonElement = screen.getByTestId('selection-button');

    // Check if the button element is in the document
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls the handleClick function when the button is clicked', () => {
    const buttonElement = screen.getByTestId('selection-button');

    // Simulate a button click
    fireEvent.click(buttonElement);

    // Check if the handleClick function was called
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  test('applies displayButtonStyle classes', () => {
    const button = screen.getByTestId('selection-button');

    // Check if the button has the custom-button-style class
    expect(button).toHaveClass('selection-button-style');
  });
});
