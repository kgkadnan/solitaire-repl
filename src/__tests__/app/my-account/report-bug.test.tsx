// report-bug.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReportBug from '@/app/my-account/report-bug/page';

describe('ReportBug Component', () => {
  test('renders without errors', () => {
    render(<ReportBug />);
  });

  test('updates the input value', () => {
    const { getByRole } = render(<ReportBug />);

    // Assuming you have a textarea with a placeholder
    const textarea = getByRole('textbox'); // Adjust the placeholder text as needed

    // Simulate typing in the textarea
    fireEvent.change(textarea, {
      target: { value: 'This is a test bug report.' },
    });

    // Check if the input value has been updated
    expect(textarea).toHaveValue('This is a test bug report.');
  });
});
