import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for expect(...).toBeInTheDocument()
import { CustomToast } from '@/components/common/toast';

test('displays a custom toast when the component mounts', async () => {
  const message = 'This is a custom message';

  // Mock the toast function from react-toastify
  jest.spyOn(require('react-toastify'), 'toast');

  // Render the component
  const { getByText, getByRole } = render(<CustomToast message={message} />);

  // Verify that the custom message is in the document
  expect(getByText(message)).toBeInTheDocument();

  // Verify that the error icon is present
  //   expect(getByRole('img', { name: /error/i })).toBeInTheDocument();

  //   // Verify that the close icon is present
  //   expect(getByRole('img', { name: /close/i })).toBeInTheDocument();

  // Wait for the toast notification to be triggered
  await waitFor(() => {
    expect(require('react-toastify').toast).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          props: { children: message },
        }),
      })
    );
  });
});
