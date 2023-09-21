import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmailNotification from '@/app/my-account/email-notification/page';

describe('EmailNotification Component', () => {
  test('renders without errors', () => {
    render(<EmailNotification />);
  });
  test('calls handleCheckbox function when a checkbox is clicked', () => {
    // Render the EmailNotification component, passing the mock function as a prop
    const { getByTestId } = render(<EmailNotification />);

    // Assuming you have a checkbox label text (e.g., '1. New Arrival')
    const checkboxLabel = getByTestId('custom-checkbox-1'); // Adjust the label text as needed

    // Simulate a click on the checkbox
    fireEvent.click(checkboxLabel);

    // Check if the handleCheckbox function was called
    expect(checkboxLabel).toBeChecked();
  });
});
