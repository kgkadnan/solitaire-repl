// manage-diamond-sequence.test.js
import React from 'react';
import { render } from '@testing-library/react'; // Adjust the import path as needed
import ManageDiamondSequence from '@/app/my-account/manage-diamond-sequence/page';

describe('ManageDiamondSequence Component', () => {
  test('renders without errors', () => {
    render(<ManageDiamondSequence />);
  });
});
