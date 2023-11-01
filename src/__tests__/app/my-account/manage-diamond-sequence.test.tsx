// manage-diamond-sequence.test.js
import React from 'react';
import { render } from '@testing-library/react'; // Adjust the import path as needed
import ManageListingSequence from '@/app/my-account/manage-diamond-sequence/page';

describe('ManageListingSequence Component', () => {
  test('renders without errors', () => {
    render(<ManageListingSequence />);
  });
});
